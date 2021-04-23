import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import Synthesizer from '../../Synthesizer';
import InputsSection from '../../components/InputsSection';
import { SynthContext } from '../../contexts/SynthContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import ControlPanel from '../../components/ControlPanel';
import { useHistory, Redirect } from 'react-router-dom';
import LoadSongModal from '../../components/LoadSongModal';
import * as S from './styled';

export default function TrackerPage() {
  const { isPlaying, song, handleNewSong, getOwnSongs, showLoadSongModal } = useContext(SynthContext);
  const { currentUser, logout, loading } = useContext(AuthContext);

  const [error, setError] = useState('')
  const [isOwnSong, setIsOwnSong] = useState(false)

  const history = useHistory();

  const handleSignOut = async () => {
    setError('')

    try {

      await logout();
      history.push('/login')

    } catch {

      setError('Failed to log out')

    }
    
  };

  useEffect(() => {
    if (currentUser === undefined) {
      history.push('/login')
    }
  }, [currentUser]);

  useEffect(() => {
    if(currentUser !== undefined) {
      getOwnSongs()
      handleNewSong()
    }
  },[])

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
              <ControlPanel isOwnSong={isOwnSong} />
              <button onClick={() =>handleSignOut()}>sign out</button>
            </S.RightCol>
          </S.TrackerPageWrapper>
          {showLoadSongModal && <LoadSongModal />}
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
