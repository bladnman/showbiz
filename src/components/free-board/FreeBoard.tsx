import React, { useRef, useState } from "react";
import FreeBoardContents from "@components/free-board/layers/FreeBoardContents";
import FreeBoardPlatform from "@components/free-board/layers/FreeBoardPlatform";
import FreeBoardViewport from "@components/free-board/layers/FreeBoardViewport";
import useScrollEventHandler from "@components/free-board/hooks/useScrollEventHandler";
import { BoardEventHandlers } from "@components/free-board/FreeBoardPiece";

type FreeBoardProps = {
  zoomRange?: [number, number];
  children?: React.ReactNode[] | React.ReactNode;
};
export default function FreeBoard(props: FreeBoardProps & BoardEventHandlers) {
  const { children, zoomRange = [0.5, 3] } = props;
  const { onDragStart, onDragStop, onClick, onDoubleClick, onContextMenu } =
    props;
  const hugeSize = 10000000;
  const platformRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const handleWheel = useScrollEventHandler(
    platformRef,
    zoom,
    setZoom,
    zoomRange
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
