<script lang="ts" setup>
import PersonCard from "./PersonCard.vue";
</script>
<template>
  <div class="h-screen overflow-auto advanced-search">
    <Header
      class="about-header"
      bg-name="about-bg"
      title="个人中心"
    />
    <PersonCard />
    <a-layout-content
      class="flex bg-#f7f7f7"
      style="min-height: calc(100% - 20vh);padding-left: 360px;"
    >
      <div class="flex-1 bg-#fff w-100%" >
        <router-view></router-view>
      </div>
    </a-layout-content>
    <Footer />
  </div>
</template>
