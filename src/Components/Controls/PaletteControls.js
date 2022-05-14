import React, { useState, useEffect } from "react";
import './PaletteControls.scss';
import { StoreContext } from '../../Contexts/Store';


const PaletteControls = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className="PaletteControls">
      <button onClick={ ()=> dispatch({type: 'removePalette'}) }>
        Remove Palette
      </button>

      <button onClick={ (e)=> {
        e.preventDefault();
        dispatch({type: 'addPalette'}) 
        } 
      }>
        Add Palette
      </button>
    </div>
  );
};

export default PaletteControls;
