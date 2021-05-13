import React, { useContext } from 'react';
import { SynthContext } from '../../contexts/SynthContextProvider';
import MasterListRow from './components/MasterListRow';
import { cloneDeep } from 'lodash';

import * as S from './styled'

export default function MasterList() {
  const { song, setSong } = useContext(SynthContext);

  const handleAddToMasterList = () => {
    const updatedSong = cloneDeep(song);
    updatedSong.masterList.push('0');
    setSong(updatedSong);
  };
  const handleRemoveFromMasterList = () => {
    console.log('try remove')
    console.log(song.masterList.length)
    if(song.masterList.length > 1) {
      console.log('bigger than one')
      const updatedSong = cloneDeep(song);
      updatedSong.masterList.splice(-1, 1);
      setSong(updatedSong);
    }
  };

  return (
    <S.Wrapper>
      <S.MasterListWrapper>
      <S.MasterList>
        {song.masterList &&
          song.masterList.length > 0 &&
          song.masterList.map((pattern, index) => {
            return <MasterListRow key={index} pattern={pattern} masterListIndex={index} />;
          })}
      </S.MasterList>
      </S.MasterListWrapper>
      <S.ButtonsContainer>
        <S.MasterListButton onClick={() => handleRemoveFromMasterList()}>-</S.MasterListButton>
        <S.MasterListButton onClick={() => handleAddToMasterList()}>+</S.MasterListButton>
      </S.ButtonsContainer>
    </S.Wrapper>
  );
}
