<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { FormInstance, message } from "ant-design-vue";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { StepTwoForm, MetaItem } from "./type";

const props = defineProps<{
  selectedTag: any[] | null;
  formModal?: any;
  formData: any;
  // rightMetaList: any;
}>();

const formRef = ref<FormInstance>();
const loading = ref<boolean>(false);
const firstKey = ref<number | string>("1");
const formState = reactive<any>({
  data: {},
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
  wrapperCol: { span: 18 },
};
const config = {
  rules: [{ type: "string" as const, required: true, message: "不能为空" }],
};
const initForm = () => {
  if (props.formModal) {
    formState.data = { ...props.formModal };
  }
};
onMounted(() => {
  // initForm();
});


const handleChange = (info, key) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    if (info.file.response.data) {
      formState.data[key] = info.file.response.data[0];
    }
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};
const getData = () => {
  console.log('dddewrerwerwerwerwer');
  
  return formState.data
}
watch(() => props.formData,
(val) => {
  initForm();
})

defineExpose({ formState });
</script>
<template>
  <div class="step-two group-container">
    <div class="group-item">
      <div class="group-item-title">
        <span class="line-title"
          ><span> 所属案例库 </span>
        </span>
      </div>
      <div class="group-tags">
        <span
          v-for="(tag, i) in selectedTag"
          :key="i"
          class="tag-item selected"
          >{{ tag.name }}</span
        >
      </div>
    </div>
    <a-form
      class="flex"
      labelAlign="left"
      v-bind="layout"
      ref="formRef"
      :model="formState"
    >
      <div
        class="group-item flex-1 m-r-5"
        v-if="formData?.leftMetaList"
      >
        <div class="group-item-title">
          <span class="line-title">
            <span>
             项目简介
            </span>
          </span>
        </div>
        <a-form-item
          :colon="false"
          :name="['data', `form_${col.id}`]"
          v-for="col in formData.leftMetaList"
          :label="col.name"
          :rules="[
            {
              required: col.isRequired == 1 ? true : false,
              message: col.name + '不能为空',
            },
          ]"
        >
          <!-- :rules="col.isRequired == 1 ? [{required: true, message: col.name + '不能为空', trigger: 'change',}] : null" -->
          <a-textarea
            v-if="col.dataType === 2"
            v-model:value="formState.data[`form_${col.id}`]"
            :rows="4"
          />
          <a-date-picker
            class="w-100%"
            v-else-if="col.dataType === 3"
            v-model:value="formState.data[`form_${col.id}`]"
            value-format="YYYY-MM-DD"
          />
          <a-input-number
            v-else-if="col.dataType === 4"
            v-model:value="formState.data[`form_${col.id}`]"
          />
          <a-radio-group
            v-else-if="col.dataType === 5"
            v-model:value="formState.data[`form_${col.id}`]"
            :options="col.opts.split(';').filter((a) => a)"
          />
          <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 -->
          <a-checkbox-group
            v-else-if="col.dataType === 6"
            v-model:value="formState.data[`form_${col.id}`]"
            :options="col.opts.split(';').filter((a) => a)"
          />
          <a-select
            ref="select"
            v-else-if="col.dataType === 7"
            class="w-100%"
            v-model:value="formState.data[`form_${col.id}`]"
          >
            <a-select-option
              v-for="o in col.opts.split(';').filter((a) => a)"
              :value="o"
              >{{ o }}</a-select-option
            >
          </a-select>
          <a-upload
            v-else-if="col.dataType === 9"
            class="w-100%"
            v-model:file-list="formState.data[`form_${col.id}`]"
            list-type="picture-card"
            :show-upload-list="false"
            @change="handleChange($event, `form_${col.id}`)"
          >
            <img
              v-if="formState.user.headUrl"
              width="100"
              height="100"
              :src="formState.data[`form_${col.id}`]"
              alt="avatar"
            />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-input v-else v-model:value="formState.data[`form_${col.id}`]" />
        </a-form-item>
      </div>
      <div class="right-container flex-1 m-l-5" v-if="formData?.rightMetaList">
        <template v-for="(item, key) in formData.rightMetaList">
          <div class="group-item">
            <div class="group-item-title">
              <span class="line-title">
                <span>
                  {{ item[0].name }}
                </span>
              </span>
            </div>
            <a-form-item
              :colon="false"
              :name="['data', `form_${col.id}`]"
              v-for="col in item"
              :label="col.name"
              :rules="[
                {
                  required: col.isRequired == 1 ? true : false,
                  message: col.name + '不能为空',
                },
              ]"
            >
              <!-- :rules="col.isRequired == 1 ? [{required: true, message: col.name + '不能为空', trigger: 'change',}] : null" -->
              <a-textarea
                v-if="col.dataType === 2"
                v-model:value="formState.data[`form_${col.id}`]"
                :rows="4"
              />
              <a-date-picker
                class="w-100%"
                v-else-if="col.dataType === 3"
                v-model:value="formState.data[`form_${col.id}`]"
                value-format="YYYY-MM-DD"
              />
              <a-input-number
                v-else-if="col.dataType === 4"
                v-model:value="formState.data[`form_${col.id}`]"
              />
              <a-radio-group
                v-else-if="col.dataType === 5"
                v-model:value="formState.data[`form_${col.id}`]"
                :options="col.opts.split(';').filter((a) => a)"
              />
              <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 -->
              <a-checkbox-group
                v-else-if="col.dataType === 6"
                v-model:value="formState.data[`form_${col.id}`]"
                :options="col.opts.split(';').filter((a) => a)"
              />
              <a-select
                ref="select"
                v-else-if="col.dataType === 7"
                class="w-100%"
                v-model:value="formState.data[`form_${col.id}`]"
              >
                <a-select-option
                  v-for="o in col.opts.split(';').filter((a) => a)"
                  :value="o"
                  >{{ o }}</a-select-option
                >
              </a-select>
              <a-upload
                v-else-if="col.dataType === 9"
                class="w-100%"
                v-model:file-list="formState.data[`form_${col.id}`]"
                list-type="picture-card"
                :show-upload-list="false"
                @change="handleChange($event, `form_${col.id}`)"
              >
                <img
                  v-if="formState.user.headUrl"
                  width="100"
                  height="100"
                  :src="formState.data[`form_${col.id}`]"
                  alt="avatar"
                />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-input
                v-else
                v-model:value="formState.data[`form_${col.id}`]"
              />
            </a-form-item>
          </div>
        </template>

        <div class="group-item">
          <div class="group-item-title">
            <span class="line-title">
              <span> 标签（可多选） </span>
            </span>
          </div>
          <div class="flex flex-wrap">
            <a-form-item
            class="w-33%"
            :colon="false"
            :name="['data', `tag_${tag.id}`]"
            v-for="tag in formData.labList"
            label=" "
          >
            <a-select
              ref="select"
              class="w-100%"
              mode="multiple"
              :max-tag-count="1"
              v-model:value="formState.data[`tag_${tag.id}`]"
            >
              <a-select-option
                v-for="o in tag.opts"
                :value="o.id"
                :placeholder="tag.title"
                >{{ o.title }}</a-select-option
              >
            </a-select>
          </a-form-item>
          </div>
        </div>
    
      </div>
    </a-form>
  </div>
</template>
