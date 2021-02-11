import React from 'react';
import * as Tone from 'tone';

export default class Instrument {
  constructor() {
    this.synth = null;
    this.freqEnv = null;
    this.gain = new Tone.Gain();
  }

  get gainSettings() {
    return {
      square: 0.8,
      sawtooth: 1,
      triangle: 1,
    };
  }

  get defaultSettings() {
    return {
      Synth: {
        oscillator: {
          type: 'triangle',
        },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 0,
        },
      },
      NoiseSynth: {
        noise: {
          type: 'white',
        },
        envelope: {
          attack: 0,
          decay: 0.25,
          sustain: 0,
        },
      },
    };
  }

  get percussionSettings() {
    return {
      S: {
        noise: {
          type: 'white',
          playbackRate: 0.5,
        },
        envelope: {
          attack: 0,
          decay: 0.6,
          sustain: 0,
        },
        gain: 0.8,
      },
      HH: {
        noise: {
          type: 'white',
          playbackRate: 0.5,
        },
        envelope: {
          attack: 0,
          decay: 0.1,
          sustain: 0,
        },
        gain: 0.9,
      },
      K: {
        noise: {
          type: 'brown',
          playbackRate: 0.8,
        },
        envelope: {
          attack: 0,
          decay: 0.2,
          sustain: 0,
        },
        gain: 2,
      },
    };
  }

  setPlayMethod(playMethod) {
    this.playMethod = playMethod;
  }

  updateOscillatorType(oscType) {
    this.synth.oscillator.type = oscType;
  }

  _setGain(oscType) {
    this.gain.gain.value = this.gainSettings[oscType];
  }

  updateGain(value) {
    this.gain.gain.value = value;
  }

  updatePercussionType(perc) {
    let settings = this.percussionSettings[perc];
    this.synth.set({ ...settings });
  }

  updateSynthType(oscType) {
    // If we have already defined the synth
    if (this.synth) {
      this.synth.disconnect(this.gain);
      this.synth.dispose();
    }
    //The new Synth!
    const synthType = oscType === 'noise' ? 'NoiseSynth' : 'Synth';
    let settings = this.defaultSettings[synthType];
    let newSynth = new Tone[synthType](settings);
    this.synth = newSynth;
    if (oscType !== 'noise') {
      this.synth.oscillator.type = oscType;
      this._setGain(oscType);
    }
    this.synth.connect(this.gain);
  }
}

export class Drum extends Instrument {}
