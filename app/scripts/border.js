/************************************************
BORDER CREATION
************************************************/

// CREATE A BUBBLE
function createBorders() {
  // SIDE RECTNAGLE POSITION AND SIZE ARRAYS
  var x = [ 0, cw-spacer, 0, 0 ];
  var y = [ 0, 0, ch-spacer, 0 ];
  var w = [ cw, spacer, cw, spacer ];
  var h = [ spacer, ch, spacer, ch ];

  // CREATE BORDER
  for (var i=0; i<4; i++) {
    var b = new border(x[i], y[i], w[i], h[i], i);
    borders.push(b);
  }
}

// DRAW REGULAR BORDERS
function drawBorders() {
  // DRAW ALL BORDERS
  for (var i = 0; i<borders.length; i++) {
    borders[i].display();
  }
}


/************************************************
BORDER OBJECT
************************************************/

// BORDER OBJECT
var border = function(x, y, w, h, id) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.fDefault = "#FFFFFF";
  this.fActive = bubbleColors[id][0];
  this.active = false;
  this.id = id;
  this.activeTime = 0;  // COUNTDOWN TIMER TO DISPLAY COLOR
  this.tone = notes[id];
}

// DISPLAY BORDER
border.prototype.display = function() {
  push();
  if (this.activeTime > 0) {
    fill(this.fActive);
    this.activeTime--;
  } else {
    fill(this.fDefault);
  }
  noStroke();
  rect(this.x, this.y, this.w, this.h);
  pop();
}
