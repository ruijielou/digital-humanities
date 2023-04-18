<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { ReloadOutlined } from "@ant-design/icons-vue";
import { labgroup, meta, caseinfo } from "@/api";
import type { PageinationType } from "@/utils/type";

const checkedList = ref<string[]>([]);
const nameLetter = ref<string>("A");
/* 加载标签  */
const lab_group_list = ref<any>([]);
const load_lab_group = async () => {
  const { result } = await labgroup.loadList();
  lab_group_list.value = result;
};
load_lab_group();
const dataSource = ref<{ [key: string]: string }[]>([]);
const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
  column: "name",
  order: "asc",
});
const getCaseData = async (isMore?: boolean) => {
  const submitData = getCheckListId();
  if (isMore == true) {
    pagination.current += 1;
  } else {
    pagination.current = 1;
  }
  submitData.pageNo = pagination.current;
  submitData.pageSize = pagination.pageSize;
  submitData.nameLetter = nameLetter.value;

  const { result } = await caseinfo.page(submitData);
  if (result) {
    isMore == true
      ? (dataSource.value = [...dataSource.value, ...result.records])
      : (dataSource.value = [...result.records]);
  }
  pagination.total = result.total;
};
const getCheckListId = () => {
  const tagFields: any = {};
  for (const item of checkedList.value) {
    const sliceTag = item.split("_");
    const key = `tag_${sliceTag[0]}`
    if (tagFields[key]) {
      tagFields[key] += `,${sliceTag[1]}`;
    } else {
      tagFields[key] = `${sliceTag[1]}`;
    }
  }
  return tagFields;
};

const checkLetter = (letter: string) => {
  nameLetter.value = nameLetter.value === letter ?'': letter;
  getCaseData();
};
watch(
  () => checkedList.value,
  (val:any) => {
    getCaseData();
  }
);
getCaseData();
</script>
<template>
  <div class="h-screen overflow-auto casespectrum-container">
    <Header
      class="case-spectrum-header"
      bg-name="casespectrum-bg"
      title="案例谱"
    />
    <a-layout-content class="flex">
      <div class="w-360px bg-#f7f7f7 p-t-10 p-b-10">
        <div class="labels-container m-b-10 p-l-20">
          <!-- <div>标签：</div> -->
          <div class="flex justify-between p-r-4">
            <span class="line-title text-4.5 truncate">
              <span>标签：</span>
            </span>
            <span class="cursor-pointer" @click="load_lab_group">
              <reload-outlined />
            </span>
          </div>
          <div class="p-t-3">
            <a-checkbox-group v-model:value="checkedList">
              <div v-for="lab_group in lab_group_list">
                <a-tag
                  class="m-r-2 m-t-2"
                  v-for="k in lab_group.opts"
                  :color="'#' + k.colorValue"
                >
                  <a-checkbox class="c-#fff" :value="`${lab_group.id}_${k.id}`">
                    {{ k.title }}</a-checkbox
                  >
                </a-tag>
              </div>
            </a-checkbox-group>
          </div>
        </div>
      </div>
      <div class="flex-1 p-r-20 p-l-10">
        <div class="letters lines-purple">
          <span
            :class="{ active: nameLetter == String.fromCharCode(64 + i) }"
            v-for="i in 26"
            class="transition-all"
            @click="checkLetter(String.fromCharCode(64 + i))"
          >
            {{ String.fromCharCode(64 + i) }}
          </span>
        </div>
        <div class="spectrum-list p-t-5">
          <div class="spectrun-items" v-for="item in dataSource">
            {{ `${item.name}${item.code ? "(" + item.code + ")" : ""}` }}
          </div>
          <p
            class="text-center cursor-pointer"
            v-if="dataSource.length < pagination.total"
            @click="getCaseData(true)"
          >
            加载更多
          </p>
          <p class="text-center" v-else>没有更多了</p>
        </div>
      </div>
    </a-layout-content>
    <Footer />
  </div>
</template>
<style lang="less">
.casespectrum-container {
  .ant-checkbox {
    .ant-checkbox-inner {
      background-color: transparent;
    }
    &:hover .ant-checkbox-inner,
    &.ant-checkbox-checked .ant-checkbox-inner {
      border-color: #fff !important;
    }
  }
  .letters {
    span {
      display: inline-block;
      height: 40px;
      width: 40px;
      margin: 10px;
      text-align: center;
      line-height: 40px;
      font-size: 30px;
      font-weight: bold;
      cursor: pointer;
      color: #222;
      &:hover,
      &.active {
        background: #f243d9;
        color: #fff;
      }
    }
  }
  .spectrun-items {
    position: relative;
    padding-left: 1em;
    padding: 15px;
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #f5a95d;
    }
    &:nth-child(2n) {
      &::before {
        background-color: #c987fa;
      }
    }
  }
}
</style>
