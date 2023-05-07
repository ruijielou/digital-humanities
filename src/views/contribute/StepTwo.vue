<script setup lang="ts">
import { nextTick, reactive, ref, watch } from "vue";
import { message } from "ant-design-vue";
import { format_file_url, imgBaseUrl } from "@/utils/config";
// import { MetaGroupConstant } from "@/utils/constan";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons-vue";
import { commonUpload } from "@/api";
const dateFormatMap = {
  date: "YYYY-MM-DD",
  month: "YYYY-MM",
  year: "YYYY",
};

const props = defineProps<{
  selectedTag: any[] | null;
  formModal?: any;
  dateInstant?: any;
  formData: any
}>();
const inputRef = ref<any>(null); //自定义标签的输入框
const inputVisible = ref<boolean>(false);
const inputValue = ref<string>("");
const fileList = ref<any>([]);
const formRef = ref<any>(null);
const loading = ref<boolean>(false);
const formState = reactive<any>({
  caseData: {},
  dateInstant: {}
});

const sugget_city_latlng_map = ref<any>({});
const city_latlng_map = ref<any>({});

// metaList中 dataType:
// 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const initForm = () => {
  if (props.formModal) {
    formState.caseData = { ...props.formModal };
    formState.dateInstant = {...props.dateInstant}
    
    init_sugget_city_latlng_map(props.formData);
    load_city_latlng_map(props.formModal);
  }
};

function load_city_latlng_map(res: any) {
  for (let field in res) {
    if (field.startsWith("city_")) {
      console.log("i:", field);
      if (res[field]) {
        city_latlng_map.value[field] = JSON.parse(res[field]);
      }
    }
    console.log("city_latlng_map:", city_latlng_map.value);
  }
}

const formValidate = async () => {
  try {
    console.log(
      "city_latlng_map:",
      JSON.parse(JSON.stringify(city_latlng_map.value))
    );
    let values = await formRef.value.validate();
    let city_latlng_values: any = {};
    for (let i in city_latlng_map.value) {
      let lats = city_latlng_map.value[i];
      console.log("field:", i, ", type:", typeof lats, ", value:", lats);
      if (typeof lats == "string") {
        city_latlng_values[i] = lats;
      } else {
        city_latlng_values[i] = JSON.stringify(lats);
      }
    }


    // Object.assign(values.caseData, city_latlng_values);
    // console.log('values.caseData:', values.caseData);
    Object.assign(formState.caseData, city_latlng_values);
    console.log("formState.caseData:", formState.caseData);

    return values && formState;
  } catch (error) {
    message.warning("请检查表单的完整性");
  }
};

/**
 * 上传图片
 */
let uploadFile: any = null;
let uploadFileCurrentKey = "";
const changeFile = (info: any, key: any) => {
  //上传图片
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

/**上传文件 */
const customRequest = async () => {
  const formData: any = new FormData();
  formData.append("biz", "temp");
  formData.append("file", uploadFile.originFileObj);
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

const deleteItemFile = (src: string, key: string) => {
  formState.caseData[key] = [
    ...formState.caseData[key].filter((item: any) => item != src),
  ];
};
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    inputRef.value && inputRef.value[0] && inputRef.value[0].focus();
  });
};
// 自定义标签
const handleInputConfirm = (key: string) => {
  const tags = [...formState.caseData[key]];
  if (inputValue.value && tags.indexOf(inputValue.value) === -1) {
    formState.caseData[key] = [...tags, inputValue.value];
  }

  inputVisible.value = false;
  inputValue.value = "";
};

const init_sugget_city_latlng_map = (formData: any) => {
  console.log("formData:", formData);
  for (let i in formData) {
    let group = formData[i];
    if (group.metaList) {
      for (let j in group.metaList) {
        let mata = group.metaList[j];
        if (mata.id == 334) {
          let optList = mata.optList;
          if (optList && optList.length > 0) {
            for (let i in optList) {
              let opt = optList[i];
              sugget_city_latlng_map.value[opt.text] = opt.ext;
            }
          }
        }
      }
    }
  }
  console.log("sugget_city_latlng_map.value:", sugget_city_latlng_map.value);
};

function chang_select(vals: any[], field: string) {
  console.log("field:", field, ", vals:", vals);
  if (field == "form_" + 334) {
    if (vals) {
      let citys = vals;
      let select_latlngs: any = {};
      for (let i in citys) {
        let city = citys[i];
        let latlng =
          sugget_city_latlng_map.value[city] ||
          city_latlng_map.value[field.replace("form_", "city_")][
            "city_" + city
          ];
        if (latlng) {
          select_latlngs["city_" + city] = latlng;
        }
      }
      city_latlng_map.value[field.replace("form_", "city_")] = select_latlngs;
      console.log("city_latlng_map.value:", city_latlng_map.value);
    }
  }
}
const changeDataFormater = (key) => {
  formState.caseData[key] = ""
}
watch(
  () => props.formData,
  (val) => {
    initForm();
  }
);

defineExpose({ formState, formValidate });
</script>
<template>
  <div class="step-two group-container">
    <div class="group-item" v-if="selectedTag && selectedTag.length">
      <div class="group-item-title">
        <span class="line-title"><span> 所属案例库 </span> </span>
        <span class="lines"></span>
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
        class="form-container flex-1"
        style="padding-left: 3em"
        v-if="formData"
      >
        <template v-for="(item, key) in formData">
          <div
            class="group-item"
            :class="{ 'left-item': key == 0, 'right-item': key != 0 }"
          >
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
                <a-form-item
                  :colon="false"
                  :labelCol="{ span: 0 }"
                  :wrapperCol="{ span: 22 }"
                  :name="['caseData', `${col.filed}`]"
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
                    mode="tags"
                    :placeholder="'请选择 ' + col.name"
                    :max-tag-count="1"
                    v-model:value="formState.caseData[`${col.filed}`]"
                  >
                    <a-select-option
                      v-for="o in col.optList"
                      :value="o.value + ''"
                      :placeholder="col.name"
                      >{{ o.text }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </div>
              <a-form-item
                v-else
                :colon="false"
                :name="['caseData', `${col.filed}`]"
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
                  :placeholder="col.placeholder || '请输入 ' + col.name"
                  v-model:value="formState.caseData[`form_${col.id}`]"
                  :rows="4"
                />
                <!-- <a-date-picker
                  class="w-100%"
                  :placeholder="col.placeholder || '请选择 ' + col.name"
                  v-else-if="col.dataType === 3"
                  v-model:value="formState.caseData[`${col.filed}`]"
                  value-format="YYYY-MM-DD"
                /> -->
                <a-date-picker
                  class="w-100%"
                  v-model:value="formState.caseData[`${col.filed}`]"
                  :placeholder="col.placeholder || '请选择' + col.name"
                  :picker="formState.dateInstant[col.filed] ? formState.dateInstant[col.filed] : 'date'"
                  :value-format='formState.dateInstant[col.filed] ? dateFormatMap[formState.dateInstant[col.filed]] : dateFormatMap.date'
                  v-else-if="col.dataType === 3"
                >
                  <template #renderExtraFooter>
                    <a-select v-model:value="formState.dateInstant[col.filed]" @change="changeDataFormater(col.filed)">
                      <a-select-option value="date">年-月-日</a-select-option>
                      <a-select-option value="month">年-月</a-select-option>
                      <a-select-option value="year">年</a-select-option>
                    </a-select>
                  </template>
                </a-date-picker>
                <a-input-number
                  :placeholder="col.placeholder || '请输入 ' + col.name"
                  v-else-if="col.dataType === 4"
                  v-model:value="formState.caseData[`${col.filed}`]"
                />
                <a-radio-group
                  v-else-if="col.dataType === 5"
                  v-model:value="formState.caseData[`${col.filed}`]"
                >
                  <a-radio
                    v-for="radioItem in col.optList"
                    :value="radioItem.value + ''"
                    >{{ radioItem.text }}</a-radio
                  >
                  <div>
                    {{ formState.caseData[`${col.filed}`] }}
                  </div>
                </a-radio-group>
                <!-- // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 -->
                <a-checkbox-group
                  v-else-if="col.dataType === 6"
                  v-model:value="formState.caseData[`${col.filed}`]"
                >
                  <a-checkbox
                    v-for="checkItem in col.optList"
                    :value="checkItem.value + ''"
                    >{{ checkItem.text }}</a-checkbox
                  >
                </a-checkbox-group>
                <a-select
                  ref="select"
                  :placeholder="col.placeholder || '请选择 ' + col.name"
                  v-else-if="col.dataType === 7"
                  class="w-100%"
                  v-model:value="formState.caseData[`${col.filed}`]"
                >
                  <a-select-option
                    v-for="o in col.optList"
                    :value="o.value + ''"
                    >{{ o.text }}</a-select-option
                  >
                </a-select>
                <template v-else-if="col.dataType === 9">
                  <template v-if="formState.caseData[`${col.filed}`]?.length">
                    <div
                      v-for="imgItem in formState.caseData[`${col.filed}`]"
                      class="custom-img-card"
                    >
                      <span
                        class="delete-img"
                        @click="deleteItemFile(imgItem, col.filed)"
                      >
                        <close-circle-outlined />
                      </span>
                      <img
                        class="w-100% h-100%"
                        :src="imgBaseUrl + imgItem"
                        alt="avatar"
                      />
                    </div>
                  </template>
                  <a-upload
                    class="w-auto"
                    :customRequest="customRequest"
                    v-model:file-list="fileList"
                    list-type="picture-card"
                    :show-upload-list="false"
                    accept=".jpg, .jpeg, .png"
                    @change="changeFile($event, `${col.filed}`)"
                  >
                    <div>
                      <loading-outlined
                        v-if="loading && uploadFileCurrentKey == col.filed"
                      ></loading-outlined>
                      <plus-outlined v-else></plus-outlined>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </template>
                <template v-else-if="col.dataType === 17">
                  <a-upload-dragger
                    v-model:fileList="fileList"
                    :customRequest="customRequest"
                    :show-upload-list="false"
                    @change="changeFile($event, `${col.filed}`)"
                    @drop="changeFile($event, `${col.filed}`)"
                  >
                    <p class="ant-upload-drag-icon">
                      <inbox-outlined></inbox-outlined>
                    </p>
                    <p class="ant-upload-text">
                      单击或拖动文件到此区域进行上传
                    </p>
                  </a-upload-dragger>
                  <template v-if="formState.caseData[`${col.filed}`]?.length">
                    <div
                      class="flex justify-between"
                      v-for="imgItem in formState.caseData[`${col.filed}`]"
                    >
                      <a
                        target="_blank"
                        rel="noopener"
                        class="ant-upload-list-item-name w-80% overflow-hidden"
                        :title="imgItem"
                        :href="format_file_url(imgItem)"
                        >{{ imgItem }}</a
                      >
                      <span
                        class="cursor-pointer"
                        @click="deleteItemFile(imgItem, col.filed)"
                      >
                        <delete-outlined style="color: #f243d9" />
                      </span>
                    </div>
                  </template>
                </template>
                <a-select
                  :placeholder="col.placeholder || '选择或输入 ' + col.name"
                  v-else-if="col.dataType === 13"
                  :showSearch="true"
                  v-model:value="formState.caseData[`${col.filed}`]"
                  mode="tags"
                  @change="(value) => chang_select(value, col.filed)"
                  style="width: 100%"
                  :token-separators="[',']"
                >
                  <a-select-option v-for="o in col.optList" :value="o.text">{{
                    o.text
                  }}</a-select-option>
                </a-select>
                <a-select
                  :placeholder="col.placeholder"
                  v-else-if="col.dataType === 15 || col.dataType === 14"
                  :showSearch="true"
                  v-model:value="formState.caseData[`${col.filed}`]"
                  mode="multiple"
                  style="width: 100%"
                  :token-separators="[',']"
                >
                  <a-select-option
                    v-for="o in col.optList"
                    :value="o.value + ''"
                    >{{ o.text }}</a-select-option
                  >
                </a-select>

                <a-input
                  v-else
                  :placeholder="col.placeholder || '请输入 ' + col.name"
                  v-model:value="formState.caseData[`${col.filed}`]"
                />
              </a-form-item>
            </template>
            <template v-if="item.name === '标签'">
              <template
                v-for="(tag, index) in formState.caseData.customTag"
                :key="tag"
              >
                <a-tooltip v-if="tag.length > 20" :title="tag">
                  <a-tag
                    class="w-30% h-32px lh-32px p-r-4 m-r-3% m-b-5 truncate"
                    :closable="true"
                    @close="deleteItemFile(tag, 'customTag')"
                  >
                    {{ `${tag.slice(0, 20)}...` }}
                  </a-tag>
                </a-tooltip>
                <a-tag
                  v-else
                  class="w-30% h-32px lh-32px m-r-3% m-b-5 truncate"
                  :closable="true"
                  @close="deleteItemFile(tag, 'customTag')"
                >
                  {{ tag }}
                </a-tag>
              </template>
              <span
                v-if="inputVisible"
                class="w-30% inline-block h-32px lh-32px m-r-3% m-b-5 truncate"
              >
                <a-input
                  ref="inputRef"
                  v-model:value="inputValue"
                  type="text"
                  autofocus
                  @blur="handleInputConfirm('customTag')"
                  @keyup.enter="handleInputConfirm('customTag')"
                />
              </span>
              <a-tag
                class="w-30% h-32px lh-32px m-r-3% m-b-5 truncate"
                v-if="!inputVisible"
                style="background: #fff; border-style: dashed"
                @click="showInput"
              >
                <plus-outlined />
                自定义标签
              </a-tag>
            </template>
          </div>
        </template>
        <div class="group-item right-item">
          <a-form-item
            :colon="false"
            label="开放权限"
            :name="['caseData', 'authType']"
            :rules="[
              {
                required: true,
                message: '权限不能为空',
                trigger: ['change', 'blur'],
              },
            ]"
          >
            <a-radio-group v-model:value="formState.caseData.authType">
              <a-radio :value="1">公开</a-radio>
              <a-radio :value="2">仅自己看</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
      </div>
    </a-form>
  </div>
</template>
<style lang="less">
.form-container {
  position: relative;
  overflow: hidden;
  .left-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 48%;
  }
  .right-item {
    position: relative;
    margin-left: 52%;
    margin-top: 10px;
    width: 48%;
  }
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
    z-index: 9;
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