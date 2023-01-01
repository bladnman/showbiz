import React, { useRef } from "react";
import { Box } from "@mui/material";
import Draggable, { DraggableEvent } from "react-draggable";
import useEventManagerFn from "@components/free-board/hooks/useEventManagerFn";

export type Position = {
  x: number;
  y: number;
};
export type BoardEventData = {
  event: DraggableEvent;
  startPosition: Position;
  endPosition: Position;
  pieceData?: BoardPieceData;
};
export type BoardEventFn = (data: PieceEventData) => void;
export type BoardPieceData = any;
export type BoardEventHandlers = {
  onDragStart?: BoardEventFn;
  onDrag?: BoardEventFn;
  onDragStop?: BoardEventFn;
  onClick?: BoardEventFn;
  onDoubleClick?: BoardEventFn;
  onContextMenu?: BoardEventFn;
};
export type BoardInterfaceProps = BoardEventHandlers & {
  pieceData?: BoardPieceData;
};
export type PieceEventData = BoardEventData & {
  pieceData: BoardPieceData;
};
type PieceProps = {
  children: React.ReactNode;
  position: Position;
  draggable?: boolean;
  resizable?: boolean;
  pieceData?: BoardPieceData;
} & BoardEventHandlers;
export default function FreeBoardPiece(props: PieceProps) {
  const {
    children,
    position = { x: 0, y: 0 },
    onDragStart,
    onDragStop,
    onClick,
    onDoubleClick,
    onContextMenu,
    pieceData,
    draggable = true,
    resizable = true,
  } = props;
  const nodeRef = useRef<Draggable>(null);
  const eventManagerFn = useEventManagerFn({
    onDragStart,
    onDragStop,
    onClick,
    onDoubleClick,
    onContextMenu,
    pieceData,
  });

  return (
    <Draggable
      defaultClassName={"FREE-BOARD-PIECE"}
      ref={nodeRef}
      onStart={eventManagerFn}
      onDrag={eventManagerFn}
      onStop={eventManagerFn}
      defaultPosition={position}
    >
      <Box sx={{ position: "absolute" }}>{children}</Box>
    </Draggable>
  );
}
