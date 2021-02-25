import React, { useContext, useEffect, useRef } from 'react';
import { firebaseGetOwnSongs, auth } from '../../firebase';
import * as S from './styled';
import { SynthContext } from '../../contexts/SynthContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';

export default function LoadSongModal() {
  const { showLoadSongModal, toggleLoadSongModal, setSongList, songList, setSong } = useContext(SynthContext);
  const { currentUser } = useContext(AuthContext);

  const modalRef = useRef();

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

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      toggleLoadSongModal();
    }
  };

  const handleSongSelection = (songId) => {
    setSong(songList[songId]);
    toggleLoadSongModal();
  };

  return (
    <>
      {showLoadSongModal ? (
        <S.Background ref={modalRef} onClick={(e) => closeModal(e)}>
          <S.ModalWrapper>
            <div>{currentUser.userName}</div>
            <div>
              <ul>
                {Object.keys(songList).map((song) => {
                  return (
                    <li onClick={() => handleSongSelection(song)}>
                      <span>{songList[song].title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <S.CloseModalButton onClick={toggleLoadSongModal} />
          </S.ModalWrapper>
        </S.Background>
      ) : null}
    </>
  );
}
