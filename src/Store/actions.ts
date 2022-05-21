export enum Actions {
  AddPalette,
  RemovePalette,
  SetActivePalette,
}

export interface AddPalette {
  type: Actions.AddPalette;
  payload: {paletteName: string};
}

export interface RemovePalette {
  type: Actions.RemovePalette;
  payload: {paletteName: string};
}

export interface SetActivePalette {
  type: Actions.SetActivePalette;
  payload: {paletteName: string};
}

export type ReducerActions = AddPalette | RemovePalette | SetActivePalette;
