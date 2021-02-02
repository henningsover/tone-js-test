import React, { useContext } from 'react';
import './App.css';
import Synthesizer from './Synthesizer';
import { song } from './song';
import InputsSection from './components/InputsSection';
import { SynthContext } from './contexts/SynthContextProvider';

function App() {
  const { isPlaying, setIsPlaying, setCurrentPattern, setCurrentStep } = useContext(SynthContext);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [currentPattern, setCurrentPattern] = useState(0);

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    setCurrentPattern(0);
    setCurrentStep(null);
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => start()}>Play</button>
      <button onClick={() => stop()}>Stop</button>
      <InputsSection />
      {isPlaying ? (
        <>
          <Synthesizer patterns={song.patterns} oscTypes={song.oscTypes} />
        </>
      ) : null}
    </div>
  );
}

export default App;
