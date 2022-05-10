/*
*   state = {Palettes: [],
*            Swatches: [],
*            ActivePalette: null,
*   }
*   Palettes = {
*     ID: crypto.uuid,
*     ActiveSwatch: null,
*
*   }
*   Swatches = {
*     ID: crypto.uuid,
*     PaletteID: parent palette's ID,
*     ColorMode: 'HSL', 'RGB', etc,
*     Hue: number,
*     Saturation: number,
*     etc for all channels needed by color mode
*   }
*/

const getRandomInt = (min, max) => { //rndm int btwn min max-1
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
};

// Swatch Functions
const createNewSwatch = (colorMode, paletteID) => {
  switch (colorMode) {
    case 'HSL':
      return {
        ID: crypto.randomUUID(),
        PaletteID: paletteID,
        Hue: getRandomInt(0, 361),
        Saturation: getRandomInt(0, 101),
        Lightness: getRandomInt(0, 101),
      };
    default:
      return "no such colorMode: " + colorMode;
  }
};

// Palette Functions
const setActivePalette = (state, paletteID) => {
  let activePalette = state.Palettes.find(p => p.ID === paletteID);
  if (!activePalette) { activePalette = 'No Palette Active'};
  state = {
    ...state,
    ActivePalette: activePalette
  }
  return state;
};
const createNewPalette = () => {
  return {
    ID: crypto.randomUUID(),
    ActiveSwatchID: null
  };
}
const addPalette = (state) => {
  let newPalette = createNewPalette();
  state = {...state,
           Palettes: [...state.Palettes, newPalette]
  }
  // need to call after adding the new palette
  state = setActivePalette(state, newPalette.ID);
  return state;
};
const removePalette = (state) => {
  console.log('removePalette()');
  state = {
    ...state,
    Palettes: state.Palettes.filter(p =>
      p.ID !== state.ActivePalette.ID
    )
  };
  // call to change ActivePaletteID from the one removed
  state = setActivePalette(state, state.ActivePaletteID);
  return state;
};


// REDUCER
export const Reducer = (state, action) => {
  switch (action.type) {
    case 'addPalette':
      console.log('addPalette');
      return addPalette(state);
    case 'removePalette':
      console.log('removePalette');
      return removePalette(state);
    case 'setActivePalette':
      console.log('setActivePalette');
      return setActivePalette(state, action.paletteID);

    default:
      return "no such action.type: " + action.type;
  }
};

// INITIAL STATE
let initialPalette = createNewPalette();
let initialSwatch = createNewSwatch('HSL', initialPalette.ID);
initialPalette.ActiveSwatch = initialSwatch;
export const InitialState = {
  Palettes: [initialPalette],
  Swatches: [initialSwatch],
  ActivePalette: initialPalette,
};
