import {
  CircleStyleOptions,
  Position,
  SquareStyleOptions,
} from "@/types/types";

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  center: Position,
  radius: number,
  options: CircleStyleOptions
): void {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = options.strokeStyle;
  ctx.lineWidth = options.lineWidth;
  if (options.fillStyle) {
    ctx.fillStyle = options.fillStyle;
    ctx.fill();
  }
  ctx.stroke();
}

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  position: Position,
  size: number,
  options: SquareStyleOptions
): void {
  ctx.beginPath();
  ctx.rect(position.x - size / 2, position.y - size / 2, size, size);
  ctx.strokeStyle = options.strokeStyle;
  ctx.fillStyle = options.fillStyle;
  ctx.lineWidth = options.lineWidth;
  ctx.fill();
  ctx.stroke();
}
