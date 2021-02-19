import React, { useContext, useEffect } from 'react';
import './App.css';
import Synthesizer from './Synthesizer';
import InputsSection from './components/InputsSection';
import { SynthContext } from './contexts/SynthContextProvider';
import * as C from './constants';
import MasterList from './components/MasterList';
import { cloneDeep } from 'lodash';
import ControlPanel from './components/ControlPanel';

function App() {
  const { isPlaying, song, setSong } = useContext(SynthContext);

  useEffect(() => {
    const songFromStorage = JSON.parse(localStorage.getItem('bajser'));
    if (songFromStorage) {
      setSong(songFromStorage);
    } else {
      const newSong = cloneDeep(C.emptySong);
      setSong(newSong);
    }
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      {song && <MasterList />}
      <ControlPanel />
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
