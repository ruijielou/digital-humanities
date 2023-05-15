<script setup lang="ts">
import { ref, reactive } from "vue";
import LogoText from "../../components/LogoText.vue";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { meta } from "@/api";
import { formatterFormInput, formatterFormData } from "@/utils/config";
import FormFiled from "@/components/FormFiled.vue";
import { useRouter, useRoute } from "vue-router";

const filedFromRef = ref<any>(null);

const search_condition_params = ref({});

const router = useRouter();

const getCaseData = async () => {
  let submitData: any = { ...search_condition_params.value };
  const queryString = new URLSearchParams(submitData).toString();
  router.push({ name: "SearchResult", query: { s: queryString } });
  // const { result } = await caseinfo.page(submitData);

  // result && (dataSource.value = [...result.records]);
  // pagination.total = result.total;
  // console.log("pagination : ", pagination);
};

const formFiled = reactive<any>({
  data: null,
  formModal: null,
});
const getInputMeta = async () => {
  const { result } = await meta.findSearchCondition();

  if (result) {
    let i;
    for (i in result) {
      result[i].isRequired = 2;
    }
    let localData = {}
    try {
      localData = localStorage.formstate && JSON.parse(localStorage.formstate);
      } catch (error) {
        console.log('localData json parse error', error)
      }
  
    
    const { formModal, dateInstant } = formatterFormInput({ result}, localData );

    formFiled.formModal = { ...formModal };
    formFiled.data = [...result];
    formFiled.dateInstant = {...dateInstant};
  }
};

const enterSearch = async (param: any) => {
  const formState: any = await filedFromRef.value?.formValidate();

  if (formState) {
    localStorage.formstate = JSON.stringify(formState.formFiledData);
    search_condition_params.value = {
      ...formatterFormData({ ...formState.formFiledData }),
      ...param,
    };
  } else {
    search_condition_params.value = {
      ...param,
    };
  }
  getCaseData();
};

getInputMeta();
</script>
<template>
  <keep-alive>
    <div class="h-screen overflow-auto advanced-search">
      <Header
        class="visualization-header"
        bg-name="visualization-bg"
        title="追踪研究线索"
      />
      <a-layout-content
        style="padding: 20px 0; margin: 0 auto; width: 80%"
        class="flex flex-col"
      >
        <div
          class="return-prev-page cursor-pointer"
          @click="$router.push({ name: 'home' })"
        >
          <arrow-left-outlined />
          <span class="p-l-2">首页</span>
        </div>
        <LogoText text="高级检索" />
        <div class="result-container p-t-5 p-l-25% p-r-25%">
          <FormFiled
            ref="filedFromRef"
            :form-modal="formFiled.formModal"
            :form-data="formFiled.data"
            :dateInstant="formFiled.dateInstant"
            :layout="{
              labelCol: { span: 5 },
              wrapperCol: { span: 19 },
            }"
          />
          <div class="text-center">
            <a-button @click="enterSearch({})" type="primary">搜索</a-button>
          </div>
        </div>
      </a-layout-content>
    </div>
  </keep-alive>
</template>
<style lang="less">
.advanced-search {
  position: relative;
  .advance-return {
    color: #666666;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 30px;
  }
}
.ant-dropdown-link {
  color: #222;
}
</style>
