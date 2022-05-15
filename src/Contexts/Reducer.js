// Reducer.js

// helper Functions
const getRandomInt = (min, max) => { //rndm int btwn min max-1
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
};

export const roundColorValue = (value, decimalPlaces) => {
  return Number(value.toFixed(decimalPlaces));
};

export const createSwatchTextColor = (color) => {
  let newColor = createComplement(color);
  newColor.Saturation = 100;//100 - color.Saturation;
  newColor.Lightness = 100 - color.Lightness;
  return newColor;
};

const wrapValue = (value, min, max) => {
  while (value > max) {
    value -= max;
  }
  while (value < min) {
    value += max;
  }
  return value; 
};

const sortSwatches = (swatches, channel, direction='ascending') => {
  swatches.sort((a, b)=> {
    let ret = 1;
    if (a.Color[channel] > b.Color[channel]) { ret=1 } else {ret=-1};
    direction === 'ascending' ? ret=ret : ret=ret*-1;
    return ret;
  });
  return swatches;
};

// Color Functions
const createColor = (mode, color) => {
  if (color) {
    let newColor = {...color};
    for (const [key, value] of Object.entries(newColor)) {
      if (key !== 'Mode') { newColor[key] = Number(value.toFixed(2)) };
    };
    return newColor;
  } else {
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
  let startingColor = {...state.ActiveSwatch.Color};
  if (startingColor.Lightness <= 0) { return state; };
  let step = startingColor.Lightness / count;
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
const createTint = (color, step) => {
  let newColor = {...color};
  switch (newColor.Mode) {
    case 'HSL':
      let newLightness = color.Lightness + step;
      newLightness <= 100
        ? newColor.Lightness = Number(newLightness.toFixed(2))
        : newColor.Lightness = 100;
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }

  return newColor;
};
const generateTints = (state, count) => { //Pure Color + White
  let startingColor = {...state.ActiveSwatch.Color};
  if (startingColor.Lightness >= 100) { return state; };
  let step = state.ActiveSwatch.Color.Lightness / count;
  let i = 1;
  while (count > 0) {
    let newColor = createTint(startingColor, step * i);
    let newSwatch = createSwatch(newColor);
    state = addSwatch(state, newSwatch);
    count = count - 1;
    i = i + 1;
  }
  return state;
};
const createTone = (color, step) => {
  let newColor = {...color};
  switch (newColor.Mode) {
    case 'HSL':
      let newSaturation = color.Saturation + step;
      if (newSaturation > 100) { newSaturation = 100 };
      if (newSaturation < 0) { newSaturation = 0 };
      newColor.Saturation = newSaturation;
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }
  return newColor;
};
const createTones = (color, count, step) => {
  let colors = [];
  let newColor = createTone(color, step);
  switch (color.Mode) {
    case 'HSL':
      while ( count > 0 ) {
        if (newColor.Saturation === color.Saturation) {break;};
        colors.push(newColor);
        newColor = createTone(newColor, step);
        count--;
      };
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }
  console.log(colors);
  return colors;
};
const generateTones = (state, count, mode) => { //Pure Color + Gray
  let startingColor = {...state.ActiveSwatch.Color};
  let newColors = [];
  let step = 0;
  switch (mode) {
    case 'down':
      if (startingColor.Saturation <= 0) { return state; };
      step = startingColor.Saturation / count * -1;
      newColors = createTones(startingColor, count, step);
      break;
    case 'up':
      if (startingColor.Saturation >= 100) { return state; };
      step = (100 - startingColor.Saturation) / count;
      newColors = createTones(startingColor, count, step);
      break;
    case 'around':
      let lower = startingColor.Saturation;
      let upper = 100 - lower;
      upper > lower 
        ? step = lower / count
        : step = upper / count;
      newColors = createTones(startingColor, count, step);
      newColors = newColors.concat(
        createTones(startingColor, count, step * -1));
      break;

    default:
      console.log('No such mode: ' + mode);
      return state;
  }
  newColors.map(c => {
    let newSwatch = createSwatch(c);
    state = addSwatch(state, newSwatch);
  });
  state.Swatches[state.ActivePalette.ID] = sortSwatches(
    state.Swatches[state.ActivePalette.ID], 'Saturation',
    mode === 'down' ? 'descending' : 'ascending'
  );
  return state;
};
const createComplement = (color) => {
  let newColor = {...color};
  switch (newColor.Mode) {
    case 'HSL':
      newColor.Hue = wrapValue(newColor.Hue + 180, 0, 360);
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
const createSplitComplements = (color, count, offset) => {
  let newColors = [];
  switch (color.Mode) {
    case 'HSL':
      let i = 1;
      while (count > 0) {
        newColors.push({
          ...color,
          Hue: wrapValue(color.Hue + 180 + (offset * i), 0, 360)
        });
        newColors.push({
          ...color,
          Hue: wrapValue(color.Hue + 180 - (offset * i), 0, 360)
        });
        i++; count--;
      }
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }
  return newColors;
};
const generateSplitComplements = (state, count, offset) => {
  let newColors = createSplitComplements(
    state.ActiveSwatch.Color, count, offset);
  newColors.map(c => state = addSwatch(state, createSwatch(c)));
  return state;
};
const createAnalogous = (color, count, offset) => {
  let newColors = [];
  switch (color.Mode) {
    case 'HSL':
      let i = 1;
      while (count > 0) {
        newColors.push(
          {...color, Hue: wrapValue(color.Hue + (offset * i), 0, 360)}
        );
        newColors.push(
          {...color, Hue: wrapValue(color.Hue - (offset * i), 0, 360)}
        );
        i++; count--;
      }
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }
  return newColors;
};
const generateAnalogous = (state, count, offset) => {
  let newColors = createAnalogous(
    state.ActiveSwatch.Color, count, offset);
  newColors.map(c => state = addSwatch(state, createSwatch(c)));
  state.Swatches[state.ActivePalette.ID] = sortSwatches(
    state.Swatches[state.ActivePalette.ID], 'Hue'
  );
  return state;
};
const createTriadic = (color) => {
  let newColors = [{...color},{...color}];
  switch (color.Mode) {
    case 'HSL':
      newColors[0].Hue = wrapValue(color.Hue + 120, 0, 360);
      newColors[1].Hue = wrapValue(color.Hue - 120, 0, 360);
      break;

  default:
    console.log("No such Mode: " + color.Mode);
    newColors = [];
  }
  return newColors;
};
const generateTriadic = (state) => {
  let newColors = createTriadic(state.ActiveSwatch.Color);
  newColors.map(c => state = addSwatch(state, createSwatch(c)));
  
  return state;
};
const createTetradic = (color, smallOffset) => {
  let newColors = [{...color},{...color},{...color}];
  switch (color.Mode) {
    case 'HSL':
      newColors[0].Hue = wrapValue(color.Hue + smallOffset, 0, 360);
      newColors[1].Hue = wrapValue(color.Hue + 180, 0, 360);
      newColors[2].Hue = wrapValue(color.Hue + 180 + smallOffset, 0, 360);
      break;

  default:
    console.log("No such Mode: " + color.Mode);
    newColors = [];
  }
  return newColors;
};
const generateTetradic = (state, smallOffset) => {
  let newColors = createTetradic(state.ActiveSwatch.Color, smallOffset);
  newColors.map(c => state = addSwatch(state, createSwatch(c)));
  return state;
};
const createSquare = (color) => {
  let newColors = [{...color},{...color},{...color}];
  switch (color.Mode) {
    case 'HSL':
      newColors[0].Hue = wrapValue(color.Hue + 90, 0, 360);
      newColors[1].Hue = wrapValue(color.Hue + 180, 0, 360);
      newColors[2].Hue = wrapValue(color.Hue + 270, 0, 360);
      break;

  default:
    console.log("No such Mode: " + color.Mode);
    newColors = [];
  }
  return newColors;
};
const generateSquare = (state) => {
  let newColors = createSquare(state.ActiveSwatch.Color);
  newColors.map(c => state = addSwatch(state, createSwatch(c)));
  return state;
};
const createMonochromatic = (color, satStep, lightStep) => {
  let newColor = {...color};
  switch (newColor.Mode) {
    case 'HSL':
      let newSaturation = color.Saturation + satStep;
      newColor.Saturation = wrapValue(newSaturation, 1, 100);

      let newLightness = color.Lightness + lightStep;
      newColor.Lightness = wrapValue(newLightness, 1, 100);
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }
  return newColor;
};
const createMonochromatics = (color, count, satStep, lightStep) => {
  let colors = [];
  switch (color.Mode) {
    case 'HSL':
      let i = 1;
      while ( count > 0 ) {
        let newColor = createMonochromatic(
          color, satStep * i, lightStep * i);
        colors.push(newColor);
        newColor = createMonochromatic(
          color, satStep * -i, lightStep * -i);
        colors.push(newColor);
        count -= 2;
        i++
      };
      break;

    default:
      console.log('No such Mode: ' + color.Mode);
  }
  //console.log(colors);
  return colors;
};
const generateMonochromatics = (state, count, satScale, lightScale) => {
  let startingColor = {...state.ActiveSwatch.Color};
  let newColors = [];
  
  let satStep = 100 / count * satScale;
  let lightStep = 100 / count * lightScale;

  newColors = createMonochromatics(
    startingColor, count, satStep, lightStep);

  newColors.map(c => {
    let newSwatch = createSwatch(c);
    state = addSwatch(state, newSwatch);
  });
  state.Swatches[state.ActivePalette.ID] = sortSwatches(
    state.Swatches[state.ActivePalette.ID], 'Lightness',
    startingColor.Lightness > 50 ? 'descending' : 'ascending' 
  );
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
    case 'generateTints':
      console.log('generateTints');
      return generateTints(state, action.count);
    case 'generateTones':
      console.log('generateTones');
      return generateTones(state, action.count, action.direction);
    case 'generateComplement':
      console.log('generateComplement');
      return generateComplement(state);
    case 'generateSplitComplements':
      console.log('generateSplitComplements');
      return generateSplitComplements(state, action.count, action.offset);
    case 'generateAnalogous':
      console.log('generateAnalogous');
      return generateAnalogous(state, action.count, action.offset);
    case 'generateTriadic':
      console.log('generateTriadic');
      return generateTriadic(state);
    case 'generateTetradic':
      console.log('generateTetradic');
      return generateTetradic(state, action.smallOffset);
    case 'generateSquare':
      console.log('generateSquare');
      return generateSquare(state);
    case 'generateMonochromatics':
      console.log('generateMonochromatics');
      return generateMonochromatics(
        state, action.count, action.satScale, action.lightScale);

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
