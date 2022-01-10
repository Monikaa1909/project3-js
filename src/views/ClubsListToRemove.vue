<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>

    <table id="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>League</th>
        <th>Current coach</th>
        <th>Founded</th>
        <th>CL winner</th>
        <th>Ground</th>
        <th>Remove</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="club of clubs"
          :key="club.id">
        <td>{{club.name}}</td>
        <td>{{club.league}}</td>
        <td>{{club.currentCoach}}</td>
        <td>{{club.founded}}</td>
        <td>{{club.championsLeagueWinner}}</td>
        <td>{{club.ground}}</td>
        <td>
          <button class="singleBtn" @click="toggleToRemove($router, club.id)">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="flex-row">
      <div class="w-1/5"></div>
      <div class="w-1/5"></div>
    </div>
    <div class="h-10"></div>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/clubs";

export default {
  name: "ClubsListToRemove",
  data() {
    return {
      clubs: [],
      name: "",
      league: "",
      coach: "",
      founded: null,
      championsLeagueWinner: null,
      ground: ""
    };
  },

  async created() {
    try {
      const res = await axios.get(baseURL);
      this.clubs = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    toggleToRemove(router, id) {
      router.push({path: `/removeclub/${id}`});
    }
  }
}

</script>

<style scoped>

</style>