<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>
    <div class="msg">
      Are you sure you want to delete this player?
    </div>
    <button class="btn btn-no" @click="removePlayer($router, $event)">Tak</button>
    <button class="btn btn-no" @click="$router.push('/')">Nie</button>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/players";

export default {
  name: "RemovePlayer",
  data() {
    return {
      id: null,
      players: [],
      firstName: "",
      lastName: "",
      age: null,
      retired: null
    };
  },

  async created() {
    try {
      const res = await axios.get(baseURL);
      // var pathName = window.location.pathname
      // var splited = pathName.split("/")
      this.players = res.data
      this.id = this.$route.params.id
      console.log(this.id)
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    async removePlayer(router) {
      try {
        await axios.delete(baseURL + "/" + this.id)
        await router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
</style>
