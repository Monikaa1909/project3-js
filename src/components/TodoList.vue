<template>
  <div>
    <h1>TOP Players</h1>
    <input
        type="text"
        v-model="firstName"
        @keyup.enter="addPlayer"
        aria-label="Add a new player"
        placeholder="Add a new player"
    />
    <ul>
      <li
          v-for="player of players"
          :class="{ done: player.done }"
          :key="player.id"
          @click="doneTodo(player.id)"
      >
        {{ player.firstName }}
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
      firstName: ""
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
    async doneTodo(id) {
      try {
        await axios.patch(`${baseURL}/${id}`, {
          done: true
        });

        this.players = this.players.map(todo => {
          if (todo.id === id) {
            todo.done = true;
          }

          return todo;
        });
      } catch (e) {
        console.error(e);
      }
    },
    async addPlayer() {
      try {
        const res = await axios.post(baseURL, { firstName: this.firstname });

        this.players = [...this.players, res.data];

        this.firstName = "";
      } catch (e) {
        console.error(e);
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

.done {
  text-decoration: line-through;
}
</style>
