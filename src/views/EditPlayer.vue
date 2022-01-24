<template>
  <div>
    <div class="info" v-if="somethingWrong">Enter the correct firstname, lastname and age</div>
    <div class="info" v-else ></div>

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
import {ref} from "vue";
import { useRoute } from 'vue-router'

export default {
  name: "EditPlayer",
  async setup() {
    const players = ref(null);
    const countries = ref(null);
    const id = ref(null);
    const firstName = ref('');
    const lastName = ref('');
    const country = ref(null);
    const age = ref(null);
    const retired = ref(null);
    const bools = ref(['No', 'Yes']);
    const somethingWrong = ref(false);
    const route = ref(null);

    try {
      route.value = useRoute();
      const res = await axios.get(baseURL + "/" + route.value.params.id)
      const resCountries = await axios.get(baseURLcountries)

      id.value = res.data.id
      countries.value = resCountries.data;
      firstName.value = res.data.firstName
      lastName.value = res.data.lastName
      country.value = res.data.country
      age.value = res.data.age
      retired.value = res.data.retired === true ? 'Yes' : 'No'

    } catch (e) {
      console.error(e);
    }

    async function editPlayer(router) {
      if (firstName.value.length > 0 && !isNaN(age.value) && lastName.value.length > 0) {
        try {
          await Promise.all([axios.patch(baseURL + "/" + id.value, {
            id: id.value,
            firstName: firstName.value,
            lastName: lastName.value,
            country: country.value,
            age: parseInt(age.value),
            retired: retired.value === "No" ? retired.value = false : retired.value = true
          })]);

        } catch (e) {
          console.error(e);
        }

        router.push('/')
      } else this.somethingWrong = true
    }

    return { players, countries, id, firstName, lastName, country, age, retired, bools, somethingWrong, route, editPlayer};
  },

}
</script>
