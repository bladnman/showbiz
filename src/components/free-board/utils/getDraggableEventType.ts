import { DraggableEvent } from "react-draggable";

export default function getDraggableEventType(event: DraggableEvent) {
  return {
    isPressStart: ["mousedown", "touchstart"].includes(event.type),
    isRelease: ["mouseup", "touchend"].includes(event.type),
    isMove: ["mousemove", "touchmove"].includes(event.type),
  };
}
