<script setup lang="ts">
import { ref } from "vue";
import { labgroup } from "@/api";



/* 加载标签  */
const lab_group_list = ref<any>([]);
const loading = ref<boolean>(false);
const load_lab_group = async () => {
  loading.value = true;
  const { result } = await labgroup.loadList();
  loading.value = false;
  lab_group_list.value = result || [];
};
load_lab_group();
</script>

<template>
  <div class="labels flex">
    <a-spin
      v-if="loading"
      :spinning="true"
      class="h-100%"
      style="width: 46vw"
    ></a-spin>
    <div v-else-if="lab_group_list.length == 0" class="w-100% p-t-2em text-#fff text-center">
      没有标签
    </div>
    <div
      v-else
      class="label-category flex flex-col p-l-3 p-r-3"
      v-show="group.id != 22 && group.opts && group.opts.length > 0"
      v-for="group in lab_group_list"
    >
      <span class="label-category-item text-center">
        {{ group.title }}
      </span>
      <span
        @click="$emit('setSearch', item.title)"
        class="label-category-item text-center no-bg"
        v-for="item in group.opts"
        :key="item.id"
      >
        <!-- {{ item.title }} -->
        <a-tooltip
          v-if="item.title.length > 6"
          color="#5B3DF2"
          :title="item.title"
        >
          {{ `${item.title.slice(0, 6)}...` }}
        </a-tooltip>
        <span v-else>{{ item.title }}</span>
      </span>
    </div>
  </div>
</template>
<style lang="less">
.labels {
  position: absolute;
  left: 0;
  top: 112px;
  z-index: 999;
  width: calc(51vw - 90px);
  overflow: auto;
  white-space: nowrap;
  min-height: 250px;
  max-height: 308px;
  background: @liner-color;
  margin: 0 auto;
  padding: 15px;
  text-align: left;
  transform: translateY(-70px);
  max-height: 400px;
  .label-category-item {
    width: 84px;
    height: 32px;
    line-height: 32px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    display: inline-block;
    color: #fff;
    margin: 5px;

    &.no-bg {
      cursor: pointer;
      background-color: transparent;
      transition: all 0.2s linear;
      &:hover {
        // background-color: rgba(255, 255, 255, 0.1);
        // text-shadow: 2px 2px 2px #fff;
        transform: scale(1.2);
      }
    }
  }
}
</style>
