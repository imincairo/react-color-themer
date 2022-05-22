import { useState } from "react";

const Names: Array<string> = ['Primary', 'Secondary', 'Surface',
  'Background', 'Confirm', 'Cancel', 'Error colors', 'Type and Icon'];


export interface NamerState {
  index: number;
  names: Array<string>;
  name: string;
  next?: () => NamerState;
}



export const usePaletteNamer = () => {
  const [state, setState] = useState<NamerState>({
    index: 0,
    names: Names,
    name: Names[0],
  });

  const handleNext = () => {
    console.log("handleNext");
    if (state.index < state.names.length - 1) {
      state.index++;
      state.name = state.names[state.index];

    } else {
      state.name = "Do you really need another?";
    }
    return state;
  };

  state.next = handleNext;

  return state;
};
