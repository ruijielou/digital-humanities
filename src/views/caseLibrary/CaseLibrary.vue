<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import LogoText from "../../components/LogoText.vue";
import Carousel from "./Carousel.vue";
import Card from "./Card.vue";
import GLAM from "../../assets/image/GLAM.png";
import { repository } from "@/api";

const cardData = ref<any>([]);
const spinning = ref<boolean>(false);

const getPage = async () => {
  spinning.value = true;
  const { result } = await repository.findRepositoryGroupIndex();
  if (result) {
    const firstCase = result.find((item) => item.title === "特选案例") || {};
    if (firstCase) {
      firstCase.isFirst = true;
    }
    cardData.value = [
      { ...firstCase },
      ...result.filter((item) => item.title !== "特选案例"),
    ];
  }
  spinning.value = false;
};
onMounted(() => {
  getPage();
});
</script>
<template>
  <div class="h-screen overflow-auto">
    <a-spin
      v-if="spinning"
      :spinning="spinning"
      class="position-center h-100"
    ></a-spin>
    <Header
      title="打开数字人文万花筒"
      bg-name="caselibrary-bg"
      class="caselibrary-header"
    />
    <a-layout-content style="padding-top: 20px" class="flex flex-col">
      <div
        class="case-container"
        v-for="(item, index) in cardData"
        :style="{
          backgroundImage:
            index != 0 && index % 2 == 1 ? `url(${GLAM})` : 'none',
        }"
      >
        <LogoText
          :style="{ color: index != 0 && index % 2 == 1 ? '#fff' : '' }"
          :text="item.title"
        />
        <div v-if="item.isFirst" class="case-referred case-group flex m-auto">
          <Card
            class="flex-3"
            v-if="item.repositoryList[0]"
            @click="
              $router.push({
                name: 'CaseDetail',
                params: { id: item.repositoryList[0].id },
              })
            "
            :no-show-number="true"
            :card="{ ...item.repositoryList[0], code: 1 }"
          />
          <div class="flex-2 flex flex-col">
            <template v-for="(card, cardIndex) in item.repositoryList">
              <Card
                class="flex-1"
                v-if="cardIndex != 0"
                @click="
                  $router.push({
                    name: 'CaseDetail',
                    params: { id: card.id },
                  })
                "
                :hoverCard="true"
                :no-show-number="true"
                :card="{ ...card, code: cardIndex + 1 }"
              />
            </template>
          </div>
        </div>
        <div v-else class="case-group flex m-auto">
          <Carousel>
            <template #cards>
              <div
                class="h-100%"
                v-for="(card, cardIndex) in item.repositoryList"
              >
                <Card
                  @click="
                    $router.push({
                      name: 'CaseDetail',
                      params: { id: card.id },
                    })
                  "
                  style="width: 25vw; height: 55vh"
                  :card="card"
                />
              </div>
            </template>
          </Carousel>
        </div>
      </div>
      <div class="more-container">
        <span class="border-btn" @click="$router.push({ name: 'MoreLibrary' })"
          >更多</span
        >
      </div>
    </a-layout-content>
    <Footer />
  </div>
</template>
<style lang="less">
.case-container {
  background-size: cover;
  background-position: center center;
  padding: 3em 0;
  & > .case-group {
    width: 80%;
    height: 60vh;
  }
}
.more-container {
  padding: 2em;
  text-align: center;
  color: white;
  font-size: 30px;
  background-image: url("../../assets/image/more-bg.png");
  background-size: cover;
  background-position: center center;
}
.border-btn {
  background-image: url("../../assets/image/border-btn.png");
  background-size: cover;
  background-position: center center;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
