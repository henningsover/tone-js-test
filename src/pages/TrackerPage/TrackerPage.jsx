import React, { useContext, useEffect } from 'react';
import '../../App.css';
import Synthesizer from '../../Synthesizer';
import InputsSection from '../../components/InputsSection';
import { SynthContext } from '../../contexts/SynthContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import * as C from '../../constants';
import MasterList from '../../components/MasterList';
import { cloneDeep } from 'lodash';
import ControlPanel from '../../components/ControlPanel';
import { firebaseGetOwnSongs, auth } from '../../firebase';
import { useHistory } from 'react-router-dom';

export default function TrackerPage() {
  const { isPlaying, song, setSong, songList, setSongList } = useContext(SynthContext);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleSongChange = (e) => {
    const songTitle = e.target.value;
    let songToSet;
    Object.keys(songList).forEach((song) => {
      if (songList[song].title === songTitle) {
        songToSet = cloneDeep(songList[song]);
      }
      setSong(songToSet);
    });
    // songList.foreach((song) => {
    //   console.log(song);
    // });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const newSong = cloneDeep(C.emptySong);
    setSong(newSong);
  }, []);

  useEffect(() => {
    if (currentUser) {
      firebaseGetOwnSongs(currentUser.uid).then((res) => setSongList(res));
    }
  }, [currentUser]);

  useEffect(() => {
    if (songList) {
      console.log(songList);
    }
  }, [songList]);

  return (
    <div>
      <h1>Welcome</h1>
      {song && <MasterList />}
      <ControlPanel />
      <select onChange={(e) => handleSongChange(e)}>
        {songList &&
          Object.keys(songList).map((song, index) => {
            return (
              <option key={index} value={songList[song].title}>
                {songList[song].title}
              </option>
            );
          })}
      </select>
      <button onClick={handleSignOut}>sign out</button>
      {song && <InputsSection />}
      {isPlaying ? (
        <>
          <Synthesizer patterns={song.patterns} />
        </>
      ) : null}
    </div>
  );
}
