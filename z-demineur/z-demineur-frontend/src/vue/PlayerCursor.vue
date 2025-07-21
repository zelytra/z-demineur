<template>
  <div class="cursor" :style="{top:player.mousePosition.y+'px',left:player.mousePosition.x+'px'}">
    <svg id="Layer_1" x="0px"
         y="0px"
         viewBox="0 0 401.292 401.292" style="enable-background:new 0 0 401.292 401.292;" xml:space="preserve">
          <g>
          	<polygon :style={fill:player.color} points="46.943,401.292 166.905,257.261 46.943,0 	"/>
            <polygon :style={fill:player.color} points="46.943,0 166.905,257.261 354.349,257.945 	"/>
          </g>
    </svg>
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

onMounted(() => {


})

</script>

<style scoped lang="scss">
.cursor {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 99;
}
</style>