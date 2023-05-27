<!-- 我喜欢的 -->
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons-vue";
import type { PageinationType } from "../../utils/type";
import { comment } from "@/api";
import { message } from "ant-design-vue";

const loading = ref<boolean>(false);
const columns = [
  {
    title: "名称",
    dataIndex: "caseName",
  },
  {
    title: "内容",
    dataIndex: "remark",
  },
  {
    title: "",
    dataIndex: "operation",
  },
];

const dataSource = ref<any>([]);

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});

const handleTableChange = async (newpager: any) => {
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getComment();
};
const moreOperation = (id: number) => {
  comment.del(id).then((res) => {
    if (res.success) {
      message.success("删除成功");
      getComment();
    }
  });
};
const getComment = async () => {
  // pageNo  页码
  // pageSize 每页记录数量
  const { result } = await comment.myPage(
    `pageNo=${pagination.current}&pageSize=${pagination.pageSize}`
  );
  dataSource.value = result?.records;
  pagination.total = result.total;
};
getComment();
</script>
<template>
  <a-layout-content
    style="padding: 20px;padding-right: 0; margin: 0 auto; width: 100%"
    class="flex flex-col"
  >
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">我的评论</h2>
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
              $router.push({ name: 'CaseDetail', params: { id: record.contentId } })
            "
            v-if="column.dataIndex === 'caseName'"
          >
            {{ `${((pagination.current -1 ) * pagination.pageSize) + index + 1}` }}
            <span class="m-l-1">{{ text }}</span>
          </div>
          <div v-if="column.dataIndex === 'operation'">
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="moreOperation(record.id)"
            >
              <span class="cursor-pointer">删除</span>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>