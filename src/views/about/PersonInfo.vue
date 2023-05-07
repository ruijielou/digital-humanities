<script setup lang="ts">
import { reactive, ref } from "vue";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import LogoText from "../../components/LogoText.vue";
import { useUserStore } from "@/store/user";
import { Modal } from "ant-design-vue";
import { dhuuser, commonUpload } from "@/api";
import { imgBaseUrl } from "@/utils/config";

const userStore = useUserStore();

const layout = {
  labelCol: { span: 2, offset: 6 },
  wrapperCol: { span: 8 },
};
const optional = ["学生", "教师", "研究者"];
const formState = reactive({
  user: {
    ...userStore.userInfo,
    professionField:
      userStore.userInfo.professionField &&
      optional.includes(userStore.userInfo.professionField)
        ? userStore.userInfo.professionField
        : "其他",
    // photo: "",
    // name: "",
    // ID: "",
    // occupation: "1",
    // workUnit: "",
    // specialism: "",
  },
  // otherProfession:''
  otherProfession:
    userStore.userInfo.professionField &&
    (optional.includes(userStore.userInfo.professionField) || userStore.userInfo.professionField === '其他' )
      ? ""
      : userStore.userInfo.professionField,
});
const onFinish = async (values: any) => {
  const params = { ...values };
  
  if (params.user.professionField === "其他") {
    params.user.professionField = formState.otherProfession;
  }
  const result = await dhuuser.update({ ...params.user });
  if (result.success) {
    Modal.success({
      title: () => "提示",
      content: () => "修改成功",
    });
    location.reload();
  }
};
const previews = reactive<any>({ url: "", img: {} });
const visibleUploadImg = ref<boolean>(false);
const option = reactive<any>({
  img: "",
  size: 1,
  full: false,
  outputType: "png",
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 100,
  autoCropHeight: 100,
  centerBox: false,
  high: false,
  cropData: {},
  enlarge: 1,
  mode: "contain",
  maxImgSize: 1000,
  limitMinSize: [50, 50],
  fixed: false,
  fixedNumber: [2, 1],
});
const loading = ref<boolean>(false);
const cropper = ref<any>(null);
let uploadFile: any = null;
const uploadImg = (e: any, num: number) => {
  //上传图片
  uploadFile = e.target.files[0];
  if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
    alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
    return false;
  }
  let reader = new FileReader();
  reader.onload = (e: any) => {
    let data;
    if (typeof e.target.result === "object") {
      // 把Array Buffer转化为blob 如果是base64不需要
      data = window.URL.createObjectURL(new Blob([e.target.result]));
    } else {
      data = e.target.result;
    }
    option.img = data;
  };
  reader.readAsArrayBuffer(uploadFile);
};
const handleOk = () => {
  cropper.value.getCropBlob(async (data: any) => {
    // formState.user.avatar = data;
    //转换成file类型
    const formData: any = new FormData();
    let file: any = new File([data], uploadFile.name, {
      type: data.type,
    });
    file.uid = Date.now();
    debugger
    formData.append("biz", "szrw");
    formData.append("file", file);

    const res = await commonUpload(formData);
    if (res.success) {
      formState.user.avatar = res?.message;
      visibleUploadImg.value = false;
    }
  });
};
const realTime = (data: any) => {
  previews.data = { ...data };
};
const openModal = () => {
  option.img = formState.user.avatar;
  visibleUploadImg.value = true;
};
</script>
<template>
  <a-layout-content
    style="padding: 20px 0; margin: 0 auto; width: 80%; position: relative"
    class="flex flex-col"
  >
    <div
      class="return-prev-page cursor-pointer absolute z-2"
      @click="$router.push({ name: 'About' })"
    >
      <arrow-left-outlined />
      <span class="p-l-2">个人中心</span>
    </div>
    <LogoText style="margin-top -5px;" text="修改信息" />
    <div class="userinfo-container">
      <div class="p-t-4">
        <a-form
          :model="formState"
          v-bind="layout"
          labelAlign="left"
          name="nest-messages"
          @finish="onFinish"
        >
          <a-form-item
            :colon="false"
            :wrapper-col="{ ...layout.wrapperCol, offset: 11 }"
          >
            <a-avatar
              shape="circle"
              @click="openModal"
              :size="84"
              class="m-t-10 cursor-pointer"
              title="person"
            >
              <template #icon>
                <img
                  v-if="formState.user.avatar"
                  :src="imgBaseUrl + formState.user.avatar"
                  alt=""
                />
                <UserOutlined v-else />
              </template>
            </a-avatar>
          </a-form-item>
          <a-form-item
            style="display: none"
            :colon="false"
            :name="['user', 'avatar']"
            label="头像"
          >
            <a-input v-model:value="formState.user.avatar" />
          </a-form-item>
          <a-form-item :colon="false" :name="['user', 'username']" label="姓名">
            <a-input v-model:value="formState.user.username" />
          </a-form-item>
          <a-form-item :colon="false" :name="['user', 'code']" label="ID">
            <span>{{ formState.user.code }}</span>
          </a-form-item>
          <a-form-item
            :colon="false"
            :name="['user', 'professionField']"
            label="职业"
          >
              <a-radio-group
                v-model:value="formState.user.professionField"
                name="radioGroup"
              >
                <a-radio v-for="key in optional" :value="key">{{
                  key
                }}</a-radio>
                <a-radio value="其他">其他</a-radio>
              </a-radio-group>
              <a-input
              class="m-t-2"
                v-if="formState.user.professionField === '其他'"
                v-model:value="formState.otherProfession"
              />
          </a-form-item>
          <a-form-item :colon="false" :name="['user', 'company']" label="单位">
            <a-input v-model:value="formState.user.company" />
          </a-form-item>
          <a-form-item
            :colon="false"
            :name="['user', 'researchField']"
            label="研究领域"
          >
            <a-input v-model:value="formState.user.researchField" />
          </a-form-item>
          <a-form-item
            :colon="false"
            :wrapper-col="{ ...layout.wrapperCol, offset: 12 }"
          >
            <a-button type="primary" html-type="submit">完成</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <a-modal v-model:visible="visibleUploadImg">
      <template #title>
        <div class="text-center">上传头像</div>
      </template>
      <div class="flex">
        <div class="flex-1">
          <div class="cut">
            <vue-cropper
              ref="cropper"
              @realTime="realTime"
              v-bind="option"
            ></vue-cropper>
          </div>
          <div class="text-center">
            <label class="cursor-pointer" for="uploads">
              <reload-outlined />
              重新选择
            </label>
            <input
              type="file"
              id="uploads"
              style="position: absolute; clip: rect(0 0 0 0)"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadImg($event, 1)"
            />
          </div>
        </div>
        <div
          class="preview w-200px flex justify-center items-center"
          style="border-left: 1px solid #e8e8e8"
        >
          <a-avatar shape="circle" :size="100" title="person">
            <template #icon>
              <img
                v-if="previews?.data?.url || option.img"
                :style="previews?.data?.img"
                :src="option.img"
                alt="photo"
              />
              <UserOutlined v-else />
            </template>
          </a-avatar>
        </div>
      </div>
      <p class="p-t-5 c-#999">
        请选择图片上传：大小180*180像素支持JPG、PNG等格式，图片需小于2M
      </p>
      <template #footer>
        <div class="text-center">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >确定</a-button
          >
        </div>
      </template>
    </a-modal>
  </a-layout-content>
</template>
<style lang="less">
.cut {
  width: 200px;
  height: 200px;
  margin: 10px auto;
}
</style>