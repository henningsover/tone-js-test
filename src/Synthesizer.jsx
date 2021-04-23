import React, { useEffect, useState, useContext } from 'react';
import { SynthContext } from './contexts/SynthContextProvider';
import * as Tone from 'tone';
import Track from './data/TrackKit';

export default function Synthesizer({ patterns }) {
  const {
    setCurrentPatternIndex,
    currentPatternIndex,
    setCurrentStep,
    songMode,
    song,
    masterListIndex,
    setMasterListIndex,
    masterGain
  } = useContext(SynthContext);

  useEffect(() => {
    const tracks = [new Track(), new Track(), new Track(), new Track()];

    let currentPattern = []

    // const masterGain = new Tone.Gain(0.5);
    // masterGain.toDestination();
    Tone.Transport.bpm.value = 120;
    Tone.Transport.timeSignature = [8,4]

    tracks.forEach((track) => {
      track.trackGain.connect(masterGain);
    });

    let internalMasterListIndex = masterListIndex;
    let stepIndex = 0;
    setCurrentStep(stepIndex);

    const getCurrentPattern = () => {
      const pattern = songMode ? song.masterList[internalMasterListIndex] : currentPatternIndex;

      currentPattern = [
        patterns.synth1[pattern],
        patterns.synth2[pattern],
        patterns.synth3[pattern],
        patterns.synth4[pattern]
      ]
    };

    const repeat = (time) => {
      if (stepIndex === 0) {
        getCurrentPattern()
      }
      tracks.forEach((track, index) => {
        const pattern = currentPattern[index];
        track.decode(pattern[stepIndex], time);
      });

      if (stepIndex < Object.keys(patterns.synth1[0]).length - 1) {
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        setCurrentStep(stepIndex);
        stepIndex = 0;
        if (songMode) {
          internalMasterListIndex++;
          if (song.masterList[internalMasterListIndex] === undefined) {
            internalMasterListIndex = 0;
            setMasterListIndex(internalMasterListIndex);
            setCurrentPatternIndex(song.masterList[0]);
          } else {
            setMasterListIndex(internalMasterListIndex);
            setCurrentPatternIndex(song.masterList[internalMasterListIndex]);
          }
        }
      }
    };

    Tone.Transport.scheduleRepeat((time) => {
      repeat(time);
    }, '16n');
    setTimeout(() => {
      Tone.Transport.start();
    }, 200);

    return () => {
      Tone.Transport.stop();
      Tone.Transport.position = 0;
      Tone.Transport.cancel();
      tracks.forEach((track) => {
        track.dispose();
      });
    };
  }, []);
  return null;
}
