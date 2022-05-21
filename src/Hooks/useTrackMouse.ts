import * as React from 'react';


interface Coordinates {
  X: number,
  Y: number 
};

interface MouseCoords {
  page: Coordinates | null,
  client: Coordinates | null,
  screen: Coordinates | null,
  //layer: Coordinates | null,
  movement: Coordinates | null,
  offset: Coordinates | null,
  x: number | null,
  y: number | null
};


const useTrackMouse = () => {
  const [mousemoveCoords, setMousemoveCoords] 
    = React.useState<MouseCoords>({
      page: {X: 0, Y: 0},
      client: {X: 0, Y: 0},
      screen: {X: 0, Y: 0},
      //layer: {X: 0null, Y: 0null},
      movement: {X: 0, Y: 0},
      offset: {X: 0, Y: 0},
      x: 0,
      y: 0,
    }
  );
  const [clickCoords, setClickCoords] 
    = React.useState<MouseCoords>({
      page: {X: 0, Y: 0},
      client: {X: 0, Y: 0},
      screen: {X: 0, Y: 0},
      //layer: {X: 0null, Y: 0null},
      movement: {X: 0, Y: 0},
      offset: {X: 0, Y: 0},
      x: 0,
      y: 0,
    }
  );
  
  React.useEffect(() => {
    const setFromEvent = (e:MouseEvent) => {
      setMousemoveCoords({
        page: {X:e.pageX, Y:e.pageY },
        client: {X: e.clientX, Y: e.clientY},
        screen: {X: e.screenX, Y: e.screenY},
        //layer: {X: null, Y: null},
        movement: {X: e.movementX, Y: e.movementY},
        offset: {X: e.offsetX, Y: e.offsetY},
        x: e.x,
        y: e.y,
      })
    }
    
    window.addEventListener("mousemove", setFromEvent);
   
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  React.useEffect(() => {
    const setFromClick = (e:MouseEvent) => {
      setClickCoords({
        page: {X:e.pageX, Y:e.pageY },
        client: {X: e.clientX, Y: e.clientY},
        screen: {X: e.screenX, Y: e.screenY},
        //layer: {X: null, Y: null},
        movement: {X: e.movementX, Y: e.movementY},
        offset: {X: e.offsetX, Y: e.offsetY},
        x: e.x,
        y: e.y,
      })
    }

    window.addEventListener("click", setFromClick);

    return () => {
      window.removeEventListener("click", setFromClick);
    };
  }, []);

  return [mousemoveCoords, clickCoords];
};

export default useTrackMouse;
