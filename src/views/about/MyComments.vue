<!-- 我喜欢的 -->
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons-vue";
import type { PageinationType } from "../../utils/type";

const loading = ref<boolean>(false);
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "内容",
    dataIndex: "content",
  },{
    title: '',
    dataIndex: 'operation',
    
  }
];

const dataSource = [
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    content: "巴登 ·符腾堡图书馆服务中心",
    id: 1,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    content: "巴登 ·符腾堡图书馆服务中心",
    id: 2,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    content: "巴登 ·符腾堡图书馆服务中心",
    id: 3,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    content: "巴登 ·符腾堡图书馆服务中心",
    id: 4,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    content: "巴登 ·符腾堡图书馆服务中心",
    id: 5,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    content: "巴登 ·符腾堡图书馆服务中心",
    id: 6,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    content: "巴登 ·符腾堡图书馆服务中心",
    id: 7,
  },
];

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});

const moreOperation = () => {
    console.log(...arguments);
    
}


</script>
<template>
  <a-layout-content
    style="padding: 20px; margin: 0 auto; width: 100%"
    class="flex flex-col"
  >
  <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">我的评论</h2>
      </div>
    </div>
    <div class="result-container p-t-8">

      <a-table
        :columns="columns"
        :row-key="(record:any) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
      >
        <template #bodyCell="{ column, text, index }">
          <div @click="$router.push({name: 'CaseDetail'})" v-if="column.dataIndex === 'name'">
            {{ `${index + 1}` }}
            <span class="m-l-6">{{text}}</span>
          </div>
          <div v-if="column.dataIndex === 'operation'">
          <a-button type="text" @click="moreOperation()"
            >...</a-button
          >
        </div>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>
