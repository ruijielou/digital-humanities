<script lang="ts" setup>
import { ref, shallowRef, onMounted,onUnmounted } from "vue";
import * as echarts from "echarts";
import { getOption } from "../visualization/options";
import { componentMap } from "../visualization/type";
import { caseApi } from "@/api";

const myChart = ref<any>(null);
const chartInit = shallowRef<any>(null);
const initChart = async () => {

  // const props = defineProps<{
  //   recored_id?: any;
  // }>();
  // console.log('recored_id:', props.recored_id)
  //TODO  把参数换成从
  const { result } = await caseApi.findCaseCharGraphDto('134');

  const options: any = getOption(componentMap.Knowledge, result);
  if (!options) return;
  if (chartInit.value) {
    chartInit.value.clear();
    chartInit.value.dispose();
  }
  chartInit.value = echarts.init(myChart.value);
  chartInit.value.setOption(options);

  window.addEventListener("resize", () => {
    chartInit.value.resize();
  });
};
onMounted(() => {
  initChart();
});
onUnmounted(() => {
  chartInit.value && chartInit.value.dispose();
});
</script>
<template>
  <div class="w-100% h-100%" ref="myChart"></div>
</template>