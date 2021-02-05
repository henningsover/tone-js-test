import React, { useEffect, useContext } from 'react';
import { SynthContext } from './contexts/SynthContextProvider';
import * as Tone from 'tone';

export default function Synthesizer({ patterns, oscTypes }) {
  const { setCurrentPattern, currentPattern, setCurrentStep, currentStep, songMode } = useContext(SynthContext);

  useEffect(() => {
    // Tone.Transport.bpm.value = 70;
    const synths = [new Tone.Synth(), new Tone.Synth(), new Tone.Synth(), new Tone.Synth()];

    synths[0].oscillator.type = oscTypes.synth1;
    synths[1].oscillator.type = oscTypes.synth2;
    synths[2].oscillator.type = oscTypes.synth3;
    synths[3].oscillator.type = oscTypes.synth4;

    const gain = new Tone.Gain(0.6);
    synths.forEach((synth) => synth.connect(gain));

    gain.toDestination();

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
      synths.forEach((synth, index) => {
        const pattern = getPattern(index);
        const note = pattern[stepIndex];
        if (note !== 'X' && note !== '') {
          synth.triggerRelease(time);
          const next = stepIndex + 1;
          synth.triggerAttack(note, time + 0.01);
        }
        if (note === 'X') {
          synth.triggerRelease(time);
        }
      });
      if (stepIndex < patterns.synth1[1].length - 1) {
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
      synths.forEach((synth) => synth.dispose());
    };
  }, []);
  return null;
}
