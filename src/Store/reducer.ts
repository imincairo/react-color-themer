import { ColorModes, State } from './state';
import { Actions, ReducerActions } from './actions';
import { createPalette } from './helpers';


export const reducer = (state: State, 
  action: ReducerActions): State => {
  switch (action.type) {
    case Actions.AddPalette:
      console.log("AddPalette");
      if (state.Palettes.find(p => 
        p.Name === action.payload.paletteName)) {
        return state;
      }
      return {
        ...state,
        Palettes: [
          ...state.Palettes,
          createPalette(action.payload.paletteName, ColorModes.HSL)
        ]
      };
    case Actions.RemovePalette:
      return {...state};
    case Actions.SetActivePalette:
      return {...state};

    default:
      return {...state};

  }
}
