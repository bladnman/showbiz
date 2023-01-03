import React from "react";
import NotFoundTile from "../tiles/NotFoundTile";
import { BoardConfig } from "@types";
import { Box } from "@mui/material";
import FreeBoard from "@components/free-board/FreeBoard";
import FreeBoardPiece, {
  PieceEventData,
  Position,
} from "@components/free-board/FreeBoardPiece";
import BoardTile from "@components/tiles/BoardTile";
import updateBoard from "@utils/board-utils/updateBoard";

export default function ShowBoard({ board }: { board: BoardConfig }) {
  const handleDragStop = (data: PieceEventData) => {
    updateBoard(board).catch();
  };
  const handleClick = (data: PieceEventData) => {
    console.log(`[🐽](ShowBoard) CLICK`, data);
    // onClick && onClick(data.show);
  };
  const handleDoubleClick = (data: PieceEventData) => {
    console.log(`[🐽](ShowBoard) DOUBLE-CLICK`, data);
  };
  const handleBoardMoved = (position: Position) => {
    console.log(`[🐽](ShowBoard) BOARD MOVED`, board, position);
    updateBoard(board).catch();
  };
  const handleBoardScaled = (scale: number) => {
    console.log(`[🐽](ShowBoard) BOARD ZOOMED`, board);
    updateBoard(board).catch();
  };

  // no items
  if (!board.items.length) return <NotFoundTile />;

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
        board={board}
        onBoardMoved={handleBoardMoved}
        onBoardScaled={handleBoardScaled}
      >
        {board.items.map((boardItem, index) => (
          <FreeBoardPiece
            key={index}
            position={boardItem.position}
            pieceData={boardItem}
            onDragStop={handleDragStop}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
          >
            <BoardTile boardItem={boardItem} />
          </FreeBoardPiece>
        ))}
      </FreeBoard>
    </Box>
  );
}
