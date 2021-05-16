import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import Synthesizer from '../../Synthesizer';
import InputsSection from '../../components/InputsSection';
import { SynthContext } from '../../contexts/SynthContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import ControlPanel from '../../components/ControlPanel';
import Player from '../../components/ControlPanel/Player'
import { useHistory, Redirect } from 'react-router-dom';
import LoadSongModal from '../../components/LoadSongModal';
import * as S from './styled';

export default function TrackerPage() {
  const { isPlaying, song, handleNewSong, getOwnSongs, showLoadSongModal } = useContext(SynthContext);
  const { currentUser, logout, loading } = useContext(AuthContext);

  const [error, setError] = useState('')
  const [isOwnSong, setIsOwnSong] = useState(false)
  const [windowSize, setWindowSize] = useState(window.innerWidth)

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

  const handleResize = () => {
    setWindowSize(window.innerWidth)
  }

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
    window.addEventListener("resize", handleResize)
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
    <S.Background>
      <S.Container>
        {loading ? null : (
          <>
            <S.TrackerPageWrapper id="content-wrapper">

              {windowSize > 690 && (
                <>
                  <InputsSection />
                    <S.RightCol>
                    <ControlPanel isOwnSong={isOwnSong} />
                  </S.RightCol>
                </>
              )}

              {windowSize <= 690 && <Player />}

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
    </S.Background>
  );
}
