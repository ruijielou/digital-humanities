<script setup lang="ts">
import { ref, reactive } from "vue";
import {message, Modal} from "ant-design-vue"
import { useUserStore } from "@/store/user";
// import type { LoginState } from "../views/home/type";
import {to} from "@/utils/config"

const userStore = useUserStore();
interface LoginState {
    username: string;
    password: string;
}

const loginType = ref<string>("password");
const visible = ref<boolean>(false);
const handleOk = () => {
  console.log("handleOk");
};
const changeVisibile = () => {
  visible.value = !visible.value;
};
const formState = reactive<LoginState>({
  username: "",
  password: "",
});
// 登录
const onFinish = async (values: any) => {
  console.log("Success:", values);
  if(!values.username || !values.password) {
    Modal.error({
      title: () => "提示",
      content: () => '用户名或者密码不能为空',
    });
    return
  }
  const [err] = await to(userStore.login({...values}));
  if (err) {
    Modal.error({
      title: () => "提示",
      content: () => err.message,
    });
  } else {
    // message.success("登录成功！");
    setTimeout(() => {
      // changeVisibile();
      window.location.reload(); //登录成功刷新页面
    },
    1000
    // router.replace(route.query.redirect ?? "/")
    );
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const changeLoginType = (type:string) => {
  loginType.value = type;
}

defineExpose({ visible,changeLoginType });
</script>

<template>
  <a-modal
    wrapClassName="digital-modal"
    v-model:visible="visible"
    @ok="handleOk"
    :width="510"
    :footer="null"
    :closable="false"
    :centered="true"
  >
    <template #title>
      <div class="login-title flex">
        <div class="flex-1 text-center active" v-if="loginType === 'logon'" @click="changeLoginType('password')">新用户注册</div>
        <div class="flex-1 text-center" v-if="loginType !== 'logon'" :class="{active: loginType === 'password'}"  @click="changeLoginType('password')">用户登录</div>
        <div class="flex-1 text-center" v-if="loginType !== 'logon'" :class="{active: loginType === 'VerificationCode'}" @click="changeLoginType('VerificationCode')">验证码登录</div>
      </div>
    </template>
    <div class="login">
      <!-- 登录 -->
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <template v-if="loginType === 'password'">
          <a-form-item label="账号" name="username">
            <a-input v-model:value="formState.username" />
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="formState.password" />
            <div class="flex justify-end p-t-3">
              <span style="color: #f243d9">忘记密码?</span>
            </div>
          </a-form-item>
        </template>
        <template v-else> 
          <!-- 验证码登录 -->
          <a-form-item label="手机号码" name="username">
            <a-input v-model:value="formState.username" />
          </a-form-item>
          <a-form-item label="验证码" name="password">
            <a-input v-model:value="formState.password" />
          </a-form-item>
          <a-form-item  style="margin-bottom: 2px" v-if="loginType === 'logon'" label="密码" name="password">
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
          <div v-if="loginType === 'VerificationCode'" style="height: 34px"></div>
        </template>
        <a-form-item
          :wrapper-col="{ offset: 4, span: 18 }"
          style="margin-bottom: 0"
        >
          <div class="text-center p-t10">
            <a-button v-if="loginType !== 'logon' "  type="primary" style="width: 90px" html-type="submit"
              >登录</a-button
            >
            <a-button type="primary" @click="changeLoginType('logon')" style="width: 90px" class="m-l-5" :ghost="loginType !== 'logon'"
              >注册</a-button
            >
          </div>
          <div class="text-center p-t-3">
            <span class="">登录则代表你同意</span>
            <span class="primary-color cursor-pointer">用户协议</span>
            <span class="">与</span>
            <span class="primary-color cursor-pointer">隐私政策</span>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
<style lang="less">
.login {
  .ant-input-affix-wrapper,
  .ant-input {
    background-color: #f5f5f5;
  }
}
.login-title {
  div {
    position: relative;
    cursor: pointer;
    padding: 20px 10px 10px 10px;
    &.active {
      color: #5b3df2;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 6px;
        background: #5b3df2;
      }
    }
  }
}
</style>
