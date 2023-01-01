import { useCallback, useMemo } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";
import { BoardInterfaceProps } from "@components/free-board/FreeBoardPiece";
import useClickManagerFn from "@components/free-board/hooks/useClickManagerFn";
import useDragManagerFn from "@components/free-board/hooks/useDragManagerFn";

export default function useEventManagerFn(eventHandlers: BoardInterfaceProps) {
  const clickManagerFn = useClickManagerFn(eventHandlers);
  const dragManagerFn = useDragManagerFn(eventHandlers);
  const pipeline = useMemo(() => {
    return [clickManagerFn, dragManagerFn];
  }, [clickManagerFn, dragManagerFn]);

  return useCallback(
    (event: DraggableEvent, data: DraggableData) => {
      // give event to each manager in the pipeline
      pipeline.forEach((fn) => fn(event, data));
    },
    [pipeline]
  );
}
