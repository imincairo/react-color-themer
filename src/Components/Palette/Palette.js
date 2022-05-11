import React from "react";
import './Palette.scss';
import { StoreContext } from '../../Contexts/Store';
import SwatchContainer from '../Swatch/SwatchContainer';


const Palette = (props) => {
  const [state, dispatch] = React.useContext(StoreContext);
  const styles = {
    palette:{
      border: props.palette.ID === state.ActivePalette.ID ? 
        "4px solid red" : null
    }
  };

  return (
    <div className="Palette"
      onClick={ ()=> dispatch({
        type: 'setActivePalette',
        palette: props.palette
        })
      }
      style={styles.palette}
    >
      <h3>Palette</h3>
      <p>ID: { props.palette.ID.slice(0,6) }</p>
      <SwatchContainer palette={props.palette} />
    </div>
  );
};

export default Palette;
