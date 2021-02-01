import React, { useState, useEffect } from 'react';
import Synthesizer from './Synthesizer';
import { synth1, synth2, synth3 } from './song';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState(['C4', '', 'E4', '', 'G4', '', 'B4', 'C5']);
  const [notes2, setNotes2] = useState(['E4', '', 'G4', '', 'B4', '', 'D5', 'E5']);

  const next1 = ['B4', '', 'D4', '', 'F4', '', 'A4', 'B5'];

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
  };

  const handleChange = () => {
    setIsPlaying(false);
    setNotes(next1);
    setIsPlaying(true);
  };

  const handleSynth1Inputs = (e, index) => {
    e.preventDefault();
    let updatedNotes = [...notes];
    updatedNotes[index] = e.target.value.toUpperCase();
    setNotes(updatedNotes);
  };
  const handleSynth2Inputs = (e, index) => {
    e.preventDefault();
    let updatedNotes = [...notes2];
    updatedNotes[index] = e.target.value.toUpperCase();
    setNotes2(updatedNotes);
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => start()}>Play</button>
      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => handleChange()}>Change</button>
      <div>
        {notes.map((note, index) => {
          return <input key={index} value={note} onChange={(e) => handleSynth1Inputs(e, index)} />;
        })}
      </div>
      <div>
        {notes2.map((note, index) => {
          return <input key={index} value={note} onChange={(e) => handleSynth2Inputs(e, index)} />;
        })}
      </div>
      {isPlaying ? (
        <>
          <Synthesizer patterns={synth1} oscType="sawtooth" /> <Synthesizer patterns={synth2} oscType="square" />
          <Synthesizer patterns={synth3} oscType="sawtooth" />
        </>
      ) : null}
    </div>
  );
}

export default App;
