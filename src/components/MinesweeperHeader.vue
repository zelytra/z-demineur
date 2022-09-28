<template>
  <div class="wrapper-header">
    <div class="app-name">
      <h1>Z-Demineur</h1>
      <button class="restart" v-on:click="$emit('restart')">Recommencer</button>
    </div>
    <h2>#4269</h2>
    <div class="profile-wrapper">
      <p>{{ player.name }}</p>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           x="0px" y="0px"
           viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve">
<g>
	<g>
		<path d="M229.5,0C102.53,0,0,102.845,0,229.5C0,356.301,102.719,459,229.5,459C356.851,459,459,355.815,459,229.5
			C459,102.547,356.079,0,229.5,0z M347.601,364.67C314.887,393.338,273.4,409,229.5,409c-43.892,0-85.372-15.657-118.083-44.314
			c-4.425-3.876-6.425-9.834-5.245-15.597c11.3-55.195,46.457-98.725,91.209-113.047C174.028,222.218,158,193.817,158,161
			c0-46.392,32.012-84,71.5-84c39.488,0,71.5,37.608,71.5,84c0,32.812-16.023,61.209-39.369,75.035
			c44.751,14.319,79.909,57.848,91.213,113.038C354.023,354.828,352.019,360.798,347.601,364.67z"/>
	</g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
        <g>
</g>
</svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Player} from "../object/Player";

defineProps({
  player: {
    type: Object as PropType<Player>,
    required: true
  },
})
</script>

<style scoped lang="scss">
.wrapper-header {
  width: 98%;
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;

  .app-name {
    display: flex;
    align-items: center;

    button {
      margin-left: 8px;
      margin-top: 2px;
      width: auto;
      background-color: var(--primary);
      padding: 2px;
      height: 36px;
      border-radius: 12px;
      border-radius: 12px;
      border: none;

      color: var(--primary-text);
      font-family: Jost-Regular;
      font-size: 16px;
      transition: 100ms;

    }

    button:hover {
      background-color: #b7e166;
    }
  }


  h1 {
    color: var(--primary-text);
    font-size: 26px;
    font-family: Jost-SemiBold;
  }

  h2 {
    color: var(--primary-text);
    font-size: 16px;
    font-family: Jost-MediumItalic;
  }

  .profile-wrapper {
    display: flex;
    align-items: center;

    p {
      color: var(--primary-text);
      font-size: 16px;
      font-family: Jost-Medium;
      margin-right: 8px;
    }
  }

  svg {
    width: 28px;
    fill: var(--grid-hide-primary);
  }
}
</style>