import React, { useEffect } from "react";
import { Box } from "@mui/material";

type TempProps = {
  elemRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  onWheel?: (event: React.WheelEvent<HTMLDivElement>) => void;
  platformSize: { width: number; height: number };
};
export default function FreeBoardViewport(props: TempProps) {
  const { platformSize, onWheel, elemRef } = props;

  // scroll to center to start things off
  useEffect(() => {
    if (elemRef.current) {
      elemRef.current.scrollLeft = platformSize.width / 2;
      elemRef.current.scrollTop = platformSize.height / 2;
    }
  }, [elemRef, platformSize.height, platformSize.width]);
  return (
    <Box
      ref={elemRef}
      onWheel={onWheel}
      className={"FREE-BOARD-VIEWPORT"}
      width={"100%"}
      height={"100%"}
      sx={{
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        scrollbarWidth: "none",

        boxShadow: "0px 0px 17px 2px #00000050",
      }}
    >
      {props.children}
    </Box>
  );
}
