<script lang="ts" setup>
import { ref, reactive, computed, watch, shallowRef, onMounted } from "vue";
import LogoText from "../../components/LogoText.vue";
import SetpOne from "./StepOne.vue";
import SetpTwo from "./StepTwo.vue";
import CustomCase from "./CustomCase.vue";
import { GroupDataItem, CaseType } from "./type";
import { repository } from "@/api";

const selectedTag = ref<string[]>([]);
const currentStep = ref<number>(0);
const caseType = ref<CaseType>(CaseType.System);

const chooseTag = (value: string) => {
  caseType.value = CaseType.System;
  selectedTag.value = Array.from(new Set([...selectedTag.value, value]));
};

const changeStep = (step: number) => {
  currentStep.value = step || 0;
};

const groupData: GroupDataItem[] = [
  {
    title: "数字GLAM",
    options: [
      "GLAM融合案例库",
      "数字图书馆案例库",
      "数字博物馆案例库",
      "数字档案馆案例库",
      "数字艺术案例库",
    ],
  },
  {
    title: "研究领域",
    options: [
      "女性文学案例库",
      "中国古典文献案例库",
      "文字、语言案例库",
      "地图、GIS案例库",
      "数字文化遗产案例库",
      "海外研究中国案例库",
      "数字记忆案例库",
      "其他学科领域案例库",
    ],
  },
  {
    title: "机构平台",
    options: [
      "数字人文会议获奖案例库",
      "高校数字人文研究项目案例库",
      "联盟、企业案例库",
    ],
  },
  {
    title: "基础设施",
    options: [
      "数字学术平台案例库",
      "数字计划案例库",
      "数字人文工具案例库",
      "法律、法规案例库",
    ],
  },
];

const chooseCustomTag = () => {
  caseType.value = CaseType.Custom;
  selectedTag.value = [];
};
const customeStep = [
  { label: "选择案例库", name: "setp-one" },
  { label: "自定义案例库", name: "CustomCase" },
  { label: "完善管理信息", name: "SetpTwo" },
  { label: "完成", name: "finished" },
];
const systemStep = [
  { label: "选择案例库", name: "setp-one" },
  { label: "完善管理信息", name: "SetpTwo" },
  { label: "完成", name: "finished" },
];

const stepData = computed(() => {
  return caseType.value === CaseType?.Custom
    ? [...customeStep]
    : [...systemStep];
});
const customCaseRef = ref<any>(null);
const gotoNext = async () => {
  if (currentStep.value === 1 && caseType.value === CaseType.Custom) {
    
    const formState = customCaseRef.value.formState;

    console.log(formState);
    
    createRepository({ ...formState.case });
  }
  currentStep.value = currentStep.value + 1;
};

// const customRepository = reactive<any>({
//   data: {
//     name: "",
//     description: "",
//     authType: "1",
//     status: null,
//   },
// });

// const setRepository = (data: any) => {
//   customRepository.data = { ...data };
// };

const createRepository = async (data: any) => {
  const res = await repository.insert({ ...data });
};

// watch(
//   () => currentStep.value,
//   (val: number, oldVal: number) => {
//     if (val === 2 && oldVal === 1 && caseType.value === CaseType.Custom) {
//       //如果是创建自定义案例
//     }
//   }
// );
onMounted(() => {

})
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
      <div v-for="(item, index) in stepData">
        <setp-one
          :selected-tag="selectedTag"
          :case-type="caseType"
          :group-data="groupData"
          @choose-tag="chooseTag"
          @choose-custom-tag="chooseCustomTag"
          v-if="currentStep === index && item.name === 'setp-one'"
        ></setp-one>
        <SetpTwo
          :selected-tag="selectedTag"
          v-if="currentStep === index && item.name === 'SetpTwo'"
        />
        <div
          v-if="currentStep === index && item.name === 'finished'"
          class="step-3 text-center"
        >
          <img class="p-t-6" src="../../assets/image/no-content.png" alt="" />
          <div class="text-5 p-t-4">已完成，等待审核中…</div>
        </div>
      </div>

      <div class="text-center p-t-10">
        <a-button v-if="currentStep === stepData.length - 1" type="primary"
          >完成</a-button
        >
        <a-button v-else @click="gotoNext" type="primary">下一步</a-button>
      </div>
    </a-layout-content>
  </div>
</template>
<style lang="less">
.group-container {
  padding: 20px 120px;

  .group-tags {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
  }

  .tag-item {
    text-align: center;
    cursor: pointer;
    display: inline-block;
    line-height: 44px;
    height: 44px;
    background-color: #f5f5f5;
    color: #333;

    &:hover {
      color: @primary-color;
      background: #eeebff;
    }

    &.active {
      background: @primary-color;
      color: #fff;
    }

    &.selected {
      background: #5b3df280;
      color: #fff;
    }
  }
}
</style>
