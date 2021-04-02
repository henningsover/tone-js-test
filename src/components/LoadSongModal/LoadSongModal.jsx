import React, { useContext, useEffect, useRef } from 'react';
import { firebaseGetOwnSongs, firebaseGetUsersSongs, auth, firebaseGetUsers } from '../../firebase';
import {isEmpty} from 'lodash'
import * as S from './styled';
import { SynthContext } from '../../contexts/SynthContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';

export default function LoadSongModal() {
  const {
    showLoadSongModal,
    toggleLoadSongModal,
    setSongList,
    songList,
    setSong,
    usersList,
    setUsersList,
  } = useContext(SynthContext);
  const { currentUser } = useContext(AuthContext);

  const modalRef = useRef();
  const searchRef = useRef();

  // useEffect(() => {
  //   if (currentUser) {
  //     firebaseGetOwnSongs(currentUser.uid).then((res) => setSongList(res));
  //   }
  // }, [currentUser]);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      toggleLoadSongModal();
    }
  };

  const handleSongSelection = (songId) => {
    setSong(songList[songId]);
    toggleLoadSongModal();
  };

  const handleUserSearch = () => {
    const usersSearch = setTimeout(() => {
      const searchTerm = searchRef.current.value;
      if (searchTerm !== '') {
        firebaseGetUsers(searchTerm, currentUser.uid).then((res) => {
          setUsersList(res)});
      } else {
        setUsersList(null);
      }
    }, 500);
    return () => clearTimeout(usersSearch);
  };

  const handleGetOwnSongs = (userId) => {
    firebaseGetOwnSongs(userId).then((res) => {
      if(isEmpty(res)) {
        setSongList(null)
      } else {
        setSongList(res)
      }
    });
  };

  const handleGetUsersSongs = (userId) => {
    firebaseGetUsersSongs(userId).then((res) => {
      if(isEmpty(res)) {
        setSongList(null)
      } else {
        setSongList(res)
      }
    })
  }

  useEffect(() => {
    handleGetOwnSongs(currentUser.uid);
  }, []);

  return (
    <>
      {showLoadSongModal ? (
        <S.Background ref={modalRef} onClick={(e) => closeModal(e)}>
          <S.ModalWrapper>
            <div>
              <input ref={searchRef} type="text" placeholder="Search for a user" onChange={handleUserSearch} />
              <ul>
                <li onClick={() => handleGetOwnSongs(currentUser.uid)}>
                  {currentUser.displayName ? currentUser.displayName : currentUser.email}
                </li>
                {usersList &&
                  Object.keys(usersList).map((user, index) => {
                    return <li 
                              key={index}
                              onClick={() => handleGetUsersSongs(usersList[user].userId)}
                            >
                              <span>{usersList[user].userName}</span>
                          </li>;
                  })}
              </ul>
            </div>
            <div>
              <ul>
                {songList? 
                  Object.keys(songList).map((song, index) => {
                    return (
                      <li
                          key={index}
                          onClick={() => handleSongSelection(song)}
                      >
                        <span>{songList[song].title}</span>
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
      ) : null}
    </>
  );
}
