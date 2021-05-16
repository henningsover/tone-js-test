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
    setBpm
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
        <S.Controls>
          <S.SearchInput ref={searchRef} type="text" placeholder="Search for a user" onChange={handleUserSearch} />
          <S.CloseModalButton onClick={toggleLoadSongModal} />
        </S.Controls>
        <S.UserListWrapper>
            <ul>
              <S.ListItem onClick={() => handleDisplayOwnSongs()}>
                <p>{currentUser.displayName ? currentUser.displayName : currentUser.email}</p>
              </S.ListItem>
              {loadedUsers &&
                Object.keys(loadedUsers)
                .filter(user => { return loadedUsers[user].userId !== currentUser.uid })
                .map((user, index) => {
                  return <S.ListItem 
                            key={index}
                            onClick={() => handleGetUsersSongs(loadedUsers[user].userId)}
                          ><p>{loadedUsers[user].userName}</p>
                        </S.ListItem>;
                })}
            </ul>
          </S.UserListWrapper>
          <S.SongListWrapper>
            <ul>
              {songsToDisplay? 
                Object.keys(songsToDisplay).map((song, index) => {
                  return (
                    <S.ListItem
                        key={index}
                        onClick={() => handleSongSelection(song)}
                    >
                      <p>{songsToDisplay[song].title}</p>
                    </S.ListItem>
                  );
                }):
                <S.ListItem>
                  <p>No songs found</p>
                </S.ListItem>
              }
            </ul>
          </S.SongListWrapper>
      </S.ModalWrapper>
    </S.Background>
  );
}
