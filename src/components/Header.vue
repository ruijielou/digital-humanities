<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import LoginModal from "./LoginModal.vue";
import IconLogin from "./icons/IconLogin.vue";
import IconUser from "./icons/IconUser.vue";
import IconMessage from "./icons/IconMessage.vue";
import LogoIcon from "./LogoIcon.vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import Search from "./Search.vue";
import { Storage, TOKEN_KEY,imgBaseUrl } from "@/utils/config";
import { LoginTypeMap } from "@/utils/type";
import { useUserStore } from "@/store/user";
// const token = Storage.get(TOKEN_KEY);
// const emit = defineEmits(['fun1', '']);

defineProps<{
  title?: string;
  bgName?: string;
}>();

const userStore = useUserStore();
const router = useRouter();
const loginModalRef = ref();
const visibleSearch = ref<boolean>(false);

const openToContribute = () => {
  router.push({ name: "Contribute" });
};

const openLoginModal = () => {
  if (!Storage.get(TOKEN_KEY)) {
    loginModalRef.value.visible = true;
    loginModalRef.value.changeLoginType(LoginTypeMap.Password);
  } else {
    router.push({ name: "SubmissionManage" });
  }
};
watch(
  () => userStore.isOpenLogin,
  (val) => {
    val && openLoginModal();
  }
);
</script>
<template>
  <a-layout-header
    class="flex justify-between items-start layout-header"
    :style="{
      backgroundImage: bgName ? `url(/src/assets/image/${bgName}.png)` : 'none',
    }"
  >
    <LogoIcon />
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
      <!-- <span v-if="userStore.userInfo?.avatar">
       
      </span> -->
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
        <!-- {{ userStore.userInfo?.username  }} -->
      </span>
    </div>
    <a-modal
      width="100%"
      wrap-class-name="transparent-full-modal"
      v-model:visible="visibleSearch"
      :footer="null"
      :closable="true"
    >
      <Search />
    </a-modal>
    <LoginModal ref="loginModalRef" />
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
</style>
