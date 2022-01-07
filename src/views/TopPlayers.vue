<template>
  <div class="players">
    <player-list />
    <button @click="$router.push('addplayer')">Dodaj zawodnika</button>
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

<style>
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  height: 100%;
}
h1 {
  margin: 0;
  padding: 0;
  color: #f6b93b;
}
ul {
  margin: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 50px;
  padding: 0 2rem;
  background: #38ada9;
  /*display: flex;*/
  justify-content: center;
  align-items: center;
}
</style>
