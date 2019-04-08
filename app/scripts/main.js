/************************************************
GLOBAL VARIABLES
************************************************/

// OPERATING FLAG
var onboarding = true;  // FLAG IF FIRST BALL HAS BEEN CREATED
var looping = true; // FLAG IF PROGRAM IS RUNNING

/************************************************
MAIN FUNCTIONALITY
************************************************/

// SETUP
window.onload = function() {

  document.addEventListener('click', function(e) {
    if (onboarding) {
      startBubbleTones();
    }
  });
}

function startBubbleTones() {
  // END ONBOARDING
  endOnboarding();

  // START AUDIO
  setupAudioPlayback();

  // CREATE INITIAL BUBBLES AND ROADBLOCKS
  if (mouseX < cw && mouseY < ch) {
    createBubble(mouseX, mouseY);
  } else {
    createBubble(cw/2, ch/2);
  }

  createRoadblocks();

  // SETUP DOM AND INTERACTIVITY
  setupInteraction();


}

function endOnboarding() {
  // ONBOARDING CONTAINER
  var ob = document.querySelector('.onboarding-container');
  // ADD HIDDEN CLASS
  ob.classList.add('onboarding-container-hidden');
  // TOGGLE ONBOARDING FLAG
  onboarding = false;
}
