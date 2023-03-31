<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import Distribution from "../../components/icons/Distribution.vue";
import Theme from "../../components/icons/Theme.vue";
import Knowledge from "../../components/icons/Knowledge.vue";
import Time from "../../components/icons/Time.vue";
import Cooperate from "../../components/icons/Cooperate.vue";
import worldGeo from "./geo.json";
import * as echarts from "echarts";
import { getOption } from "./options";
import { componentMap } from "./type";
import { seriesData } from "./mock";

interface ChartTypeMap {
  key: componentMap;
  name: string;
  id: number;
}

const currentType = ref<componentMap>(componentMap.Distribution);
// const chartsOption = {
//   [componentMap.Time]: areaOption,
//   [componentMap.Theme]: null,
//   [componentMap.Cooperate]: null,
//   [componentMap.Distribution]: null,
//   [componentMap.Knowledge]: null,
// };

const chartType = ref<ChartTypeMap[]>([
  {
    // key: "Theme",
    key: componentMap.Theme,
    name: "主题谱",
    id: 1,
  },
  {
    // key: "Cooperate",
    key: componentMap.Cooperate,
    name: "合作谱",
    id: 2,
  },
  {
    // key: "Distribution",
    key: componentMap.Distribution,
    name: "分布谱",
    id: 3,
  },
  {
    // key: "Time",
    key: componentMap.Time,
    name: "时间谱",
    id: 4,
  },
  {
    // key: "Knowledge",
    key: componentMap.Knowledge,
    name: "知识谱",
    id: 5,
  },
]);

const toggleChartType = (type: componentMap) => {
  if (type === currentType.value) return;
  currentType.value = type;
  const clickindex = chartType.value.findIndex((item) => item.key === type);
  const reloadIndex = clickindex - 2;
  chartType.value = [
    ...chartType.value.splice(reloadIndex),
    ...chartType.value,
  ];
  // if (type === componentMap.Distribution) return; //分布图加载地图组件，不渲染chart
  spinning.value = true;
  setTimeout(() => {
    initChart(type);
    spinning.value = false;
  }, 1000);
};

const activeRightId = ref<number>(1);
const spinning = ref<boolean>(false); //加载中的样式
const myChart = ref<any>(null);
const chartInit = shallowRef<any>(null);

const initChart = (type: componentMap) => {
  const options: any = getOption(type, seriesData[type]);
  if (!options) return;
  if (chartInit.value) {
    chartInit.value.clear();
    chartInit.value.dispose();
  }
  
  if (type === componentMap.Distribution) {
    echarts.registerMap("world", { geoJSON: worldGeo });
  }
  chartInit.value = echarts.init(myChart.value);
  chartInit.value.setOption(options);

  window.addEventListener("resize", () => {
    chartInit.value.resize();
  });
};

const changeView = (id: number) => {
  // 请求数据
  // 刷新页面资源
  // 暂时用loading状态，后期切换数据即可
  if (activeRightId.value === id) return;
  activeRightId.value = id;
  spinning.value = true;

  setTimeout(() => {
    initChart(currentType.value);
    spinning.value = false;
  }, 3000);
};

onMounted(() => {
  initChart(currentType.value)
});
onUnmounted(() => {
  chartInit.value && chartInit.value.dispose();
});
</script>
<template>
  <div class="h-screen overflow-auto">
    <Header
      class="visualization-header"
      bg-name="visualization-bg"
      title="对人文学科重绘廓型"
    />

    <a-layout-content class="visualization-content flex">
      <div class="chart-box flex-1 relative">
        <a-spin
          v-if="spinning"
          :spinning="spinning"
          class="position-center"
        ></a-spin>
        <!-- <Map v-show="currentType === componentMap.Distribution" /> -->
        <!-- v-show="currentType !== componentMap.Distribution" -->
        <div class="w-100% h-100%" ref="myChart"></div>
      </div>
      <div class="right-slider w-300px">
        <div class="border-bottom-search">
          <a-input style="border-color: #fff; color: #fff">
            <template #suffix>
              <SearchOutlined style="color: #fff" />
            </template>
          </a-input>
        </div>
        <div class="library-list">
          <div
            class="library-item flex flex-col"
            :class="{ active: activeRightId === i }"
            v-for="i in 6"
            @click="changeView(i)"
          >
            <div
              class="h-120px w-100% item-bg"
              style="background-image: url('/src/assets/image/card.png')"
            ></div>
            <div class="p-4 library-bottom-desc flex-1">
              <div class="line-clamp-2">
                德国图书馆、档案馆和博物馆门户（BAMP）
              </div>
              <div class="flex justify-between p-t-2 text-1.5">
                <span>德国</span>
                <span>2001-2023</span>
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
