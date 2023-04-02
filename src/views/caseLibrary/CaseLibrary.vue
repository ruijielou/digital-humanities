<script setup lang="ts">
import { onMounted } from "vue"
import LogoText from "../../components/LogoText.vue";
import Carousel from "./Carousel.vue"
import Card from "./Card.vue";
import GLAM from "../../assets/image/GLAM.png";
import {repository} from "@/api"

import { caseReferred, cardData } from "./mock";

const getPage = async () => {
  const result = await repository.page()
}
onMounted(() => {
  getPage();
})

</script>
<template>
  <div class="h-screen overflow-auto">
    <Header title="打开数字人文万花筒" bg-name="caselibrary-bg" class="caselibrary-header" />
    <a-layout-content
      style="padding-top: 20px;"
      class="flex flex-col"
    >
      <div class="case-container">
        <LogoText text="特选案例" />
        <div class="case-referred case-group flex m-auto">
          <Card class="flex-3"  @click="$router.push({name: 'CaseDetail'})" :no-show-number="true" :card="caseReferred[0]" />
          <div class="flex-2 flex flex-col">
            <Card
              class="flex-1"
              @click="$router.push({name: 'CaseDetail'})"
              :hoverCard="true"
              :no-show-number="true"
              :card="caseReferred[1]"
            />
            <Card
            @click="$router.push({name: 'CaseDetail'})"
              class="flex-1"
              :hoverCard="true"
              :no-show-number="true"
              :card="caseReferred[2]"
            />
          </div>
        </div>
      </div>

      <div class="case-container" :style="{ backgroundImage: `url(${GLAM})` }">
        <LogoText style="color: #fff" text="数字GLAM" />
        <div class="case-group flex m-auto">
          <Carousel>
            <template #cards>
              <div class="h-100%" v-for="item in cardData">
                <Card  @click="$router.push({name: 'CaseDetail'})" style="width: 25vw; height: 55vh" :card="item" />
              </div>
            </template>
          </Carousel>
        </div>
      </div>
      <div class="case-container">
        <LogoText text="研究领域" />
        <div class="case-group flex m-auto">
          <Carousel :hover-dark="true">
            <template #cards>
              <div class="h-100%" v-for="item in cardData">
                <Card  @click="$router.push({name: 'CaseDetail'})" style="width: 25vw; height: 55vh" :card="item" />
              </div>
            </template>
          </Carousel>
        </div>
      </div>

      <div class="case-container" :style="{ backgroundImage: `url(${GLAM})` }">
        <LogoText style="color: #fff" text="机构平台" />
        <div class="case-group flex m-auto">
          <Carousel>
            <template #cards>
              <div class="h-100%" v-for="item in cardData">
                <Card style="width: 25vw; height: 55vh" :card="item" />
              </div>
            </template>
          </Carousel>
        </div>
      </div>
      <div class="case-container">
        <LogoText text="基础设置" />
        <div class="case-group flex m-auto">
          <Carousel>
            <template #cards>
              <div class="h-100%" v-for="item in cardData">
                <Card style="width: 25vw; height: 55vh" :card="item" />
              </div>
            </template>
          </Carousel>
        </div>
      </div>
      <div class="more-container">
        <span class="border-btn" @click="$router.push({name: 'MoreLibrary'})">更多</span>
      </div>
    </a-layout-content>
    <Footer />
  </div>
</template>
<style lang="less">
// .caselibrary-header {
  // background-image: url("../../assets/image/caselibrary-bg.png");
// }
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
