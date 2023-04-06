<script lang="ts" setup>
import {MessageItemType, MessageType} from "../type"
import {BooleanStatus} from "@/utils/type"

defineProps<{
  message: MessageItemType;
}>();
 // "id": 56,
  //               "code": null,
  //               "versionNum": 1,
  //               "del": 0,
  //               "createTime": "2023-04-05 22:55:05",
  //               "updateTime": "2023-04-05 22:55:05",
  //               "userId": 10,
  //               "announcementId": 5,
  //               "isRead": 2,
  //               "readTime": null,
  //               "readTimes": 0,
  //               "type": 1,
  //               "title": "系统上线公告",
  //               "content": "<p>系统于4四月底上线, 敬请期待</p>",
  //               "userCode": "000010",
  //               "username": "zhangsong",
  //               "phone": "17091000200",
  //               "realName": "张嵩",
  //               "annoStatus": null
</script>
<template>
  <div class="flex p-t-4 p-b-4">
    <div class="left-icon">
      <img v-if="message.type === MessageType.Announ" height="40" src="../../../assets/image/announ.png" alt="" />
      <img v-else height="40" src="../../../assets/image/verify.png" alt="" />
    </div>
    <div class="flex-1 p-l-4 p-r-4">
      <div class="content c-#666">
        <strong>{{message.type === MessageType.Announ?'【公告】':'【审核】'}}</strong>
        <div v-html="message.content"></div>
      </div>
      <div class="c-#999 p-t-2">{{message.createTime}}</div>
    </div>
    <div class="right-tool" v-if="message.type === MessageType.Announ ">
      <a-button size="small" @click="$emit('changeRead', message.id)" class="w-80px">{{message.isRead ===  BooleanStatus.True? '已读':'设为已读'}}</a-button>
    </div>
    <div class="right-tool" v-else>
      <a-button class="w-80px" size="small" @click="$emit('openView', message)">查看</a-button>
    </div>
  </div>
</template>
<style lang="less">
.left-icon {
  // width: 40px;
  // height: 40px;
  // border-radius: 50%;
  // background-color: #5b3df2;
  // line-height: 40px;
}
</style>
