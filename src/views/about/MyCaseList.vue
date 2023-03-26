<script lang="ts" setup>
import { ref, reactive } from "vue";
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

const dataSource = [
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

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});


</script>
<template>
  <a-layout-content
    style="padding: 20px 0; margin: 0 auto; width: 100%"
    class="flex flex-col"
  >
    <div class="result-container">

      <a-table
        :columns="columns"
        :row-key="(record:any) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
      >
        <template #bodyCell="{ column, text, index }">
            <!-- class="c-#5b3df2 cursor-pointer"  -->
          <div class="c-#5b3df2 cursor-pointer"  @click="$router.push({name: 'CaseDetail'})" v-if="column.dataIndex === 'name'">
            {{ text }}
          </div>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>
