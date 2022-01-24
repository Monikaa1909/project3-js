<template>
  <ContractTable
      class="editable"
      :toggleTo="toggleToEdit"
      :message="message"
      :label="label"/>
</template>

<script>

import ContractTable from "@/components/ContractTable";
import {ref} from "vue";

export default {
  name: "ContractsListToEdit",
  components: {
    ContractTable: ContractTable,
  },

  setup() {
    const message = ref('There are no contracts to edit')
    const label = ref('Select the contract you want to edit:')

    function toggleToEdit(router, id) {
      router.push({path: `/editcontract/${id}`});
    }

    return {message, label, toggleToEdit}
  },
}
</script>
