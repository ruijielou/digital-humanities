<script lang="ts" setup>
import { ref, reactive, createVNode } from "vue";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import type { PageinationType } from "../../utils/type";
import { caseinfo } from "@/api";
import { useRoute } from "vue-router";
import { message, Modal } from "ant-design-vue";

type Key = string | number;
const route = useRoute();
const caseMoveModal = ref<boolean>(false);
const openStatus = ref<number>(1);
const caseClasstify = ref<number>(0);
const loading = ref<boolean>(false);
const openCaseClasstify = ref<boolean>(false);
const checkedMoves = ref<string[]>([]);
const openCaseName = ref<boolean>(false);
const caseName = ref<string>("");
const selectedKeys = ref<Key[]>([]);

const onSelectChange = (selectedRowKeys: Key[]) => {
  // console.log("selectedRowKeys changed: ", selectedRowKeys);
  selectedKeys.value = [...selectedRowKeys];
};

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
    dataIndex: "createTime",
  },
];

const dataSource = ref<{ [key: string]: any }[]>([]);
const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});
const handleTableChange = async (newpager: any) => {
  console.log(newpager, "handleTableChange");
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getLibraryList();
};
const getLibraryList = async () => {
  const { result } = await caseinfo.page(
    `repositoryId=${route.params.id}&&pageNo=${pagination.current}&pageSize=${pagination.pageSize}`
  );
  if (result) {
    dataSource.value = [...result.records];
    pagination.total = result.total;
    pagination.current = result.current;
    pagination.pageSize = result.size;
  }
};
const removeMore = () => {
  const params = [...selectedKeys.value];
  if (!params.length) {
    message.warning("选择不能为空");
    return
  }
  Modal.confirm({
    content: "确定要全部删除吗？",
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      // 在这儿写接口请求 请求成功刷新列表
      dataSource.value = [
        ...dataSource.value.filter((item: any) => !params.includes(item.id)),
      ];
    },
    cancelText: "再想想",
    onCancel() {
      Modal.destroyAll();
    },
  });
};

const repository_info = ref({});
const getRepositoryDetail = async ()=>{
  const {result} = await repository.queryById(route.params.id);
  if (result) {
    repository_info.value = result;
  }
}
getRepositoryDetail();

// const getCaseList = async () => {
//   const { result } = await repository.page(
//     `pageNo=${pagination.current}&pageSize=${pagination.pageSize}`
//   );
//   if (result) {
//     dataSource.value = [...result.records];
//     pagination.total = result.total;
//     pagination.current = result.current;
//     pagination.pageSize = result.size;
//   }
// };
getLibraryList();

const handleOk = (e: MouseEvent) => {
  caseMoveModal.value = false;
};
</script>
<template>
  <a-layout-content
    style="padding: 20px 0; margin: 0 auto; width: 80%"
    class="flex flex-col"
  >
    <div class="return-prev-page cursor-pointer p-b-3" @click="$router.go(-1)">
      <arrow-left-outlined />
      <span class="p-l-2">我的案例库</span>
    </div>
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">
          {{ repository_info.name }}
          <a-popover placement="bottom">
            <template #content>
              <p>开放权限</p>
              <a-radio-group v-model:value="openStatus">
                <a-radio class="block" :value="1">公开</a-radio>
                <a-radio class="block" :value="2">仅自己看</a-radio>
              </a-radio-group>
            </template>
            <template #title>
              <a-button class="block" type="text">删除</a-button>
              <a-button class="block" type="text" @click="caseMoveModal = true"
                >迁移</a-button
              >
            </template>
<!--            <span class="cursor-pointer">...</span>-->
          </a-popover>
        </h2>
      </div>
    </div>
    <p class="c-#999 text-3 m-t-3 m-b-0">
      {{ repository_info.description }}
    </p>
    <LogoText text="检索结果" />
    <div class="result-container">
      <div class="result-filter flex p-b-4">
        <div class="flex-1 flex justify-end">
          <a-button type="danger" @click="removeMore">全部删除</a-button>
          <a-button class="m-l-3" type="primary">全部迁移</a-button>
        </div>
      </div>

      <a-table
        :columns="columns"
        :row-key="(record:any) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :row-selection="{
          selectedRowKeys: selectedKeys,
          onChange: onSelectChange,
        }"
      >
        <template #bodyCell="{ column, text, index, record}">
          <!-- class="c-#5b3df2 cursor-pointer"  -->
          <div class="c-#5b3df2 cursor-pointer" @click="$router.push({ name: 'MyCaseDetail', params: { id: record.id } })" v-if="column.dataIndex === 'name'">
            {{ text }}
          </div>
        </template>
      </a-table>
    </div>
    <a-modal
      v-model:visible="caseMoveModal"
      class="border-bottom-search"
      @ok="handleOk"
    >
      <template #title>
        <div class="text-center">迁移</div>
      </template>
      <a-input>
        <template #suffix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-checkbox-group v-model:value="checkedMoves">
        <div class="p-3">
          <a-checkbox value="数字学术平台案例库">数字学术平台案例库</a-checkbox>
        </div>
        <div class="p-3">
          <a-checkbox value="数字计划案例库">数字计划案例库</a-checkbox>
        </div>
        <div class="p-3">
          <a-checkbox value="数字人文工具案例库">数字人文工具案例库</a-checkbox>
        </div>
        <div class="p-3">
          <a-checkbox value="联盟、企业案例库">联盟、企业案例库</a-checkbox>
        </div>
      </a-checkbox-group>
      <div class="p-3 flex items-center">
        <a-radio v-model:checked="openCaseClasstify"></a-radio>
        <a-select class="flex-1" v-model:value="caseClasstify">
          <a-select-option :value="0">分类1</a-select-option>
          <a-select-option :value="1">分类2</a-select-option>
          <a-select-option :value="2">分类3</a-select-option>
          <a-select-option :value="3">分类4</a-select-option>
        </a-select>
      </div>
      <div class="p-3 p-l-9 flex items-center">
        <a-input
          class="flex-1 m-r-3"
          v-model="caseName"
          placeholder="案例库名称"
        ></a-input>
        <a-switch v-model:checked="openCaseName" />
      </div>
      <template #footer>
        <div class="text-center">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >创建</a-button
          >
        </div>
      </template>
    </a-modal>
  </a-layout-content>
</template>