import React, { useContext, useEffect } from 'react';
import { SynthContext } from '../../../../contexts/SynthContextProvider';
import '../../../../App.css';
import { getNote } from '../../inputsHelper';
import { cloneDeep } from 'lodash';

export default function SynthInputsContainer({ id, pattern, setPattern }) {
  const { currentPattern, song, setSong, octave, currentStep } = useContext(SynthContext);
  const synthToUpdate = id.replace('Inputs', '');

  const updatePattern = (value, indexInPattern, indexInStep) => {
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
    if (noteValue !== undefined) {
      updatePattern(noteValue, indexInPattern, indexInStep);
    }
  };

  const handleInstrumentChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const instValue = e.target.value;
    const regex = /^[0-9]$|^$/;
    const OK = regex.test(instValue);
    if (OK) {
      updatePattern(instValue, indexInPattern, indexInStep);
    } else {
      e.target.value = '';
    }
  };

  const handleEffectNumberChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const effectValue = e.target.value;
    updatePattern(effectValue, indexInPattern, indexInStep);
  };

  const handleEffectValueChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const effectValue = e.target.value;
    updatePattern(effectValue, indexInPattern, indexInStep);
  };

  useEffect(() => {
    const inputs = document.getElementById(id).querySelectorAll('.synth-inputs-container');
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
      {pattern &&
        Object.keys(pattern).map((step, index) => {
          return (
            <div key={index} className="synth-inputs-container">
              <input
                style={{ maxWidth: 50, width: 50 }}
                // key={index}
                value={pattern[step][0]}
                className="synth-input"
                //TODO Handle input as piano keys
                data-index-in-step="0"
                onKeyDown={(e) => handleNoteChange(e, index, 0)}
                // onChange={(e) => onChangeHandler(e, index, synthToUpdate)}
              />
              <input
                style={{ maxWidth: 50, width: 50 }}
                type="number"
                min="0"
                max="6"
                value={pattern[step][1]}
                className="synth-input"
                data-index-in-step="1"
                onChange={(e) => handleInstrumentChange(e, index, 1)}
              />
              <input
                style={{ maxWidth: 50, width: 50 }}
                type="number"
                min="0"
                max="1"
                value={pattern[step][2]}
                className="synth-input"
                data-index-in-step="2"
                onChange={(e) => handleEffectNumberChange(e, index, 2)}
              />
              <input
                style={{ maxWidth: 50, width: 50 }}
                type="number"
                min="0"
                max="99"
                value={pattern[step][3]}
                className="synth-input"
                data-index-in-step="3"
                onChange={(e) => handleEffectValueChange(e, index, 3)}
              />
            </div>
          );
        })}
    </div>
  );
}
