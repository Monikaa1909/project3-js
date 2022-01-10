<template>
  <div>
    <div class="info" >Select the player you want to remove:</div>
    <div class="h-5"></div>

    <table id="table">
      <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Country</th>
        <th>Age</th>
        <th>Remove</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="player of players"
          :class="{ retired: player.retired }"
          :key="player.id">
        <td>{{player.firstName}}</td>
        <td>{{player.lastName}}</td>
        <td>{{player.country}}</td>
        <td>{{player.age}}</td>
        <td>
          <button class="singleBtn" @click="toggleToRemove($router, player.id)">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/players";

export default {
  name: "PlayersToRemove",
  data() {
    return {
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
      this.players = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    toggleToRemove(router, id) {
      router.push({path: `/removeplayer/${id}`});
    }
  }
};
</script>
