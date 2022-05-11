import React, { useState, useEffect } from "react";
import './SwatchControls.scss';
import { StoreContext } from '../../Contexts/Store';


const SwatchControls = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className="SwatchControls">
      <button className="PanelButton"
        onClick={ ()=> dispatch({type: 'removeSwatch'}) }
      >
        Remove Swatch
      </button>
    
      <button className="PanelButton"
        onClick={ (e)=> {
          e.preventDefault();
          dispatch({type: 'addSwatch'}) } 
        }
      >
        AddSwatch
      </button>
    </div>

  );
};

export default SwatchControls;
