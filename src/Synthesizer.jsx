import React, { useEffect } from 'react';
import * as Tone from 'tone';

export default function Synthesizer({ notes, oscType }) {
  useEffect(() => {
    const synth = new Tone.Synth();
    synth.oscillator.type = oscType;
    synth.toDestination();

    let index = 0;

    const getLength = (next) => {
      let counter = 0;
      for (let i = next; i < notes.length; i++) {
        if (notes[i] === '') {
          counter++;
        }
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
      let note = notes[index];
      if (note !== 'X' && note !== '') {
        const next = index + 1;
        synth.triggerAttackRelease(note, getLength(next), time);
      }
      if (index < 7) {
        index++;
      } else {
        index = 0;
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
