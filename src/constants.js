export const emptySynthPattern = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
];

export const emptyPattern = {
  synth1: emptySynthPattern,
  synth2: emptySynthPattern,
  synth3: emptySynthPattern,
  synth4: emptySynthPattern,
};

export const defaultOscTypes = {
  synth1: 'square',
  synth2: 'square',
  synth3: 'sawtooth',
  synth4: 'noise',
};

export const emptySong = {
  oscTypes: { ...defaultOscTypes },
  patterns: { ...emptyPattern },
  masterList: [''],
};
