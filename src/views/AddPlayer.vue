<template>
  <div>
    <form @submit.prevent="addPlayer($router)">
      <input
          type="text" required
          v-model="firstName"
          aria-label="First name"
          placeholder="First name"
      />
      <input
          type="text" required
          v-model="lastName"
          aria-label="Second name"
          placeholder="Second name"
      />
      <input
          type="text" required
          v-model="country"
          aria-label="Country"
          placeholder="Country"
      />
      <input
          type="text" required
          v-model="age"
          aria-label="Age"
          placeholder="Age"
      />
      <input
          type="text" required
          v-model="retired"
          aria-label="Retired"
          placeholder="Retired"
      />

      <div class="flex-row">
        <div class="w-1/5"></div>
        <button @click="$router.push('/')" >Back to all players</button>
        <button class="submit" >Add</button>
        <div class="w-1/5"></div>
      </div>
      <div class="h-10"></div>
    </form>
  </div>
</template>

<script>

import axios from "axios";
const baseURL = "http://localhost:3001/players";

export default {
  name: "AddPlayer",
  data() {
    return {
      players: [],
      firstName: "",
      lastName: "",
      country: null,
      age: null,
      retired: null
    };
  },

  async created() {
    try {
      const res = await axios.get(baseURL);
      this.players = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async addPlayer(router) {
      if (this.firstName.length > 0 && !isNaN(this.age) && this.lastName.length > 0) {
        try {
          const [res] = await Promise.all([axios.post(baseURL, {
            firstName: this.firstName,
            lastName: this.lastName,
            country: this.country,
            age: this.age,
            retired: this.retired === null ? this.retired = false : this.retired === "true"
          })]);

          this.players = [...this.players, res.data];

          this.firstName = "";
          this.lastName = ""
          this.age = null
          this.retired = null
        } catch (e) {
          console.error(e);
        }

        router.push('/')
      }
    }
  }
};
</script>
-->
