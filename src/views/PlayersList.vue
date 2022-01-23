<template>
  <div>
    <PlayerTable class="mainPlayers"
                 :toggleToDeatil="toggleToDetail"
                 :message="message"/>
    <MainButtons
        :toggleToEdit="toggleToEdit"
        :toggleToRemove="toggleToRemove"
        :toggleToAdd="toggleToAdd"/>
  </div>
</template>

<script>

import PlayerTable from "@/components/PlayerTable";
import MainButtons from "@/components/MainButtons";
import {ref} from "vue";

export default {

name: "ClubsList",
components: {
PlayerTable: PlayerTable,
MainButtons: MainButtons
},

  setup() {
    const message = ref('There are no players')

    function toggleToDetail(router, id) {
      router.push({path: `/playerdetail/${id}`});
    }

    function toggleToAdd(router) {

      router.push('addplayer');
    }

    function toggleToEdit(router) {
      router.push('playerstoedit');
    }

    function toggleToRemove(router) {
      router.push('playerstoremove');
    }

    return {message, toggleToAdd, toggleToEdit, toggleToRemove, toggleToDetail}
  }
};

</script>


