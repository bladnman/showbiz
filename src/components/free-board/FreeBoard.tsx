import React, { MouseEvent, useRef, useState } from "react";
import { ShowbizItem } from "@types";
import FreeBoardContents from "@components/free-board/layers/FreeBoardContents";
import FreeBoardPlatform from "@components/free-board/layers/FreeBoardPlatform";
import FreeBoardViewport from "@components/free-board/layers/FreeBoardViewport";
import useScrollEventHandler from "@components/free-board/hooks/useScrollEventHandler";

type TempProps = {
  shows?: ShowbizItem[] | null;
  tileWidth: number;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
};

type FreeBoardProps = {
  zoomRange?: [number, number];
};
export default function FreeBoard(props: FreeBoardProps & TempProps) {
  const { shows, tileWidth, onClick, zoomRange = [0.5, 3] } = props;
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
          tileWidth={tileWidth}
          shows={shows}
          onClick={onClick}
        />
      </FreeBoardPlatform>
    </FreeBoardViewport>
  );
}
