import React, { useContext } from 'react';

import * as S from './styled'

import { SynthContext } from '../../contexts/SynthContextProvider';

export default function ControlPanel() {
  const {
    start,
    stop,
    handleSongMode,
    toggleLoadSongModal,
  } = useContext(SynthContext);

  return (
    <S.PlayerWrapper>
        <S.Heading>Master Thesis Player</S.Heading>
        <S.Player>
              <S.ButtonsRow>
                <S.PlayerButton onClick={() => start()}>Play</S.PlayerButton>
                <S.PlayerButton onClick={() => stop()}>Stop</S.PlayerButton>
              </S.ButtonsRow>
              <S.ButtonsRow>
                <S.PlayerButton onClick={() => handleSongMode()}>Rewind</S.PlayerButton>
                <S.PlayerButton onClick={() => toggleLoadSongModal()}>Load</S.PlayerButton>
              </S.ButtonsRow>
        </S.Player>
    </S.PlayerWrapper>
  );
}
