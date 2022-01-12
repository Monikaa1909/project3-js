<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>

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
        <td>{{contract.years}}</td>
        <td>{{contract.matches}}</td>
        <td>{{contract.goals}}</td>
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
      <button class="w-1/5" >Add contract</button>
      <button class="w-1/5" >Edit</button>
      <button class="w-1/5" >Remove contract</button>
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
      pages: 0
    };
  },

  async created() {
    try {
      const res = await axios.get(baseURL + "playerId=" + this.$route.params.id)
      this.contracts = res.data;
      this.pages = Math.ceil(this.contracts.length / 6);
      const query = new URLSearchParams(location.search);
      this.page = +query.get("page");
    } catch (e) {
      console.error(e);
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
