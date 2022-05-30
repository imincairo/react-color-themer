import { useEffect, useRef } from "react";

const useAfterFirstRunEffect = (func:any, deps:any) => {
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
    } else {
      func();
    }
  }, deps);
};

export default useAfterFirstRunEffect;
