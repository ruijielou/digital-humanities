<script lang="ts" setup>
import { ref, onMounted, watch,reactive } from "vue";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import LogoText from "../../components/LogoText.vue";
import MessageItem from "./components/MessageItem.vue";
import CommentItem from "./components/CommentItem.vue";
import { MessageItemType, MessageType } from "./type";
import { announcement, comment } from "@/api";
// const messageData = [
//   {
//     id: 1,
//     type: "announ",
//     isRead: false,
//     createTime: "2023-01-22",
//     desc: "近期收到一些用户反馈，封面图片上传后变成了方块，在收到反馈后，我们第一时间进行了调研，问题已经解决。近期收到一些用户反馈，封面图片上传后变成了方块，在收到反馈后，我们第一时间进行了调研，问题已经解决。",
//   },
// ];


const message = ref<MessageItemType[]>([]);
const commentData = ref<any>([]);
const messageType = ref<MessageType>(MessageType.All);
const changeRead = async (id: number) => {
  const result = await announcement.updateRead(id);
  if (result?.success) {
    getMessage();
  }
};

const visibleView = ref<boolean>(false);
const currentData = reactive<any>({data: {}});
const filterData = (type: MessageType) => {
  messageType.value = type;
  getMessage();
  // message.value =
  //   type == MessageType.All
  //     ? [...messageData]
  //     : [...messageData.filter((item: MessageItemType) => item.type === type)];
};
const menuType = ref<string>("message");
const getMessage = async (type?: MessageType) => {
  const { result } = await announcement.myPage(type || messageType.value);
  message.value = result?.records; //调试数据的时候再放开代码
};
// comment/myPage
const getComment = async () => {
  const { result } = await comment.myPage();
  commentData.value = result?.records; //调试数据的时候再放开代码
};

const openView = (data: any) => {
  currentData.data = {...data};
  visibleView.value = true;
}

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
        @click="$router.push({name: 'About'})"
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
              v-for="item in message"
              :message="item"
            />
          </div>
        </div>
        <div class="comments flex-1 p-20 p-t-0" v-if="menuType === 'comment'">
          <CommentItem @openView="openView" v-for="item in commentData" :comment="item" />
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