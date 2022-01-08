<template>
  <div>
    <table id="playersTable">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Country</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="player of players"
            :class="{ retired: player.retired }"
            :key="player.id"
            @click="retiredPlayer(player.id)">
          <td>{{player.firstName}}</td>
          <td>{{player.lastName}}</td>
          <td>Tu będzie kraj pochodzenia</td>
          <td>{{player.age}}</td>
          <td>
            <button class="btn btn-edit" @click="toggleToEdit($router, player.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
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
    toggleToEdit(router, id) {
      router.push({ path: `/editplayer/${id}` });
    },

    async retiredPlayer(id) {
      try {
        await axios.patch(`${baseURL}/${id}`, {
          retired: true
        });

        this.players = this.players.map(player => {
          if (player.id === id) {
            player.retired = true;
          }

          return player;
        });
      } catch (e) {
        console.error(e);
      }
    },
  }
};
</script>

<style scoped>

input {
  width: 100%;
  padding: 1rem;
  border-radius: 0.4rem;
  border: 1px solid #fd9644;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

</style>
