import { Ref } from "vue";

export interface Position {
  x: number;
  y: number;
}

export type LimitFunction = (newPos: Position) => boolean;

export interface Draggable {
  position: Ref<Position>;
  handleMouseDown: (event: MouseEvent) => void;
  handleMouseMove: (event: MouseEvent) => void;
  handleMouseUp: () => void;
}

export interface CircleStyleOptions {
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
}

export interface SquareStyleOptions {
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
}
