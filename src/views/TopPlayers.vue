<template>
  <div class="flex flex-col">
    <div class="h-1/6"></div>

    <div class=" flex flex-row">
      <div class="w-1/5"></div>
      <player-list id="playerslist"/>
      <div class="w-1/5"></div>
    </div>

    <div class="h-10"></div>

    <div class="h-2/8  flex-row">
      <div class="w-1/5"></div>
      <button class="w-1/5" @click="$router.push('addplayer')">Dodaj zawodnika</button>
<!--      <button class="w-1/5" @click="$router.push('editplayer')">Edytuj zawodnika</button>-->
<!--      <button class="w-1/5">Usuń zawodnika</button>-->

      <div class="w-1/5"></div>
    </div>

    <div class="h-10"></div>

  </div>
</template>

<script>
import PlayersList from "../components/PlayersList";

export default {
  name: 'TopPlayers',
  components: {
    PlayerList: PlayersList
  }
};
</script>

