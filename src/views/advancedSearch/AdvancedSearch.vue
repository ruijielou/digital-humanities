<script setup lang="ts">
import { ref, computed, reactive, UnwrapRef } from "vue";
import LogoText from "../../components/LogoText.vue";
import type { PageinationType } from "../../utils/type";
import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons-vue";

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
const showSearchRes = ref<boolean>(false);
const searchFormState: UnwrapRef<any> = reactive({
  name: '',
  time: '',
  contry: "",
  city: "",
});
</script>
<template>
  <div class="h-screen overflow-auto advanced-search">
    <Header
      class="visualization-header"
      bg-name="visualization-bg"
      title="追踪研究线索"
    />
    <a-layout-content
      style="padding: 20px 0; margin: 0 auto; width: 80%"
      class="flex flex-col"
      v-if="!showSearchRes"
    >
      <div class="return-prev-page cursor-pointer" @click="$router.go(-1)">
        <arrow-left-outlined />
        <span class="p-l-2">首页</span>
      </div>
      <LogoText text="高级检索" />
      <div class="result-container p-t-5 p-l-15 p-r-15">
        <a-form
          :model="searchFormState"
          v-bind="{
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
          }"
        >
          <a-form-item label="项目名称" :colon="false">
            <a-input
              v-model:value="searchFormState.name"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="项目时间" :colon="false">
            <a-input
              v-model:value="searchFormState.time"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="所属国别" :colon="false">
            <div class="flex">
              <a-select
              v-model:value="searchFormState.contry"
              placeholder="国家"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
            <a-select
            class="m-l-2"
              v-model:value="searchFormState.city"
              placeholder="城市"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
            </div>
          </a-form-item>
          <a-form-item label="项目机构" :colon="false">
            <a-input
              v-model:value="searchFormState.organization"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="项目人员" :colon="false">
            <a-input
              v-model:value="searchFormState.person"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item label="所属学科" :colon="false">
            <a-select
              v-model:value="searchFormState.class"
              placeholder="请选择"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="服务对象" :colon="false">
            <a-select
              v-model:value="searchFormState.serviceObject"
              placeholder="请选择"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="研究方向" :colon="false">
            <a-select
              v-model:value="searchFormState.researchDirection"
              placeholder="请选择"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="运行情况" :colon="false">
            <a-select
              v-model:value="searchFormState.operation"
              placeholder="请选择"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="成果形态" :colon="false">
            <a-select
              v-model:value="searchFormState.achievement"
              placeholder="请选择"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="合作方式" :colon="false">
            <a-select
              v-model:value="searchFormState.cooperationMode"
              placeholder="请选择"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="应用技术" :colon="false">
            <a-select
              v-model:value="searchFormState.technology"
              placeholder="请选择"
            >
              <a-select-option value="optiona">option a</a-select-option>
              <a-select-option value="optionb">option b</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            class="text-center"
            :wrapper-col="{ span: 12, offset: 6 }"
          >
            <a-button @click="showSearchRes = true" type="primary"
              >搜索</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
    <a-layout-content
      style="padding: 20px 0; margin: 0 auto; width: 80%"
      class="flex flex-col"
      v-else
    >
      <div
        class="return-prev-page cursor-pointer"
        @click="showSearchRes = false"
      >
        <arrow-left-outlined />
        <span class="p-l-2">高级检索</span>
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
        >
          <template #bodyCell="{ column, text, index }">
            <template v-if="column.dataIndex === 'name'"
              >{{ index }} {{ text }}</template
            >
          </template>
        </a-table>
      </div>
    </a-layout-content>
  </div>
</template>
<style lang="less">
// .visualization-header {
//   background-image: url("../../assets/image/visualization-bg.png");
// }
.advanced-search {
  position: relative;
  .return-prev-page {
    color: #666666;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 30px;
  }
}
.ant-dropdown-link {
  color: #222;
}
</style>
