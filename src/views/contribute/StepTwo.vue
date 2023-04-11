<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { message } from "ant-design-vue";
import { imgBaseUrl } from "@/utils/config";
import {
  LoadingOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons-vue";
import { commonUpload } from "@/api";

const props = defineProps<{
  selectedTag: any[] | null;
  formModal?: any;
  formData: any;
}>();

const fileList = ref<any>([]);
const formRef = ref<any>(null);
const loading = ref<boolean>(false);
const formState = reactive<any>({
  caseData: {},
});

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

/**
 * 上传图片
 */
let uploadFile: any = null;
let uploadFileCurrentKey = "";
const changeImg = (info: any, key: any) => {
  uploadFile = info.file;
  uploadFileCurrentKey = key;
  formState.caseData[uploadFileCurrentKey] = [
    ...formState.caseData[uploadFileCurrentKey],
    "999",
  ];
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }

  if (info.file.status === "error") {
    loading.value = false;
    message.error("上传文件出错");
  }
};

const customRequest = async () => {
  const formData: any = new FormData();
  const file: any = new File([uploadFile], uploadFile.name, {
    type: uploadFile.type,
  });
  file.uid = Date.now();
  formData.append("biz", "temp");
  formData.append("file", file);

  const res = await commonUpload(formData);

  if (res.success && res.message) {
    loading.value = false;
    formState.caseData[uploadFileCurrentKey] = [
      ...formState.caseData[uploadFileCurrentKey].filter(
        (item: string) => item != "999"
      ),
      res.message,
    ];
  }
};

const deleteItemImg = (src: string, key: string) => {
  formState.caseData[key] = [
    ...formState.caseData[key].filter((item: any) => item != src),
  ];
};

watch(
  () => props.formData,
  (val) => {
    initForm();
  }
);

const selectMutipleChange = (value: []) => {
  console.log(`selected ${value}`);
};

defineExpose({ formState, formValidate });
</script>
<template>
  <div class="step-two group-container">
    <div class="group-item" v-if="selectedTag && selectedTag.length">
      <div class="group-item-title">
        <span class="line-title"><span> 所属案例库 </span> </span>
        <span class="lines"></span>
      </div>
      <div class="group-tags" >
        <span v-for="(tag, i) in selectedTag" :key="i" class="tag-item selected">{{ tag.name }}</span>
      </div>
    </div>
    <a-form class="flex" labelAlign="left" v-bind="layout" ref="formRef" :model="formState">
      <div class="form-container flex-1" style="padding-right: 3em;" v-if="formData">
        <template v-for="(item, key) in formData">
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
              <div class="w-33% inline-block" v-if="col.dataType === 16">
                <a-form-item :colon="false" :labelCol="{span: 0}" :wrapperCol="{span: 22}"
                  :name="['caseData', `${col.filed}`]" :rules="[
                {
                  required: col.isRequired == 1 ? true : false,
                  message: col.name + '不能为空',
                  trigger: ['change', 'blur']
                },
              ]">
                  <a-select ref="select" class="w-100%" mode="multiple" :placeholder="col.name" :max-tag-count="1"
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
                  trigger: ['change', 'blur']
                },
              ]">
                <a-textarea v-if="col.dataType === 2" placeholder="请输入"
                  v-model:value="formState.caseData[`form_${col.id}`]" :rows="4" />
                <a-date-picker placeholder="请选择" class="w-100%" v-else-if="col.dataType === 3"
                  v-model:value="formState.caseData[`${col.filed}`]" value-format="YYYY-MM-DD" />
                <a-input-number placeholder="请输入" v-else-if="col.dataType === 4"
                  v-model:value="formState.caseData[`${col.filed}`]" />
                <a-radio-group v-else-if="col.dataType === 5" v-model:value="formState.caseData[`${col.filed}`]"
                  :options="col.optList" />
                <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 -->
                <a-checkbox-group v-else-if="col.dataType === 6" v-model:value="formState.caseData[`${col.filed}`]"
                  :options="col.optList">
                </a-checkbox-group>
                <a-select ref="select" placeholder="请选择" v-else-if="col.dataType === 7" class="w-100%"
                  v-model:value="formState.caseData[`${col.filed}`]">
                  <a-select-option v-for="o in col.optList" :value="o.value">{{ o.text }}</a-select-option>
                </a-select>
                <template v-else-if="col.dataType === 9">
                  <template v-if="formState.caseData[`${col.filed}`].length">
                    <div v-for='imgItem in formState.caseData[`${col.filed}`]' class="custom-img-card">
                      <span class="delete-img" @click='deleteItemImg(imgItem,col.filed)'>
                        <close-circle-outlined />
                      </span>
                      <img width="100%" height="100%" :src="imgBaseUrl + imgItem" alt="avatar" />
                    </div>
                  </template>
                  <a-upload class="w-auto" :customRequest="customRequest" v-model:file-list="fileList"
                    list-type="picture-card" :show-upload-list="false" @change="changeImg($event, `${col.filed}`)">
                    <div>
                      <loading-outlined v-if="loading"></loading-outlined>
                      <plus-outlined v-else></plus-outlined>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </template>
                <a-select placeholder="选择或输入" v-else-if="col.dataType === 13" :showSearch="true"
                  v-model:value="formState.caseData[`${col.filed}`]" mode="tags" style="width: 100%"
                  :token-separators="[',']" @change="selectMutipleChange">
                  <a-select-option v-for="o in col.optList" :value="o.value">{{ o.text }}</a-select-option>
                </a-select>
                <a-input v-else placeholder="请输入" v-model:value="formState.caseData[`${col.filed}`]" />
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
              <div class="w-33% inline-block" v-if="col.dataType === 16">
                <a-form-item :colon="false" :labelCol="{span: 0}" :wrapperCol="{span: 22}"
                  :name="['caseData', `${col.filed}`]" :rules="[
                {
                  required: col.isRequired == 1 ? true : false,
                  message: col.name + '不能为空',
                  trigger: ['change', 'blur']
                },
              ]">
                  <a-select ref="select" class="w-100%" mode="multiple" :placeholder="item.name" :max-tag-count="1"
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
                  trigger: ['change', 'blur']
                },
              ]">
                <a-textarea v-if="col.dataType === 2" placeholder="请输入"
                  v-model:value="formState.caseData[`form_${col.id}`]" :rows="4" />
                <a-date-picker class="w-100%" placeholder="请选择" v-else-if="col.dataType === 3"
                  v-model:value="formState.caseData[`${col.filed}`]" value-format="YYYY-MM-DD" />
                <a-input-number placeholder="请输入" v-else-if="col.dataType === 4"
                  v-model:value="formState.caseData[`${col.filed}`]" />
                <a-radio-group v-else-if="col.dataType === 5" v-model:value="formState.caseData[`${col.filed}`]"
                  :options="col.optList" />
                <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 13.可添加 -->
                <a-checkbox-group v-else-if="col.dataType === 6" v-model:value="formState.caseData[`${col.filed}`]"
                  :options="col.optList">

                </a-checkbox-group>
                <a-select ref="select" placeholder="请选择" v-else-if="col.dataType === 7" class="w-100%"
                  v-model:value="formState.caseData[`${col.filed}`]">
                  <a-select-option v-for="o in col.optList" :value="o.value">{{ o.text }}</a-select-option>
                </a-select>
                <template v-else-if="col.dataType === 9">
                  <template v-if="formState.caseData[`${col.filed}`].length">
                    <div v-for='imgItem in formState.caseData[`${col.filed}`]' class="custom-img-card">
                      <span class="delete-img" @click='deleteItemImg(imgItem,col.filed)'>
                        <close-circle-outlined />
                      </span>
                      <img width="100%" height="100%" :src="imgBaseUrl + imgItem" alt="avatar" />
                    </div>
                  </template>
                  <a-upload class="w-auto" :customRequest="customRequest" v-model:file-list="fileList"
                    list-type="picture-card" :show-upload-list="false" @change="changeImg($event, `${col.filed}`)">
                    <div>
                      <loading-outlined v-if="loading"></loading-outlined>
                      <plus-outlined v-else></plus-outlined>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </template>
                <a-select placeholder="请选择" v-else-if="col.dataType === 13" :showSearch="true"
                  v-model:value="formState.caseData[`${col.filed}`]" mode="tags" style="width: 100%"
                  :token-separators="[',']" @change="selectMutipleChange">
                  <a-select-option v-for="o in col.optList" :value="o.value">{{ o.text }}</a-select-option>
                </a-select>
                <a-input v-else placeholder="请输入" v-model:value="formState.caseData[`${col.filed}`]" />
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
}
.custom-img-card {
  display: inline-block;
  width: 104px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.3s;
  position: relative;
  .delete-img {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #fff;
    display: block;
    color: #f243d9;
  }
}
.form-container::before,
.form-container::after {
  content: "";
  flex-basis: 100%;
  width: 0;
  order: 2;
}
</style>
