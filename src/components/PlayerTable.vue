<template>
  <div>
    <div class="info" v-if="noPlayers">{{message}}</div>
    <div class="h-6" v-if="noPlayers"></div>

    <div class="info" v-if="label !== '' && !noPlayers" >{{label}}</div>
    <div class="h-6" v-if="label !== '' && !noPlayers" ></div>

    <div class="h-16" v-else-if="label === '' && !noPlayers"></div>

    <PlayerTableFilters
        v-if="!noPlayers"
        :moreOption="moreOption"
        :sort="sort"
        :setMoreOptions="setMoreOptions"
        :search="search"
        :changeCareer="changeCareer" />

    <table>
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

          :key="player.id">
        <td>{{player.firstName}}</td>
        <td>{{player.lastName}}</td>
        <td>{{player.country}}</td>
        <td>{{player.age}}</td>
      </tr>
      </tbody>
    </table>

    <TablePages
        v-if="!noPlayers"
        :page="page"
        :pages="pages"
        :changePage="changePage"/>

  </div>
</template>

<script>


const baseURL = "http://localhost:3001/players";
import PlayerTableFilters from "@/components/PlayerTableFilters";
import TablePages from "@/components/TablePages";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "PlayerTable",
  components: {
    PlayerTableFilters: PlayerTableFilters,
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
    // toggleToDetail: {
    //   type: Function,
    //   default: () => ({return: null})
    // }
  },

  async setup() {
    const players = ref(null);
    const pages = ref(0);
    const page = ref(0);
    const sorting = ref('name');
    const params = ref('');
    const query = ref(new URLSearchParams(location.search));
    const moreOption = ref(false);
    const retirement = ref('');
    const noPlayers = ref(false);

    let res;
    try {
      res = await axios.get(baseURL);
      players.value = [...res.data];

      if (players.value.length === 0) {
        noPlayers.value = true;
      }

      pages.value = Math.ceil(players.value.length / 6);
      page.value = +query.value.get("page");
      res = await axios.get(baseURL + "?_sort=" + sorting.value + "&order=asc&_start=0&_limit=6");
      players.value = [...res.data];
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
        const res = await axios.get(baseURL + "?_sort=" + sorting.value + "&order=asc&_start=" + (n-1) * 6 + "&_limit=6&retired_like=" + retirement.value + "&q=" + params.value);
        players.value = res.data;
      } catch (e) {
        console.error(e);
      }
    }

    function sort(event) {
      switch (event.target.value) {
        case "Sort by lastname":
          sorting.value = 'lastName';
          break;
        case "Sort by firstname":
          sorting.value = 'firstName';
          break;
        case "Sort by country":
          sorting.value = 'country';
          break;
        case "Sort by age":
          sorting.value = 'age';
          break;
        default:
          sorting.value = 'firstName';
          break;
      }
      changePage(page.value + 1);
    }

    async function changeCareer(event) {
      try {
        switch (event.target.value) {
          case "Retirees":
            retirement.value = 'true';
            break;
          case "All players":
            retirement.value = '';
            break;
          case "Still playing":
            retirement.value = 'false';
            break;
          default:
            retirement.value = '';
            break;
        }

        res = await axios.get(baseURL + "?retired_like=" + retirement.value + "&q=" + params.value);
        players.value = res.data;
        pages.value = Math.ceil(players.value.length / 6);
        page.value = +query.value.get("page");
        await changePage(page.value + 1);
      } catch (e) {
        console.error(e);
      }
    }

    async function search(event) {
      try {
        params.value = event.target.value;
        res = await axios.get(baseURL + "?retired_like=" + retirement.value + "&q=" + params.value);
        players.value = res.data;
        if (players.value.length === 0) {
          noPlayers.value = true;
        }
        pages.value = Math.ceil(players.value.length / 6);
        page.value = +query.value.get("page");
        console.log(pages.value);
      } catch (e) {
        console.error(e);
      }
      await changePage(page.value + 1);
    }

    function toggleToDetail(router, id) {
      router.push({path: `/playerdetail/${id}`});
    }

    return { players: players, pages, page, sorting, query, params, moreOption, retirement: retirement, noPlayers: noPlayers, toggleToDetail, setMoreOptions, changePage, sort, search, changeCareer };
  }
}
</script>
