import React, { useContext, useEffect } from 'react';
import './App.css';
import Synthesizer from './Synthesizer';
import { song1, song2 } from './song';
import InputsSection from './components/InputsSection';
import { SynthContext } from './contexts/SynthContextProvider';
import * as Tone from 'tone';

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
    localStorage.setItem('song', JSON.stringify(song));
  };

  useEffect(() => {
    const songFromStorage = JSON.parse(localStorage.getItem('song'));
    if (songFromStorage) {
      setSong(songFromStorage);
    } else {
      setSong(song2);
    }
    console.log('set song');
  }, []);

  useEffect(() => {
    if (song) {
      document.getElementById('patternSelect').selectedIndex = currentPattern;
    }
  }, [currentPattern]);

  const test = (noiseType) => {
    const noiseSynth = new Tone.NoiseSynth({
      noise: {
        type: noiseType,
      },
      envelope: {
        attack: 0.001,
        decay: 0.3,
        sustain: 0.005,
      },
    });
    var dist = new Tone.BitCrusher(4).toDestination();
    noiseSynth.connect(dist);
    noiseSynth.triggerAttackRelease('8n');
    console.log(noiseSynth);
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => start()}>Play</button>
      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => handleSongMode()}>Song</button>
      <button onClick={() => handlePatternMode()}>Pattern</button>
      <button onClick={() => handleSave()}>Save</button>
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
