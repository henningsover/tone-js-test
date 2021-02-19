import React from 'react';
import * as Tone from 'tone';
import Instrument from './InstrumentKitTest';

export default class Track {
  constructor() {
    this.currentInstrument = null;
    this.trackGain = new Tone.Gain(0.5);
    this.vibrato = new Tone.Vibrato(9, 0);
    this.instrumentList = {
      0: new Instrument('square'),
      1: new Instrument('sine'),
      2: new Instrument('sawtooth'),
      3: new Instrument('triangle'),
      4: new Instrument('kick'),
      5: new Instrument('snare'),
      6: new Instrument('hihat'),
    };
    // this.effectList = {
    //   0: new Tone.Vibrato(2, 0),
    // };
  }

  _setCurrentInstrument(time, instNumber) {
    if (this.currentInstrument !== null && this.currentInstrument.synth.name === 'Synth') {
      this.currentInstrument.stop(time);
    }
    if (this.currentInstrument !== this.instrumentList[instNumber]) {
      this.currentInstrument = this.instrumentList[instNumber];
      this.currentInstrument.synth.chain(this.vibrato, this.trackGain);
    }
  }

  _handleNote(time, note) {
    if (note === 'X' && this.currentInstrument.synth.name === 'Synth') {
      this.currentInstrument.stop(time);
    }
    if (note !== 'X') {
      this.currentInstrument.play(time + 0.001, note);
    }
  }

  _handleEffect(effectNumber, effectValue) {
    const effectValueToDecimal = effectValue * 0.01;
    switch (effectNumber) {
      case 0:
        this.trackGain.gain.value = effectValueToDecimal;
        break;
      case 1:
        this.vibrato.depth.value = effectValueToDecimal;
        break;
    }
  }

  decode(stepValue, time) {
    const note = stepValue[0];
    const instNumber = stepValue[1];
    const effectNumber = stepValue[2];
    const effectValue = stepValue[3];
    if (instNumber !== '') {
      this._setCurrentInstrument(time, instNumber);
    }
    if (effectNumber !== '' && effectValue !== '') {
      this._handleEffect(parseInt(effectNumber), parseInt(effectValue));
    }
    if (note !== '' && this.currentInstrument !== null) {
      this._handleNote(time, note);
    }
  }

  dispose() {
    Object.keys(this.instrumentList).forEach((instrument) => {
      this.instrumentList[instrument].synth.dispose();
    });
    this.vibrato.dispose();
  }
}
