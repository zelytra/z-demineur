<template>
  <div class="menu-wrapper">
    <div class="menu">
      <div class="title">
        <h1>THE D mineur</h1>
        <p>Juste un démineur... fin... ouais...</p>
      </div>
      <div class="user-inputs">
        <input placeholder="Entrer votre pseudo..."  v-model="nameInput" type="text" id="name" name="name" required
               minlength="4" maxlength="8" size="10">
        <button v-on:click="$emit('joinGame',nameInput)">Rejoindre la partie</button>
      </div>
      <h2>Copyright 2022 - Tout droits réservé à Zelytra </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, PropType} from "vue";
import {Player} from "../object/Player";

const props = defineProps({
  player: {
    type: Object as PropType<Player>,
    required: true
  }
})

let nameInput: string;

onMounted(() => {
  if (props.player.name) {
    nameInput = props.player.name;
  }
})
</script>

<style scoped lang="scss">
.menu-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-color: rgba(45, 45, 45, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;

  .menu {
    background-color: var(--background-color);
    box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.25);
    min-width: 500px;
    width: 25vw;
    height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .user-inputs {
      width: 100%;
      display: flex;
      justify-content: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      input {
        width: 60%;
        margin: auto;
        padding: 8px 8px 8px 12px;
        height: 50px;
        border-radius: 18px;
        background-color: var(--background-secondary);
        box-shadow: 0px 2px 1px 2px rgba(0, 0, 0, 0.25);
        border: none;
      }

      input[type=text] {
        color: var(--primary-text);
        font-family: Jost-Regular;
        font-size: 18px;
      }

      button {
        width: 46%;
        margin: 50px auto auto;
        background-color: var(--primary);
        padding: 6px;
        border-radius: 12px;
        border-radius: 12px;
        border: none;

        color: var(--primary-text);
        font-family: Jost-Regular;
        font-size: 24px;

      }

      button:hover {
        background-color: var(--grid-hide-secondary);
      }
    }

    h1 {
      text-align: center;
      color: var(--primary-text);
      font-family: Jost-Regular;
      font-size: 42px;
    }

    p {
      text-align: center;
      width: 100%;
      color: var(--secondary-text);
      font-family: Jost-Regular;
      font-size: 22px;
      height: 35px;
    }

    h2 {
      text-align: center;
      color: var(--secondary-text);
      font-family: Jost-Regular;
      font-size: 16px;
      margin-bottom: 8px;
    }
  }
}

</style>