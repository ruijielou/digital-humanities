<script setup lang="ts">
import { ref, createVNode } from "vue";
import { message, Modal } from "ant-design-vue";
import { favoritegroup } from "@/api";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import Card from "../caseLibrary/Card.vue";

const collectionData = ref<any[]>([]);
const getCollectionData = async () => {
  const { result } = await favoritegroup.myPage();
  let datas: any[] = [];
  let i;
  for (i in result?.records) {
    let record = result?.records[i];
    datas.push({
      id: record.id,
      name: record.title,
      caseQuantity: record.caseQuantity,
      lastCaseName: record.caseName,
      comments: [],
      cover: record.caseCover,
      favoriteId: record.favoriteId,
    });
  }
  collectionData.value = datas;
};

getCollectionData();

// 取消喜欢
const cancelFavorited: any = async (id: number) => {
  if (!id) return;
  Modal.confirm({
    content: "确定要删除收藏夹吗？",
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      const res = await favoritegroup.del({ id });
      if (res.success) {
        message.success(res.message);
        getCollectionData();
      }
    },
    cancelText: "再想想",
    okText: "确定",
    onCancel() {
      Modal.destroyAll();
    },
  });
};
</script>
<template>
  <div class="p-8 w-100% mycollection-manage">
    <div class="lines-purple flex justify-between">
      <div class="flex items-center m-b-2">
        <h2 class="m-0">我的收藏夹</h2>
      </div>
    </div>
    <div class="p-t-4 p-r-120px">
      <div class="case-group flex flex-wrap">
        <Card
          v-for="item in collectionData"
          :no-show-views="true"
          @cancelFavorited="cancelFavorited"
          @click.stop="
            $router.push({
              name: 'CollectionsClassify',
              params: { id: item.id, name: item.name },
            })
          "
          style="width: 31%; height: 428px; margin: 0 20px 20px 0"
          :card="item"
        />
      </div>
    </div>
  </div>
</template>
<style lang="less">
.mycollection-manage {
  padding-bottom: 5em;
  padding-right: 0;
}
</style>