// Reducer.js

// helper Functions
const getRandomInt = (min, max) => { //rndm int btwn min max-1
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
};

// Color Functions
const createColor = (mode, color) => {
  switch (mode) {
    case 'HSL':
      return {
        Mode: 'HSL',
        Hue: getRandomInt(0, 361),
        Saturation: 100,//getRandomInt(0, 101),
        Lightness: 50//getRandomInt(0, 101)
      };

    default:
      return 'No such mode: ' + mode;
  }
};

const setColorChannel = (state, channel, value) => {
  let otherSwatches = state.Swatches[state.ActivePalette.ID].filter(
    s => s.ID !== state.ActiveSwatch.ID
  );
  let swatch = state.ActiveSwatch;
  swatch.Color[channel] = value;
  return {
    ...state,
    Swatches: {
      ...state.Swatches,
      [state.Swatches[state.ActivePalette.ID]]: [
        ...otherSwatches,
        swatch
      ]
    },
    ActiveSwatch: swatch
  };
}

const createShade = (color, step) => {
  let newColor = {...color};
  switch (newColor.Mode) {
    case 'HSL':
      let newLightness = newColor.Lightness - step;
      newLightness >= 0
        ? newColor.Lightness = Number(newLightness.toFixed(2))
        : newColor.Lightness = 0;
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }

  return newColor;
};

const generateShades = (state, count) => { //Pure Color + Black
  let step = state.ActiveSwatch.Color.Lightness / count;
  let startingColor = {...state.ActiveSwatch.Color};
  let i = 1;
  while (count > 0) {
    let newColor = createShade(startingColor, step * i);
    let newSwatch = createSwatch(newColor);
    state = addSwatch(state, newSwatch);
    count = count - 1;
    i = i + 1;
  }
  return state;
};

const generateTint = (state) => { //Pure Color + White
  return state;
};

const generateTone = (state) => { //Pure Color + Gray
  return state;
};

export const createSwatchTextColor = (color) => {
  let newColor = createComplement(color);
  newColor.Saturation = 100;//100 - color.Saturation;
  newColor.Lightness = 100 - color.Lightness;
  return newColor;
};

const createComplement = (color) => {
  let newColor = {...color};
  switch (newColor.Mode) {
    case 'HSL':
      if (newColor.Hue > 180) {
        newColor.Hue = color.Hue - 180;
      } else {
        newColor.Hue = color.Hue + 180;
      }
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }
  return newColor;
};

const generateComplement = (state) => {
  let newColor = createComplement(state.ActiveSwatch.Color);
  //console.log(newColor);
  let newSwatch = createSwatch(newColor);
  //console.log(newSwatch);
  state = addSwatch(state, newSwatch);
  return state;
};

const createSplitComplements = (color) => {
  return color;
};

const generateSplitComplements = (state) => {
  return state;
};

const generateAnalogous = (state) => {
  return state;
};

const generateTriadic = (state) => {
  return state;
};

const generateTetradic = (state) => {
  return state;
};

const generateSquare = (state) => {
  return state;
};

const generateMonochromatic = (state) => {
  return state;
};

// Swatch Functions
const createSwatch = (color) => {
  return {
    ID: crypto.randomUUID(),
    Color: !color ? 'No Color' : color,
  };
};

const setActiveSwatch = (state, swatch, palette) => {
  return {
    ...state,
    ActiveSwatch: swatch,
    ActivePalette: palette
  };
};

const addSwatch = (state, swatch) => {
  let newSwatch = null;

  if (swatch) {
    newSwatch = swatch;
  } else {
    newSwatch = createSwatch(createColor('HSL'));
  }
  //console.log(newSwatch);
  return {
    ...state,
    Swatches: {
      ...state.Swatches,
      [state['ActivePalette']['ID']]: [
        ...state.Swatches[state.ActivePalette.ID],
        newSwatch
      ]
    }
  };
};

const removeSwatch = (state) => {
  return {
    ...state,
    Swatches: {
      ...state.Swatches,
      [state.ActivePalette.ID]: [
        ...state.Swatches[state.ActivePalette.ID].filter(s =>
          s.ID !== state.ActiveSwatch.ID)
      ]
    },
    ActiveSwatch: 'No Swatch Active'
  };
};

// Palette Functions
const createPalette = () => {
  return {
    ID: crypto.randomUUID(),
  };
};

const setActivePalette = (state, palette) => {
  return {
    ...state,
    ActivePalette: palette,
    ActiveSwatch: state.Swatches[palette.ID][0] ? 
      state.Swatches[palette.ID][0] :
      'No Swatch Active'
  };
};

const addPalette = (state) => {
  let newPalette = createPalette();
  let newSwatch = createSwatch(createColor('HSL'));

  return {
    ...state,
    Palettes: [
      ...state.Palettes,
      newPalette
    ],
    Swatches: {
      ...state.Swatches,
      [newPalette['ID']]: [newSwatch]
    }
  };
};

const removePalette = (state) => {
  delete state.Swatches[state.ActivePalette.ID];

  return {
    ...state,
    Palettes: [
      ...state.Palettes.filter(p => p.ID !== state.ActivePalette.ID)
    ],
    Swatches: {...state.Swatches},
    ActivePalette: 'No Palette Active',
    ActiveSwatch: 'No Swatch Active'
  };
};



// REDUCER
export function Reducer(state, action) {
  switch (action.type) {
    case 'setColorChannel':
      console.log('setColorChannel');
      return setColorChannel(state, action.channel, action.value);
    case 'generateShades':
      console.log('generateShades');
      return generateShades(state, action.count);
    case 'generateTint':
      console.log('generateTint');
      return generateTint(state);
    case 'generateTone':
      console.log('generateTone');
      return generateTone(state);
    case 'generateComplement':
      console.log('generateComplement');
      return generateComplement(state);
    case 'generateSplitComplements':
      console.log('generateSplitComplements');
      return generateSplitComplements(state);
    case 'generateAnalogous':
      console.log('generateAnalogous');
      return generateAnalogous(state);
    case 'generateTriadic':
      console.log('generateTriadic');
      return generateTriadic(state);
    case 'generateTetradic':
      console.log('generateTetradic');
      return generateTetradic(state);
    case 'generateSquare':
      console.log('generateSquare');
      return generateSquare(state);
    case 'generateMonochromatic':
      console.log('generateMonochromatic');
      return generateMonochromatic(state);

    case 'setActiveSwatch':
      console.log('setActiveSwatch');
      return setActiveSwatch(state, action.swatch, action.palette);
    case 'addSwatch':
      console.log('addSwatch');
      return addSwatch(state, action.name);
    case 'removeSwatch':
      console.log('removeSwatch');
      return removeSwatch(state);

    case 'setActivePalette':
      console.log('setActivePalette');
      return setActivePalette(state, action.palette);
    case 'addPalette':
      console.log('addPalette');
      return addPalette(state);
    case 'removePalette':
      console.log('removePalette');
      return removePalette(state);

    default:
      return "no such action.type: " + action.type;
  }
};

// INITIAL STATE
const color = createColor('HSL');
const swatch = createSwatch(color);
const palette = createPalette('Main');

export const InitialState = {
  Palettes: [palette],
  Swatches: {[palette['ID']]: [swatch]},
  ActivePalette: palette,
  ActiveSwatch: swatch
};
