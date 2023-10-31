import { ref, Ref } from "vue";

interface UseSquareReturn {
  squareSize: Ref<number>;
  radius: Ref<number>;
  localPosition: Ref<{ x: number; y: number }>;
}

export function useSquare(
  defaultSize: number,
  defaultRadius: number
): UseSquareReturn {
  const squareSize = ref(defaultSize);
  const radius = ref(defaultRadius);
  const localPosition = ref({
    x: 200 - defaultSize / 2,
    y: 200 - defaultSize / 2,
  });

  return { squareSize, radius, localPosition };
}
