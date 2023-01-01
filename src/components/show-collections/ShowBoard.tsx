import React, { MouseEvent } from "react";
import NotFoundTile from "../tiles/NotFoundTile";
import { ShowbizItem } from "@types";
import { Box } from "@mui/material";
import FreeBoard from "@components/free-board/FreeBoard";

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
      <FreeBoard shows={shows} onClick={onClick} tileWidth={175} />
    </Box>
  );
}
