<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import type { PageinationType } from "../../utils/type";
import {
  CaretDownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons-vue";
import { caseinfo, repository, repositorygroup } from "@/api";
import { useRoute } from "vue-router";

const route = useRoute();

const selectContry = ref<string>("中国");
const selectFiled = ref<string>("项目时间");
const loading = ref<boolean>(false);
const sliderData = ref<any>([]);

const columns = computed(() => {
  return [
    {
      title: "名称",
      dataIndex: "name",
      // sorter: (a: any, b: any) =>
      //   a.name.localeCompare(b.name, "zh-Hans-CN", {
      //     sensitivity: "accent",
      //   }),
      // sortOrder: sorted.columnKey === "name" && sorted.order,
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
const getLibraryList = async () => {
  const { result } = await caseinfo.page({
    repositoryId: repository_id.value,
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
    column: pagination.column,
    order: pagination.order,
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
    if (firstData && !repository_id.value) {
      repository_id.value = firstData.repositoryList[0].id;
    }
  }
};

const reset_repository = (id: any) => {
  repository_id.value = id;
  getRepositoryDetail();
  getLibraryList();
};
const initPage = async () => {
  await getSlider();
  await getRepositoryDetail();
  getLibraryList();
};
watch(
  route,
  (to, from) => {
    reset_repository(to.params.id);
  },
  { immediate: true } // 如果要立即执行一次，请添加此选项
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
            <span @click="reset_repository(repository_item.id)">{{
              repository_item.name
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex-1 h-100% p-l-20 p-r-20">
        <div class="p-t-5 lines-purple">
          <h2>{{ repository_info.name }}</h2>
        </div>
        <p class="c-#999 text-3 m-t-2">
          {{ repository_info.description }}
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
