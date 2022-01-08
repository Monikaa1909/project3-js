<template>
  <div>
      <h1>Na pewno chcesz usunąć tego gracza?</h1>
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
      console.log("coś tu wgl jest?")
      console.log(this.id)
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    removePlayer(router) {
      try {
        this.players.splice(this.id, 1)

        for (const v of this.players) {
          axios.delete(baseURL + "/" + v.id)
        }

        this.players.forEach((v, i) => {
          v.id = i + 1
        })

        // for (const v of this.players) {
        //   Promise.all([axios.post(baseURL, {
        //     id: v.id,
        //     firstName: v.firstName,
        //     lastName: v.lastName,
        //     age: v.age,
        //     retired: v.retired
        //   })]);
        // }
        router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
</style>