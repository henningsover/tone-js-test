import React, { useState, useEffect, useContext } from 'react';
import { SynthContext } from '../contexts/SynthContextProvider';
import SynthInputsContainer from './SynthInputsContainer';

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
