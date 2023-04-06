<script setup lang="ts">
import { ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { favoritegroup, favorite } from "@/api";
import { Modal, message } from "ant-design-vue";

const modalVisibility = ref<boolean>(false);
const isOpen = ref<boolean>(false); //是否为公开
const loading = ref<boolean>(false);
const checkedFloder = ref<string>("");
const collectionGroup = ref<any>([]);
const collectionFloderName = ref<string>("");

const emit = defineEmits(["reload"]);
const props = defineProps<{
  contentId?: any;
}>();

const getCollectionData = async () => {
  const { result } = await favoritegroup.myPage();
  collectionGroup.value = result?.records || [];
};

const createGroup = async () => {
  if (!collectionFloderName.value) {
    Modal.error({
      title: "提示",
      content: "案例名称不能为空",
    });
    return;
  }
  const res = await favoritegroup.insert({
    authType: isOpen.value ? 1 : 3,
    title: collectionFloderName.value,
  });
  if (res.success) {
    collectionFloderName.value = "";
    getCollectionData();
  }
};
const submitCollection = async () => {
  if (!checkedFloder.value) return;
  const result = await favorite.insert({
    type: 1,
    contentId: props.contentId,
    groupId: checkedFloder.value,
  });
  if (result.success) {
    message.success(result.message);
    modalVisibility.value = false;

    emit("reload");
  }
};

getCollectionData();

defineExpose({ modalVisibility });
</script>
<template>
  <a-modal v-model:visible="modalVisibility" class="border-bottom-search">
    <template #title>
      <div class="text-center">收藏</div>
    </template>
    <a-input>
      <template #suffix>
        <SearchOutlined />
      </template>
    </a-input>
    <a-radio-group v-model:value="checkedFloder" v-if="collectionGroup.length">
      <div class="p-3" v-for="item in collectionGroup">
        <a-radio :value="item.id">{{ item.title }}</a-radio>
      </div>
      <div class="p-3 flex items-center">
        <a-radio :value='999'>
          <a-input class="flex-1 m-r-3" v-model:value="collectionFloderName" placeholder="案例库名称"></a-input>
        </a-radio>
        <a-switch v-model:checked="isOpen">公开</a-switch>
      </div>
    </a-radio-group>
    <template #footer>
      <div class="text-center">
        <a-button type="primary" :loading="loading" v-if="checkedFloder === 999" @click="createGroup">创建</a-button>
        <a-button type="primary" :loading="loading" v-else @click="submitCollection">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>
