<template>
  <div id="nav">
    <router-link to="/">TOP players</router-link> |
    <router-link to="/clubs">TOP teams</router-link>
  </div>

  <div class="flex flex-col">
    <div class="h-5"></div>
    <div class="flex flex-row">
      <div class="w-1/5"></div>
      <router-view v-slot="{ Component }" id="router-view">
        <template v-if="Component">
<!--          <transition mode="out-in">-->
<!--            <keep-alive>-->
              <suspense>
                <component :is="Component"></component>
                <template #fallback>
                  <div>
                    <LoadingComponent/>
                  </div>
                </template>
              </suspense>
<!--            </keep-alive>-->
<!--          </transition>-->
        </template>
      </router-view>
      <div class="w-1/5"></div>
    </div>

    <div class="h-10"></div>
  </div>


  <div id="end"></div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent";

export default {
  components: {
    LoadingComponent: LoadingComponent
  }
}
</script>
