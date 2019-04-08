/************************************************
CANVAS
************************************************/

// CANVAS SIZE
var cw, ch;

// TONE BUBBLES
var maxBubbles = 6; // MAX # OF BUBBLES (KEEP LOW FOR PERFORMANCE)
var bubbles = []; // BUBBLE ARRAY
var bubbleTempo = 2; // GLOBAL SPEED OF BUBBLES

// ROADBLOCKS
var roadblocks = []; // array of bigger bubbles that block smaller bubbles

// SIDE TIMERS ARRAY
var borders = [];
var borderTimer = 10; // AMOUNT OF TIME SIDE IS ILLUMINATED AFTER BUBBLE HIT
var spacer = 20; // DISTANCE BETWEEN BUBBLE AND WALL TO PLAY TONE

// COLOR SETTINGS
var bgColor;
var bubbleColors = [
  [ '#EE5D96', '#D0155E'],
  [ '#FEEE46', '#EFDA01'],
  [ '#55B98F', '#388967'],
  [ '#0096D8', '#0071A3']
];

// SET CANVAS SIZE
function setCanvasSize() {
  // GET CONTROL BAR HEIGHT
  var controlBar = document.querySelector('#control-bar');
  var cbHeight = controlBar.clientHeight + 2; // height plus border

  // SET CANVAS SIZE
  cw = window.innerWidth;
  ch = window.innerHeight - cbHeight;
}

// CANVAS SETUP
function setup() {
  // GET CANVAS SIZE
  setCanvasSize();

  // CREATE CANVAS
  canvas = createCanvas(cw, ch);
  canvas.parent("main-container");
  canvas.id("main-canvas");
  bgColor = color('#FAF9F7');

  // CREATE BORDER
  createBorders();

  // GLOBAL DRAWING SETTINGS
  angleMode(DEGREES);
  noStroke();
}


// ANIMATION
function draw() {
  // DRAW BACKGROUND
  background(bgColor);

  // DISPLAY AND UPDATE BUBBLES
  for (var i = 0; i < bubbles.length; i++) {
    // RENDER BUBBLES
    bubbles[i].render();

    // ROADBLOCK COLLISION
    for (j = 0; j < roadblocks.length; j++) {
      if (roadblocks[j].visible) {
        bubbles[i].checkRoadblock(roadblocks[j]);
      }
    }
  }

  // DISPLAY THE ROADBLOCKS
  for (var i = 0; i < roadblocks.length; i++) {
    if (roadblocks[i].visible) {
      roadblocks[i].display(i);
    }
  }

  // DISPLAY BORDERS
  drawBorders();
}

// RESET CANVAS WHEN WINDOW IS RESIZED
function windowResized() {
  // reload canvas when window is resized
  location.reload();

  // GET NEW SIZE AND RESET CANVAS
  setCanvasSize();
  resizeCanvas(cw, ch);
}
