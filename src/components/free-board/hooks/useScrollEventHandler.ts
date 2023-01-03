import React, { useCallback } from "react";
import { Position } from "@components/free-board/FreeBoardPiece";
import debounce from "lodash/debounce";

export default function useScrollEventHandler(
  platformRef: React.RefObject<HTMLDivElement>,
  zoom: number,
  setZoom: React.Dispatch<React.SetStateAction<number>>,
  zoomRange: [number, number],
  onBoardScaled?: (scale: number) => void,
  onBoardMoved?: (position: Position) => void
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedReportZoom = useCallback(
    debounce(onBoardScaled ?? (() => null), 500),
    []
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedReportMove = useCallback(
    debounce(onBoardMoved ?? (() => null), 500),
    []
  );

  return useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      // ZOOM
      if (event.ctrlKey) {
        const { deltaY } = event;
        const newScale = deltaY > 0 ? zoom * 0.95 : zoom * 1.05;
        // const newScale = deltaY > 0 ? zoom - 0.01 : zoom + 0.01;
        const cleanScale = ~~(newScale * 1000) / 1000;
        console.log(
          `[🐽](useScrollEventHandler) newScale,cleanScale`,
          newScale,
          cleanScale
        );
        setZoom(Math.min(Math.max(cleanScale, zoomRange[0]), zoomRange[1]));
        debouncedReportZoom(cleanScale);
      }

      // MOVE
      else {
        if (!platformRef.current) return;
        const elem = platformRef.current;

        const top = !elem.style.top ? 0 : parseInt(elem.style.top);
        const left = !elem.style.left ? 0 : parseInt(elem.style.left);

        const position = {
          x: left - event.deltaX,
          y: top - event.deltaY,
        };
        elem.style.left = `${position.x}px`;
        elem.style.top = `${position.y}px`;

        debouncedReportMove(position);
      }
    },
    [
      zoom,
      setZoom,
      zoomRange,
      debouncedReportZoom,
      platformRef,
      debouncedReportMove,
    ]
  );
}
