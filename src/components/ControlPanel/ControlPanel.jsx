import React, { useContext, useEffect } from 'react';
import { cloneDeep } from 'lodash';

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
    setSong,
    octave,
    setOctave,
    currentPatternIndex,
    toggleLoadSongModal,
  } = useContext(SynthContext);

  const increaseBpm = () => {
    if (song.bpm < 200) {
      const updatedSong = cloneDeep(song)
      updatedSong.bpm = updatedSong.bpm + 1
      setSong(updatedSong);
    }
  }

  const decreaseBpm = () => {
    if (song.bpm > 0) {
      const updatedSong = cloneDeep(song)
      updatedSong.bpm = updatedSong.bpm -1
      setSong(updatedSong);
    }
  }

  const increaseOctave = () => {
    if (octave < 6) {
      setOctave(previousState => {
        return previousState + 1
      })
    }
  }

  const decreaseOctave = () => {
    if (octave > 1) {
      setOctave(previousState => {
        return previousState - 1
      })
    }
  }

  useEffect(() => {
    if (song) {
      document.getElementById('patternSelect').selectedIndex = currentPatternIndex;
    }
  }, [currentPatternIndex]);
  return (
    <S.ControlPanel>
      <S.FlexColContainer>
        <S.ContentWrapper>
          <S.FlexCol>
            <S.ControlPanelHeading>Bpm</S.ControlPanelHeading>
            <div style={{display:"flex", flexDirection:"row"}}>
              <input style={{width: 50}} type="number" min="0" max="200" value={song.bpm} readOnly />
              <S.ButtonSmall onClick={() => decreaseBpm()}>-</S.ButtonSmall>
              <S.ButtonSmall onClick={() => increaseBpm()}>+</S.ButtonSmall>
            </div>
          </S.FlexCol>
          <S.FlexCol>
            <S.ControlPanelHeading>Octave</S.ControlPanelHeading>
            <div style={{display:"flex", flexDirection:"row"}}>
              <input style={{width: 50}} type="number" min="0" max="200" value={octave} readOnly />
              <S.ButtonSmall onClick={() => decreaseOctave()}>-</S.ButtonSmall>
              <S.ButtonSmall onClick={() => increaseOctave()}>+</S.ButtonSmall>
            </div>
          </S.FlexCol>
        </S.ContentWrapper>
      </S.FlexColContainer>
      <S.FlexRow>
        <MasterList />
        <S.PlaybackContainer>
          <S.FlexCol>
            <S.ControlPanelHeading>Playback</S.ControlPanelHeading>
            <S.ButtonsRow>
              <S.ControlPanelButton onClick={() => start()}>Play</S.ControlPanelButton>
              <S.ControlPanelButton onClick={() => stop()}>Stop</S.ControlPanelButton>
            </S.ButtonsRow>
          </S.FlexCol>
          <S.FlexCol>
            <S.ControlPanelHeading>Mode</S.ControlPanelHeading>
            <S.ButtonsRow>
              <S.ControlPanelButton onClick={() => handleSongMode()}>Song</S.ControlPanelButton>
              <S.ControlPanelButton onClick={() => handlePatternMode()}>Pattern</S.ControlPanelButton>
            </S.ButtonsRow>
          </S.FlexCol>
        </S.PlaybackContainer>
      </S.FlexRow>

      <S.FlexColContainer>
          <S.ControlPanelHeading>Handle song</S.ControlPanelHeading>
            <S.ContentWrapper>
              <S.InputWrapper>
                <S.ControlPanelInput type="text" value={song ? song.title : ''} onChange={(e) => handleSongName(e)} />
              </S.InputWrapper>
              <S.ButtonsWrapper>
                <S.ButtonsRow style={{marginBottom: 20}}>
                  <S.ControlPanelButton onClick={() => handleNewSong()}>New</S.ControlPanelButton>
                  <S.ControlPanelButton onClick={() => toggleLoadSongModal()}>Load</S.ControlPanelButton>
                </S.ButtonsRow>
                {isOwnSong && 
                  <S.ButtonsRow>
                    <S.ControlPanelButton onClick={() => handleSave()}>Save</S.ControlPanelButton>
                    <S.ControlPanelButton onClick={() => handlePublish()}>{song.published ? 'Unpublish' : 'Publish'}</S.ControlPanelButton>
                  </S.ButtonsRow>
                }
              </S.ButtonsWrapper>
          </S.ContentWrapper>
      </S.FlexColContainer>

      <S.FlexColContainer>
        <S.ControlPanelHeading>Handle Pattern</S.ControlPanelHeading>
          <S.ContentWrapper>
            <S.InputWrapper>
              <S.ControlPanelSelect id="patternSelect" onChange={(e) => handlePatternSelect(e)}>
                {Object.keys(song.patterns.synth1).map((pattern, index) => {
                  return (
                    <option key={index} value={pattern}>
                      {pattern}
                    </option>
                  );
                })}
              </S.ControlPanelSelect>
            </S.InputWrapper>
            <S.ButtonsWrapper>
              <S.ButtonsRow style={{marginBottom: 20}}>
                <S.ControlPanelButton onClick={() => handleNewPattern()}>New</S.ControlPanelButton>
                <S.ControlPanelButton onClick={() => handleClearPattern()}>Clear</S.ControlPanelButton>
              </S.ButtonsRow>
              <S.ButtonsRow>
                <S.ControlPanelButton onClick={() => handleCopyPattern()}>Copy</S.ControlPanelButton>
                <S.ControlPanelButton onClick={() => handlePastePattern()}>Paste</S.ControlPanelButton>
              </S.ButtonsRow>
            </S.ButtonsWrapper>
          </S.ContentWrapper>
      </S.FlexColContainer>

    </S.ControlPanel>
  );
}
