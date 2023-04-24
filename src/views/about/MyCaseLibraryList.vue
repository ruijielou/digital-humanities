<script lang="ts" setup>
import { ref, reactive, createVNode, watch } from "vue";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import type { PageinationType } from "../../utils/type";
import { caseinfo, repository, caseApi, repositorygroup } from "@/api";
import { useRoute, useRouter } from "vue-router";
import { message, Modal } from "ant-design-vue";
import Migrate from "./components/Migrate.vue";

type Key = string | number;
const route = useRoute();
const router = useRouter();
const MigrateRef = ref<any>(null);
const openStatus = ref<number>(1);
const loading = ref<boolean>(false);
const selectedKeys = ref<Key[]>([]);

const onSelectChange = (selectedRowKeys: Key[]) => {
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
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getLibraryList();
};
/**
 * 删除案例库
 */
const deletRepository = () => {
  if (!route.params.id) return;
  Modal.confirm({
    content: "确定要删除吗？",
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      // 在这儿写接口请求 请求成功刷新列表
      const res = await repository.del({ id: route.params.id });

      if (res.success) {
        message.success("删除成功");
        router.go(-1);
      }
    },
    cancelText: "再想想",
    okText: "确定",
    onCancel() {
      Modal.destroyAll();
    },
  });
};

/** 修改案例库 */
const editRepository = async (authType: number) => {
  const res = await repository.update({ ...repository_info.info, authType });
  if (res.success) {
    message.success("修改成功");
    getRepositoryDetail();
  }
};

watch(
  () => openStatus.value,
  (val) => {
    editRepository(val);
  }
);
const getLibraryList = async () => {
  const { result } = await caseinfo.myPage({
    repositoryId: route.params.id,
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
  });

  if (result) {
    dataSource.value = [...result.records];
    pagination.total = result.total;
    pagination.current = result.current;
    pagination.pageSize = result.size;
  }
};
const removeMore = (type: string) => {
  const params = [...selectedKeys.value];
  if (!params.length) {
    message.warning("选择不能为空");
    return;
  }
  Modal.confirm({
    content: `确定要全部${type === "delete" ? "删除" : "迁移"}吗？`,
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      // 在这儿写接口请求 请求成功刷新列表
      if (type === "delete") {
        const res = await caseApi.delBatch({ ids: params.join(",") });
        if (res.success) {
          message.success("删除成功");
          getLibraryList();
        }
      }
    },
    cancelText: "再想想",
    okText: "确定",
    onCancel() {
      Modal.destroyAll();
    },
  });
};

const repository_info = reactive<any>({
  info: {},
});

const getRepositoryDetail = async () => {
  const { result } = await repository.queryById(route.params.id);
  if (result) {
    repository_info.info = { ...result };
  }
};

const openMigrate = (isDeleteCaseId?: boolean) => {
  MigrateRef.value.caseIds = "";
  if (isDeleteCaseId) {
    const params = [...selectedKeys.value];
    if (!params.length) {
      message.warning("选择不能为空");
      return;
    }
    MigrateRef.value.caseIds = params.join(",");
  }

  MigrateRef.value.caseMoveModal = true;
};
getRepositoryDetail();
getLibraryList();
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
          {{ repository_info.info?.name }}
          <a-popover placement="bottom">
            <template #content>
              <p>开放权限</p>
              <a-radio-group v-model:value="openStatus">
                <a-radio class="block" :value="1">公开</a-radio>
                <a-radio class="block" :value="2">仅自己看</a-radio>
              </a-radio-group>
            </template>
            <template #title>
              <a-button class="block" type="text" @click="deletRepository"
                >删除</a-button
              >
              <a-button class="block" type="text" @click="openMigrate()"
                >迁移</a-button
              >
            </template>
            <span class="cursor-pointer">...</span>
          </a-popover>
        </h2>
      </div>
    </div>
    <p class="c-#999 text-3 m-t-3 m-b-0">
      {{ repository_info.info.description }}
    </p>
    <LogoText text="检索结果" />
    <div class="result-container">
      <div class="result-filter flex p-b-4">
        <div class="flex-1 flex justify-end">
          <a-button type="danger" @click="removeMore('delete')"
            >全部删除</a-button
          >
          <a-button class="m-l-3" type="primary" @click="openMigrate"
            >全部迁移</a-button
          >
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
        <template #bodyCell="{ column, text, index, record }">
          <div
            class="c-#5b3df2 cursor-pointer"
            @click="
              $router.push({ name: 'MyCaseDetail', params: { id: record.id } })
            "
            v-if="column.dataIndex === 'name'"
          >
            {{ `${((pagination.current -1 ) * pagination.pageSize) + index + 1}` }}
            <span class="m-l-1">{{ text }}</span>
          </div>
        </template>
      </a-table>
    </div>
    <Migrate
      @reload="getLibraryList"
      :content-id="$route.params.id"
      ref="MigrateRef"
    />
  </a-layout-content>
</template>