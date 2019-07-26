// END ONBOARDING
function endOnboarding() {
  // ONBOARDING CONTAINER
  let ob = document.querySelector('.onboarding');
  // ADD HIDDEN CLASS
  ob.classList.add('onboarding--hidden');
  // TOGGLE ONBOARDING FLAG
  onboarding = false;
}

// GENERATE A RANDOM NUMBER
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
