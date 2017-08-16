// Chris Schnaars
// BUBBLE TONES

var canvas; // canvas variable
var cw; // canvas width variable
var ch; // canvas height variable

// bubble settings
var bubbles = []; // the bubble array

// color settings
var c0; // color 1
var c1; // color 2
var c2; // color 3
var c3; // color 4
var s0; // stroke color 1
var s1; // stroke color 2
var s2; // stroke color 3
var s3; // stroke color 4

var spacer = 10; // distance from the walls that tone is activated

var borderTime = 8; // timer for how long the border stays visible when struck
var timer0;
var timer1;
var timer2;
var timer3;

// shape settings
var circleShapes = [];
var shapePadding = 100; // amount of room from edge where shape can be
var shapeXMin; // left barrier of where shape can be
var shapeXMax; // right barrier of where shape can be
var shapeYMin; // top barrier of where shape can be
var shapeYMax; // bottom barrier of where shape can be

// osciallatopr settings
var osc1; // osciallator `
var osc2; // osciallator`
var env; // envelope

function setup() {
  // get the current broswer width
  setContainerHeight();
  cw = window.innerWidth;
  ch = window.innerHeight - uiContainerHeight;
  canvas = createCanvas(cw, ch);
  canvas.id("main-canvas");
  // canvas.position(0, 0);

  // global settings
  angleMode(DEGREES);
  noStroke();

  // create envelope
  env = new p5.Env();
  // env.setADSR(0.001, 0.5, 0.1, 0.5);
  env.setADSR(0, 0, 1, 0.6);
  env.setRange(1, 0);

  // create  oscialltor 1
  osc1 = new p5.Oscillator();
  osc1.setType("sine");
  osc1.amp(0);
  osc1.start();


  // define colors
  c0 = color(110, 211, 207); // blue-green color
  c1 = color(144, 104, 190); // purple
  c2 = color(230, 39, 57); // red color
  c3 = color(255, 252, 49); // yellow color
  s0 = color(76, 147, 144);
  s1 = color(100, 72, 132);
  s2 = color(160, 27, 39);
  s3 = color(178, 175, 34);

  // define the area where circle shapes can be drawn
  shapeXMin = shapePadding;
  shapeXMax = cw - shapePadding;
  shapeYMin = shapePadding;
  shapeYMax = ch - shapePadding;

  // create initial bubble
  createBubble(width/2, height/2);

  // initialize circle shapes
  for (var i = 0; i < 4; i++) {
    circleShapes[i] = new circleShape(random(shapeXMin, shapeXMax), random(shapeYMin, shapeYMax), i);
  }
}

// method to play tone
function playTone(f) {
  osc1.freq(f);
  env.play(osc1, 0, 0.2);
}

// Pause the sketch with space bar
function keyPressed() {
  if (key == " " && infoPanelHidden == true) {
    togglePlaying();
  }
}

// method to update the tempo (velocity) of bubbles when user changes it
function updateTempo(v) {
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].updateVelocity(v);
  }
}

// method to toggle between play/pause mode
function togglePlaying() {
  var p1 = document.getElementById("play-button");
  var p2 = document.getElementById("pause-button");

  // check if it's currently playing
  if (looping == true) {
    // stop playig
    noLoop();
    // toggle button view
    p1.style.display = "block";
    p2.style.display = "none";
    // update boolean
    looping = false;
  } else {
    // play
    loop();
    // toggle button view
    p1.style.display = "none";
    p2.style.display = "block";
    // update boolean
    looping = true;
  }
}

// // create a bubble when mouse is pressed
// function mousePressed() {
//   // add a new bubble
//   addBubble(mouseX, mouseY);
//   // prevent default
//   // return false;
// }

// // create a bubble when canvas is touched
// function touchEnded() {
//   // add a new bubble
//   addBubble(mouseX, mouseY);
//   // prevent default
//   // return false;
// }

// method to add a new bubble on mousepress or touch
// function addBubble(x, y) {
//   if (browserWidth > smallBreakpoint) {
//     if (x < cw && y < ch && looping) {
//       createBubble(x, y);
//     }
//   } else {
//     if (mouseX > cw - 82 && mouseY > ch - 164) {
//       // do nothing
//     } else {
//       createBubble(x, y);
//     }
//   }
// }

// method to add a new bubble to the array
function createBubble(x, y, event) {
  if (looping) {
    var b = new Bubble(x, y);
    bubbles.push(b);
  }
}

// main animation method
function draw() {
  background(229, 233, 235);

  // update and display each bubble
  for (var i = 0; i < bubbles.length; i++) {

    // draw, move, and bounce the bubbles off the edges
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].checkEdges();

    // check if bubbles are colliding
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j) {
        bubbles[i].checkBubbleCollision(bubbles[j]);
      }
    }

    // check to see if bubbles are hitting the shapes
    for (j = 0; j < circleShapes.length; j++) {
      if (circleShapes[j].visible) {
        bubbles[i].checkShapeCollision(circleShapes[j]);
      }
    }
  }

  // draw the borders when bubble strikes
  // top border
  if (timer0 > 0) {
    push();
    fill(c0);
    rect(0, 0, cw, spacer); // top edge
    pop();
    timer0--;
  }
  // right border
  if (timer1 > 0) {
    push();
    fill(c1);
    rect(cw - spacer, 0, spacer, ch); // right edge
    pop();
    timer1--;
  }
  // bottom border
  if (timer2 > 0) {
    push();
    fill(c2);
    rect(0, ch - spacer, cw, spacer); // bottom edge
    pop();
    timer2--;
  }
  // left border
  if (timer3 > 0) {
    push();
    fill(c3);
    rect(0, 0, spacer, ch); // left edge
    pop();
    timer3--;
  }

  // draw the circle shapes
  for (var i = 0; i < circleShapes.length; i++) {
    if (circleShapes[i].visible) {
      circleShapes[i].display(i);
    }
  }
}

// Method to resize canvas
function windowResized() {
  // reload canvas when window is resized
  location.reload();
  // get the new broswer width & set container height
  setContainerHeight();
  // update canvas dimensions
  cw = window.innerWidth;
  ch = window.innerHeight - uiContainerHeight;
  // draw canvas
  canvas = createCanvas(cw, ch);
  canvas.id("main-canvas");
}
