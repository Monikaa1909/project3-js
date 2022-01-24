<template>
  <div>
    <div class="info" v-if="somethingWrong">Fill in the fields correctly</div>
    <div class="info" v-else ></div>

    <form @submit.prevent="addClub($router)">
      <div class="editfield flex-row">
        <label class="editlabel">Name:</label>
        <input
            type="text" required
            v-model="name"
            aria-label="Name"
            placeholder="Name"
        />
      </div>
      <div class="editfield flex-row">
        <label>League:</label>
        <input
            type="text" required
            v-model="league"
            aria-label="League"
            placeholder="League"
        />
      </div>
      <div class="editfield flex-row">
        <label >Founded:</label>
        <input
            type="text" required
            v-model="founded"
            aria-label="Founded"
            placeholder="Founded"
        />
      </div>
      <div class="editfield flex-row">
        <label >Current coach:</label>
        <input
            type="text" required
            v-model="currentCoach"
            aria-label="Current Coach"
            placeholder="Current Coach"
        />
      </div>
      <div class="editfield flex-row">
        <label>Is CL winner?</label>
        <select
            class="appearance-none"
            v-model="championsLeagueWinner"
            aria-label="Is champions league winner?"
            placeholder="Is champions league winner?">
          <option v-for="bool in bools" v-bind:key=bool :value="bool">{{bool}}</option>
        </select>
      </div>
      <div class="editfield flex-row">
        <label >Ground:</label>
        <input
            v-model="ground"
            aria-label="Ground"
            placeholder="Ground"
        />
      </div>

      <div class="flex-row">
        <div class="w-1/5"></div>
        <button @click="$router.push('/clubs')">Back to all clubs</button>
        <button class="submit" >Add</button>
        <div class="w-1/5"></div>
      </div>
      <div class="h-10"></div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/clubs";
import {ref} from "vue";

export default {
  name: "AddClub",

  async setup() {
    const clubs = ref(null);
    const id = ref(null);
    const name = ref('');
    const league = ref('');
    const currentCoach = ref('');
    const founded = ref(null);
    const championsLeagueWinner = ref(null);
    const ground = ref(null);
    const bools = ref(['No', 'Yes']);
    const somethingWrong = ref(false);

    async function addClub(router) {
      const regExp = /[a-zA-Z]/g;

      if (name.value.length > 0 && !regExp.test(founded.value)) {
        try {
          await Promise.all([axios.post(baseURL, {
            id: id.value,
            name: name.value,
            league: league.value,
            currentCoach: currentCoach.value,
            founded: founded.value,
            ground: ground.value,
            championsLeagueWinner: championsLeagueWinner.value === null ? championsLeagueWinner.value = false : championsLeagueWinner.value === "true"
          })]);
          router.push('/clubs')
        } catch (e) {
          console.error(e);
        }
      } else {
        somethingWrong.value = true;
      }
    }

    return { clubs, id, name, league, currentCoach, founded, championsLeagueWinner, ground, bools, somethingWrong, addClub};
  },
}
</script>
