<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>
    <div class="msg">
      Are you sure you want to delete this contract?
    </div>
    <button class="btn btn-no" @click="removeContract($router, $event)">Yes</button>
    <button class="btn btn-no" @click="$router.push('/clubs')">No</button>
  </div>
</template>

<script>

import axios from "axios";
const baseURLcontracts = "http://localhost:3001/contracts";

export default {
  name: "RemoveContract",
  data() {
    return {
      contracts: [],
      id: null,
      playerId: null,
    };
  },

  async created() {
    try {
      this.id = this.$route.params.id
      const resContract = await axios.get(baseURLcontracts + "/" + this.$route.params.id)
      this.playerId = resContract.data.playerId

      console.log(this.id)
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    async removeContract(router) {
      try {
        await axios.delete(baseURLcontracts + "/" + this.id)

        await router.push({path: `/playerdetail/${this.playerId}`});
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>