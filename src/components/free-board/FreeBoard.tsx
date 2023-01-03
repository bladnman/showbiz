import React, { useRef, useState } from "react";
import FreeBoardContents from "@components/free-board/layers/FreeBoardContents";
import FreeBoardPlatform from "@components/free-board/layers/FreeBoardPlatform";
import FreeBoardViewport from "@components/free-board/layers/FreeBoardViewport";
import useScrollEventHandler from "@components/free-board/hooks/useScrollEventHandler";
import {
  BoardEventHandlers,
  Position,
} from "@components/free-board/FreeBoardPiece";
import { BoardConfig } from "@types";

type FreeBoardProps = {
  board?: BoardConfig;
  zoomRange?: [number, number];
  children?: React.ReactNode[] | React.ReactNode;
};
export default function FreeBoard(props: FreeBoardProps & BoardEventHandlers) {
  const { children, zoomRange = [0.4, 3] } = props;
  const {
    board,
    onDragStart,
    onDragStop,
    onClick,
    onDoubleClick,
    onContextMenu,
    onBoardMoved,
    onBoardScaled,
  } = props;
  const hugeSize = 10000000;
  const platformRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(board?.scale || 1);

  const handleBoardMoved = (position: Position) => {
    board && (board.position = position);
    onBoardMoved && onBoardMoved(position);
  };
  const handleBoardScaled = (scale: number) => {
    board && (board.scale = scale);
    onBoardScaled && onBoardScaled(scale);
  };

  const handleWheel = useScrollEventHandler(
    platformRef,
    zoom,
    setZoom,
    zoomRange,
    handleBoardScaled,
    handleBoardMoved
  );
  const platformSize = { width: hugeSize, height: hugeSize };

  return (
    <FreeBoardViewport
      elemRef={viewportRef}
      onWheel={handleWheel}
      platformSize={platformSize}
    >
      <FreeBoardPlatform
        elemRef={platformRef}
        platformSize={platformSize}
        zoom={zoom}
        initialPosition={board?.position ?? { x: 0, y: 0 }}
      >
        <FreeBoardContents
          platformSize={platformSize}
          onDragStart={onDragStart}
          onDragStop={onDragStop}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onContextMenu={onContextMenu}
        >
          {children}
        </FreeBoardContents>
      </FreeBoardPlatform>
    </FreeBoardViewport>
  );
}
