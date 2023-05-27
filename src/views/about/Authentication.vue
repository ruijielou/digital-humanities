<script setup lang="ts">
import { ref, reactive } from "vue";
import { useUserStore } from "@/store/user";
import { dhuvalidcode, dhuuser } from "@/api";
import {Modal} from "ant-design-vue"

const { userInfo } = useUserStore();
const layout = {
  labelCol: { span: 4, },
  wrapperCol: { span: 20 },
};
enum CardType {
  IdCard=0,
  Passport=1,
  StudentIdCard=2,
}

const formState = reactive({
  user: {
    username: userInfo.username,
    realName: userInfo.realName,
    idType: userInfo.idType,
    idNumber: userInfo.idNumber,
    phone: userInfo.phone,
    code: "",
  },
});

// 获取验证码
const getValidCode = async () => {
  // 7为实名认证
  await dhuvalidcode({ username: formState.user.phone, type: 7 });

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

const onFinish = async (values: any) => {
  if(!values.user.realName) {
    Modal.error({
      title: () => "提示",
      content: () => "真实姓名不能为空",
    });
    return
  }
  if(!values.user.idNumber) {
    Modal.error({
      title: () => "提示",
      content: () => "证件号不能为空",
    });
    return
  }
  if(!values.user.code) {
    Modal.error({
      title: () => "提示",
      content: () => "验证码不能为空",
    });
    return
  }
  const res = await dhuuser.updateAuth({...values.user});

  if (res.success) {
    Modal.success({
      title: () => "提示",
      content: () => "认证成功",
    });
    location.reload();
  }
  
};

</script>
<template>
  <div class="p-8 p-r-0 w-100% authentication">
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">实名认证</h2>
      </div>
    </div>
    <div class="p-t-51px p-l-28% p-r-28%">
      <a-form
        :model="formState"
        v-bind="layout"
        labelAlign="left"
        name="nest-messages"
        @finish="onFinish"
      >
        <a-form-item :colon="false" :name="['user', 'username']" label="姓名">
          <span>{{ formState.user.username }}</span>
        </a-form-item>
        <a-form-item
          :colon="false"
          :name="['user', 'realName']"
          label="真实姓名"
        >
          <a-input v-model:value="formState.user.realName" />
        </a-form-item>
        <a-form-item :colon="false" :name="['user', 'idType']" label="证件类型">
          <a-select v-model:value="formState.user.idType">
            <a-select-option :value="CardType.IdCard">身份证</a-select-option>
            <a-select-option :value="CardType.Passport">护照</a-select-option>
            <a-select-option :value="CardType.StudentIdCard"
              >学生证</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item :colon="false" :name="['user', 'idNumber']" label="证件号">
          <a-input v-model:value="formState.user.idNumber" />
        </a-form-item>
        <a-form-item :colon="false" :name="['user', 'phone']" label="验证手机">
          <!-- <a-input v-model:value="formState.user.phone" /> -->
          <span>{{ formState.user.phone }}</span>
        </a-form-item>
        <a-form-item
          :colon="false"
          :name="['user', 'code']"
          label="验证码"
        >
          <div class="flex">
            <a-input class="flex-1" v-model:value="formState.user.code" />
            <!-- <a-button class="m-l-3"></a-button> -->
            <!-- <template #suffix> -->
            <a-button class="m-l-3" v-if="countDown !== 0">{{ countDown }}秒后重新获取</a-button>
            <a-button
              v-else
              @click="getValidCode()"
              class="cursor-pointer m-l-3"
            >
              获取验证码
            </a-button>
            <!-- </template> -->
          </div>
        </a-form-item>
        <a-form-item
          :colon="false"
          :wrapper-col="{ span: 24 }"
        >
         <div class="text-center">
          <a-button type="primary" html-type="submit">完成</a-button>
         </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style lang="less">
.authentication {
  .ant-input,
  .ant-select-selector {
    background: #f5f5f5 !important;
  }
}
</style>
