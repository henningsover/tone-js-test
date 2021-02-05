import React, { createContext, useState, useEffect } from 'react';

export const SynthContext = createContext({});

export default function SynthContextProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(0);
  const [currentStep, setCurrentStep] = useState(null);
  const [songMode, setSongMode] = useState(true);
  const [patternMode, setPatternMode] = useState(false);
  const [song, setSong] = useState(null);

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
      }}
    >
      {children}
    </SynthContext.Provider>
  );
}
