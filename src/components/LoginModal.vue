<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { message, Modal } from "ant-design-vue";
import { useUserStore } from "@/store/user";
// import type { LoginState } from "../views/home/type";
import { to } from "@/utils/config";
import { LoginTypeMap } from "@/utils/type";
import { dhuvalidcode, LoginReg, updatePwdByPhone } from "@/api/index";

const userStore = useUserStore();

interface LoginState {
  phone: string;
  password?: string;
  code?: string;
}

const loginType = ref<LoginTypeMap>(LoginTypeMap.Password);
const visible = ref<boolean>(false);
const afterClose = () => {
  userStore.closeLogin();
};
const changeVisibile = () => {
  visible.value = !visible.value;
};
const formState = reactive<LoginState>({
  phone: "",
  password: "",
  code: "",
});
// 登录
const onFinish = async (values: LoginState) => {
  if (loginType.value === LoginTypeMap.Logon) {
    setLogon({ ...values });
  } else if (loginType.value === LoginTypeMap.NewPassword) {
    setNewPassword({ ...values });
  } else {
    loginCallback({ ...values });
  }
};

const loginCallback = async (data: LoginState) => {
  const [err] = await to(userStore.login({ ...data }));
  if (err) {
    Modal.error({
      title: () => "提示",
      content: () => err.message,
    });
  } else {
    message.success("登录成功！");
    setTimeout(() => {
      window.location.reload(); //登录成功刷新页面
    }, 1000);
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  const {values} = errorInfo;
  if (!values.phone) {
    Modal.error({
      title: () => "提示",
      content: () => "用户名不能为空",
    });
    return false;
  }
  if (
    (loginType.value === LoginTypeMap.Password ||
      loginType.value === LoginTypeMap.Logon) &&
    !values.password
  ) {
    Modal.error({
      title: () => "提示",
      content: () => "密码不能为空",
    });
    return false;
  }
  if (
    (loginType.value === LoginTypeMap.Code ||
      loginType.value === LoginTypeMap.Logon) &&
    !values.code
  ) {
    Modal.error({
      title: () => "提示",
      content: () => "验证码不能为空",
    });
    return;
  }
};

const changeLoginType = (type: LoginTypeMap) => {
  loginType.value = type;
  formState.phone = "";
  formState.password = "";
  formState.code = "";
};

// 获取验证码
const getValidCode = async () => {
  // 1为验证码登录
  // 4为重置密码的获取验证码

  const type = loginType.value === LoginTypeMap.NewPassword ? 4 : 1;
  await dhuvalidcode({ username: formState.phone, type });
  codeTimerStart();
};

let codeTimer: any = null;
const countDown = ref<number>(0);

const codeTimerStart = () => {
  clearInterval(codeTimer);
  countDown.value = 60;
  codeTimer = setInterval(() => {
    countDown.value = countDown.value <= 0 ? 0 : countDown.value - 1;
    countDown.value === 0 && clearInterval(codeTimer);
  }, 1000);
};

const setLogon = async (params: LoginState) => {
  const codeRes = await LoginReg({ ...params });
  if (codeRes.success) {
    formState.phone = "";
    formState.password = "";
    formState.code = "";
    Modal.success({
      title: () => "提示",
      content: () => "注册成功，去登录吧",
    });
    changeLoginType(LoginTypeMap.Password)
  }
};
const setNewPassword = async (params: LoginState) => {
  const codeRes = await updatePwdByPhone({ ...params });
  if (codeRes.success) {
    formState.phone = "";
    formState.password = "";
    formState.code = "";
    Modal.success({
      title: () => "提示",
      content: () => "密码重置成功，去登录吧",
    });
    changeLoginType(LoginTypeMap.Password)
  }
};
watch(
  () => userStore.isOpenLogin,
  (val) => {
    val && (visible.value = true);
  },
  {immediate: true}
);
defineExpose({ visible, changeLoginType });
</script>

<template>
  <a-modal
    wrapClassName="digital-modal"
    v-model:visible="visible"
    :afterClose="afterClose"
    :width="420"
    :footer="null"
    :closable="false"
    :centered="true"
  >
    <template #title>
      <div class="login-title flex">
        <div
          class="flex-1 text-center active"
          v-if="loginType === LoginTypeMap.Logon"
          @click="changeLoginType(LoginTypeMap.Password)"
        >
          新用户注册
        </div>
        <div
          class="flex-1 text-center"
          v-if="loginType !== LoginTypeMap.Logon && loginType !== LoginTypeMap.NewPassword"
          :class="{ active: loginType === LoginTypeMap.Password }"
          @click="changeLoginType(LoginTypeMap.Password)"
        >
          用户登录
        </div>
        <div
          class="flex-1 text-center"
          v-if="loginType !== LoginTypeMap.Logon && loginType !== LoginTypeMap.NewPassword"
          :class="{ active: loginType === LoginTypeMap.Code }"
          @click="changeLoginType(LoginTypeMap.Code)"
        >
          验证码登录
        </div>
        <div
          class="flex-1 text-center"
          v-if="loginType === LoginTypeMap.NewPassword"
          :class="{ active: loginType === LoginTypeMap.NewPassword }"
        >
           找回密码
        </div>
      </div>
    </template>
    <div class="login">
      <!-- 登录 -->
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: loginType === LoginTypeMap.Password ? 4 : 5 }"
        labelAlign="left"
        :wrapper-col="{ span: loginType === LoginTypeMap.Password ? 20 : 19 }"
        :hideRequiredMark="true"
        :scrollToFirstError="true"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <template v-if="loginType === LoginTypeMap.Password">
          <a-form-item label="账号" name="phone" required :colon="false">
            <a-input v-model:value="formState.phone" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="密码" name="password" required :colon="false" style="margin-bottom: 0;">
            <a-input-password v-model:value="formState.password" placeholder="请输入" />
          </a-form-item>
          <div class="flex justify-end cursor-pointer">
              <span @click="changeLoginType(LoginTypeMap.NewPassword)" class="c-#f243d9 text-12px">忘记密码?</span>
            </div>
        </template>
        <template v-else>
          <!-- 验证码登录 -->
          <a-form-item label="手机号码" :colon="false" required  >
            <a-input v-model:value="formState.phone" :autocomplete="LoginTypeMap.NewPassword ? 'on': 'new-password'" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="验证码" :colon="false" required >
            <a-input v-model:value="formState.code" placeholder="请输入" autocomplete="new-password">
              <template #suffix>
                <div v-if="countDown !== 0">{{ countDown }}秒后重新获取</div>
                <div
                  v-else
                  @click="getValidCode()"
                  class="c-#5B3DF2 cursor-pointer text-12px"
                >
                  获取验证码
                </div>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            v-if="loginType === LoginTypeMap.Logon || loginType === LoginTypeMap.NewPassword"
            :label="loginType === LoginTypeMap.NewPassword ? '新密码' : '密码'"
            required
          >
            <a-input-password autocomplete="new-password" placeholder="至少8位以上（含字母、数字、大小写）" v-model:value="formState.password" />
          </a-form-item>
        </template>
        <a-form-item
          :wrapper-col="{ offset: 0, span: 24 }"
          style="margin-bottom: 0;margin-top: 2em"
        >
          <div class="text-center">
            <a-button
              v-if="loginType !== LoginTypeMap.Logon"
              type="primary"
              style="width: 90px"
              class="m-r-5"
              html-type="submit"
              >{{loginType === LoginTypeMap.NewPassword ? '确定' : '登录'}}</a-button
            >
            <a-button
              type="primary"
              style="width: 90px"
              v-if="loginType !== LoginTypeMap.NewPassword"
              :ghost="loginType !== LoginTypeMap.Logon"
              @click="
                loginType !== LoginTypeMap.Logon
                  ? changeLoginType(LoginTypeMap.Logon)
                  : onFinish({ ...formState })
              "
              >注册</a-button
            >
            <div class="inline-block m-l-2 m-t-2 text-12px c-#999999" v-if="loginType === LoginTypeMap.Logon || loginType === LoginTypeMap.NewPassword">
              已有账号
              <span
                class="cursor-pointer c-#5B3DF2"
                @click="changeLoginType(LoginTypeMap.Password)"
                >去登录</span
              >
            </div>
          </div>

          <div class="text-center p-t-3 text-12px c-#999999">
            <span class="">登录则代表你同意</span>
            <span class="primary-color cursor-pointer"  @click="$router.push({name: 'UserAgreement'})">用户协议</span>
            <span class="">与</span>
            <span class="primary-color cursor-pointer" @click="$router.push({name: 'PrivacyPolicy'})">隐私政策</span>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
<style lang="less">
.login {
  padding: 0 10px;
  .ant-input-affix-wrapper,
  .ant-input {
    background-color: #f5f5f5;
    font-size: 12px;
    line-height: 2.17;
  }
  .ant-btn {
    height: 40px;
  }
  // .ant-input,.ant-form-item-label > label {
  //   height: 36px;
  // }
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
