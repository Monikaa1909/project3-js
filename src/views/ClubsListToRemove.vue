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
          v-for="club of filteredList"
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
      <a class="page w-1/5 font-bold" :href="page>0?'?page=0':null">&lt;&lt;</a>
      <a class="page w-1/5 font-bold" :href="page>0?'?page='+(page-1):null">&lt;</a>
      <a class="page"
         v-for="n in pages"
         :href="n-1!==page ? '?page=' + (n-1) : null"
         :key="n">
        {{n}}
      </a>
      <a class="page w-1/5 font-bold" :href="page<pages-1?'?page='+(page+1):null">&gt;</a>
      <a class="page w-1/5 font-bold" :href="page<pages-1?'?page='+(pages-1):null">&gt;&gt;</a>
      <div class="w-1/5"></div>
    </div>
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
      ground: "",
      page: 0,
      pages: 0
    };
  },

  async created() {
    try {
      const res = await axios.get(baseURL);
      this.clubs = res.data;
      this.pages = Math.ceil(this.clubs.length / 6);
      const query = new URLSearchParams(location.search);
      this.page = +query.get("page");
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    toggleToRemove(router, id) {
      router.push({path: `/removeclub/${id}`});
    }
  },

  computed: {
    filteredList() {
      return this.clubs.slice(this.page * 6, this.page * 6 + 6);
    }
  }
}

</script>
