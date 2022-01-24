<template>
  <PlayerTable
      class="editable"
      :toggleTo="toggleToRemove"
      :message="message"
      :label="label"/>
</template>

<script>

import PlayerTable from "@/components/PlayerTable";
import {ref} from "vue";

export default {
  name: "PlayersToRemove",
  components: {
    PlayerTable: PlayerTable,
  },

  setup() {
    const message = ref('There are no players to remove')
    const label = ref('Select a player you want to remove:')

    function toggleToRemove(router, id) {
      router.push({path: `/removeplayer/${id}`});
    }
    return { message, label, toggleToRemove}
  }
};
</script>
