<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { PageinationType } from "../../utils/type";
import { caseinfo } from "@/api";
// case/myPage
enum CaseType {
  // status 1: 暂存 2:待审核, 3:审核通过 4:未通过
  Staging = 1,
  PendingReview,
  Approved,
  NotApproved,
}
const CaseTypeMap = [
  { type: CaseType.Staging, label: "暂存", name: "Staging" },
  { type: CaseType.PendingReview, name: "PendingReview", label: "待审核" },
  { type: CaseType.Approved, name: "Approved", label: "审核通过" },
  { type: CaseType.NotApproved, name: "NotApproved", label: "未通过" },
];

const tableCaseType = ref<CaseType>(CaseType.Staging);
const loading = ref<boolean>(false);
const dataSource = ref<{ [key: string]: string }[]>([]);
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
const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});
const getCaseData = async () => {
  const { result } = await caseinfo.myPage({
    status: tableCaseType.value,
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
  });

  if (result) {
    dataSource.value = [...result.records];
    pagination.total = result.total;
  }
};

getCaseData();

const changeType = (type: CaseType) => {
  tableCaseType.value = type;
  pagination.current = 1;
  getCaseData();
};

const handleTableChange = async (newpager: any) => {
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getCaseData();
};
</script>
<template>
  <a-layout-content
    style="padding: 20px 0; margin: 0 auto; width: 100%"
    class="flex flex-col"
  >
    <div class="result-container">
      <div class="mycase-tab">
        <span
          class="text-3.5 cursor-pointer m-4 m-l-0"
          v-for="item in CaseTypeMap"
          :style="{ color: tableCaseType === item.type ? '#222' : '#999' }"
          :class="{ 'line-title': tableCaseType === item.type }"
          @click="changeType(item.type)"
        >
          <span>{{ item.label }}</span>
        </span>
      </div>
      <a-table
        :columns="columns"
        :row-key="(record:any) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record, text }">
          <div
            class="c-#5b3df2 cursor-pointer"
            @click="
              $router.push({ name: 'MyCaseDetail', params: { id: record.id } })
            "
            v-if="column.dataIndex === 'name'"
          >
            {{ text }}
          </div>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>
<style lang="less">
.mycase-tab {
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 10px;
}
</style>
