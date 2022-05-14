import React from "react";
import './GenerateControls.scss';
import { StoreContext } from '../../Contexts/Store';


const GenerateControls = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className="GenerateControls">
      <button 
        onClick={ (event)=> {
          event.stopPropagation();
          dispatch({type: 'generateShade'})}
        }
      >
        generateShade
      </button>

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
