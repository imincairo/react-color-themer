import React from "react";
import './SwatchContainer.scss';
import { StoreContext } from '../../Contexts/Store';
import SwatchHSL from './SwatchHSL';


const SwatchContainer = (props) => {
  const [state, dispatch] = React.useContext(StoreContext);


  return (
    <div className="SwatchContainer">
      {
        state.Swatches[props.palette.ID].map(s =>
          <SwatchHSL
            key={s.ID}
            swatch={s}
            palette={props.palette}
          />
        )
      }
    </div>
  );
};

export default SwatchContainer;
