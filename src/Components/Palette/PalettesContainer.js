import React from "react";
import './PalettesContainer.scss';
import { StoreContext } from '../../Contexts/Store';
import Palette from './Palette';



//      { state.Palettes.sort((a, b) => {
//      { state.Palettes.sort((a, b) => {
//          if (a.ID < b.ID) {
//            return 1;
//          } else {
//            return -1;
//          }
//        }).map(palette =>
//          <Palette key={palette.ID} 
//            ID={palette.ID}
//          />
//        )
//      }
//          if (a.ID < b.ID) {
//            return 1;
//          } else {
//            return -1;
//          }
//        }).map(palette =>
//          <Palette key={palette.ID} 
//            ID={palette.ID}
//          />
//        )
//      }

const PalettesContainer = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className="PalettesContainer">
      <h2>PalettesContainer</h2>
      {console.log("PalettesContainer")}
      {console.log("--state.Palettes: ")}
      {console.log(state.Palettes)}

      {
        state.Palettes.map(p =>
          <Palette
            key={p.ID}
            ID={p.ID}
          />
        )
      }

    </div>
  );
};

export default PalettesContainer;
