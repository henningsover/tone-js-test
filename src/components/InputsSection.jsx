import React, { useState, useEffect, useContext } from 'react';
import { SynthContext } from '../contexts/SynthContextProvider';
import SynthInputsContainer from './SynthInputsContainer';
import { getNote } from './inputsHelper';

export default function InputsSection() {
  const { currentPattern, song, setSong } = useContext(SynthContext);

  const [synth1Pattern, setSynth1Pattern] = useState(song.patterns.synth1[currentPattern]);
  const [synth2Pattern, setSynth2Pattern] = useState(song.patterns.synth2[currentPattern]);
  const [synth3Pattern, setSynth3Pattern] = useState(song.patterns.synth3[currentPattern]);
  const [synth4Pattern, setSynth4Pattern] = useState(song.patterns.synth4[currentPattern]);

  const handleSynth1Inputs = (e, index) => {
    e.preventDefault();
    //TODO Handle input as piano keys
    // const charCode = e.code;
    // const target = e.target;
    // const stepValue = getNote(charCode, 4);
    // if (charCode === 'ArrowUp') {
    //   target.previousSibling.focus();
    // }
    // if (charCode === 'ArrowDown') {
    //   target.nextSibling.focus();
    // }
    const stepValue = e.target.value.toUpperCase();
    if (stepValue !== undefined) {
      const updatedPattern = [...synth1Pattern];
      updatedPattern[index] = stepValue;
      const updatedSong = { ...song };
      updatedSong.patterns.synth1[currentPattern] = updatedPattern;
      setSong(updatedSong);
      setSynth1Pattern(song.patterns.synth1[currentPattern]);
    }
  };
  const handleSynth2Inputs = (e, index) => {
    e.preventDefault();
    const updatedPattern = [...synth2Pattern];
    updatedPattern[index] = e.target.value.toUpperCase();
    song.patterns.synth2[currentPattern] = updatedPattern;
    setSynth2Pattern(song.patterns.synth2[currentPattern]);
  };
  const handleSynth3Inputs = (e, index) => {
    e.preventDefault();
    const updatedPattern = [...synth3Pattern];
    updatedPattern[index] = e.target.value.toUpperCase();
    song.patterns.synth3[currentPattern] = updatedPattern;
    setSynth3Pattern(song.patterns.synth3[currentPattern]);
  };
  const handleSynth4Inputs = (e, index) => {
    e.preventDefault();
    const updatedPattern = [...synth4Pattern];
    updatedPattern[index] = e.target.value.toUpperCase();
    song.patterns.synth4[currentPattern] = updatedPattern;
    setSynth4Pattern(song.patterns.synth4[currentPattern]);
  };

  useEffect(() => {
    setSynth1Pattern(song.patterns.synth1[currentPattern]);
    setSynth2Pattern(song.patterns.synth2[currentPattern]);
    setSynth3Pattern(song.patterns.synth3[currentPattern]);
    setSynth4Pattern(song.patterns.synth4[currentPattern]);
  }, [currentPattern, song]);

  return (
    <>
      {song && (
        <section style={{ display: 'flex', flexDirection: 'row' }}>
          <SynthInputsContainer id={'synth1Inputs'} pattern={synth1Pattern} onChangeHandler={handleSynth1Inputs} />
          <SynthInputsContainer id={'synth2Inputs'} pattern={synth2Pattern} onChangeHandler={handleSynth2Inputs} />
          <SynthInputsContainer id={'synth3Inputs'} pattern={synth3Pattern} onChangeHandler={handleSynth3Inputs} />
          <SynthInputsContainer id={'synth4Inputs'} pattern={synth4Pattern} onChangeHandler={handleSynth4Inputs} />
        </section>
      )}
    </>
  );
}
