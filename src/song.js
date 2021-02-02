export const synth1 = {
  0: ['C4', '', 'E4', '', 'G4', '', 'B4', 'C5'],
  1: ['Bb3', '', 'D4', '', 'F4', '', 'A4', 'F4'],
  2: ['C4', '', 'E4', '', 'G4', '', 'B4', 'C5'],
  3: ['Bb3', '', 'D4', '', 'F4', '', 'A4', 'F4'],
};

export const synth2 = {
  0: ['E4', '', 'G4', '', 'B4', '', 'D5', 'E5'],
  1: ['D4', '', 'F4', '', 'A4', '', 'C5', 'D5'],
  2: ['E4', '', 'G4', '', 'B4', '', 'D5', 'E5'],
  3: ['D4', '', 'F4', '', 'A4', '', 'C5', 'D5'],
};

export const synth3 = {
  0: ['C2', 'C2', 'C2', 'C3', '', 'G2', 'G2', 'A2'],
  1: ['Bb2', 'Bb2', 'Bb2', 'Bb2', '', 'F2', 'F2', 'F2'],
  2: ['C2', 'C2', 'C2', 'C3', '', 'G2', 'G2', 'A2'],
  3: ['Bb2', 'Bb2', 'Bb2', 'Bb2', '', 'F2', 'F2', 'F2'],
};
export const synth4 = {
  0: ['', '', 'G5', 'E5', '', '', '', 'C5'],
  1: ['F5', 'E5', '', 'D5', '', '', 'C5', 'E5'],
  2: ['', 'G5', '', '', '', '', '', ''],
  3: ['', '', '', '', '', '', '', ''],
};

export const song = {
  oscTypes: {
    synth1: 'square',
    synth2: 'square',
    synth3: 'sawtooth',
    synth4: 'square',
  },
  patterns: {
    synth1: synth1,
    synth2: synth2,
    synth3: synth3,
    synth4: synth4,
  },
};
