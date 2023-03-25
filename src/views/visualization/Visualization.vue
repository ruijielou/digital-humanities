<script setup lang="ts">
import Header from "../../components/Header.vue";
</script>
<template>
  <div class="h-screen overflow-auto">
    <Header class="visualization-header" title="对人文学科重绘廓型" />
    <a-layout-content
      style="padding-top: 20px; padding-bottom: 20px"
      class="flex flex-col"
    >
    </a-layout-content>
  </div>
</template>
<style lang="less">
.visualization-header {
  background-image: url("../../assets/image/visualization-bg.png");
 
}
</style>
