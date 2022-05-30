import { INameMap } from '../../Hooks/useNamer';

export enum ActionTypes {
  AddPalette,
  RemovePalette,
  SetActivePalette,
}

export interface AddPalette {
  type: ActionTypes.AddPalette;
  payload: {paletteName:INameMap};
}

export interface RemovePalette {
  type: ActionTypes.RemovePalette;
  payload: {paletteName:INameMap};
}

export interface SetActivePalette {
  type: ActionTypes.SetActivePalette;
  payload: {paletteName:INameMap | null};
}

export type ReducerActions = AddPalette | RemovePalette | SetActivePalette;
