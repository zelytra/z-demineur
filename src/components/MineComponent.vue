<template>
  <div class="wrapper">
    <GridRenderer :grid="grid" @flag="onFlag" @reveal="onReveal"/>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import {io, Socket} from "socket.io-client";
import GridRenderer from "../vue/GridRenderer.vue";
import {Cell, Minesweeper} from "../object/Minesweeper";

let socket: Socket;
let grid = ref<Minesweeper>({});

onBeforeMount(() => {
  socket = io("http://localhost:4242");
  document.addEventListener('contextmenu', event => event.preventDefault());
})

function onFlag(cell: Cell) {
  socket.emit("flag", cell.position);
}

function onReveal(cell: Cell) {
  socket.emit("reveal", cell.position);
}

onMounted(() => {
  window.addEventListener('keydown', keyPressEvent);
  socket.on("grid", data => {
    grid.value = data;
  });
});

function keyPressEvent(event: any) {

}

</script>

<style scoped lang="scss">

</style>