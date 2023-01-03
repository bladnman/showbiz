import { useCallback, useRef } from "react";
import { useTimeout } from "@components/free-board/hooks/useTimeout";
import { DraggableData, DraggableEvent } from "react-draggable";
import getDraggableEventType from "../utils/getDraggableEventType";
import { BoardInterfaceProps } from "@components/free-board/FreeBoardPiece";

const doubleClickDelayMs = 230;
export default function useClickManagerFn(eventHandlers: BoardInterfaceProps) {
  const { onClick, onDoubleClick, pieceData } = eventHandlers;
  const isTrackingPress = useRef<boolean>(false);
  const singleClickTimeout = useTimeout();

  /*  E V E N T   H A N D L E R  */
  return useCallback(
    (event: DraggableEvent, data: DraggableData) => {
      // bail - must have a callback
      if (!onClick && !onDoubleClick) return;

      const { isPressStart, isRelease } = getDraggableEventType(event);

      // cancel if not a press or release
      if (!isPressStart && !isRelease) {
        isTrackingPress.current = false;
        return;
      }

      const currentPosition = { x: data.x, y: data.y };

      // PRESS
      if (isPressStart) {
        isTrackingPress.current = true;
      }

      // RELEASE
      else if (isRelease && isTrackingPress.current) {
        // DOUBLE CLICK
        if (singleClickTimeout.isRunning) {
          singleClickTimeout.cancel();
          onDoubleClick &&
            onDoubleClick({
              event,
              pieceData,
              startPosition: currentPosition,
              endPosition: currentPosition,
            });
        }

        // SINGLE CLICK
        else {
          singleClickTimeout.start(() => {
            onClick &&
              onClick({
                event,
                pieceData,
                startPosition: currentPosition,
                endPosition: currentPosition,
              });
          }, doubleClickDelayMs);
        }
      }
    },
    [onClick, onDoubleClick, singleClickTimeout, pieceData]
  );
}
