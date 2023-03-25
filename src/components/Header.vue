<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginModal from "./LoginModal.vue";
import IconLogin from "./icons/IconLogin.vue";
import IconUser from "./icons/IconUser.vue";
import IconMessage from "./icons/IconMessage.vue";
import LogoIcon from "./LogoIcon.vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import Search from "./Search.vue";
// const emit = defineEmits(['fun1', '']);

defineProps<{
  title?: string;
}>();

const router = useRouter();
const loginModalRef = ref();
const visibleSearch = ref<boolean>(false);

const openToContribute = () => {
  router.push({ name: "Contribute" });
};

const openLoginModal = () => {
  loginModalRef.value.visible = true;
  loginModalRef.value.changeLoginType("password");
};
</script>
<template>
  <a-layout-header
    class="flex justify-between items-start layout-header"
    style="height: 20vh; padding: 10px 40px"
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
      <span class="m-l-4">
        <IconMessage class="cursor-pointer" />
      </span>
      <span class="m-l-4" @click="openLoginModal">
        <IconUser class="cursor-pointer" />
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
  background-image: url("../../assets/image/caselibrary-bg.png");
  background-size: cover;
  background-position: center center;
  position: relative;
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
