import { Dispatch, SetStateAction, useState, useEffect } from 'react';

export interface INameMap {
  Name: string;
  Index: number;
}

export interface INamerReturn {
   NewName: INameMap | null;
   NameFromAdd: Dispatch<SetStateAction<INameMap | null>>;
   NameFromRemove: Dispatch<SetStateAction<INameMap | null>>;
}


export const useNamer = (Names:string[] = []):INamerReturn => {
  const [names, setNames]
    = useState(Names.map((n,i):INameMap => ({ Name:n, Index:i })));
  const [name, setName]
    = useState<INameMap | null>(names[0]);
  const [nameFromAdd, setNameFromAdd]
    = useState<INameMap | null>(null);
  const [nameFromRemove, setNameFromRemove]
    = useState<INameMap | null>(null);


  const sortNames = () => {
    console.log("sortNames");
    setNames(names.sort());
    //setName(names[0]);
  };

  useEffect(() => {
    console.log("Namer Init");
  },[]);

  useEffect(() => {
    if (nameFromRemove) {
      console.log("nameFromRemove");
      console.log("-- " , nameFromRemove);
      if (!names.find(n => n === nameFromRemove)) {
        if (nameFromRemove) {
        setNames(n => [...n, nameFromRemove]);
        }
        setNameFromAdd(null);// reset so a change ergisters on next add
      }
    }
  },[nameFromRemove, names]);

  useEffect(() => {
    if (nameFromAdd) {
      console.log("nameFromAdd");
      console.log("-- ", nameFromAdd);
      if (!names.find(n => n.Name === nameFromAdd.Name)) {
        setName(names[0]);
      } else {
        // skip newNames with names in dep??
        const newNames = names.filter(n => n.Name !== nameFromAdd.Name);
        setNames(newNames);
        //console.log(newNames);
        if (newNames.length < 1) {
          setName(null);
        } else {
          setName(newNames[0]);
        }
      }
    }
  },[nameFromAdd]);//, names]);

  // useEffect(() => {
  //   console.log("names");
  //   setNames(names.sort());
  //   setName(names[0]);
  // },[names]);

  return {
    NewName: name,
    NameFromAdd: setNameFromAdd,
    NameFromRemove: setNameFromRemove
  };
};
