import React, { createContext } from 'react';
import * as Tone from 'tone';

const synth = new Tone.Synth();
const SynthContext = createContext({ synth });

export default SynthContext;
