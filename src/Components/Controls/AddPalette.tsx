import { useContext } from 'react';
import { ActionTypes } from '../../Store/Palette/actions';
import { StoreContext } from '../../Store/Palette/context';
import './AddPalette.scss';

const AddPalette = () => {
  const [ , paletteDispatch, paletteNamer ]
    = useContext(StoreContext);

  return (
    <div className='AddPalette'>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (paletteNamer.NewName) {
            paletteDispatch({
              type: ActionTypes.AddPalette,
              payload: { paletteName: paletteNamer.NewName }
            });
            paletteNamer.NameFromAdd(paletteNamer.NewName);
          }
        }}
      >
        AddPalette
      </button>
    </div>
  );
};

export default AddPalette;
