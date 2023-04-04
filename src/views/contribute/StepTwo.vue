<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { FormInstance, message } from "ant-design-vue";
import { uuid } from "@/utils/config";
import {
  LoadingOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons-vue";
// import { StepTwoForm, MetaItem } from "./type";
// const emit = defineEmits(["setTwoData"]);
const props = defineProps<{
  selectedTag: any[] | null;
  formModal?: any;
  formData: any;
}>();

const formRef = ref<any>(null);
const loading = ref<boolean>(false);
const formState = reactive<any>({
  caseData: {},
});

// metaList
// metaList中 dataType:
// 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接
/**
 *  提交的数据格式
 *  "repositoryIds":"16",
    "form_329":"比利时时光机",
    "form_330":"http://www.baidu.com",
    "form_332":"2023-03-26 04:56",
    "form_333":"1",
    "form_335":"比利时时光机摘要222",
    "form_340":"2",
    "tag_12":20,
    "tag_13":23,
    "authType":1
 */
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
// const config = {
//   rules: [{ type: "string" as const, required: true, message: "不能为空" }],
// };
const initForm = () => {
  if (props.formModal) {
    formState.caseData = { ...props.formModal };
  }
};
onMounted(() => {
  // initForm();
});

const formValidate = async () => {
  return await formRef.value.validate();
};


const handleChange = (info:any, key:any) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    if (info.file.response.data) {
      formState.caseData[key] = info.file.response.data[0];
    }
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const createItem = (id: string) => {
  const uid = uuid();
  formState.caseData[id][`${uid}`] = "";
};

const removeItem = (id: string, nodeId: string) => {
  delete formState.caseData[id][nodeId];
};

watch(
  () => props.formData,
  (val) => {
    initForm();
  }
);

// const submit = () => {
//   emit("setTwoData", formState.caseData);
// };

defineExpose({ formState, formValidate });
</script>
<template>
  <div class="step-two group-container">
    <div class="group-item">
      <div class="group-item-title">
        <span class="line-title"><span> 所属案例库 </span> </span>
        <span class="lines"></span>
      </div>
      <div class="group-tags">
        <span v-for="(tag, i) in selectedTag" :key="i" class="tag-item selected">{{ tag.name }}</span>
      </div>
    </div>
    <a-form class="flex" labelAlign="left" v-bind="layout" ref="formRef" :model="formState">
      <div class="form-container flex-1" style="padding-right: 3em;" v-if="formData">
        <template v-for="(item, key) in formData" >
          <div class="group-item" v-if="key == 0">
            <div class="group-item-title">
              <span class="line-title">
                <span>
                  {{ item.name }}
                </span>
              </span>
              <span class="lines"></span>
            </div>
            <template v-for="col in item.metaList">
              <div class="w-33% inline-block" v-if="col.dataType === 14">
                <a-form-item :colon="false" :labelCol="{span: 0}" :wrapperCol="{span: 22}"
                  :name="['caseData', `${col.filed}`]" :rules="[
                {
                  required: col.isRequired == 1 ? true : false,
                  message: col.name + '不能为空',
                },
              ]">
                  <a-select ref="select" class="w-100%" mode="multiple" :max-tag-count="1"
                    v-model:value="formState.caseData[`${col.filed}`]">
                    <a-select-option v-for="o in col.optList" :value="o.value"
                      :placeholder="col.name">{{ o.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <a-form-item v-else :colon="false" :name="['caseData', `${col.filed}`]" :label="col.name" :rules="[
                {
                  required: col.isRequired == 1 ? true : false,
                  message: col.name + '不能为空',
                },
              ]">
                <a-textarea v-if="col.dataType === 2" v-model:value="formState.caseData[`form_${col.id}`]" :rows="4" />
                <a-date-picker class="w-100%" v-else-if="col.dataType === 3"
                  v-model:value="formState.caseData[`${col.filed}`]" value-format="YYYY-MM-DD" />
                <a-input-number v-else-if="col.dataType === 4" v-model:value="formState.caseData[`${col.filed}`]" />
                <a-radio-group v-else-if="col.dataType === 5" v-model:value="formState.caseData[`${col.filed}`]"
                  :options="col.optList" />
                <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 -->
                <a-checkbox-group v-else-if="col.dataType === 6" v-model:value="formState.caseData[`${col.filed}`]"
                  :options="col.optList">

                </a-checkbox-group>
                <a-select ref="select" v-else-if="col.dataType === 7" class="w-100%"
                  v-model:value="formState.caseData[`${col.filed}`]">
                  <a-select-option v-for="o in col.optList" :value="o.value">{{ o.text }}</a-select-option>
                </a-select>
                <a-upload v-else-if="col.dataType === 9" class="w-100%"
                  v-model:file-list="formState.caseData[`${col.filed}`]" list-type="picture-card"
                  :show-upload-list="false" @change="handleChange($event, `${col.filed}`)">
                  <img v-if="formState.user.headUrl" width="100" height="100" :src="formState.caseData[`${col.filed}`]"
                    alt="avatar" />
                  <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <div class="flex" v-else-if="col.dataType === 13"
                  v-for="(key, tagIndex) in Object.keys(formState.caseData[`${col.filed}`])">
                  <a-input class="m-b-3" v-model:value="formState.caseData[`${col.filed}`][key]" />
                  <span class="m-l-3 cursor-pointer" v-if="col.dataType === 13">
                    <plus-square-outlined @click="createItem(`${col.filed}`)" v-if="tagIndex === 0"
                      style="font-size: 28px; color: #d9d9d9" />
                    <minus-square-outlined @click="removeItem(col.filed, key)" v-else
                      style="font-size: 28px; color: #d9d9d9" />
                  </span>
                </div>
                <a-input v-else v-model:value="formState.caseData[`${col.filed}`]" />
              </a-form-item>
            </template>
          </div>
        </template>
      </div>
      <div class="form-container flex-1" style="padding-left: 3em;" v-if="formData">
        <template v-for="(item, key) in formData">
          <div class="group-item" v-if="key != 0">
            <div class="group-item-title">
              <span class="line-title">
                <span>
                  {{ item.name }}
                </span>
              </span>
              <span class="lines"></span>
            </div>
            <template v-for="col in item.metaList">
              <div class="w-33% inline-block" v-if="col.dataType === 14">
                <a-form-item :colon="false" :labelCol="{span: 0}" :wrapperCol="{span: 22}"
                  :name="['caseData', `${col.filed}`]" :rules="[
                {
                  required: col.isRequired == 1 ? true : false,
                  message: col.name + '不能为空',
                },
              ]">
                  <a-select ref="select" class="w-100%" mode="multiple" :max-tag-count="1"
                    v-model:value="formState.caseData[`${col.filed}`]">
                    <a-select-option v-for="o in col.optList" :value="o.value"
                      :placeholder="col.name">{{ o.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <a-form-item v-else :colon="false" :name="['caseData', `${col.filed}`]" :label="col.name" :rules="[
                {
                  required: col.isRequired == 1 ? true : false,
                  message: col.name + '不能为空',
                },
              ]">
                <a-textarea v-if="col.dataType === 2" v-model:value="formState.caseData[`form_${col.id}`]" :rows="4" />
                <a-date-picker class="w-100%" v-else-if="col.dataType === 3"
                  v-model:value="formState.caseData[`${col.filed}`]" value-format="YYYY-MM-DD" />
                <a-input-number v-else-if="col.dataType === 4" v-model:value="formState.caseData[`${col.filed}`]" />
                <a-radio-group v-else-if="col.dataType === 5" v-model:value="formState.caseData[`${col.filed}`]"
                  :options="col.optList" />
                <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 -->
                <a-checkbox-group v-else-if="col.dataType === 6" v-model:value="formState.caseData[`${col.filed}`]"
                  :options="col.optList">

                </a-checkbox-group>
                <a-select ref="select" v-else-if="col.dataType === 7" class="w-100%"
                  v-model:value="formState.caseData[`${col.filed}`]">
                  <a-select-option v-for="o in col.optList" :value="o.value">{{ o.text }}</a-select-option>
                </a-select>
                <a-upload v-else-if="col.dataType === 9" class="w-100%"
                  v-model:file-list="formState.caseData[`${col.filed}`]" list-type="picture-card"
                  :show-upload-list="false" @change="handleChange($event, `${col.filed}`)">
                  <img v-if="formState.user.headUrl" width="100" height="100" :src="formState.caseData[`${col.filed}`]"
                    alt="avatar" />
                  <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <div class="flex" v-else-if="col.dataType === 13"
                  v-for="(key, tagIndex) in Object.keys(formState.caseData[`${col.filed}`])">
                  <a-input class="m-b-3" v-model:value="formState.caseData[`${col.filed}`][key]" />
                  <span class="m-l-3 cursor-pointer" v-if="col.dataType === 13">
                    <plus-square-outlined @click="createItem(`${col.filed}`)" v-if="tagIndex === 0"
                      style="font-size: 28px; color: #d9d9d9" />
                    <minus-square-outlined @click="removeItem(col.filed, key)" v-else
                      style="font-size: 28px; color: #d9d9d9" />
                  </span>
                </div>
                <a-input v-else v-model:value="formState.caseData[`${col.filed}`]" />
              </a-form-item>
            </template>
          </div>
        </template>
      </div>
    </a-form>
  </div>
</template>
<style lang="less">
.form-container {
  display: flex;
 flex-direction: column;

  // flex-flow: column wrap;
  // .group-item:nth-child(1) {
  //   order: 1;
  // }
  // .group-item {
  //   order: 2;
  //   width: 42%;
  // }
}
.form-container::before,
.form-container::after {
  content: "";
  flex-basis: 100%;
  width: 0;
  order: 2;
}
</style>
