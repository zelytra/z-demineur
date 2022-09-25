<template>
  <div class="wrapper">
    <div class="box" :style="{top: position.y+'px',left: position.x+'px'}"/>
  </div>
</template>

<script setup lang="ts">

import {onBeforeMount, onMounted, ref} from "vue";
import {io, Socket} from "socket.io-client";


let position = ref({
  x: 0,
  y: 0
})

let socket: Socket;

onBeforeMount(() => {
  socket = io("http://localhost:3000");
})

onMounted(() => {
  window.addEventListener('keydown', keyPressEvent);
  socket.on("move", data => {
    position.value = data;
  })
});

function keyPressEvent(event: any) {
  const value = 10;
  switch (event.key) {
    case 'z': {
      position.value.y -= value;
      break;
    }
    case 's': {
      position.value.y += value;
      break;
    }
    case 'd': {
      position.value.x += value;
      break;
    }
    case 'q': {
      position.value.x -= value;
      break;
    }
  }
  //SocketIo.emit("move", position)
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  width: 50%;
  height: 50%;
  margin: auto;
  border: solid red 1px;

  .box {
    position: absolute;
    background-color: white;
    width: 24px;
    height: 24px;
  }
}
</style>