<script setup lang="ts">
import { ref, reactive } from "vue";
const layout = {
  labelCol: { span: 2, offset: 6 },
  wrapperCol: { span: 8 },
};
enum CardType {
  IdCard,
  Passport,
  StudentIdCard,
}

const formState = reactive({
  user: {
    name: "",
    realName: "",
    cardType: CardType.IdCard,
    cardNumber: "",
    phone: "",
    verifyCode: "",
  },
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};
const getCode = () => {
  console.log("get code is request");
};
</script>
<template>
  <div class="p-8 w-100% authentication">
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">实名认证</h2>
      </div>
    </div>
    <div class="p-t-4">
      <a-form
        :model="formState"
        v-bind="layout"
        labelAlign="left"
        name="nest-messages"
        @finish="onFinish"
      >
        <a-form-item :colon="false" :name="['user', 'name']" label="姓名">
          <span>{{ formState.user.name }}</span>
        </a-form-item>
        <a-form-item :colon="false" :name="['user', 'realName']" label="真实姓名">
          <a-input v-model:value="formState.user.realName" />
        </a-form-item>
        <a-form-item :colon="false" :name="['user', 'cardType']" label="证件类型">
          <a-select v-model:value="formState.user.cardType">
            <a-select-option :value="CardType.IdCard">身份证</a-select-option>
            <a-select-option :value="CardType.Passport">护照</a-select-option>
            <a-select-option :value="CardType.StudentIdCard"
              >学生证</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item :colon="false" :name="['user', 'cardNumber']" label="证件号">
          <a-input v-model:value="formState.user.cardNumber" />
        </a-form-item>
        <a-form-item :colon="false" :name="['user', 'phone']" label="验证手机">
          <!-- <a-input v-model:value="formState.user.phone" /> -->
          <span>{{ formState.user.phone }}</span>
        </a-form-item>
        <a-form-item :colon="false"
          :name="['user', 'verifyCode']"
          @click="getCode"
          label="验证码"
        >
          <div class="flex">
            <a-input class="flex-1" v-model:value="formState.user.verifyCode" />
            <a-button class="m-l-3">获取验证码</a-button>
          </div>
        </a-form-item>
        <a-form-item :colon="false" :wrapper-col="{ ...layout.wrapperCol, offset: 12 }">
          <a-button type="primary" html-type="submit">完成</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style lang="less">
.authentication {
  .ant-input,.ant-select-selector {
    background: #f5f5f5 !important;
  }
}
</style>
