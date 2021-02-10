import React, { useContext, useEffect } from 'react';
import { SynthContext } from '../contexts/SynthContextProvider';
import '../App.css';
import { getNote, getPerc } from './inputsHelper';

export default function SynthInputsContainer({ id, pattern, setPattern, type }) {
  const { currentStep, currentPattern, song, setSong, octave } = useContext(SynthContext);
  const synthToUpdate = id.replace('Inputs', '');

  const synthTypes = {
    Synth: 0,
    NoiseSynth: 1,
  };

  const handleSynthInputs = (e, index) => {
    e.preventDefault();
    const charCode = e.code;
    const stepValue = type === synthTypes.Synth ? getNote(charCode, octave) : getPerc(charCode);
    const target = e.target;
    if (charCode === 'ArrowUp' && target.previousSibling) {
      target.previousSibling.focus();
    }
    if (charCode === 'ArrowDown' && target.nextSibling) {
      target.nextSibling.focus();
    }
    if (stepValue !== undefined) {
      const updatedPattern = [...pattern];
      updatedPattern[index] = stepValue;
      const updatedSong = { ...song };
      updatedSong.patterns[`${synthToUpdate}`][currentPattern] = updatedPattern;
      setSong(updatedSong);
      setPattern(song.patterns[`${synthToUpdate}`][currentPattern]);
    }
  };

  useEffect(() => {
    const inputs = document.getElementById(id).querySelectorAll('input');
    if (currentStep !== null) {
      inputs.forEach((input) => {
        input.classList.remove('current-pattern');
      });
      inputs[currentStep].classList.add('current-pattern');
    } else {
      inputs.forEach((input) => {
        input.classList.remove('current-pattern');
      });
    }
  }, [currentStep]);

  return (
    <div id={id} style={{ display: 'flex', flexDirection: 'column', borderWidth: 1, borderStyle: 'solid' }}>
      {pattern.map((note, index) => {
        return (
          <input
            key={index}
            value={note}
            className="synth-input"
            //TODO Handle input as piano keys
            data-synth="hej"
            onKeyDown={(e) => handleSynthInputs(e, index)}
            // onChange={(e) => onChangeHandler(e, index, synthToUpdate)}
          />
        );
      })}
    </div>
  );
}
