import { useState, useLayoutEffect } from "react";

export const useWindowSize = (): Size => {
  const [size, setSize] = useState([0, 0]); // w x h

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return {
    width: size[0],
    height: size[1],
  };
};
