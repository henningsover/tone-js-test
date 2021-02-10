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
  synth3: 'triangle',
  synth4: 'noise',
};

export const emptySong = {
  title: 'new song',
  author: 'admin',
  oscTypes: { ...defaultOscTypes },
  patterns: { ...emptyPattern },
  masterList: [''],
};
