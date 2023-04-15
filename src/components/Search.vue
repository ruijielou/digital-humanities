<script setup lang="ts">
import { ref, onMounted } from "vue";
import { DoubleRightOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons-vue";
import Labels from "./Labels.vue";
import { useRouter,useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { repository } from "@/api";

const emit = defineEmits(['closeSearch'])
const route = useRoute();
const searchFields = ref<string>("");
const showLabels = ref<boolean>(false);
const searchType = ref<number>(0);
const repository_suggest_list = ref<any[]>([]);

const changeShowLabels = () => {
  showLabels.value = !showLabels.value;
};
const router = useRouter();
const do_search = () => {
  console.log('searchType:', searchType)
  console.log('searchFields:', searchFields)
  let keywords = searchFields.value;
  if(keywords){
    console.log('router:', router)
    emit('closeSearch');
    router.push({ name: "Search",query:{keywords:keywords} });
  }else {
    message.warning("请输入关键字");
  }
}

const load_repository_suggest = async () => {
  const {result } = await repository.suggest();
  repository_suggest_list.value = result;
  console.log('repository_suggest_list:', repository_suggest_list.value)
}
load_repository_suggest();
onMounted(() => {
  const {query} = route;
  if(query && query.keywords) {
    searchFields.value = query.keywords as string;
  }
})
</script>
<template>
  <div class="flex items-center justify-center m-b-2">
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
        <div class="cursor-pointer" style="width: 80px" @click="do_search()">
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
  <div class="content-text-wrapper flex justify-center p-4" v-if='repository_suggest_list.length'>
    <div class="text-wrapper flex-col" v-for="suggest_item in repository_suggest_list">
      <span class="text" @click=" $router.push({ name: 'MoreLibrary', params: { id: suggest_item.id }, })">{{suggest_item.name}}</span>
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