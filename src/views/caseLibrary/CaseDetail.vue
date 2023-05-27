<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
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
} from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { caseApi, favorite, meta } from "@/api";
import { message } from "ant-design-vue";
import { useUserStore } from "@/store/user";
import StepTwo from "../contribute/StepTwo.vue";
import { formatterFormInput } from "../contribute/utils";
import { imgBaseUrl, formatterFormData, format_file_url } from "@/utils/config";
// import { convert_case_data } from "@/utils/case_meta_util";
import Knowledge from "./Knowledge.vue";
import CaseComment from "./CaseComment.vue";

const { userInfo, openLogin } = useUserStore();

const showDetailKey = ref<number[]>([0]);
const loading = ref<boolean>(false);

const CollectionRef = ref<any>(null);
const isEdit = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const repositoryList = ref([]);
const stepTwoRef = ref<any>(null);
const stepTwoData = reactive<any>({
  data: null,
  formModal: null,
  dateInstant: {},
});
const formModel = reactive<any>({
  caseinfo: {},
  metaGroupList: [],
  labList: [],
  technologyList: [],
  assPorject: [],
  relateList: [],
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
  showDetailKey.value = [0];
  formModel.metaGroupList = result.metaGroupList
    ? [...result.metaGroupList.filter((a) => a.title !== "封面")]
    : [];
  formModel.labList = result.labList && [...result.labList];
  formModel.technologyList = result.technologyList
    ? [...result.technologyList]
    : [];
  formModel.relateList = result.relateList ? [...result.relateList] : [];
  formModel.caseinfo = result.caseinfo ? { ...result.caseinfo } : {};
  if (formModel.metaGroupList && formModel.metaGroupList.length) {
    formModel.metaGroupList.forEach((item: any) => {
      changeCurrentKey(item.id);
    });
  }
  getFavoriteStatus();
};
getDetail();

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
  loading.value = true;
  const { result } = await meta.findFormListGroup(idList);
  const formResult = await caseApi.findDetail(route.params.id as string);
  if (result && formResult) {
    let case_data_info = { ...formResult.result };
    //方法未对表单的值进行全部初始化，暂时不用
    // case_data_info = convert_case_data(case_data_info, result);

    const { formModal, dateInstant } = formatterFormInput(
      { result },
      case_data_info
    );
    stepTwoData.formModal = { ...formModal };
    stepTwoData.data = [...result];
    stepTwoData.dateInstant = { ...dateInstant };
    loading.value = false;
    repositoryList.value = formResult.result?.repositoryList;
  }
};

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

const publish_case = async (status: number) => {
  const formState: any = await stepTwoRef.value?.formValidate();
  const submitData = {
    ...formatterFormData({ ...formState.caseData }),
    id: route.params?.id,
    status: status,
    repositoryIds: formModel.caseinfo.repositoryIds,
    // authType: formModel.caseinfo.authType,
  };
  const response = await caseApi.add(submitData);
  if (response.success) {
    message.success(response.message);
    isEdit.value = false;
    getDetail();
  }
};
const starFavorited = (isFavorite: any) => {
  if (!userInfo.id) {
    nextTick(() => {
      openLogin();
    });
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
const to_new_page = (url: string) => {
  console.log("url:", url);
  if (!url.startsWith("http")) {
    url = "http://" + url;
  }
  window.open(url);
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
      style="padding: 20px 120px;"
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
            <HeartFilled
              style="color: #f243d9"
              v-if="formModel.caseinfo.isLike == BooleanStatus.True"
            />
            <heart-outlined v-else />
            喜欢
          </a-button>
          <a-button
            class="m-l-4"
            @click="starFavorited(formModel.caseinfo.isFavorite)"
          >
            <star-filled
              style="color: #5b3df2"
              v-if="formModel.caseinfo.isFavorite === BooleanStatus.True"
            />
            <star-outlined v-else />
            收藏
          </a-button>
        </div>
        <div class="tool-group" v-else>
          <a-button
            v-if="isEdit"
            class="m-l-4"
            v-show="formModel.caseinfo.status != 2"
            @click="publish_case(1)"
          >
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
      <div v-if="isEdit" style="min-height: 400px">
        <a-spin
          v-if="loading"
          :spinning="loading"
          class="position-center h-100%"
        ></a-spin>
        <StepTwo
          ref="stepTwoRef"
          style="padding: 20px 0"
          :selected-tag="repositoryList"
          :form-modal="stepTwoData.formModal"
          :form-data="stepTwoData.data"
          :dateInstant="stepTwoData.dateInstant"
        />
      </div>
      <div v-else class="detail-content">
        <div class="m-t-5 h-500px chart-box">
          <Knowledge :recored-id="$route.params.id" />
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
                        style="height: 100px"
                        v-for="img in col.text.split(',')"
                      >
                        <a-image :height="100" :src="imgBaseUrl + img" />
                      </div>
                    </div>
                    <div v-else-if="col.dataType === 17">
                      <div class="m-r-2" v-for="file in col.text.split(',')">
                        <a
                          target="_blank"
                          rel="noopener"
                          class="ant-upload-list-item-name w-80% overflow-hidden"
                          :title="file"
                          :href="format_file_url(file)"
                          >{{ file }}</a
                        >
                      </div>
                    </div>
                    <span v-else><div v-html="col.text"></div></span>
                  </template>
                  <a-button
                    style="padding: 0px"
                    type="link"
                    target="_blank"
                    @click="to_new_page(col.text)"
                    v-if="col.dataType == 12"
                    >{{ col.text }}</a-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div style="width: 360px" class="p-5 detail-right">
            <div
              class="labels-container m-b-10"
              v-if="formModel.labList && formModel.labList.length > 0"
            >
              <div>标签：</div>
              <div>
                <template v-for="(item, k) in formModel.labList">
                  <a-tooltip
                    v-for="(lab_item, lab_i) in item.textList"
                    :title="lab_item"
                  >
                    <a-tag class="max-w-100px truncate" :color="`#${item.extList[lab_i]}`">{{
                      lab_item
                    }}</a-tag>
                  </a-tooltip>
                </template>
              </div>
            </div>
            <div
              class="m-b-10"
              v-if="
                formModel.technologyList && formModel.technologyList.length > 0
              "
            >
              <div>应用技术：</div>
              <div v-if="formModel.technologyList">
                <template v-for="(item, k) in formModel.technologyList">
                  <a-tag :color="k > 10 ? Colors[11] : Colors[10]">{{
                    item.text
                  }}</a-tag>
                </template>
              </div>
            </div>
            <div
              class="m-b-10"
              v-if="formModel.relateList && formModel.relateList.length > 0"
            >
              <div>关联项目：</div>
              <div
                v-if="formModel.relateList && formModel.relateList.length > 0"
                class="p-4 bg-#f7f7f7"
              >
                <template v-for="(item, k) in formModel.relateList">
                  <p v-for="(text, index) in item.textList">
                    <a
                      target="_blank"
                      :href="`/#/casedetail/${item.extList[index]}`"
                    >
                      {{ index + 1 }}. {{ text }}
                    </a>
                  </p>
                </template>
              </div>
            </div>
            <CaseComment />
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
  .ant-image-img {
    max-height: 100%;
  }
}
.detail-right {
  .ant-tag {
    margin: 5px;
  }
}
</style>
