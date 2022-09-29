<template>
  <MinesweeperHeader :player="myPlayer"/>
  <div class="wrapper">
    <transition name="menu">
      <PlayerMenu :player="myPlayer" v-if="!myPlayer.isLog" @joinGame="onJoinGame"/>
    </transition>
    <GridRenderer :grid="grid"
                  @mouseMove="mouseMove"
                  @flag="onFlag"
                  @reveal="onReveal"
                  :playerList="displayPlayerList"
                  :myPlayer="myPlayer"
                  v-if="grid && grid.isRunning"
    />
    <ScoreBoard :players="players" v-if="grid && grid.isRunning"/>

    <div class="win-animation" v-if="myPlayer.isLog && grid && grid.gameIsLose">
      <div class="game-resume">
        <h2>U noob...</h2>
        <div class="best-player-wrapper" v-if="players && players.length>0">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px"
               y="0px"
               viewBox="0 0 246.5 246.5" style="enable-background:new 0 0 246.5 246.5;" xml:space="preserve">
        <g>
          <path d="M204.667,220.542c0-4.142-3.358-7.5-7.5-7.5h-148c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5h148
            c4.142,0,7.5-3.358,7.5-7.5V220.542z"/>
          <path d="M228.776,47.052c-2.861-1.616-6.438-1.21-8.828,1.042l-51.802,48.72l-38.255-48.677c-1.423-1.805-3.594-3.094-5.892-3.094
            c-0.003,0-0.006,0-0.009,0c-2.302,0-4.475,1.297-5.894,3.109L79.839,97.195L28.051,48.438c-2.392-2.251-5.971-2.684-8.829-1.069
            c-2.86,1.615-4.336,4.904-3.643,8.114l28.883,133.643c0.746,3.452,3.8,5.916,7.331,5.916h144.414c3.533,0,6.587-2.473,7.331-5.926
            l28.883-133.937C233.113,51.969,231.637,48.666,228.776,47.052z"/>
          <path d="M108.529,17.179c0,8.117,6.604,14.721,14.721,14.721s14.721-6.604,14.721-14.721S131.367,2.458,123.25,2.458
            S108.529,9.062,108.529,17.179z"/>
          <path d="M29.441,24.181c0-8.117-6.604-14.721-14.721-14.721S0,16.063,0,24.181s6.604,14.721,14.721,14.721
            S29.441,32.298,29.441,24.181z"/>
          <path d="M231.779,9.46c-8.117,0-14.721,6.604-14.721,14.721s6.604,14.721,14.721,14.721S246.5,32.298,246.5,24.181
            S239.896,9.46,231.779,9.46z"/>
        </g>
      </svg>
          <p>{{ players.sort((a, b) => b.score - a.score)[0].name }} -
            {{ players.sort((a, b) => b.score - a.score)[0].score }}</p>
        </div>
        <button class="restart" v-on:click="startGame">Recommencer</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import MinesweeperHeader from "/src/components/MinesweeperHeader.vue"
import PlayerMenu from "/src/vue/PlayerMenu.vue";
import {io, Socket} from "socket.io-client";
import GridRenderer from "../vue/GridRenderer.vue";
import {Cell, Minesweeper} from "../object/Minesweeper";
import {Player} from "../object/Player";
import ScoreBoard from "../vue/ScoreBoard.vue";

let socket: Socket;
let grid = ref<Minesweeper>();

let players = ref<Player[]>([]);
let displayPlayerList = ref<Player[]>([]);
let myPlayer = ref<Player>({name: "", id: "", isLog: false, score: 0, color: '#FFFF', mousePosition: {x: 0, y: 0}});

onBeforeMount(() => {
  const serverAddress = import.meta.env.VITE_SERVER_URL;
  socket = io(serverAddress);
  console.log(serverAddress)
  //socket = io("http://localhost:4242"); // Local dev address
  // Listen first player connection init
  socket.on("joinSuccess", (data: Player) => myPlayer.value = data);
  document.addEventListener('contextmenu', event => event.preventDefault());
})

onBeforeUnmount(() => {
  socket.removeAllListeners();
  socket.close();
})

function startGame() {
  socket.emit("start");
}

function onJoinGame(playerName: string) {
  socket.emit("join", playerName);
}

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
  socket.emit("reveal", {player: myPlayer.value, position: cell.position});
}

onMounted(() => {

  // Listen grid change event
  socket.on("grid", data => {
    grid.value = data;
  });

  // Listen mouse update
  socket.on("playerUpdate", (data: Player[]) => {
    players.value = clone(data);
    displayPlayerList.value = clone(data);
    players.value.forEach(x => {
      if (myPlayer.value && x.name == myPlayer.value?.name) {
        myPlayer.value.mousePosition = x.mousePosition;
      }
    })
    updateDisplayPlayerList(myPlayer.value.name);
  })
});

function clone(toCopy: any[]) {
  let newArray: any[] = [];
  toCopy.forEach(x => newArray.push(x));
  return newArray;
}

function updateDisplayPlayerList(name: string) {
  displayPlayerList.value.forEach((item, index) => {
    if (item.name == name) displayPlayerList.value.splice(index, 1);
  });
}

</script>

<style scoped lang="scss">
.wrapper {
  width: auto;
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin: 8px auto auto;

  .menu-enter-active,
  .menu-leave-active {
    transition: all 400ms ease;
  }

  .menu-leave-to {
    transform: translateY(100px);
    opacity: 0;
  }


  .win-animation {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(45, 45, 45, 0.8);
    animation: explosion 3s ease-in;

    .game-resume {
      animation: explosion-compense 3s ease-in;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h2 {
        font-size: 66px;
        color: var(--primary-text);
        font-family: Jost-Regular;
        margin-bottom: 80px;
      }

      .best-player-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          fill: var(--primary);
          width: 64px;
          margin-right: 24px;
        }

        p {
          font-size: 32px;
          color: var(--primary-text);
          font-family: Jost-Regular;
        }
      }

      button {
        margin-top: 50px;
        width: auto;
        background-color: var(--primary);
        padding: 10px;
        border-radius: 4px;
        border-radius: 12px;
        border: none;

        color: var(--primary-text);
        font-family: Jost-Regular;
        font-size: 27px;
        transition: 100ms;

      }

      button:hover {
        background-color: #b7e166;
      }
    }

  }

}

@keyframes explosion-compense {
  0% {
    opacity: 0;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes explosion {
  0% {
    opacity: 0;
    transform: scale(0);
    box-shadow: 0px 0px 0px 0px white;
    background-color: white;
  }
  25% {
    opacity: 100;
    transform: scale(100);
    box-shadow: 0px 0px 100px 1000px white;
  }
  100% {
    transform: scale(1);
    background-color: rgba(45, 45, 45, 0.8);
    box-shadow: 0px 0px 0px 0px white;
  }
}


</style>