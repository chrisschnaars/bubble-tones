/************************************************
ROADBLOCK CREATION
************************************************/

// ROADBLOCK ARRAY
let roadblocks = []; // array of bigger bubbles that block smaller bubbles

// ROADBLOCK SETTINGS
const roadBlockFillSize = 80;
const roadBlockStrokeSize = 4
const roadBlockSize = roadBlockFillSize + roadBlockStrokeSize;	// PX DIAMETER OF BUBBLE

// ROADBLOCK QUANTITY
const numRoadblocks = 4; // MAX # OF BUBBLES (KEEP LOW FOR PERFORMANCE)

// INITIALIZE ROADBLOCKS
function createRoadblocks() {
  for (let i = 0; i < numRoadblocks; i++) {
    roadblocks[i] = new Roadblock(i);
  }
}

/************************************************
ROADBLOCK OBJECT
************************************************/

function Roadblock(id) {
  this.pos = createVector(0, 0);
  this.d = roadBlockSize; // DIAMETER
  this.visible = false; // ROADBLOCK IS HIDDEN UNTIL ACTIVATED
  this.id = id; // ROADBLOCK ID
  this.hitCount = 0;  // COUNTER FOR HOW MANY HITS ROADBLOCK HAS
  this.offX = (bubbleSize * numUniqueBubbles) + (this.d * id);	// x position of offscreen canvas image
	this.offY = 0; // y position of offscreen canvas image
}

// UPDATE ROADBLOCK HITCOUNT
Roadblock.prototype.toggle = function() {
  // SET QUANTITY OF HITS NEEDED TO MOVE ROADBLOCK
  const maxHitCount = 8;

  // UPDATE HITCOUNT
  this.hitCount++;

  // TOGGLE VISIBILITY IF HIDDEN
  if (!this.visible || this.hitCount > maxHitCount) {
    this.visible = true;
    this.updatePosition();
  }
};

// DISPLAY THE ROADBLOCK IMAGE
Roadblock.prototype.display = function() {
  image(offCanvas, this.pos.x - this.d/2, this.pos.y - this.d/2, this.d, this.d, this.offX, this.offY, this.d, this.d);
};

// UPDATE ROADBLOCK POSITION
Roadblock.prototype.updatePosition = function() {
  // SET PARAMETERS FOR ROADBLOCK COORIDNATES
  const p = 100; // MIN SPACE BETWEEN CANVAS EDGE AND ROADBLOCK
  let xMin = p;
  let xMax = cw - p;
  let yMin = p;
  let yMax = ch - p;

  // CREATE RANDOM COORDINATES
  let x1 = Math.floor(getRandomNumber(xMin, xMax));
  let y1 = Math.floor(getRandomNumber(yMin, yMax));

  // CHECK OVERLAP
  for (let i=0; i < roadblocks.length; i++) {
    if (this.id != i) {

      // OTHER ROADBLOCK
      let a = roadblocks[i];

      // CHECK BOTH POSITIONS
      if (dist(x1, y1, a.pos.x, a.pos.y) <= this.d + 2) {
        // regenerate if they're too close
        this.updatePosition();
        break;
      } else {
        // RETURN NEW X AND Y POSITIONS
        // return [x1, y1];
        this.pos.x = x1;	// update x position
        this.pos.y = y1;	// update y position
      }
    }
  }
};
