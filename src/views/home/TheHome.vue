<script setup lang="ts">
import { ref } from "vue";
import LogoIcon from "../../components/LogoIcon.vue";
import Search from "../../components/Search.vue";
import Header from "../../components/Header.vue";
import {categoryList,CategoryType} from "../../utils/type"


const visible = ref<boolean>(false);
const visibleType = ref<number>(0);

const changeVisibile = (type: number) => {
  visibleType.value = type;
  visible.value = !visible.value;
};
</script>

<template>
  <a-layout class="home-container h-screen">
    <Header/>
    <a-layout-content style="padding-top: 20px" class="flex flex-col">
      <div class="home-content">
        <h1 class="page-title">数字与人文交汇的时刻</h1>
        <Search />
        
      </div>
      
    </a-layout-content>
    <a-layout-footer
      class="flex p-t-4 p-b-4"
      style="border-top: 1px solid rgba(255, 255, 255, 0.3)"
    >
      <div class="footer-item c-white flex-1 text-center">
        <span
          class="cursor-pointer"
          @click="changeVisibile(CategoryType.CaseLibrary)"
          >案例库</span
        >
      </div>
      <div class="footer-item c-white flex-1 text-center">
        <span
          class="cursor-pointer"
          @click="changeVisibile(CategoryType.CaseSpectrum)"
          >案例谱</span
        >
      </div>
      <div class="footer-item c-white flex-1 text-center">
        <span
          class="cursor-pointer"
          @click="changeVisibile(CategoryType.Visualization)"
          >可视化</span
        >
      </div>
    </a-layout-footer>
    <a-drawer
      placement="left"
      :closable="false"
      :visible="visible"
      @close="changeVisibile"
    >
      <div class="draw-content text-center h-100% flex flex-col">
        <LogoIcon />
        <h4 class="title">数字人文多媒体案例资源库</h4>
        <div
          class="draw-category text-left flex-1 flex flex-col justify-center"
        >
          <div
            class="category-item cursor-pointer"
            v-for="item in categoryList"
            :key="item.name"
            @click="$router.push({ name: item.name })"
            :class="{ active: visibleType === item.type }"
          >
            <span class="line"></span>
            <span class="m-l-2">
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </a-drawer>
  </a-layout>
</template>
<style lang="less">
@import url(./home.less);
</style>
