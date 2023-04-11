<script setup lang="ts">
import { reactive, watch, ref } from "vue";
const props = defineProps<{
  formModal?: any;
  formData: any;
  layout: any;
}>();
const formRef = ref<any>(null);
const formState = reactive<any>({
  formFiledData: {},
});
const initForm = () => {
  if (props.formModal) {
    formState.formFiledData = { ...props.formModal };
  }
};
watch(
  () => props.formData,
  (val) => {
    initForm();
  }
);
const formValidate = async () => {
  return await formRef.value.validate();
};
initForm();
defineExpose({ formState, formValidate });
</script>
<template>
  <a-form
    labelAlign="left"
    v-bind="props.layout"
    ref="formRef"
    :model="formState"
  >
    <template v-for="col in formData">
      <div class="w-33% inline-block" v-if="col.dataType === 14">
        <a-form-item
          :colon="false"
          :labelCol="{ span: 0 }"
          :wrapperCol="{ span: 22 }"
          :name="['formFiledData', `${col.filed}`]"
          :rules="[
            {
              required: col.isRequired == 1 ? true : false,
              message: col.name + '不能为空',
              trigger: ['change', 'blur'],
            },
          ]"
        >
          <a-select
            ref="select"
            class="w-100%"
            mode="multiple"
            :placeholder="col.name"
            :max-tag-count="1"
            v-model:value="formState.formFiledData[`${col.filed}`]"
          >
            <a-select-option
              v-for="o in col.optList"
              :value="o.value"
              :placeholder="col.name"
              >{{ o.text }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </div>
      <a-form-item
        v-else
        :colon="false"
        :name="['formFiledData', `${col.filed}`]"
        :label="col.name"
        :rules="[
          {
            required: col.isRequired == 1 ? true : false,
            message: col.name + '不能为空',
            trigger: ['change', 'blur'],
          },
        ]"
      >
        <a-textarea
          v-if="col.dataType === 2"
          placeholder="请输入"
          v-model:value="formState.formFiledData[`form_${col.id}`]"
          :rows="4"
        />
        <a-date-picker
          placeholder="请选择"
          class="w-100%"
          v-else-if="col.dataType === 3"
          v-model:value="formState.formFiledData[`${col.filed}`]"
          value-format="YYYY-MM-DD"
        />
        <a-input-number
          placeholder="请输入"
          v-else-if="col.dataType === 4"
          v-model:value="formState.formFiledData[`${col.filed}`]"
        />
        <a-radio-group
          v-else-if="col.dataType === 5"
          v-model:value="formState.formFiledData[`${col.filed}`]"
          :options="col.optList"
        />
        <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 -->
        <a-checkbox-group
          v-else-if="col.dataType === 6"
          v-model:value="formState.formFiledData[`${col.filed}`]"
          :options="col.optList"
        >
        </a-checkbox-group>
        <a-select
          ref="select"
          placeholder="请选择"
          v-else-if="col.dataType === 7"
          class="w-100%"
          v-model:value="formState.formFiledData[`${col.filed}`]"
        >
          <a-select-option v-for="o in col.optList" :value="o.value">{{
            o.text
          }}</a-select-option>
        </a-select>
        <a-select
          placeholder="选择或输入"
          v-else-if="col.dataType === 13"
          :showSearch="true"
          v-model:value="formState.formFiledData[`${col.filed}`]"
          mode="tags"
          style="width: 100%"
          :token-separators="[',']"
        >
          <a-select-option v-for="o in col.optList" :value="o.value">{{
            o.text
          }}</a-select-option>
        </a-select>
        <a-input
          v-else
          placeholder="请输入"
          v-model:value="formState.formFiledData[`${col.filed}`]"
        />
      </a-form-item>
    </template>
  </a-form>
</template>
