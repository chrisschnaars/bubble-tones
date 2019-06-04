/************************************************
TONE SETUP
************************************************/

// INTERVALS
const intervalOptions = [
  [ 1, 2 ], // ROOT, OCTAVE
  [ 5/4, 6/5 ], // MAJOR THIRD, MINOR THIRD
  [ 4/3, 9/5 ], // FOURTH, MINOR SEVENTH
  [ 3/2, 5/3 ] // FIFTH, SIXTH
];

// GLOBAL KEY VARIABLE
let rootTone = 220; // key that notes are played in
let roots = [ rootTone, rootTone/2 ];
let notes = [];  // arrya of notes to play

// RESET ROOT NOTES
function setRoots() {
  roots[0] = rootTone;
  roots[1] = rootTone / 2;
}

// SET TONE FOR EACH SIDE
function setTones(id) {
  // GENERATE RANDOM VALUE BETWEN 0 AND 10
  let p = getRandomNumber(0, 10);

  // DETERMINE WHAT INTERVAL IN ARRAY TO SELECT FOR SIDE
  let selector;
  if (p < 7) {
    selector = 0;
  } else {
    selector = 1;
  }
  // SET NOTE
  notes[id] = intervalOptions[id][selector];
}


/************************************************
OSCILLATOR SETUP
************************************************/

// Create Audio Context
let audioCtx;

// OSCILLATOR
let osc1, osc2;
let oscs = [ osc1, osc2 ];

// GAIN
let masterGainNode;
let gain1, gain2;
let gains = [ gain1, gain2 ];

// TONE SETTINGS
let toneLength = 3;
let fadeInTime = 0.025;
let gainValue = 0.95;

// SETUP AUDIO
function setupAudioPlayback() {
  // CREATE AUDIO CONTEXT
  createAudioContext();
  // SET GAIN
  setupMasterGain();

  // SETUP TONES
  for (let i=0; i<4; i++) {
    setTones(i);
  }
}

function createAudioContext() {
  // Create Audio Context
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
}

// MASTER GAIN VALUE FOR ALL OSCILLATORS
function setupMasterGain() {
  // Master Gain
  masterGainNode = audioCtx.createGain();
  masterGainNode.connect(audioCtx.destination);
  masterGainNode.gain.value = gainValue;
}

// OSCILLATOR 1
// PLAYS WHEN BUBBLE STRIKES WALL
function playTone(id, noteId) {
  // SET PERIODIC WAVE FORM
  let wave = bassWave;
  let w = audioCtx.createPeriodicWave(wave.real, wave.imag);

  // SETUP OSCILLATOR
  let osc = oscs[id];
  osc = audioCtx.createOscillator();
  osc.setPeriodicWave(w);

  // CREATE GAIN NODE AND CONNECT OSCILLATOR
  let gain = gains[id];
  gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(masterGainNode);

  // CONFIGURE OSC
  let time = audioCtx.currentTime;
  osc.frequency.value = roots[id] * notes[noteId];
  gain.gain.linearRampToValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(gainValue, time + fadeInTime);

  // PLAY
  osc.start(time);

  // STOP
  gain.gain.exponentialRampToValueAtTime(0.001, time + toneLength);
  osc.stop(time + toneLength);
}
