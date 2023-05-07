<script setup lang="ts">
import { reactive, watch, ref, nextTick, defineExpose } from "vue";
import { dateFormatMap } from "@/utils/config";
// 声明 $route 变量类型

const props = defineProps<{
  formModal?: any;
  formData: any;
  layout: any;
  dateInstant: any;
}>();

const formRef = ref<any>(null);
const formState = reactive<any>({
  formFiledData: {},
  dateInstant: {},
});
const initForm = () => {
  if (props.formModal) {
    formState.formFiledData = { ...props.formModal };
  }
  if (props.dateInstant) {
    formState.dateInstant = { ...props.dateInstant };
  }
};

const changeDataFormater = (key) => {
  formState.formFiledData[key] = "";
};

watch(
  () => props.formModal,
  (val) => {
    initForm();
  },
  { immediate: true }
);

const formValidate = async () => {
  return await formRef.value.validate();
};

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
      <a-form-item
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
        <!-- <a-date-picker
        placeholder="请选择"
        class="w-100%"
          v-else-if="col.dataType === 3"
          v-model:value="formState.formFiledData[`${col.filed}`]"
          value-format="YYYY-MM-DD"
        /> -->
        <div class="flex" v-else-if="col.dataType === 3">
          <a-date-picker
            class="w-70%"
            v-model:value="formState.formFiledData[`${col.filed}`]"
            :placeholder="col.placeholder || '请选择' + col.name"
            :picker="
              formState.dateInstant[col.filed]
                ? formState.dateInstant[col.filed]
                : 'date'
            "
            :value-format="
              formState.dateInstant[col.filed]
                ? dateFormatMap[formState.dateInstant[col.filed]]
                : dateFormatMap.date
            "
          >
          </a-date-picker>
          <a-select
          class="flex-1 m-l-5px"
            v-model:value="formState.dateInstant[col.filed]"
            @change="changeDataFormater(col.filed)"
          >
            <a-select-option value="date">年-月-日</a-select-option>
            <a-select-option value="month">年-月</a-select-option>
            <a-select-option value="year">年</a-select-option>
          </a-select>
        </div>
        <a-input-number
          placeholder="请输入"
          v-else-if="col.dataType === 4"
          v-model:value="formState.formFiledData[`${col.filed}`]"
        />
        <a-radio-group
          v-else-if="col.dataType === 5"
          v-model:value="formState.formFiledData[`${col.filed}`]"
        >
          <a-radio
            v-for="radioItem in col.optList"
            :value="radioItem.value + ''"
            >{{ radioItem.text }}</a-radio
          >
          <div>
            {{ formState.formFiledData[`${col.filed}`] }}
          </div>
        </a-radio-group>
        <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 -->
        <a-checkbox-group
          v-else-if="col.dataType === 6"
          v-model:value="formState.formFiledData[`${col.filed}`]"
        >
          <a-checkbox
            v-for="checkItem in col.optList"
            :value="checkItem.value + ''"
            >{{ checkItem.text }}</a-checkbox
          >
        </a-checkbox-group>
        <a-select
          ref="select"
          placeholder="请选择"
          v-else-if="col.dataType === 7 || col.dataType === 14"
          class="w-100%"
          v-model:value="formState.formFiledData[`${col.filed}`]"
        >
          <a-select-option v-for="o in col.optList" :value="o.value + ''">{{
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
        <a-select
          placeholder="选择或输入"
          v-else-if="col.dataType === 15 || col.dataType === 16"
          :showSearch="true"
          v-model:value="formState.formFiledData[`${col.filed}`]"
          mode="multiple"
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
