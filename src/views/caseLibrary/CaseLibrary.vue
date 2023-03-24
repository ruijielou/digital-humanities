<script setup lang="ts">
import Header from "../../components/Header.vue";
import LogoText from "../../components/LogoText.vue";

</script>
<template>
  <div class="h-screen overflow-auto">
    <Header class="caselibrary-header" />
    <a-layout-content style="padding-top: 20px; padding-bottom: 20px" class="flex flex-col">
      <LogoText text="特选案例" />

    </a-layout-content>
  </div>
</template>
<style lang="less">
.caselibrary-header {
  background-image: url("../../assets/image/caselibrary-bg.png");
  background-size: cover;
  background-position: center center;
}
</style>