import React, { MouseEvent } from "react";
import NotFoundTile from "../tiles/NotFoundTile";
import { ShowbizItem } from "@types";
import { Box } from "@mui/material";
import FreeBoard from "@components/free-board/FreeBoard";
import CompositePosterTile from "@/features/tiles/poster-tile/CompositePosterTile";
import { PieceEventData } from "@components/free-board/FreeBoardPiece";

export default function ShowBoard({
  shows,
  onClick,
  columns,
  gridWidth,
  maxPosterWidth,
}: {
  shows?: ShowbizItem[] | null;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
  columns?: number;
  gridWidth?: number;
  maxPosterWidth?: number;
}) {
  const handleDragStop = (data: PieceEventData) => {
    console.log(`[🐽](ShowBoard) DRAG STOP`, data);
  };
  const handleClick = (data: PieceEventData) => {
    console.log(`[🐽](ShowBoard) CLICK`, data);
    // onClick && onClick(data.show);
  };
  const handleDoubleClick = (data: PieceEventData) => {
    console.log(`[🐽](ShowBoard) DOUBLE-CLICK`, data);
  };
  if (!shows || !shows.length) return <NotFoundTile />;
  return (
    <Box
      className={"BOARD-HOLDER"}
      // width={"100%"}
      // height={"100%"}
      width={"1200px"}
      height={"900px"}
      mt={10}
      ml={10}
      padding={5}
      sx={{
        position: "relative",
        border: "3px solid #ffffff11",
        backgroundColor: "#ffffff11",
        boxSizing: "border-box",
        boxShadow: "inset 0 0 5px #00000050",
      }}
    >
      <FreeBoard
        onDragStop={handleDragStop}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {shows.map((show, index) => (
          <CompositePosterTile key={index} show={show} width={175} />
        ))}
      </FreeBoard>
    </Box>
  );
}
