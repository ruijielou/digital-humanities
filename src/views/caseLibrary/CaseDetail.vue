<script setup lang="ts">
import { ref, reactive } from "vue";
import { Colors } from "../../utils/type";
import {
  ArrowLeftOutlined,
  HeartOutlined,
  StarOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { caseApi, repositorygroup, comment, favorite } from "@/api";
import { Modal } from "ant-design-vue";
import { useUserStore } from "@/store/user";

const { userInfo } = useUserStore();

const showDetailKey = ref<number[]>([0]);
const caseComment = ref<string>("");
const commentList = ref<any>([]);
const route = useRoute();
const formModel = reactive<any>({
  data: {},
  projectDetialData: {},
  tags: [],
  technology: [],
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
// const projectDetialData =
const changeCurrentKey = (key: number) => {
  showDetailKey.value = showDetailKey.value.includes(key)
    ? showDetailKey.value.filter((item) => item != key)
    : [...showDetailKey.value, key];
};
const getDetail = async () => {
  const { id } = route.params;
  if (!id) return;
  const { result } = await caseApi.findDetail(id as string);

  formModel.projectDetialData = { ...result };
  if (result) {
    await getFormMeta(result.repositoryIds);
  }
};
const getFormMeta = async (ids: string) => {
  if (!ids) return;
  const { result } = await repositorygroup.findAllFormInput(ids);

  const filedIdList = [
    ...result
      .find((item) => item.name === "标签")
      ?.metaList.map((a) => a.filed),
  ];
  const technologyList = [
    ...result.find((item) => item.name === "技术").metaList.map((a) => a.filed),
  ];
  const assPorject = [
    ...result
      .find((item) => item.name === "关联项目")
      ?.metaList.map((a) => a.filed),
  ];
  formModel.tags = [...filedIdList];
  formModel.technology = [...technologyList];
  formModel.assPorject = [...assPorject];

  formModel.data = [
    ...result.filter(
      (item) =>
        item.name !== "标签" && item.name !== "技术" && item.name !== "关联项目"
    ),
  ];
  changeCurrentKey(result[0].groupId);
};

getDetail();

const publishComment = async () => {
  if (!caseComment.value) {
    Modal.error({
      title: () => "提示",
      content: () => "评论内容不能为空",
    });
    return;
  }
  const params = {
    contentId: route.params.id,
    remark: caseComment.value,
  };
  const res = await comment.insert(params);
  if (res.success) {
    Modal.success({
      title: () => "提示",
      content: () => "评论成功",
    });
    getCommentList();
  }
};
const getCommentList = async () => {
  const { result } = await comment.myPage();
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
    Modal.success({
      title: () => "提示",
      content: () => res.message,
    });
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
          <h2>{{ formModel.projectDetialData.name }}</h2>
          <p class="c-#999 text-3 m-t-2">
            发布人：{{ formModel.projectDetialData.username }}
          </p>
        </div>
        <div class="tool-group">
          <a-button @click="favorited(1)"><heart-outlined />喜欢</a-button>
          <a-button class="m-l-4"><star-outlined />收藏</a-button>
        </div>
      </div>
      <div class="detail-content">
        <div class="m-t-8">
          <img style="width: 100%" src="../../assets/image/detail.png" alt="" />
        </div>
        <div class="flex">
          <div class="flex flex-col flex-1 m-r-18">
            <div class="group-item" v-for="item in formModel.data">
              <div class="group-item-title flex justify-between">
                <span class="line-title"
                  ><span>{{ item.name }}</span></span
                >
                <span class="lines"></span>
                <span
                  class="cursor-pointer m-l-2"
                  @click="changeCurrentKey(item.groupId)"
                >
                  <minus-square-outlined
                    v-if="showDetailKey.includes(item.groupId)"
                  />
                  <plus-square-outlined v-else />
                </span>
              </div>
              <div
                class="detail-list transition-all"
                v-show="showDetailKey.includes(item.groupId)"
              >
                <div
                  class="p-b-2 detail-item"
                  v-for="(col, colkey) in item.metaList"
                >
                  <span> {{ col.name }} </span>
                  <span>{{ formModel.projectDetialData[col.filed] }}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 360px" class="p-5 detail-right">
            <div class="labels-container m-b-10">
              <div>标签：</div>
              <div>
                <template v-for="(item, k) in formModel.tags">
                  <a-tag
                    v-if="formModel.projectDetialData[item]"
                    :color="Colors[k % 10]"
                    >{{ formModel.projectDetialData[item] }}</a-tag
                  >
                </template>
              </div>
            </div>
            <div class="m-b-10">
              <div>应用技术：</div>
              <div v-if="formModel.technology">
                <template v-for="(item, k) in formModel.technology">
                  <a-tag
                    v-if="formModel.projectDetialData[item]"
                    :color="k > 10 ? Colors[11] : Colors[10]"
                    >{{ formModel.projectDetialData[item] }}</a-tag
                  >
                </template>
              </div>
            </div>
            <div class="m-b-10">
              <div>关联项目：</div>
              <div v-if="formModel.assPorject" class="p-4 bg-#f7f7f7">
                <template v-for="(item, k) in formModel.assPorject">
                  <p>
                    {{ k + 1 }}. {{ formModel.projectDetialData[item] || "空" }}
                  </p>
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
    <!-- <a-modal
      v-model:visible="caseMoveModal"
      class="border-bottom-search"
      @ok="handleOk"
    >
      <template #title>
        <div class="text-center">迁移</div>
      </template>
      <a-input>
        <template #suffix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-checkbox-group v-model:value="checkedMoves">
        <div class="p-3">
          <a-checkbox value="数字学术平台案例库">数字学术平台案例库</a-checkbox>
        </div>
        <div class="p-3">
          <a-checkbox value="数字计划案例库">数字计划案例库</a-checkbox>
        </div>
        <div class="p-3">
          <a-checkbox value="数字人文工具案例库">数字人文工具案例库</a-checkbox>
        </div>
        <div class="p-3">
          <a-checkbox value="联盟、企业案例库">联盟、企业案例库</a-checkbox>
        </div>
      </a-checkbox-group>
      <div class="p-3 flex items-center">
        <a-radio v-model:checked="openCaseClasstify"></a-radio>
        <a-select class="flex-1" v-model:value="caseClasstify">
          <a-select-option :value="0">分类1</a-select-option>
          <a-select-option :value="1">分类2</a-select-option>
          <a-select-option :value="2">分类3</a-select-option>
          <a-select-option :value="3">分类4</a-select-option>
        </a-select>
      </div>
      <div class="p-3 p-l-9 flex items-center">
        <a-input
          class="flex-1 m-r-3"
          v-model="caseName"
          placeholder="案例库名称"
        ></a-input>
        <a-switch v-model:checked="openCaseName" />
      </div>
      <template #footer>
        <div class="text-center">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >创建</a-button
          >
        </div>
      </template>
    </a-modal> -->
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
