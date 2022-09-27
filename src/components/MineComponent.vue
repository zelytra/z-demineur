<template>
  <MinesweeperHeader :player="myPlayer"/>
  <div class="wrapper">
    <GridRenderer :grid="grid" @mouseMove="mouseMove" @flag="onFlag" @reveal="onReveal" :playerList="displayPlayerList"
                  :myPlayer="myPlayer"/>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import MinesweeperHeader from "/src/components/MinesweeperHeader.vue"
import {io, Socket} from "socket.io-client";
import GridRenderer from "../vue/GridRenderer.vue";
import {Cell, Minesweeper} from "../object/Minesweeper";
import {Player} from "../object/Player";

let socket: Socket;
let grid = ref<Minesweeper>({});

let players = ref<Player[]>([]);
let displayPlayerList = ref<Player[]>([]);
let myPlayer = ref<Player>({name: "", mousePosition: {x: 0, y: 0}});

onBeforeMount(() => {
  socket = io("http://localhost:4242");
  // Listen first player connection init
  socket.on("joinSuccess", (data: Player) => myPlayer.value = data);
  document.addEventListener('contextmenu', event => event.preventDefault());
})

onBeforeUnmount(() => {
  socket.removeAllListeners();
  socket.close();
})

function mouseMove(event: any) {
  if (!myPlayer.value) return;
  let rect = document.getElementById("grid-wrapper")!.getBoundingClientRect();
  myPlayer.value.mousePosition.x = event.pageX - rect.left;
  myPlayer.value.mousePosition.y = event.pageY - rect.top;
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
    displayPlayerList.value = data;
    players.value.forEach(x => {
      if (myPlayer.value && x.name == myPlayer.value?.name) {
        myPlayer.value.mousePosition = x.mousePosition;
      }
    })
    updateDisplayPlayerList(myPlayer.value.name);
  })
});

function updateDisplayPlayerList(name: string) {
  displayPlayerList.value.forEach((item, index) => {
    if (item.name === name) displayPlayerList.value.splice(index, 1);
  });
}

</script>

<style scoped lang="scss">
.wrapper {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 8px auto auto;
}

</style>