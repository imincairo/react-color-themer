import * as React from 'react';
import './App.scss';
import PaletteContainer from './Components/Palette/PaletteContainer';
import { StoreProvider } from './Store/context';


export const App = () => {

  return (
    <StoreProvider>
      <div className="App">
        <h1>App</h1>
      
        <PaletteContainer />

      </div>
    </StoreProvider>
  );
}

export default App;
