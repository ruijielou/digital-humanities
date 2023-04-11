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
import { meta } from "@/api";
import { formatterFormInput, formatterFormData } from "@/utils/config";
import FormFiled from "@/components/FormFiled.vue";

const selectContry = ref<string>("中国");
const selectFiled = ref<string>("项目时间");
const loading = ref<boolean>(false);
const filedFromRef = ref<any>(null);
const sortedInfo = ref();
const columns = computed(() => {
  const sorted = sortedInfo.value || {};

  return [
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a: any, b: any) =>
        a.name.localeCompare(b.name, "zh-Hans-CN", {
          sensitivity: "accent",
        }),
      sortOrder: sorted.columnKey === "name" && sorted.order,
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
});

const dataSource = [
  {
    name: "a美国档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 1,
  },
  {
    name: "c英国图书馆、档案馆和物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 2,
  },
  {
    name: "d中国图书馆档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 3,
  },
  {
    name: "r新加坡图书馆、",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务",
    projectTime: "2001-2015",
    id: 4,
  },
  {
    name: "h智利图书馆、档案馆和博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆中心",
    projectTime: "2001-2015",
    id: 5,
  },
  {
    name: "y印度图书馆、档案博物馆门户（BAMP）",
    contry: "德国",
    organization: "巴登 ·符腾堡图书馆服务中心",
    projectTime: "2001-2015",
    id: 6,
  },
  {
    name: "j巴西图书馆、档案博物馆门户（BAMP）",
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
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
};

const showSearchRes = ref<boolean>(false);

const formFiled = reactive<any>({
  data: null,
  formModal: null,
});
const getInputMeta = async () => {
  const { result } = await meta.findSearchCondition();

  if (result) {
    const { formModal } = formatterFormInput({ result });
    formFiled.formModal = { ...formModal };
    formFiled.data = [...result];
  }
};

const enterSearch = async () => {
  const formState: any = await filedFromRef.value?.formValidate();
  if (!formState) return;
  // 这是待提交的数据
  const submitData = {
    ...formatterFormData({ ...formState.formFiledData }),
  };
  console.log(submitData);

  showSearchRes.value = true;
};
getInputMeta();
const setSort = (type: string) => {
  sortedInfo.value = {
    order: type,
    columnKey: "name",
  };
};
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
      <div class="result-container p-t-5 p-l-35 p-r-35">
        <FormFiled
          ref="filedFromRef"
          :form-modal="formFiled.formModal"
          :form-data="formFiled.data"
          :layout="{
            labelCol: { span: 3, offset: 2 },
            wrapperCol: { span: 15 },
          }"
        />
        <div class="text-center">
          <a-button @click="enterSearch" type="primary">搜索</a-button>
        </div>
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
            <span class="cursor-pointer" @click="setSort('descend')">
              <sort-ascending-outlined />
            </span>
            <a-divider type="vertical" />
            <span class="cursor-pointer" @click="setSort('ascend')">
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
