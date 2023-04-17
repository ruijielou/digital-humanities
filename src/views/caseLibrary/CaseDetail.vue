<script setup lang="ts">
import { reactive, ref,shallowRef } from "vue";
import { Colors } from "../../utils/type";
import { BooleanStatus, LikeStatus } from "@/utils/type";
import CollectionModal from "@/components/CollectionGroup.vue";
import {
  ArrowLeftOutlined,
  HeartFilled,
  HeartOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { caseApi, comment, favorite, meta } from "@/api";
import { message } from "ant-design-vue";
import { useUserStore } from "@/store/user";
import StepTwo from "../contribute/StepTwo.vue";
import { imgBaseUrl } from "@/utils/config";
import { convert_case_data } from "@/utils/case_meta_util";
import Knowledge from "./Knowledge.vue";


type AnyObject<T = any> = {
  [key: string]: T | any;
};

const { userInfo, openLogin } = useUserStore();

const showDetailKey = ref<number[]>([0]);
const caseComment = ref<string>("");
const CollectionRef = ref<any>(null);
const isEdit = ref<boolean>(false);
const commentList = ref<any>([]);
const route = useRoute();
const router = useRouter();
const repositoryList = ref([]);
const stepTwoRef = ref<any>(null);
const stepTwoData = reactive<any>({
  data: null,
  formModal: null,
});
const formModel = reactive<any>({
  caseinfo: {},
  metaGroupList: [],
  labList: [],
  technologyList: [],
  assPorject: [],
});

const changeCurrentKey = (key: number) => {
  showDetailKey.value = showDetailKey.value.includes(key)
    ? showDetailKey.value.filter((item) => item != key)
    : [...showDetailKey.value, key];
};
const getDetail = async () => {
  const { id } = route.params;
  if (!id) return;
  const { result } = await caseApi.findViewDetail(id as string);
  if (!result) return;

  formModel.metaGroupList = result.metaGroupList
    ? [...result.metaGroupList]
    : [];
  formModel.labList = result.labList && [...result.labList];
  formModel.technologyList = result.technologyList
    ? [...result.technologyList]
    : [];
  formModel.relateList = result.relateList ? [...result.relateList] : [];
  formModel.caseinfo = result.caseinfo ? { ...result.caseinfo } : {};
  formModel.metaGroupList[0] && changeCurrentKey(formModel.metaGroupList[0].id);

  getFavoriteStatus();
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
    caseComment.value = "";
    getCommentList();
  }
};
const getCommentList = async () => {
  const { result } = await comment.page(route.params.id as string);
  if (result) {
    commentList.value = [...result.records];
  }
};

const getFavoriteStatus = async () => {
  const id = route.params.id;
  const { result } = await favorite.findFavoStatus(id as string);

  if (result) {
    formModel.caseinfo = { ...formModel.caseinfo, ...result };
  }
};
const getTwoFormInput = async () => {
  const idList: string = formModel.caseinfo.repositoryIds;
  if (!idList) return;
  const { result } = await meta.findFormListGroup(idList);
  const formResult = await caseApi.findDetail(route.params.id as string);
  if (result && formResult) {
    let case_data_info = { ...formResult.result };
    case_data_info = convert_case_data(case_data_info, result);
    stepTwoData.formModal = case_data_info;
    stepTwoData.data = [...result];

    repositoryList.value = formResult.result?.repositoryList;
  }
};

getCommentList();

const changeEdit = () => {
  isEdit.value = !isEdit.value;
  isEdit.value && getTwoFormInput();
};

const favorited = async (type: LikeStatus, value?: BooleanStatus) => {
  if (!route.params.id) return;
  const params = {
    type: type || LikeStatus.Like, //点赞2 收藏1
    contentId: route.params.id,
  };
  const isCancel = value == BooleanStatus.True;
  const res = isCancel
    ? await favorite.del(params)
    : await favorite.insert(params);
  if (res.success) {
    message.success(res.message);
    getFavoriteStatus();
  }
};

const formatterStepTwoData = (data: AnyObject) => {
  const newFormData: AnyObject = {};
  for (const key in data) {
    if (data[key] && data[key] != "") {
      if (data[key].constructor == Array) {
        newFormData[key] = data[key].map((item: any) => item + "").join(",");
      } else {
        newFormData[key] = data[key];
      }
    }
  }
  return { ...newFormData };
};

const publish_case = async (status: number) => {
  const formState: any = await stepTwoRef.value?.formValidate();

  const submitData = {
    ...formatterStepTwoData({ ...formState.caseData }),
    id: route.params?.id,
    status: status,
    repositoryIds: formModel.caseinfo.repositoryIds,
    authType: formModel.caseinfo.authType,
  };
  const response = await caseApi.add(submitData);
  isEdit.value = false;
  getDetail();
};
const starFavorited = (isFavorite: any) => {
  if (!userInfo.id) {
    openLogin();
    return;
  }
  isFavorite === BooleanStatus.False
    ? (CollectionRef.value.modalVisibility = true)
    : favorited(LikeStatus.Favorite, isFavorite);
};
const goBack = () => {
  if (router?.options.history.state.back) {
    router.back(); // 使用 $router.back() 方法返回上一层路由
  } else {
    router.push("/");
  }
};

</script>
<template>
  <div class="h-screen overflow-auto">
    <Header
      :title="
        $route.name === 'MyCaseDetail' ? '个人中心' : '打开数字人文万花筒'
      "
      :bg-name="$route.name === 'MyCaseDetail' ? 'about-bg' : 'caselibrary-bg'"
    />
    <a-layout-content
      style="padding: 20px 0; margin: 0 auto; width: 80%"
      class="flex flex-col"
    >
      <div class="return-prev-page cursor-pointer" @click="goBack">
        <arrow-left-outlined />
        <span class="p-l-2">返回</span>
      </div>
      <div class="p-t-5 lines-purple flex justify-between">
        <div>
          <h2>{{ formModel.caseinfo.name }}</h2>
          <p class="c-#999 text-3 m-t-2">
            发布人：{{ formModel.caseinfo.username }}
          </p>
        </div>
        <div class="tool-group" v-if="$route.name !== 'MyCaseDetail'">
          <a-button
            @click="favorited(LikeStatus.Like, formModel.caseinfo.isLike)"
          >
            <heart-outlined
              v-if="formModel.caseinfo.isLike == BooleanStatus.False"
            />
            <HeartFilled
              style="color: #f243d9"
              v-if="formModel.caseinfo.isLike == BooleanStatus.True"
            />
            喜欢
          </a-button>
          <a-button
            class="m-l-4"
            @click="starFavorited(formModel.caseinfo.isFavorite)"
          >
            <star-outlined
              v-if="formModel.caseinfo.isFavorite === BooleanStatus.False"
            />
            <star-filled
              style="color: #5b3df2"
              v-if="formModel.caseinfo.isFavorite === BooleanStatus.True"
            />
            收藏
          </a-button>
        </div>
        <div class="tool-group" v-else>
          <a-button v-if="isEdit" class="m-l-4" @click="publish_case(1)">
            暂存
          </a-button>
          <a-button
            class="m-l-2"
            type="primary"
            v-if="isEdit"
            @click="publish_case(2)"
          >
            发布
          </a-button>
          <a-button v-if="!isEdit" @click="changeEdit"> 修改 </a-button>
        </div>
      </div>
      <div v-if="isEdit">
        <StepTwo
          ref="stepTwoRef"
          :selected-tag="repositoryList"
          :form-modal="stepTwoData.formModal"
          :form-data="stepTwoData.data"
        />
      </div>
      <div v-else class="detail-content">
        <div class="m-t-5 h-500px chart-box">
          <!-- <img
            style="width: 100%; height: 350px; object-fit: cover"
            :src="imgBaseUrl + formModel.caseinfo.cover"
            alt=""
          /> -->
          <!-- <div class="w-100% h-100%" ref="myChart"></div> -->
          <Knowledge />
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
                  <template v-if="col.dataType != 12">
                    <div v-if="col.dataType === 9" class="flex">
                      <div
                        class="flex-1 m-r-2"
                        v-for="img in col.text.split(',')"
                      >
                        <a-image :width="200" :src="imgBaseUrl + img" />
                      </div>
                    </div>
                    <div v-else-if="col.dataType === 17">
                      <div class="m-r-2" v-for="file in col.text.split(',')">
                        <a
                          target="_blank"
                          rel="noopener"
                          class="ant-upload-list-item-name w-80% overflow-hidden"
                          :title="file"
                          :href="imgBaseUrl + file"
                          >{{ file }}</a
                        >
                      </div>
                    </div>
                    <span v-else>{{ col.text }}</span>
                  </template>
                  <a-button
                    style="padding: 0px"
                    type="link"
                    v-if="col.dataType == 12"
                    >{{ col.text }}</a-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div style="width: 360px" class="p-5 detail-right">
            <div class="labels-container m-b-10">
              <div>标签：</div>
              <div>
                <template v-for="(item, k) in formModel.labList">
                  <a-tag
                    :color="`#${item.extList[lab_i]}`"
                    v-for="(lab_item, lab_i) in item.textList"
                    >{{ lab_item }}</a-tag
                  >
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
              <div
                v-if="formModel.relateList && formModel.relateList.length > 0"
                class="p-4 bg-#f7f7f7"
              >
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
                      :src="imgBaseUrl + userInfo.avatar"
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
                    :src="item.userAvatar"
                  >
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </a-avatar>
                  <div class="comment-detail">
                    <div>{{ item.username }}</div>
                    <div>{{ item.remark }}</div>
                    <p class="c-#999">{{ item.createTime }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
    <Footer />
    <CollectionModal
      @reload="getDetail"
      v-if="userInfo?.id"
      :content-id="$route.params.id"
      ref="CollectionRef"
    />
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
.chart-box {
  background: linear-gradient(180deg, #1e1331 0%, #08122e 100%);
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
