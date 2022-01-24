<template>
  <div>
    <ContractTable class="tableNoPointers"
                 :message="message"
                 />

    <MainButtons
        :toggleToEditContract="toggleToEdit"
        :toggleToRemoveContract="toggleToRemove"
        :toggleToAddContract="toggleToAdd"
        :id="playerId"/>

  </div>
</template>

<script>

import ContractTable from "@/components/ContractTable";
import MainButtons from "@/components/MainButtons";

import {ref} from "vue";
import { useRoute } from 'vue-router'

export default {
  name: "PlayerDetail",
  components: {
    ContractTable: ContractTable,
    MainButtons: MainButtons,
  },

  setup() {
    const message = ref('There are no contracts')
    const route = ref(null);
    const playerId = ref(null);

    route.value = useRoute();
    playerId.value = route.value.params.id;

    function toggleToAdd(router, id) {
      router.push({path: `/addcontract/${id}`});
    }

    function toggleToEdit(router, id) {
      router.push({path: `/contractstoedit/${id}`})
    }

    function toggleToRemove(router, id) {
      router.push({path: `/contractstoremove/${id}`});
    }

    return { message, playerId, toggleToAdd, toggleToEdit, toggleToRemove }
  }
}
</script>
