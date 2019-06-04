/************************************************
BORDER CREATION
************************************************/

// BORDER ARRAY
let borders = [];

// BORDER SETTINGS
const borderSize = 20;
const borderTimer = 8; // AMOUNT OF TIME SIDE IS ILLUMINATED AFTER BUBBLE HIT

// CREATE A BUBBLE
function createBorders() {
  // SIDE RECTNAGLE POSITION AND SIZE ARRAYS
  const x = [ 0, cw-borderSize, 0, 0 ];
  const y = [ 0, 0, ch-borderSize, 0 ];
  const w = [ cw, borderSize, cw, borderSize ];
  const h = [ borderSize, ch, borderSize, ch ];

  // CREATE BORDER
  for (let i=0; i<4; i++) {
    let b = new Border(x[i], y[i], w[i], h[i], i);
    borders.push(b);
  }
}

// DRAW REGULAR BORDERS
function drawBorders() {
  // DRAW ALL BORDERS
  for (let i=0; i<borders.length; i++) {
    borders[i].display();
  }
}


/************************************************
BORDER OBJECT
************************************************/

// BORDER OBJECT
function Border(x, y, w, h, id) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.fDefault = "#FFFFFF";
  this.fActive = bubbleColors[id][0];
  this.active = false;
  this.id = id;
  this.activeTime = 0;  // COUNTDOWN TIMER TO DISPLAY COLOR
}

// TOGGLE VISIBILITY OF BORDER
Border.prototype.toggle = function() {
  this.active = true;
  this.activeTime = borderTimer;
};

// DISPLAY BORDER
Border.prototype.display = function() {
  // DRAW BORDER IF THERE IS ACTIVE TIME
  if (this.activeTime > 0) {
    noStroke();
    fill(this.fActive);
    rect(this.x, this.y, this.w, this.h);
    this.activeTime--;
  } else {
    fill(color(bgColor));
    rect(this.x, this.y, this.w, this.h);
    this.activeTime = 0;
    this.active = false;
  }
};
