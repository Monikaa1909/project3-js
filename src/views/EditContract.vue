<template>
  <div>
    <div class="info" v-if="somethingWrong">Fill in the fields correctly </div>
    <div class="info" v-else ></div>

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
        <label class="editlabel">First year:</label>
        <input
            type="text" required
            v-model="startYear"
            aria-label="First year"
            placeholder="Last year"
        />
      </div>
      <div class="editfield flex-row">
        <label class="editlabel">Last year:</label>
        <input
            type="text" required
            v-model="endYear"
            aria-label="First year"
            placeholder="Last year"
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
        <button class="submit">Done</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const baseURLplayers = "http://localhost:3001/players";
const baseURLclubs = "http://localhost:3001/clubs";
const baseURLcontracts = "http://localhost:3001/contracts";
import {ref} from "vue";
import { useRoute } from 'vue-router'

export default {
  name: "AddContract",
  async setup() {
    const firstName = ref('');
    const lastName = ref('');
    const clubs = ref(null);
    const playerId = ref(null);
    const startYear = ref(null);
    const endYear = ref(null);
    const matches = ref(null);
    const goals = ref(null);
    const clubId = ref(null);
    const club = ref(null);
    const somethingWrong = ref(false);
    const route = ref(null);

    try {
      route.value = useRoute();

      const resContract = await axios.get(baseURLcontracts + "/" + route.value.params.id)
      const resPlayer = await axios.get(baseURLplayers + "/" + resContract.data.playerId)
      const resClub = await axios.get(baseURLclubs)

      playerId.value = resPlayer.data.id
      firstName.value = resPlayer.data.firstName
      lastName.value = resPlayer.data.lastName
      startYear.value = resContract.data.startYear
      endYear.value = resContract.data.endYear
      matches.value = resContract.data.matches
      goals.value = resContract.data.goals
      clubs.value = resClub.data
      clubId.value= clubs.value[0].id

    } catch (e) {
      console.error(e);
    }

    async function getClubId(event, selectedIndex) {
      clubId.value = clubs.value[selectedIndex].id;
    }

    async function editContract(router) {
      try {
        if (endYear.value >= startYear.value && !isNaN(matches.value) && !isNaN(goals.value) && !isNaN(startYear.value) && !isNaN(endYear.value)) {
          await Promise.all([axios.patch(baseURLcontracts + "/" + route.value.params.id, {
            clubId: clubId.value,
            startYear: parseInt(startYear.value),
            endYear: parseInt(endYear.value),
            matches: parseInt(matches.value),
            goals: parseInt(goals.value),
          })]);
          await router.push({path: `/contractslist/${playerId.value}`});
        } else somethingWrong.value = true

      } catch (e) {
        console.error(e);
      }
    }

    return { route, firstName, lastName, clubs, playerId, startYear, endYear, matches, goals, clubId, club, somethingWrong, getClubId, editContract };
  },
}
</script>
