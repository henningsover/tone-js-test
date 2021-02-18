import React, { useEffect, useContext } from 'react';
import { SynthContext } from './contexts/SynthContextProvider';
import Instrument from './data/InstrumentKitTest';
import * as Tone from 'tone';
import { isEmpty } from 'lodash';
import Track from './data/TrackKit';

export default function Synthesizer({ patterns, oscTypes }) {
  const {
    setCurrentPattern,
    currentPattern,
    setCurrentStep,
    songMode,
    song,
    masterListIndex,
    setMasterListIndex,
    tracks,
  } = useContext(SynthContext);

  useEffect(() => {
    const tracks = [new Track(), new Track(), new Track(), new Track()];

    const masterGain = new Tone.Gain(0.5);
    masterGain.toDestination();
    Tone.Transport.bpm.value = 120;

    tracks.forEach((track) => {
      track.trackGain.connect(masterGain);
    });

    let internalMasterListIndex = masterListIndex;
    let stepIndex = 0;
    setCurrentStep(stepIndex);

    const getPattern = (index) => {
      const pattern = songMode ? song.masterList[internalMasterListIndex] : currentPattern;
      switch (index) {
        case 0:
          return patterns.synth1[pattern];
        case 1:
          return patterns.synth2[pattern];
        case 2:
          return patterns.synth3[pattern];
        case 3:
          return patterns.synth4[pattern];
        default:
          break;
      }
    };

    const repeat = (time) => {
      if (stepIndex === 0) {
        setCurrentStep(stepIndex);
      }

      tracks.forEach((track, index) => {
        const pattern = getPattern(index);
        track.decode(pattern[stepIndex], time);
      });

      if (stepIndex < patterns.synth1[0].length - 1) {
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        setCurrentStep(stepIndex);
        stepIndex = 0;
        if (songMode) {
          internalMasterListIndex++;
          setMasterListIndex(internalMasterListIndex);
          if (song.masterList[internalMasterListIndex] === undefined) {
            internalMasterListIndex = 0;
            setMasterListIndex(internalMasterListIndex);
            setCurrentPattern(song.masterList[0]);
          } else {
            setCurrentPattern(song.masterList[internalMasterListIndex]);
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
      Tone.Transport.cancel();
      tracks.forEach((track) => {
        track.dispose();
      });
    };
  }, []);
  return null;
}
