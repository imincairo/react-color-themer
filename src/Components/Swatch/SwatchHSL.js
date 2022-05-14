import React from 'react';
import './Swatch.scss';
import { StoreContext } from '../../Contexts/Store';


const getHSLColorString = (h,s,l) => (
  "hsl(" + h + " " + s + "% " + l + "%)");


const SwatchHSL = (props) => {
  const [state, dispatch] = React.useContext(StoreContext);

  const styles = {
    swatch: {
      backgroundColor: getHSLColorString(
        props.swatch.Color.Hue,
        props.swatch.Color.Saturation,
        props.swatch.Color.Lightness
      ),
      border: props.swatch.ID === state.ActiveSwatch.ID ? "4px solid red" : null
    }
  };

  return (
      <button className="Swatch"
        style={styles.swatch}
        onClick={(e)=> {
          e.stopPropagation();
          dispatch({
            type: 'setActiveSwatch',
            swatch: props.swatch,
            palette: props.palette
          })
        }}
      >
        <p>Hue: {props.swatch.Color.Hue}</p>
        <p>Saturation: {props.swatch.Color.Saturation}</p>
        <p>Lightness: {props.swatch.Color.Lightness}</p>

      </button>
  );
};

export default SwatchHSL;
