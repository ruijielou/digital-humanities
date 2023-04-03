<!-- CustomCase -->
<script setup lang="ts">
import { ref, reactive } from "vue";
import { dhuuser } from "@/api";
import { Modal } from "ant-design-vue";

const layout = {
  labelCol: { span: 2, offset: 7 },
  wrapperCol: { span: 8 },
};

const formState = reactive<any>({
  case: {
    name: "",
    description: "",
    authType: '1',
    status: null,
  },
});

const onFinish = async (values: any) => {
  if (!values.case.name) {
    Modal.error({
      title: () => "提示",
      content: () => "案例库名称不能为空",
    });
    return;
  }

  const result = await dhuuser.updateAuth({ ...values.user });
  console.log(result);
  if (result.success) {
    Modal.success({
      title: () => "提示",
      content: () => "添加成功",
    });
    location.reload();
  }
};

defineExpose({ formState });

</script>
<template>
  <div class="p-8 w-100% authentication">
    <div class="p-t-4">
      <a-form
        :model="formState"
        v-bind="layout"
        labelAlign="left"
        name="nest-case"
        >
        <!-- @finish="onFinish" -->
        <a-form-item
          :colon="false"
          :name="['case', 'status']"
          label="案例库名称分类"
        >
          <a-select v-model:value="formState.case.status">
            <a-select-option :value="1">分类1</a-select-option>
            <a-select-option :value="2">分类2</a-select-option>
            <a-select-option :value="3">分类3</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :colon="false" :name="['case', 'name']" label="案例库名称">
            <a-input v-model:value="formState.case.name" />
        </a-form-item>
        <a-form-item
          :colon="false"
          :name="['case', 'description']"
          label="案例库简介"
        >
          <!-- <a-input  v-model:value="formState.case.description" /> -->
          <a-textarea v-model:value="formState.case.description" placeholder="案例库简介" :rows="4" />
        </a-form-item>

        <a-form-item
          :colon="false"
          :name="['case', 'authType']"
          label="开放权限"
        >
          <a-radio-group
            v-model:value="formState.case.authType"
            name="radioGroup"
          >
            <a-radio value="1">公开</a-radio>
            <a-radio value="2">仅自己看</a-radio>
          </a-radio-group>
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
