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
  synth1: { 0: emptySynthPattern },
  synth2: { 0: emptySynthPattern },
  synth3: { 0: emptySynthPattern },
  synth4: { 0: emptySynthPattern },
};

export const defaultOscTypes = {
  synth1: 'square',
  synth2: 'square',
  synth3: 'triangle',
  synth4: 'noise',
};

export const emptySong = {
  oscTypes: { ...defaultOscTypes },
  patterns: { ...emptyPattern },
  masterList: ['0'],
  title: 'new song',
};
