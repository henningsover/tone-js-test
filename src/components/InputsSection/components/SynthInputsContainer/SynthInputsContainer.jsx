import React, { useContext, useEffect } from 'react';
import { SynthContext } from '../../../../contexts/SynthContextProvider';
import { getNote } from '../../inputsHelper';
import { cloneDeep } from 'lodash';
import * as S from './styled'

export default function SynthInputsContainer({ id, pattern }) {
  const { currentPatternIndex, song, setSong, octave, currentStepIndex } = useContext(SynthContext);
  const synthToUpdate = id.replace('Inputs', '');

  const isValidInput =(value, min, max) => {
    if (value > max | value < min) {
      return false
    }
    return true
  }

  const updatePattern = (value, indexInPattern, indexInStep) => {
    const updatedPattern = cloneDeep(pattern);
    updatedPattern[indexInPattern][indexInStep] = value;
    const updatedSong = cloneDeep(song);
    updatedSong.patterns[`${synthToUpdate}`][currentPatternIndex] = updatedPattern;
    setSong(updatedSong);
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
    if (isValidInput(parseInt(instValue), 0, 6)) {
      updatePattern(instValue, indexInPattern, indexInStep);
    }
  };

  const handleEffectNumberChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const effectNumber = e.target.value;
    if (isValidInput(parseInt(effectNumber), 0, 1)) {
      updatePattern(effectNumber, indexInPattern, indexInStep);
    }
  };

  const handleEffectValueChange = (e, indexInPattern, indexInStep) => {
    e.preventDefault();
    const effectValue = e.target.value;
    if (isValidInput(parseInt(effectValue), 0, 99)) {
      updatePattern(effectValue, indexInPattern, indexInStep);
    }
  };

  useEffect(() => {
    const inputs = document.getElementById(id).querySelectorAll('.synth-inputs-container');
    if (currentStepIndex !== null) {
      inputs.forEach((input) => {
        input.classList.remove('current-pattern');
      });
      inputs[currentStepIndex].classList.add('current-pattern');
    } else {
      inputs.forEach((input) => {
        input.classList.remove('current-pattern');
      });
    }
  }, [currentStepIndex]);

  return (
    <S.SynthInputContainer id={id} style={{ display: 'flex', flexDirection: 'column', borderWidth: 1, borderStyle: 'solid' }}>
      {pattern &&
        Object.keys(pattern).map((step, index) => {
          return (
            <S.SynthInputRow key={index} className="synth-inputs-container">
              <S.NoteInput
                // key={index}
                value={pattern[step][0]}
                className="synth-input"
                //TODO Handle input as piano keys
                data-index-in-step="0"
                onKeyDown={(e) => handleNoteChange(e, index, 0)}
                // onChange={(e) => onChangeHandler(e, index, synthToUpdate)}
              />
              <S.IntrumentInput
                type="number"
                min="0"
                max="6"
                value={pattern[step][1]}
                className="synth-input"
                data-index-in-step="1"
                onChange={(e) => handleInstrumentChange(e, index, 1)}
              />
              <S.EffectInput
                type="number"
                min="0"
                max="1"
                value={pattern[step][2]}
                className="synth-input"
                data-index-in-step="2"
                onChange={(e) => handleEffectNumberChange(e, index, 2)}
              />
              <S.EffectValInput
                type="number"
                min="0"
                max="99"
                value={pattern[step][3]}
                className="synth-input"
                data-index-in-step="3"
                onChange={(e) => handleEffectValueChange(e, index, 3)}
              />
            </S.SynthInputRow>
          );
        })}
    </S.SynthInputContainer>
  );
}
