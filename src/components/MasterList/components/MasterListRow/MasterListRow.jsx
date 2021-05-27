import React, { useContext, useRef } from 'react';
import { SynthContext } from '../../../../contexts/SynthContextProvider';
import { cloneDeep } from 'lodash';

import * as S from './styled'

export default function MasterListRow({ pattern, masterListIndex }) {
  const { song, setSong } = useContext(SynthContext);

  const inputRef = useRef(pattern)

  const handleOnChange = (e) => {
    e.preventDefault();
    const key = parseInt(e.key)
    if (typeof key === 'number' && song.patterns.synth1[key] !== undefined) {
      const updatedSong = cloneDeep(song)
      updatedSong.masterList[masterListIndex] = key;
      setSong(updatedSong);
    }
  };
  //TODO - set currentPattern when li is pressed
  return (
    <S.ListItem>
      <span>{`${masterListIndex}:`}</span>
      <S.MasterListInput type="number" ref={inputRef} onKeyDown={(e) => handleOnChange(e)} value={pattern}/>
    </S.ListItem>
  );
}
