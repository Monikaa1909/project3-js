<template>
    <ClubTable class="editable"
      :toggleTo="toggleToEdit"
      :message="message"
      :label="label"/>
</template>

<script>

import ClubTable from "@/components/ClubTable";
import {ref} from "vue";

export default {
  name: "ClubsListToEdit",
  components: {
    ClubTable: ClubTable,
  },

  setup() {
    const message = ref('There are no clubs to edit')
    const label = ref('Select the club you want to edit:')

    function toggleToEdit(router, id) {
      router.push({path: `/editclub/${id}`});
    }
    return {message, label, toggleToEdit}
  },
}

</script>
