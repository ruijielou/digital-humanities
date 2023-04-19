<script setup lang="ts">
import { reactive, watch, ref, nextTick, defineExpose } from "vue";
import { useRoute } from "vue-router";

// 声明 $route 变量类型

const props = defineProps<{
  formModal?: any;
  formData: any;
  layout: any;
}>();

const route = useRoute();
// const $route: Ref<RouteLocationNormalized> = $route
const formRef = ref<any>(null);
const formState = reactive<any>({
  formFiledData: {},
});
const initForm = () => {
  if (props.formModal) {
    formState.formFiledData = { ...props.formModal };
    setData();
  }
};
watch(
  () => props.formModal,
  (val) => {
    initForm();
  },
  { immediate: true }
);

// watch(
//   route,
//   (to, from) => {
//     if (from?.name === "CaseDetail" || !from) {
//       setData();
//     }
//   },
//   { immediate: true } // 如果要立即执行一次，请添加此选项
// );

const formValidate = async () => {
  return await formRef.value.validate();
};
const setData = () => {
  const localData =
    localStorage.formstate && JSON.parse(localStorage.formstate);
  if (localData) {
    //如果有缓存的数据就添加进去，记住搜索
    const copyFormModel = { ...formState.formFiledData };
    Object.keys(localData).forEach((key) => {
      if (localData[key] && copyFormModel[key] != undefined) {
        copyFormModel[key] = localData[key];
      }
    });
    nextTick(() => {
      formState.formFiledData = { ...copyFormModel };
    });
  }
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
