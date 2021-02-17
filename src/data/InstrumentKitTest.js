import React from 'react';
import * as Tone from 'tone';

export default class Instrument {
  constructor(inst) {
    this.synthType = this.synthTypes[inst];
    this.settings = this.defaultSettings[inst];
    this.synth = new Tone[this.synthType](this.settings);
    this.gain = new Tone.Gain(this.gainSettings[inst]);
    this.synth.connect(this.gain);
  }

  get synthTypes() {
    return {
      square: 'Synth',
      sine: 'Synth',
      sawtooth: 'Synth',
      triangle: 'Synth',
      snare: 'NoiseSynth',
      hihat: 'NoiseSynth',
      kick: 'MembraneSynth',
    };
  }

  get gainSettings() {
    return {
      square: 0.5,
      sine: 1,
      sawtooth: 0.5,
      triangle: 2,
      snare: 0.9,
      hihat: 0.7,
      kick: 0.5,
    };
  }

  get envelopeDefaults() {
    return {
      Synth: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.3,
        release: 0.01,
      },
      NoiseSynth: {
        attack: 0,
        decay: 0.25,
        sustain: 0,
      },
    };
  }

  get defaultSettings() {
    return {
      triangle: {
        oscillator: {
          type: 'triangle',
        },
        envelope: { ...this.envelopeDefaults[this.synthType] },
      },
      square: {
        oscillator: {
          type: 'square',
        },
        envelope: { ...this.envelopeDefaults[this.synthType] },
      },
      sawtooth: {
        oscillator: {
          type: 'sawtooth',
        },
        envelope: { ...this.envelopeDefaults[this.synthType] },
      },
      sine: {
        oscillator: {
          type: 'sine',
        },
        envelope: { ...this.envelopeDefaults[this.synthType] },
      },
      snare: {
        volume: 5,
        noise: {
          type: 'white',
          playbackRate: 3,
        },
        envelope: {
          attack: 0,
          decay: 0.2,
          sustain: 0.15,
          release: 0.04,
        },
      },
      hihat: {
        volume: 5,
        noise: {
          type: 'white',
          playbackRate: 10,
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0,
        },
      },
      kick: {
        volume: 2,
        octaves: 2,
        envelope: {
          decay: 0.4,
          sustain: 0.1,
          release: 0.01,
        },
      },
    };
  }

  play(time, note) {
    if (this.synth.name === 'MembraneSynth') {
      this.synth.triggerAttackRelease(note, '16n', time);
    }
    if (this.synth.name === 'Synth') {
      this.synth.triggerAttack(note, time);
    }
    if (this.synth.name === 'NoiseSynth') {
      this.synth.triggerAttackRelease('16n', time);
    }
  }

  stop(time) {
    this.synth.triggerRelease(time);
  }

  updateGain(value) {
    this.gain.gain.value = value;
  }
  updateSynth(oscType) {
    this.synth.set(this.defaultSettings[oscType]);
  }
}
