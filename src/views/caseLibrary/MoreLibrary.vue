<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import type { PageinationType } from "../../utils/type";
import {
  CaretDownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons-vue";
import { caseinfo, repository, repositorygroup } from "@/api";
import { useRoute, useRouter } from "vue-router";
import QueryFiled from "@/components/QueryFiled.vue";

const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(false);
const sliderData = ref<any>([]);

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
const setSort = (type: string) => {
  pagination.order = type;
  getLibraryList();
};
const repository_id = ref();
repository_id.value = route.params.id;

const repository_info = ref({
  name: "",
  description: "",
});

const getRepositoryDetail = async () => {
  if (!repository_id.value) return;
  const { result } = await repository.queryById(repository_id.value);
  if (result) {
    repository_info.value = result;
  }
};

const dataSource = ref<any>([]);

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
  column: "name",
  order: "asc",
});
const queryParams = reactive<any>({ data: {} });
const getLibraryList = async (params?: any) => {
  if (params) {
    queryParams.data = { ...params };
  }
  const { result } = await caseinfo.page({
    repositoryId: repository_id.value,
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
    column: pagination.column,
    order: pagination.order,
    ...queryParams.data,
  });
  if (result) {
    dataSource.value = [...result.records];
    pagination.total = result.total;
    pagination.current = result.current;
    pagination.pageSize = result.size;
  }
};

/**
 * @description 分页改变
 */
const handleTableChange = async (newpager: any) => {
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getLibraryList();
};
const getSlider = async () => {
  const { result } = await repositorygroup.findList();
  if (result) {
    sliderData.value = [...result];
    const firstData = sliderData.value.find(
      (item: any) => item.repositoryList.length > 0
    );

    if (firstData && (!repository_id.value || repository_id.value === "-1")) {
      repository_id.value = firstData.repositoryList[0].id;
    }
  }
};

const checkRepositoryId = (id:string) => {
  router.push({ name: route.name, params: { id } });
};
const reset_repository = (id: any) => {
  repository_id.value = id;
  if (id != -1) {
    getRepositoryDetail();
    getLibraryList();
  } else {
  }
};
const initPage = async () => {
  await getSlider();
  await getRepositoryDetail();
  getLibraryList();
};
watch(
  route,
  (to) => {
    reset_repository(to.params.id);
  },
  // { immediate: true } // 如果要立即执行一次，请添加此选项
);
initPage();
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
            :class="{ active: repository_item.id == repository_id }"
            v-for="repository_item in item.repositoryList"
          >
            <span @click="checkRepositoryId(repository_item.id)">{{
              repository_item.name
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex-1 h-100% p-l-120px p-r-120px">
        <div class="p-t-5 lines-purple">
          <h2>{{ repository_info.name }}</h2>
        </div>
        <p class="c-#999 text-3 m-t-2">
          {{ repository_info.description }}
        </p>
        <div class="result-container p-t-5">
          <div class="result-filter flex p-b-4">
            <QueryFiled ref="queryFiledRef" @reload="getLibraryList" />
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
      & > div:hover,
      & > .active {
        color: @primary-color;
      }
    }
  }
}
</style>
