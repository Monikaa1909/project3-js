<template>
  <div>
    <form @submit.prevent="addClub($router)">
      <input
          type="text" required
          v-model="name"
          aria-label="Name"
          placeholder="Name"
      />
      <input
          type="text" required
          v-model="league"
          aria-label="League"
          placeholder="League"
      />
      <input
          type="text" required
          v-model="founded"
          aria-label="Founded"
          placeholder="Founded"
      />
      <input
          type="text" required
          v-model="currentCoach"
          aria-label="Current Coach"
          placeholder="Current Coach"
      />
      <input
          type="text" required
          v-model="championsLeagueWinner"
          aria-label="Is champions league winner?"
          placeholder="Is champions league winner?"
      />
      <input
          type="text" required
          v-model="ground"
          aria-label="Ground"
          placeholder="Ground"
      />
      <div>
        <button class="submit" >Back to all clubs</button>
      </div>
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
      ground: null
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
      if (this.name.length > 0) {
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
      }
    }
  }
}
</script>

<style scoped>
h1 {
  text-decoration: underline;
}

li {
  color: white;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid #fd9644;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.retired {
  text-decoration: line-through;
}

tr {
  font-size: 2rem;
}

td {
  padding: 0 4rem;
  font-size: 1rem;
}

</style>