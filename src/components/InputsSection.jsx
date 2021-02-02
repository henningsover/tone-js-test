import React, { useState, useEffect, useContext } from 'react';
import { SynthContext } from '../contexts/SynthContextProvider';
import { song } from '../song';

export default function InputsSection() {
  const { currentPattern } = useContext(SynthContext);

  const [synth1Pattern, setSynth1Pattern] = useState(song.patterns.synth1[currentPattern]);
  const [synth2Pattern, setSynth2Pattern] = useState(song.patterns.synth2[currentPattern]);
  const [synth3Pattern, setSynth3Pattern] = useState(song.patterns.synth3[currentPattern]);
  const [synth4Pattern, setSynth4Pattern] = useState(song.patterns.synth4[currentPattern]);

  const handleSynth1Inputs = (e, index) => {
    e.preventDefault();
    const updatedPattern = [...synth1Pattern];
    updatedPattern[index] = e.target.value.toUpperCase();
    song.patterns.synth1[currentPattern] = updatedPattern;
    setSynth1Pattern(song.patterns.synth1[currentPattern]);
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
  }, [currentPattern]);

  return (
    <div>
      <div>
        {synth1Pattern.map((note, index) => {
          return <input key={index} value={note} onChange={(e) => handleSynth1Inputs(e, index)} />;
        })}
      </div>
      <div>
        {synth2Pattern.map((note, index) => {
          return <input key={index} value={note} onChange={(e) => handleSynth2Inputs(e, index)} />;
        })}
      </div>
      <div>
        {synth3Pattern.map((note, index) => {
          return <input key={index} value={note} onChange={(e) => handleSynth3Inputs(e, index)} />;
        })}
      </div>
      <div>
        {synth4Pattern.map((note, index) => {
          return <input key={index} value={note} onChange={(e) => handleSynth4Inputs(e, index)} />;
        })}
      </div>
    </div>
  );
}
