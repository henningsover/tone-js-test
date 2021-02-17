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
    // const instrumentList = {
    //   0: 'square',
    //   1: 'sine',
    //   2: 'sawtooth',
    //   3: 'triangle',
    //   4: 'kick',
    //   5: 'snare',
    //   6: 'hihat',
    // };

    // const tracksAudioSrc = {
    //   0: {},
    //   1: {},
    //   2: {},
    //   3: {},
    // };
    // const instruments = {
    //   0: {},
    //   1: {},
    //   2: {},
    //   3: {},
    // };
    // const instruments = {
    //   0: {
    //     Synth: new Tone.Synth(),
    //     MembraneSynth: new Tone.MembraneSynth(),
    //     NoiseSynth: new Tone.NoiseSynth(),
    //   },
    //   1: {
    //     Synth: new Tone.Synth(),
    //     MembraneSynth: new Tone.MembraneSynth(),
    //     NoiseSynth: new Tone.NoiseSynth(),
    //   },
    //   2: {
    //     Synth: new Tone.Synth(),
    //     MembraneSynth: new Tone.MembraneSynth(),
    //     NoiseSynth: new Tone.NoiseSynth(),
    //   },
    //   3: {
    //     Synth: new Tone.Synth(),
    //     MembraneSynth: new Tone.MembraneSynth(),
    //     NoiseSynth: new Tone.NoiseSynth(),
    //   },
    // };
    const tracks = [new Track(), new Track(), new Track(), new Track()];

    const masterGain = new Tone.Gain(1);
    masterGain.toDestination();
    Tone.Transport.bpm.value = 140;

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
      console.log('time from loop: ' + time);
      if (stepIndex === 0) {
        setCurrentStep(stepIndex);
      }
      tracks.forEach((track, index) => {
        const pattern = getPattern(index);
        // const note = pattern[stepIndex][0];
        // const inst = pattern[stepIndex][1];
        track.decode(pattern[stepIndex], time);
        // if (inst !== '') {
        //   if (instruments[index][inst] && inst !== tracksAudioSrc[track]) {
        //     tracksAudioSrc[track] = instruments[index][inst];
        //     tracksAudioSrc[track].gain.connect(masterGain);
        //     console.log(tracksAudioSrc[track]);
        //   } else {
        //     instruments[index][inst] = new Instrument(instrumentList[inst]);
        //     tracksAudioSrc[track] = instruments[index][inst];
        //     tracksAudioSrc[track].gain.connect(masterGain);
        //   }
        // }
        // if (note !== 'X' && note !== '' && isEmpty(tracksAudioSrc[track]) === false) {
        //   tracksAudioSrc[track].play(time, note);
        // }
        // if (note === 'X' && isEmpty(tracksAudioSrc[track]) === false) {
        //   if (tracksAudioSrc[track].synth.name === 'Synth') {
        //     tracksAudioSrc[track].synth.triggerRelease(time);
        //   }
        // }
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
      // Object.keys(instruments).forEach((track, index) => {
      //   for (const instrument in instruments[track]) {
      //     if (instruments[track][instrument] !== {}) instruments[track][instrument].synth.dispose();
      //   }
      // });
      // track.forEach((track, index) => {

      // })
      tracks.forEach((track) => {
        track.dispose();
      });
    };
  }, []);
  return null;
}
