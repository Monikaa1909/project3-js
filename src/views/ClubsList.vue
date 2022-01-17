<template>
    <div>
      <div class="info" v-if="noClubs">There are no clubs</div>
      <div class="h-16"></div>

      <div class="flex-row">
        <button v-if="moreOption===false" class="filter" @click="moreOption=true">✚</button>
        <button v-else-if="moreOption===true" class="filter" @click="moreOption=false">━</button>
        <select
            class="filter"
            @change="sort($event)">
          <option>Sort by name</option>
          <option>Sort by league</option>
          <option>Sort by coach</option>
          <option>Sort by founded</option>
          <option>Sort by ground</option>
        </select>
        <input type="text"
               class="filter"
               placeholder="Search by yourself 🔍"
               value=""
               @keyup.enter="search($event)"
        />
        <div class="w-1/5"></div>
      </div>

      <div class="flex-row"
           v-if="moreOption===true">
        <select
            @change="changeLeague($event)"
            class="filter">
          <option>All leagues</option>
          <option
            v-for="league in leagues"
            v-bind:key="league">
            {{ league }}
          </option>
        </select>
        <select
            @change="changeCL($event)"
            class="filter">
          <option>All</option>
          <option>CL Winner</option>
          <option>Not CL Winner</option>
        </select>
      </div>

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
            class="pointer-events-none"
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
        <div class="w-1/5"></div>
        <button class="w-1/5" @click="$router.push('addclub')">Add</button>
        <button class="w-1/5" @click="toggleToEdit($router)">Edit</button>
        <button class="w-1/5" @click="toggleToRemove($router)">Remove</button>
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
      page: 0,
      pages: 0,
      sorting: 'name',
      query: '',
      moreOption: false,
      winner: '',
      league: '',
      leagues: [],
      noClubs: false
    };
  },

  async created() {
    try {
      const res = await axios.get(baseURL + "?_sort=" + this.sorting + "&order=asc&league_like=" + this.league + "&championsLeagueWinner_like=" + this.winner);
      this.clubs = res.data;
      let club;
      for(club of this.clubs) {
        if (!this.leagues.includes(club.league)) {
          this.leagues.push(club.league);
        }
      }
      this.pages = Math.ceil(this.clubs.length / 6);
      const query = new URLSearchParams(location.search);
      this.page = +query.get("page");
      const res2 = await axios.get(baseURL + "?_sort=" + this.sorting + "&order=asc&_start=0&_limit=6&order=asc&league_like=" + this.league + "&championsLeagueWinner_like=" + this.winner);
      this.clubs = res2.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {

    toggleToEdit(router) {
      this.clubs.length === 0 ? this.noClubs = true : router.push('clubstoedit')
    },

    toggleToRemove(router) {
      this.clubs.length === 0 ? this.noClubs = true : router.push('clubstoremove')
    },

    sort(event) {
      switch (event.target.value) {
        case "Sort by name":
          this.sorting = 'name';
          break;
        case "Sort by league":
          this.sorting = 'league';
          break;
        case "Sort by coach":
          this.sorting = 'currentCoach';
          break;
        case "Sort by founded":
          this.sorting = 'founded';
          break;
        case "Sort by ground":
          this.sorting = 'ground';
          break;
        default:
          this.sorting = 'name';
          break;
      }
      this.changePage(this.page + 1);
    },

    async changeLeague(event) {
      switch (event.target.value) {
        case "All leagues":
          this.league = "";
          break;
        default:
          this.league = event.target.value;
          break;
      }
      const res = await axios.get(baseURL + "?league_like=" + this.league + "&championsLeagueWinner_like=" + this.winner +"&q=" + this.query);
      this.clubs = res.data;
      this.pages = Math.ceil(this.clubs.length / 6);
      const query = new URLSearchParams(location.search);
      this.page = +query.get("page");
      await this.changePage(this.page + 1);
    },

    async changeCL(event) {
      switch (event.target.value) {
        case "All":
          this.winner = "";
          break;
        case "CL Winner":
          this.winner = "true";
          break;
        case "Not CL Winner":
          this.winner = "false";
          break;
        default:
          this.winner = "";
          break;
      }
      const res = await axios.get(baseURL + "?league_like=" + this.league + "&championsLeagueWinner_like=" + this.winner +"&q=" + this.query);
      this.clubs = res.data;
      this.pages = Math.ceil(this.clubs.length / 6);
      const query = new URLSearchParams(location.search);
      this.page = +query.get("page");
      await this.changePage(this.page + 1);
    },

    async changePage(n) {
      this.page = n - 1;
      try {
        const res = await axios.get(baseURL + "?_sort=" + this.sorting + "&order=asc&_start=" + (n-1) * 6 + "&_limit=6&order=asc&league_like=" + this.league + "&championsLeagueWinner_like=" + this.winner +"&q=" + this.query);
        console.log(baseURL + "?_sort=" + this.sorting + "&order=asc&_start=" + (n-1) * 6 + "&_limit=6&order=asc&league_like=" + this.league + "&championsLeagueWinner_like=" + this.winner +"&q=" + this.query);
        this.clubs = res.data;
      } catch (e) {
        console.error(e);
      }
    },

    async search(event) {
      try {
        this.query = event.target.value;
        const res = await axios.get(baseURL + "?league_like=" + this.league + "&championsLeagueWinner_like=" + this.winner +"&q=" + this.query);
        this.clubs = res.data;
        this.pages = Math.ceil(this.clubs.length / 6);
        const query = new URLSearchParams(location.search);
        this.page = +query.get("page");
        await this.changePage(this.page + 1);
      } catch (e) {
        console.error(e);
      }
    },
  }
};
</script>


