<script setup lang="ts">
import { ref } from "vue";
import Card from "../caseLibrary/Card.vue";
import { cardData } from "../caseLibrary/mock";
</script>
<template>
  <div class="p-8 w-100% mycollection-manage">
    <div
      class="lines-purple flex justify-between"
    >
      <div
        class="flex items-center m-b-2"
      >
        <h2 class="m-0">我的收藏夹</h2>
      </div>
    </div>
    <div class=" p-t-4">
      <div class="case-group flex flex-wrap">
        <Card
          v-for="item in cardData"
          style="width: 31%; height: 50vh;margin:0 20px 20px 0;"
          :card="item"
        />
      </div>
    </div>
  </div>
</template>
<style lang="less">
.submission-manage {
  padding-bottom: 5em;

}
</style>
