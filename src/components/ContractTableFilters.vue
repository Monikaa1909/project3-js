<template>
  <div class="flex-row">
    <select
        class="filter"
        @change="sort($event)">
      <option>Sort by years</option>
      <option>Sort by club</option>
      <option>Sort by matches</option>
      <option>Sort by goals</option>
    </select>
    <div class="w-1/5"></div>
  </div>
</template>

<script>
export default {
  name: "DetailTableFilters",
  props: {
    sort: Function,
  }
}
</script>
