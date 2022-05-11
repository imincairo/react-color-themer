import React from "react";
import './ColorThemer.scss';
import { StoreContext } from './Contexts/Store';
import PaletteControls from './Components/Controls/PaletteControls';
import ColorControls from './Components/Controls/ColorControls';
import PaletteContainer from './Components/Palette/PaletteContainer';


const ColorThemer = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className='ColorThemer'>
      <h1>ColorThemer</h1>

      <div className="ControlPanel">
        <ColorControls />
        <PaletteControls />
      </div>

      <PaletteContainer />

    </div>
  );
};

export default ColorThemer;
