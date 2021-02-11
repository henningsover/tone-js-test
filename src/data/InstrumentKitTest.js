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
      square: 0.8,
      sawtooth: 1,
      triangle: 1,
      snare: 1,
      hihat: 1,
      kick: 1,
    };
  }

  get envelopeDefaults() {
    return {
      Synth: {
        attack: 0,
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
          attack: 0.001,
          decay: 0.2,
          sustain: 0.15,
          release: 0.03,
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
        volume: 4,
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
      this.synth.triggerAttackRelease('C3', '16n', time);
    }
    if (this.synth.name === 'Synth') {
      console.log(note);
      console.log(this.synth);
      this.synth.triggerAttack(note, time);
    }
    if (this.synth.name === 'NoiseSynth') {
      this.synth.triggerAttackRelease('16n', time);
    }
  }

  stop(time) {
    this.synth.triggerRelease(time);
  }

  // get percussionSettings() {
  //   return {
  //     S: {
  //       noise: {
  //         type: 'white',
  //         playbackRate: 0.5,
  //       },
  //       envelope: {
  //         attack: 0,
  //         decay: 0,
  //         sustain: 0.95,
  //       },
  //       gain: 0.8,
  //     },
  //     HH: {
  //       noise: {
  //         type: 'white',
  //         playbackRate: 0.5,
  //       },
  //       envelope: {
  //         attack: 0,
  //         decay: 0.1,
  //         sustain: 0,
  //       },
  //       gain: 0.9,
  //     },
  //     K: {
  //       noise: {
  //         type: 'brown',
  //         playbackRate: 0.8,
  //       },
  //       envelope: {
  //         attack: 0,
  //         decay: 0.2,
  //         sustain: 0,
  //       },
  //       gain: 2,
  //     },
  //   };
  // }

  // setPlayMethod(playMethod) {
  //   this.playMethod = playMethod;
  // }

  // updateOscillatorType(inst) {
  //   this.synth.oscillator.type = oscType;
  // }

  // _setGain(oscType) {
  //   this.gain.gain.value = this.gainSettings[oscType];
  // }

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
      this._setGain(oscType);
    }
    this.synth.connect(this.gain);
  }
}

export class Drum extends Instrument {
  constructor(oscType) {
    super(oscType);
    this.filter = new Tone.Filter(400, 'highpass');
    this.gain.gain.value = 1;
    // this.freqEnv.connect(this.synth.frequency);
    this.synth.connect(this.filter);
    this.filter.connect(this.gain);
  }

  play(note, time) {
    console.log(this.gain);
    const octave = note.slice(-1);
    const rampTone = note.slice(0, -1) + octave;
    console.log(rampTone);
    this.synth.triggerAttackRelease(note, '16n', time);
    this.synth.frequency.linearRampToValueAtTime(rampTone, '16n', time);
  }
}

export class DrumTest {
  constructor(drum) {
    this.drumSynthType = this.synthType[drum];
    this.settings = this.drumSettings[drum];
    this.synth = new Tone[this.drumSynthType](this.settings);
    this.filter = new Tone.Filter();
    this.gain = new Tone.Gain();
  }
  get synthType() {
    return {
      snare: 'NoiseSynth',
      hihat: 'NoiseSynth',
      kick: 'MembraneSynth',
    };
  }
  get drumSettings() {
    return {
      snare: {
        volume: 5,
        noise: {
          type: 'white',
          playbackRate: 3,
        },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.15,
          release: 0.03,
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
        volume: 4,
        octaves: 2,
        envelope: {
          decay: 0.4,
          sustain: 0.1,
          release: 0.01,
        },
      },
    };
  }

  _setFilter(drum) {
    if (drum === 'snare') {
      this.filter.set({
        frequency: 8000,
      });
    }
    if (drum === 'hihat') {
      this.filter.set({
        frequency: 8000,
      });
    }
  }

  // setDrum(drum) {
  //   if (this.synth) {
  //     this.synth.disconnect(this.gain);
  //     this.synth.dispose();
  //   }
  //   console.log(drum);
  //   const drumSynthType = this.synthType[drum];
  //   const settings = this.drumSettings[drum];
  //   this.synth = new Tone[drumSynthType](settings);
  //   console.log(this.synth);
  //   this._setFilter(drum);
  // }

  play(time) {
    if (this.synth.name === 'MembraneSynth') {
      console.log('Membrane');
      this.synth.connect(this.gain);
      this.synth.triggerAttackRelease('C3', '16n', time);
    } else {
      this.synth.connect(this.gain);
      // this.filter.connect(this.gain);
      this.synth.triggerAttackRelease('16n', time);
    }
  }
}
