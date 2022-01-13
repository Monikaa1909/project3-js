<template>
  <div>
    <div class="h-5"></div>
    <form @submit.prevent="editContract($router)">
      <div class="editfield flex-row">
        <label class="editlabel">Player:</label>
        <div class="player">{{firstName}} {{lastName}}</div>
      </div>

      <div class="editfield flex-row">
        <label class="editlabel">Club:</label>
        <select
            class="appearance-none"
            @change="getClubId($event, $event.target.selectedIndex)"
            aria-label="Club"
            placeholder="Club"
        >
          <option
              v-for="club in clubs"
              v-bind:key="club.id">{{club.name}}</option>
        </select>
      </div>
      <div class="editfield flex-row">
        <label class="editlabel">Years:</label>
        <input
            type="text" required
            v-model="years"
            aria-label="Years"
            placeholder="Years"
        />
      </div>
      <div class="editfield flex-row">
        <label class="editlabel">Matches:</label>
        <input
            type="text" required
            v-model="matches"
            aria-label="Matches"
            placeholder="Matches"
        />
      </div>
      <div class="editfield flex-row">
        <label class="editlabel">Goals:</label>
        <input
            type="text" required
            v-model="goals"
            aria-label="Goals"
            placeholder="Goals"
        />
      </div>
      <div>
        <button class="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const baseURLplayers = "http://localhost:3001/players";
const baseURLclubs = "http://localhost:3001/clubs";
const baseURLcontracts = "http://localhost:3001/contracts";


export default {
  name: "AddContract",

  data() {
    return {
      firstName: "",
      lastName: "",
      clubs: [],
      playerId: null,
      years: null,
      matches: null,
      goals: null,
      selectedIndex: 0,
      club: null
    }
  },

  async created() {
    try {
      const resContract = await axios.get(baseURLcontracts + "/" + this.$route.params.id)
      const resPlayer = await axios.get(baseURLplayers + "/" + resContract.data.playerId)
      const resClub = await axios.get(baseURLclubs)

      this.playerId = resContract.data.playerId
      this.firstName = resPlayer.data.firstName
      this.lastName = resPlayer.data.lastName

      this.years = resContract.data.years
      this.matches = resContract.data.matches
      this.goals = resContract.data.goals
      this.clubs = resClub.data

    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    getClubId(event, selectedIndex) {
      console.log(event, selectedIndex);
      this.selectedIndex = selectedIndex;
    },

    async editContract(router) {
      try {
        await Promise.all([axios.patch(baseURLcontracts + "/" + this.$route.params.id, {
          clubId: this.selectedIndex,
          years: this.years,
          matches: parseInt(this.matches),
          goals: parseInt(this.goals),
        })]);

        await router.push({path: `/playerdetail/${this.playerId}`});
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style scoped>
</style>

