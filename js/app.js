// Chris Schnaars
// BUBBLE TONES

// broswer width Variable
var browserWidth;

// Determine the height of the header
var uiContainerHeight;

// Musical Key Settings
var musicKey; // key variable
var scaleId; // scale identification
var notes = []; // notes array

// Tempo Setting
var bubbleTempo = 2;

// Info Panel Visibility
var infoPanelHidden = true;

// Play/Pause Boolean
var looping = true; // starts playing
var wasLooping;

// browser width breakpoints
var midBreakpoint = 1200;
var smallBreakpoint = 1000;

// main function
function main() {
  // set container height
  setContainerHeight()

  // Get the default key selection
  var keys = document.getElementsByName("musicalKey");
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].checked) {
      musicKey = keys[i].value;
    }
    break;
  }

  // Get the initial scale selection
  var scales = document.getElementsByName("musicalScale");
  for (var i = 0; i < scales.length; i++) {
    if (scales[i].checked) {
      scaleId = scales[i].value;
    }
    break;
  }

  // Get the initial tempo selection
  // Disabled for now. Causing some strange behavior on mouse press.
  // var tttt = document.getElementById("tempo");
  // bubbleTempo = tttt.value;

  // set initial tone vlaues
  updateTones(musicKey, scaleId);

  // event listener for adding bubbles
  var mc = document.getElementById("main-canvas");
  mc.addEventListener("click", function(event){createBubble(mouseX, mouseY);event.preventDefault()}, false);
  mc.addEventListener("touchend", function(event){createBubble(mouseX, mouseY);event.preventDefault()}, false);

  // event listener for play / pause button
  var pb = document.getElementById("play-pause");
  pb.addEventListener("click", function(event){togglePlaying();event.preventDefault()},false);
  pb.addEventListener("touchend", function(event){togglePlaying();event.preventDefault()},false);

  // event listener for info panel
  var lc = document.getElementById("logo-container");
  lc.addEventListener("click", function(event){toggleInfoPanel();event.preventDefault()},false);
  lc.addEventListener("touch", function(event){toggleInfoPanel();event.preventDefault()},false);

  // event listener for close button
  var cb = document.getElementById("close-button");
  cb.addEventListener("click", function(event){toggleInfoPanel();event.preventDefault()},false);
  cb.addEventListener("touch", function(event){toggleInfoPanel();event.preventDefault()},false);

}

// method to set container height based on browser width
// container height affects the height of the canvas
function setContainerHeight() {
  // find browser width
  browserWidth = window.innerWidth || document.body.clientWidth;

  // calculate container height
  if (browserWidth < smallBreakpoint) {
    uiContainerHeight = 0;
  } else {
    uiContainerHeight = 80;
  }

  // set CSS variable
  var h = document.getElementById("ui-container");
  h.style.setProperty("--container-height", uiContainerHeight + "px");
}

// method to set key and scale
function updateTones(key, scale) {
  // update key value
  musicKey = key;

  // calculate note frequencies based on key
  var rootNote = 1 * musicKey;
  var minorThird = (6 / 5) * musicKey;
  var majorThird = (5 / 4) * musicKey;
  var fourth = (4 / 3) * musicKey;
  var fifth = (3 / 2) * musicKey;
  var minorSeventh = (9 / 5) * musicKey;
  var octave = 2 * musicKey;

  // determine which scale should be used
  if (scaleId == 1) {
    notes = [rootNote, minorThird, minorSeventh, octave]; // minor scale
  } else {
    notes = [rootNote, majorThird, fifth, octave]; // major scale
  }
}

// update the key value when raido button is clicked
function updateKey(val) {
  musicKey = val;
  updateTones(musicKey, scaleId);
}

// update the scale value when radio button is clicked
function updateScale(val) {
  scaleId = val;
  updateTones(musicKey, scaleId);
}

// method to show and hide the info panel
function toggleInfoPanel() {
  var a = document.getElementById("info-panel");  // info panel ID
  var b = document.getElementById("main-canvas"); // canvas ID

  if (infoPanelHidden) {
    // show the info panel
    a.style.display = "block";

    // pause the sketch if it is playing
    if (looping) {
      wasLooping = true;
      togglePlaying();
    } else {
      wasLooping = false;
    }

    // set info panel to not hidden
    infoPanelHidden = false;

  } else {
    // close the info panel
    a.style.display = "none";

    // play the sketch if it was playing
    if (!looping && wasLooping) {
      togglePlaying();
    }

    // reset info panel visibility variable
    infoPanelHidden = true;
  }
}
