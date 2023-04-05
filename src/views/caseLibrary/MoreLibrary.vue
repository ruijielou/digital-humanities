<script setup lang="ts">
import { ref, reactive } from "vue";
import type { PageinationType } from "../../utils/type";
import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons-vue";
import { caseinfo, repositorygroup } from "@/api";

const selectContry = ref<string>("中国");
const selectFiled = ref<string>("项目时间");
const loading = ref<boolean>(false);
const sliderData = ref<any>([])
const datas = [
  {
    key: "numberGlam",
    name: "数字GLAM",
    options: [
      "GLAM融合案例库",
      "数字图书馆案例库",
      "数字博物馆案例库",
      "数字档案馆案例库",
      "数字艺术案例库",
    ],
  },
  {
    key: "fieldResearch",
    name: "领域研究",
    options: [
      "女性文学案例库",
      "中国古典文献案例库",
      "文字、语言案例库",
      "地图、GIS案例库",
      "数字文化遗产案例库",
      "海外研究中国案例库",
      "数字记忆案例库",
    ],
  },
  {
    key: "platform",
    name: "机构平台",
    options: [
      "女性文学案例库",
      "中国古典文献案例库",
      "文字、语言案例库",
      "地图、GIS案例库",
      "数字文化遗产案例库",
      "海外研究中国案例库",
      "数字记忆案例库",
    ],
  },
  {
    key: "infrastructure",
    name: "基础设施",
    options: [
      "女性文学案例库",
      "中国古典文献案例库",
      "文字、语言案例库",
      "地图、GIS案例库",
      "数字文化遗产案例库",
      "海外研究中国案例库",
      "数字记忆案例库",
    ],
  },
];

const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "国别",
    dataIndex: "country",
  },
  {
    title: "所属机构",
    dataIndex: "subOrg",
  },
  {
    title: "项目时间",
    dataIndex: "itemTime",
  },
];

const dataSource = ref<any>([]);

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});
const getLibraryList = async () => {
  const { result } = await caseinfo.page(
    `pageNo=${pagination.current}&pageSize=${pagination.pageSize}`
  );
  if (result) {
    dataSource.value = [...result.records];
    pagination.total = result.total;
    pagination.current = result.current;
    pagination.pageSize = result.size;
  }
};
getLibraryList();

/**
 * @description 分页改变
 */
const handleTableChange = async (newpager: any) => {
  console.log(newpager);
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getLibraryList();
};
const getSlider = async () => {
  const { result } = await repositorygroup.list();
  if (result) {
    console.log(result);
    sliderData.value = [...result];
  }
};
getSlider();

</script>
<template>
  <div class="h-screen overflow-auto">
    <Header
      title="打开数字人文万花筒"
      bg-name="caselibrary-bg"
      class="morelibrary-header"
    />
    <a-layout-content class="flex more-library-content">
      <div class="slider-box h-100%">
        <div class="slider-items" v-for="item in sliderData">
          <div class="p-l-10 p-t-10">
            <span class="line-title text-4.5 truncate">
              <span>{{ item.title }}</span>
            </span>
          </div>
          <div
            class="p-l-10 p-t-3 text-3.5 truncate cursor-pointer"
            v-for="text in item.repositoryList"
          >
            {{ text }}
          </div>
        </div>
      </div>
      <div class="flex-1 h-100% p-l-20 p-r-20">
        <div class="p-t-5 lines-purple">
          <h2>GLAM融合案例库</h2>
        </div>
        <p class="c-#999 text-3 m-t-2">
          简介：简介内容简介内容简介内容简介内容简
        </p>
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
            :scroll="{ y: '45vh' }"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, text, index, record }">
              <div
                class="cursor-pointer c-#5b3df2"
                v-if="column.dataIndex === 'name'"
                @click="
                  $router.push({
                    name: 'CaseDetail',
                    params: { id: record.id },
                  })
                "
              >
                {{ index + 1 }}. {{ text }}
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </a-layout-content>
    <Footer />
  </div>
</template>
<style lang="less">
.more-library-content {
  .slider-box {
    width: 200px;
    height: calc(100vh - 20vh);
    padding-bottom: 10px;
    overflow: auto;
    background: #f4f1ff;
    .slider-items {
      & > div:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
