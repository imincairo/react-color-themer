import * as React from 'react';
import './AddPalette.scss';
import { StoreContext } from '../../Store/context';
import { Actions } from '../../Store/actions';


function AddPalette() {
  const [name, setName] = React.useState('enter name');
  const [, dispatch] = React.useContext(StoreContext);



  return (
    <div className="AddPalette">
      <label>Name:</label>
      <input type="text" 
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={() => dispatch({
        type: Actions.AddPalette,
        payload: {paletteName: name}
      })}
      >
        AddPalette
      </button>
    </div>
  );
}

export default AddPalette;
