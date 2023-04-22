<script setup lang="ts">
import { ref } from "vue";
import { labgroup } from "@/api";

// const labelsData: { label: string, id: number }[] = [
//   {
//     label: '分类1',
//     id: 1
//   },
//   {
//     label: '分类2',
//     id: 2
//   },
//   {
//     label: '分类3',
//     id: 3
//   },
//   {
//     label: '分类4',
//     id: 4
//   },
//   {
//     label: '分类5',
//     id: 5
//   },
//   {
//     label: '分类6',
//     id: 6
//   },
//   {
//     label: '分类7',
//     id: 7
//   },
//   {
//     label: '分类8',
//     id: 8
//   },
//   {
//     label: '分类9',
//     id: 9
//   },
//   {
//     label: '分类10',
//     id: 10
//   }
// ]

/* 加载标签  */
const lab_group_list = ref<any>([]);
const load_lab_group = async () => {
  const { result } = await labgroup.loadList();
  lab_group_list.value = result;

};
load_lab_group();
</script>

<template>
  <div class="labels flex">
    <div class="label-category flex flex-col p-l-3 p-r-3" v-show="group.id != 22 && group.opts && group.opts.length > 0" v-for="group in lab_group_list">
      <span class="label-category-item text-center">
        {{ group.title }}
      </span>
      <span
        @click="$emit('setSearch', item.title)"
        class="label-category-item text-center no-bg"
        v-for="item in group.opts"
        :key="item.id"
      >
        {{ item.title }}
      </span>
    </div>
  </div>
</template>
<style lang="less">
.labels {
  width: 70vw;
  overflow: scroll;
  white-space: nowrap;
  height: 250px;
  background: @liner-color;
  margin: 0 auto;
  padding: 15px;
  text-align: left;

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
      transition: all .2s linear;
      &:hover {
        // background-color: rgba(255, 255, 255, 0.1);
        // text-shadow: 2px 2px 2px #fff;
        transform: scale(1.2);
      }
    }
  }
}
</style>