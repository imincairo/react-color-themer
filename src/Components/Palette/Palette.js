import React from "react";
import './Palette.scss';
import { StoreContext } from '../../Contexts/Store';


const Palette = (props) => {
  const [state, dispatch] = React.useContext(StoreContext);
  const styles = {
    palette:{
      border: props.ID === state.ActivePalette.ID ? 
        "4px solid red" : null
    }
  };

  return (
    <div className="Palette"
      onClick={ ()=> dispatch({
        type: 'setActivePalette',
        paletteID: props.ID
        })
      }
      style={styles.palette}
    >
      <h3>Palette</h3>
      <p>ID: { props.ID.slice(0,6) }</p>
    </div>
  );
};

export default Palette;
