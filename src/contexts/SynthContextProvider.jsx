import React, { createContext, useState, useContext } from 'react';
import Track from '../data/TrackKit';
import * as Tone from 'tone';
import * as C from '../constants';
import { cloneDeep } from 'lodash';
import { AuthContext } from './AuthContextProvider';
import { firebaseAddSong, firebaseUpdateSong, firebaseGetOwnSongs } from '../firebase';

export const SynthContext = createContext({});

export default function SynthContextProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(0);
  const [currentStep, setCurrentStep] = useState(null);
  const [songMode, setSongMode] = useState(true);
  const [patternMode, setPatternMode] = useState(false);
  const [song, setSong] = useState(cloneDeep(C.emptySong));
  const [copiedPattern, setCopiedPattern] = useState(null);
  const [octave, setOctave] = useState(4);
  const [masterListIndex, setMasterListIndex] = useState(0);
  const [songList, setSongList] = useState(null);
  const [showLoadSongModal, setShowLoadSongModal] = useState(false);
  const [usersList, setUsersList] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const start = () => {
    Tone.start();
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    setCurrentStep(null);
  };

  const handlePatternSelect = (e) => {
    setSongMode(false);
    setCurrentPattern(e.target.value);
  };

  const handleSongMode = () => {
    setSongMode(true);
    setPatternMode(false);
    setMasterListIndex(0);
    setCurrentPattern(song.masterList[0]);
  };
  const handlePatternMode = () => {
    setPatternMode(true);
    setSongMode(false);
  };

  const toggleLoadSongModal = () => {
    setShowLoadSongModal((prev) => !prev);
  };

  const handleSave = () => {
    let songId;
    Object.keys(songList).forEach((songInList) => {
      if (songList[songInList].title === song.title) {
        songId = songInList;
      }
    });
    if (songId) {
      const updatedSong = cloneDeep(song);
      setSong(updatedSong);
      localStorage.setItem(`${song.title}`, JSON.stringify(updatedSong));
      firebaseUpdateSong(currentUser.uid, songId, song);
      firebaseGetOwnSongs(currentUser.uid).then((res) => setSongList(res));
    } else {
      const updatedSong = cloneDeep(song);
      setSong(updatedSong);
      localStorage.setItem(`${song.title}`, JSON.stringify(updatedSong));
      firebaseAddSong(currentUser.uid, updatedSong);
      firebaseGetOwnSongs(currentUser.uid).then((res) => setSongList(res));
    }
  };

  const handleNewPattern = () => {
    const lastPattern = Object.keys(song.patterns.synth1).length - 1;
    const updatedSong = cloneDeep(song);
    console.log(C.emptySynthPattern);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][lastPattern + 1] = C.emptySynthPattern;
    });
    setSong(updatedSong);
    setCurrentPattern(lastPattern + 1);
  };

  const handleCopyPattern = () => {
    setCopiedPattern(currentPattern);
  };

  const handlePastePattern = () => {
    const updatedSong = cloneDeep(song);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][currentPattern] = updatedSong.patterns[synth][copiedPattern];
    });
    setSong(updatedSong);
  };

  const handleClearPattern = () => {
    const updatedSong = cloneDeep(song);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][currentPattern] = C.emptySynthPattern;
    });
    setSong(updatedSong);
  };

  const handleOctaveChange = (e) => {
    setOctave(parseInt(e.target.value));
  };

  const handleSongName = (e) => {
    const updatedSong = cloneDeep(song);
    updatedSong.title = e.target.value;
    setSong(updatedSong);
  };

  const handleNewSong = () => {
    const newSong = cloneDeep(C.emptySong);
    console.log(newSong);
    setSong(newSong);
  };

  return (
    <SynthContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentPattern,
        setCurrentPattern,
        currentStep,
        setCurrentStep,
        songMode,
        setSongMode,
        patternMode,
        setPatternMode,
        song,
        setSong,
        copiedPattern,
        setCopiedPattern,
        octave,
        setOctave,
        masterListIndex,
        setMasterListIndex,
        start,
        stop,
        handleNewSong,
        handleNewPattern,
        handleSongMode,
        handleSongName,
        handleSave,
        handleCopyPattern,
        handlePastePattern,
        handleClearPattern,
        handleOctaveChange,
        handlePatternMode,
        handlePatternSelect,
        songList,
        setSongList,
        showLoadSongModal,
        setShowLoadSongModal,
        toggleLoadSongModal,
        usersList,
        setUsersList,
      }}
    >
      {children}
    </SynthContext.Provider>
  );
}
