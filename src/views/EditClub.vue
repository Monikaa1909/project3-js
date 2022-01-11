<template>
  <div>
    <div class="info"></div>
    <div class="h-5"></div>
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
        <label>Is champions league winner?</label>
          <select
              class="appearance-none"
              v-model="championsLeagueWinner"
              aria-label="Is champions league winner?"
              placeholder="Is champions league winner?">
            <option>Yes</option>
            <option>No</option>
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
      <div>
        <button class="submit" >Done</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/clubs";

export default {
  name: "EditClub",

  data() {
    return {
      clubs: [],
      id: null,
      name: "",
      league: "",
      currentCoach: "",
      founded: null,
      championsLeagueWinner: null,
      ground: null
    };
  },

  async created() {
    try {

      console.log('Params: ', this.$route.params.id);
      const res = await axios.get(baseURL + "/" + this.$route.params.id)

      this.id = res.data.id;
      this.name = res.data.name;
      this.league = res.data.league;
      this.currentCoach = res.data.currentCoach;

      this.founded = res.data.founded;
      this.championsLeagueWinner = res.data.championsLeagueWinner;
      this.ground = res.data.ground;

    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async editClub(router) {
      if (this.name.length > 0) {
        try {
          await Promise.all([axios.patch(baseURL + "/" + this.id, {
            id: this.id,
            name: this.name,
            league: this.league,
            currentCoach: this.currentCoach,
            founded: this.founded,
            ground: this.ground,
            championsLeagueWinner: this.championsLeagueWinner === "No" ? this.championsLeagueWinner = false : this.championsLeagueWinner = true
          })]);

          router.push('/clubs')
        } catch (e) {
          console.error(e);
        }

      }
    }
  }
}
</script>
