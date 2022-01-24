<template>
  <div>
    <ClubTable class="tableNoPointers"
               :message="message"/>
    <MainButtons
        :toggleToEdit="toggleToEdit"
        :toggleToRemove="toggleToRemove"
        :toggleToAdd="toggleToAdd"/>
  </div>
</template>

<script>

import ClubTable from "@/components/ClubTable";
import MainButtons from "@/components/MainButtons";
import {ref} from "vue";

export default {
  name: "ClubsList",
  components: {
    ClubTable: ClubTable,
    MainButtons: MainButtons
  },

  setup() {
    const message = ref('There are no clubs')

    function toggleToAdd(router) {
      router.push('addclub');
    }

    function toggleToEdit(router) {
      router.push('clubstoedit');
    }

    function toggleToRemove(router) {
      router.push('clubstoremove');
    }

    return { message, toggleToAdd, toggleToEdit, toggleToRemove }
  }
};

</script>


