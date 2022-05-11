import React, { useState, useEffect } from "react";
import './ControlPanel.scss';
import { StoreContext } from '../../Contexts/Store';
import Sliders from './Sliders';


const ControlPanel = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className="ControlPanel">
      <h2>ControlPanel</h2>


      { typeof(state.ActivePalette) === 'string' &&
        <p>ActivePaletteID: {state.ActivePalette}</p>
      }
      { typeof(state.ActivePalette) === 'object' &&
        <p>ActivePaletteID: {state.ActivePalette.ID.slice(0,8)}</p>
      }

      { typeof(state.ActiveSwatch) === 'string' &&
        <p>ActiveSwatchID: { state.ActiveSwatch }</p>
      }
      { typeof(state.ActiveSwatch) === 'object' &&
        <p>ActiveSwatchID: {
          state.ActiveSwatch.ID.slice(0,8)
        }</p>
      }


      <div className="ControlPanelButtons">
        <button onClick={ ()=> dispatch({type: 'addPalette'}) } >
          Add Palette
        </button>

        <button onClick={ ()=> dispatch({type: 'removePalette'}) } >
          Remove Palette
        </button>

        <button onClick={ ()=> dispatch({type: 'addSwatch'}) } >
          Add Swatch
        </button>

        <button onClick={ ()=> dispatch({type: 'removeSwatch'}) } >
          Remove Swatch
        </button>
      </div>

      <Sliders />
    </div>
  );
};

export default ControlPanel;
