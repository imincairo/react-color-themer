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
    <div className="Palette" style={styles.palette}
      onClick={ ()=> dispatch({
        type: 'setActivePalette',
        palette: props.palette
      })}
    >
      <h3>Name: {props.palette.ID}</h3>
      <SwatchContainer palette={props.palette} />
    </div>
  );
};

export default Palette;
