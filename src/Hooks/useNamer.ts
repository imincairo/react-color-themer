import { Dispatch, SetStateAction, useState, useEffect, useReducer } from 'react';

export interface INameMap {
  Name: string;
  Index: number;
};

export interface INamerReturn {
   NewName: INameMap | null;
   NameFromAdd: Dispatch<SetStateAction<INameMap | null>>;
   NameFromRemove: Dispatch<SetStateAction<INameMap | null>>;
};


type Actions =
  {type: 'fromAdd', payload:INameMap} |
  {type: 'fromRemove', payload:INameMap};

export interface IState {
  names:INameMap[];
  name:INameMap | null;
  // nameFromAdd:INameMap | null;
  // nameFromRemove:INameMap | null;
};

const inititalState:IState = {
  names: [],
  name: null,
  // nameFromAdd: null,
  // nameFromRemove: null,
};

const reducer = (state:IState, action:Actions):IState => {
  switch (action.type) {
    case 'fromAdd':
      console.log('fromAdd');
      let name:INameMap | null;
      let names:INameMap[];
      if (!state.names.find(n => n.Name === action.payload.Name)) {
        name = state.names[0];
        names = state.names;
      }
      else {
        names = state.names.filter(n => n.Name !== action.payload.Name);
        if (names.length < 1) {
          name = null;
        } else {
          name = names[0];
        }
      }
      console.log(name, names);
      return {
        name:name,
        names:names
      };
    case 'fromRemove':
      console.log('fromRemove');
      return state;

    default:
      throw new Error();
  }
}


export const useNamer = (Names:string[] = []):INamerReturn => {
  const [state, dispatch] = useReducer(reduhttps://www.google.com/search?q=Zotac%20GT%20710cer, inititalState);
  // const [names, setNames]
  //   = useState(Names.map((n,i):INameMap => ({ Name:n, Index:i })));
  state.names = Names.map((n,i):INameMap => ({ Name:n, Index:i }));
  // const [name, setName]
  //   = useState<INameMap | null>(names[0]);
  state.name = state.names[0];
  const [nameFromAdd, setNameFromAdd]
    = useState<INameMap | null>(null);
  const [nameFromRemove, setNameFromRemove]
    = useState<INameMap | null>(null);


  //const sortNames = () => {
  //  console.log("sortNames");
  //  setNames(names.sort());
  //  //setName(names[0]);
  //};

  useEffect(() => {
    console.log("Namer Init");
  },[]);

  useEffect(() => {
    if (nameFromRemove) {
      console.log("nameFromRemove");
      console.log("-- " , nameFromRemove);
      dispatch({type: 'fromRemove', payload: nameFromRemove});
      // if (!names.find(n => n === nameFromRemove)) {
      //   if (nameFromRemove) {
      //   setNames(n => [...n, nameFromRemove]);
      //   }
      //   setNameFromAdd(null);// reset so a change ergisters on next add
      // }
    }
  },[nameFromRemove]);//, names]);

  useEffect(() => {
    if (nameFromAdd) {
      console.log("nameFromAdd");
      console.log("-- ", nameFromAdd);
      dispatch({type: 'fromAdd', payload: nameFromAdd});
      // if (!names.find(n => n.Name === nameFromAdd.Name)) {
      //   setName(names[0]);
      // } else {
      //   const newNames = names.filter(n => n.Name !== nameFromAdd.Name);
      //   setNames(newNames);
      //   if (newNames.length < 1) {
      //     setName(null);
      //   } else {
      //     setName(newNames[0]);
      //   }
      // }
    }
  },[nameFromAdd]);//, names]);

  // useEffect(() => {
  //   console.log("names");
  //   setNames(names.sort());
  //   setName(names[0]);
  // },[names]);

  return {
    NewName: state.name,
    NameFromAdd: setNameFromAdd,
    NameFromRemove: setNameFromRemove
  };
};
