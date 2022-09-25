<template>

</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import {io, Socket} from "socket.io-client";

let socket: Socket;

onBeforeMount(() => {
  socket = io("http://localhost:4242");
  socket.emit("START");
})

</script>

<style scoped lang="scss">

</style>