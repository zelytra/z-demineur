<template>
  <div id="grid-wrapper" v-on:mousemove="$emit('mouseMove',$event)">
    <PlayerCursor v-for="player in playerList" :player="player"/>
    <div class="line" v-for="line in grid.grid">
      <div
          class="cell"
          v-for="cell in line"
          v-bind:class="{'hide':cell.isHide}"
          v-on:mousedown.left="$emit('reveal',cell)"
          v-on:mousedown.right="$emit('flag',cell)"
      >
        <img src="src/assets/bomb.svg" v-if="cell.hasMine && !cell.isHide" style="width: 18px">
        <p v-if="cell.bombAround > 0 && !cell.hasMine && !cell.isHide"
           :style="{color:getColorBomb(cell.bombAround)}">{{ cell.bombAround }}</p>
        <img style="width: 24px" v-if="cell.isHide && cell.isFlag" src="src/assets/flag_icon.png"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerCursor from "/src/vue/PlayerCursor.vue"
import {PropType} from 'vue'
import {Minesweeper} from "../object/Minesweeper";
import {Player} from "../object/Player";

const props = defineProps({
  myPlayer: {
    type: Object as PropType<Player>,
    required: true
  },
  playerList: {
    type: Object as PropType<Player[]>,
    required: true
  },
  grid: {
    type: Object as PropType<Minesweeper>,
    required: true
  },
})

function getColorBomb(bombNumber: number) {
  switch (bombNumber) {
    case 1:
      return '#1976D2';
    case 2:
      return '#388E3C';
    case 3:
      return '#D33534';
    case 4:
      return '#8A36A4';
    case 5:
      return '#ab8c0e';
    case 6:
      return '#59A5A1';
  }
}
</script>

<style scoped lang="scss">
#grid-wrapper {

  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0px 0px 4px;
  overflow: hidden;


  .cell {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;

    p {
      text-align: center;
      font-size: 18px;
      font-family: Jost-Medium;
    }
  }

  .line:nth-child(odd) .cell:nth-child(odd), .line:nth-child(even) .cell:nth-child(even) {
    background-color: var(--grid-show-primary);

    &.hide {
      background-color: var(--grid-hide-primary);
    }
  }

  .line:nth-child(even) .cell:nth-child(odd), .line:nth-child(odd) .cell:nth-child(even) {
    background-color: var(--grid-show-secondary);

    &.hide {
      background-color: var(--grid-hide-secondary);
    }
  }

  .cell:hover {
    background-color: #ffd1b4 !important;

    &.hide {
      background-color: #ceee93 !important;
    }
  }
}
</style>