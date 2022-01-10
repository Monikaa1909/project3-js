<template>
  <div id="nav">
    <router-link to="/">TOP players</router-link> |
    <router-link to="/teams">TOP teams</router-link>
  </div>

  <div class="flex flex-col">
    <div class="h-5"></div>
    <div class="flex flex-row">
      <div class="w-1/5"></div>
      <router-view id="router-view"/>
      <div class="w-1/5"></div>
    </div>

    <div class="h-10"></div>
  </div>


  <div id="end"></div>
</template>
