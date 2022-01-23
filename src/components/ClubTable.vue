<template>
  <div>
    <div class="info" v-if="noClubs">{{message}}</div>
    <div class="h-6" v-if="noClubs"></div>

    <div class="info" v-if="label !== '' && !noClubs" >{{label}}</div>
    <div class="h-6" v-if="label !== '' && !noClubs" ></div>

    <div class="h-16" v-else-if="label === '' && !noClubs"></div>

    <ClubTableFilters
        v-if="!noClubs"
        :moreOption="moreOption"
        :sort="sort"
        :setMoreOptions="setMoreOptions"
        :search="search"
        :changeLeague="changeLeague"
        :changeCL="changeCL"
        :leagues="leagues"/>

    <table>
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
          @click="toggleToEdit($router, club.id); toggleToRemove($router, club.id)"
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

    <TablePages
        v-if="!noClubs"
        :page="page"
        :pages="pages"
        :changePage="changePage"/>

  </div>
</template>

<script>

const baseURL = "http://localhost:3001/clubs";
import ClubTableFilters from "@/components/ClubTableFilters";
import TablePages from "@/components/TablePages";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "ClubTable",
  components: {
    ClubTableFilters: ClubTableFilters,
    TablePages: TablePages,
  },
  props: {
    toggleToEdit: {
      type: Function,
      default: () => ({})
    },
    toggleToRemove: {
      type: Function,
      default: () => ({})
    },
    message: String,
    label: {
      type: String,
      default: ''
    },
    createMessage: {
      type: Function,
      default: () => ({return: null})
    }
  },

  async setup() {
    const clubs = ref(null);
    const pages = ref(0);
    const page = ref(0);
    const sorting = ref('name');
    const params = ref('');
    const query = ref(new URLSearchParams(location.search));
    const moreOption = ref(false);
    const winner = ref('');
    const league = ref('');
    const leagues = ref(null);
    const noClubs = ref(false);

    let res;
    try {
      res = await axios.get(baseURL);
      clubs.value = [...res.data];

      if (clubs.value.length === 0) {
        noClubs.value = true;
      }

      leagues.value = [];
      for(let club of clubs.value) {
        if (!leagues.value.includes(club.league)) {
          leagues.value.push(club.league);
        }
      }
      pages.value = Math.ceil(clubs.value.length / 6);
      page.value = +query.value.get("page");
      res = await axios.get(baseURL + "?_sort=" + sorting.value + "&order=asc&_start=0&_limit=6&order=asc");
      clubs.value = [...res.data];
    } catch (e) {
      console.error(e);
    }

    function setMoreOptions() {
      if (moreOption.value === true) {
        moreOption.value = false;
      } else {
        moreOption.value = true;
      }
    }

    async function changePage(n) {
      page.value = n - 1;
      try {
        res = await axios.get(baseURL + "?_sort=" + sorting.value + "&order=asc&_start=" + (n - 1) * 6 + "&_limit=6&order=asc&league_like=" + league.value + "&championsLeagueWinner_like=" + winner.value + "&q=" + params.value);
        console.log(baseURL + "?_sort=" + sorting.value + "&order=asc&_start=" + (n - 1) * 6 + "&_limit=6&order=asc&league_like=" + league.value + "&championsLeagueWinner_like=" + winner.value + "&q=" + params.value);
        clubs.value = res.data;
      } catch (e) {
        console.error(e);
      }
    }

    function sort(event) {
      switch (event.target.value) {
        case "Sort by name":
          sorting.value = 'name';
          break;
        case "Sort by league":
          sorting.value = 'league';
          break;
        case "Sort by coach":
          sorting.value = 'currentCoach';
          break;
        case "Sort by founded":
          sorting.value = 'founded';
          break;
        case "Sort by ground":
          sorting.value = 'ground';
          break;
        default:
          sorting.value = 'name';
          break;
      }
      changePage(page.value + 1);
    }

    async function changeLeague(event) {
      switch (event.target.value) {
        case "All leagues":
          league.value = "";
          break;
        default:
          league.value = event.target.value;
          break;
      }

      res = await axios.get(baseURL + "?league_like=" + league.value + "&championsLeagueWinner_like=" + winner.value +"&q=" + params.value);
      clubs.value = res.data;
      if (clubs.value.length === 0) {
        noClubs.value = true;
      }
      pages.value = Math.ceil(clubs.value.length / 6);
      page.value = +query.value.get("page");
      await changePage(page.value + 1);
    }

    async function changeCL(event) {
      switch (event.target.value) {
        case "All":
          winner.value = "";
          break;
        case "CL Winner":
          winner.value = "true";
          break;
        case "Not CL Winner":
          winner.value = "false";
          break;
        default:
          winner.value = "";
          break;
      }
      try {
        const res = await axios.get(baseURL + "?league_like=" + league.value + "&championsLeagueWinner_like=" + winner.value +"&q=" + params.value);
        clubs.value = res.data;
        if (clubs.value.length === 0) {
          noClubs.value = true;
        }
        pages.value = Math.ceil(clubs.value.length / 6);
        page.value = +query.value.get("page");
        console.log("page = " + page.value);
        await changePage(page.value + 1);
      } catch (e) {
        console.error(e);
      }
    }

    async function search(event) {
      try {
        params.value = event.target.value;
        res = await axios.get(baseURL + "?league_like=" + league.value + "&championsLeagueWinner_like=" + winner.value +"&q=" + params.value);
        clubs.value = res.data;
        if (clubs.value.length === 0) {
          noClubs.value = true;
        }
        pages.value = Math.ceil(clubs.value.length / 6);
        page.value = +query.value.get("page");
        console.log("page = " + page.value);
      } catch (e) {
        console.error(e);
      }
      await changePage(page.value + 1);
    }

    return { clubs, pages, page, sorting, query, params, moreOption, winner, leagues, league, noClubs, setMoreOptions, changePage, sort, changeCL, search, changeLeague };
  }
}
</script>
