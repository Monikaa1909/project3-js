<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>

    <div class="flex-row">
      <select
          class="filter"
          @change="sort($event)">
        <option>Sort by club</option>
        <option>Sort by years</option>
        <option>Sort by matches</option>
        <option>Sort by goals</option>
      </select>
      <div class="w-1/5"></div>
    </div>

    <table id="table">
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
          class="pointer-events-none"
          v-for="contract of contracts"
          :key="contract.id">
        <td>{{contract.club.name}}</td>
        <td>{{contract.startYear}}-{{contract.endYear}}</td>
        <td>{{contract.matches}}</td>
        <td>{{contract.goals}}</td>
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
      <button class="w-1/5" @click="toggleToAddContract($router, playerId)">Add contract</button>
      <button class="w-1/5" @click="toggleToPlayerDetailToEdit($router, playerId)">Edit</button>
      <button class="w-1/5" @click="toggleToPlayerDetailToRemove($router, playerId)">Remove contract</button>
      <div class="w-1/5"></div>
    </div>
    <div class="h-10"></div>
  </div>
</template>

<script>

import axios from "axios";
const baseURL = "http://localhost:3001/contracts?_expand=club&";

export default {
  name: "PlayerDetail",
  data() {
    return {
      contracts: [],
      page: 0,
      pages: 0,
      playerId: null,
      sorting: 'years'
    };
  },

  async created() {
    try {
      this.playerId = this.$route.params.id;
      const res = await axios.get(baseURL + "playerId=" + this.playerId + "&_sort=" + this.sorting + "&order=asc");
      this.contracts = res.data;
      this.pages = Math.ceil(this.contracts.length / 6);
      const query = new URLSearchParams(location.search);
      this.page = +query.get("page");
      const res2 = await axios.get(baseURL + "playerId=" + this.playerId + "&_sort=" + this.sorting + "&order=asc&_start=0&_limit=6");
      this.contracts = res2.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    toggleToAddContract(router, id) {
      router.push({path: `/addcontract/${id}`});
    },

    toggleToPlayerDetailToEdit(router, id) {
      router.push({path: `/playerdetailtoedit/${id}`});
    },

    toggleToPlayerDetailToRemove(router, id) {
      router.push({path: `/playerdetailtoremove/${id}`});
    },

    sort(event) {
      switch (event.target.value) {
        case "Sort by club":
          this.sorting = 'club';
          break;
        case "Sort by years":
          this.sorting = 'years';
          break;
        case "Sort by matches":
          this.sorting = 'matches';
          break;
        case "Sort by goals":
          this.sorting = 'goals';
          break;
        default:
          this.sorting = 'club';
          break;
      }

      this.changePage(this.page + 1);
    },

    async changePage(n) {
      this.page = n - 1;
      try {
        const res = await axios.get(baseURL + "playerId=" + this.playerId + "&_sort=" + this.sorting + "&order=asc&_start=" + (n-1) * 6 + "&_limit=6" + this.query);
        console.log(baseURL + "playerId=" + this.playerId + "&_sort=" + this.sorting + "&order=asc&_start=" + (n-1) * 6 + "&_limit=6" + this.query)
        this.contracts = res.data;
      } catch (e) {
        console.error(e);
      }
    },
  }
}
</script>
