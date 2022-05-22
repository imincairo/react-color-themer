import * as React from 'react';
import './Palette.scss';
import ActiveSwatch from '../Swatch/ActiveSwatch';
import InactiveSwatches from '../Swatch/InactiveSwatches';
import RemovePalette from '../Controls/RemovePalette';
import { Palette as P } from '../../Store/state';
import { StoreContext } from '../../Store/context';
import { Actions } from '../../Store/actions';


const Palette = (props: {palette: P}) => {
  const [state, dispatch] = React.useContext(StoreContext);
  const styles = {
    active: {
      border: "4px solid red",
      opacity: "1"
    },
    inactive: {
      border: "2px solid yellow",
      opacity: "0.6"
    }
  }
  let style = styles.inactive;
  if (props.palette.Name === state.ActivePalette) {
    style = styles.active
  }


  return (
    <div className="Palette"
      style={style}
      onClick={(e)=> {
        e.stopPropagation();
        dispatch({
          type: Actions.SetActivePalette,
          payload: { paletteName: props.palette.Name }
        });
    }}>
      <p>{props.palette.Name}</p>
      <div className='Swatches'>
      <ActiveSwatch />
      <InactiveSwatches />
      </div>
      { props.palette.Name === state.ActivePalette &&
        <RemovePalette />
      }

    </div>
  );
}

export default Palette;
