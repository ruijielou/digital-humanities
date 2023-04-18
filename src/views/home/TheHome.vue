<script setup lang="ts">
import { ref } from "vue";
import Search from "../../components/Search.vue";
import {categoryList} from "../../utils/type"

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
      <div class="footer-item c-white flex-1 text-center" v-for="item in categoryList.filter(a=>a.name !== 'About' && a.name !== 'home')">
        <span
          class="cursor-pointer"
          @click="$router.push({name: item.name})"
          >{{item.label}}</span
        >
      </div>
    </a-layout-footer>
  </a-layout>
</template>
<style lang="less">
@import url(./home.less);
</style>
