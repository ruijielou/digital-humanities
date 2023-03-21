<script setup lang="ts">
import IconLogin from "../../components/icons/IconLogin.vue";
import IconUser from "../../components/icons/IconUser.vue";
import IconMessage from "../../components/icons/IconMessage.vue";
import {
  SearchOutlined,
  DownOutlined,
  DoubleRightOutlined,
  RightOutlined
} from "@ant-design/icons-vue";
const searchFields = "";
const onSearch = () => {
  console.log("search");
};
</script>

<template>
  <a-layout class="home-container h-screen">
    <a-layout-header
      class="flex justify-between"
      style="height: 100px; line-height: 100px; padding: 0 40px;"
    >
      <div>
        <img src="../../assets/image/logo.png" alt="" />
      </div>
      <div class="header-icons flex items-center">
        <IconLogin class="cursor-pointer" />
        <IconUser class="cursor-pointer" />
        <IconMessage class="cursor-pointer" />
      </div>
    </a-layout-header>
    <a-layout-content style="padding-top: 8%" class="flex flex-col">
      <div class="home-content">
        <h1 class="title">数字与人文交汇的时刻</h1>
        <div class="flex items-center justify-center">
          <a-input
            class="transparent-input"
            size="large"
            v-model:value="searchFields"
            style="width: 40%"
          >
            <template #addonBefore>
              <div class="cursor-pointer">
                全部
                <DownOutlined />
              </div>
            </template>
            <template #addonAfter>
              <div class="cursor-pointer" style="width: 80px">
                <SearchOutlined />
                搜索
              </div>
            </template>
          </a-input>
          <span class="c-white p-l-4 cursor-pointer">
            高级检索
            <double-right-outlined />
          </span>
        </div>
        <div class="content-text-wrapper flex justify-center p-4">
          <div class="text-wrapper flex-col">
            <span class="text">GLAM数据库</span>
          </div>
          <div class="text-wrapper flex-col">
            <span class="text">数字人文会议获奖项目数据库</span>
          </div>
          <div class="text-wrapper flex-col">
            <span class="text">高校数字人文研究项目分库</span>
          </div>
          <div class="text-wrapper flex-col">
            <span class="text">
              <right-outlined />
            </span>
          </div>
        </div>
      </div>

      <div class="flex justify-center flex-1 items-end">
        <div class="class-item">
          <span class="c-white">分布谱</span>
        </div>
        <div class="class-item">
          <span class="c-white">时间谱</span>
        </div>
        <div class="class-item">
          <span class="c-white">合作谱</span>
        </div>
        <div class="class-item">
          <span class="c-white">知识图谱</span>
        </div>
        <div class="class-item">
          <span class="c-white">主题词谱</span>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer class="flex p-t-4 p-b-4" style="border-top: 1px solid rgba(255,255,255,.3);">
      <div class="footer-item c-white flex-1 text-center">
        <span class="cusor-pointer">案例库</span>
      </div>
      <div class="footer-item c-white flex-1 text-center">
        <span class="cusor-pointer">案例库</span>
      </div>
      <div class="footer-item c-white flex-1 text-center">
        <span class="cusor-pointer">案例库</span>
      </div>
    </a-layout-footer>
  </a-layout>
</template>
<style lang="less">
.home-container {
  background: url(../../assets/image/home_bg.png) no-repeat;
  background-size: cover;
  background-position: center center;
  .header-icons {
    * {
      margin: 10px;
    }
  }
  .home-content {
    text-align: center;
    .title {
      height: 97px;
      line-height: 97px;
      overflow-wrap: break-word;
      color: #fff;
      font-size: 70px;
      letter-spacing: 10px;
      white-space: nowrap;
      text-align: center;
    }
    .content-text-wrapper {
      .text-wrapper {
        padding: 6px 10px;
        background-color: rgba(0, 0, 0, 0.61);
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);
        overflow-wrap: break-word;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        margin: 9px 0 0 8px;
      }
    }
  }
  .class-item {
    position: relative;
    padding-left: 16px;
    margin: 20px;
    cursor: pointer;
    &:before {
      content: "";
      width: 4px;
      height: 4px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &:after {
      content: "";
      width: 12px;
      height: 12px;
      border: 1px solid #ffffff;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
