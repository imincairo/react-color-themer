import { INameMap } from "../../Hooks/useNamer";
import { ActionTypes, ReducerActions } from "./actions";
import { IPalette, IState } from "./state";

export const reducer = (state:IState, action:ReducerActions):IState => {
  switch (action.type) {
    case ActionTypes.AddPalette:
      console.log("AddPalette");
      return addPalette(state, action.payload.paletteName);
    case ActionTypes.RemovePalette:
      console.log("RemovePalette");
      return state;
    case ActionTypes.SetActivePalette:
      console.log("SetActivePalette");
      return state;

    default:
      return state;
  }
};

const createPalette = (name:INameMap):IPalette => {
  return {Name: name}
};

const addPalette = (state:IState, paletteName:INameMap):IState => {
  if (state.Palettes.find(p => p.Name === paletteName)) {
    return state;
  } else 
  {
    const newPalette = createPalette(paletteName);
    return {
      ...state,
      Palettes: [
        ...state.Palettes,
        newPalette
      ],
      ActivePalette: newPalette
    };
  }
};
