<script lang="ts" setup>
import {
  UserOutlined,
  UploadOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
const myMenus = [
    {
        name: 'SubmissionManage',
        label: '投稿管理'
    },
    {
        name: 'MyCollection',
        label: '我的收藏'
    },
    {
        name: 'MyLike',
        label: '我的喜欢'
    },
    {
        name: 'MyComments',
        label: '我的评论'
    },
    {
        name: 'Messages',
        label: '消息中心'
    },
    {
        name: 'Authentication',
        label: '实名认证'
    }
]
</script>
<template>
  <div class="person-card">
    <div class="person-detail text-center c-#fff">
      <a-avatar shape="circle" :size="54" class="m-t-10" title="person">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <div class="m-t-2 m-b-2">张三</div>
      <div>ID:123456789</div>
      <div class="flex justify-around items-center m-t-10 p-b-5">
        <span class="flex-1">
          <form-outlined />
        </span>
        <a-divider style="border-color: #fff" type="vertical" />
        <span class="flex-1">
          <span class="inline-block rotate-90">
            <upload-outlined />
          </span>
        </span>
      </div>
    </div>
    <div class="person-menu p-t-5 p-b-5">
      <div class="menu-item flex" v-for="item in myMenus" @click="$router.push({name: item.name})" :class="{active: $route.name === item.name || $route.meta.active == item.name}">
        <span class="truncate flex-1">{{item.label}}</span>
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
    .menu-item {
      padding: 1em 10px 10px 2em;
      cursor: pointer;
      position: relative;

      &.active,
      &:hover {
        background: #ede6ff;
        &:after {
          content: "";
          position: absolute;
          right: 10px;
          top: 50%;
          display: inline-block;
          transform: translateY(-50%);
          height: 14px;
          width: 20px;
          background-image: url(../../assets/image/title-l.png);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
      }
    }
  }
}
</style>
