import React, { useContext, useEffect } from 'react';
import { SynthContext } from '../contexts/SynthContextProvider';
import '../App.css';
import { getNote, getPerc } from './inputsHelper';
import { cloneDeep } from 'lodash';

export default function SynthInputsContainer({ id, pattern, setPattern }) {
  const { currentStep, currentPattern, song, setSong, octave } = useContext(SynthContext);
  const synthToUpdate = id.replace('Inputs', '');

  const update = (value, indexInPattern, indexInStep) => {
    const updatedPattern = cloneDeep(pattern);
    updatedPattern[indexInPattern][indexInStep] = value;
    const updatedSong = cloneDeep(song);
    updatedSong.patterns[`${synthToUpdate}`][currentPattern] = updatedPattern;
    setSong(updatedSong);
    setPattern(updatedSong.patterns[`${synthToUpdate}`][currentPattern]);
  };

  const handleNoteChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const charCode = e.code;
    const noteValue = getNote(charCode, octave);
    const target = e.target;
    if (charCode === 'ArrowUp' && target.previousSibling) {
      target.previousSibling.focus();
    }
    if (charCode === 'ArrowDown' && target.nextSibling) {
      target.nextSibling.focus();
    }
    if (noteValue !== undefined) {
      update(noteValue, indexInPattern, indexInStep);
    }
  };

  const handleInstrumentChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const instValue = e.target.value;
    const regex = /^[0-9]$|^$/;
    const OK = regex.test(instValue);
    if (OK) {
      update(instValue, indexInPattern, indexInStep);
    } else {
      e.target.value = '';
    }
  };

  const handleEffectNumberChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const effectValue = e.target.value;
    update(effectValue, indexInPattern, indexInStep);
  };
  const handleEffectValueChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const effectValue = e.target.value;
    update(effectValue, indexInPattern, indexInStep);
  };

  // useEffect(() => {
  //   const inputs = document.getElementById(id).querySelectorAll('.synth-inputs-container');
  //   if (currentStep !== null) {
  //     inputs.forEach((input) => {
  //       input.classList.remove('current-pattern');
  //     });
  //     inputs[currentStep].classList.add('current-pattern');
  //   } else {
  //     inputs.forEach((input) => {
  //       input.classList.remove('current-pattern');
  //     });
  //   }
  // }, [currentStep]);

  return (
    <div id={id} style={{ display: 'flex', flexDirection: 'column', borderWidth: 1, borderStyle: 'solid' }}>
      {pattern.map((step, index) => {
        return (
          <div key={index} className="synth-inputs-container">
            <input
              style={{ maxWidth: 50 }}
              // key={index}
              value={step[0]}
              className="synth-input"
              //TODO Handle input as piano keys
              data-synth="hej"
              onKeyDown={(e) => handleNoteChange(e, index, 0)}
              // onChange={(e) => onChangeHandler(e, index, synthToUpdate)}
            />
            <input
              style={{ maxWidth: 50 }}
              type="number"
              min="0"
              max="6"
              value={step[1]}
              onChange={(e) => handleInstrumentChange(e, index, 1)}
            />
            <input
              style={{ maxWidth: 50 }}
              type="number"
              min="0"
              max="1"
              value={step[2]}
              onChange={(e) => handleEffectNumberChange(e, index, 2)}
            />
            <input
              style={{ maxWidth: 50 }}
              type="number"
              min="0"
              max="99"
              value={step[3]}
              onChange={(e) => handleEffectValueChange(e, index, 3)}
            />
          </div>
        );
      })}
    </div>
  );
}
