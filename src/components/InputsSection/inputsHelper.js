import React from 'react';

export const getNote = (charCode, octave) => {
  const keyboardMap = {
    KeyZ: `C${octave}`,
    KeyS: `C#${octave}`,
    KeyX: `D${octave}`,
    KeyD: `D#${octave}`,
    KeyC: `E${octave}`,
    KeyV: `F${octave}`,
    KeyG: `F#${octave}`,
    KeyB: `G${octave}`,
    KeyH: `G#${octave}`,
    KeyN: `A${octave}`,
    KeyJ: `A#${octave}`,
    KeyM: `B${octave}`,
    Comma: `C${octave + 1}`,
    Space: 'X',
    Backspace: '',
  };
  return keyboardMap[charCode];
};
