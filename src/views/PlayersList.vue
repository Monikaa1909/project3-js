<template>
  <div>
    <div class="info" v-if="noPlayers">There are no players</div>
    <div class="h-5"></div>
    <div class="flex-row">
      <select
          class="filter"
          @change="sort($event)">
        <option>Sort by firstname</option>
        <option>Sort by lastname</option>
        <option>Sort by country</option>
        <option>Sort by age</option>
      </select>
      <input type="text"
             class="filter"
             placeholder="Search by yourself 🔍"
             value=""
             @keyup.enter="search($event)"
      />
      <div class="w-1/5"></div>
    </div>
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
          @click="toggleToDetail($router, player.id)"
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

    <div class="direction flex-row">
      <button v-if="page>0" class="page font-bold" @click="changePage(1)">&lt;&lt;</button>
      <button v-if="page===0" class="disPage font-bold">&lt;&lt;</button>

      <button v-if="page>0" class="page font-bold animate-bounce" @click="changePage(page)">&lt;</button>
      <button v-if="page===0" class="disPage font-bold">&lt;</button>

      <span
          v-for="n in pages"
          :key="n">
        <button
            v-if="page+1 !== n"
            class="page"
            @click="changePage(n)">
          {{n}}
        </button>
        <button
            v-if="page+1 === n"
            class="disPage">
          {{n}}
        </button>
      </span>

      <button v-if="page<pages-1" class="page font-bold animate-bounce" @click="changePage(page+2)">&gt;</button>
      <button v-if="page===pages-1" class="disPage font-bold" >&gt;</button>

      <button v-if="page<pages-1" class="page font-bold" @click="changePage(pages)">&gt;&gt;</button>
      <button v-if="page===pages-1" class="disPage font-bold" >&gt;&gt;</button>
      <div class="w-1/5"></div>
    </div>

    <div class="flex-row">
      <button class="w-1/5 " @click="$router.push('addplayer')">Add</button>
      <button class="w-1/5" @click="toggleToEdit($router)">Edit</button>
      <button class="w-1/5" @click="toggleToRemove($router)">Remove</button>
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
      page: 0,
      pages: 0,
      sorting: 'firstName',
      query: '',
      noPlayers: false
    };
  },

  async created() {
      try {
        const res = await axios.get(baseURL + "?_sort=" + this.sorting + "&order=asc");
        this.players = res.data;
        this.pages = Math.ceil(this.players.length / 6);
        const query = new URLSearchParams(location.search);
        this.page = +query.get("page");
        const res2 = await axios.get(baseURL + "?_sort=" + this.sorting + "&order=asc&_start=0&_limit=6");
        this.players = res2.data;
      } catch (e) {
        console.error(e);
      }
  },

  methods: {
    toggleToDetail(router, id) {
      router.push({path: `/playerdetail/${id}`});
    },

    toggleToEdit(router) {
      this.players.length === 0 ? this.noPlayers = true : router.push('playerstoedit')
    },


    toggleToRemove(router) {
      this.players.length === 0 ? this.noPlayers = true : router.push('playerstoremove')
    },

    sort(event) {
      switch (event.target.value) {
        case "Sort by lastname":
          this.sorting = 'lastName';
          break;
        case "Sort by firstname":
          this.sorting = 'firstName';
          break;
        case "Sort by country":
          this.sorting = 'country';
          break;
        case "Sort by age":
          this.sorting = 'age';
          break;
        default:
          this.sorting = 'firstName';
          break;
      }

      this.changePage(this.page + 1);
    },

    async changePage(n) {
      this.page = n - 1;
      console.log("CHAMGEPAGE page = " + this.page);
      try {
        console.log("n=" + n + ", page = " + this.page)
        const res = await axios.get(baseURL + "?_sort=" + this.sorting + "&order=asc&_start=" + (n-1) * 6 + "&_limit=6&q=" + this.query);
        this.players = res.data;
        // const query = new URLSearchParams(location.search);
        // this.page = +query.get("page");
        console.log("CHANGEPAGE QUERY page = " + this.page);
      } catch (e) {
        console.error(e);
      }
    },

    async search(event) {
      try {
        this.query = event.target.value;
        const res = await axios.get(baseURL + "?q=" + this.query);
        this.players = res.data;
        this.pages = Math.ceil(this.players.length / 6);
        const query = new URLSearchParams(location.search);
        this.page = +query.get("page");
        console.log("SEATCH page = " + this.page);
        await this.changePage(this.page + 1);
      } catch (e) {
        console.error(e);
      }
    },
  },

  computed: {
    // filteredList() {
    //   return this.players.slice(this.page * 6, this.page * 6 + 6);
    // }
  }

};
</script>

