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
    handlePublish,
    handleNewPattern,
    handleClearPattern,
    handleCopyPattern,
    handlePastePattern,
    handleNewSong,
    handleSongName,
    handlePatternSelect,
    song,
    currentPatternIndex,
    toggleLoadSongModal,
  } = useContext(SynthContext);

  useEffect(() => {
    if (song) {
      document.getElementById('patternSelect').selectedIndex = currentPatternIndex;
    }
  }, [currentPatternIndex]);
  return (
    <S.ControlPanel>
      <S.FlexColContainer>
        <S.ContentWrapper>
          <span>Bpm</span>
          <span>Octave</span>
        </S.ContentWrapper>
      </S.FlexColContainer>
      <S.ControlPanelGridRow>
        <MasterList />
        <div style={{display:"grid", gap:10, border:"1px solid", padding:20}}>
          <S.FlexCol>
            <S.ControlPanelHeading>Playback</S.ControlPanelHeading>
            <div style={{display:"flex", flexDirection:"row"}}>
              <S.ControlPanelButton onClick={() => start()}>Play</S.ControlPanelButton>
              <S.ControlPanelButton onClick={() => stop()}>Stop</S.ControlPanelButton>
            </div>
          </S.FlexCol>
          <S.FlexCol>
            <S.ControlPanelHeading>Mode</S.ControlPanelHeading>
            <div style={{display:"flex", flexDirection:"row"}}>
              <S.ControlPanelButton onClick={() => handleSongMode()}>Song</S.ControlPanelButton>
              <S.ControlPanelButton onClick={() => handlePatternMode()}>Pattern</S.ControlPanelButton>
            </div>
          </S.FlexCol>
        </div>
      </S.ControlPanelGridRow>

      <S.FlexColContainer>
          <S.ControlPanelHeading>Handle song</S.ControlPanelHeading>
            <S.ContentWrapper>
              <div style={{width:"50%", marginRight: 10}}>
                <S.ControlPanelInput type="text" value={song ? song.title : ''} onChange={(e) => handleSongName(e)} />
              </div>
              <S.ButtonsContainer>
                <S.ControlPanelButton onClick={() => handleNewSong()}>New</S.ControlPanelButton>
                <S.ControlPanelButton onClick={() => toggleLoadSongModal()}>Load</S.ControlPanelButton>
                {isOwnSong && 
                  <>
                    <S.ControlPanelButton onClick={() => handleSave()}>Save</S.ControlPanelButton>
                    <S.ControlPanelButton onClick={() => handlePublish()}>{song.published ? 'Unpublish' : 'Publish'}</S.ControlPanelButton>
                  </>
                }
              </S.ButtonsContainer>
          </S.ContentWrapper>
      </S.FlexColContainer>

      <S.FlexColContainer>
        <S.ControlPanelHeading>Handle Pattern</S.ControlPanelHeading>
          <S.ContentWrapper>
            <div style={{width:"50%", marginRight: 10}}>
              <S.ControlPanelSelect id="patternSelect" onChange={(e) => handlePatternSelect(e)}>
                {Object.keys(song.patterns.synth1).map((pattern, index) => {
                  return (
                    <option key={index} value={pattern}>
                      {pattern}
                    </option>
                  );
                })}
              </S.ControlPanelSelect>
            </div>
            <S.ButtonsContainer>
              <S.ControlPanelButton onClick={() => handleNewPattern()}>New</S.ControlPanelButton>
              <S.ControlPanelButton onClick={() => handleClearPattern()}>Clear</S.ControlPanelButton>
              <S.ControlPanelButton onClick={() => handleCopyPattern()}>Copy</S.ControlPanelButton>
              <S.ControlPanelButton onClick={() => handlePastePattern()}>Paste</S.ControlPanelButton>
            </S.ButtonsContainer>
          </S.ContentWrapper>
      </S.FlexColContainer>

    </S.ControlPanel>
  );
}
