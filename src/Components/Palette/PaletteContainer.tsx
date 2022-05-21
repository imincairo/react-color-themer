import * as React from 'react';
import './PaletteContainer.scss';
import Palette from './Palette';
import AddPalette from '../Controls/AddPalette';
import Generate from '../Controls/Generate';
import { StoreContext } from '../../Store/context';

function PaletteContainer() {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className="PaletteContainer">
      <h2>PaletteContainer</h2>
      <Generate />
      {state.Palettes.map(p =>
        <Palette key={p.Name} palette={p} />
      )}
      <AddPalette />
    </div>
  );
}

export default PaletteContainer;
