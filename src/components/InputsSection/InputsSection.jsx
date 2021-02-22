import React, { useState, useEffect, useContext } from 'react';
import { SynthContext } from '../../contexts/SynthContextProvider';
import SynthInputsContainer from './components/SynthInputsContainer';

export default function InputsSection() {
  const { currentPattern, song } = useContext(SynthContext);

  const [synth1Pattern, setSynth1Pattern] = useState(song.patterns.synth1[`${currentPattern}`]);
  const [synth2Pattern, setSynth2Pattern] = useState(song.patterns.synth2[`${currentPattern}`]);
  const [synth3Pattern, setSynth3Pattern] = useState(song.patterns.synth3[`${currentPattern}`]);
  const [synth4Pattern, setSynth4Pattern] = useState(song.patterns.synth4[`${currentPattern}`]);

  useEffect(() => {
    setSynth1Pattern(song.patterns.synth1[`${currentPattern}`]);
    setSynth2Pattern(song.patterns.synth2[`${currentPattern}`]);
    setSynth3Pattern(song.patterns.synth3[`${currentPattern}`]);
    setSynth4Pattern(song.patterns.synth4[`${currentPattern}`]);
  }, [currentPattern, song]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      const acceptedKeys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
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
          if (charCode === 'ArrowUp' && inputsContainer.previousSibling) {
            inputsContainer.previousSibling.children[indexInStep].focus();
          }
          if (charCode === 'ArrowDown' && inputsContainer.nextSibling) {
            inputsContainer.nextSibling.children[indexInStep].focus();
          }
          if (charCode === 'ArrowRight' && focusedElement.nextSibling) {
            focusedElement.nextSibling.focus();
          }
          if (charCode === 'ArrowLeft' && focusedElement.previousSibling) {
            focusedElement.previousSibling.focus();
          }
        }
      }
    });
  }, []);

  return (
    <>
      {song && (
        <section style={{ display: 'flex', flexDirection: 'row' }}>
          <SynthInputsContainer id={'synth1Inputs'} pattern={synth1Pattern} setPattern={setSynth1Pattern} />
          <SynthInputsContainer id={'synth2Inputs'} pattern={synth2Pattern} setPattern={setSynth2Pattern} />
          <SynthInputsContainer id={'synth3Inputs'} pattern={synth3Pattern} setPattern={setSynth3Pattern} />
          <SynthInputsContainer id={'synth4Inputs'} pattern={synth4Pattern} setPattern={setSynth4Pattern} />
        </section>
      )}
    </>
  );
}
