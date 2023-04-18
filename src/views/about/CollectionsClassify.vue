<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import {
  CaretDownOutlined,
  ArrowLeftOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons-vue";
import type { PageinationType } from "../../utils/type";
import { favorite } from "@/api";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";

const route = useRoute();

const groupId = route.params.id;
const groupName = route.params.name;

const selectContry = ref<string>("中国");
const selectFiled = ref<string>("项目时间");
const loading = ref<boolean>(false);
const sortedInfo = ref();
const columns = computed(() => {
  const sorted = sortedInfo.value || {};

  return [
    {
      title: "名称",
      dataIndex: "caseName",
      sorter: (a: any, b: any) =>
        a.name.localeCompare(b.name, "zh-Hans-CN", {
          sensitivity: "accent",
        }),
      sortOrder: sorted.columnKey === "name" && sorted.order,
    },
    {
      title: "国别",
      dataIndex: "caseCountry",
    },
    {
      title: "所属机构",
      dataIndex: "caseSubOrg",
    },
    {
      title: "项目时间",
      dataIndex: "caseItemTime",
    },
    {
      title: "",
      dataIndex: "operation",
    },
  ];
});
const setSort = (type: string) => {
  pagination.order = type;
  getMyFavorite();
};

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
  column: "case_name",
  order: "asc",
});
const handleTableChange = async (newpager: any) => {
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getMyFavorite();
};
const dataSource = ref<any[]>([]);
const getMyFavorite = async () => {
  const paramsQuery: any = {
    type: 1,
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
    column: pagination.column,
    order: pagination.order,
  };

  if (groupId) {
    paramsQuery.groupId = groupId;
  }
  const { result } = await favorite.myPage({ ...paramsQuery });
  if (result) {
    dataSource.value = [...result.records];
  }
};
getMyFavorite();

// 取消喜欢
const cancelFavorited = async (id: string) => {
  if (!id) return;
  const params = {
    type: 1, //点赞2 收藏1
    contentId: id,
  };
  const res = await favorite.del(params);
  if (res.success) {
    message.success(res.message);
    getMyFavorite();
  }
};
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
        <h2 class="m-0">{{ groupName }}</h2>
      </div>
    </div>
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
          <span class="cursor-pointer" @click="setSort('asc')">
            <sort-ascending-outlined
              :class="{ 'c-#5b3df2': pagination.order === 'asc' }"
            />
          </span>
          <a-divider type="vertical" />
          <span class="cursor-pointer" @click="setSort('desc')">
            <sort-descending-outlined
              :class="{ 'c-#5b3df2': pagination.order === 'desc' }"
            />
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
        <template #bodyCell="{ column, text, index, record }">
          <template v-if="column.dataIndex === 'name'"
            >{{ index }} {{ text }}</template
          >
          <div v-if="column.dataIndex === 'operation'">
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="cancelFavorited(record.caseId)"
            >
              <a-button type="text">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>
