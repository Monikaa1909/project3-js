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
            v-for="club of filteredList"
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

  computed: {
    filteredList() {
      return this.clubs.slice(this.page * 6, this.page * 6 + 6);
    }
  }
};
</script>


