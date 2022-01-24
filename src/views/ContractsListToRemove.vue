<template>
  <ContractTable
      class="editable"
      :toggleTo="toggleToRemove"
      :message="message"
      :label="label"/>
</template>

<script>

import ContractTable from "@/components/ContractTable";
import {ref} from "vue";

export default {
  name: "ContractsListToRemove",
  components: {
    ContractTable: ContractTable,
  },

  setup() {
    const message = ref('There are no contracts to remove')
    const label = ref('Select the contract you want to remove:')

    function toggleToRemove(router, id) {
      router.push({path: `/removecontract/${id}`});
    }

    return {message, label, toggleToRemove}
  },
}
</script>
