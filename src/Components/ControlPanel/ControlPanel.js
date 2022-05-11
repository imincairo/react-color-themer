import React, { useState, useEffect } from "react";
import './ControlPanel.scss';
import { StoreContext } from '../../Contexts/Store';
import Sliders from './Sliders';


const ControlPanel = () => {
  const [state, dispatch] = React.useContext(StoreContext);
  const [newPaletteName, setNewPaletteName] = useState('Palette name');

  const updateNewPaletteName = (event) => {
    setNewPaletteName(event.target.value);
  };

  return (
    <div className="ControlPanel">
      <h2>ControlPanel</h2>

      <div className="Controls">

        <div className="PaletteControls">
          <div className="PaletteRemove">
            { typeof(state.ActivePalette) === 'string' &&
              <label>{state.ActivePalette}</label>
            }
            { typeof(state.ActivePalette) === 'object' &&
              <label>{state.ActivePalette.ID}</label>
            }

            <button className="PanelButton"
              onClick={ ()=> dispatch({type: 'removePalette'}) }
            >
              Remove Palette
            </button>
          </div>

          <div className="PaletteAdd">
            <form>
              <input type="text" name="name" value={newPaletteName}
                onChange={ (e) => {updateNewPaletteName(e)}}
              />
              <input 
                type="submit" value="AddPalette" className="PanelButton"
                onClick={ (e)=> {
                  e.preventDefault();
                  dispatch({type: 'addPalette', name: newPaletteName}) } 
                }
              />
            </form>
          </div>
        </div>

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

      </div>
        
      <Sliders className="Sliders" />
    </div>
  );
};

export default ControlPanel;
