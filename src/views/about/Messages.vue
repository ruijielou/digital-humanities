<script lang="ts" setup>
import { ref } from "vue";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import LogoText from "../../components/LogoText.vue";
import MessageItem from "./components/MessageItem.vue";
import CommentItem from "./components/CommentItem.vue";
import type { MessageItemType } from "./type";

const messageData = [
  {
    id: 1,
    type: "announ",
    isRead: false,
    createTime: "2023-01-22",
    desc: "近期收到一些用户反馈，封面图片上传后变成了方块，在收到反馈后，我们第一时间进行了调研，问题已经解决。近期收到一些用户反馈，封面图片上传后变成了方块，在收到反馈后，我们第一时间进行了调研，问题已经解决。",
  },
  {
    id: 2,
    type: "verify",
    createTime: "2023-01-12",
    desc: "您上传的GLAM融合案例库审核通过~",
  },
];

const commentData = [
  {
    name: "张三",
    photo: "",
    casename: "欧洲时光机",
    content: "这是个值得深入研究的案例。",
  },
  {
    name: "张三",
    photo: "",
    casename: "欧洲时光机",
    content: "这是个值得深入研究的案例。",
  },
];

const message = ref<MessageItemType[]>([...messageData]);
const changeRead = (id: number) => {
  const updataList = message.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        isRead: true,
      };
    }
    return {
      ...item,
    };
  });
  message.value = updataList;
};

const messageType = ref<string>("all");
const filterData = (type: string) => {
  messageType.value = type;
  message.value =
    type == "all" ? [...messageData] : [...messageData.filter((item:MessageItemType) => item.type === type)];
};
const menuType = ref<string>('message')
</script>
<template>
  <div>
    <a-layout-content
      style="padding: 20px 0; margin: 0 auto; width: 80%; position: relative"
      class="flex flex-col"
    >
      <div
        class="return-prev-page cursor-pointer absolute z-2"
        @click="$router.go(-1)"
      >
        <arrow-left-outlined />
        <span class="p-l-2">个人中心</span>
      </div>
      <LogoText style="margin-top -5px;" text="消息中心" />
      <div class="message-container flex p-t-7">
        <div>
          <div class="my-menu message-menu">
            <div class="menu-item flex" :class="{active: menuType === 'message'}" @click="menuType = 'message'">
              <span class="truncate flex-1">通知</span>
            </div>
            <div class="menu-item flex" :class="{active: menuType === 'comment'}" @click="menuType = 'comment'">
              <span class="truncate flex-1">评论</span>
            </div>
          </div>
        </div>
        <div class="flex-1 p-20 p-t-0" v-if="menuType === 'message'">
          <div class="message-tab">
            <span
              class="text-4.5 cursor-pointer m-4 m-l-0"
              :class="{ 'line-title': messageType === 'all' }"
              @click="filterData('all')"
            >
              <span>全部</span>
            </span>
            <span
              class="text-4.5 cursor-pointer m-4 m-l-0"
              :class="{ 'line-title': messageType === 'announ' }"
              @click="filterData('announ')"
            >
              <span>公告</span>
            </span>
            <span
              class="text-4.5 cursor-pointer m-4 m-l-0"
              :class="{ 'line-title': messageType === 'verify' }"
              @click="filterData('verify')"
            >
              <span>审核</span>
            </span>
          </div>
          <div class="message-list">
            <MessageItem
              @changeRead="changeRead"
              v-for="item in message"
              :message="item"
            />
          </div>
        </div>
        <div class="comments flex-1 p-20 p-t-0" v-if="menuType === 'comment'">
          <CommentItem v-for="item in commentData" :comment="item"/>
        </div>
      </div>
    </a-layout-content>
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
