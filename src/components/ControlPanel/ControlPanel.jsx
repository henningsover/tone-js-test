import React, { useContext, useEffect } from 'react';
import { SynthContext } from '../../contexts/SynthContextProvider';

export default function ControlPanel() {
  const {
    start,
    stop,
    handleSongMode,
    handlePatternMode,
    handleSave,
    handleNewPattern,
    handleClearPattern,
    handleCopyPattern,
    handlePastePattern,
    handleNewSong,
    handleOctaveChange,
    handleSongName,
    handlePatternSelect,
    octave,
    song,
    currentPattern,
    toggleLoadSongModal,
  } = useContext(SynthContext);

  useEffect(() => {
    if (song) {
      document.getElementById('patternSelect').selectedIndex = currentPattern;
    }
  }, [currentPattern]);
  return (
    <div>
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
      <button onClick={() => toggleLoadSongModal()}>Load</button>
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
    </div>
  );
}
