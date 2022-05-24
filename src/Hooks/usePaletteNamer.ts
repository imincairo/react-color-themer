import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { SetStateAction } from 'react';

const NAMES: Array<string> = ['Primary', 'Secondary', 'Surface',
  'Background', 'Confirm', 'Cancel', 'Error colors', 'Type and Icon'];

export interface Ret {
  value: string;
  callback: React.Dispatch<SetStateAction<string>>;
}

export const usePaletteNamer = (newName:string):Ret => {
  const [names, setNames] = useState(NAMES);
  const [name, setName] = useState(names[0]);
  const [fromAddPalette, setFromAddPalette] = useState(newName);

  //const toNamer = useCallback() => setFromAddPalette();


  useEffect(() => {
    // console.log('usePaletteNamer');
    // console.log(name, fromAddPalette);
    if (names.length < 1 ) {
      setName('no more sugestions');
    }
    //console.log("if", newName !in names );
    if (newName !in names) {
      setName(names[0]);
    } else {
      //console.log('names', names);

     // for (let i of names) {console.log(i === fromAddPalette)}
      const newnames = names.filter(n => n !== fromAddPalette);
      //console.log(newnames);
      setNames(newnames);
      
      //console.log('names', names);
      if (newnames.length < 1) {
        setName('no more sugestions');
      } else {
        setName(newnames[0]);
      }
    }
  },[fromAddPalette]);
  return {value:name, callback: setFromAddPalette};
};
