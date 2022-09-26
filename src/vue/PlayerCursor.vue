<template>
  <div class="cursor" :style="{top:player.mousePosition.y+'px',left:player.mousePosition.x+'px'}">
  <svg   id="Layer_1" x="0px"
       y="0px"
       viewBox="0 0 401.292 401.292" style="enable-background:new 0 0 401.292 401.292;" xml:space="preserve">
<g>
	<polygon :style={fill:randomColor} points="46.943,401.292 166.905,257.261 46.943,0 	"/>
  <polygon :style={fill:randomColor} points="46.943,0 166.905,257.261 354.349,257.945 	"/>
</g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
</svg>

  <p>{{ player.name }}</p>
  </div>

</template>

<script setup lang="ts">
import {onMounted, PropType} from "vue";
import {Player} from "../object/Player";

defineProps({
  player: {
    type: Object as PropType<Player>,
    required: true
  },
})

const colors: string[] = ['#071A3C',
  '#0E2356',
  '#162C6E',
  '#213484',
  '#2D3D98',
  '#445FA4',
  '#5C7EB0',
  '#739ABC',
  '#8BB3C8',
  '#A2C9D3',
  '#BADCDF',
  '#D2EAE9']

const randomColor: string = colors[Math.floor(Math.random() * colors.length)];

onMounted(() => {


})

</script>

<style scoped lang="scss">
.cursor {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 24px;
  z-index: 99;
}
</style>