<template>
  <MineComponent/>
</template>

<script setup lang="ts">
import MineComponent from "./components/MineComponent.vue";
import {onMounted} from "vue";

onMounted(() => {
  document.body.classList.toggle("dark-theme");
})
</script>

<style scoped lang="scss">
#app {
  overflow: hidden;
}
</style>
