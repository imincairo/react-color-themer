import React, { useState } from "react";
import './GenerateControls.scss';
import { StoreContext } from '../../Contexts/Store';


const GenerateControls = () => {
  const [state, dispatch] = React.useContext(StoreContext);
  const [shadeCount, setShadeCount] = useState(1);

  return (
    <div className="GenerateControls">
      <div className="generateShades">
        <label for="shadeCount">Count</label>
        <input type="number" id="shadeCount" name="shadeCount"
          min="0" max="10" value={shadeCount}
          onChange={ (event)=> {
            setShadeCount(event.target.valueAsNumber)
          }}
        />
           
        <button 
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({type: 'generateShades', count: shadeCount})}
          }
        >
          generateShades
        </button>
      </div>

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateTint'})}
        }
      >
        generateTint
      </button>

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateTone'})}
        }
      >
        generateTone
      </button
      >

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateComplement'})}
        }
      >
        generateComplement
      </button>

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateSplitComplements'})}
        }
      >
        generateSplitComplements
      </button>

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateAnalogous'})}
        }
      >
        generateAnalogous
      </button>

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateTriadic'})}
        }
      >
        generateTriadic
      </button>

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateTetradic'})}
        }
      >
        generateTetradic
      </button>

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateSquare'})}
        }
      >
        generateSquare
      </button>

      <button
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateMonochromatic'})}
        }
      >
        generateMonochromatic
      </button>
    </div>
  );
};

export default GenerateControls;
