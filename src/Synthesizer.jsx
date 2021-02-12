import React, { useEffect, useContext } from 'react';
import { SynthContext } from './contexts/SynthContextProvider';
import Instrument from './data/InstrumentKitTest';
import * as Tone from 'tone';
import { isEmpty } from 'lodash';

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
    // Tone.Transport.bpm.value = 80;
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
    // const instruments = {
    //   square: new Instrument('square'),
    //   sine: new Instrument('sine'),
    //   sawtooth: new Instrument('sawtooth'),
    //   triangle: new Instrument('triangle'),
    //   kick: new Instrument('kick'),
    //   snare: new Instrument('snare'),
    //   hihat: new Instrument('hihat'),
    // };

    const instrumentList = {
      0: 'square',
      1: 'sine',
      2: 'sawtooth',
      3: 'triangle',
      4: 'kick',
      5: 'snare',
      6: 'hihat',
    };
    const tracksAudioSrc = {
      0: {},
      1: {},
      2: {},
      3: {},
    };
    const instruments = {
      0: {},
      1: {},
      2: {},
      3: {},
    };
    const masterGain = new Tone.Gain(1);
    masterGain.toDestination();
    // Object.keys(instruments).forEach((inst) => {
    //   instruments[inst].gain.connect(masterGain);
    // });

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
      Object.keys(tracksAudioSrc).forEach((track, index) => {
        const pattern = getPattern(index);
        const note = pattern[stepIndex][0];
        const inst = pattern[stepIndex][1];
        if (inst !== '') {
          if (instruments[index][inst] && inst !== tracksAudioSrc[track]) {
            tracksAudioSrc[track] = instruments[index][inst];
            tracksAudioSrc[track].gain.connect(masterGain);
          } else {
            instruments[index][inst] = new Instrument(instrumentList[inst]);
            tracksAudioSrc[track] = instruments[index][inst];
            tracksAudioSrc[track].gain.connect(masterGain);
          }
        }
        if (note !== 'X' && note !== '' && isEmpty(tracksAudioSrc[track]) === false) {
          tracksAudioSrc[track].play(time, note);
        }
        if (note === 'X' && isEmpty(tracksAudioSrc[track]) === false) {
          tracksAudioSrc[track].synth.triggerRelease(time);
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
      Object.keys(instruments).forEach((track, index) => {
        for (const instrument in instruments[track]) {
          if (instruments[track][instrument] !== {}) instruments[track][instrument].synth.dispose();
        }
      });
    };
  }, []);
  return null;
}
