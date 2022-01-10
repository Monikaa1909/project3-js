<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>

    <table id="table">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Country</th>
          <th>Age</th>
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
        </tr>
      </tbody>
    </table>
    <div class="flex-row">
      <div class="w-1/5"></div>
      <button class="w-1/5" @click="$router.push('addplayer')">Add</button>
      <button class="w-1/5" @click="$router.push('playerstoedit')">Edit</button>
      <button class="w-1/5" @click="$router.push('playerstoremove')">Remove</button>
      <div class="w-1/5"></div>
    </div>
    <div class="h-10"></div>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/players";

export default {
  name: "PlayersList",
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
};
</script>


