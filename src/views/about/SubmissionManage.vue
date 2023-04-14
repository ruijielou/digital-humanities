<script setup lang="ts">
import { ref } from "vue";
import Card from "../caseLibrary/Card.vue";
import { cardData } from "../caseLibrary/mock";
import Carousel from "../caseLibrary/Carousel.vue";
import MyCaseList from "./MyCaseList.vue";
import {repository} from "@/api"
enum CaseType {
  MyCase, //我的案例
  CaseLibrary, //我的案例库
}
const currentType = ref<number>(CaseType.CaseLibrary);

const cardData = ref<any>([])
const getCaseData = async () => {
  const {result } = await repository.myPage();
  cardData.value = result;
}
getCaseData();

</script>
<template>
  <div class="p-8 w-100% submission-manage">
    <div
      class="lines-purple flex justify-between"
      :class="{ left100: currentType === CaseType.MyCase }"
    >
      <div
        class="flex items-center m-b-2"
        v-if="currentType === CaseType.CaseLibrary"
      >
        <h2 class="m-0">我的案例库</h2>
        <span
          class="m-l-4 cursor-pointer"
          @click="currentType = CaseType.MyCase"
          >我的案例</span
        >
      </div>
      <div
        class="flex items-center m-b-2"
        v-if="currentType === CaseType.MyCase"
      >
        <span
          class="m-r-4 cursor-pointer"
          @click="currentType = CaseType.CaseLibrary"
          >我的案例库</span
        >
        <h2 class="m-0">我的案例</h2>
      </div>
    </div>
    <div v-if="currentType === CaseType.MyCase">
    <MyCaseList/>
    </div>
    <template v-else>
      <div class="case-container p-t-4" v-for="item in cardData">
        <span class="line-title text-4.5">
          <span>{{item.title}}</span>
        </span>
        <div class="case-group">
          <Carousel class="arrowTop">
            <template #cards>
              <div class="h-100%" v-for="card in item.repositoryList">
                <Card
                  @click="$router.push({ name: 'MyCaseLibraryList', params: {id: card.id} })"
                  style="width: 22vw; height: 50vh"
                  :card="card"
                />
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="less">
.submission-manage {
  padding-bottom: 5em;
  .lines-purple {
    &.left100 {
      &:before {
        left: 80px;
      }
    }
  }
  .case-container {
    height: 60vh;
    overflow: hidden;
    .case-group {
      width: 100%;
    }
  }
}
</style>
