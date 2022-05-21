import { ColorModes, Color, Swatch, Palette  } from "./state"


const getRandomInt = (min: number, max: number) => { //rndm int btwn min max-1
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
};

export const createColor = (mode: ColorModes) => {
  let newColor: Color;
  switch (mode) {
    case ColorModes.HSL:
      newColor = {
        Mode: ColorModes.HSL,
        Hue: getRandomInt(0,361),
        Saturation: getRandomInt(0, 101),
        Lightness: getRandomInt(0, 101)
      }
      break;
    case ColorModes.HSLA:
      newColor = {
        Mode: ColorModes.HSLA,
        Hue: getRandomInt(0,361),
        Saturation: getRandomInt(0, 101),
        Lightness: getRandomInt(0, 101),
        Alpha: Math.random()
      }
      break;
    case ColorModes.RGB:
      newColor = {
        Mode: ColorModes.RGB,
        Red: getRandomInt(0,256),
        Green: getRandomInt(0,256),
        Blue: getRandomInt(0,256)
      }
      break;
    case ColorModes.RGBA:
      newColor = {
        Mode: ColorModes.RGBA,
        Red: getRandomInt(0,256),
        Green: getRandomInt(0,256),
        Blue: getRandomInt(0,256),
        Alpha: Math.random()
      }
      break;
    default:
      const _exhaustiveCheck: never = mode;
      return _exhaustiveCheck;
  }
  return newColor;
};

export const createSwatch = (
  name: string, color: Color | ColorModes) => {
  let newSwatch: Swatch;
  if (typeof color === "string") {
    newSwatch = {Name: name, Color: createColor(color)};
  } else {
    newSwatch = {Name: name, Color: color};
  }
  return newSwatch;
};

export const createPalette = (
  name: string, option: Swatch | ColorModes) => {
  let newPalette: Palette;
  if (typeof option === "string") {
    let newSwatch: Swatch = createSwatch(name + '-1', option);
    newPalette = {
      Name: name,
      Swatches: [newSwatch],
      ActiveSwatch: newSwatch.Name
    }
  } else {
    newPalette = {
      Name: name,
      Swatches: [option],
      ActiveSwatch:option.Name}
  }
  return newPalette;
};
