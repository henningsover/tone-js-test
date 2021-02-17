import React from 'react';
import * as Tone from 'tone';
import Instrument from './InstrumentKitTest';

export default class Track {
  constructor() {
    this.currentInstrument = null;
    this.trackGain = new Tone.Gain(0.5);
    this.instrumentList = {
      0: new Instrument('square'),
      1: new Instrument('sine'),
      2: new Instrument('sawtooth'),
      3: new Instrument('triangle'),
      4: new Instrument('kick'),
      5: new Instrument('snare'),
      6: new Instrument('hihat'),
    };
  }

  updateGain(value) {
    this.gain.gain.value = value;
  }

  _setCurrentInstrument(time, instrumentNumber) {
    if (this.currentInstrument !== null) {
      this.currentInstrument.stop(time);
    }
    this.currentInstrument = this.instrumentList[instrumentNumber];
    this.currentInstrument.gain.connect(this.trackGain);
  }

  // _handleNote(time, note) {
  //   console.log(time);
  //   if (note === 'X' && this.currentInstrument.synth.name === 'Synth') {
  //     this.currentInstrument.synth.triggerRelease(time);
  //   }
  //   if (note !== 'X') {
  //     this.currentInstrument.play(time, note);
  //   }
  // }

  decode(stepValue, time) {
    const note = stepValue[0];
    const instNumber = stepValue[1];
    if (instNumber !== '') {
      if (this.currentInstrument !== null && this.currentInstrument.synth.name === 'Synth') {
        this.currentInstrument.stop(time);
      }
      this.currentInstrument = this.instrumentList[instNumber];
      this.currentInstrument.gain.connect(this.trackGain);
    }
    // if (note !== '' && this.currentInstrument !== null) {
    //   this._handleNote(time, note);
    // }
    if (note !== '' && this.currentInstrument !== null) {
      if (note === 'X' && this.currentInstrument.synth.name === 'Synth') {
        this.currentInstrument.stop(time);
      }
      if (note !== 'X') {
        this.currentInstrument.play(time, note);
      }
    }

    // console.log('decode');
    // if (stepValue[1] !== '') {
    //   this._setCurrentInstrument(time, stepValue[1]);
    // }
    // // if(stepValue[2] !== '') {
    // //   this._setEffect(stepValue[2])
    // // }
    // if (stepValue[0] !== '' && this.currentInstrument !== null) {
    //   this._handleNote(time, stepValue[0]);
    // }
  }

  dispose() {
    Object.keys(this.instrumentList).forEach((instrument) => {
      this.instrumentList[instrument].synth.dispose();
    });
  }
}
