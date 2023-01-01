import React, { useCallback } from "react";

export default function useScrollEventHandler(
  platformRef: React.RefObject<HTMLDivElement>,
  zoom: number,
  setZoom: React.Dispatch<React.SetStateAction<number>>,
  zoomRange: [number, number]
) {
  return useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (event.ctrlKey) {
        const { deltaY } = event;
        const newScale = deltaY > 0 ? zoom * 0.9 : zoom * 1.1;
        setZoom(Math.min(Math.max(newScale, zoomRange[0]), zoomRange[1]));
      } else {
        if (!platformRef.current) return;
        const elem = platformRef.current;

        const top = !elem.style.top ? 0 : parseInt(elem.style.top);
        const left = !elem.style.left ? 0 : parseInt(elem.style.left);

        elem.style.top = `${top - event.deltaY}px`;
        elem.style.left = `${left - event.deltaX}px`;
      }
    },
    [platformRef, zoomRange, zoom, setZoom]
  );
}
