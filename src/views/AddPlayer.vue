<template>
  <div>
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
<!--    TODO: trzeba zrobić tak żeby to przycisk zatwierdzał dane i jednocześnie cofał na główną z zawodnikami, nie enter-->

    <router-link to="/">Back to all players</router-link>
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

  // computed: {
  //   currentView() {
  //     return this.view
  //   }
  // },

  async created() {
    try {
      const res = await axios.get(baseURL);

      this.players = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    // async retiredPlayer(id) {
    //   try {
    //     await axios.patch(`${baseURL}/${id}`, {
    //       retired: true
    //     });
    //
    //     this.players = this.players.map(player => {
    //       if (player.id === id) {
    //         player.retired = true;
    //       }
    //
    //       return player;
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },

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

tr {
  font-size: 2rem;
}

td {
  padding: 0 4rem;
  font-size: 1rem;
}
</style>
