import * as React from 'react';
import './Palette.scss';
import ActiveSwatch from '../Swatch/ActiveSwatch';
import InactiveSwatches from '../Swatch/InactiveSwatches';
import RemovePalette from '../Controls/RemovePalette';
import { Palette as P } from '../../Store/state';


const Palette = (props: {palette: P}) => {

  return (
    <div className="Palette">
      <p>{props.palette.Name}</p>
      <div className='Swatches'>
      <ActiveSwatch />
      <InactiveSwatches />
      </div>
      <RemovePalette />
    </div>
  );
}

export default Palette;
