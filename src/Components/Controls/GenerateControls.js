import React, { useState } from "react";
import './GenerateControls.scss';
import { StoreContext } from '../../Contexts/Store';


const GenerateControls = () => {
  const [state, dispatch] = React.useContext(StoreContext);
  const [shadeCount, setShadeCount] = useState(1);
  const [tintCount, setTintCount] = useState(1);
  const [toneCount, setToneCount] = useState(1);
  const [toneDirection, setToneDirection] = useState('down');

  return (
    <div className="GenerateControls">
      <div className="generateShades">
        <label htmlFor="shadeCount">Count</label>
        <input type="number" id="shadeCount"
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

      <div className="generateTints">
        <label htmlFor="tintCount">Count</label>
        <input type="number" id="tintCount"
          min="0" max="10" value={tintCount}
          onChange={ (event)=> {
            setTintCount(event.target.valueAsNumber)
          }}
        />
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({type: 'generateTints', count: tintCount})}
          }
        >
          generateTints
        </button>
      </div>

      <div className="generateTones">
        <label htmlFor="toneCount">Count</label>
        <input type="number" id="toneCount"
          min="0" max="10" value={toneCount}
          onChange={ (event)=> {
            setToneCount(event.target.valueAsNumber)
          }}
        />
        <label htmlFor="toneDirection">Options</label>
        <select id="toneDirection"
          value={toneDirection}
          onChange={ (event)=> setToneDirection(event.target.value) }
        >
          <option value="down">Down</option>
          <option value="up">Up</option>
          <option value="around">Around</option>
        </select>
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({
              type: 'generateTones',
              count: toneCount,
              direction: toneDirection
            })}
          }
        >
          generateTone
        </button>
      </div>

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
