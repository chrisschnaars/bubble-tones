// Chris Schnaars - Sound Experiments
// BUBBLE TONES 2
// Same as bubble tones 2, but using collisions to create other notes

var canvas;	// canvas variable
var cw;	// canvas width variable
var ch;	// canvas height variable

// bubble settings
var bubbles = [];	// the bubble array
var c1;	// color 1
var c2;	// color 2
var c3;	// color 3
var c4;	// color 4

var spacer = 10;	// distance from the walls that tone is activated

var borderTime = 8;	// timer for how long the border stays visible when struck
var timer0;
var timer1;
var timer2;
var timer3;

// shape settings
var shapeW = 80;	// shape width
var shapeR = shapeW / 2; // half the width
var th;	// height of the triangle
var thh;	// half the height of the triangle
var dw;

var shapePadding = 100;
var shapeXMin;	// left barrier of where shape can be
var shapeXMax;	// right barrier of where shape can be
var shapeYMin;	// top barrier of where shape can be
var shapeYMax;	// bottom barrier of where shape can be

var shape0visibility = false;	// is shape 1 visible?
var shape1visibility = false;	// is shape 2 visible?
var shape2visibility = false;	// is shape 3 visible?
var shape3visibility = false;	// is shape 4 visible?

var shape0X;
var shape0Y;
var shape1X;
var shape1Y;
var shape2X;
var shape2Y;
var shape3X;
var shape3Y;

// osciallatopr settings
var osc;	// osciallator
var env;	// envelope
var notes = [220, 277.183, 293.665, 329.628, 440];	// notes to play A, C#, D, E, A

var looping = true; // is the sketch running?


function setup() {
	// create a canvas
	cw = window.innerWidth;
	ch = window.innerHeight;
	canvas = createCanvas(cw, ch);

	// global settings
	angleMode(DEGREES);
	noStroke();

	// create envelope
  env = new p5.Env();
	env.setADSR(0.001, 0.5, 0.1, 0.5);
	env.setRange(1, 0);

	// create osciallator
	osc = new p5.Oscillator();
	osc.setType('sine');
	osc.amp(0);
	osc.start();

	// define colors
	c1 = color(110, 211, 207);	// blue-green color
	c2 = color(144, 104, 190);	// purple
	c3 = color(230, 39, 57);	// red color
	c4 = color(255, 252, 49); // yellow color

	// define the shape zone
	shapeXMin = shapePadding;
	shapeXMax = cw - shapePadding;
	shapeYMin = shapePadding;
	shapeYMax = ch - shapePadding;

	// calculate triangle math
	th = sqrt((shapeW * shapeW) - (shapeR * shapeR));	// height of the triangle
	thh = th / 2;	// half the height of the triangle

	// calculate diamond math
	dw = sqrt((shapeW * shapeW) / 2);

	// initialize first bubble
	for (i = 0; i < 1; i++) {
		bubbles[i] = new Bubble(width/2, height/2);
	}
}

// method to play tone
function playTone(f) {
	osc.freq(f);
	env.play(osc, 0, 0.2);
}

// Pause the sketch with space bar
function keyPressed() {
  if (key == " " && looping == true) {
    noLoop();
    looping = false;
  } else if (key == " " && looping == false) {
    loop();
    looping = true;
  }
}

// create a bubble when mouse is pressed
function mousePressed() {
	var b;
	b = new Bubble(mouseX, mouseY);
	bubbles.push(b);
}

// dislay the bounce-off shapes
function displayShape(id) {
	if (id == 0) {
		shape0visibility = true;	// set visibility to true
		shape0X = random(shapeXMin, shapeXMax);	// update x position
		shape0Y = random(shapeYMin, shapeYMax);	// update y position
	} else if (id == 1) {
		shape1visibility = true;	// set visibility to true
		shape1X = random(shapeXMin, shapeXMax);	// update x position
		shape1Y = random(shapeYMin, shapeYMax);	// update y position
	} else if (id == 2) {
		shape2visibility = true;	// set visibility to true
		shape2X = random(shapeXMin, shapeXMax);	// update x position
		shape2Y = random(shapeYMin, shapeYMax);	// update y position
	} else if (id == 3) {
		shape3visibility = true;	// set visibility to true
		shape3X = random(shapeXMin, shapeXMax);	// update x position
		shape3Y = random(shapeYMin, shapeYMax);	// update y position
	}
}


function draw() {
	background(225, 232, 240);

	// update and display each bubble
	for (i = 0; i < bubbles.length; i++) {

		// check if bubbles are colliding
		for (j = 0; j < bubbles.length; j++) {
			if (i != j) {
				bubbles[i].checkCollision(bubbles[j]);
			}
		}

		// draw, move, and bounce the bubbles off the edges
		bubbles[i].update();
		bubbles[i].display();
		bubbles[i].checkEdges();
		bubbles[i].checkShapeCollision();
	}

	// draw the borders when bubble strikes
	// top border
	if (timer0 > 0) {
		push();
		fill(c1);
		rect(0, 0, cw, spacer);	// top edge
		pop();
		timer0--;
		console.log(cw, spacer);
	}
	// right border
	if (timer1 > 0) {
		push();
		fill(c2);
		rect(cw - spacer, 0, spacer, ch);	// right edge
		pop();
		timer1--;
	}
	// bottom border
	if (timer2 > 0) {
		push();
		fill(c3);
		rect(0, ch - spacer, cw, spacer);	// bottom edge
		pop();
		timer2--;
	}
	// left border
	if (timer3 > 0) {
		push();
		fill(c4);
		rect(0, 0, spacer, ch);	// left edge
		pop();
		timer3--;
	}

	// draw the triangle
	if (shape0visibility) {
		push();
		strokeWeight(4);
		stroke(76, 147, 144);
		fill(c1);

		// top point
		var x1 = shape0X;
		var y1 = shape0Y - thh;
		// lower left point
		var x2 = shape0X - shapeR;
		var y2 = shape0Y + thh;
		// lower right point
		var x3 = shape0X + shapeR;
		var y3 = shape0Y + thh;

		triangle(x1, y1, x2, y2, x3, y3);
		pop();
	}

	// draw the rectangle
	if (shape1visibility) {
		push();
		strokeWeight(4);
		stroke(100, 72, 132);
		fill(c2);
		rectMode(CENTER);
		rect(shape1X, shape1Y, shapeW, shapeW);
		pop();
	}

	// draw the circle
	if (shape2visibility) {
		push();
		strokeWeight(4);
		stroke(160, 27, 39);
		fill(c3);
		ellipseMode(CENTER);
		ellipse(shape2X, shape2Y, shapeW, shapeW);
		pop();
	}

	// draw the diamond
	if (shape3visibility) {
		push();
		strokeWeight(4);
		stroke(178, 175, 34);
		fill(c4);
		quad(shape3X, shape3Y - dw, shape3X + dw, shape3Y, shape3X, shape3Y + dw, shape3X - dw, shape3Y);
		pop();
	}



}

// Method to resize canvas
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
