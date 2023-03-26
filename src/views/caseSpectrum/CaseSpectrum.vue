<script setup lang="ts">
import { ref } from "vue";
import { ReloadOutlined } from "@ant-design/icons-vue";
import { Colors } from "../../utils/type";
const checkedList = ref<number[]>([]);
</script>
<template>
  <div class="h-screen overflow-auto casespectrum-container">
    <Header
      class="case-spectrum-header"
      bg-name="casespectrum-bg"
      title="案例谱"
    />
    <a-layout-content
      class="flex"
    >
      <div class="w-360px bg-#f7f7f7 p-t-10 p-b-10">
        <div class="labels-container m-b-10 p-l-20">
          <!-- <div>标签：</div> -->
          <div class="flex justify-between p-r-4">
            <span class="line-title text-4.5 truncate">
              <span>标签：</span>
            </span>
            <reload-outlined />
          </div>
          <div class="p-t-3">
            <a-checkbox-group v-model:value="checkedList">
              <a-tag
                class="m-r-2 m-t-2"
                v-for="k in 20"
                :color="Colors[k % 10]"
              >
                <a-checkbox class="c-#fff" :value="k"> 标签{{ k }}</a-checkbox>
              </a-tag>
            </a-checkbox-group>
          </div>
        </div>
      </div>
      <div class="flex-1 p-r-20 p-l-10">
        <div class="letters lines-purple">
          <span v-for="i in 26" class="transition-all">
            {{ String.fromCharCode(64 + i) }}
          </span>
        </div>
        <div class="spectrum-list p-t-5">
          <div class="spectrun-items">
            德国图书馆、档案馆和博物馆门户（BAMP）
          </div>
          <div class="spectrun-items">
            德意志数字图书馆（DDB）
          </div>
          <div class="spectrun-items purple">
            丹麦文化搜索
          </div>
        </div>
      </div>
    </a-layout-content>
    <Footer />
  </div>
</template>
<style lang="less">
.casespectrum-container {
  .ant-checkbox {
    .ant-checkbox-inner {
      background-color: transparent;
    }
    &:hover .ant-checkbox-inner,
    &.ant-checkbox-checked .ant-checkbox-inner {
      border-color: #fff !important;
    }
  }
  .letters {
    span {
      display: inline-block;
      height: 40px;
      width: 40px;
      margin: 10px;
      text-align: center;
      line-height: 40px;
      font-size: 30px;
      font-weight: bold;
      cursor: pointer;
      color: #222;
      &:hover {
        background: #f243d9;
        color: #fff;
      }
    }
  }
  .spectrun-items {
    position: relative;
    padding-left: 1em;
    padding: 15px;
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #F5A95D;
    }
    &.purple {
      &::before {
        background-color: #C987FA;
      }
    }
  }
}
</style>
