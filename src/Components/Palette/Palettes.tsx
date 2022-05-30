import './Palettes.scss';
import { StoreContext as PaletteContext}
  from "../../Store/Palette/context";
import { useContext, useEffect, useRef } from 'react';
import { ActionTypes } from '../../Store/Palette/actions';
import Palette from './Palette';
import AddPalette from '../Controls/AddPalette';


const Palettes = () => {
  const [paletteState, paletteDispatch, paletteNamer]
    = useContext(PaletteContext);
  const emptyPalettes:boolean
    = paletteState.Palettes.length < 1 ? true : false;

  useEffect(() => {
    console.log("Palettes Init");
    if (!paletteNamer.NewName) {
      console.log("--NewName is null"); 
    }
    else {
      if (emptyPalettes) {
        console.log("--NewName and Palettes.length < 1");
        console.log("----calling AddPalette and NameFromAdd");
        paletteDispatch({
          type: ActionTypes.AddPalette,
          payload: { paletteName:paletteNamer.NewName }
        });
        paletteNamer.NameFromAdd(paletteNamer.NewName);
      } else {
        console.log("--Palettes.length >= 1");
      }
    }
  },[emptyPalettes]);

  return (
    <div className="Palettes">
      <h2>Palettes</h2>
      { paletteState.Palettes.map(p => 
        <Palette
          key={p.Name.Name}
          palette={p}
        />
      )}
      <AddPalette />
    </div>
  );
};

export default Palettes;
