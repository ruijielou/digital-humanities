<script setup lang="ts">
import { ref } from "vue";
import { Colors } from "../../utils/type";
import { StepTwoForm } from "../contribute/type";
import {
  ArrowLeftOutlined,
  HeartOutlined,
  StarOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
const showDetailKey = ref<string[]>(["introduction"]);
const comment = ref<string>('');

const projectDetialData = {
  introduction: {
    key: "项目简介",
    projetcName: "欧洲时光机 （Time Machine",
    link: "https://www.timemach",
    themes: "迄今为止意义最深远、规模最宏大的一个使用",
    startTime: "2019年",
    country: "欧盟",
    summary:
      "迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019 年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的 600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。",
    dataset:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset1:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset2:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset3:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset4:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset5:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset6:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset7:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
  },
  organization: {
    key: "项目机构",
    projetcName: "欧洲时光机 （Time Machine",
    link: "https://www.timemach",
    themes: "迄今为止意义最深远、规模最宏大的一个使用",
    startTime: "2019年",
    country: "欧盟",
    summary:
      "迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019 年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的 600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。",
    dataset:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset1:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset2:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset3:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset4:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset5:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset6:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
    dataset7:
      "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
  },
};
const changeCurrentKey = (key: string) => {
  showDetailKey.value = showDetailKey.value.includes(key)
    ? showDetailKey.value.filter((item) => item != key)
    : [...showDetailKey.value, key];
};
</script>
<template>
  <div class="h-screen overflow-auto">
    <Header title="打开数字人文万花筒" bg-name="caselibrary-bg" />
    <a-layout-content
      style="padding: 20px 0; margin: 0 auto; width: 80%"
      class="flex flex-col"
    >
      <div class="return-prev-page cursor-pointer" @click="$router.go(-1)">
        <arrow-left-outlined />
        <span class="p-l-2">高级检索</span>
      </div>
      <div class="p-t-5 lines-purple flex justify-between">
        <div>
          <h2>欧洲时光机</h2>
          <p class="c-#999 text-3 m-t-2">发布人：</p>
        </div>
        <div class="tool-group">
          <a-button><heart-outlined />喜欢</a-button>
          <a-button class="m-l-4"><star-outlined />收藏</a-button>
        </div>
      </div>
      <div class="detail-content">
        <div class="m-t-8">
          <img style="width: 100%" src="../../assets/image/detail.png" alt="" />
        </div>
        <div class="flex">
          <div class="flex flex-col flex-1 m-r-18">
            <div class="group-item" v-for="(item, key) in projectDetialData">
              <div class="group-item-title flex justify-between">
                <span class="line-title"
                  ><span>{{ item.key }}</span></span
                >
                <span class="cursor-pointer" @click="changeCurrentKey(key)">
                  <minus-square-outlined v-if="showDetailKey.includes(key)" />
                  <plus-square-outlined v-else />
                </span>
              </div>
              <div
                class="detail-list transition-all"
                v-show="showDetailKey.includes(key)"
              >
                <div class="p-b-2 detail-item" v-for="(col, colkey) in item">
                  <span>{{
                    StepTwoForm[key].formCols.find((a) => a.key == colkey)
                      ?.name || colkey
                  }}</span>
                  <span>{{ col }}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 360px" class="p-5 detail-right">
            <div class="labels-container m-b-10">
              <div>标签：</div>
              <div>
                <a-tag v-for="k in 20" :color="Colors[k % 10]">{{
                  Colors[k % 10]
                }}</a-tag>
              </div>
            </div>
            <div class="m-b-10">
              <div>应用技术：</div>
              <div>
                <a-tag
                  v-for="k in 20"
                  :color="k > 10 ? Colors[11] : Colors[10]"
                  >{{ k > 10 ? `应用技术${k}` : `自定义标签${k}` }}</a-tag
                >
              </div>
            </div>
            <div class="m-b-10">
              <div>关联项目：</div>
              <div class="p-4 bg-#f7f7f7">
                <p v-for="i in 10">{{ i }}. 阿姆斯特丹时光机</p>
              </div>
            </div>
            <div class="m-b-10">
              <div>评论：</div>
              <div class="p-4 comment-list">
                <div class="comment-input flex">
                  <a-avatar
                    shape="circle"
                    :size="24"
                    class="m-r-2"
                    title="person"
                  >
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </a-avatar>
                  <a-textarea v-model:value="comment" placeholder="Basic usage" :rows="4" />
  
                </div>
                <div class="flex p-t-5">
                    <a-avatar
                    shape="circle"
                    :size="24"
                    class="m-r-2"
                    title="person"
                  >
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </a-avatar>
                  <div class="comment-detail">
                    <div>名称</div>
                    <div>评论的内容</div>
                    <p class="c-#999">2022-12-24 12:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
    <Footer />
  </div>
</template>
<style lang="less">
.return-prev-page {
  color: #666666;
  position: relative;
  z-index: 2;
  left: 0;
  top: 10px;
}
.detail-item {
  line-height: 24px;
  color: #666;
  display: flex;
  & > span:nth-child(1) {
    width: 120px;
  }
  & > span:nth-child(2) {
    flex: 1;
  }
}
.detail-right {
  .ant-tag {
    margin: 5px;
  }
}
</style>
