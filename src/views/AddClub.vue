<template>
  <div>
    <div class="info" v-if="somethingWrong">Fill in the fields correctly</div>
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
        <label>Is champions league winner?</label>
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
        <button @click="$router.push('/clubs')" >Back to all clubs</button>
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

export default {
  name: "AddClub",

  data() {
    return {
      clubs: [],
      id: null,
      name: "",
      league: "",
      currentCoach: "",
      founded: null,
      championsLeagueWinner: null,
      ground: null,
      bools:  ['No', 'Yes'],
      somethingWrong: false
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
    async addClub(router) {
      var regExp = /[a-zA-Z]/g;

      if (this.name.length > 0 && !regExp.test(this.founded)) {
        try {
          await Promise.all([axios.post(baseURL, {
            id: this.id,
            name: this.name,
            league: this.league,
            currentCoach: this.currentCoach,
            founded: this.founded,
            ground: this.ground,
            championsLeagueWinner: this.championsLeagueWinner === null ? this.championsLeagueWinner = false : this.championsLeagueWinner === "true"
          })]);

          router.push('/clubs')
        } catch (e) {
          console.error(e);
        }
      } else this.somethingWrong = true
    }
  }
}
</script>
