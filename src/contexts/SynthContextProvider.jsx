import React, { createContext, useState, useContext } from 'react';
import Track from '../data/TrackKit';
import * as Tone from 'tone';
import * as C from '../constants';
import { cloneDeep, isEmpty } from 'lodash';
import { AuthContext } from './AuthContextProvider';
import { firebaseAddSong, firebaseUpdateSong, firebaseGetOwnSongs } from '../firebase';

export const SynthContext = createContext({});

export default function SynthContextProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(null);
  const [songMode, setSongMode] = useState(true);
  const [patternMode, setPatternMode] = useState(false);
  const [song, setSong] = useState(cloneDeep(C.emptySong));
  const [copiedPattern, setCopiedPattern] = useState(null);
  const [octave, setOctave] = useState(4);
  const [masterListIndex, setMasterListIndex] = useState(0);
  const [songList, setSongList] = useState({});
  const [showLoadSongModal, setShowLoadSongModal] = useState(false);

  const masterGain = new Tone.Gain(0.5);
  masterGain.toDestination();

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
    setCurrentPatternIndex(e.target.value);
  };

  const handleSongMode = () => {
    setSongMode(true);
    setPatternMode(false);
    setMasterListIndex(0);
    setCurrentPatternIndex(song.masterList[0]);
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
        firebaseUpdateSong(currentUser.uid, songId, song);
        firebaseGetOwnSongs(currentUser.uid).then((res) => setSongList(res));

      } else {

      const updatedSong = cloneDeep(song);
      setSong(updatedSong);
      firebaseAddSong(currentUser.uid, updatedSong);
      firebaseGetOwnSongs(currentUser.uid).then((res) => setSongList(res));

    }
  };

  const handleNewPattern = () => {
    const lastPattern = Object.keys(song.patterns.synth1).length - 1;
    const updatedSong = cloneDeep(song);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][lastPattern + 1] = C.emptySynthPattern;
    });
    setCurrentPatternIndex(lastPattern + 1);
    setSongMode(false)
    setSong(updatedSong);
  };

  const handleCopyPattern = () => {
    setCopiedPattern(currentPatternIndex);
  };

  const handlePastePattern = () => {
    const updatedSong = cloneDeep(song);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][currentPatternIndex] = updatedSong.patterns[synth][copiedPattern];
    });
    setSong(updatedSong);
  };

  const handleClearPattern = () => {
    const updatedSong = cloneDeep(song);
    Object.keys(song.patterns).forEach((synth) => {
      updatedSong.patterns[synth][currentPatternIndex] = C.emptySynthPattern;
    });
    setSong(updatedSong);
  };

  const handleSongName = (e) => {
    const updatedSong = cloneDeep(song);
    updatedSong.title = e.target.value;
    setSong(updatedSong);
  };

  const handleNewSong = () => {
    const newSong = cloneDeep(C.emptySong);
    newSong.userId = currentUser.uid
    setCurrentPatternIndex(0)
    setSong(newSong);
  };

  const handlePublish = () => {
    const updatedSong = cloneDeep(song);
    const check = updatedSong.published
    updatedSong.published = !check
    setSong(updatedSong)
  }

  const getOwnSongs = () => {
    firebaseGetOwnSongs(currentUser.uid).then((res) => {
      if(isEmpty(res)) {
        setSongList({})
      } else {
        Object.keys(res).forEach((songId) => {
          if (res[songId].bpm === undefined) {
            res[songId].bpm = 120
            firebaseUpdateSong(currentUser.uid, songId, res[songId]);
          }
        })
        setSongList(res)
      }
    });
  }

  return (
    <SynthContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentPatternIndex,
        setCurrentPatternIndex,
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
        handlePublish,
        handleCopyPattern,
        handlePastePattern,
        handleClearPattern,
        handlePatternMode,
        handlePatternSelect,
        songList,
        setSongList,
        showLoadSongModal,
        setShowLoadSongModal,
        toggleLoadSongModal,
        getOwnSongs,
        masterGain
      }}
    >
      {children}
    </SynthContext.Provider>
  );
}
