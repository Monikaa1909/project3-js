<template>

  <div class="flex-row">
    <button v-if="moreOption===false" class="filter" @click="setMoreOptions">✚</button>
    <button v-else-if="moreOption===true" class="filter" @click="setMoreOptions">━</button>

    <select
        class="filter"
        @change="sort($event)">
      <option>Sort by name</option>
      <option>Sort by league</option>
      <option>Sort by coach</option>
      <option>Sort by founded</option>
      <option>Sort by ground</option>
    </select>

    <input type="text"
           class="filter"
           placeholder="Search by yourself 🔍"
           value=""
           @keyup.enter="search($event)"
    />
    <div class="w-1/5"></div>
  </div>
  <div class="flex-row"
       v-if="moreOption===true">
    <select
        @change="changeLeague($event)"
        class="filter">
      <option>retireds</option>
      <option
          v-for="retired in retireds"
          v-bind:key="retired">
        {{ retired }}
      </option>
    </select>
  </div></template>

<script>
export default {
  name: "PlayerTableFilters",
  props: {
    sort: Function,
    moreOption: Boolean,
    setMoreOptions: Function,
    search: Function,
    changeCareer: Function,
    retireds: Array
  }
}
</script>

<style scoped>

</style>