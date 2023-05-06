<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { Modal } from "ant-design-vue";
import LogoText from "../../components/LogoText.vue";
import SetpOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import CustomCase from "./CustomCase.vue";
import { CaseType } from "./type";
import { repository, repositorygroup, caseApi, meta } from "@/api";
import { formatterFormInput } from "./utils";
import { formatterFormData } from "@/utils/config";
type AnyObject<T = any> = {
  [key: string]: T | any;
};
const customeStep = [
  { label: "选择案例库", name: "setp-one" },
  { label: "自定义案例库", name: "CustomCase" },
  { label: "完善管理信息", name: "StepTwo" },
  { label: "完成", name: "finished" },
];
const systemStep = [
  { label: "选择案例库", name: "setp-one" },
  { label: "完善管理信息", name: "StepTwo" },
  { label: "完成", name: "finished" },
];

const stepData = computed(() => {
  return caseType.value === CaseType?.Custom
    ? [...customeStep]
    : [...systemStep];
}) as any;

const selectedTag = ref<AnyObject[]>([]);
const currentStep = ref<number>(0);
const caseType = ref<CaseType>(CaseType.System);

const getCurrentTypeTemplate = () => {
  return stepData.value.find(
    (item: AnyObject, index: number) => index === currentStep.value
  ).name;
};

const chooseTag = (value: any) => {
  caseType.value = CaseType.System;
  // const newArr = Array.from(new Set([...selectedTag.value.map(item => item.id), value.id]));
  if (selectedTag.value.some((item) => item.id === value.id)) {
    selectedTag.value = selectedTag.value.filter((a) => a.id !== value.id);
    return;
  }
  selectedTag.value = [...selectedTag.value, { ...value }];
};

const changeStep = (step: number) => {
  currentStep.value = step || 0;
};

const groupData = ref<any>([]);
const chooseCustomTag = () => {
  caseType.value = CaseType.Custom;
  selectedTag.value = [];
  currentStep.value = currentStep.value + 1;//选择自定义案例库直接进入下一步
};

const customCaseRef = ref<any>(null);
const stepTwoRef = ref<any>(null);
const stepTwoData = reactive<any>({
  data: null,
  formModal: null,
});

const gotoNext = async (status?: number) => {
  if (currentStep.value === 1 && caseType.value === CaseType.Custom) {
    const caseData: AnyObject = await customCaseRef.value?.formValidate();
    if (!caseData.case) return;
    const caseState = customCaseRef.value.formState;
    const res = await repository.insert({ ...caseState.case });
    if (!res) return;
    const tagItem = { name: caseState.case.name, id: res.id };
    selectedTag.value = [{ ...tagItem }];
  }
  if (
    stepData.value[currentStep.value + 1] &&
    stepData.value[currentStep.value + 1]["name"] === "StepTwo"
  ) {
    const isNext = await getTwoFormInput();
    if (!isNext) return;
  }

  //最后一步处理内容 提交表单内容
  if (getCurrentTypeTemplate() == "StepTwo") {
    const formState: any = await stepTwoRef.value?.formValidate();

    if (!formState) return;
    const idList: number[] = selectedTag.value.map((item) => item.id);
    //TODO authType(1:公开 2:私有) 和 status(1:暂存, 2:待审核) 需要改成选项
    console.log('formState.caseData:', formState.caseData);
    const submitData = {
      ...formatterFormData({ ...formState.caseData }),
      status: status || 2,
      repositoryIds: idList.join(","),
    };

    const response = await caseApi.add(submitData);
    if (!response) return;
  }
  currentStep.value = currentStep.value + 1;
};

const getTwoFormInput = async () => {
  const idList: number[] = selectedTag.value.map((item) => item.id);
  if (idList.length == 0) {
    Modal.error({
      title: () => "提示",
      content: () => "请选择案例",
    });
    return false;
  }
  const { result } = await meta.findFormListGroup(idList.join(","));

  if (result) {
    const { formModal } = formatterFormInput({ result });
    stepTwoData.formModal = { ...formModal };
    stepTwoData.data = [...result];
  }
  return true;
};

// 获取第一步的标签列表
const getStepOneLabels = async () => {
  const res = await repositorygroup.findList();
  if (res.success) {
    groupData.value = [...res.result];
  }
};

const reloadPage = () => {
  location.reload();
};

onMounted(() => {
  getStepOneLabels();
});
</script>
<template>
  <div class="h-screen overflow-auto">
    <Header title="追踪研究线索" bg-name="bg1" class="contribute-header" />
    <a-layout-content
      style="padding-top: 20px; padding-bottom: 20px"
      class="flex flex-col"
    >
      <LogoText text="案例投稿" />
      <div class="p-l-100 p-r-100 p-t-5 p-b-5">
        <a-steps :current="currentStep" size="small" @change="changeStep">
          <a-step
            :disabled="true"
            :title="item.label"
            :key="item.name"
            v-for="item in stepData"
          />
        </a-steps>
      </div>
      <custom-case
        :selected-tag="selectedTag"
        ref="customCaseRef"
        v-show="currentStep === 1 && caseType === CaseType.Custom"
      />
      <StepTwo
        :selected-tag="selectedTag"
        ref="stepTwoRef"
        :form-modal="stepTwoData.formModal"
        :form-data="stepTwoData.data"
        v-show="getCurrentTypeTemplate() == 'StepTwo'"
      />
      <div v-for="(item, index) in stepData">
        <setp-one
          :selected-tag="selectedTag"
          :case-type="caseType"
          :group-data="groupData"
          @choose-tag="chooseTag"
          @choose-custom-tag="chooseCustomTag"
          v-if="currentStep === index && item.name === 'setp-one'"
        ></setp-one>

        <div
          v-if="currentStep === index && item.name === 'finished'"
          class="step-3 text-center"
        >
          <img class="p-t-6" src="../../assets/image/no-content.png" alt="" />
          <div class="text-5 p-t-4">已完成，等待审核中…</div>
        </div>
      </div>

      <div class="text-center p-t-10">
        <a-button
          v-if="currentStep === stepData.length - 1"
          @click="reloadPage"
          type="primary"
          >完成</a-button
        >
        <template v-else-if="getCurrentTypeTemplate() == 'StepTwo'">
          <a-button @click="gotoNext(1)" class="m-r-8" type="info">暂存</a-button>
          <a-button @click="gotoNext()" type="primary">提交</a-button>
        </template>
        <a-button v-else @click="gotoNext()" type="primary">下一步</a-button>
        <!-- 1:暂存, 2:待审核) -->
      </div>
    </a-layout-content>
  </div>
</template>
<style lang="less">
.group-container {
  padding: 20px 120px;
}
</style>