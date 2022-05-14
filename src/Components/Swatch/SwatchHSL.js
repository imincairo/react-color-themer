import React from 'react';
import './Swatch.scss';
import { StoreContext } from '../../Contexts/Store';
import { createSwatchTextColor, roundColorValue } from '../../Contexts/Reducer';


const getHSLColorString = (color) => (
  "hsl(" + color.Hue + "," +
           color.Saturation + "%," + 
           color.Lightness + "%)");


const SwatchHSL = (props) => {
  const [state, dispatch] = React.useContext(StoreContext);

  const styles = {
    swatch: {
      color: getHSLColorString(
        createSwatchTextColor(props.swatch.Color)
      ),
      backgroundColor: getHSLColorString(
        props.swatch.Color
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
        <p>Saturation: {
          roundColorValue(props.swatch.Color.Saturation, 2)
        }</p>
        <p>Lightness: {props.swatch.Color.Lightness}</p>

      </button>
  );
};

export default SwatchHSL;
