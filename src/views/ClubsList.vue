<template>
    <div>
      <div class="info"></div>
      <div class="h-5"></div>

      <table id="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>League</th>
          <th>Current Coach</th>
          <th>Founded</th>
          <th>CL winner</th>
          <th>Ground</th>
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
        </tr>
        </tbody>
      </table>
      <div class="flex-row">
        <div class="w-1/5"></div>
        <button class="w-1/5" @click="$router.push('addclub')">Add</button>
        <button class="w-1/5" @click="$router.push('clubstoedit')">Edit</button>
        <button class="w-1/5" @click="$router.push('clubstoremove')">Remove</button>
        <div class="w-1/5"></div>
      </div>
      <div class="h-10"></div>
    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/clubs";

export default {
  name: "ClubsList",
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

};
</script>


