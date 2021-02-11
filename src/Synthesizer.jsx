import React, { useEffect, useContext } from 'react';
import { SynthContext } from './contexts/SynthContextProvider';
import Instrument from './data/InstrumentKitTest';
import { DrumTest } from './data/InstrumentKitTest';
import * as Tone from 'tone';

export default function Synthesizer({ patterns, oscTypes }) {
  const {
    setCurrentPattern,
    currentPattern,
    setCurrentStep,
    songMode,
    song,
    masterListIndex,
    setMasterListIndex,
  } = useContext(SynthContext);

  useEffect(() => {
    // Tone.Transport.bpm.value = 120;
    // const inst1 = new Instrument();
    // const inst2 = new Instrument();
    // const inst3 = new Instrument();
    // const kick = new DrumTest('kick');
    // const snare = new DrumTest('snare');
    // const hihat = new DrumTest('hihat');
    // inst4.freqEnv = new Tone.FrequencyEnvelope({
    //   attack: 0.1,
    //   sustain: 0.95,
    //   baseFrequency: '',
    //   octaves: -1,
    // });
    // const instruments = [inst1, inst2, inst3, kick, snare, hihat];
    const tracks = song.oscTypes;
    const instruments = {
      square: new Instrument('square'),
      sine: new Instrument('sine'),
      sawtooth: new Instrument('sawtooth'),
      triangle: new Instrument('triangle'),
      kick: new Instrument('kick'),
      snare: new Instrument('snare'),
      hihat: new Instrument('hihat'),
    };
    const masterGain = new Tone.Gain(0.2);
    masterGain.toDestination();
    Object.keys(instruments).forEach((inst) => {
      instruments[inst].gain.connect(masterGain);
    });

    let internalMasterListIndex = masterListIndex;
    let stepIndex = 0;
    setCurrentStep(stepIndex);

    const getPattern = (index) => {
      const pattern = songMode ? song.masterList[internalMasterListIndex] : currentPattern;
      switch (index) {
        case 0:
          return patterns.synth1[pattern];
        case 1:
          return patterns.synth2[pattern];
        case 2:
          return patterns.synth3[pattern];
        case 3:
          return patterns.synth4[pattern];
        default:
          break;
      }
    };

    const repeat = (time) => {
      if (stepIndex === 0) {
        setCurrentStep(stepIndex);
      }
      Object.keys(tracks).forEach((track, index) => {
        const pattern = getPattern(index);
        const note = pattern[stepIndex];
        const instrument = Object.keys(instruments).includes(note) ? instruments[note] : instruments[tracks[track]];
        // if (instrumentType === 'NoiseSynth') {
        //   if (note !== '') {
        //     instrument.updatePercussionType(note);
        //     instrument.synth.triggerAttackRelease('16n', time);
        //   }
        // }
        if (note !== 'X' && note !== '') {
          // if (Object.keys(instruments).includes(note)) {
          //   console.log(note);
          //   instruments[note].play(time);
          // } else {
          //   const waveForm = tracks[track];
          //   // instruments[waveForm].stop(time);
          //   // instruments[waveForm].play(note, time);
          //   instruments[waveForm].synth.triggerRelease(time);
          //   instruments[waveForm].synth.triggerAttack(note, time + 0.001);
          // }
          instrument.play(time, note);

          // if (index === 3) {
          //   console.log('drum track');
          //   instrument.setDrum(note);
          //   instrument.gain.connect(masterGain);
          //   instrument.play(time);
          // } else {
          //   instrument.synth.triggerRelease(time);
          //   instrument.synth.triggerAttack(note, time + 0.01);
          // }
        }
        if (note === 'X') {
          instrument.synth.triggerRelease(time);
        }
      });
      if (stepIndex < patterns.synth1[0].length - 1) {
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        setCurrentStep(stepIndex);
        stepIndex = 0;
        if (songMode) {
          internalMasterListIndex++;
          setMasterListIndex(internalMasterListIndex);
          if (song.masterList[internalMasterListIndex] === undefined) {
            internalMasterListIndex = 0;
            setMasterListIndex(internalMasterListIndex);
            setCurrentPattern(song.masterList[0]);
          } else {
            setCurrentPattern(song.masterList[internalMasterListIndex]);
          }
        }
      }
    };

    Tone.Transport.scheduleRepeat((time) => {
      repeat(time);
    }, '16n');

    Tone.Transport.start();

    return () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      Object.keys(instruments).forEach((inst) => instruments[inst].synth.dispose());
    };
  }, []);
  return null;
}
