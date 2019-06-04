/************************************************
BUBBLE CREATION
************************************************/

// BUBBLE ARRAY
let bubbles = [];

// GLOBAL BUBBLE SETTINGS
const bubbleFillSize = 32;
const bubbleStrokeSize = 4;
const bubbleSize = bubbleFillSize + bubbleStrokeSize;	// PX DIAMETER OF BUBBLE
const bubbleMass = 5;	// USED FOR ACCELERATION
let bubbleTempo = 3; // GLOBAL SPEED OF BUBBLES

// BUBBLE QUANTITY VARIABLES
const maxBubbles = 6; // MAX # OF BUBBLES (KEEP LOW FOR PERFORMANCE)
const numUniqueBubbles = 4;	// TOTAL AMOUNT OF UNIQUE BUBBLES

// BUBBLE COLOR SETTINGS
// INDEX 0 IS FILL
// INDEX 1 IS STROKE
const bubbleColors = [
  [ '#EC88C0', '#D96EB2'],
  [ '#48CFAE', '#37BB9B'],
  [ '#FFCF55', '#F6BB43'],
  [ '#4FC0E8', '#3CAEDA']
];

// CREATE A NEW BUBBLE
function createBubble(x, y) {
	// REMOVE BUBBLE IF AT MAX LENGTH
	if (bubbles.length >= maxBubbles) {
		removeBubble();
	}

	// INITIALIZE NEW BUBBLE OBJECT
	initializeBubble(x, y);

	// RUN SKETCH IF CURRENTLY PAUSED
	if (!looping) {
		togglePlaying();
	}
}

// INITIALIZE NEW BUBBLE OBJECT
function initializeBubble(x, y) {
	// DETERMINE START POSITION OF BUBBLE
	if (x === null || y === null) {
		x = cw/2;
		y = ch/2;
	}

	// GENERATE RANDOM BUBBLE ID
	let r = Math.round(getRandomNumber(0, numUniqueBubbles - 1));

	// GENERATE RANDOM VELOCITY
	let vX, vY;

	// X-AXIS VELOCITY
	let d1 = getRandomNumber(0, 2);
	if (d1 < 1) {
		vX = 1;
	} else {
		vX = -1;
	}

	// Y-AXIS VELOCITY
	let d2 = getRandomNumber(0, 2);
	if (d2 < 1) {
		vY = 1;
	} else {
		vY = -1;
	}

	// CREATE BUBBLE
  let b = new Bubble(x, y, vX, vY, r);
  bubbles.push(b);
}

// REMOVE A BUBBLE
function removeBubble() {
	if (bubbles.length > 0) {
		bubbles.splice(0, 1);
	}
}

// UPDATE BUBBLE SPEED
function changeBubbleSpeed(s) {
	for (let i=0; i<bubbles.length; i++) {
		bubbles[i].updateVelocity(s);
	}
  // UPDATE GLOBAL TEMPO
  bubbleTempo = s;
}

/************************************************
BUBBLE OBJECT
************************************************/

function Bubble(x, y, vX, vY, r) {
	this.pos = createVector(x, y);
	this.vel = createVector(bubbleTempo * vX, bubbleTempo * vY);
	this.acc = createVector(0, 0);
	this.m = bubbleMass;	// mass of the bubble
	this.d = bubbleSize;	// diameter of the bubble
	this.maxVelocity = 12;	// max speed of bubble
	this.id = r; 	// id aligns to color/tone
	this.offX = r * this.d;	// x position of offscreen canvas image
	this.offY = 0; // y position of offscreen canvas image
}

// DISPLAY, MOVE, AND BOUNCE THE BALL
Bubble.prototype.render = function() {
	this.update();
	this.display();
	this.checkEdges();
};

// UPDATE BUBBLE VELOCITY
Bubble.prototype.updateVelocity = function(desiredSpeed) {
	// console.log("update bubble speed");
	// calculate multiplier
	var m = (desiredSpeed / bubbleTempo);
	// multipy velocity
	this.vel.mult(m);
};


// DISPLAY BUBBLE FROM OFFSCREEN CANVAS
Bubble.prototype.display = function() {
	image(offCanvas, this.pos.x - this.d/2, this.pos.y - this.d/2, this.d, this.d, this.offX, this.offY, this.d, this.d);
};

// UPDATE BUBBLE POSITION
Bubble.prototype.update = function() {
	this.vel.add(this.acc);
	this.pos.add(this.vel);
	this.acc.mult(0);	// don't let acceleration accumulate
	this.vel.limit(this.maxVelocity);	// limit the velocity
};

// CHECK FOR BUBBLE INTERSECTING WITH BORDER
Bubble.prototype.checkEdges = function() {
	// BUBBLE DISTANCE MEASURED FROM CENTER
	// CREATE SPACER TO BE BUBBLE RADIUS

	// TOP SURFACE (SIDE 0)
  if (this.pos.y < (borderSize + this.d/2)) {
		this.edge(0, 0);
  }

	// RIGHT SURFACE (SIDE 1)
  if (this.pos.x > (cw - this.d/2 - borderSize)) {
		this.edge(1, 1);
  }

	// BOTTOM SURFACE (SIDE 2)
  if (this.pos.y > (ch - this.d/2 - borderSize)) {
		this.edge(2, 0);
  }

	// LEFT SURFACE (SIDE31)
  if (this.pos.x < (borderSize + this.d/2)) {
		this.edge(3, 1);
  }
};

// CONTACT EDGE BEHAVIOR
Bubble.prototype.edge = function(id, axis) {

  // PLAY TONE
	playTone(0, id);

	// REVERSE VELOCITY TO BOUNCE BALL
	if (axis == 0) {
		this.vel.y*=-1;
	} else {
		this.vel.x*=-1;
	}

	// UPDATE BUBBLE APPEARANCE, TONE, ID
	this.offX = id * this.d;
	this.tone = notes[id]; // BUBBLE TAKES ON NOTE OF WALL IT JUST HIT
	this.id = id;

	// UPDATE SELECTED TONE FOR THE COLOR
	setTones(id);

	// TOGGLE BORDER VISISBLITY
	borders[id].toggle();

	// CREATE OR UPDATE CORRESPONDING ROADBLOCK
	roadblocks[id].toggle();
};

//
// 	// CHECK BUBBLE COLLISIONS
// 	// using this processing example for physics calculations
// 	// https://processing.org/examples/bouncybubbles.html
// 	this.checkBubbleCollision = function(v) {
// 		// calculate distance between the bubbles
// 		var dx = v.pos.x - this.pos.x;
// 		var dy = v.pos.y - this.pos.y;
// 		var dd = sqrt(dx*dx + dy*dy);
// 		var minDist = this.d/2 + v.d/2;	// minimum distance is the combination of two radii
//
// 		// check to see if they're colliding
// 		if (dd < minDist) {
// 			// calculate angles
// 			var a = atan2(dy, dx);
// 			var targetX = this.pos.x + cos(a) * minDist;
// 			var targetY = this.pos.y + sin(a) * minDist;
// 			var ax = (targetX - v.pos.x) * 0.05;
// 			var ay = (targetY - v.pos.y) * 0.05;
// 			// adjust velocities
// 			this.vel.x -= ax;
// 			this.vel.y -= ay;
// 			v.vel.x += ax;
// 			v.vel.y += ay;
// 			// bubbles switch colors when they hit
// 			var f1 = this.f;
// 			var f2 = v.f;
// 			this.f = f2;
// 			v.f = f1
// 			// play tone
// 			// play a sum tone: https://en.wikipedia.org/wiki/Combination_tone
// 			var t = this.tone + v.tone;
// 			playTone(t);	// play a mixture of both tones
// 		}
// 	}
//

// CHECK FOR INTERSECTION WITH ROADBLOCK
Bubble.prototype.checkRoadblock = function(v) {

	// FIND DISTANCE BETWEEN BUBBLE AND ROADBLOCK
	let dx = v.pos.x - this.pos.x;
	let dy = v.pos.y - this.pos.y;
	let dd = sqrt(dx*dx + dy*dy);	// current distance between bubble and shape

  // MIN DIST EQUAL TO BUBBLE AND ROADBLOCK RADII
  const minDist = (bubbleSize + roadBlockSize)/2;	// minimum distance is the combination of two radii

	// CHECK FOR COLLISION
	if (dd < minDist) {
		// CALCULATE ANGLE
		let a = atan2(dy, dx);
		let targetX = this.pos.x + cos(a) * minDist;
		let targetY = this.pos.y + sin(a) * minDist;
		let ax = targetX - v.pos.x;
		let ay = targetY - v.pos.y;

		// ADJUST VELOCITY OF BUBBLE
		this.vel.x -= ax;
		this.vel.y -= ay;

		// PLAY & UPDATE TONE
		playTone(1, v.id);
		setTones(v.id);
	}
};
