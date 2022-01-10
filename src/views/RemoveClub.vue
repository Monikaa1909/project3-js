<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>
    <div class="msg">
      <h1>Na pewno chcesz usunąć ten klub?</h1>
    </div>
    <button class="btn btn-no" @click="removeClub($router, $event)">Tak</button>
    <button class="btn btn-no" @click="$router.push('/clubs')">Nie</button>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/clubs";

export default {
  name: "RemoveClub",
  data() {
    return {
      clubs: [],
      id: null,
      name: "",
      league: "",
      currentCoach: "",
      founded: null,
      championsLeagueWinner: null,
      ground: null
    };
  },

  async created() {
    try {
      // var pathName = window.location.pathname
      // var splited = pathName.split("/")
      this.id = this.$route.params.id
      console.log(this.id)
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    async removeClub(router) {
      try {
        await axios.delete(baseURL + "/" + this.id)
        router.push('/clubs')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
</style>
