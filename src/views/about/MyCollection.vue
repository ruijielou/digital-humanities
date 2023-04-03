<script setup lang="ts">
import { ref } from "vue";
import {favoritegroup} from "@/api";
import Card from "../caseLibrary/Card.vue";
const collectionDatamock = [
  {
    title: "默认收藏夹",
    caseNumber: 134,
    recentUpdates: "欧洲时光机",
    comments: [],
    image: "/src/assets/image/card2.png",
  },
  {
    title: "英国项目",
    caseNumber: 134,
    recentUpdates: "E人类",
    comments: [],
    image: "/src/assets/image/card.png",
  },
  {
    title: "数据可视化项目",
    caseNumber: 134,
    recentUpdates: "中国人民大学数字人文研究中心",
    comments: [],
    image: "/src/assets/image/card.png",
  },
];
const collectionData = ref<any[]>([]);
const getCollectionData = async () => {
  const {result} = await favoritegroup.myPage();
  collectionData.value = result?.records || [];
}


getCollectionData();
 </script>
<template>
  <div class="p-8 w-100% mycollection-manage">
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">我的收藏夹</h2>
      </div>
    </div>
    <div class="p-t-4">
      <div class="case-group flex flex-wrap">
        <Card
          v-for="item in collectionDatamock"
          :no-show-views="true"
          @click="$router.push({name: 'CollectionsClassify'})"
          style="width: 31%; height: 50vh; margin: 0 20px 20px 0"
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
