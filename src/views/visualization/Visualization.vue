<script setup lang="ts">
import { ref, onMounted } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import Distribution from "../../components/icons/Distribution.vue";
import Theme from "../../components/icons/Theme.vue";
import Knowledge from "../../components/icons/Knowledge.vue";
import Time from "../../components/icons/Time.vue";
import Cooperate from "../../components/icons/Cooperate.vue";
import Map from "./Map.vue";
// import * as echarts from "echarts";

const currentType = ref<string>("Distribution");
interface ChartTypeMap {
  key: string;
  name: string;
  id: number;
}
const chartType = ref<ChartTypeMap[]>([
  {
    key: "Theme",
    name: "主题谱",
    id: 1,
  },
  {
    key: "Cooperate",
    name: "合作谱",
    id: 2,
  },
  {
    key: "Distribution",
    name: "分布谱",
    id: 3,
  },
  {
    key: "Time",
    name: "时间谱",
    id: 4,
  },
  {
    key: "Knowledge",
    name: "知识谱",
    id: 5,
  },
]);

const toggleChartType = (type: string) => {
  if (type === currentType.value) return;
  currentType.value = type;
  const clickindex = chartType.value.findIndex((item) => item.key === type);
  const reloadIndex = clickindex - 2;
  chartType.value = [
    ...chartType.value.splice(reloadIndex),
    ...chartType.value,
  ];
};
const componentMap = {
  Theme,
  Cooperate,
  Distribution,
  Time,
  Knowledge,
};
const myChart = ref<any>(null);
const chartInit = ref<any>(null);
// const initChart = (type: string) => {
//   echarts.registerMap('world', { geoJSON: worldMap });
//   if (chartInit.value) {
//     chartInit.value.clear();
//   } else {
//     chartInit.value = echarts.init(myChart.value);
//     chartInit.value.setOption(worldOption)
//   }
//   window.addEventListener("resize", () => {
//     chartInit.value.resize()
//   })
// }

onMounted(() => {
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
      <div class="chart-box flex-1" ref="myChart" id="chartMain">
        <Map v-if="currentType === 'Distribution'" />
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
          <div class="library-item flex flex-col" v-for="i in 6">
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

          <Theme :title="item.name" class="svg" v-if="item.key === 'Theme'" />
          <Cooperate
            :title="item.name"
            class="svg"
            v-if="item.key === 'Cooperate'"
          />
          <Distribution
            :title="item.name"
            class="svg"
            v-if="item.key === 'Distribution'"
          />
          <Time :title="item.name" class="svg" v-if="item.key === 'Time'" />
          <Knowledge
            :title="item.name"
            class="svg"
            v-if="item.key === 'Knowledge'"
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
  .chart-menu-bg {
    width: 100px;
    height: 90%;
    position: absolute;
    left: 2em;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("../../assets/image/banner.png");
    background-size: cover;
    background-position: center center;
    z-index: 99;
  }
  .chart-menu {
    position: absolute;
    left: 2em;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;

    z-index: 100;
    .chart-type-item {
      padding: 10px;
      cursor: pointer;
      transition: all 0.2s linear;
      // transform: translateY(10px);
      // animation: translate0 .5s linear;
      .title {
        display: none;
        transition: all 0.2s linear;
      }

      .svg {
        display: inherit;
        transition: all 0.2s linear;
      }
      // &:hover {
      //   transform: scale(1.4);
      // }
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

        &:hover {
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
@keyframes translate0 {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
