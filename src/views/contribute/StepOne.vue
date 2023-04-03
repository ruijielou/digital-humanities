<script setup lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
import { GroupDataItem, CaseType } from "./type";
const emit = defineEmits(['chooseCustomTag', 'chooseTag']);
defineProps<{
  groupData: GroupDataItem[];
  selectedTag: any[];
  caseType: CaseType
}>();

</script>
<template>
  <div class="group-container">
    <div class="group-tags">
      <span
        class="tag-item"
        :class="{ active: caseType === CaseType.Custom }"
        @click="emit('chooseCustomTag')"
      >
        <PlusOutlined />
        自定义案例库
      </span>
    </div>
    <div class="group-item" v-for="(item, index) in groupData" :key="index">
      <div class="group-item-title">
        <span class="line-title"><span>{{ item.title }}</span></span>
      </div>
      <div class="group-tags">
        <span
          v-for="(tag, i) in item.repositoryList"
          @click="emit('chooseTag', tag)"
          :key="i"
          class="tag-item"
          :class="{ active: selectedTag.some(item => item.id === tag.id) }"
          >{{ tag.name }}</span
        >
      </div>
    </div>
  </div>
</template>
