import React, { useContext } from 'react';

import * as S from '../styled'
import * as Sh from './styled'

import { SynthContext } from '../../../contexts/SynthContextProvider';

export default function ControlPanel() {
  const {
    start,
    stop,
    handleSongMode,
    toggleLoadSongModal,
  } = useContext(SynthContext);

  return (
    <Sh.PlayerWrapper>
        <Sh.Heading>Master Thesis Player</Sh.Heading>
        <Sh.Player>
              <S.ButtonsRow>
                <Sh.PlayerButton onClick={() => start()}>Play</Sh.PlayerButton>
                <Sh.PlayerButton onClick={() => stop()}>Stop</Sh.PlayerButton>
              </S.ButtonsRow>
              <S.ButtonsRow>
                <Sh.PlayerButton onClick={() => handleSongMode()}>Rewind</Sh.PlayerButton>
                <Sh.PlayerButton onClick={() => toggleLoadSongModal()}>Load</Sh.PlayerButton>
              </S.ButtonsRow>
        </Sh.Player>
    </Sh.PlayerWrapper>
  );
}
