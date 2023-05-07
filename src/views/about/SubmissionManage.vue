<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Card from "../caseLibrary/Card.vue";
import Carousel from "../caseLibrary/Carousel.vue";
import MyCaseList from "./MyCaseList.vue";
import { repository } from "@/api";
import { useRoute,useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

enum CaseType {
  MyCase = "mycase", //我的案例
  CaseLibrary = "caseLibrary", //我的案例库
}
const currentType = ref<CaseType>(CaseType.CaseLibrary);

const cardData = ref<any>([]);
const getCaseData = async () => {
  const { result } = await repository.myPage();
  cardData.value = result;
};
getCaseData();

const checkCaseType = (type: CaseType) => {
  // currentType.value = type;
  router.push({name: route.name as string, query: {tab: type}})
}

onMounted(() => {
  // route.query?.tab && (currentType.value = route.query?.tab as CaseType);
});
watch(
  route,
  (to, from) => {
    to.query?.tab && (currentType.value = to.query?.tab as CaseType);
  },
  { immediate: true } // 如果要立即执行一次，请添加此选项
);
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
          @click="checkCaseType(CaseType.MyCase)"
          >我的案例</span
        >
      </div>
      <div
        class="flex items-center m-b-2"
        v-if="currentType === CaseType.MyCase"
      >
        <span
          class="m-r-4 cursor-pointer"
          @click="checkCaseType(CaseType.CaseLibrary)"
          >我的案例库</span
        >
        <h2 class="m-0">我的案例</h2>
      </div>
    </div>
    <div v-if="currentType === CaseType.MyCase">
      <MyCaseList />
    </div>
    <template v-else>
      <template v-for="item in cardData">
        <div class="case-container p-t-4" v-if="item.repositoryList">
          <span class="line-title text-4.5">
            <span>{{ item.title }}</span>
          </span>
          <div class="case-group m-t-2">
            <Carousel class="arrowTop">
              <template #cards>
                <div
                  class="h-100% submission-card"
                  v-for="card in item.repositoryList"
                >
                  <Card
                    @click="
                      $router.push({
                        name: 'MyCaseLibraryList',
                        params: { id: card.id },
                      })
                    "
                    style="width: 22vw; height: 416px"
                    :card="card"
                  />
                </div>
              </template>
            </Carousel>
          </div>
        </div>
      </template>
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
    height: 460px;
    overflow: hidden;
    .case-group {
      width: 100%;
    }
  }
  .submission-card {
    .card-image {
      height: 67% !important;
    }
  }
}
</style>
