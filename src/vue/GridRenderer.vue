<template>
  <div class="grid-wrapper">
    <div class="line" v-for="line in grid.grid">
      <div
          class="cell"
          v-for="cell in line"
          v-bind:class="{'hide':cell.isHide}"
          v-on:mousedown.left="$emit('reveal',cell)"
          v-on:mousedown.right="$emit('flag',cell)"
      >
        <img src="src/assets/bomb.svg" v-if="cell.hasMine && !cell.isHide" style="width: 24px">
        <p v-if="cell.bombArround > 0 && !cell.hasMine && !cell.isHide"
           :style="{color:getColorBomb(cell.bombArround)}">{{ cell.bombArround }}</p>
        <img style="width: 24px" v-if="cell.isHide && cell.isFlag" src="src/assets/flag_icon.png"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue'
import {Minesweeper} from "../object/Minesweeper";

const props = defineProps({
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
.grid-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .cell {
    width: 24px;
    height: 24px;

    p {
      text-align: center;
      font-size: 22px;
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