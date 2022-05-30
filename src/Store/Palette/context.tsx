import React, { createContext, useReducer } from "react";
import { INamerReturn, useNamer } from "../../Hooks/useNamer";
import { ReducerActions } from "./actions";
import { reducer } from "./reducer";
import { initialState, IState } from "./state";

type Context = [
  state:IState,
  dispatch:React.Dispatch<ReducerActions>,
  namer:INamerReturn,
];

export const StoreContext = createContext<Context>([
  initialState,
  () => null,
  {NewName: null, NameFromAdd: () => null, NameFromRemove: () => null}
]);

type Props = {
  children?: React.ReactNode,
};

export const StoreProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const namer = useNamer([
    'Primary', 'Secondary', 'Surface', 'Background',
    'Confirm', 'Cancel', 'Error colors', 'Type and Icon'
  ]);

  return (
    <StoreContext.Provider value={[ state, dispatch, namer ]}>
      {children}
    </StoreContext.Provider>
  );
};
