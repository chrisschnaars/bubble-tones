// OFFSCREEN CANVAS
let offCanvas;

// CREATE OFFSCREEN CANVAS
function createOffscreenCanvas() {
  // SET SIZE OF OFFSCREEN CANVAS
  let w = (bubbleSize * numUniqueBubbles) + (roadBlockSize * numRoadblocks);
  let h = roadBlockSize; // BECAUSE THIS IS THE LARGER OF THE TWO OBJECTS

  // CREATE CANVAS
  offCanvas = createGraphics(w, h);

  // DRAW BUBBLES & ROADBLOCKS
  drawOffscreenBubbles(offCanvas);
  drawOffscreenRoadblocks(offCanvas);
}

// DRAW BUBBLES TO OFFSCREEN CANVAS
function drawOffscreenBubbles(c) {
  for (let i=0; i<numUniqueBubbles; i++) {
    // SET COLOR
    c.fill(bubbleColors[i][0]);
    c.stroke(bubbleColors[i][1]);
    c.strokeWeight(bubbleStrokeSize);
    // SET X AND Y POSITION
    let x = bubbleSize/2 + (i * bubbleSize);
    let y = bubbleSize/2;
    // DRAW BUBBLE
    c.ellipseMode(CENTER);
    c.ellipse(x, y, bubbleFillSize);
  }
}

// DRAW ROADBLOCKS TO OFFSCREEN CANVAS
function drawOffscreenRoadblocks(c) {
  // WIDTH OFFSET OF OFFSCREEN BUBBLES
  let startW = bubbleSize * numUniqueBubbles;

  // DRAW ROADBLOCKS
  for (let i=0; i<numRoadblocks; i++) {
    // SET COLOR
    c.fill(bubbleColors[i][0]);
    c.stroke(bubbleColors[i][1]);
    c.strokeWeight(bubbleStrokeSize);
    // SET X AND Y POSITION
    let x = startW + roadBlockSize/2 + (roadBlockSize * i);
    let y = roadBlockSize/2;
    // DRAW ROADBLOCK
    c.ellipseMode(CENTER);
    c.ellipse(x, y, roadBlockFillSize);
  }
}
