import * as React from 'react';
import './AddPalette.scss';
import { StoreContext } from '../../Store/context';
import { Actions } from '../../Store/actions';
import { usePaletteNamer, NamerState } from '../../Hooks/usePaletteNamer';


function AddPalette() {
  const [namer, setNamer] = React.useState<NamerState>(usePaletteNamer());
  const [name, setName] = React.useState(namer.name);
  const [, dispatch] = React.useContext(StoreContext);

  console.log(namer.name);


  return (
    <div className="AddPalette">
      <label>Name:</label>
      <input type="text" 
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={(e) => {
        e.stopPropagation();
        dispatch({
          type: Actions.AddPalette,
          payload: {paletteName: name}
        });
        setNamer(namer.next!());
        setName(namer.name);
      }}>
        AddPalette
      </button>
    </div>
  );
}

export default AddPalette;
