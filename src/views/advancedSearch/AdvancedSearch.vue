<script setup lang="ts">
import { ref, computed, reactive, UnwrapRef } from "vue";
import LogoText from "../../components/LogoText.vue";
import type { PageinationType } from "../../utils/type";
import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons-vue";
import { caseinfo, meta } from "@/api";
import { formatterFormInput, formatterFormData } from "@/utils/config";
import FormFiled from "@/components/FormFiled.vue";
import { useRoute } from "vue-router";

const selectContry = ref<string>("中国");
const selectFiled = ref<string>("项目时间");
const loading = ref<boolean>(false);
const filedFromRef = ref<any>(null);
const sortedInfo = ref();

const search_condition_params =ref({});

const columns = computed(() => {
  const sorted = sortedInfo.value || {};

  return [
    {
      title: "名称",
      dataIndex: "name",
      // sorter: function(a: any, b: any){
      //   console.log(a, b)
      // },
    },
    {
      title: "国别",
      dataIndex: "country",
    },
    {
      title: "所属机构",
      dataIndex: "subOrg",
    },
    {
      title: "项目时间",
      dataIndex: "itemTime",
    },
  ];
});

const dataSource = ref<{ [key: string]: string }[]>([]);

const pagination = reactive<PageinationType>({
  total: 0,
  current: 1,
  pageSize: 10,
  column : 'name',
  order : 'asc',
});

const getCaseData = async () => {
  let submitData:any = {...search_condition_params.value};
  submitData.pageNo = pagination.current;
  submitData.pageSize = pagination.pageSize;
  submitData.column = pagination.column;
  submitData.order = pagination.order;
  const { result } = await caseinfo.page(submitData);

  result && (dataSource.value = [...result.records]);
  pagination.total = result.total;
  console.log('pagination : ',pagination)
};


const handleTableChange = async (newpager: any) => {
  pagination.total = newpager.total;
  pagination.current = newpager.current;
  pagination.pageSize = newpager.pageSize;
  getCaseData();
//  getdata
};

const showSearchRes = ref<boolean>(false);

const route = useRoute();

const formFiled = reactive<any>({
  data: null,
  formModal: null,
});
const getInputMeta = async () => {
  const { result } = await meta.findSearchCondition();

  if (result) {
    let i ;
    for(i in result){
      result[i].isRequired = 2;
    }
    const { formModal } = formatterFormInput({ result });
    formFiled.formModal = { ...formModal };
    formFiled.data = [...result];
  }
};

const enterSearch = async (param:any) => {
  console.log('enterSearch', param)
  const formState: any = await filedFromRef.value?.formValidate();
  if(formState){
    search_condition_params.value = {
      ...formatterFormData({ ...formState.formFiledData }),
      ...param
    };
  }else {
    search_condition_params.value = {
      ...param
    };
  }
  // if (!formState) return;
  // 这是待提交的数据

  showSearchRes.value = true;
  getCaseData();
};
getInputMeta();
const setSort = (type: string) => {
  // sortedInfo.value = {
  //   order: type,
  //   columnKey: "name",
  // };
  pagination.order = type;
  getCaseData();
};

const back_condition = () => {
  console.log('back_condition', search_condition_params.value)
  showSearchRes.value = false

  filedFromRef.value?.setFormPamras();
  console.log('filedFromRef.value?.formState():', filedFromRef.value?.formState());
  console.log('filedFromRef.value:', filedFromRef.value);
  console.log('filedFromRef:', filedFromRef);

}
/*加载过滤条件*/
const  search_condition_meta_list = ref([]);
const load_search_condition = async () => {
  const { result } = await meta.findSearchCondition();
  search_condition_meta_list.value = result;
  // console.log('search_condition_meta_list.value:', search_condition_meta_list.value);
}
load_search_condition();

const keywords = route.query?.keywords;
if(keywords){
  console.log('keywords:', keywords);
  enterSearch({keywords:keywords})
}

</script>
<template>
  <div class="h-screen overflow-auto advanced-search">
    <Header
      class="visualization-header"
      bg-name="visualization-bg"
      title="追踪研究线索"
    />
    <a-layout-content
      style="padding: 20px 0; margin: 0 auto; width: 80%"
      class="flex flex-col"
      v-if="!showSearchRes"
    >
      <div class="return-prev-page cursor-pointer" @click="$router.go(-1)">
        <arrow-left-outlined />
        <span class="p-l-2">首页</span>
      </div>
      <LogoText text="高级检索" />
      <div class="result-container p-t-5 p-l-35 p-r-35">
        <FormFiled
          ref="filedFromRef"
          :form-modal="formFiled.formModal"
          :form-data="formFiled.data"
          :layout="{
            labelCol: { span: 3, offset: 2 },
            wrapperCol: { span: 15 },
          }"
        />
        <div class="text-center">
          <a-button @click="enterSearch({})" type="primary">搜索</a-button>
        </div>
      </div>
    </a-layout-content>
    <a-layout-content
      style="padding: 20px 0; margin: 0 auto; width: 80%"
      class="flex flex-col"
      v-else
    >
      <div
        class="return-prev-page cursor-pointer"
        @click="back_condition()"
      >
        <arrow-left-outlined />
        <span class="p-l-2">高级检索</span>
      </div>
      <LogoText text="检索结果" />
      <div class="result-container p-t-5">
        <div class="result-filter flex p-b-4">
          <a-dropdown type="primary">
            <div @click.prevent>
              <caret-down-outlined />
              {{ selectContry }}
            </div>
            <template #overlay>
              <a-menu @click="(e:any) => selectContry = e.key">
                <a-menu-item key="中国"> 中国 </a-menu-item>
                <a-menu-item key="日本"> 日本 </a-menu-item>
                <a-menu-item key="韩国"> 韩国 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-dropdown class="m-l-8" type="primary">
            <div @click.prevent>
              <caret-down-outlined />
              {{ selectFiled }}
            </div>
            <template #overlay>
              <a-menu @click="(e:any) => selectFiled = e.key">
                <a-menu-item key="项目进度"> 项目进度 </a-menu-item>
                <a-menu-item key="项目质量"> 项目质量 </a-menu-item>
                <a-menu-item key="项目名称"> 项目名称 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div class="flex-1 flex justify-end">
            <span class="cursor-pointer" @click="setSort('asc')">
              <sort-ascending-outlined />
            </span>
            <a-divider type="vertical" />
            <span class="cursor-pointer" @click="setSort('desc')">
              <sort-descending-outlined />
            </span>
          </div>
        </div>

        <a-table
          :columns="columns"
          :row-key="(record:any) => record.id"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, text, index, record }">
            <div class="c-#5b3df2 cursor-pointer" @click="$router.push({ name: 'CaseDetail', params: { id: record.id } })" v-if="column.dataIndex === 'name'"
            >{{ index }} {{ text }}</div
            >
          </template>
        </a-table>
      </div>
    </a-layout-content>
  </div>
</template>
<style lang="less">
// .visualization-header {
//   background-image: url("../../assets/image/visualization-bg.png");
// }
.advanced-search {
  position: relative;
  .return-prev-page {
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