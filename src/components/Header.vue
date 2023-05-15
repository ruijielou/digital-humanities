<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoginModal from "./LoginModal.vue";
import IconLogin from "./icons/IconLogin.vue";
import IconUser from "./icons/IconUser.vue";
import IconMessage from "./icons/IconMessage.vue";
import LogoIcon from "./LogoIcon.vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import Search from "./Search.vue";
import { Storage, TOKEN_KEY, imgBaseUrl } from "@/utils/config";
import { LoginTypeMap } from "@/utils/type";
import { useUserStore } from "@/store/user";
import { categoryList } from "@/utils/type";

defineProps<{
  title?: string;
  bgName?: string;
}>();

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const loginModalRef = ref();
const visibleSearch = ref<boolean>(false);

const openToContribute = () => {
  if (!Storage.get(TOKEN_KEY)) {
    userStore.openLogin();
  } else {
    router.push({ name: "Contribute" });
  }
};

const openLoginModal = () => {
  if (!Storage.get(TOKEN_KEY)) {
    loginModalRef.value.visible = true;
    loginModalRef.value.changeLoginType(LoginTypeMap.Password);
  } else {
    router.push({ name: "SubmissionManage" });
  }
};

const visible = ref<boolean>(false);
const changeVisibile = () => {
  visible.value = !visible.value;
};
const goPages = (name: string) => {
  route.name === name ? location.reload() : router.push({ name });
};
</script>
<template>
  <a-layout-header
    class="flex justify-between items-start layout-header"
    :style="{
      backgroundImage: bgName ? `url(/src/assets/image/${bgName}.png)` : 'none',
    }"
  >
    <LogoIcon @click="changeVisibile" />
    <div class="header-title">{{ title }}</div>
    <div class="header-icons flex items-center">
      <span @click="visibleSearch = !visibleSearch">
        <SearchOutlined
          class="cursor-pointer"
          style="color: #fff; font-size: 20px"
        />
      </span>
      <span @click="openToContribute" class="m-l-4">
        <IconLogin class="cursor-pointer" />
      </span>
      <span class="m-l-4" @click="router.push({ name: 'Messages' })">
        <IconMessage class="cursor-pointer" />
      </span>
      <span
        class="m-l-4 cursor-pointer"
        @click="openLoginModal"
        :title="userStore.userInfo?.username || ''"
      >
        <a-avatar
          v-if="userStore.userInfo?.avatar"
          shape="circle"
          :size="20"
          class="m-b-3"
          :src="`${imgBaseUrl}${userStore.userInfo?.avatar}`"
          title="person"
        >
        </a-avatar>
        <IconUser v-else />
      </span>
    </div>
    <a-modal
      width="100%"
      wrap-class-name="transparent-full-modal"
      v-model:visible="visibleSearch"
      :footer="null"
      :closable="true"
    >
      <Search @closeSearch="() => (visibleSearch = !visibleSearch)" />
    </a-modal>
    <LoginModal ref="loginModalRef" />
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
            class="category-item cursor-pointer"
            :class="{active: $route.name === item.name}"
            v-for="item in categoryList"
            :key="item.name"
            @click="goPages(item.name)"
          >
            <span class="line"></span>
            <span class="m-l-2">
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </a-drawer>
  </a-layout-header>
</template>
<style lang="less">
.layout-header {
  background-size: cover;
  background-position: center center;
  position: relative;
  height: 20vh;
  padding: 10px 40px;
  .header-icons {
    & > span {
      display: inline-block;
    }
  }
  .header-title {
    font-size: 44px;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.ant-drawer-body {
  padding-left: 0;
}

.draw-content {
  .title {
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
    line-height: 21px;
    margin: 24px 0 0 40px;
  }

  .category-item {
    margin: 15px 0;

    .line {
      width: 70px;
      border-top: 1px solid #fff;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      transition: width 0.2s linear;
      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: -2px;
        width: 3px;
        border-radius: 50%;
        height: 3px;
        background-color: #fff;
        transition: all 0.2s linear;
      }
    }

    &.active,
    &:hover {
      .line {
        width: 130px;
        border-image: linear-gradient(
            270deg,
            rgba(242, 67, 217, 1),
            rgba(24, 96, 247, 1)
          )
          1 1;
      }
    }
  }
}
</style>
