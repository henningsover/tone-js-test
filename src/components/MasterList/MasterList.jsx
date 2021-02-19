import React, { useContext } from 'react';
import { SynthContext } from '../../contexts/SynthContextProvider';
import MasterListRow from './components/MasterListRow';
import { cloneDeep } from 'lodash';

export default function MasterList() {
  const { song, setSong } = useContext(SynthContext);

  const handleAddToMasterList = () => {
    const updatedSong = cloneDeep(song);
    updatedSong.masterList.push('0');
    setSong(updatedSong);
  };

  return (
    <div>
      <ol id="masterList" style={{ listStyle: 'none', maxHeight: 88, width: 190, overflow: 'scroll' }}>
        {song.masterList &&
          song.masterList.length > 0 &&
          song.masterList.map((pattern, index) => {
            return <MasterListRow key={index} pattern={pattern} masterListIndex={index} />;
          })}
      </ol>
      <button onClick={() => handleAddToMasterList()}>+</button>
    </div>
  );
}
