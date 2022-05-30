import './App.scss';
import Palettes from './Components/Palette/Palettes';
import { StoreProvider as PaletteProvider } 
  from './Store/Palette/context';


export const App = () => {
  return (
    <div className="App">
      <PaletteProvider>
        <h1>App</h1>
        <Palettes />
      </PaletteProvider>
    </div>
  );
}

export default App;
