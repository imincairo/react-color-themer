export enum ColorModes {
  HSL = "HSL",
  HSLA = "HSLA",
  RGB = "RGB",
  RGBA = "RGBA",
}

export interface HSL {
  Mode: ColorModes.HSL;
  Hue: number;
  Saturation: number;
  Lightness: number;
}

export interface HSLA {
  Mode: ColorModes.HSLA;
  Hue: number;
  Saturation: number;
  Lightness: number;
  Alpha: number;
}

export interface RGB {
  Mode: ColorModes.RGB;
  Red: number;
  Green: number;
  Blue: number;
}

export interface RGBA {
  Mode: ColorModes.RGBA;
  Red: number;
  Green: number;
  Blue: number;
  Alpha: number;
}

export type Color = HSL | HSLA | RGB | RGBA;

export interface Swatch {
  Name: string;
  Color: Color;
}

export interface Palette {
  Name: string;
  Swatches: Swatch[];
  ActiveSwatch: string;
}

export interface State {
  Palettes: Palette[];
  ActivePalette: string;
  Message: string | null;
}

export const initialState: State = {
  Palettes: [{
    Name: "Main",
    Swatches: [{
      Name: "Main-1",
      Color: {
        Mode: ColorModes.HSL,
        Hue: 0,
        Saturation: 100,
        Lightness: 50
      }
    }],
    ActiveSwatch: "Main-1"
  }],
  ActivePalette: "Main",
  Message: null
}

