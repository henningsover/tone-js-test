import React, { createContext, useState } from 'react';
import Track from '../data/TrackKit';
import * as Tone from 'tone';
import * as C from '../constants';
import { cloneDeep } from 'lodash';

export const SynthContext = createContext({});

export default function SynthContextProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(0);
  const [currentStep, setCurrentStep] = useState(null);
  const [songMode, setSongMode] = useState(true);
  const [patternMode, setPatternMode] = useState(false);
  const [song, setSong] = useState(null);
  const [copiedPattern, setCopiedPattern] = useState(null);
  const [octave, setOctave] = useState(4);
  const [masterListIndex, setMasterListIndex] = useState(0);

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

  const handleSave = () => {
    const updatedSong = cloneDeep(song);
    setSong(updatedSong);
    localStorage.setItem(`${song.title}`, JSON.stringify(updatedSong));
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
      }}
    >
      {children}
    </SynthContext.Provider>
  );
}
