/************************************************
CANVAS SETUP
************************************************/

// CANVAS SIZE VARIABLES
let cw, ch;
let bgCanvas;
const bgColor = '#F8F9FC';

// SET CANVAS SIZE
function setCanvasSize() {
  // GET CONTROL BAR HEIGHT
  const controlBar = document.querySelector('.control-bar');
  let cbHeight = controlBar.clientHeight + 2; // height plus border

  // SET CANVAS SIZE
  cw = window.innerWidth;
  ch = window.innerHeight - cbHeight;
}

// CANVAS SETUP
function setup() {
  // GET CANVAS SIZE
  setCanvasSize();

  // CREATE OFFSCREEN CANVAS ELEMENTS
  createOffscreenCanvas();

  // CREATE CANVAS
  canvas = createCanvas(cw, ch);
  canvas.parent("main-container");
  canvas.id("canvas");

  // CREATE OFFSCREEN BG CANVAS
  bgCanvas = createGraphics(cw, ch);
  bgCanvas.background(color(bgColor));

  // GLOBAL DRAWING SETTINGS
  angleMode(DEGREES);

  createRoadblocks();
  createBorders();

}


// ANIMATION
function draw() {
  // DISPLAY BACKGROUND
  image(bgCanvas, 0, 0);

  // DISPLAY AND UPDATE BUBBLES
  for (let i=0; i < bubbles.length; i++) {
    // RENDER BUBBLES
    bubbles[i].render();

    // CHECK FOR ROADBLOCK COLLISION
    for (let j=0; j < roadblocks.length; j++) {
      if (roadblocks[j].visible) {
        roadblocks[j].display();
        bubbles[i].checkRoadblock(roadblocks[j]);
      }
    }
  }

  // DISPLAY BORDERS
  for (let i=0; i<borders.length; i++) {
    if (borders[i].active) {
      borders[i].display();
    }
  }
}



// RESET CANVAS WHEN WINDOW IS RESIZED
// function windowResized() {
//   // reload canvas when window is resized
//   location.reload();
//
//   // GET NEW SIZE AND RESET CANVAS
//   setCanvasSize();
//   resizeCanvas(cw, ch);
// }
