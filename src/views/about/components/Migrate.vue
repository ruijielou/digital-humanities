<script lang="ts" setup>
import { ref } from "vue";
import { caseApi, repositorygroup, repository } from "@/api";
import { Modal, message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["reload"]);
const caseMoveModal = ref<boolean>(false);
const caseIds = ref<string>("");
const checkedFolder = ref<string>("999");
const groupId = ref<string | number | null | undefined>("");
const loading = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const repositoryName = ref<string>("");

const handleOk = (e: MouseEvent) => {
  caseMoveModal.value = false;
};

const repositoryGroup = ref<{ [key: string]: string }[]>([]);
const repositoryList = ref<{ [key: string]: string }[]>([]);
const getRepositoryGroup = async () => {
  const { result } = await repositorygroup.findList();
  if (result) {
    repositoryGroup.value = [...result];
  }
  load_repository_list();
};

const load_repository_list = async () => {
  const { result } = await repository.myList();
  if (result) {
    repositoryList.value = result;
  }
}
getRepositoryGroup();

const createGroup = async () => {
  if (!repositoryName.value) {
    Modal.error({
      title: "提示",
      content: "案例库名称不能为空",
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

  const res = await repository.insert({
    authType: isOpen.value ? 1 : 2,
    name: repositoryName.value,
    groupId: groupId.value,
    description: "",
    status: 2,
  });
  if (res.success) {
    repositoryName.value = "";
    getRepositoryGroup();
  }
};
const submitCollection = async () => {
  if (!checkedFolder.value) return;
  // 添加提交的接口
  const res = await caseApi.transferRepository({
    resRepositoryId: route.params.id, // 源仓库id
    destRepositoryId: checkedFolder.value, // 目标仓库id
    caseIds: caseIds.value
  });
  if(res.success) {
    message.success('迁移成功')
    emit('reload')
  }
  caseMoveModal.value = false;
  if(!caseIds.value) {
    
    router.push({ path: '/about/myCaseLibraryList/' + checkedFolder.value});
   
    setTimeout(() => {
      location.reload()
    }, 500);
  }
};
defineExpose({ caseMoveModal,caseIds });
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
    <a-radio-group v-model:value="checkedFolder" class="w-100%">
      <div v-if="repositoryList.length" class="repository-group">
        <div class="p-2" v-for="item in repositoryList">
          <a-radio :value="item.id">{{ item.name }}</a-radio>
        </div>
      </div>
      <div class="p-2">
        <div class="flex">
          <a-radio value="999"> </a-radio>
          <a-select v-model:value="groupId" class="w-100%">
            <a-select-option v-for="o in repositoryGroup" :value="o.id">{{
              o.title
            }}</a-select-option>
          </a-select>
        </div>
        <div class="flex p-l-23px p-t-2 items-center">
          <a-input
            class="flex-1 m-r-3"
            v-model:value="repositoryName"
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
<style lang="less">
.repository-group {
  max-height: 400px;
  overflow: auto;
  width: 100%;
}
</style>