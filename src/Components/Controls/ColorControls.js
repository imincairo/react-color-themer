import React from "react";
import { StoreContext } from '../../Contexts/Store';
import './ColorControls.scss';


const ColorControls = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  if (typeof(state.ActiveSwatch) == 'object') {
    return (
      <div className="Sliders">
        <div className="Channel">
          <label>Hue: {state.ActiveSwatch.Color.Hue}° </label>
          <input
            type="range" min="0" max="360" step="1"
            value={state.ActiveSwatch.Color.Hue}
            onChange={ (e)=> dispatch(
              {
                type: 'setColorChannel',
                channel: 'Hue',
                value: e.target.value
              }) 
            }
          />
        </div>

        <div className="Channel">
        <label>Saturation: {state.ActiveSwatch.Color.Saturation}% </label>
          <input
          type="range" min="0" max="100" step="1"
          value={state.ActiveSwatch.Color.Saturation}
          onChange={ (e)=> dispatch(
            {
              type: 'setColorChannel',
              channel: 'Saturation',
              value: e.target.value
            }) 
          }
          />
        </div>

        <div className="Channel">
          <label>Lightness: {state.ActiveSwatch.Color.Lightness}% </label>
          <input
            type="range" min="0" max="100" step="1"
            value={state.ActiveSwatch.Color.Lightness}
            onChange={ (e)=> dispatch(
              {
                type: 'setColorChannel',
                channel: 'Lightness',
                value: e.target.value
              }) 
            }
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="Sliders">
        <div className="Channel">
          <label>Hue:  </label>
          <input
            type="range" min="0" max="360" step="1"
            value='0'
          />
        </div>

        <div className="Channel">
        <label>Saturation: </label>
          <input
          type="range" min="0" max="100" step="1"
          value="0"
          />
        </div>

        <div className="Channel">
          <label>Lightness: </label>
          <input
            type="range" min="0" max="100" step="1"
            value="0"
          />
        </div>
      </div>
    );
  }
};

export default ColorControls;
