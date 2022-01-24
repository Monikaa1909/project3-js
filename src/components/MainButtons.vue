<template>
  <div class="flex-row">
    <div class="w-1/5"></div>
    <button class="w-1/5" @click="toggleToAdd($router); toggleToAddContract($router, id)">Add</button>
    <button class="w-1/5" @click="toggleToEdit($router); toggleToEditContract($router, id)">Edit</button>
    <button class="w-1/5" @click="toggleToRemove($router); toggleToRemoveContract($router, id)">Remove</button>
    <div class="w-1/5"></div>
  </div>
  <div class="h-10"></div>
</template>

<script>
export default {
  name: "MainButtons",
  props: {
    toggleToEdit: {
      type: Function,
      default: () => ({})
    },
    toggleToRemove: {
      type: Function,
      default: () => ({})
    },
    toggleToAdd: {
      type: Function,
      default: () => ({})
    },
    toggleToEditContract: {
      type: Function,
      default: () => ({})
    },
    toggleToRemoveContract: {
      type: Function,
      default: () => ({})
    },
    toggleToAddContract: {
      type: Function,
      default: () => ({})
    },
    id: {
      type: String,
    }
  }
}
</script>
