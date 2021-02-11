import React, { useContext, useEffect } from 'react';
import './App.css';
import Synthesizer from './Synthesizer';
import { song1, song2, masterList } from './song';
import InputsSection from './components/InputsSection';
import { SynthContext } from './contexts/SynthContextProvider';
import * as Tone from 'tone';
// import Instrument from './data/InstrumentKit';
import Instrument, { DrumTest } from './data/InstrumentKitTest';
import * as C from './constants';
import MasterList from './components/MasterList';
import { cloneDeep } from 'lodash';

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
    octave,
    setOctave,
    masterListIndex,
    setMasterListIndex,
  } = useContext(SynthContext);

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    setCurrentStep(null);
  };

  const handlePatternSelect = (e) => {
    setSongMode(false);
    setCurrentPattern(e.target.value);
  };

  const handleSongMode = () => {
    setSongMode(true);
    setPatternMode(false);
    setMasterListIndex(0);
    setCurrentPattern(song.masterList[0]);
  };
  const handlePatternMode = () => {
    setPatternMode(true);
    setSongMode(false);
  };

  const handleSave = () => {
    const updatedSong = cloneDeep(song);
    setSong(updatedSong);
    localStorage.setItem(`${song.title}`, JSON.stringify(updatedSong));
  };

  const handleNewPattern = () => {
    const lastPattern = Object.keys(song.patterns.synth1).length - 1;
    const updatedSong = cloneDeep(song);
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
    const updatedSong = cloneDeep(song);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][currentPattern] = updatedSong.patterns[synth][copiedPattern];
    });
    setSong(updatedSong);
  };

  const handleClearPattern = () => {
    const updatedSong = cloneDeep(song);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][currentPattern] = C.emptySynthPattern;
    });
    setSong(updatedSong);
  };

  const handleOctaveChange = (e) => {
    setOctave(parseInt(e.target.value));
  };

  const handleSongName = (e) => {
    const updatedSong = cloneDeep(song);
    updatedSong.title = e.target.value;
    setSong(updatedSong);
  };

  const handleNewSong = () => {
    setSong(C.emptySong);
    console.log('new song');
  };

  const test = () => {
    // const drum = new Drum('triangle');
    // drum.gain.toDestination();
    // drum.play('C4');
    // const kickDrum = new Tone.MembraneSynth({
    //   volume: 4,
    //   octaves: 2,
    //   envelope: {
    //     decay: 0.4,
    //     sustain: 0.1,
    //     release: 0.01,
    //   },
    // });
    // const gain = new Tone.Gain(0.5).toDestination();
    // kickDrum.connect(gain);
    // console.log(kickDrum.get());

    // kickDrum.triggerAttackRelease('C3', '32n');
    const drum = new DrumTest('hihat');
    drum.gain.toDestination();
    drum.play();
  };

  useEffect(() => {
    const songFromStorage = JSON.parse(localStorage.getItem('tester'));
    if (songFromStorage) {
      setSong(songFromStorage);
    } else {
      setSong(song2);
    }
  }, []);

  useEffect(() => {
    if (song) {
      document.getElementById('patternSelect').selectedIndex = currentPattern;
    }
  }, [currentPattern]);

  useEffect(() => {
    if (song) {
      const tracks = song.oscTypes;
      Object.keys(tracks).forEach((track) => {
        console.log(tracks[track]);
      });
    }
  }, [song]);

  return (
    <div>
      <h1>Welcome</h1>
      {song && <MasterList />}
      <button onClick={() => test()}>Test me</button>
      <button onClick={() => start()}>Play</button>
      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => handleSongMode()}>Song</button>
      <button onClick={() => handlePatternMode()}>Pattern</button>
      <button onClick={() => handleSave()}>Save</button>
      <button onClick={() => handleNewPattern()}>New pattern</button>
      <button onClick={() => handleClearPattern()}>Clear</button>
      <button onClick={() => handleCopyPattern()}>Copy</button>
      <button onClick={() => handlePastePattern()}>Paste</button>
      <button onClick={() => handleNewSong()}>New song</button>
      <input type="number" min="1" max="9" value={octave} onChange={(e) => handleOctaveChange(e)} />
      <input type="text" value={song ? song.title : ''} onChange={(e) => handleSongName(e)} />
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
