import React from "react";
import './PaletteContainer.scss';
import { StoreContext } from '../../Contexts/Store';
import Palette from './Palette';


const PalettesContainer = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className="PalettesContainer">
      <h2>PalettesContainer</h2>

      { state.Palettes.sort((a, b) => {
          if (a.ID < b.ID) {
            return 1;
          } else {
            return -1;
          }
        }).map(palette =>
          <Palette 
            key={palette.ID} 
            palette={palette}
          />
        )
      }
    </div>
  );
};

export default PalettesContainer;
