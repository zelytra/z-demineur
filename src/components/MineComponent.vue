<template>
  <div class="wrapper" v-on:mousemove="mouseMove">
    <GridRenderer :grid="grid" @flag="onFlag" @reveal="onReveal"/>
    <!--<PlayerCursor v-for="player in players" :player="player"/>-->
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import {io, Socket} from "socket.io-client";
import GridRenderer from "../vue/GridRenderer.vue";
import {Cell, Minesweeper} from "../object/Minesweeper";
import {Player} from "../object/Player";

let socket: Socket;
let grid = ref<Minesweeper>({});

let players = ref<Player[]>([]);
let myPlayer = ref<Player>();

onBeforeMount(() => {
  socket = io("http://zelytra.fr:4242");
  // Listen first player connection init
  socket.on("joinSucess", (data: Player) => myPlayer.value = data);
  document.addEventListener('contextmenu', event => event.preventDefault());
})

function mouseMove(event: any) {
  if (!myPlayer.value) return;
  myPlayer.value.mousePosition.x = event.pageX;
  myPlayer.value.mousePosition.y = event.pageY;
  socket.emit("playerUpdate", myPlayer.value)
}

function onFlag(cell: Cell) {
  socket.emit("flag", cell.position);
}

function onReveal(cell: Cell) {
  socket.emit("reveal", cell.position);
}

onMounted(() => {

  // Listen grid change event
  socket.on("grid", data => {
    grid.value = data;
  });

  // Listen mouse update
  socket.on("playerUpdate", (data: Player[]) => {
    players.value = data;
    players.value.forEach(x => {
      if (myPlayer.value && x.name == myPlayer.value?.name) {
        myPlayer.value.mousePosition = x.mousePosition
      }
    })
  })
});

</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: auto;
  overflow: hidden;
}

</style>