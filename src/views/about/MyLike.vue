<!-- 我喜欢的 -->
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { favorite } from "@/api";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons-vue";
import type { PageinationType } from "../../utils/type";

const caseMoveModal = ref<boolean>(false);
const openStatus = ref<number>(1);
const caseClasstify = ref<number>(0);
const loading = ref<boolean>(false);
const openCaseClasstify = ref<boolean>(false);
const checkedMoves = ref<string[]>([]);
const openCaseName = ref<boolean>(false);
const caseName = ref<string>("");
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "国别",
    dataIndex: "contry",
  },
  {
    title: "所属机构",
    dataIndex: "organization",
  },
  {
    title: "项目时间",
    dataIndex: "projectTime",
  },
];

const dataSourcemock = [
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 1,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 2,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 3,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 4,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 5,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 6,
  },
  {
    name: "德国图书馆、档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 7,
  },
];

const dataSource = ref<any[]>([]);

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});

const getMylike = async () => {
  const { result } = await favorite.myPage(2);
  if (result) {
    dataSource.value = [...result.records];
  }
};
getMylike();
</script>
<template>
  <a-layout-content
    style="padding: 20px; margin: 0 auto; width: 100%"
    class="flex flex-col"
  >
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">我的喜欢</h2>
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
          <div
            @click="$router.push({ name: 'CaseDetail' })"
            v-if="column.dataIndex === 'name'"
          >
            {{ text }}
          </div>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>
