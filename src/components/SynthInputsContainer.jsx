import React, { useContext, useEffect, useState } from 'react';
import { SynthContext } from '../contexts/SynthContextProvider';
import '../App.css';

export default function SynthInputsContainer({ id, pattern, onChangeHandler }) {
  const { isPlaying, currentStep } = useContext(SynthContext);
  let inputs;

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
        return <input key={index} value={note} onChange={(e) => onChangeHandler(e, index)} />;
      })}
    </div>
  );
}
