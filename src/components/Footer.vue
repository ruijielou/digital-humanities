<script lang="ts" setup>
import { categoryList } from "../utils/type";
import { SearchOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { ref } from "vue";

const searchFields = ref<string>("");

const router = useRouter();
const do_search = () => {
  let keywords = searchFields.value;
  if (keywords) {
    router.push({ name: "SearchResult", query: { keywords: keywords } });
  } else {
    message.warning("请输入关键字");
  }
};
</script>
<template>
  <div class="footer">
    <div class="flex">
      <div class="flex-1 text-center">
        <img @click="$router.push({ path: '/' })" width="90" src="../assets/image/logo-white.png" alt="" />
        <p class="text-4 c-white p-t-10">数字人文多媒体案例资源库</p>
      </div>
      <div class="flex-1 flex flex-col p-b-10">
        <div
          class="cursor-pointer flex-1"
          v-for="item in categoryList"
          :key="item.name"
          @click="$router.push({ name: item.name })"
        >
          <span class="m-l-2 c-white">
            {{ item.label }}
          </span>
        </div>
      </div>
      <div class="flex-2 footer-search p-t-20">
        <a-input v-model:value="searchFields">
          <template #suffix>
            <SearchOutlined @click="do_search()" />
          </template>
        </a-input>
      </div>
    </div>
<!--    <div class="copyright text-center c-white text-2">Copyright © 2019-2013 | 北京立鹏文采科技有限公司 | <a style="color: white" href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备19054905号</a></div>-->
    <div class="copyright text-center c-white text-2">Copyright © 2023</div>
  </div>
</template>
<style lang="less">
.footer {
  width: 100%;
  height: 292px;
  background: #5b3df2;
  padding: 0 10%;
  padding-top: 4em;
  .footer-search .ant-input-affix-wrapper,
  .footer-search .ant-input {
    background-color: transparent;
    color: #fff;
  }
  .footer-search .ant-input-affix-wrapper {
    border-left: none;
    border-top: none;
    border-right: none;
  }
}
</style>