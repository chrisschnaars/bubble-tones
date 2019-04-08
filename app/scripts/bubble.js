/************************************************
BUBBLE CREATION
************************************************/

// CREATE A BUBBLE
function createBubble(x, y) {

	if (x == null || y == null) {
		x = cw/2;
		y = ch/2;
	}

	// GENERATE RANDOM COLOR TO START
	var r = Math.floor(Math.random(0, 1) * 4);

	// GENERATE VELOCITY COEFFICIENTS
	var vX = 1;
	var vY = 1;

	var d1 = Math.random();
	var d2 = Math.random();

	if (d1 > 0.5) {
		vX = -1;
	}

	if (d2 > 0.5) {
		vY = -1;
	}

	// START RUNNING IF PAUSED
	if (!looping) {
		togglePlaying();
	}

	// REMOVE BUBBLE IF AT MAX LENGTH
	if (bubbles.length > maxBubbles - 1) {
		removeBubble();
	}

	// CREATE BUBBLE
  var b = new Bubble(x, y, vX, vY, r);
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
	for (var i=0; i < bubbles.length; i++) {
		bubbles[i].updateVelocity(s);
	}
}

/************************************************
BUBBLE OBJECT
************************************************/

var Bubble = function(x, y, vX, vY, r) {
	this.pos = createVector(x, y);
	this.vel = createVector(bubbleTempo * vX, bubbleTempo * vY);
	this.acc = createVector(0, 0);
	this.m = 5;	// mass of the bubble
	this.d = 32;	// diameter of the bubble
  this.s = color(bubbleColors[r][1]);	// stroke color
	this.f = color(bubbleColors[r][0]);	// current color of the bubble. every bubble starts as white
	this.tone = notes[r];	// random tone to start
	this.maxVelocity = 25;	// max speed of bubble
	this.id = r; 	// id aligns to color/tone

	// DISPLAY, MOVE, AND BOUNCE THE BALL
	this.render = function() {
		this.update();
		this.display();
		this.checkEdges();
	}

	// UPDATE BUBBLE VELOCITY
	this.updateVelocity = function(desiredSpeed) {
		// console.log("update bubble speed");
		// calculate multiplier
		var m = (desiredSpeed / bubbleTempo);
		// multipy velocity
		this.vel.mult(m);
		// update bubble tempo variable
		bubbleTempo = desiredSpeed;
	}

	// UPDATE BUBBLE POSITION
	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);	// don't let acceleration accumulate

		this.vel.limit(this.maxVelocity);	// limit the velocity
	}

	// DISPLAY BUBBLE
	this.display = function() {
		strokeWeight(3);
		stroke(color(this.s));
		fill(color(this.f));
		ellipse(this.pos.x, this.pos.y, this.d, this.d);
	}

	// CHECK BUBBLE COLLISIONS
	// using this processing example for physics calculations
	// https://processing.org/examples/bouncybubbles.html
	this.checkBubbleCollision = function(v) {
		// calculate distance between the bubbles
		var dx = v.pos.x - this.pos.x;
		var dy = v.pos.y - this.pos.y;
		var dd = sqrt(dx*dx + dy*dy);
		var minDist = this.d/2 + v.d/2;	// minimum distance is the combination of two radii

		// check to see if they're colliding
		if (dd < minDist) {
			// calculate angles
			var a = atan2(dy, dx);
			var targetX = this.pos.x + cos(a) * minDist;
			var targetY = this.pos.y + sin(a) * minDist;
			var ax = (targetX - v.pos.x) * 0.05;
			var ay = (targetY - v.pos.y) * 0.05;
			// adjust velocities
			this.vel.x -= ax;
			this.vel.y -= ay;
			v.vel.x += ax;
			v.vel.y += ay;
			// bubbles switch colors when they hit
			var f1 = this.f;
			var f2 = v.f;
			this.f = f2;
			v.f = f1
			// play tone
			// play a sum tone: https://en.wikipedia.org/wiki/Combination_tone
			var t = this.tone + v.tone;
			playTone(t);	// play a mixture of both tones
		}
	}

	// CHECK FOR BUBBLE HITTING EDGE
	this.checkEdges = function() {
		// BUBBLE DISTANCE MEASURED FROM CENTER
		// CREATE SPACER TO BE BUBBLE RADIUS
		var s = spacer + (this.d/2);

		// TOP SURFACE (SIDE 0)
    if (this.pos.y < s) {
			this.edge(0, 0);
    }

		// RIGHT SURFACE (SIDE 1)
    if (this.pos.x > width - s) {
			this.edge(1, 1);
    }

		// BOTTOM SURFACE (SIDE 2)
    if (this.pos.y > height - s) {
			this.edge(2, 0);
    }

		// LEFT SURFACE (SIDE31)
    if (this.pos.x < s) {
			this.edge(3, 1);
    }
  }

	// PLAY TONE, UPDATE BUBBLE, ILLUMINATE EDGE
	this.edge = function(id, axis) {

		// REVERSE VELOCITY TO BOUNCE BALL
		if (axis == 0) {
			this.vel.y*=-1;
		} else {
			this.vel.x*=-1;
		}

		// UPDATE BUBBLE APPEARANCE, TONE, ID
		this.f = bubbleColors[id][0];
		this.s = bubbleColors[id][1];
		this.tone = notes[id]; // BUBBLE TAKES ON NOTE OF WALL IT JUST HIT
		this.id = id;

		// PLAY TONE AND RESET SIDE
		playTone(notes[id]);

		// UPDATE SELECTED TONE FOR THE COLOR
		setTones(id);

		// DISPLAY EDGE
		borders[id].activeTime = borderTimer;

		// CREATE OR UPDATE CORRESPONDING ROADBLOCK
		roadblocks[id].update();
	}

	// CHECK FOR INTERSECTION WITH ROADBLOCK
	this.checkRoadblock = function(v) {
		// FIND DISTANCE BETWEEN BUBBLE AND ROADBLOCK
		var dx = v.pos.x - this.pos.x;
		var dy = v.pos.y - this.pos.y;
		var dd = sqrt(dx*dx + dy*dy);	// current distance between bubble and shape
		var minDist = this.d/2 + v.d/2;	// minimum distance is the combination of two radii

		// CHECK FOR COLLISION
		if (dd < minDist) {
			// CALCULATE ANGLE
			var a = atan2(dy, dx);
			var targetX = this.pos.x + cos(a) * minDist;
			var targetY = this.pos.y + sin(a) * minDist;
			var ax = targetX - v.pos.x;
			var ay = targetY - v.pos.y;

			// ADJUST VELOCITY OF BUBBLE
			this.vel.x -= ax;
			this.vel.y -= ay;

			// PLAY TONE
			playTone(v.tone);

			// RESET TONE
			setTones(v.id);
		}
	}
}
