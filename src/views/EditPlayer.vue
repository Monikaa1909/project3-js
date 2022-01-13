<template>
  <div>
    <div class="info" v-if="somethingWrong">Fill in the fields correctly </div>
    <div class="info"></div>
    <div class="h-5"></div>

    <form @submit.prevent="editPlayer($router)">
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
      <div>
        <button class="submit">Done</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/players";
const baseURLcountries = "http://localhost:3001/countries";

export default {
  name: "EditPlayer",

  data() {
    return {
      players: [],
      countries: [],
      id: null,
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
      const res = await axios.get(baseURL + "/" + this.$route.params.id)
      const resCountries = await axios.get(baseURLcountries)

      this.id = res.data.id
      this.countries = resCountries.data;
      this.firstName = res.data.firstName
      this.lastName = res.data.lastName
      this.country = res.data.country
      this.age = res.data.age
      this.retired = res.data.retired === true ? 'Yes' : 'No'
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async editPlayer(router) {
      console.log(this.age)
      console.log(this.lastName)
      console.log(this.firstName)
      if (this.firstName.length > 0 && !isNaN(this.age) && this.lastName.length > 0) {
        try {
          await Promise.all([axios.patch(baseURL + "/" + this.id, {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            country: this.country,
            age: parseInt(this.age),
            retired: this.retired === "No" ? this.retired = false : this.retired = true
          })]);

        } catch (e) {
          console.error(e);
        }

        router.push('/')
      } else this.somethingWrong = true
    }
  }
}
</script>
