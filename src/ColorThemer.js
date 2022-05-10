import React from "react";
import './ColorThemer.scss';
import { StoreContext } from './Contexts/Store';
import ControlPanel from './Components/ControlPanel/ControlPanel';
import PalettesContainer from './Components/Palette/PalettesContainer';


const ColorThemer = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className='ColorThemer'>
      <h1>ColorThemer</h1>

      <ControlPanel />
      <PalettesContainer />

    </div>
  );
};

export default ColorThemer;
