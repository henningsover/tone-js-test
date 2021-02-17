import React, { createContext, useState } from 'react';
import Track from '../data/TrackKit';

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
  // const [tracksFromContext, setTracks] = useState([new Track(), new Track(), new Track(), new Track()]);

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
        // tracksFromContext,
      }}
    >
      {children}
    </SynthContext.Provider>
  );
}
