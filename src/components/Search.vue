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
const showFiledError = ref<boolean>(false);
const searchType = ref<number>(0);
const repository_suggest_list = ref<any[]>([]);

const router = useRouter();
const do_search = () => {
  let keywords = searchFields.value;
  if(keywords){
    emit('closeSearch');
    router.push({ name: "SearchResult",query:{keywords:keywords} });
  }else {
    // message.warning("请输入关键字");
    showFiledError.value = true;
  }
}

const load_repository_suggest = async () => {
  const {result } = await repository.suggest();
  repository_suggest_list.value = result;
}

load_repository_suggest();

const gotoVisuali = () => {
  emit('closeSearch');
  router.push({name: 'Visualization'});
}
onMounted(() => {
  const {query} = route;
  if(query && query.keywords) {
    searchFields.value = query.keywords as string;
  }
})

const changeSearchText = () => {
  if(searchFields) {
    showFiledError.value = false;
  }
}

const goAdvanceSearch = () => {
  localStorage.removeItem('formstate');
  route.name === 'AdvancedSearch' ? location.reload() : router.push({name: 'AdvancedSearch'})
}
const openRepository = (id:string) => {
  emit('closeSearch');
router.push({name: 'MoreLibrary', params: {id} });
// location.reload()
}

</script>
<template>
  <div class="flex items-center justify-center m-b-2">
    <a-input
      class="transparent-input"
      size="large"
      v-model:value="searchFields"
      style="width: 50%"
      @change="changeSearchText"
    >
      <template #addonBefore>
        <div class="cursor-pointer">
          <a-select v-model:value="searchType">
            <a-select-option :value="0">全文</a-select-option>
<!--            <a-select-option :value="1">关键词</a-select-option>-->
            <a-select-option :value="2">标签</a-select-option>
<!--            <a-select-option :value="3">全文</a-select-option>-->
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
    <span class="c-white p-l-4 cursor-pointer" @click="goAdvanceSearch">
      高级检索
      <double-right-outlined />
    </span>
  </div>
  <div v-if="showFiledError" class="c-#f243d9 w-50% flex items-center justify-center">请输入关键字</div>
  <div class="content-text-wrapper flex justify-center p-4" v-if='repository_suggest_list && repository_suggest_list.length'>
    <div class="text-wrapper flex-col" v-for="suggest_item in repository_suggest_list">
      <span class="text cursor-pointer" @click="openRepository(suggest_item.id)">{{suggest_item.name}}</span>
    </div>
    <div class="text-wrapper flex-col">
      <span class="text">
        <right-outlined />
      </span>
    </div>
  </div>
  <Labels v-if="searchType == 2" @setSearch="(val: string) => searchFields = val" />
  <div class="flex justify-center flex-1 items-end">
    <div class="class-item">
      <span class="c-white" @click="gotoVisuali">分布谱</span>
    </div>
    <div class="class-item">
      <span class="c-white" @click="gotoVisuali"> 时间谱</span>
    </div>
    <div class="class-item">
      <span class="c-white" @click="gotoVisuali">合作谱</span>
    </div>
    <div class="class-item">
      <span class="c-white" @click="gotoVisuali">知识图谱</span>
    </div>
    <div class="class-item">
      <span class="c-white" @click="gotoVisuali">主题词谱</span>
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
  &:hover span {
    color: #ccc
  }
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