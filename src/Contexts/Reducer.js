// Reducer.js

// helper Functions
const getRandomInt = (min, max) => { //rndm int btwn min max-1
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
};

// Color Functions
const createColor = (mode) => {
  switch (mode) {
    case 'HSL':
      return {
        Mode: 'HSL',
        Hue: getRandomInt(0, 361),
        Saturation: getRandomInt(0, 101),
        Lightness: getRandomInt(0, 101)
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

const addSwatch = (state) => {
  let newSwatch = createSwatch(createColor('HSL'));
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
const createPalette = (name) => {
  return {
    ID: name,
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

const addPalette = (state, name) => {
  if (state.Palettes.find(p => p.ID === name)) {
    console.log('Palette exists with ID: ' + name);
    return {...state};
  }

  let newPalette = createPalette(name);
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
      return addPalette(state, action.name);
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
