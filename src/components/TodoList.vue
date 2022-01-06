<template>
  <div>
    <h1>TOP Players</h1>
    <input
        type="text" required
        v-model="firstName"
        @keyup.enter="addPlayer"
        aria-label="First name"
        placeholder="First name"
    />
    <input
        type="text" required
        v-model="lastName"
        @keyup.enter="addPlayer"
        aria-label="Second name"
        placeholder="Second name"
    />
    <input
        type="text" required
        v-model="age"
        @keyup.enter="addPlayer"
        aria-label="Age"
        placeholder="Age"
    />
    <input
        type="text" required
        v-model="retired"
        @keyup.enter="addPlayer"
        aria-label="Retired"
        placeholder="Retired"
    />
    <ul>
      <li
          v-for="player of players"
          :class="{ retired: player.retired }"
          :key="player.id"
          @click="retiredPlayer(player.id)"
      >
        {{ player.firstName }} {{ player.lastName }} {{ player.age }} {{ player.retired }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3001/players";

export default {
  name: "PlayerList",
  data() {
    return {
      players: [],
      firstName: "",
      lastName: "",
      age: null,
      retired: null
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
    async retiredPlayer(id) {
      try {
        await axios.patch(`${baseURL}/${id}`, {
          retired: true
        });

        this.players = this.players.map(todo => {
          if (todo.id === id) {
            todo.retired = true;
          }

          return todo;
        });
      } catch (e) {
        console.error(e);
      }
    },

    async addPlayer() {
      if (this.firstName.length > 0 && !isNaN(this.age) && this.lastName.length > 0) {
        try {
          const res = await axios.post(baseURL, { firstName: this.firstName, lastName: this.lastName, age: this.age, retired: this.retired === null ? this.retired = false : this.retired === "true"});

          this.players = [...this.players, res.data];

          this.firstName = "";
          this.lastName = ""
          this.age = null
          this.retired = null
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
};
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
  padding: 1rem;
  border-radius: 0.4rem;
  border: 1px solid #fd9644;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.retired {
  text-decoration: line-through;
}
</style>
