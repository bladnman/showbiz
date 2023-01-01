import React from "react";
import { Box } from "@mui/material";
import { graphPaperSx } from "@utils/helpers";

type TempProps = {
  platformSize: { width: number; height: number };
  zoom: number;
  elemRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};
export default function FreeBoardPlatform(props: TempProps) {
  const { platformSize, zoom, elemRef } = props;
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
