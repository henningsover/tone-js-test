import React, { useState, useEffect } from 'react';
import Synthesizer from './Synthesizer';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']);
  const [notes2, setNotes2] = useState(['E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']);

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
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
          <Synthesizer notes={notes} oscType="sawtooth" /> <Synthesizer notes={notes2} oscType="square" />
        </>
      ) : null}
    </div>
  );
}

export default App;
