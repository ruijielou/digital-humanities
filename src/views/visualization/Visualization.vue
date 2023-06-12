<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import Distribution from "../../components/icons/Distribution.vue";
import Theme from "../../components/icons/Theme.vue";
import Knowledge from "../../components/icons/Knowledge.vue";
import Time from "../../components/icons/Time.vue";
import Cooperate from "../../components/icons/Cooperate.vue";
// import worldGeo from "./geo.json";
import * as echarts from "echarts";
import { getOption } from "./options";
import { componentMap, chartList } from "@/utils/type";
import { caseLocation, caseApi } from "@/api";
import { imgBaseUrl } from "@/utils/config";

let worldGeo:any = null;

// declare const echarts: any;
interface ChartTypeMap {
  key: componentMap;
  name: string;
  id: number;
}

const route = useRoute();
const router = useRouter();
const legendData = ["所属机构", "合作机构", "资助机构", "项目案例"];
const currentType = ref<componentMap>(componentMap.Distribution);
const chartType = ref<ChartTypeMap[]>([...chartList]);
const searchInfo = ref<string>("");

const toggleChartType = (type: componentMap) => {
  if (type === currentType.value) return;
  const clickindex = chartType.value.findIndex((item) => item.key === type);
  const reloadIndex = clickindex - 2;
  chartType.value = [
    ...chartType.value.splice(reloadIndex),
    ...chartType.value,
  ];

  currentType.value = type;

  // route.query.type = type;
  router.push({ name: route.name, query: { type } });
  // initChart(type);
};

const spinning = ref<boolean>(false); //加载中的样式
const currentId = ref<string>(""); //选中了哪个ID
const myChart = ref<any>(null);
const chartInit = shallowRef<any>(null);
/* 案例列表 */
const case_location_list = ref<any>([]);

const initChart = async (type: componentMap) => {
  let resultData: any = null;
  const id: string = currentId.value;
  spinning.value = true;
try {
  if (type === componentMap.Distribution) {
    const { result } = await caseLocation.list();
    resultData = id ? result.filter((a: any) => a.id == id) : [...result];
  } else if (type === componentMap.Time) {
    const { result } = await caseApi.findTimeReport(id);
    resultData = [...result];
  } else if (type === componentMap.Knowledge) {
    const { result } = await caseApi.findCaseRelationCharGraphDto(id);
    resultData = result;
  } else if (type === componentMap.Theme) {
    const { result } = await caseApi.findThemeCharGraph(id);
    let kes = [];
    let i;
    for (i in result) {
      kes.push(result[i]);
    }
    resultData = kes;
  } else if (type === componentMap.Cooperate) {
    const { result } = await caseApi.findCharSankey(id);
    resultData = result;
  }
} catch (error) {
  spinning.value = false;
}
  //其他图形在这儿添加else if
  // else {
  //   resultData = seriesData[type];
  // }
  const options: any = getOption(type, resultData);

  if (!options) return;
  if (chartInit.value) {
    chartInit.value.clear();
    chartInit.value.dispose();
  }

  if (type === componentMap.Distribution) {
    if (!worldGeo) {
      const res = await fetch("/geo.json");
      worldGeo = await res.json();
    }

    echarts.registerMap("world", { geoJSON: worldGeo } as any);
  }
  spinning.value = false;
  chartInit.value = echarts.init(myChart.value);
  chartInit.value.setOption(options);

  window.addEventListener("resize", () => {
    chartInit.value.resize();
  });
  type === componentMap.Knowledge && chartInit.value.on("click", "series", (params:any) => {
    if(params.dataType === 'node') {
      searchInfo.value = params.data.name;
      load_case_location();
    }
  });
};

const changeView = (id: string) => {
  currentId.value = currentId.value == id ? "" : id;
};
watch(
  currentId,
  (val) => {
    if (val) {
      chartInit.value && chartInit.value.dispose();
      initChart(currentType.value);
    }
  },
  { immediate: true } // 如果要立即执行一次，请添加此选项
);
watch(
  route,
  (newRoute, oldRoute) => {
    const type = (newRoute.query?.type as componentMap) || currentType.value;
    chartInit.value && chartInit.value.dispose();
    initChart(type);
    toggleChartType(type);
  },
  { immediate: true } // 如果要立即执行一次，请添加此选项
);
// onMounted(() => {
//   const type = route.query?.type as componentMap;
//   if(type) {
//     currentType.value = type;
//     toggleChartType(currentType.value);
//   }
//   initChart(currentType.value);
// });
onUnmounted(() => {
  chartInit.value && chartInit.value.dispose();
});

const load_case_location = async () => {
  const { result } = await caseLocation.list({ nameFuzzy: searchInfo.value });
  case_location_list.value = result;
};
load_case_location();
</script>
<template>
  <div class="h-screen overflow-auto">
    <Header
      class="visualization-header"
      bg-name="visualization-bg"
      title="对人文学科重绘廓型"
    />

    <a-layout-content class="visualization-content flex position-relative">
      <div class="chart-box flex-1 relative">
        <a-spin
          v-if="spinning"
          class="position-center"
        ></a-spin>
        <template v-else>
          <div
          class="legend-box flex w-86% m-l-5% position-absolute p-t-20px"
          v-if="currentType === componentMap.Cooperate"
        >
          <div class="flex-1 flex justify-center" v-for="item in legendData">
            <a-tag
              color="#292B61"
              class="border-color-#6960BA p-4px p-l-25px p-r-25px"
            >
              {{ item }}</a-tag
            >
          </div>
        </div>
        </template>
        <div class="w-100% h-100%" ref="myChart"></div>
      </div>
      <div class="right-slider w-300px">
        <div class="border-bottom-search">
          <a-input
            @keyup.enter.native="load_case_location()"
            style="border-color: #fff; color: #fff"
            v-model:value="searchInfo"
          >
            <template #suffix>
              <SearchOutlined
                style="color: #fff; cursor: pointer"
                @click="load_case_location()"
              />
            </template>
          </a-input>
        </div>
        <div class="library-list">
          <div
          :class="{ active: currentId == case_location.id }"
          class="library-item flex flex-col"
          v-for="(case_location, i) in case_location_list"
          @click="changeView(case_location.id)"
          @dblclick.native="
              $router.push({ name: 'CaseDetail', params: { id: case_location.id } })
            "
          >
            <div
              class="h-120px w-100% item-bg"
              :style="{
                backgroundImage: `url(${
                  case_location.cover
                    ? imgBaseUrl + case_location.cover
                    : '/src/assets/image/card.png'
                })`,
              }"
            ></div>
            <div class="p-4 library-bottom-desc flex-1">
              <div class="line-clamp-2">
                {{ case_location.name }}
              </div>
              <div class="flex justify-between p-t-2 text-1.5">
                <span>{{ case_location.country }}</span>
                <span>{{ case_location.itemTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-menu">
        <div
          class="chart-type-item"
          @click="toggleChartType(item.key)"
          :class="{ active: currentType === item.key }"
          :key="item.key"
          v-for="item in chartType"
        >
          <span class="title">{{ item.name }}</span>

          <Theme
            :title="item.name"
            class="svg"
            v-if="item.key === componentMap.Theme"
          />
          <Cooperate
            :title="item.name"
            class="svg"
            v-if="item.key === componentMap.Cooperate"
          />
          <Distribution
            :title="item.name"
            class="svg"
            v-if="item.key === componentMap.Distribution"
          />
          <Time
            :title="item.name"
            class="svg"
            v-if="item.key === componentMap.Time"
          />
          <Knowledge
            :title="item.name"
            class="svg"
            v-if="item.key === componentMap.Knowledge"
          />
        </div>
      </div>
      <div class="chart-menu-bg"></div>
    </a-layout-content>
  </div>
</template>
<style lang="less">
.visualization-content {
  height: calc(100% - 20vh);
  position: relative;
  // .chart-box {
  //   height: 80vh;
  // }
  .chart-menu-bg {
    width: 100px;
    height: 90%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("../../assets/image/banner.png");
    background-size: cover;
    background-position: center center;
    z-index: 99;
  }
  .chart-menu {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;

    z-index: 100;
    .chart-type-item {
      padding: 10px;
      cursor: pointer;
      transition: all 0.2s linear;
      .title {
        display: none;
        transition: all 0.2s linear;
      }

      .svg {
        display: inherit;
        transition: all 0.2s linear;
      }
      &.active {
        &:hover {
          transform: none;
        }
        .title {
          display: inherit;
        }
        .svg {
          display: none;
        }
      }
    }

    & > div:nth-of-type(1),
    & > div:nth-last-of-type(1) {
      transform: translateX(20px);
      &:hover {
        transform: scale(1.4) translateX(20px);
      }
    }

    & > div:nth-of-type(2),
    & > div:nth-last-of-type(2) {
      transform: translateX(10px);
      &:hover {
        transform: scale(1.4) translateX(10px);
      }
    }
  }

  background: linear-gradient(180deg, #1e1331 0%, #08122e 100%);

  .right-slider {
    border-left: 1px solid #ccc;
    padding: 10px;
    background: linear-gradient(
      270deg,
      #080f2c 0%,
      rgba(8, 15, 44, 0.84) 75%,
      rgba(8, 15, 44, 0) 100%
    );

    .ant-input {
      color: #fff;
    }

    .library-list {
      height: calc(100% - 30px);
      overflow: auto;

      .library-item {
        border: 1px solid transparent;
        padding: 8px;
        cursor: pointer;
        margin: 10px;
        color: #fff;

        .item-bg {
          background-size: cover;
          background-position: center center;
        }

        &:hover,
        &.active {
          box-shadow: 0px 2px 6px 0px rgba(255, 255, 255, 0.39);
          border-color: #8168ff;
          background: #0b102b;

          .library-bottom-desc {
            border-color: transparent;
          }
        }

        .library-bottom-desc {
          background: #0b102b;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
      }
    }
  }
}
</style>
