import React from 'react';
import * as Tone from 'tone';

export default class Instrument {
  constructor() {
    this.synth = null;
    this.gain = new Tone.Gain();
    this.gain.toDestination();
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
          release: 1,
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
        gain: 0.9,
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

  updateOscillatorType(oscType) {
    this.synth.oscillator.type = oscType;
  }

  updateGain(value) {
    this.gain.gain.value = value;
  }

  updatePercussionType(perc) {
    let settings = this.percussionSettings[perc];
    this.synth.noise.type = settings.noise.type;
    this.synth.noise._playbackRate = settings.noise.playbackRate;
    this.synth.envelope.attack = settings.envelope.attack;
    this.synth.envelope.decay = settings.envelope.decay;
    this.synth.envelope.release = settings.envelope.release;
    this.gain.gain.value = settings.gain;
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
    }
    this.synth.connect(this.gain);
  }
}
