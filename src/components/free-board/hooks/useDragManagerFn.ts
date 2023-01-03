import { useCallback, useRef, useState } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";
import {
  BoardInterfaceProps,
  Position,
} from "@components/free-board/FreeBoardPiece";
import getDraggableEventType from "@components/free-board/utils/getDraggableEventType";

export default function useDragManagerFn(eventHandlers: BoardInterfaceProps) {
  const { onDragStart, onDragStop, pieceData } = eventHandlers;
  const [moveStartPosition, setMoveStartPosition] = useState<Position | null>(
    null
  );
  const lastMove = useRef<number>(0);

  /*  E V E N T   H A N D L E R  */
  return useCallback(
    (event: DraggableEvent, data: DraggableData) => {
      // bail - must have a callback
      if (!onDragStop && !onDragStart) return;

      const { isMove, isRelease } = getDraggableEventType(event);

      // DRAG START
      if (!moveStartPosition && isMove) {
        const currentPosition = { x: data.x, y: data.y };
        // update pieceData if it has a startPosition
        if (pieceData.startPosition) {
          pieceData.startPosition = currentPosition;
        }
        setMoveStartPosition(currentPosition);
        onDragStart &&
          onDragStart({
            event,
            pieceData,
            startPosition: currentPosition,
            endPosition: currentPosition,
          });
      }

      // DRAG END
      else if (moveStartPosition && isRelease) {
        const currentPosition = { x: data.x, y: data.y };

        // update pieceData if it has a position
        if (pieceData.position) {
          pieceData.position = currentPosition;
        }

        setMoveStartPosition(null);
        onDragStop &&
          onDragStop({
            event,
            pieceData,
            startPosition: moveStartPosition,
            endPosition: currentPosition,
          });
      }

      //
      // TRACK interactions
      if (isMove) {
        lastMove.current = performance.now();
      }
    },
    [onDragStop, onDragStart, moveStartPosition, pieceData]
  );
}
