<script setup lang="ts">
import { reactive } from "vue";
import { CaretDownOutlined } from "@ant-design/icons-vue";
import { meta } from "@/api";

const emit = defineEmits(["reload"]);
const optionsData = reactive<any>({
  result: {},
  formState: {},
});
const getQueryOption = async () => {
  const { result } = await meta.findSearchCondition({ ids: "333,340" });
  console.log(result);
  optionsData.result = { ...result };
};
getQueryOption();

const changeKeys = ($event: any, filed: string) => {
  console.log($event, filed);
  optionsData.formState[filed] = $event.key;
  emit("reload", { ...optionsData.formState });
};
const getName = (data: any, filed: string) => {
  const filterData = data.find(
    (item: any) => item.value === optionsData.formState[filed]
  );
  return filterData?.text || "";
};
</script>
<template>
  <a-dropdown type="primary" v-for="(item, key) in optionsData.result">
    <div @click.prevent style="margin-right: 1em">
      <caret-down-outlined />
      {{ getName(item.optList, item.filed) || item.name }}
    </div>
    <template #overlay>
      <a-menu @click="changeKeys($event, item.filed)">
        <a-menu-item key=""> 清除 </a-menu-item>
        <a-menu-divider />
        <a-menu-item v-for="opt in item.optList" :key="opt.value">
          {{ opt.text }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
