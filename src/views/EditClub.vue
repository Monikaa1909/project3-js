<template>
  <div>
    <div class="info" v-if="somethingWrong">Fill in the fields correctly</div>
    <div class="info" v-else ></div>

    <form @submit.prevent="editClub($router)">
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
            placeholder="Ground"/>
      </div>
      <div>
        <button class="submit" >Done</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from "vue";
const baseURL = "http://localhost:3001/clubs";
import { useRoute } from 'vue-router'

export default {
  name: "EditClub",
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
    const route = ref(null);

    try {
      route.value = useRoute();
      const res = await axios.get(baseURL + "/" + route.value.params.id)
      id.value = res.data.id;
      name.value = res.data.name;
      league.value = res.data.league;
      currentCoach.value = res.data.currentCoach;
      founded.value = res.data.founded;
      championsLeagueWinner.value = res.data.championsLeagueWinner === true ? 'Yes' : 'No'
      ground.value = res.data.ground;

    } catch (e) {
      console.error(e);
    }

    async function editClub(router) {
      const regExp = /[a-zA-Z]/g;

      if (name.value.length > 0 && !regExp.test(founded.value)) {
        try {
          await Promise.all([axios.patch(baseURL + "/" + id.value, {
            id: id.value,
            name: name.value,
            league: league.value,
            currentCoach: currentCoach.value,
            founded: founded.value,
            ground: ground.value,
            championsLeagueWinner: championsLeagueWinner.value === "No" ? championsLeagueWinner.value = false : championsLeagueWinner.value = true
          })]);

          router.push('/clubs')
        } catch (e) {
          console.error(e);
        }
      } else somethingWrong.value = true
    }

    return { clubs, id, name, league, currentCoach, founded, championsLeagueWinner, ground, bools, somethingWrong, route, editClub};
  },

}
</script>
