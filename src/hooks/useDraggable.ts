import { Ref, onMounted, onUnmounted } from "vue";
import { Position, LimitFunction, Draggable } from "@/types/types";

export function useDraggable(
  limitFunc: LimitFunction,
  localPosition: Ref<Position>
): Draggable {
  let isDragging = false;
  let startPosition = { x: 0, y: 0 };

  const handleMouseDown = (event: MouseEvent) => {
    isDragging = true;
    startPosition = {
      x: event.clientX - localPosition.value.x,
      y: event.clientY - localPosition.value.y,
    };
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    const newPos = {
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    };

    if (limitFunc(newPos)) {
      localPosition.value.x = newPos.x;
      localPosition.value.y = newPos.y;
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  onMounted(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  onUnmounted(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  });

  return {
    position: localPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
