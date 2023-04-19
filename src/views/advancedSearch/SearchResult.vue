<script setup lang="ts">
import { ref, computed, reactive, onMounted } from "vue";
import LogoText from "../../components/LogoText.vue";
import type { PageinationType } from "../../utils/type";
import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons-vue";
import { caseinfo } from "@/api";
import { useRouter, useRoute } from "vue-router";
import QueryFiled from "@/components/QueryFiled.vue"


const loading = ref<boolean>(false);

const search_condition_params = ref({});

const router = useRouter();
const route = useRoute();

const columns = computed(() => {
  return [
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
});

const dataSource = ref<{ [key: string]: string }[]>([]);

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
  column: "name",
  order: "asc",
});
const queryParams = reactive<any>({data: {}})
const getCaseData = async (params?:any) => {
  if(params) {
    queryParams.data = {...params}
  }
  let submitData: any = { ...search_condition_params.value };
  submitData.pageNo = pagination.current;
  submitData.pageSize = pagination.pageSize;
  submitData.column = pagination.column;
  submitData.order = pagination.order;
  const { result } = await caseinfo.page({...submitData, ...queryParams.data });

  result && (dataSource.value = [...result.records]);
  pagination.total = result.total;
};

const handleTableChange = async (newpager: any) => {
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getCaseData();
};


const enterSearch = async (param: any) => {
  const formState: any = route.query?.s;
  if (formState) {
    const params = Object.fromEntries(new URLSearchParams(formState));

    search_condition_params.value = {
      ...params,
      ...param,
    };
  } else {
    search_condition_params.value = {
      ...param,
    };
  }
  getCaseData();
};

const setSort = (type: string) => {
  pagination.order = type;
  getCaseData();
};

const gotoBack = () => {
  router.go(-1);
};

onMounted(async () => {
  const { query } = route;
  enterSearch({ keywords: query.keywords });
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
    >
      <div
        class="return-prev-page advance-return cursor-pointer"
        @click="gotoBack"
      >
        <arrow-left-outlined />
        <span class="p-l-2">高级检索</span>
      </div>
      <LogoText text="检索结果" />
      <div class="result-container p-t-5">
        <div class="result-filter flex p-b-4">
          <QueryFiled ref="queryFiledRef" @reload="getCaseData" />
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
            <div
              class="c-#5b3df2 cursor-pointer"
              @click="
                $router.push({ name: 'CaseDetail', params: { id: record.id } })
              "
              v-if="column.dataIndex === 'name'"
            >
              {{ index }} {{ text }}
            </div>
          </template>
        </a-table>
      </div>
    </a-layout-content>
  </div>
</template>
