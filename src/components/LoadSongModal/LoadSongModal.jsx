import React, { useContext, useEffect, useRef, useState } from 'react';
import { firebaseGetUsersSongs, firebaseGetUsers } from '../../firebase';
import {isEmpty} from 'lodash'
import * as S from './styled';
import { SynthContext } from '../../contexts/SynthContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';

export default function LoadSongModal() {
  const {
    toggleLoadSongModal,
    songList,
    setSong,
    setCurrentPatternIndex,
    setMasterListIndex,
  } = useContext(SynthContext);
  const { currentUser } = useContext(AuthContext);

  const [loadedUsers, setLoadedUsers] = useState(null)
  const [songsToDisplay, setSongsToDisplay] = useState(null)

  const modalRef = useRef();
  const searchRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      toggleLoadSongModal();
    }
  };

  const handleSongSelection = (songId) => {
    setCurrentPatternIndex(0)
    setMasterListIndex(0)
    setSong(songsToDisplay[songId]);
    toggleLoadSongModal();
  };

  const handleUserSearch = () => {
    const usersSearch = setTimeout(() => {
      const searchTerm = searchRef.current.value;
      if (searchTerm !== '') {
        firebaseGetUsers(searchTerm, currentUser.uid).then((res) => {
          setLoadedUsers(res)});
      } else {
        setLoadedUsers(null);
      }
    }, 500);
    return () => clearTimeout(usersSearch);
  };

  const handleDisplayOwnSongs = () => {
    if(isEmpty(songList)) {
      setSongsToDisplay(null)
    } else {
      setSongsToDisplay(songList)
    }
  };

  const handleGetUsersSongs = (userId) => {
    firebaseGetUsersSongs(userId).then((res) => {
      if(isEmpty(res)) {
        setSongsToDisplay(null)
      } else {
        setSongsToDisplay(res)
      }
    })
  }

  useEffect(() => {
    if(!isEmpty(songList)) {

      handleDisplayOwnSongs()

    }
  }, [songList])

  return (
    <S.Background ref={modalRef} onClick={(e) => closeModal(e)}>
      <S.ModalWrapper>
        <div>
          <input ref={searchRef} type="text" placeholder="Search for a user" onChange={handleUserSearch} />
          <ul>
            <li onClick={() => handleDisplayOwnSongs()}>
              {currentUser.displayName ? currentUser.displayName : currentUser.email}
            </li>
            {loadedUsers &&
              Object.keys(loadedUsers).map((user, index) => {
                return <li 
                          key={index}
                          onClick={() => handleGetUsersSongs(loadedUsers[user].userId)}
                        >
                          <span>{loadedUsers[user].userName}</span>
                      </li>;
              })}
          </ul>
        </div>
        <div>
          <ul>
            {songsToDisplay? 
              Object.keys(songsToDisplay).map((song, index) => {
                return (
                  <li
                      key={index}
                      onClick={() => handleSongSelection(song)}
                  >
                    <span>{songsToDisplay[song].title}</span>
                  </li>
                );
              }):
              <p>No songs found</p>
            }
          </ul>
        </div>
        <S.CloseModalButton onClick={toggleLoadSongModal} />
      </S.ModalWrapper>
    </S.Background>
  );
}
