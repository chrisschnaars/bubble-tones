/************************************************
ROADBLOCK CREATION
************************************************/

function createRoadblocks() {
  for (var i = 0; i < 4; i++) {
    roadblocks[i] = new roadblock(i);
  }
}

/************************************************
ROADBLOCK OBJECT
************************************************/

var roadblock = function(id) {
  this.pos = createVector(0, 0);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
  this.d = 80; // DIAMETER
  this.tone = notes[id] / 2;  // PLAY OCTAVE BELOW NOTE
  this.f = bubbleColors[id][0]; // FILL COLOR
  this.s = bubbleColors[id][1]; // STROKE COLOR
  this.visible = false; // ROADBLOCK IS HIDDEN UNTIL ACTIVATED
  this.id = id; // circle id
  this.hit = true;  // boolean to check if the circle is overlapping
  this.hitCount = -1;  // COUNTER FOR HOW MANY HITS ROADBLOCK HAS
}

// DISPLAY THE ROADBLOCK
roadblock.prototype.display = function() {
  push();
  // DRAWING SETTINGS
  strokeWeight(4);
  // DRAW ROADBLOCK
  fill(this.s);
  noStroke();
  // stroke(this.s);
  ellipse(this.pos.x, this.pos.y, this.d, this.d);
  pop();
}

// UPDATE ROADBLOCK HITCOUNT
roadblock.prototype.update = function() {
  // NUMBER OF HITS BEFORE ROADBLOCK MOVES
  var maxCount = 8;

  // UPDATE HIT COUNT
  this.hitCount++;

  if (!this.visible || this.hitCount > maxCount) {
    this.updatePosition();
    this.visible = true;
  }
}

// UPDATE ROADBLOCK POSITION
roadblock.prototype.updatePosition = function() {
  // SET PARAMETERS FOR ROADBLOCK COORIDNATES
  var p = 100; // MIN SPACE BETWEEN CANVAS EDGE AND ROADBLOCK
  var xMin = p;
  var xMax = cw - p;
  var yMin = p;
  var yMax = ch - p;

  // CREATE RANDOM COORDINATES
  var x1 = random(xMin, xMax);
  var y1 = random(yMin, yMax);

  // CHECK OVERLAP
  for (var i = 0; i < roadblocks.length; i++) {
    if (this.id != i) {

      // OTHER ROADBLOCK
      var a = roadblocks[i];

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
}
