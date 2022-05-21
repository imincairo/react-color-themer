import * as React from 'react';
import { ColorModes } from '../Store/state';


export const useCreatePalette = (name: string) => {
  let newPalette = {
    Name: name,
    Swatches: [{
      Name: name+'1',
      Color: {
        Mode: ColorModes.HSL,
        Hue: 0,
        Saturation: 100,
        Lightness: 50
      }
    }],
    ActiveSwatch: name+'1'
  }
  return newPalette;
};
