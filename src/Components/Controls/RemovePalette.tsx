import * as React from 'react';
import './RemovePalette.scss';
import { StoreContext } from '../../Store/context';
import { Actions } from '../../Store/actions';


function RemovePalette() {
  const [state, dispatch] = React.useContext(StoreContext);

  return (
    <div className="RemovePalette">
      <button
        onClick={() => dispatch({
          type: Actions.RemovePalette,
          payload: {paletteName: state.ActivePalette}
        })}
      >
        RemovePalette
      </button>
    </div>
  );
}

export default RemovePalette;
