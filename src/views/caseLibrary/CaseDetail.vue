<script setup lang="ts">
import { ref, reactive } from "vue";
import { Colors } from "../../utils/type";
import CollectionModal from "@/components/CollectionGroup.vue";
import {
  ArrowLeftOutlined,
  HeartOutlined,
  StarOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { caseApi, comment, favorite } from "@/api";
import { message } from "ant-design-vue";
import { useUserStore } from "@/store/user";

const { userInfo } = useUserStore();

const showDetailKey = ref<number[]>([0]);
const caseComment = ref<string>("");
const CollectionRef = ref<any>(null);
const commentList = ref<any>([]);
const route = useRoute();
const formModel = reactive<any>({
  data: {},
  metaGroupList: [],
  labList: [],
  technologyList: [],
  assPorject: [],
});

//   introduction: {
//     key: "项目简介",
//     projetcName: "欧洲时光机 （Time Machine",
//     link: "https://www.timemach",
//     themes: "迄今为止意义最深远、规模最宏大的一个使用",
//     startTime: "2019年",
//     country: "欧盟",
//     summary:
//       "迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019 年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的 600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。",
//     dataset:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset1:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset2:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset3:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset4:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset5:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset6:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset7:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//   },
//   organization: {
//     key: "项目机构",
//     projetcName: "欧洲时光机 （Time Machine",
//     link: "https://www.timemach",
//     themes: "迄今为止意义最深远、规模最宏大的一个使用",
//     startTime: "2019年",
//     country: "欧盟",
//     summary:
//       "迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019 年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的 600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。",
//     dataset:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset1:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset2:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset3:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset4:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset5:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset6:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset7:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//   },
//   personnel: {
//     key: "项目人员",
//     projetcName: "欧洲时光机 （Time Machine",
//     link: "https://www.timemach",
//     themes: "迄今为止意义最深远、规模最宏大的一个使用",
//     startTime: "2019年",
//     country: "欧盟",
//     summary:
//       "迄今为止意义最深远、规模最宏大的欧洲时光机项目源于威尼斯时光机项目，2019 年,欧盟委员会选择“欧洲时光机”项目作为未来十年战略性大规模研究计划的六项提案之一。时光机项目已汇集了来自多个国家与地区的 600多家机构,其中包括欧洲顶级学术研究机构、美术馆、图书馆、档案馆、博物馆,以及文化领域领先的大型企业、中小企业、机构团体和有影响力的民间社会组织。项目拥有历史大数据资源基本架构、本地时光机架构。取得专题数据库、3D/4D历史城市重建、历史细节可视化、通用型数字平台与工具等成果的项目。",
//     dataset:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset1:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset2:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset3:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset4:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset5:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset6:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//     dataset7:
//       "Alle Limburgers 家谱数据库 \n ALTES KÖLN 家谱与居民数据库 \n 莱比锡历史家族数据库\n罗马历史地图数据库\n巴黎地理历史资料库\n意大利建筑图纸数据库\n荷兰南部方言语料库",
//   },
// };
// const metaGroupList =
const changeCurrentKey = (key: number) => {
  showDetailKey.value = showDetailKey.value.includes(key)
    ? showDetailKey.value.filter((item) => item != key)
    : [...showDetailKey.value, key];
};
const getDetail = async () => {
  const { id } = route.params;
  if (!id) return;
  const caseInfo = await caseApi.findDetail(id as string);
  if (caseInfo && caseInfo.result) {
    formModel.data = { ...caseInfo.result };
  }

  const { result } = await caseApi.findViewDetail(id as string);
  if (!result) return;
  
  formModel.metaGroupList = result.metaGroupList && [...result.metaGroupList];
  formModel.labList = result.labList && [...result.labList];
  formModel.technologyList = result.technologyList && [...result.technologyList];
  formModel.relateList = result.relateList && [...result.relateList];
  changeCurrentKey(formModel.metaGroupList[0].id);
};

getDetail();

const publishComment = async () => {
  if (!caseComment.value) {
    message.error("评论内容不能为空");
    return;
  }
  const params = {
    contentId: route.params.id,
    remark: caseComment.value,
  };
  const res = await comment.insert(params);
  if (res.success) {
    message.success("评论成功");
    getCommentList();
  }
};
const getCommentList = async () => {
  const { result } = await comment.page(route.params.id as string);
  if (result) {
    commentList.value = [...result.records];
  }
};

getCommentList();

const favorited = async (type: number) => {
  if (!route.params.id) return;
  const params = {
    type: type || 2,
    contentId: route.params.id,
  };
  const res = await favorite.insert(params);
  if (res.success) {
    message.success(res.message);
  }
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
        <span class="p-l-2">返回</span>
      </div>
      <div class="p-t-5 lines-purple flex justify-between">
        <div>
          <h2>{{ formModel.data.name }}</h2>
          <p class="c-#999 text-3 m-t-2">
            发布人：{{ formModel.data.username }}
          </p>
        </div>
        <div class="tool-group">
          <a-button @click="favorited(1)"><heart-outlined />喜欢</a-button>
          <a-button class="m-l-4" @click="CollectionRef.modalVisibility = true"
            ><star-outlined />收藏</a-button
          >
        </div>
      </div>
      <div class="detail-content">
        <div class="m-t-8">
          <img style="width: 100%" src="../../assets/image/detail.png" alt="" />
        </div>
        <div class="flex">
          <div class="flex flex-col flex-1 m-r-18">
            <div class="group-item" v-for="item in formModel.metaGroupList">
              <div class="group-item-title flex justify-between">
                <span class="line-title"
                  ><span>{{ item.title }}</span></span
                >
                <span class="lines"></span>
                <span
                  class="cursor-pointer m-l-2"
                  @click="changeCurrentKey(item.id)"
                >
                  <minus-square-outlined
                    v-if="showDetailKey.includes(item.id)"
                  />
                  <plus-square-outlined v-else />
                </span>
              </div>
              <div
                class="detail-list transition-all"
                v-show="showDetailKey.includes(item.id)"
              >
                <div
                  class="p-b-2 detail-item"
                  v-for="(col, colkey) in item.metaList"
                >
                  <span> {{ col.title }}: </span>
                  <span>{{ col.text }}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 360px" class="p-5 detail-right">
            <div class="labels-container m-b-10">
              <div>标签：</div>
              <div>
                <template v-for="(item, k) in formModel.labList">
                  <a-tag :color="`#${item.ext}`">{{ item.text }}</a-tag>
                </template>
              </div>
            </div>
            <div class="m-b-10">
              <div>应用技术：</div>
              <div v-if="formModel.technologyList">
                <template v-for="(item, k) in formModel.technologyList">
                  <a-tag :color="k > 10 ? Colors[11] : Colors[10]">{{
                    item.text
                  }}</a-tag>
                </template>
              </div>
            </div>
            <div class="m-b-10">
              <div>关联项目：</div>
              <div v-if="formModel.relateList" class="p-4 bg-#f7f7f7">
                <template v-for="(item, k) in formModel.relateList">
                  <p>{{ k + 1 }}. {{ item.text }}</p>
                </template>
              </div>
            </div>
            <div class="m-b-10">
              <div>评论：</div>
              <div class="p-4 comment-list">
                <div>
                  <div class="comment-input flex">
                    <a-avatar
                      shape="circle"
                      :size="24"
                      class="m-r-2 w-24px"
                      title="person"
                      v-if="userInfo.avatar"
                      :src="userInfo.avatar"
                    >
                    </a-avatar>
                    <a-avatar
                      shape="circle"
                      :size="24"
                      class="m-r-2 w-24px"
                      title="person"
                      v-else
                    >
                      <template #icon>
                        <UserOutlined />
                      </template>
                    </a-avatar>
                    <a-textarea
                      class="flex-1"
                      v-model:value="caseComment"
                      placeholder="请输入"
                      :rows="4"
                    />
                  </div>
                  <div class="text-right p-t-2">
                    <a-button size="small" type="info" @click="publishComment"
                      >发布</a-button
                    >
                  </div>
                </div>
                <div class="flex" v-for="item in commentList">
                  <a-avatar
                    shape="circle"
                    :size="24"
                    class="m-r-2"
                    title="person"
                    :src="item.avatar"
                  >
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </a-avatar>
                  <div class="comment-detail">
                    <div>{{ item.username }}</div>
                    <div>{{ item.remark }}</div>
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
    <CollectionModal @reload="getDetail" :content-id="$route.params.id" ref="CollectionRef" />
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
