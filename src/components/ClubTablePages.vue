<template>
  <div class="direction flex-row">
    <button v-if="page>0" class="page font-bold" @click="changePage(1)">&lt;&lt;</button>
    <button v-if="page===0" class="disPage font-bold">&lt;&lt;</button>

    <button v-if="page>0" class="page font-bold animate-bounce" @click="changePage(page)">&lt;</button>
    <button v-if="page===0" class="disPage font-bold">&lt;</button>

    <span
        v-for="n in pages"
        :key="n">
        <button
            v-if="page+1 !== n"
            class="page"
            @click="changePage(n)">
          {{n}}
        </button>
        <button
            v-if="page+1 === n"
            class="disPage">
          {{n}}
        </button>
      </span>

    <button v-if="page<pages-1" class="page font-bold animate-bounce" @click="changePage(page+2)">&gt;</button>
    <button v-if="page===pages-1" class="disPage font-bold" >&gt;</button>

    <button v-if="page<pages-1" class="page font-bold" @click="changePage(pages)">&gt;&gt;</button>
    <button v-if="page===pages-1" class="disPage font-bold" >&gt;&gt;</button>
    <div class="w-1/5"></div>
  </div>
</template>

<script>
export default {
  name: "ClubTablePages",
  props: {
    page: Number,
    pages: Number,
    changePage: Function
  }
}
</script>
