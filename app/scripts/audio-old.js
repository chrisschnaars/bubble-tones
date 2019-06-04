/************************************************
TONE AND KEY SETUP
************************************************/

// ROOT NOTE FREQUENCY RANGE
var rootTone = 220;  // SET TO DEFAULT, WILL CHANGE WITH USER INPUT

// INTERVAL OPTIONS
// http://shodhganga.inflibnet.ac.in/bitstream/10603/59465/10/09_chapter%204.pdf
var intervalOptions = [
  [ 1, 2 ], // ROOT, OCTAVE
  [ 5/4, 6/5 ], // MAJOR THIRD, MINOR THIRD
  [ 4/3, 9/5 ], // FOURTH, MINOR SEVENTH
  [ 3/2, 5/3 ] // FIFTH, SIXTH
];

// ARRAY OF NOTES THAT ARE ASSIGNED TO EACH ID/COLOR
// INITIAL SET, WILL CHANGE
var notes = [
  intervalOptions[0][0],
  intervalOptions[1][0],
  intervalOptions[2][0],
  intervalOptions[3][0],
];

// SET TONE FOR EACH SIDE
function setTones(id) {
  for (var i = 0; i < 4; i++) {
    // GENERATE RANDOM VALUE BETWEN 0 AND 10
    var p = Math.floor(Math.random() * 10);

    // DETERMINE WHAT INTERVAL IN ARRAY TO SELECT FOR SIDE
    var selector;
    if (p < 7) {
      selector = 0;
    } else {
      selector = 1;
    }

    // SET
    notes[i] = intervalOptions[i][selector];
  }
}

/************************************************
OSCILLATOR SETUP
************************************************/

// Create Audio Context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

// OSCILLATORS
var osc1;

// GAIN
var masterGainNode;
var gainNodeDry;
var gainNodeWet;

// GAIN SETTINGS
var masterGainValue = 2;
var dryGainValue = 2;
var wetGainValue = 0;

// TONE SETTINGS
var sustain = 3;
var attackTime = 0.1;
var releaseTime = 0.125;

// SETUP AUDIO
function setupAudioPlayback() {
  setupMasterGain();  // set master gain
  // initOsc();  // initialize oscillators
}

// MASTER GAIN VALUE FOR ALL OSCILLATORS
function setupMasterGain() {
  // Master Gain
  masterGainNode = audioCtx.createGain();
  masterGainNode.connect(audioCtx.destination);
  masterGainNode.gain.setValueAtTime(masterGainValue, audioCtx.currentTime);
}


// PLAY TONE
function playTone(interval) {
  // CREATE OSCILLATOR
  osc1 = audioCtx.createOscillator();

  // SET FREQUENCY AND TYPE
  osc1.frequency.value = interval * rootTone; // oscillator
  osc1.type = 'sine';

  // CREATE GAIN NODE
  gainNodeDry = audioCtx.createGain();

  // CONNECT CHAIN
  osc1.connect(gainNodeDry);
  gainNodeDry.connect(masterGainNode);

  // SET GAIN TO 0
  gainNodeDry.gain.linearRampToValueAtTime(0, audioCtx.currentTime);

  // FADE IN WITH ATTACH TIME
  gainNodeDry.gain.linearRampToValueAtTime(dryGainValue, (audioCtx.currentTime + attackTime));

  // PLAY AND STOP
  osc1.start(audioCtx.currentTime);
  stopTone();
}

// // INITIALIZE OSCILLATOR
// function initOsc() {
//   // CREATE OSCILLATOR
//   osc1 = audioCtx.createOscillator();
//
//   // DISTORTION
//   // var distortion = audioCtx.createWaveShaper();
//   // distortion.curve = makeDistortionCurve(600);
//   // distortion.oversample = '4x';
//
//   // CREATE GAIN NODES
//   gainNodeDry = audioCtx.createGain();
//   // gainNodeWet = audioCtx.createGain();
//
//   // DRY CHAIN
//   osc1.connect(gainNodeDry);
//   gainNodeDry.connect(masterGainNode);
//
//   // WET CHAING
//   // osc1.connect(distortion)
//   // distortion.connect(gainNodeWet);
//   // gainNodeWet.connect(masterGainNode);
// }

// // START OSCILLATORS
// function playTone(freq) {
//   // Re-initialize Oscillator
//   initOsc();
//
//   // SET FREQUENCY
//   var t = freq * rootTone;
//   osc1.frequency.value = t;
//
//   // Configure Osc
//   var curTime = audioCtx.currentTime;
//
//   // SET GAIN TO 0
//   gainNodeDry.gain.linearRampToValueAtTime(0, curTime);
//   // gainNodeWet.gain.linearRampToValueAtTime(0, curTime);
//
//   // // FADE IN WITH ATTACH TIME
//   gainNodeDry.gain.linearRampToValueAtTime(dryGainValue, curTime + attackTime);
//   // gainNodeWet.gain.linearRampToValueAtTime(wetGainValue, curTime + attackTime);
//
//   // Play & stop
//   osc1.start(curTime);
//   stopTone();
// }

// STOP OSCILLATORS
function stopTone() {
  // END GAIN VALUE, CAN'T BE 0
  var l = 0.00001;

  // RAMP DOWN GAIN W/RELEASE TIME
  gainNodeDry.gain.exponentialRampToValueAtTime(l, audioCtx.currentTime + sustain + releaseTime);
  // gainNodeWet.gain.exponentialRampToValueAtTime(l, audioCtx.currentTime + sustain + releaseTime);

  // STOP OSCILLATOR
  osc1.stop(audioCtx.currentTime + sustain + releaseTime);
}

// CONVERT IMPULSE RESPONSE DATA TO BINARY ARRAY
function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++)        {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};
