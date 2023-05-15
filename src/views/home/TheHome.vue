<script setup lang="ts">
import Search from "../../components/Search.vue";
import { categoryList } from "../../utils/type";
</script>

<template>
  <a-layout class="home-container h-screen">
    <Header />
    <a-layout-content style="padding-top: 20px" class="flex flex-col">
      <div class="home-content">
        <h1 class="page-title">数字与人文交汇的时刻</h1>
        <h2 class="page-title-sub">Digital Humanities about Digital Humanities</h2>
        <Search />
      </div>
    </a-layout-content>
    <a-layout-footer
      class="flex p-0 position-relative home-footer"
      style="border-top: 1px solid rgba(255, 255, 255, 0.3)"
    >
      <div
        @click="$router.push({ name: item.name })"
        class="footer-item c-white flex-1 text-center"
        v-for="item in categoryList.filter(
          (a) => a.name !== 'Mine' && a.name !== 'home'
        )"
      >
        <span>{{ item.label }}</span>
      </div>
      <div
        class="home-copyright text-center c-white text-12px position-absolute"
      >
        Copyright © 2023
      </div>
    </a-layout-footer>
  </a-layout>
</template>
<style lang="less">
@import url(./home.less);
</style>
