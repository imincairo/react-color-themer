import React, { useState } from "react";
import './GenerateControls.scss';
import { StoreContext } from '../../Contexts/Store';


const GenerateControls = () => {
  const [state, dispatch] = React.useContext(StoreContext);
  const [shadeCount, setShadeCount] = useState(1);
  const [tintCount, setTintCount] = useState(1);
  const [toneCount, setToneCount] = useState(1);
  const [toneDirection, setToneDirection] = useState('down');
  const [splitComplementsCount, setSplitComplementsCount]
    = useState(1);
  const [splitComplementsOffset, setSplitComplementsOffset]
    = useState(30);
  const [analogousCount, setAnalogousCount] = useState(2);
  const [analogousOffset, setAnalogousOffset] = useState(15);
  const [tetradicOffsetSmall, setTetradicOffsetSmall] = useState(60);
  const [tetradicOffsetLarge, setTetradicOffsetLarge] = useState(120);
  const [monochromaticCount, setMonochromaticCount] = useState(2);
  const [monochromaticSaturationScale, setMonochromaticSaturationScale]
    = useState(.5);
  const [monochromaticLightnessScale, setMonochromaticLightnessScale]
    = useState(.5);

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
          generateTones
        </button>
      </div>
      
      <div className="generateComplement">
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({type: 'generateComplement'})}
          }
        >
          generateComplement
        </button>
      </div>

      <div className="generateSplitComplements">
        <label htmlFor="splitComplementsCount">Count</label>
        <input type="number" id="splitComplementsCount"
          min="1" max="90" value={splitComplementsCount}
          onChange={ (event)=> {
            setSplitComplementsCount(event.target.valueAsNumber)
          }}
        />
        <label htmlFor="splitComplementsOffset">Offset</label>
        <input type="range" id="splitComplementsOffset"
          min="1" max="90" value={splitComplementsOffset}
          onChange={ (event)=> {
            setSplitComplementsOffset(event.target.valueAsNumber)
          }}
        />
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({
              type: 'generateSplitComplements',
              count: splitComplementsCount,
              offset: splitComplementsOffset
            })}

          }
        >
          generateSplitComplements
        </button>
      </div>

      <div className="generateAnalogous">
        <label htmlFor="analogousCount">Count</label>
        <input type="number" id="analogousCount"
          min="1" max="4" value={analogousCount}
          onChange={ (event)=> {
            setAnalogousCount(event.target.valueAsNumber)
          }}
        />
        <label htmlFor="analogousOffset">Offset</label>
        <input type="range" id="analogousOffset"
          min="1" max="60" value={analogousOffset}
          onChange={ (event)=> {
            setAnalogousOffset(event.target.valueAsNumber)
          }}
        />
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({
              type: 'generateAnalogous',
              count: analogousCount,
              offset: analogousOffset
            })}
          }
        >
          generateAnalogous
        </button>
      </div>

      <div className="generateTriadic">
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({type: 'generateTriadic'})}
          }
        >
          generateTriadic
        </button>
      </div>

      <div className="generateTetradic">
        <label htmlFor="tetradicOffsetSmall">SmallOffset</label>
        <input type="range" id="tetradicOffsetSmall"
          min="1" max="90" value={tetradicOffsetSmall}
          onChange={ (event)=> {
            setTetradicOffsetSmall(event.target.valueAsNumber)
            setTetradicOffsetLarge(180 - event.target.valueAsNumber)
          }}
        />
        <label htmlFor="tetradicOffsetLarge">LargeOffset</label>
        <input type="range" id="tetradicOffsetLarge"
          min="90" max="180" value={tetradicOffsetLarge}
          onChange={ (event)=> {
            setTetradicOffsetLarge(event.target.valueAsNumber)
            setTetradicOffsetSmall(180 - event.target.valueAsNumber)
          }}
        />
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({
              type: 'generateTetradic',
              smallOffset: tetradicOffsetSmall
            })}
          }
        >
          generateTetradic
        </button>
      </div>

      <div className="generateSquare">
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({type: 'generateSquare'})}
          }
        >
          generateSquare
        </button>
      </div>

      <div className="generateMonochromatic">
        <label htmlFor="monochromaticCount">Count</label>
        <input type="number" id="monochromaticCount"
          min="0" max="10" value={monochromaticCount}
          onChange={ (event)=> {
            setMonochromaticCount(event.target.valueAsNumber)
          }}
        />
        <label htmlFor="monochromaticSaturationScale">
          SaturationScaling
        </label>
        <input type="range" id="monochromaticSaturationScale"
          min="0" max="1" step="0.1"
          value={monochromaticSaturationScale}
          onChange={ (event)=> {
            setMonochromaticSaturationScale(event.target.valueAsNumber)
          }}
        />
        <label htmlFor="monochromaticLightnessScale">
          LightnessScaling
        </label>
        <input type="range" id="monochromaticLightnessScale"
          min="0" max="1" step="0.1"
          value={monochromaticLightnessScale}
          onChange={ (event)=> {
            setMonochromaticLightnessScale(event.target.valueAsNumber)
          }}
        />
        <button
          onClick={ (event)=> {
            event.stopPropagation();
            dispatch({
              type: 'generateMonochromatics',
              count: monochromaticCount,
              satScale: monochromaticSaturationScale,
              lightScale: monochromaticLightnessScale
            })}
          }
        >
          generateMonochromatics
        </button>
      </div>
    </div>
  );
};

export default GenerateControls;
