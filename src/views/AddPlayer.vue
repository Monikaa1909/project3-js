<template>
  <div>
    <div class="info" v-if="somethingWrong">Fill in the fields correctly </div>
    <div class="h-5"></div>
    <form @submit.prevent="addPlayer($router)">
      <div class="editfield flex-row">
        <label class="editlabel">Firstname:</label>
        <input
            type="text" required
            v-model="firstName"
            aria-label="First name"
            placeholder="First name"
        />
      </div>

      <div class="editfield flex-row">
        <label class="editlabel">Lastname:</label>
        <input
            type="text" required
            v-model="lastName"
            aria-label="Second name"
            placeholder="Second name"
        />
      </div>

      <div class="editfield flex-row">
        <label class="editlabel">Country:</label>
        <select
            class="appearance-none"
            v-model="country"
            aria-label="Country"
            placeholder="Country">
          <option v-for="country in countries" v-bind:key=country.name :value="country.name">{{country.name}}</option>
        </select>
      </div>

      <div class="editfield flex-row">
        <label class="editlabel">Age:</label>
        <input
            type="text" required
            v-model="age"
            aria-label="Age"
            placeholder="Age"
        />
      </div>

      <div class="editfield flex-row">
        <label class="editlabel">Retired:</label>
        <select
            class="appearance-none"
            v-model="retired"
            aria-label="Retired"
            placeholder="Retired">
          <option v-for="bool in bools" v-bind:key=bool :value="bool">{{bool}}</option>
        </select>
      </div>

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
const baseURLcountries = "http://localhost:3001/countries";

export default {
  name: "AddPlayer",
  data() {
    return {
      players: [],
      countries: [],
      firstName: "",
      lastName: "",
      country: null,
      age: null,
      retired: null,
      bools: ['No', 'Yes'],
      somethingWrong: false
    };
  },

  async created() {
    try {
      const res = await axios.get(baseURL);
      const resCountries = await axios.get(baseURLcountries)
      this.countries = resCountries.data;
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
            age: parseInt(this.age),
            retired: this.retired === "No" ? this.retired = false : this.retired = true
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
      } else this.somethingWrong = true
    }
  }
};
</script>
-->
