<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>
    <div class="msg">
      Are you sure you want to delete this player?
    </div>
    <button class="btn btn-no" @click="removePlayer($router, $event)">Yes</button>
    <button class="btn btn-no" @click="$router.push('/')">No</button>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/players";
import { useRoute } from 'vue-router';
import {ref} from "vue";

export default {
  name: "RemovePlayer",
  async setup() {
    const id = ref(null);
    const route = ref(null);

    try {
      route.value = useRoute();
      id.value = route.value.params.id;
    } catch (e) {
      console.log(e)
    }

    async function removePlayer(router) {
      try {
        await axios.delete(baseURL + "/" + id.value)
        await router.push('/')
      } catch (e) {
        console.log(e)
      }
    }

    return { id, route, removePlayer };
  },

  async created() {
    try {
      const res = await axios.get(baseURL);
      this.players = res.data
      this.id = this.$route.params.id
      console.log(this.id)
    } catch (e) {
      console.log(e)
    }
  },
}
</script>
