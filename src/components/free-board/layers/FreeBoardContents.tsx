import React, { MouseEvent } from "react";
import { Box } from "@mui/material";
import CompositePosterTile from "@features/tiles/poster-tile/CompositePosterTile";
import { ShowbizItem } from "@types";
import FreeBoardPiece, {
  PieceEventData,
} from "@components/free-board/FreeBoardPiece";

type TempProps = {
  platformSize: { width: number; height: number };
  shows?: ShowbizItem[] | null;
  tileWidth: number;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
};
export default function FreeBoardContents(props: TempProps) {
  const { platformSize, shows, tileWidth, onClick } = props;
  const handleDragStop = (data: PieceEventData) => {
    console.log(`[🐽](FreeBoardContents) DRAG STOP`, data);
  };
  const handleClick = (data: PieceEventData) => {
    console.log(`[🐽](FreeBoardContents) CLICK`, data);
  };
  const handleDoubleClick = (data: PieceEventData) => {
    console.log(`[🐽](FreeBoardContents) DOUBLE-CLICK`, data);
  };
  return (
    <Box
      className={"FREE-BOARD-CONTENTS"}
      sx={{
        position: "absolute",
        left: `${platformSize.width / 2}px`,
        top: `${platformSize.height / 2}px`,
      }}
    >
      {shows &&
        shows.map((show, i) => {
          /// https://www.wikiwand.com/en/Archimedean_spiral
          /// http://jsfiddle.net/bladnman/qpLbn720/1/
          const centerX = 0;
          const centerY = 0;
          const a = 20;
          const b = 2;
          const thetaAngle = 50 * i;
          const x = centerX + (a + b * thetaAngle) * Math.cos(thetaAngle);
          const y = centerY + (a + b * thetaAngle) * Math.sin(thetaAngle);
          return (
            <FreeBoardPiece
              key={show.id}
              position={{ x, y }}
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
              onDragStop={handleDragStop}
              pieceData={show}
            >
              <CompositePosterTile show={show} width={tileWidth} />
            </FreeBoardPiece>
          );
        })}
    </Box>
  );
}
