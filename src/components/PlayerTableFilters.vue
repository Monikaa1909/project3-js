<template>

  <div class="flex-row">
    <button v-if="moreOption===false" class="filter" @click="setMoreOptions">✚</button>
    <button v-else-if="moreOption===true" class="filter" @click="setMoreOptions">━</button>

    <select
        class="filter"
        @change="sort($event)">
      <option>Sort by firstname</option>
      <option>Sort by lastname</option>
      <option>Sort by country</option>
      <option>Sort by age</option>
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
        class="filter"
        @change="changeCareer($event)"
    >
      <option>All players</option>
      <option>Still playing</option>
      <option>Retirees</option>
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