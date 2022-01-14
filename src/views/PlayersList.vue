<template>
  <div>
    <div class="info"></div>
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

    <div class="flex-row">
      <a class="page w-1/5 font-bold" :href="page>0?'?page=0':null">&lt;&lt;</a>
      <a class="page w-1/5 font-bold" :href="page>0?'?page='+(page-1):null">&lt;</a>
      <a class="page"
              v-for="n in pages"
              @click="changePage(n)"
              :key="n">
        {{n}}
      </a>
      <a class="page w-1/5 font-bold" :href="page<pages-1?'?page='+(page+1):null">&gt;</a>
      <a class="page w-1/5 font-bold" :href="page<pages-1?'?page='+(pages-1):null">&gt;&gt;</a>
      <div class="w-1/5"></div>
    </div>

    <div class="flex-row">
      <button class="w-1/5 " @click="$router.push('addplayer')">Add</button>
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
      page: 0,
      pages: 0,
      sorting: 'firstName'
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
      let url = baseURL;
      this.page = n - 1;
      try {
        console.log("n=" + n + ", this.page * 6")
        const res = await axios.get(url + "?_sort=" + this.sorting + "&order=asc&_start=" + this.page * 6 + "&_limit=6");
        this.players = res.data;
        const query = new URLSearchParams(location.search);
        this.page = +query.get("page");
      } catch (e) {
        console.error(e);
      }
    },

    async search(event) {
      try {
        console.log(event.target.value);
        const res = await axios.get(baseURL + "?q=" + event.target.value);
        this.players = res.data;
        this.pages = Math.ceil(this.players.length / 6);
        const query = new URLSearchParams(location.search);
        this.page = +query.get("page");
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

<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>
    <div class="flex-row">
      <select
          class="filter"
          @change="sort($event)">
        <option>No sorting</option>
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
          v-for="player of filteredList"
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
      <button class="w-1/5 " @click="$router.push('addplayer')">Add</button>
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
    toggleToDetail(router, id) {
      router.push({path: `/playerdetail/${id}`});
    },

    async sort(event) {
      let url = baseURL;
      try {
        switch (event.target.value) {
          case "Sort by lastname":
            url = baseURL + "?_sort=lastName&order=asc";
            break;
          case "Sort by firstname":
            url = baseURL + "?_sort=firstName&order=asc";
            break;
          case "Sort by country":
            url = baseURL + "?_sort=country&order=asc";
            break;
          case "Sort by age":
            url = baseURL + "?_sort=age&order=asc";
            break;
          case "No sorting":
            break;
          default:
            break;
        }
        const res = await axios.get(url);
        this.players = res.data;
        this.pages = Math.ceil(this.players.length / 6);
        const query = new URLSearchParams(location.search);
        this.page = +query.get("page");
      } catch (e) {
        console.error(e);
      }
    },

    async search(event) {
      // let url = baseURL;
      try {
        console.log(event.target.value);
        const res = await axios.get(baseURL + "?q=" + event.target.value);
        this.players = res.data;
        this.pages = Math.ceil(this.players.length / 6);
        const query = new URLSearchParams(location.search);
        this.page = +query.get("page");
      } catch (e) {
        console.error(e);
      }
    },
  },

  computed: {
    filteredList() {
      return this.players.slice(this.page * 6, this.page * 6 + 6);
    }
  }

};
</script>
