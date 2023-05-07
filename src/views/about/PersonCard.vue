<script lang="ts" setup>
import {
  UserOutlined,
  UploadOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from "@/store/user";
import { Modal } from "ant-design-vue";
import { imgBaseUrl } from "@/utils/config";

const { userInfo, logout } = useUserStore();
const myMenus = [
  {
    name: "SubmissionManage",
    label: "投稿管理",
  },
  {
    name: "MyCollection",
    label: "我的收藏",
  },
  {
    name: "MyLike",
    label: "我的喜欢",
  },
  {
    name: "MyComments",
    label: "我的评论",
  },
  {
    name: "Messages",
    label: "消息中心",
  },
  {
    name: "Authentication",
    label: "实名认证",
  },
];

const logoutCallback = () => {
  Modal.confirm({
    title: "提示",
    content: "确定要退出登录吗？",
    okText: "确定",
    cancelText: "取消",
    onOk: () => {
      logout();
      location.reload();
    },
  });
};
</script>
<template>
  <div class="person-card">
    <div class="person-detail text-center c-#fff">
      <a-avatar
        shape="circle"
        v-if="userInfo && userInfo.avatar"
        :src="`${imgBaseUrl}${userInfo.avatar}`"
        :size="54"
        class="m-t-10"
        :title="userInfo && userInfo.username"
      >
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar
        shape="circle"
        v-else
        :size="54"
        class="m-t-10"
        :title="userInfo && userInfo.username"
      >
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <div class="m-t-2 m-b-2">{{ userInfo && userInfo.username }}</div>
      <div>ID:{{ userInfo && userInfo.code }}</div>
      <div class="flex justify-around items-center m-t-10 p-b-5">
        <span
          class="flex-1 cursor-pointer"
          @click="$router.push({ name: 'PersonInfo' })"
        >
          <form-outlined />
        </span>
        <a-divider style="border-color: #fff" type="vertical" />
        <span class="flex-1 cursor-pointer">
          <span class="inline-block rotate-90" @click="logoutCallback">
            <upload-outlined />
          </span>
        </span>
      </div>
    </div>
    <div class="person-menu my-menu p-t-5 p-b-5">
      <div
        class="menu-item flex"
        v-for="item in myMenus"
        @click="$router.push({ name: item.name })"
        :class="{
          active: $route.name === item.name || $route.meta.active == item.name,
        }"
      >
        <span class="truncate flex-1">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.person-card {
  position: absolute;
  width: 180px;
  top: 0;
  z-index: 1;
  left: 150px;
  .person-detail {
    background-color: #5b3df2;
    padding-top: 20vh;
  }
  .person-menu {
    background-color: #fff;
  }
}
</style>