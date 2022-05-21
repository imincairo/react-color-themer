import * as React from 'react';
import './Generate.scss';


function Generate() {

  return (
    <div className="Generate">
      <label>Generate:</label>
      <select>
        <option>Shades</option>
        <option>Tints</option>
        <option>Tones</option>
        <option>Complement</option>
        <option>SplitComplements</option>
        <option>Analogous</option>
        <option>Triadic</option>
        <option>Tetradic</option>
        <option>Square</option>
        <option>Monochromatics</option>
      </select>
    </div>
  );
}

export default Generate;
