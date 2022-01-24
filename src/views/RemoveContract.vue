<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>
    <div class="msg">
      Are you sure you want to delete this contract?
    </div>
    <button class="btn btn-no" @click="removeContract($router, $event)">Yes</button>
    <button class="btn btn-no" @click="noRemoveContract($router)">No</button>
  </div>
</template>

<script>

import axios from "axios";
const baseURLcontracts = "http://localhost:3001/contracts";
import { useRoute } from 'vue-router';
import {ref} from "vue";

export default {
  name: "RemoveContract",
  async setup() {
    const playerId = ref(null);
    const id = ref(null);
    const route = ref(null);

    try {
      route.value = useRoute();
      id.value = route.value.params.id;
      const res = await axios.get(baseURLcontracts + "/" + id.value);
      playerId.value = res.data.playerId;
    } catch (e) {
      console.log(e)
    }

    async function removeContract(router) {
      try {
        await axios.delete(baseURLcontracts + "/" + id.value)
        await router.push({path: `/contractslist/${playerId.value}`});
      } catch (e) {
        console.log(e)
      }
    }

    async function noRemoveContract(router) {
      try {
        await router.push({path: `/contractslist/${playerId.value}`});
      } catch (e) {
        console.log(e)
      }
    }
    return { id, route, playerId, removeContract, noRemoveContract};
  },
}
</script>
