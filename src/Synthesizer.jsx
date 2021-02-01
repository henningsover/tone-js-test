import React, { useEffect } from 'react';
import * as Tone from 'tone';

export default function Synthesizer({ patterns, oscType }) {
  useEffect(() => {
    const synth = new Tone.Synth();
    Tone.Transport.bpm.value = 90;
    synth.oscillator.type = oscType;
    synth.toDestination();

    let patternIndex = 0;
    let stepIndex = 0;

    const getLength = (next) => {
      let counter = 0;
      let pattern = patterns[patternIndex];
      for (let i = next; i < pattern.length; i++) {
        if (pattern[i] !== '') {
          break;
        }
        counter++;
      }
      switch (counter) {
        case 1:
          return '8n';
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
          break;
      }
    };

    const repeat = (time) => {
      let note = patterns[patternIndex][stepIndex];
      if (note !== 'X' && note !== '') {
        const next = stepIndex + 1;
        synth.triggerAttackRelease(note, getLength(next), time);
      }

      if (stepIndex < 7) {
        stepIndex++;
      } else {
        patternIndex++;
        stepIndex = 0;
      }
      if (patterns[patternIndex] === undefined) {
        patternIndex = 0;
      }
    };
    Tone.Transport.scheduleRepeat((time) => {
      repeat(time);
    }, '16n');
    Tone.Transport.start();
    return () => {
      Tone.Transport.stop();
      synth.dispose();
    };
  }, []);
  return null;
}
