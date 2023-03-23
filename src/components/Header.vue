<script lang="ts" setup>
import {ref, defineEmits} from "vue"
import { useRouter } from "vue-router";
import LoginModal from "./LoginModal.vue";
import IconLogin from "./icons/IconLogin.vue";
import IconUser from "./icons/IconUser.vue";
import IconMessage from "./icons/IconMessage.vue";
import LogoIcon from "./LogoIcon.vue";
import {SearchOutlined} from "@ant-design/icons-vue";
// const emit = defineEmits(['fun1', '']);

const router = useRouter();
const loginModalRef = ref();

const openToContribute = () => {
  router.push({name: 'Contribute'})
}

const openLoginModal = () => {
  loginModalRef.value.visible = true;
  loginModalRef.value.changeLoginType('password');
};

</script>
<template>
     <a-layout-header
      class="flex justify-between"
      style="height: 200px; line-height: 100px; padding: 0 40px;padding-bottom: 100px;"
    >
      <LogoIcon />
      <div class="header-icons flex items-center">
        <span >
          <SearchOutlined class="cursor-pointer" style="color: #fff; font-size: 20px;" />
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
      <LoginModal ref="loginModalRef" />
    </a-layout-header>
</template>