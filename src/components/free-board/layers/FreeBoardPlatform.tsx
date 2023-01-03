import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { graphPaperSx } from "@utils/helpers";

type TempProps = {
  platformSize: { width: number; height: number };
  zoom: number;
  elemRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  initialPosition: { x: number; y: number };
};
export default function FreeBoardPlatform(props: TempProps) {
  const { platformSize, zoom, elemRef, initialPosition } = props;

  // reposition to start things off
  useEffect(() => {
    const elem = elemRef.current;
    if (!elem) return;
    elem.style.left = `${initialPosition.x}px`;
    elem.style.top = `${initialPosition.y}px`;
  }, [elemRef, initialPosition.x, initialPosition.y]);

  return (
    <Box
      ref={elemRef}
      className={"FREE-BOARD-PLATFORM"}
      sx={{
        position: "absolute",
        width: `${platformSize.width}px`,
        height: `${platformSize.height}px`,
        overflow: "visible",

        ...graphPaperSx(),
        transform: `scale(${zoom})`,
        transformOrigin: "center center",
      }}
    >
      {props.children}
    </Box>
  );
}
