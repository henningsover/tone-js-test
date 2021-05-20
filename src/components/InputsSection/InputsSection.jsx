import React, { useState, useEffect, useContext } from 'react';
import { SynthContext } from '../../contexts/SynthContextProvider';
import SynthInputsContainer from './components/SynthInputsContainer';

import * as S from './styled'

export default function InputsSection() {
  const { currentPatternIndex, song, setOctave } = useContext(SynthContext);

  const [synth1Pattern, setSynth1Pattern] = useState(song.patterns.synth1[`${currentPatternIndex}`]);
  const [synth2Pattern, setSynth2Pattern] = useState(song.patterns.synth2[`${currentPatternIndex}`]);
  const [synth3Pattern, setSynth3Pattern] = useState(song.patterns.synth3[`${currentPatternIndex}`]);
  const [synth4Pattern, setSynth4Pattern] = useState(song.patterns.synth4[`${currentPatternIndex}`]);

  useEffect(() => {
    setSynth1Pattern(song.patterns.synth1[`${currentPatternIndex}`]);
    setSynth2Pattern(song.patterns.synth2[`${currentPatternIndex}`]);
    setSynth3Pattern(song.patterns.synth3[`${currentPatternIndex}`]);
    setSynth4Pattern(song.patterns.synth4[`${currentPatternIndex}`]);
  }, [currentPatternIndex, song]);

  const noteInputControls = (e) => {
    const acceptedKeys = [
      'ArrowUp','ArrowDown', 'ArrowRight',
      'ArrowLeft', 'KeyQ', 'KeyW'
    ];
    const charCode = e.code;
    if (acceptedKeys.includes(charCode)) {
      const inputs = document.querySelectorAll('.synth-input');
      let focusedElement;
      inputs.forEach((input) => {
        if (input === document.activeElement) {
          focusedElement = input;
        }
      });
      if (focusedElement) {
        e.preventDefault();
        const inputsContainer = focusedElement.parentNode;
        const indexInStep = focusedElement.dataset.indexInStep;
        if (charCode === acceptedKeys[0] && inputsContainer.previousSibling) {
          inputsContainer.previousSibling.children[indexInStep].focus();
        }
        if (charCode === acceptedKeys[1] && inputsContainer.nextSibling) {
          inputsContainer.nextSibling.children[indexInStep].focus();
        }
        if (charCode === acceptedKeys[2] && focusedElement.nextSibling) {
          focusedElement.nextSibling.focus();
        }
        if (charCode === acceptedKeys[3] && focusedElement.previousSibling) {
          focusedElement.previousSibling.focus();
        }
        if (charCode === acceptedKeys[4]) {
          setOctave(previousState => {
            if(previousState > 1) {
              return previousState - 1
            } else {
              return previousState
            }
          });
        }
        if (charCode === acceptedKeys[5]) {
          setOctave(previousState => {
            if(previousState < 6) {
              return previousState + 1
            } else {
              return previousState
            }
          });
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => noteInputControls(e));
  }, []);

  return (
    <>
      {song && (
        <S.InputsSection>
          <SynthInputsContainer id={'synth1Inputs'} pattern={synth1Pattern} />
          <SynthInputsContainer id={'synth2Inputs'} pattern={synth2Pattern} />
          <SynthInputsContainer id={'synth3Inputs'} pattern={synth3Pattern} />
          <SynthInputsContainer id={'synth4Inputs'} pattern={synth4Pattern} />
        </S.InputsSection>
      )}
    </>
  );
}
