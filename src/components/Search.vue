<script setup lang="ts">
import { ref } from "vue";
import {
  SearchOutlined,
  DoubleRightOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import Labels from "./Labels.vue";

const searchFields = ref<string>("");
const showLabels = ref<boolean>(false);
const searchType = ref<number>(0);

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
        <div class="cursor-pointer">
          <a-select v-model:value="searchType">
            <a-select-option :value="0">全部</a-select-option>
            <a-select-option :value="1">关键词</a-select-option>
            <a-select-option :value="2">标签</a-select-option>
            <a-select-option :value="3">全文</a-select-option>
          </a-select>
        </div>
      </template>
      <template #addonAfter>
        <div class="cursor-pointer" style="width: 80px">
          <SearchOutlined />
          搜索
        </div>
      </template>
    </a-input>
    <span class="c-white p-l-4 cursor-pointer" @click="$router.push({name: 'AdvancedSearch'})">
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
    <div class="text-wrapper flex-col">
      <span class="text">
        <right-outlined />
      </span>
    </div>
  </div>
  <Labels v-if="searchType" @setSearch="(val: string) => searchFields = val" />
  <div class="flex justify-center flex-1 items-end">
    <div class="class-item">
      <span class="c-white" @click="$router.push({name: 'Visualization'})">分布谱</span>
    </div>
    <div class="class-item">
      <span class="c-white" @click="$router.push({name: 'Visualization'})"> 时间谱</span>
    </div>
    <div class="class-item">
      <span class="c-white" @click="$router.push({name: 'Visualization'})">合作谱</span>
    </div>
    <div class="class-item">
      <span class="c-white" @click="$router.push({name: 'Visualization'})">知识图谱</span>
    </div>
    <div class="class-item">
      <span class="c-white" @click="$router.push({name: 'Visualization'})">主题词谱</span>
    </div>
  </div>
</template>
<style lang="less">
.content-text-wrapper {
  .text-wrapper {
    padding: 6px 10px;
    background-color: rgba(0, 0, 0, 0.61);
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);
    overflow-wrap: break-word;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    margin: 9px 0 0 8px;
  }
}
.class-item {
  position: relative;
  padding-left: 16px;
  margin: 20px;
  cursor: pointer;

  &:before {
    content: "";
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:after {
    content: "";
    width: 12px;
    height: 12px;
    border: 1px solid #ffffff;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
