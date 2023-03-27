<script setup lang="ts">
import { ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import Distribution from "../../components/icons/Distribution.vue";
import Theme from "../../components/icons/Theme.vue";
import Knowledge from "../../components/icons/Knowledge.vue";
import Time from "../../components/icons/Time.vue";
import Cooperate from "../../components/icons/Cooperate.vue";

const currentType = ref<string>("");
const chartType = ref<{ key: string; name: string }[]>([
  {
    key: "Theme",
    name: "主题谱",
  },
  {
    key: "Cooperate",
    name: "合作谱",
  },
  {
    key: "Distribution",
    name: "分布谱",
  },
  {
    key: "Time",
    name: "时间谱",
  },
  {
    key: "Knowledge",
    name: "知识谱",
  },
]);
const componentMap = {
  Theme,
  Cooperate,
  Distribution,
  Time,
  Knowledge,
};
</script>
<template>
  <div class="h-screen overflow-auto">
    <Header
      class="visualization-header"
      bg-name="visualization-bg"
      title="对人文学科重绘廓型"
    />
    <a-layout-content class="visualization-content flex">
      <div class="chart-box flex-1">ssss</div>
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
          :class="{ active: currentType === item.key }"
          :key="item.key"
          v-for="item in chartType"
        >
          <span class="title">{{ item.name }}</span>

          <Theme class="svg" v-if="item.key === 'Theme'" />
          <Cooperate class="svg" v-if="item.key === 'Cooperate'" />
          <Distribution class="svg" v-if="item.key === 'Distribution'" />
          <Time class="svg" v-if="item.key === 'Time'" />
          <Knowledge class="svg" v-if="item.key === 'Knowledge'" />
        </div>
      </div>
    </a-layout-content>
  </div>
</template>
<style lang="less">
.visualization-content {
  height: calc(100% - 20vh);
  position: relative;
  .chart-menu {
    position: absolute;
    left: 2em;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    .chart-type-item {
      padding: 10px;
      cursor: pointer;
      .title {
        display: none;
        transition: all 0.2s linear;
      }
      .svg {
        display: inherit;
        transition: all 0.2s linear;
      }
      &.active,
      &:hover {
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
      margin-left: 20px;
    }
    & > div:nth-of-type(2),
    & > div:nth-last-of-type(2) {
      margin-left: 10px;
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
</style>
