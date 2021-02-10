import React, { useEffect, useContext } from 'react';
import { SynthContext } from './contexts/SynthContextProvider';
import Instrument from './data/InstrumentKit';
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
    const inst1 = new Instrument();
    const inst2 = new Instrument();
    const inst3 = new Instrument();
    const inst4 = new Instrument();
    const instruments = [inst1, inst2, inst3, inst4];

    instruments.forEach((intrument, i) => {
      intrument.updateSynthType(oscTypes[`synth${i + 1}`]);
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
      instruments.forEach((instrument, index) => {
        const pattern = getPattern(index);
        const note = pattern[stepIndex];
        const instrumentType = instrument.synth.name;
        if (instrumentType === 'NoiseSynth') {
          if (note !== '') {
            instrument.updatePercussionType(note);
            instrument.synth.triggerAttackRelease('16n', time);
          }
        }
        if (instrumentType === 'Synth') {
          if (note !== 'X' && note !== '') {
            instrument.synth.triggerRelease(time);
            instrument.synth.triggerAttack(note, time + 0.01);
          }
          if (note === 'X') {
            instrument.synth.triggerRelease(time);
          }
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
      instruments.forEach((instrument) => instrument.synth.dispose());
    };
  }, []);
  return null;
}
