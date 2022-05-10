import React from "react";
import { Reducer, InitialState } from './Reducer';


export const StoreContext = React.createContext({
  state: InitialState,
  dispatch: () => null
});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, InitialState);

  return (
    <StoreContext.Provider value={[ state, dispatch ]}>
      { children }
    </StoreContext.Provider>
  );
};
