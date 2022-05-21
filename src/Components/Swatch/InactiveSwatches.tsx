import * as React from 'react';
import './InactiveSwatches.scss';
import Swatch from './Swatch';
import AddSwatch from '../Controls/AddSwatch';


function InactiveSwatches() {

  return (
    <div className="InactiveSwatches">
      <Swatch /> 
      <Swatch />
      <AddSwatch />
    </div>
  );
}

export default InactiveSwatches;
