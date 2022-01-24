<template>
  <div>
    <div class="info" v-if="noContracts">{{message}}</div>
    <div class="h-6" v-if="noContracts"></div>

    <div class="info" v-if="label !== '' && !noContracts" >{{label}}</div>
    <div class="h-6" v-if="label !== '' && !noContracts" ></div>

    <div class="h-16" v-else-if="label === '' && !noContracts"></div>

    <ContractTableFilters
        v-if="!noContracts"
        :sort="sort"/>

    <table>
      <thead>
      <tr>
        <th>Club</th>
        <th>Years</th>
        <th>Matches</th>
        <th>Goals</th>
      </tr>
      </thead>
      <tbody>
      <tr
          @click="toggleTo($router, contract.id)"
          v-for="contract of contracts"
          :key="contract.id">
        <td>{{contract.club.name}}</td>
        <td>{{contract.startYear}}-{{contract.endYear}}</td>
        <td>{{contract.matches}}</td>
        <td>{{contract.goals}}</td>
      </tr>
      </tbody>
    </table>

    <TablePages
        v-if="!noContracts"
        :page="page"
        :pages="pages"
        :changePage="changePage"/>

  </div>
</template>

<script>

import {ref} from "vue";
const baseURL = "http://localhost:3001/contracts?_expand=club&";
import axios from "axios";
import { useRoute } from 'vue-router'
import ContractTableFilters from "@/components/ContractTableFilters";
import TablePages from "@/components/TablePages";

export default {
  name: "ContractTable",
  components: {
    ContractTableFilters: ContractTableFilters,
    TablePages: TablePages,
  },

  props: {
    toggleTo: {
      type: Function,
      default: () => ({})
    },
    message: String,
    label: {
      type: String,
      default: ''
    },

  },

  async setup() {
    const contracts = ref(null);
    const pages = ref(0);
    const page = ref(0);
    const sorting = ref('startYear');
    const playerId = ref(null);
    const noContracts = ref(false);
    const params = ref('');
    const query = ref(new URLSearchParams(location.search));
    const route = ref(null);

    let res;
    try {
      route.value = useRoute();
      playerId.value = route.value.params.id;
      res = await axios.get(baseURL + "playerId=" + playerId.value);
      contracts.value = [...res.data];

      if (contracts.value.length === 0) {
        noContracts.value = true;
      }
      pages.value = Math.ceil(contracts.value.length / 6);
      page.value = +query.value.get("page");

      res = await axios.get(baseURL + "playerId=" + playerId.value + "&_sort=" + sorting.value + "&order=asc&_start=0&_limit=6");
      contracts.value = [...res.data];

    } catch (e) {
      console.error(e);
    }

    async function changePage(n) {
      page.value = n - 1;
      try {
        res = await axios.get(baseURL + "playerId=" + playerId.value + "&_sort=" + sorting.value + "&order=asc&_start=" + (n-1) * 6 + "&_limit=6" + params.value);
        contracts.value = res.data;
      } catch (e) {
        console.error(e);
      }
    }

    function sort(event) {
      switch (event.target.value) {
        case "Sort by club":
          sorting.value = 'club';
          break;
        case "Sort by years":
          sorting.value = 'startYear';
          break;
        case "Sort by matches":
          sorting.value = 'matches';
          break;
        case "Sort by goals":
          sorting.value = 'goals';
          break;
        default:
          sorting.value = 'club';
          break;
      }
      changePage(page.value + 1);
    }

    return { contracts, pages, page, sorting, playerId, noContracts, params, query, route, changePage, sort }
  },


  // methods: {
  //   toggleToAddContract(router, id) {
  //     router.push({path: `/addcontract/${id}`});
  //   },
  //
  //   toggleToPlayerDetailToEdit(router, id) {
  //     this.contracts.length === 0 ? this.noContracts = true : router.push({path: `/playerdetailtoedit/${id}`})
  //   },
  //
  //   toggleToPlayerDetailToRemove(router, id) {
  //     this.contracts.length === 0 ? this.noContracts = true : router.push({path: `/playerdetailtoremove/${id}`});
  //   },
  // }
}
</script>
