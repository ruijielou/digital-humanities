<!-- CustomCase -->
<script setup lang="ts">
import { reactive, ref } from "vue";
import { dhuuser, repositorygroup } from "@/api";
import type { SelectProps } from "ant-design-vue";
import { Modal } from "ant-design-vue";

const layout = {
  labelCol: { span: 2, offset: 7 },
  wrapperCol: { span: 8 },
};
const repositorygroup_options = ref<SelectProps['options']>([
]);

repositorygroup.list().then((res) => {
  if (res.success) {
    let i;
    let repositorygroup_list:SelectProps[] = [];
    for(i in res.result){
      let opt:any = res.result[i];
      repositorygroup_list.push({value:opt.id, label: opt.title});
    }
    repositorygroup_options.value = repositorygroup_list;
  }
});
// if(repositorygroup_ret && repositorygroup_ret.result){
//   repositorygroup_list.value = repositorygroup_ret.result;
//   console.log('repositorygroup_list:', repositorygroup_list)
// }
//TODO status 需要设置成 1:暂存 或者 2:待审核
const formState = reactive<any>({
  case: {
    groupId: null,
    name: "",
    description: "",
    authType: "1",
    status: 2,
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

  if (result.success) {
    Modal.success({
      title: () => "提示",
      content: () => "添加成功",
    });
    location.reload();
  }
};
const createFormRef = ref<any>(null);

const formValidate = async () => {
  return await createFormRef.value.validate();
};

defineExpose({ formState, formValidate });
</script>
<template>
  <div class="p-8 w-100% authentication">
    <div class="p-t-4">
      <a-form
        :model="formState"
        v-bind="layout"
        labelAlign="left"
        ref="createFormRef"
        name="nest-case"
      >
        <!-- @finish="onFinish" -->
        <a-form-item
          :colon="false"
          :name="['case', 'groupId']"
          label="案例库名称分类"
          :rules="[
            {
              required: true,
              message: '案例库名称分类不能为空',
            },
          ]"
        >
          <a-select v-model:value="formState.case.groupId" :options="repositorygroup_options">
          </a-select>
        </a-form-item>
        <a-form-item
          :colon="false"
          :name="['case', 'name']"
          label="案例库名称"
          :rules="[
            {
              required: true,
              message: '案例库名称不能为空',
            },
          ]"
        >
          <a-input v-model:value="formState.case.name" />
        </a-form-item>
        <a-form-item
          :colon="false"
          :name="['case', 'description']"
          label="案例库简介"
        >
          <!-- <a-input  v-model:value="formState.case.description" /> -->
          <a-textarea
            v-model:value="formState.case.description"
            placeholder="案例库简介"
            :rows="4"
          />
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