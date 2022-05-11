import React from "react";
import './ColorThemer.scss';
import { StoreContext } from './Contexts/Store';
import ControlPanel from './Components/ControlPanel/ControlPanel';
import PaletteContainer from './Components/Palette/PaletteContainer';


const ColorThemer = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className='ColorThemer'>
      <h1>ColorThemer</h1>

      <ControlPanel />
      <PaletteContainer />

    </div>
  );
};

export default ColorThemer;
