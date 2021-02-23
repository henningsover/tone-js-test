import React, { useContext, useEffect } from 'react';
import './App.css';
import Synthesizer from './Synthesizer';
import InputsSection from './components/InputsSection';
import { SynthContext } from './contexts/SynthContextProvider';
import * as C from './constants';
import MasterList from './components/MasterList';
import { cloneDeep } from 'lodash';
import ControlPanel from './components/ControlPanel';
import LoginPage from './pages/LoginPage/LoginPage';
import TrackerPage from './pages/TrackerPage';
import { Switch, Route } from 'react-router-dom';

function App() {
  const { isPlaying, song, setSong } = useContext(SynthContext);

  useEffect(() => {
    const newSong = cloneDeep(C.emptySong);
    setSong(newSong);
  }, []);

  return (
    // <div>
    //   <h1>Welcome</h1>
    //   {song && <MasterList />}
    //   <ControlPanel />
    //   {song && <InputsSection />}
    //   {isPlaying ? (
    //     <>
    //       <Synthesizer patterns={song.patterns} />
    //     </>
    //   ) : null}
    //   <LoginPage />
    // </div>
    <Switch>
      <Route path="/tracker" component={TrackerPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  );
}

export default App;
