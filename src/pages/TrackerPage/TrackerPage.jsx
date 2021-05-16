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
import UpdateUserModal from '../../components/UpdateUserModal'
import TutorialModal from '../../components/TutorialModal'
import DefaultLayout from '../../layout/DefaultLayout'
import * as S from './styled';

export default function TrackerPage() {
  const { 
    isPlaying,
    song,
    handleNewSong,
    getOwnSongs,
    showLoadSongModal,
    showTutorialModal } = useContext(SynthContext);

  const { currentUser,
    loading,
    showUpdateUserModal} = useContext(AuthContext);

  const [isOwnSong, setIsOwnSong] = useState(false)
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const history = useHistory();

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
    <DefaultLayout>
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
              {showUpdateUserModal && <UpdateUserModal />}
              {showTutorialModal && <TutorialModal />}
            </>
          )}

          {isPlaying ? (
            <>
              <Synthesizer patterns={song.patterns} />
            </>
          ) : null}
        </S.Container>
      </S.Background>
    </DefaultLayout>
  );
}
