'use strict';

// GULP
const gulp = require('gulp');

// PLUGINS
const autoprefixer = require("autoprefixer");
const babel = require('gulp-babel');
const browserSync = require("browser-sync").create();
const concat = require('gulp-concat');
const cssnano = require("cssnano");
const del = require("del");
const htmlValidator = require('gulp-w3c-html-validator');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const newer = require("gulp-newer");
const postcss = require("gulp-postcss");
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const uglify = require('gulp-uglify');

// FILE PATHS
const paths = {
  html: {
    src: './app/*.html',
    tmp: 'tmp/',
    dist: './dist/'
  },
  styles: {
    src: './app/scss/**/*.scss',
    tmp: './tmp/css/',
    dist: './dist/css/'
  },
  scripts: {
    src: './app/scripts/**/*.js',
    tmp: './tmp/js/',
    dist: 'dist/js/'
  },
  assets: {
    src: './app/assets/**/*',
    tmp: './tmp/assets/',
    dist: './dist/assets/'
  }
};


// CLEAN ASSETS
function clean() {
  return del([
    paths.styles.tmp,
    paths.scripts.tmp,
    paths.assets.tmp,
    paths.styles.dist,
    paths.scripts.dist,
    paths.assets.dist
  ]);
}

// HTML
function html() {
  return (
    gulp
      .src(paths.html.src)
      .pipe(htmlValidator())
      .pipe(htmlValidator.reporter())
      .pipe(gulp.dest(paths.html.tmp))
      .pipe(gulp.dest(paths.html.dist))

      // RELOAD SERVER
      .pipe(browserSync.stream())
  );
}

// OPTIMIZE IMAGES
function images() {
  return gulp
    .src(paths.assets.src)
    .pipe(newer(paths.assets.src))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.assets.tmp))
    .pipe(gulp.dest(paths.assets.dist))
}

// PROCESS SCSS TO CSS
function style() {
  return (
      gulp
        // GET STYLES
        .src(paths.styles.src)

        // PROCESS SOURCE FILES INTO CSS
        .pipe(sass())
        .on("error", sass.logError)

        // ADD CSS FILE TO TMP FOLDER
        .pipe(gulp.dest(paths.styles.tmp))

        // ADD MINIMIZED FILE TO DIST
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(paths.styles.tmp))
        .pipe(gulp.dest(paths.styles.dist))

        // RELOAD SERVER
        .pipe(browserSync.stream())
  );
}

// CONCAT JAVASCRIPT FILES
function scripts() {
  return (
    gulp
      // GET FILES
      .src([
        './app/scripts/main.js',
        './app/scripts/utils.js',
        './app/scripts/bubble.js',
        './app/scripts/roadblock.js',
        './app/scripts/offscreen-canvas.js',
        './app/scripts/sketch.js',
        './app/scripts/border.js',
        './app/scripts/interaction.js',
        './app/scripts/wavetables/*.js',
        './app/scripts/audio.js'
      ])

      // INITIALIZE SOURCEMAPS
      .pipe(sourcemaps.init())

      // CONCATENATE
      .pipe(babel({presets: ["@babel/preset-env"]}))
      .pipe(concat('main.js'))

      // WRITE SOURCEMAP
      .pipe(sourcemaps.write())

      // ADD TO TMP FOLDER
      .pipe(gulp.dest(paths.scripts.tmp))

      // MINIMIZE AND ADD TO DIST
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dist))

      // RELOAD SERVER
      .pipe(browserSync.stream())
  );
}

// JS LINTER
function jslint() {
  return (
    gulp
      // GET FILES
      .src(paths.scripts.tmp)

      // LINT
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
    );
}

// WATCH FOR CHANGES
function watch() {
  // INITIALIZE BROWSER
  browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: './tmp'
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    // WATCH TASKS
    gulp.watch(paths.html.src, html)
    gulp.watch(paths.styles.src, style)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.assets.src, images)
}

// COMPLEX TASKS
const build = gulp.series(clean, gulp.parallel(html, style, scripts, images));
gulp.task('build', build);
const develop = gulp.series(build, watch);
gulp.task('develop', develop);

// EXPOSED TASKS
exports.style = style;
exports.jslint = jslint;
exports.watch = watch;
exports.build = build;
exports.develop = develop;
