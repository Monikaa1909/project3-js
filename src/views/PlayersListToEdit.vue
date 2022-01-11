<template>
  <div>
    <div class="info" >Select the player you want to edit:</div>
    <div class="h-5"></div>

    <table class="editable">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Country</th>
          <th>Age</th>
<!--          <th>Edit</th>-->
        </tr>
      </thead>
      <tbody>
        <tr

            @click="toggleToEdit($router, player.id)"
            v-for="player of filteredList"
            :class="{ retired: player.retired }"
            :key="player.id">
          <td>{{player.firstName}}</td>
          <td>{{player.lastName}}</td>
          <td>{{player.country}}</td>
          <td>{{player.age}}</td>
<!--          <td>-->
<!--            <button class="singleBtn" @click="toggleToEdit($router, player.id)">Edit</button>-->
<!--          </td>-->
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
const baseURL = "http://localhost:3001/players";

export default {
  name: "PlayersListToEdit",
  data() {
    return {
      players: [],
      firstName: "",
      lastName: "",
      age: null,
      retired: null,
      page: 0,
      pages: 0
    };
  },

  async created() {
    try {
      const res = await axios.get(baseURL);
      this.players = res.data;
      this.pages = Math.ceil(this.players.length / 6);
      const query = new URLSearchParams(location.search);
      this.page = +query.get("page");
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    toggleToEdit(router, id) {
      router.push({path: `/editplayer/${id}`});
    },
  },

  computed: {
    filteredList() {
      return this.players.slice(this.page * 6, this.page * 6 + 6);
    }
  }
};
</script>
