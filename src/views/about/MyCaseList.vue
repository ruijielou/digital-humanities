<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { PageinationType } from "../../utils/type";
import { caseApi } from "@/api";
// case/myPage

const loading = ref<boolean>(false);
const dataSource = ref<{[key:string]: string}[]>([]);
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
    dataIndex: "createTime",
  },
];

const getCaseData = async () => {
  const { result } = await caseApi.myPage();

  result && (dataSource.value = [...result.records]);
};

getCaseData();

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});
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
              $router.push({ name: 'CaseDetail', params: { id: record.id } })
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
