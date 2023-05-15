<script lang="ts" setup>
import { ref, onMounted, watch, reactive } from "vue";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import LogoText from "../../components/LogoText.vue";
import MessageItem from "./components/MessageItem.vue";
import CommentItem from "./components/CommentItem.vue";
import { MessageItemType, MessageType } from "./type";
import { announcement, comment } from "@/api";
import type { PageinationType } from "@/utils/type";

const commentData = ref<any>([]);
const messageType = ref<MessageType>(MessageType.All);
const changeRead = async (id: number) => {
  const result = await announcement.updateRead(id);
  if (result?.success) {
    getMessage();
  }
};

const visibleView = ref<boolean>(false);
const currentData = reactive<any>({ data: {} });
const filterData = (type: MessageType) => {
  messageType.value = type;
  getMessage();
};
const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
});

const menuType = ref<string>("message");
const getMessage = async (type?: MessageType, isGetMore?: boolean) => {
  let paramsurl:any = `&type=${type || messageType.value}`;
  if (isGetMore) {
    pagination.current = pagination.current + 1;
    paramsurl += `&pageNo=${pagination.current}&pageSize=${pagination.pageSize}`;
  } else {
    pagination.current = 1;
  }
  const { result } = await announcement.myPage(paramsurl);
  if (isGetMore) {
    commentData.value = [...commentData.value, ...result?.records]; //调试数据的时候再放开代码
  } else {
    commentData.value = result?.records; //调试数据的时候再放开代码
  }
  pagination.total = result.total;
  pagination.current = result.current;
  pagination.pageSize = result.size;
};

const getComment = async (isGetMore?: boolean) => {
  let paramsurl = "";

  if (isGetMore) {
    pagination.current = pagination.current + 1;
    paramsurl += `&pageNo=${pagination.current}&pageSize=${pagination.pageSize}`;
  } else {
    pagination.current = 1;
  }

  const { result } = await comment.myPage(paramsurl);
  if (isGetMore) {
    commentData.value = [...commentData.value, ...result?.records]; //调试数据的时候再放开代码
  } else {
    commentData.value = result?.records; //调试数据的时候再放开代码
  }
  pagination.total = result.total;
  pagination.current = result.current;
  pagination.pageSize = result.size;
};

const openView = (data: any) => {
  currentData.data = { ...data };
  visibleView.value = true;
};

watch(
  () => menuType.value,
  (val: string) => {
    if (val === "message") {
      getMessage();
    }
    if (val === "comment") {
      getComment();
    }
  }
);

onMounted(() => {
  getMessage();
});
</script>
<template>
  <div>
    <a-layout-content
      style="padding: 20px 0; margin: 0 auto; width: 80%; position: relative"
      class="flex flex-col"
    >
      <div
        class="return-prev-page cursor-pointer absolute z-2"
        @click="$router.push({ name: 'Mine' })"
      >
        <arrow-left-outlined />
        <span class="p-l-2">个人中心</span>
      </div>
      <LogoText style="margin-top -5px;" text="消息中心" />
      <div class="message-container flex p-t-7">
        <div>
          <div class="my-menu message-menu">
            <div
              class="menu-item flex"
              :class="{ active: menuType === 'message' }"
              @click="menuType = 'message'"
            >
              <span class="truncate flex-1">通知</span>
            </div>
            <div
              class="menu-item flex"
              :class="{ active: menuType === 'comment' }"
              @click="menuType = 'comment'"
            >
              <span class="truncate flex-1">评论</span>
            </div>
          </div>
        </div>
        <div class="flex-1 p-20 p-t-0" v-if="menuType === 'message'">
          <div class="message-tab">
            <span
              class="text-4.5 cursor-pointer m-4 m-l-0"
              :class="{ 'line-title': messageType === MessageType.All }"
              @click="filterData(MessageType.All)"
            >
              <span>全部</span>
            </span>
            <span
              class="text-4.5 cursor-pointer m-4 m-l-0"
              :class="{ 'line-title': messageType === MessageType.Announ }"
              @click="filterData(MessageType.Announ)"
            >
              <span>公告</span>
            </span>
            <span
              class="text-4.5 cursor-pointer m-4 m-l-0"
              :class="{ 'line-title': messageType === MessageType.Verify }"
              @click="filterData(MessageType.Verify)"
            >
              <span>审核</span>
            </span>
          </div>
          <div class="message-list">
            <MessageItem
              @openView="openView"
              @changeRead="changeRead"
              v-for="item in commentData"
              :message="item"
            />
            <p
            class="text-center cursor-pointer"
              v-if="commentData.length && commentData.length < pagination.total"
              @click="getMessage(messageType, true)"
            >
              加载更多
            </p>
            <p class="text-center" v-else>没有更多了</p>
          </div>
        </div>
        <div class="comments flex-1 p-20 p-t-0" v-if="menuType === 'comment'">
          <CommentItem
            @openView="openView"
            v-for="item in commentData"
            :comment="item"
          />
          <p
          class="text-center cursor-pointer"
            v-if="commentData.length < pagination.total"
            @click="getComment(true)"
          >
            加载更多
          </p>
          <p class="text-center" v-else>没有更多了</p>
        </div>
      </div>
    </a-layout-content>
    <a-modal :footer="false" v-model:visible="visibleView" title="查看">
      <p v-html="currentData.data.content || currentData.data.remark"></p>
    </a-modal>
  </div>
</template>
<style lang="less">
.message-menu {
  padding-top: 15px;
  padding-bottom: 15px;
  width: 180px;
  background: #ffffff;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
}
.message-tab {
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 10px;
}
</style>
