import { INameMap } from "../../Hooks/useNamer";

export interface IPalette {
  Name: INameMap;
}

export interface IState {
  Palettes: IPalette[];
  ActivePalette: IPalette | null;
  Message: string | null;
}

export const initialState: IState = {
  Palettes: [],
  ActivePalette: null,
  Message: null,
}
