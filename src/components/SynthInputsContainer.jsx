import React, { useContext, useEffect, useState } from 'react';
import { SynthContext } from '../contexts/SynthContextProvider';
import '../App.css';

export default function SynthInputsContainer({ id, pattern, onChangeHandler }) {
  const { isPlaying, currentStep } = useContext(SynthContext);
  let inputs;
  const synthToUpdate = id.replace('Inputs', '');

  useEffect(() => {
    inputs = document.getElementById(id).querySelectorAll('input');
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
    <div id={id} style={{ display: 'flex', flexDirection: 'column' }}>
      {pattern.map((note, index) => {
        return (
          <input
            key={index}
            value={note}
            className="synth-input"
            //TODO Handle input as piano keys
            // onKeyDown={(e) => onChangeHandler(e, index, synthToUpdate)}
            onChange={(e) => onChangeHandler(e, index, synthToUpdate)}
          />
        );
      })}
    </div>
  );
}
