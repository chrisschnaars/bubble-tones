/************************************************
GLOBAL VARIABLES
************************************************/

// OPERATING FLAGS
let onboarding = true;  // FLAG IF FIRST BALL HAS BEEN CREATED
let looping = true; // FLAG IF PROGRAM IS RUNNING

/************************************************
MAIN FUNCTIONALITY
************************************************/

// SETUP
window.onload = function() {

  // SETUP INTERACTIVITY
  setupInteraction();

  // EVENT LISTENER FOR ONBOARDING CTA
  document.addEventListener('click', function(e) {
    if (onboarding) {
      startBubbleTones();
    }
  });
};

function startBubbleTones() {
  // END ONBOARDING
  endOnboarding();

  // SETUP AUDIO
  setupAudioPlayback();

  // CREATE INITIAL BUBBLES AND ROADBLOCKS
  if (mouseX < cw && mouseY < ch) {
    createBubble(cw/2, ch/2);
  }
}
