<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from 'ant-design-vue';
import { StepTwoForm } from "./type";

defineProps<{
  selectedTag: string[];
}>();
interface FormState {
  pass: string;
  checkPass: string;
  age: number | undefined;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({});

</script>
<template>
  <div class="step-two group-container">
    <div class="group-item">
      <div class="group-item-title">
        <span class="line-title"><span>
          所属案例库
        </span>
      </span>
      </div>
      <div class="group-tags">
        <span v-for="(tag, i) in selectedTag" :key="i" class="tag-item selected">{{ tag }}</span>
      </div>
    </div>
    <a-form class="flex" ref="formRef" :model="formState">
      <div class="group-item flex-1 m-r-5" :key="StepTwoForm.introduction.title">
        <div class="group-item-title">
          <span class="line-title">
            <span>  
              {{ StepTwoForm.introduction.title }}
            </span>
          </span>
        </div>
        <a-form-item v-for="col in StepTwoForm.introduction.formCols" has-feedback :label="col.name" :name="col.key">
          <a-input v-model:value="formState[col.key]" />
        </a-form-item>
      </div>
      <div class="right-container flex-1 m-l-5">
        <template v-for="(item, key) in StepTwoForm">
          <div class="group-item" v-if="key !== 'introduction'">
            <div class="group-item-title">
              <span class="line-title">
                <span>
                  {{ item.title }}
                </span>
              </span>
            </div>
            <a-form-item v-for="col in item.formCols" has-feedback :label="col.name" :name="col.key">
              <a-input v-model:value="formState[col.key]" />
            </a-form-item>
          </div>
        </template>
      </div>
    </a-form>
  </div>
</template>
