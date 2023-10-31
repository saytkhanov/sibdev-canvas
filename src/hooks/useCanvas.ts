import { ref, watch, Ref, onMounted } from "vue";

export function useCanvas(
  drawCallback: () => void
): Ref<HTMLCanvasElement | null> {
  const canvas: Ref<HTMLCanvasElement | null> = ref(null);

  onMounted(() => {
    watch(
      canvas,
      (canvasEl) => {
        if (canvasEl) {
          drawCallback();
        }
      },
      { immediate: true }
    );
  });

  return canvas;
}
