import * as React from 'react';
import './AddPalette.scss';
import { StoreContext } from '../../Store/context';
import { Actions } from '../../Store/actions';
import { usePaletteNamer, Ret } from '../../Hooks/usePaletteNamer';


function AddPalette() {
  const {value:suggestedName, callback:setToNamer}:Ret = usePaletteNamer('');
  const [name, setName] = React.useState(suggestedName);//'Primary');

  const [, dispatch] = React.useContext(StoreContext);

  React.useEffect(() => {
    setName(suggestedName);
  },[suggestedName]);

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
        setToNamer(name);
      }}>
        AddPalette
      </button>
    </div>
  );
}

export default AddPalette;
