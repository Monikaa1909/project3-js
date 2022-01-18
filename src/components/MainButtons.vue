<template>
  <div class="flex-row">
    <div class="w-1/5"></div>
    <button class="w-1/5" @click="toggleToAdd($router)">Add</button>
    <button class="w-1/5" @click="toggleToEdit($router)">Edit</button>
    <button class="w-1/5" @click="toggleToRemove($router)">Remove</button>
    <div class="w-1/5"></div>
  </div>
  <div class="h-10"></div>
</template>

<script>
export default {
  name: "MainButtons",
  props: {
    toggleToEdit: Function,
    toggleToRemove: Function,
    toggleToAdd: Function
  }
}
</script>
