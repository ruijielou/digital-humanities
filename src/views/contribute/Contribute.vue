<script lang="ts" setup>
import { ref, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import Header from "../../components/Header.vue";

const selectedTag = ref<string[]>([]);
const currentStep = ref<number>(0);

const chooseTag = (value: string) => {
    selectedTag.value = Array.from(new Set([...selectedTag.value, value])).filter(item => item !== '自定义案例库');
};

const groupData = [
  {
    title: "数字GLAM",
    options: [
      "GLAM融合案例库",
      "数字图书馆案例库",
      "数字博物馆案例库",
      "数字档案馆案例库",
      "数字艺术案例库",
    ],
  },
  {
    title: '研究领域',
    options: [
        '女性文学案例库',
        '中国古典文献案例库',
        '文字、语言案例库',
        '地图、GIS案例库',
        '数字文化遗产案例库',
        '海外研究中国案例库',
        '数字记忆案例库',
        '其他学科领域案例库'
    ]
  },
  {
    title: '机构平台',
    options: [
        '数字人文会议获奖案例库',
        '高校数字人文研究项目案例库',
        '联盟、企业案例库'
    ]
  },
  {
    title: '基础设施',
    options: [
        '数字学术平台案例库',
        '数字计划案例库',
        '数字人文工具案例库',
        '法律、法规案例库'
    ]
  }
];
const chooseCustomTag = () => {
    selectedTag.value = ['自定义案例库'];
}
</script>
<template>
  <div class="h-screen overflow-auto">
    <Header class="contribute-header" />
    {{ selectedTag }}
  <a-layout-content style="padding-top: 20px;padding-bottom: 20px" class="flex flex-col">
    <div class="contribute-page-title text-center">
      <img src="../../assets/image/title-l.png" alt="" />
      <span class="p-l-4 p-r-4 text-6 v-middle" style="letter-spacing: 5px"
        >案例投稿</span
      >
      <img src="../../assets/image/title-r.png" alt="" />
    </div>
    <div class="p-l-100 p-r-100 p-t-5 p-b-5">
      <a-steps :current="currentStep" size="small">
        <a-step title="选择案例库" />
        <a-step title="完善管理信息" />
        <a-step title="完成" />
      </a-steps>
    </div>
    <div class="group-container">
      <div class="group-tags">
        <span class="tag-item" :class="{active: selectedTag.includes('自定义案例库')}" @click="chooseCustomTag">
            <PlusOutlined />
            自定义案例库
        </span>
      </div>
      <div class="group-item" v-for="(item, index) in groupData" :key="index">
        <div class="group-item-title">
          <span class="line-title" 
            >{{ item.title }}</span
          >
        </div>
        <div class="group-tags">
            <span v-for="(tag, i) in item.options" @click="chooseTag(tag)" :key="i" class="tag-item" :class="{active: selectedTag.includes(tag)}">{{tag}}</span>
        </div>
      </div>
    </div>

    <div class="text-center p-t-10">
        <a-button type="primary">下一步</a-button>
    </div>
  </a-layout-content>
  </div>
</template>
<style lang="less">
.contribute-header {
  //   height: 200px;
  background-image: url("../../assets/image/bg1.png");
  background-size: cover;
  background-position: center center;
}
.group-container {
  padding: 20px 120px;
  .group-tags {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
  }
  .tag-item {
    // width: 280px;
    // margin: 8px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    line-height: 44px;
    height: 44px;
    background-color: #f5f5f5;
    color: #333;
    &:hover {
      color: @primary-color;
      background: #eeebff;
    }
    &.active {
      background: @primary-color;
      color: #fff;
    }
  }
  .group-item {
    padding: 10px 0;
    .group-item-title {
      width: 100%;
      padding: 10px 0;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        right: 0;
        width: calc(100% - 88px);
        height: 1px;
        background-color: #ccc;
        top: 50%;
      }
      &:before {
        content: "";
        position: absolute;
        left: 76px;
        width: 6px;
        height: 6px;
        background-color: #ccc;
        top: 50%;
        transform: translateY(-50%) rotate(-45deg);
      }
      .line-title {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: -2px;
          bottom: -2px;
          width: 24px;
          height: 8px;
          z-index: -1;
          background: #f243d9;
        }
      }
    }
  }
}
</style>
