<script setup lang="ts">
import { ref } from "vue";
import {
  SearchOutlined,
  DownOutlined,
  DoubleRightOutlined,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons-vue";
import Labels from "./Labels.vue";

const searchFields = ref<string>("");
const showLabels = ref<boolean>(false);

const changeShowLabels = () => {
  showLabels.value = !showLabels.value;
};
</script>
<template>
  <div class="flex items-center justify-center">
    <a-input
      class="transparent-input"
      size="large"
      v-model:value="searchFields"
      style="width: 50%"
    >
      <template #addonBefore>
        <div class="cursor-pointer" @click="changeShowLabels">
          全部
          <DownOutlined v-if="!showLabels" />
          <UpOutlined v-else />
        </div>
      </template>
      <template #addonAfter>
        <div class="cursor-pointer" style="width: 80px">
          <SearchOutlined />
          搜索
        </div>
      </template>
    </a-input>
    <span class="c-white p-l-4 cursor-pointer" @click="changeShowLabels">
      高级检索
      <double-right-outlined />
    </span>
  </div>
  <div class="content-text-wrapper flex justify-center p-4">
    <div class="text-wrapper flex-col">
      <span class="text">GLAM数据库</span>
    </div>
    <div class="text-wrapper flex-col">
      <span class="text">数字人文会议获奖项目数据库</span>
    </div>
    <div class="text-wrapper flex-col">
      <span class="text">高校数字人文研究项目分库</span>
    </div>
    <div class="text-wrapper flex-col" @click="changeShowLabels">
      <span class="text">
        <right-outlined />
      </span>
    </div>
  </div>
  <Labels v-if="showLabels" />
</template>
