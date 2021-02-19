import React, { useContext } from 'react';
import { SynthContext } from '../../../../contexts/SynthContextProvider';

export default function MasterListRow({ pattern, masterListIndex }) {
  const { song, setSong } = useContext(SynthContext);

  const handleOnChange = (e) => {
    e.preventDefault();
    console.log(e);
    const updatedSong = { ...song };
    if (song.patterns.synth1[`${e.target.value}`]) {
      const masterListValue = parseInt(e.target.value);
      updatedSong.masterList[masterListIndex] = masterListValue;
      setSong(updatedSong);
    }
  };
  //TODO - set currentPattern when li is pressed
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 10 }}>
      <span>{`${masterListIndex}:`}</span>
      <input type="number" onChange={(e) => handleOnChange(e)} value={pattern} />
    </li>
  );
}
