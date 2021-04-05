import React, { useContext, useEffect } from 'react';

import * as S from './styled'

import { SynthContext } from '../../contexts/SynthContextProvider';
import MasterList from '../../components/MasterList';

export default function ControlPanel({isOwnSong}) {
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
    <S.ControlPanel>
      <S.ControlPanelGridRow>
        <S.ControlPanelInput type="text" value={song ? song.title : ''} onChange={(e) => handleSongName(e)} />
      </S.ControlPanelGridRow>

      <S.ControlPanelGridRow>
        <S.ControlPanelCol>
          <S.ControlPanelHeading>Playback</S.ControlPanelHeading>
          <S.FlexContainer>
            <S.ControlPanelButton onClick={() => start()}>Play</S.ControlPanelButton>
            <S.ControlPanelButton onClick={() => stop()}>Stop</S.ControlPanelButton>
          </S.FlexContainer>
        </S.ControlPanelCol>
        <S.ControlPanelCol>
          <S.ControlPanelHeading>Playback mode</S.ControlPanelHeading>
          <S.FlexContainer>
            <S.ControlPanelButton onClick={() => handleSongMode()}>Song</S.ControlPanelButton>
            <S.ControlPanelButton onClick={() => handlePatternMode()}>Pattern</S.ControlPanelButton>
          </S.FlexContainer>
        </S.ControlPanelCol>
      </S.ControlPanelGridRow>

      <S.ControlPanelCol>
        <S.ControlPanelHeading>Handle song</S.ControlPanelHeading>
        <S.FlexContainer>
          <S.ControlPanelButton onClick={() => handleNewSong()}>New</S.ControlPanelButton>
          <S.ControlPanelButton onClick={() => toggleLoadSongModal()}>Load</S.ControlPanelButton>
        {isOwnSong && 
          <S.ControlPanelButton onClick={() => handleSave()}>Save</S.ControlPanelButton>
        }
        </S.FlexContainer>
      </S.ControlPanelCol>

      <S.ControlPanelCol>
      <S.ControlPanelHeading>Handle pattern</S.ControlPanelHeading>
      <S.FlexContainer>
        <S.ControlPanelButton onClick={() => handleCopyPattern()}>Copy</S.ControlPanelButton>
        <S.ControlPanelButton onClick={() => handlePastePattern()}>Paste</S.ControlPanelButton>
        <S.ControlPanelButton onClick={() => handleClearPattern()}>Clear</S.ControlPanelButton>
      </S.FlexContainer>
      </S.ControlPanelCol>

      <S.FlexContainer>
      {song ? (
        <S.ControlPanelSelect id="patternSelect" onChange={(e) => handlePatternSelect(e)}>
          {Object.keys(song.patterns.synth1).map((pattern, index) => {
            return (
              <option key={index} value={pattern}>
                {pattern}
              </option>
            );
          })}
        </S.ControlPanelSelect>
      ) : null}
        <S.ControlPanelInput type="number" min="1" max="9" value={octave} onChange={(e) => handleOctaveChange(e)} />
        <S.ControlPanelButton onClick={() => handleNewPattern()}>New pattern</S.ControlPanelButton>
      </S.FlexContainer>

    </S.ControlPanel>
  );
}
