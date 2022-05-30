import { IPalette } from '../../Store/Palette/state';
import './Palette.scss';
//import { StoreProvider as SSP } from "../../Store/Swatch/context";
//import Swatches from '../Swatch/Swatches';
//import RemovePalette from './RemovePalette';
//import { useContext } from 'react';
//import { StoreContext } from '../../Store/Palette/context';
//import { ActionTypes } from '../../Store/Palette/actions';

type Props = { palette:IPalette };


const Palette = ({palette}:Props) => {
  //const [palettesState, dispatch, ] = useContext(StoreContext);
  //let active = palettesState.ActivePalette ? true : false;
  // const style = {
  //   border: active ? "4px solid red" : undefined,
  // }

  return (
    <div className='Palette'>
      <p>name: {palette.Name.Name}</p>
    {/* <SSP paletteName={paletteName}>
      <div className='Palette'
        style={style}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({
            type: ActionTypes.SetActivePalette,
            payload: {paletteName: paletteName}
          });
        }}
      >
        <h3>Palette</h3>
        <Swatches />
        {active &&
          <RemovePalette />
        }
      </div>
    </SSP> */}
    </div>
  );
}

export default Palette;
