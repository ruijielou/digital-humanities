<script setup lang="ts">
import { ref } from "vue";
import LogoIcon from "../../components/LogoIcon.vue";
import IconLogin from "../../components/icons/IconLogin.vue";
import IconUser from "../../components/icons/IconUser.vue";
import IconMessage from "../../components/icons/IconMessage.vue";
import Labels from "./Labels.vue";
import LoginModal from "./LoginModal.vue";
import {
  SearchOutlined,
  DownOutlined,
  DoubleRightOutlined,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons-vue";
import { CategoryItem, CategoryType } from "./type";

const categoryList: CategoryItem[] = [
  {
    name: "CaseLibrary",
    label: "案例库",
    type: CategoryType.CaseLibrary,
  },
  {
    name: "CaseSpectrum",
    label: "案例谱",
    type: CategoryType.CaseSpectrum,
  },
  {
    name: "Visualization",
    label: "可视化",
    type: CategoryType.Visualization,
  },
  {
    name: "About",
    label: "关于",
    type: CategoryType.About,
  },
];
const searchFields = ref<string>("");
const visible = ref<boolean>(false);
const showLabels = ref<boolean>(false);
const visibleType = ref<number>(0);
const loginModalRef = ref();

const changeShowLabels = () => {
  showLabels.value = !showLabels.value;
};
const onSearch = () => {
  console.log("search");
};

const changeVisibile = (type: number) => {
  visibleType.value = type;
  visible.value = !visible.value;
};
const openLoginModal = () => {
  loginModalRef.value.visible = true;
  loginModalRef.value.changeLoginType('password');
};
</script>

<template>
  <a-layout class="home-container h-screen">
    <a-layout-header
      class="flex justify-between"
      style="height: 100px; line-height: 100px; padding: 0 40px"
    >
      <LogoIcon />
      <div class="header-icons flex items-center">
        <span @click="openLoginModal">
          <IconLogin class="cursor-pointer" />
        </span>
        <span>
          <IconUser class="cursor-pointer" />
        </span>
        <span>
          <IconMessage class="cursor-pointer" />
        </span>
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
            style="width: 50%"
          >
            <template #addonBefore>
              <div class="cursor-pointer" @click="changeShowLabels">
                全部
                <DownOutlined v-if="!showLabels" />
                <UpOutlined v-else />
              </div>
            </template>
            <template #addonAfter>
              <div class="cursor-pointer" style="width: 80px">
                <SearchOutlined />
                搜索
              </div>
            </template>
          </a-input>
          <span class="c-white p-l-4 cursor-pointer" @click="changeShowLabels">
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
          <div class="text-wrapper flex-col" @click="changeShowLabels">
            <span class="text">
              <right-outlined />
            </span>
          </div>
        </div>
        <Labels v-if="showLabels" />
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
    <a-layout-footer
      class="flex p-t-4 p-b-4"
      style="border-top: 1px solid rgba(255, 255, 255, 0.3)"
    >
      <div class="footer-item c-white flex-1 text-center">
        <span
          class="cursor-pointer"
          @click="changeVisibile(CategoryType.CaseLibrary)"
          >案例库</span
        >
      </div>
      <div class="footer-item c-white flex-1 text-center">
        <span
          class="cursor-pointer"
          @click="changeVisibile(CategoryType.CaseSpectrum)"
          >案例谱</span
        >
      </div>
      <div class="footer-item c-white flex-1 text-center">
        <span
          class="cursor-pointer"
          @click="changeVisibile(CategoryType.Visualization)"
          >可视化</span
        >
      </div>
    </a-layout-footer>
    <a-drawer
      placement="left"
      :closable="false"
      :visible="visible"
      @close="changeVisibile"
    >
      <div class="draw-content text-center h-100% flex flex-col">
        <LogoIcon />
        <h4 class="title">数字人文多媒体案例资源库</h4>
        <div
          class="draw-category text-left flex-1 flex flex-col justify-center"
        >
          <div
            class="category-item"
            v-for="item in categoryList"
            :key="item.name"
            :class="{ active: visibleType === item.type }"
          >
            <span class="line"></span>
            {{ item.label }}
          </div>
        </div>
      </div>
    </a-drawer>
    <LoginModal ref="loginModalRef" />
  </a-layout>
</template>
<style lang="less">
@import url(./home.less);
</style>
