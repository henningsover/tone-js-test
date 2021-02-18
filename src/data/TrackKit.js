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
  _resetEffects() {
    this.trackGain.gain.value = 0.5;
    this.vibrato.depth.value = 0;
  }
  _connect() {
    if (this.currentEffect !== null && this.currentInstrument !== null) {
      this.currentInstrument.synth.connect(this.currentEffect);
      this.currentEffect.connect(this.trackGain);
    }
    if (this.currentInstrument !== null && this.currentEffect === null) {
      // this.currentInstrument.synth.disconnect(this.currentEffect);
      this.currentInstrument.gain.connect(this.trackGain);
    }
  }

  decode(stepValue, time) {
    const note = stepValue[0];
    const instNumber = stepValue[1];
    const effectNumber = stepValue[2];
    const effectValue = stepValue[3];
    if (instNumber !== '') {
      if (this.currentInstrument !== null && this.currentInstrument.synth.name === 'Synth') {
        this.currentInstrument.stop(time);
      }
      if (this.currentInstrument !== this.instrumentList[instNumber]) {
        console.log('new instrument');
        this.currentInstrument = this.instrumentList[instNumber];
        this.currentInstrument.synth.chain(this.vibrato, this.trackGain);
      }
    }

    if (effectNumber !== '' && effectValue !== '') {
      // const newGain = parseInt(effect) * 0.01;
      // this.trackGain.gain.value = newGain;
      // // this.currentInstrument.synth.portamento = newGain;
      // this.currentEffect = this.effectList[0];
      this._handleEffect(parseInt(effectNumber), parseInt(effectValue));
    }
    // if (effectNumber === '' && effectValue === '') {
    //   this._resetEffects();
    // }
    // this._connect();

    if (note !== '' && this.currentInstrument !== null) {
      if (note === 'X' && this.currentInstrument.synth.name === 'Synth') {
        this.currentInstrument.stop(time);
      }
      if (note !== 'X') {
        this.currentInstrument.play(time, note);
        // if (this.currentEffect) {
        //   this.currentInstrument.gain.connect(this.trackGain);
        // }
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
    this.vibrato.dispose();
  }
}
