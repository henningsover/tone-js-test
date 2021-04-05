import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import Synthesizer from '../../Synthesizer';
import InputsSection from '../../components/InputsSection';
import { SynthContext } from '../../contexts/SynthContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import MasterList from '../../components/MasterList';
import { cloneDeep } from 'lodash';
import ControlPanel from '../../components/ControlPanel';
import { useHistory } from 'react-router-dom';
import LoadSongModal from '../../components/LoadSongModal';
import * as S from './styled';

export default function TrackerPage() {
  const { isPlaying, song, setSong, songList, handleNewSong } = useContext(SynthContext);
  const { currentUser, logout, loading } = useContext(AuthContext);

  const [isOwnSong, setIsOwnSong] = useState(false)

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
  };

  const handleSignOut = () => {
    logout();
  };

  useEffect(() => {
    if (!currentUser && !loading) {
      history.push('/');
    }
  }, [currentUser]);

  useEffect(() => {
    if(currentUser) {
      handleNewSong()
    }
  },[currentUser])

  useEffect(() => {
    if(currentUser && song.userId === currentUser.uid) {
      setIsOwnSong(true)
    } else {
      setIsOwnSong(false)
    }
  },[song])

  useEffect(() => {
    console.log(isOwnSong)
  },[isOwnSong])

  return (
    <S.Container>
      {loading ? null : (
        <>
          <S.TrackerPageWrapper id="content-wrapper">
            <InputsSection />
            <S.RightCol>
              <MasterList />
              <ControlPanel isOwnSong={isOwnSong} />
              <button onClick={handleSignOut}>sign out</button>
            </S.RightCol>
          </S.TrackerPageWrapper>
          <LoadSongModal />
        </>
      )}
      {isPlaying ? (
        <>
          <Synthesizer patterns={song.patterns} />
        </>
      ) : null}
    </S.Container>
  );
}
