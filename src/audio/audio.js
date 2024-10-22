import { intervalOptions } from './intervalOptions'
import { getRandomInteger } from '../utils';

const audio = {
	audioCtx: null,
	osc: null,
	oscGain: null,
	masterGain: null,
	gainValue: 0.95,
	rootTone: 220,
	notes: [
		intervalOptions[0][0],
		intervalOptions[1][0],
		intervalOptions[2][0],
		intervalOptions[3][0],
	],

	init() {
		if (this.audioCtx === null) {
			this.createAudioContext();
			this.setupMasterGain();
		}
	},

	createAudioContext() {
		this.audioCtx = new (window.AudioContext ||
			window.webkitAudioContext)();
	},

	setupMasterGain() {
		this.masterGain = this.audioCtx.createGain();
		this.masterGain.connect(this.audioCtx.destination);
		this.masterGain.gain.value = this.gainValue;

		// const lfo = this.audioCtx.createOscillator();
		// lfo.frequency.value = 20;
		// lfo.connect(this.masterGain.gain);
		// lfo.start(0);
	},

	setupOscillator() {
		this.osc = this.audioCtx.createOscillator();
		this.oscGain = this.audioCtx.createGain();
		this.osc.type = 'triangle';

		this.osc.connect(this.oscGain);
		this.oscGain.connect(this.masterGain);

		// Set periodid wave
		// const wave = bassWave;
		// const w = this.audioCtx.createPeriodicWave(wave.real, wave.imag);
		// this.osc.setPeriodicWave(w);
	},

	setRootTone(updatedTone) {
		this.rootTone = updatedTone;
	},

	setTones(id) {
		const randomInteger = getRandomInteger(0, 10);
		const selection = randomInteger < 7 ? 0 : 1;
		this.notes[id] = intervalOptions[id][selection];
	},

	playTone(id, roadblock = false) {
		// Setup oscillator
		this.setupOscillator();

		// Configure frequency
		const frequency = this.rootTone * this.notes[id];
		this.osc.frequency.value = roadblock ? frequency * 2 : frequency;

		// Set time
		const { currentTime } = this.audioCtx;
		const attackTime = 0.005;
		const releaseTime = 1.65;

		// Start oscillator
		this.oscGain.gain.setValueAtTime(0, currentTime);
		this.osc.start(currentTime);
		this.oscGain.gain.linearRampToValueAtTime(
			0.9,
			currentTime + attackTime
		);
		this.oscGain.gain.exponentialRampToValueAtTime(
			0.001,
			currentTime + attackTime + releaseTime
		);

		this.osc.stop(currentTime + attackTime + releaseTime);

		this.setTones(id);
	},
};

export default audio;
