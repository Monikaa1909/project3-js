<template>
  <div>
    <div class="info">Select the contract you want to edit:</div>
    <div class="h-5"></div>
    <table class="editable">
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
          @click="toggleToEdit($router, contract.id)"
          v-for="contract of filteredList"
          :key="contract.id">
        <td>{{ contract.club.name }}</td>
        <td>{{contract.startYear}}-{{contract.endYear}}</td>
        <td>{{ contract.matches }}</td>
        <td>{{ contract.goals }}</td>
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
        {{ n }}
      </a>
      <a class="page w-1/5 font-bold" :href="page<pages-1?'?page='+(page+1):null">&gt;</a>
      <a class="page w-1/5 font-bold" :href="page<pages-1?'?page='+(pages-1):null">&gt;&gt;</a>
      <div class="w-1/5"></div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

const baseURL = "http://localhost:3001/contracts?_expand=club&";

export default {
  name: "PlayerDetailToEdit",
  data() {
    return {
      contracts: [],
      page: 0,
      pages: 0,
      playerId: null
    };
  },

  async created() {
    try {
      this.playerId = this.$route.params.id
      const res = await axios.get(baseURL + "playerId=" + this.playerId)
      this.contracts = res.data;
      this.pages = Math.ceil(this.contracts.length / 6);
      const query = new URLSearchParams(location.search);
      this.page = +query.get("page");
    } catch (e) {
      console.error(e)
    }
  },

  methods: {
    toggleToEdit(router, id) {
      router.push({path: `/editcontract/${id}`});
    }
  },

  computed: {
    filteredList() {
      return this.contracts.slice(this.page * 6, this.page * 6 + 6);
    }
  }
}
</script>

<style scoped>

</style>