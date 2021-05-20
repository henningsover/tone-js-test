import React, { useContext } from 'react';
import { SynthContext } from '../../../../contexts/SynthContextProvider';
import { cloneDeep } from 'lodash';

import * as S from './styled'

export default function MasterListRow({ pattern, masterListIndex }) {
  const { song, setSong } = useContext(SynthContext);

  const handleOnChange = (e) => {
    e.preventDefault();
    const updatedSong = cloneDeep(song)
    if (song.patterns.synth1[`${e.target.value}`]) {
      const masterListValue = parseInt(e.target.value);
      updatedSong.masterList[masterListIndex] = masterListValue;
      setSong(updatedSong);
    }
  };
  //TODO - set currentPattern when li is pressed
  return (
    <S.ListItem>
      <span>{`${masterListIndex}:`}</span>
      <S.MasterListInput type="number" onChange={(e) => handleOnChange(e)} value={pattern} />
    </S.ListItem>
  );
}
