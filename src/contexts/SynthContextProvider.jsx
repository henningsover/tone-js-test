import React, { createContext, useState, useEffect } from 'react';

export const SynthContext = createContext({});

export default function SynthContextProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(0);
  const [currentStep, setCurrentStep] = useState(null);

  return (
    <SynthContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentPattern,
        setCurrentPattern,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </SynthContext.Provider>
  );
}
