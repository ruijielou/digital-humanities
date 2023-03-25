<script setup lang="ts">
import {
  ArrowLeftOutlined,
  HeartOutlined,
  StarOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons-vue";
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
          <div class="group-item flex-1">
            <div class="group-item-title flex justify-between">
              <span class="line-title"><span>项目简介</span></span>
              <minus-square-outlined />
            </div>
            <div class="p-b-2 detail-item">
              <span>项目名称：</span>
              <span>欧洲时光机 （Time Machine</span>
            </div>
            <div class="p-b-2 detail-item">
              <span>网站链接：</span>
              <span>https://www.timemach</span>
            </div>
            <div class="p-b-2 detail-item">
              <span>主题：</span>
              <span>迄今为止意义最深远、规模最宏大的一个使用</span>
            </div>
            <div class="p-b-2 detail-item">
              <span>启动时间：</span>
              <span>2019年</span>
            </div>
            <div class="p-b-2 detail-item">
              <span>所属国别：</span>
              <span>欧盟</span>
            </div>
            <div class="p-b-2 detail-item">
              <span>项目摘要：</span>
              <span
                >迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019
                年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的
                600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。</span
              >
            </div>
            <div class="p-b-2 detail-item">
              <span>项目摘要：</span>
              <span
                >迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019
                年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的
                600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。</span
              >
            </div>
            <div class="p-b-2 detail-item">
              <span>项目摘要：</span>
              <span
                >迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019
                年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的
                600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。</span
              >
            </div>
            <div class="p-b-2 detail-item">
              <span>项目摘要：</span>
              <span
                >迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019
                年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的
                600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。</span
              >
            </div>
            <div class="p-b-2 detail-item">
              <span>项目摘要：</span>
              <span
                >迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019
                年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的
                600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。</span
              >
            </div>
          </div>
          <div style="width: 250px">sdfsdfs</div>
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
</style>
