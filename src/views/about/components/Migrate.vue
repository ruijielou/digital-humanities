<script lang="ts" setup>
import { ref } from "vue";
import { favoritegroup, repositorygroup } from "@/api";
import type { DefaultOptionType } from "ant-design-vue/lib/vc-select/Select";
import { Modal, message } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";


const emit = defineEmits(["reload"]);
const caseMoveModal = ref<boolean>(false);
const searchInfo = ref<string>("");
const checkedFolder = ref<string>("999");
const groupId = ref<string | number | null | undefined>("");
const loading = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const caseName = ref<string>("");

const handleOk = (e: MouseEvent) => {
  caseMoveModal.value = false;
};


const collectionGroup = ref<{ [key: string]: string }[]>([]);
const getCollectionData = async () => {
  const { result } = await favoritegroup.myPage({
    searchInfo: searchInfo.value,
  });
  collectionGroup.value = result?.records || [];
};
const repositorygroup_options = ref<DefaultOptionType[]>([]);

repositorygroup.list().then((res) => {
  if (res.success) {
    let i;
    let repositorygroup_list: DefaultOptionType[] = [];
    for (i in res.result) {
      let opt: any = res.result[i];
      repositorygroup_list.push({ value: opt.id, label: opt.title });
    }
    groupId.value = repositorygroup_list[0].value
    repositorygroup_options.value = repositorygroup_list;
  }
});

getCollectionData();

const createGroup = async () => {
  if (!caseName.value) {
    Modal.error({
      title: "提示",
      content: "案例名称不能为空",
    });
    return;
  }
  if (!groupId.value) {
    Modal.error({
      title: "提示",
      content: "分类不能为空",
    });
    return;
  }
  const res = await favoritegroup.insert({
    authType: isOpen.value ? 1 : 3,
    title: caseName.value,
  });
  if (res.success) {
    caseName.value = "";
    getCollectionData();
  }
};
const submitCollection = async () => {
  if (!checkedFolder.value) return;
  // 添加提交的接口
  emit("reload");
  caseMoveModal.value = false;
};
defineExpose({ caseMoveModal });
</script>
<template>
  <a-modal
    v-model:visible="caseMoveModal"
    class="border-bottom-search"
    @ok="handleOk"
  >
    <template #title>
      <div class="text-center">迁移</div>
    </template>
    <a-input>
      <template #suffix>
        <SearchOutlined @click="getCollectionData" />
      </template>
    </a-input>
    <a-radio-group v-model:value="checkedFolder" class="w-100%">
      <div v-if="collectionGroup.length" class="collection-group">
        <div class="p-2" v-for="item in collectionGroup">
          <a-radio :value="item.id">{{ item.title }}</a-radio>
        </div>
      </div>
      <div class="p-2">
        <div class="flex">
          <a-radio value="999"> </a-radio>
          <a-select
            v-model:value="groupId"
            class="w-100%"
            :options="repositorygroup_options"
          >
          </a-select>
        </div>
        <div class="flex p-l-23px p-t-2 items-center">
          <a-input
            class="flex-1 m-r-3"
            v-model:value="caseName"
            placeholder="案例库名称"
          ></a-input>
          <a-switch v-model:checked="isOpen">公开</a-switch>
        </div>
      </div>
    </a-radio-group>
    <template #footer>
      <div class="text-center">
        <a-button
          type="primary"
          :loading="loading"
          v-if="checkedFolder == '999'"
          @click="createGroup"
          >创建</a-button
        >
        <a-button
          type="primary"
          :loading="loading"
          v-else
          @click="submitCollection"
          >确定</a-button
        >
      </div>
    </template>
  </a-modal>
</template>
