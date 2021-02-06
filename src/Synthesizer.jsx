import React, { useEffect, useContext } from 'react';
import { SynthContext } from './contexts/SynthContextProvider';
import Instrument from './data/InstrumentKit';
import * as Tone from 'tone';

export default function Synthesizer({ patterns, oscTypes }) {
  const { setCurrentPattern, currentPattern, setCurrentStep, currentStep, songMode } = useContext(SynthContext);

  useEffect(() => {
    // Tone.Transport.bpm.value = 120;
    const inst1 = new Instrument();
    const inst2 = new Instrument();
    const inst3 = new Instrument();
    const inst4 = new Instrument();
    const instruments = [inst1, inst2, inst3, inst4];

    instruments.forEach((intrument, i) => {
      console.log(oscTypes[`synth${i + 1}`]);
      intrument.updateSynthType(oscTypes[`synth${i + 1}`]);
    });
    // Object.keys(oscTypes).forEach((type, i) => {
    //   instruments[i].updateOscillatorType(oscTypes[type]);
    // });

    // instruments[0].updateOscillatorType(oscTypes.synth1);
    // instruments[1].updateOscillatorType(oscTypes.synth2);
    // instruments[2].updateOscillatorType(oscTypes.synth3);
    // instruments[3].updateOscillatorType(oscTypes.synth4);

    // const gain = new Tone.Gain(0.6);
    // instruments.forEach((synth) => synth.connect(gain));

    // gain.toDestination();

    let patternIndex = currentPattern;
    let stepIndex = 0;
    setCurrentStep(stepIndex);

    const getLength = (next, pattern) => {
      let counter = 0;
      for (let i = next; i < pattern.length; i++) {
        if (pattern[i] !== '') {
          break;
        }
        counter++;
      }
      switch (counter) {
        case 1:
          return '16n';
        case 2:
          return '8n + 16n';
        case 3:
          return '4n';
        case 4:
          return '4n + 16n';
        case 5:
          return '4n + 8n';
        case 6:
          return '4n + 8n + 16n';
        case 7:
          return '2n';
        default:
          return '16n';
      }
    };

    const getPattern = (index) => {
      switch (index) {
        case 0:
          return patterns.synth1[patternIndex];
        case 1:
          return patterns.synth2[patternIndex];
        case 2:
          return patterns.synth3[patternIndex];
        case 3:
          return patterns.synth4[patternIndex];
        default:
          break;
      }
    };

    const repeat = (time) => {
      if (stepIndex === 0) {
        setCurrentPattern(patternIndex);
        setCurrentStep(stepIndex);
      }
      instruments.forEach((instrument, index) => {
        const pattern = getPattern(index);
        const note = pattern[stepIndex];
        const instrumentType = instrument.synth.name;
        if (instrumentType === 'NoiseSynth') {
          if (note !== '') {
            console.log(instrumentType);
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
        if (songMode) {
          patternIndex++;
        }
        setCurrentStep(stepIndex);
        stepIndex = 0;
      }
      if (patterns.synth1[patternIndex] === undefined) {
        patternIndex = 0;
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
