<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>
    <div class="msg">
      Are you sure you want to delete this club?
    </div>
    <button class="btn btn-no" @click="removeClub($router, $event)">Yes</button>
    <button class="btn btn-no" @click="$router.push('/clubs')">No</button>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from "vue";
const baseURL = "http://localhost:3001/clubs";
import { useRoute } from 'vue-router'

export default {
  name: "RemoveClub",
  async setup() {
    const id = ref(null);
    const route = ref(null);

    try {
      route.value = useRoute();
      id.value = route.value.params.id;
    } catch (e) {
      console.log(e)
    }

    async function removeClub(router) {
      try {
        await axios.delete(baseURL + "/" + id.value)
        router.push('/clubs')
      } catch (e) {
        console.log(e)
      }
    }

    return { id, route, removeClub};
  },
}
</script>
