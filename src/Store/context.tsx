import * as React from 'react';
import { ReducerActions } from './actions';
import { reducer } from './reducer';
import { State, initialState } from './state';


// interface Context {
//   state: State;
//   dispatch: React.Dispatch<ReducerActions>;
// }
type Context = [state:State, dispatch: React.Dispatch<ReducerActions>];

export const StoreContext = React.createContext<Context>([
  initialState,
  () => null
]);


type Props = {
  children?: React.ReactNode
};

export const StoreProvider = ({children}: Props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[ state, dispatch ]}>
      { children }
    </StoreContext.Provider>
  );
};
