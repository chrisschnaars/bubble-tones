// Chris Schnaars
// BUBBLE TONES

/******* Bubble Object *******/

var Bubble = function(x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(bubbleTempo, bubbleTempo);
	this.acc = createVector(0, 0);
	this.m = 5;	// mass of the bubble
	this.d = this.m * 5;	// diameter of the bubble
	this.f = color(255);	// current color of the bubble. every bubble starts as white
	this.tone = 0;	// current tone of the bubble. starts off as empty.

	// update velocity when tempo is changed
	this.updateVelocity = function(desiredSpeed) {
		// calculate multiplier
		var m = (desiredSpeed / bubbleTempo);
		console.log(m);
		// multipy velocity
		this.vel.mult(m);
		// update bubble tempo variable
		bubbleTempo = desiredSpeed;
	}

	// update the vectors
	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);	// don't let acceleration accumulate
	}

	// display the bubble
	this.display = function() {
		fill(this.f);
		ellipse(this.pos.x, this.pos.y, this.d, this.d);
	}

	// method to bounce off other bubbles
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

	// method to bounce off the edges
	this.checkEdges = function() {
		// top side is side 0 -- root note
    if (this.pos.y < spacer) {
			// create a variable for the side number
			var id = 0;

			// play tone, update bubble color & tone, and bounce
			playTone(notes[id]);	// play the root note
			this.vel.y *= -1;	// reverse the y velocity
			this.f = c1;	// change the fill color for this side
			this.tone = notes[id];	// update this bubble's tone

			// reset the border display time
			timer0 = borderTime;

			// update the appropriate circle
			circleShapes[id].update();
    }

		// right side is side 1
		// right side plays the third
    if (this.pos.x > width - spacer) {
			// set the id variable
			var id = 1;

			// play tone, update bubble color & tone, and bounce
			playTone(notes[id]);	// play the third
      this.vel.x *= -1;	// reverse the x velocity
			this.f = c1;	// change fill color
			this.tone = notes[id];	// update this bubble's tone

			// reset the border display time
			timer1 = borderTime;	// draw border

			// update the appropriate circle
			circleShapes[id].update();
    }

		// bottom side is side 2
		// bottom side plays the fifth
    if (this.pos.y > height - spacer) {
			// set the id variable
			var id = 2;

			// play tone, update bubble color & tone, and bounce
			playTone(notes[id]);	// play the fourth
      this.vel.y *= -1;
			this.f = c2;
			this.tone = notes[id];	// update this bubble's tone

			// reset the border display time
			timer2 = borderTime;	// draw border

			// update the appropriate circle
			circleShapes[id].update();
    }
		// left side is side 3
		// left side plays the octave
    if (this.pos.x < spacer) {
			// set the id variable
			var id = 3;

			// play tone, update bubble color & tone, and bounce
			playTone(notes[id]);	// play the fifth
      this.vel.x *= -1;	// reverse x velocity
			this.f = c3;	// change fill color
			this.tone = notes[id];	// update this bubble's tone

			// reset the border display time
			timer3 = borderTime;	// draw border

			// update the appropriate circle
			circleShapes[id].update();
    }
  }

	// method to bounce off circle shapes
	this.checkShapeCollision = function(v) {
		// calculate distance between the bubbles
		var dx = v.pos.x - this.pos.x;
		var dy = v.pos.y - this.pos.y;
		var dd = sqrt(dx*dx + dy*dy);	// current distance between bubble and shape
		var minDist = this.d/2 + v.d/2;	// minimum distance is the combination of two radii

		// check to see if they're colliding
		if (dd < minDist) {
			// calculate angles
			var a = atan2(dy, dx);
			var targetX = this.pos.x + cos(a) * minDist;
			var targetY = this.pos.y + sin(a) * minDist;
			var ax = targetX - v.pos.x;
			var ay = targetY - v.pos.y;

			// adjust velocity of bubble
			this.vel.x -= ax;
			this.vel.y -= ay;

			// play difference tone tone
			// https://en.wikipedia.org/wiki/Combination_tone
			var t = (this.tone + v.tone) / 2;
			playTone(t);	// play a mixture of both tones
		}
	}
}
