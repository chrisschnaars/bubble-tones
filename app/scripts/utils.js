
// RANDOMLY ASSIGN BACKGROUND COLOR TO ONBOARDING CONTAINER
function setOnboardColor() {
  // ONBOARDING CONTAINER
  const ob = document.querySelector('.onboarding-container');

  let c = Math.round(getRandomNumber(0, bubbleColors.length - 1));
  ob.style.backgroundColor = bubbleColors[c][1];
}

// END ONBOARDING
function endOnboarding() {
  // ONBOARDING CONTAINER
  let ob = document.querySelector('.onboarding-container');
  // ADD HIDDEN CLASS
  ob.classList.add('onboarding-container-hidden');
  // TOGGLE ONBOARDING FLAG
  onboarding = false;
}

// GENERATE A RANDOM NUMBER
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
