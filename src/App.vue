<template>
  <CanvasComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CanvasComponent from "./components/CanvasComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    CanvasComponent,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
