<!-- 我喜欢的 -->
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { favorite } from "@/api";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  HeartFilled,
} from "@ant-design/icons-vue";
import type { PageinationType } from "../../utils/type";
import { message } from "ant-design-vue";

const caseMoveModal = ref<boolean>(false);
const openStatus = ref<number>(1);
const caseClasstify = ref<number>(0);
const loading = ref<boolean>(false);
const openCaseClasstify = ref<boolean>(false);
const checkedMoves = ref<string[]>([]);
const openCaseName = ref<boolean>(false);
const caseName = ref<string>("");
const columns = [
  {
    title: "名称",
    dataIndex: "caseName",
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

const dataSource = ref<any[]>([]);

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});

const handleTableChange = async (newpager: any) => {
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getMylike();
};

const getMylike = async () => {
  const paramsQuery = {
    type: 2,
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
  };

  const { result } = await favorite.myPage({ ...paramsQuery });
  if (result) {
    dataSource.value = [...result.records];
  }
};
getMylike();
// 取消喜欢
const cancelFavorited = async (id: string) => {
  if (!id) return;
  const params = {
    type: 2, //点赞2 收藏1
    contentId: id,
  };
  const res = await favorite.del(params);
  if (res.success) {
    message.success(res.message);
    getMylike();
  }
};
</script>
<template>
  <a-layout-content
    style="padding: 20px;padding-right: 0; margin: 0 auto; width: 100%"
    class="flex flex-col"
  >
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">我的喜欢</h2>
      </div>
    </div>
    <div class="result-container p-t-8 p-r-120px">
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
              $router.push({ name: 'CaseDetail', params: { id: record.caseId } })
            "
            v-if="column.dataIndex === 'caseName'"
          >
            {{ `${((pagination.current -1 ) * pagination.pageSize) + index + 1}` }}
            <span class="m-l-1">{{ text }}</span>
          </div>
          <template v-else-if="column.dataIndex === 'operation'">
            <a-popconfirm
              title="确定要取消收藏吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="cancelFavorited(record.contentId)"
            >
              <span class="cursor-pointer">
                <HeartFilled style="color: #f243d9" />
                取消
              </span>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>