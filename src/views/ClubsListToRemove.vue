<template>
  <ClubTable class="editable"
             :toggleTo="toggleToRemove"
             :message="message"
             :label="label">
  </ClubTable>
</template>

<script>

import ClubTable from "@/components/ClubTable";
import {ref} from "vue";

export default {
  name: "ClubsListToRemove",
  components: {
    ClubTable: ClubTable,
  },

  setup() {
    const message = ref('There are no clubs to remove')
    const label = ref('Select the club you want to remove:')

    function toggleToRemove(router, id) {
      router.push({path: `/removeclub/${id}`});
    }
    return { message, label, toggleToRemove}
  },
}

</script>
