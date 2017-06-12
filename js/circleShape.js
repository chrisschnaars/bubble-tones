// Chris Schnaars
// BUBBLE TONES

/******* Circle Shape Object *******/

var circleShape = function(x, y, id) {
  this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
  this.d = 80; // diameter of the shape
  this.tone = 0;  // default tone
  this.f = color(255);  // fill color (white by default)
  this.s = color(255);  // stroke color (white by default)
  this.visible = false;
  this.id = id; // circle id
  this.hit = true;  // boolean to check if the circle is overlapping

  // method to display the shape
  this.display = function(id) {
    // update fill, stroke, and tone
    this.f = eval('c' + id);
    this.s = eval('s' + id);
    this.tone = notes[id];
    // draw circle
    strokeWeight(4);
    ellipseMode(CENTER);
    fill(this.f);
    stroke(this.s);
    ellipse(this.pos.x, this.pos.y, this.d, this.d);
  }

  // method to update the location
  this.update = function() {
    // create random coordinats
    var x1 = random(shapeXMin, shapeXMax);	// update x position
		var y1 = random(shapeYMin, shapeYMax);	// update y position

    // check these coofdinates to see if they overlap
    for (var i = 0; i < circleShapes.length; i++) {
      if (this.id != i) {

        var a = circleShapes[i];

        // check to see if they overlap
        if ( dist(x1, y1, a.pos.x, a.pos.y) <= (this.d / 2 + a.d / 2) ) {
          // regenerate if they're too close
          this.update();
          break;
        } else {
          // move if they aren't overlapping
          this.visible = true;
          this.pos.x = x1;	// update x position
      		this.pos.y = y1;	// update y position
        }
      }
    }
  }


}
