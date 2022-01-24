<template>
  <PlayerTable
      class="editable"
      :toggleTo="toggleToEdit"
      :message="message"
      :label="label"/>
</template>

<script>

import PlayerTable from "@/components/PlayerTable";
import {ref} from "vue";

export default {
  name: "PlayersListToEdit",
  components: {
    PlayerTable: PlayerTable,
  },

  setup() {
    const message = ref('There are no players to edit')
    const label = ref('Select a player you want to edit:')

    function toggleToEdit(router, id) {
      router.push({path: `/editplayer/${id}`});
    }
    return {message, label, toggleToEdit}
  }
}
</script>
