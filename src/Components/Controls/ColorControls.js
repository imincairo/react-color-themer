import React from "react";
import { StoreContext } from '../../Contexts/Store';
import './ColorControls.scss';


const ColorControls = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  if (typeof(state.ActiveSwatch) == 'object') {
    return (
      <div className="ColorControls">
        <div className="Channel">
          <label>Hue: {state.ActiveSwatch.Color.Hue}° </label>
          <input
            type="range" min="0" max="360" step="1" list="hue-ticks"
            value={state.ActiveSwatch.Color.Hue}
            onChange={ (e)=> dispatch(
              {
                type: 'setColorChannel',
                channel: 'Hue',
                value: e.target.valueAsNumber
              }) 
            }
          />
          <datalist id="hue-ticks">
            <option value="0" label="Red"/>
            <option value="60" label="Yellow"/>
            <option value="120" label="Green"/>
            <option value="180" label="Cyan"/>
            <option value="240" label="Blue"/>
            <option value="300" label="Magenta"/>
          </datalist>
        </div>

        <div className="Channel">
        <label>Saturation: {state.ActiveSwatch.Color.Saturation}% </label>
          <input
          type="range" min="0" max="100" step="1" list="sat-ticks"
          value={state.ActiveSwatch.Color.Saturation}
          onChange={ (e)=> dispatch(
            {
              type: 'setColorChannel',
              channel: 'Saturation',
              value: e.target.valueAsNumber
            }) 
          }
          />
          <datalist id="sat-ticks">
            <option value="0" label="0"/>
            <option value="25" label="25"/>
            <option value="50" label="50"/>
            <option value="75" label="75"/>
            <option value="100" label="100"/>
          </datalist>
        </div>

        <div className="Channel">
          <label>Lightness: {state.ActiveSwatch.Color.Lightness}% </label>
          <input
            type="range" min="0" max="100" step="1" list="light-ticks"
            value={state.ActiveSwatch.Color.Lightness}
            onChange={ (e)=> dispatch(
              {
                type: 'setColorChannel',
                channel: 'Lightness',
                value: e.target.valueAsNumber
              }) 
            }
          />
          <datalist id="light-ticks">
            <option value="0" label="Black"/>
            <option value="25" label="25"/>
            <option value="50" label="50"/>
            <option value="75" label="75"/>
            <option value="100" label="White"/>
          </datalist>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ColorControls">
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
