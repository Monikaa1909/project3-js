<template>
  <div>
    <form @submit.prevent="editPlayer($router)">
      <input
          type="text" required
          v-model="firstName"
          aria-label="First name"
          placeholder="First name"
      />
      <input
          type="text" required
          v-model="lastName"
          aria-label="Second name"
          placeholder="Second name"
      />
      <input
          type="text" required
          v-model="age"
          aria-label="Age"
          placeholder="Age"
      />
      <input
          type="text" required
          v-model="retired"
          aria-label="Retired"
          placeholder="Retired"
      />
      <div>
        <button class="submit" >Back to all players</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import PlayersList from "@/components/PlayersList";
const baseURL = "http://localhost:3001/players";

export default {
  name: "EditPlayer",

  data() {
    return {
      players: [],
      id: null,
      firstName: "",
      lastName: "",
      age: null,
      retired: null
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'playerLists': PlayersList,
  },
  async created() {
    try {

      console.log('Params: ', this.$route.params.id);
      const res = await axios.get(baseURL + "/" + this.$route.params.id)

      this.id = res.data.id
      this.firstName = res.data.firstName
      this.lastName = res.data.lastName
      this.age = res.data.age
      this.retired = res.data.retired
      // const res = await axios.get(baseURL);
      // this.players = res.data;
      // console.log()
      // this.id = 3
      // this.firstName = "yolo"
      // this.lastName = "XD"
      // this.age = 32
      // this.retired = false
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
     async showPlayer(id) {
      this.edit = true

      //  await axios.get(baseURL + "/" + id, function (data) {
      //   this.id = data.id
      //   this.firstName = data.firstName
      //   this.lastName = data.lastName
      //   this.age = data.age
      //   this.retired = data.retired
      // })
       console.log(id)
       console.log("udało się podmienić")
       console.log("to id" + this.id)
       console.log(this.firstName)
    },

    async editPlayer(router) {
      console.log(this.age)
      console.log(this.lastName)
      console.log(this.firstName)
      if (this.firstName.length > 0 && !isNaN(this.age) && this.lastName.length > 0) {
        try {
          const [res] = await Promise.all([axios.patch(baseURL + "/" + this.id, {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            retired: this.retired === null ? this.retired = false : this.retired === "true"
          })]);

          // this.players = [...this.players, res.data]
          this.players[this.id] = res.data

          this.firstName = "";
          this.lastName = ""
          this.age = null
          this.retired = null
        } catch (e) {
          console.error(e);
        }

        router.push('/')
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