<script lang="ts" setup>
import { ref, reactive } from "vue";
import {CaretDownOutlined, ArrowLeftOutlined} from "@ant-design/icons-vue"
import type { PageinationType } from "../../utils/type";
import {favorite} from "@/api";

const selectContry = ref<string>("中国");
const selectFiled = ref<string>("项目时间");
const loading = ref<boolean>(false);
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

const dataSource1 = [
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
const handleTableChange = async (newpager: any) => {
  console.log(newpager);
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getMyFavorite();
};
const dataSource = ref<any[]>([]);
const getMyFavorite = async () => {
  const { result } = await favorite.myPage(1);
  if (result) {
    dataSource.value = [...result.records];
  }
};
getMyFavorite();
</script>
<template>
  <a-layout-content
    style="padding: 20px 0; margin: 0 auto; width: 80%"
    class="flex flex-col"
  >
    <div class="return-prev-page cursor-pointer p-b-3" @click="$router.go(-1)">
      <arrow-left-outlined />
      <span class="p-l-2">我的收藏夹</span>
    </div>
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">默认收藏夹</h2>
      </div>
    </div>
    <LogoText text="检索结果" />
    <div class="result-container p-t-5">
      <div class="result-filter flex p-b-4">
        <a-dropdown type="primary">
          <div @click.prevent>
            <caret-down-outlined />
            {{ selectContry }}
          </div>
          <template #overlay>
            <a-menu @click="(e:any) => selectContry = e.key">
              <a-menu-item key="中国"> 中国 </a-menu-item>
              <a-menu-item key="日本"> 日本 </a-menu-item>
              <a-menu-item key="韩国"> 韩国 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-dropdown class="m-l-8" type="primary">
          <div @click.prevent>
            <caret-down-outlined />
            {{ selectFiled }}
          </div>
          <template #overlay>
            <a-menu @click="(e:any) => selectFiled = e.key">
              <a-menu-item key="项目进度"> 项目进度 </a-menu-item>
              <a-menu-item key="项目质量"> 项目质量 </a-menu-item>
              <a-menu-item key="项目名称"> 项目名称 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <div class="flex-1 flex justify-end">
          <span class="cursor-pointer">
            <sort-ascending-outlined />
          </span>
          <a-divider type="vertical" />
          <span class="cursor-pointer">
            <sort-descending-outlined />
          </span>
        </div>
      </div>

      <a-table
        :columns="columns"
        :row-key="(record:any) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, text, index }">
          <template v-if="column.dataIndex === 'name'"
            >{{ index }} {{ text }}</template
          >
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>
