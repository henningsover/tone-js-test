import React, { useContext, useEffect } from 'react';
import './App.css';
import Synthesizer from './Synthesizer';
import { song1, song2 } from './song';
import InputsSection from './components/InputsSection';
import { SynthContext } from './contexts/SynthContextProvider';
import * as Tone from 'tone';
import Instrument from './data/InstrumentKit';
import * as C from './constants';

function App() {
  const {
    isPlaying,
    setIsPlaying,
    setCurrentPattern,
    setCurrentStep,
    currentPattern,
    currentStep,
    setSongMode,
    setPatternMode,
    song,
    setSong,
    copiedPattern,
    setCopiedPattern,
  } = useContext(SynthContext);

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    setCurrentStep(null);
  };

  const handlePatternSelect = (e) => {
    setCurrentPattern(e.target.value);
  };

  const handleSongMode = () => {
    setSongMode(true);
    setPatternMode(false);
    setCurrentPattern(0);
  };
  const handlePatternMode = () => {
    setPatternMode(true);
    setSongMode(false);
  };

  const handleSave = () => {
    localStorage.setItem('batman', JSON.stringify(song));
  };

  const handleNewPattern = () => {
    const lastPattern = Object.keys(song.patterns.synth1).length - 1;
    const updatedSong = { ...song };
    console.log(lastPattern);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][lastPattern + 1] = C.emptySynthPattern;
    });
    setSong(updatedSong);
    setCurrentPattern(lastPattern + 1);
  };

  const handleCopyPattern = () => {
    setCopiedPattern(currentPattern);
  };

  const handlePastePattern = () => {
    const updatedSong = { ...song };
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][currentPattern] = updatedSong.patterns[synth][copiedPattern];
    });
    setSong(updatedSong);
  };

  const handleClearPattern = () => {
    const updatedSong = { ...song };
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][currentPattern] = C.emptySynthPattern;
    });
    setSong(updatedSong);
  };

  useEffect(() => {
    const songFromStorage = JSON.parse(localStorage.getItem('batman'));
    if (songFromStorage) {
      setSong(songFromStorage);
    } else {
      setSong(song2);
    }
    console.log('set song');
    console.log(song2);
  }, []);

  useEffect(() => {
    if (song) {
      document.getElementById('patternSelect').selectedIndex = currentPattern;
    }
  }, [currentPattern]);

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => start()}>Play</button>
      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => handleSongMode()}>Song</button>
      <button onClick={() => handlePatternMode()}>Pattern</button>
      <button onClick={() => handleSave()}>Save</button>
      <button onClick={() => handleNewPattern()}>New pattern</button>
      <button onClick={() => handleClearPattern()}>Clear</button>
      <button onClick={() => handleCopyPattern()}>Copy</button>
      <button onClick={() => handlePastePattern()}>Paste</button>
      {song ? (
        <select id="patternSelect" onChange={(e) => handlePatternSelect(e)}>
          {Object.keys(song.patterns.synth1).map((pattern, index) => {
            return (
              <option key={index} value={pattern}>
                {pattern}
              </option>
            );
          })}
        </select>
      ) : null}
      {song && <InputsSection />}
      {isPlaying ? (
        <>
          <Synthesizer patterns={song.patterns} oscTypes={song.oscTypes} />
        </>
      ) : null}
    </div>
  );
}

export default App;
