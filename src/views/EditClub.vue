<template>
  <div>
    <form @submit.prevent="editClub($router)">
      <input
          type="text" required
          v-model="name"
          aria-label="First name"
          placeholder="First name"
      />
      <input
          type="text" required
          v-model="league"
          aria-label="Second name"
          placeholder="Second name"
      />
      <input
          type="text" required
          v-model="founded"
          aria-label="Country"
          placeholder="Country"
      />
      <input
          type="text" required
          v-model="currentCoach"
          aria-label="Age"
          placeholder="Age"
      />
      <input
          type="text" required
          v-model="founded"
          aria-label="Retired"
          placeholder="Retired"
      />
      <input
          type="text" required
          v-model="championsLeagueWinner"
          aria-label="Retired"
          placeholder="Retired"
      />
      <input
          type="text" required
          v-model="ground"
          aria-label="Retired"
          placeholder="Retired"
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