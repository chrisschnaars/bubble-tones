/************************************************
INTERACTIVITY
************************************************/

// DOM ELEMENTS
var playToggle;
var toneControl;
var tempoControl;
var effectsControl;

// SETUP EVENT LISTENERS
function setupInteraction() {

  // CLICK OR TAP TO ADD BUBBLES
  var mc = document.getElementById("main-canvas");
  mc.addEventListener("click", function(e) {
    createBubble(mouseX, mouseY);
    e.preventDefault()
  }, false);
  mc.addEventListener("touchend", function(e) {
    createBubble(mouseX, mouseY);
    e.preventDefault()
  }, false);

  // DEFINE CONTROL PANEL DOM ELEMENTS
  playToggle = document.querySelector('#play-toggle');
  toneControl = document.querySelector("#tone");
  tempoControl = document.querySelector("#tempo");
  effectsControl = document.querySelector("#effects");

  // PLAY/PAUSE BUTTON
  playToggle.addEventListener("click", function(e) {
    togglePlaying();
    e.preventDefault()
  },false);
  playToggle.addEventListener("touchend", function(e) {
    togglePlaying();
    e.preventDefault()
  },false);

  // TONE SLIDER
  toneControl.addEventListener("input", function(e) {
    var newTone = Number(this.value);
    console.log(newTone);
    rootTone = newTone;
  }, false);

  // TEMPO SLIDER
  tempoControl.addEventListener("input", function(e) {
    e.preventDefault();
    var s = Number(this.value);

    changeBubbleSpeed(s);

    // SET ARIA ATTRIBUTE
    tempoControl.setAttribute('aria-valuenow', dSpeed);

  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-open").addEventListener("click", function() {
    document.querySelector("#about-modal").classList.add("visible");
  }, false);

  // CLOSE ABOUT TOGGLE
  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-close").addEventListener("click", function() {
    document.querySelector("#about-modal").classList.remove("visible");
  }, false);


}

// KEYBOARD EVENTS
document.addEventListener('keydown', function(e) {
  if (e.key == "Q" || e.key == "q") {
    console.log("Add bubble");
    createBubble(null, null);
  }

  if (e.key == "P" || e.key == "p") {
    removeBubble();
  }

  if (e.key == " " || e.key == "Spacebar") {
    togglePlaying();
  }

  // TABBING
  if (e.key === 'Tab') { // the "I am a keyboard user" key
      console.log('tab key man');
      document.body.classList.add('user-is-tabbing');
      // window.removeEventListener('keydown', handleFirstTab);
  }
});

/************************************************
ACTIVITY UPDATES
************************************************/

// TOGGLE PLAYING
function togglePlaying() {
  // DOM ELEMENTS
  var playToggle = document.querySelector('#play-toggle');

  // TOGGLE PLAYING
  if (looping) {
    // STOP PLAYING
    noLoop();
    // TOGGLE BUTTON CLASS
    playToggle.classList.remove("pause-btn");
    playToggle.classList.add("play-btn");
    looping = false;
  } else {
    loop();
    playToggle.classList.remove("play-btn");
    playToggle.classList.add("pause-btn");
    looping = true;
  }
}

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateToggleStatus(e) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  var toggles = document.querySelectorAll('.toggle');
  for (var i=0; i<toggles.length; i++) {
    toggles[i].classList.remove('selected');
  }

  // ADD SELECTED CLASS TO SELECTED
  e.target.classList.add( "selected" );
}
