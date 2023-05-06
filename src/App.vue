<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
const locale = ref(zhCN);
</script>

<template>
  <ConfigProvider :locale="locale">
    <RouterView />
  </ConfigProvider>
</template>

<style scoped></style>
