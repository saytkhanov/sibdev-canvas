<template>
  <div class="container">
    <canvas
      ref="canvas"
      width="400"
      height="400"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      class="canvas"
    ></canvas>
    <div class="controls">
      <div class="input-group">
        <label
          >Радиус окружности:
          <input type="number" v-model.number="radius" min="0" />
        </label>
        <label
          >Координата X квадрата:
          <input type="number" v-model.number="localPosition.x" />
        </label>
      </div>
      <div class="input-group">
        <label
          >Размер стороны квадрата:
          <input type="number" v-model.number="squareSize" min="0" />
        </label>
        <label
          >Координата Y квадрата:
          <input type="number" v-model.number="localPosition.y" />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useCanvas } from "@/hooks/useCanvas";
import { useSquare } from "@/hooks/useSquare";
import { useDraggable } from "@/hooks/useDraggable";
import { drawCircle, drawSquare } from "@/utils/drawingFunctions";
import { LimitFunction, Position } from "@/types/types";

export default defineComponent({
  setup() {
    const { squareSize, radius, localPosition } = useSquare(50, 100);
    const canvas = useCanvas(() => draw());

    const limitFunc: LimitFunction = (newPos: Position): boolean => {
      const dist = Math.hypot(newPos.x - 200, newPos.y - 200);
      return dist + squareSize.value / 2 <= radius.value;
    };

    const { position, handleMouseDown, handleMouseMove, handleMouseUp } =
      useDraggable(limitFunc, localPosition);

    const draw = () => {
      if (!canvas.value) return;
      const ctx = canvas.value.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      drawCircle(ctx, { x: 200, y: 200 }, radius.value, {
        strokeStyle: "red",
        fillStyle: "rgba(255, 0, 0, 0.2)",
        lineWidth: 3,
      });

      drawSquare(ctx, position.value, squareSize.value, {
        strokeStyle: "green",
        fillStyle: "rgba(0, 128, 0, 0.2)",
        lineWidth: 2,
      });
    };

    watch(() => [radius.value, squareSize.value, position.value], draw, {
      deep: true,
    });

    return {
      canvas,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      radius,
      squareSize,
      localPosition,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas {
  border: 2px solid black;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

label {
  margin: 10px 0;
  color: #333;
  display: flex;
  justify-content: space-between;
}

input {
  margin-left: 10px;
  padding: 5px;
}
</style>
