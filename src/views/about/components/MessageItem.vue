<script lang="ts" setup>
import type {MessageItemType} from "../type"
defineProps<{
  message: MessageItemType;
}>();
</script>
<template>
  <div class="flex p-t-4 p-b-4">
    <div class="left-icon">
      <img v-if="message.type === 'announ'" height="40" src="../../../assets/image/announ.png" alt="" />
      <img v-else height="40" src="../../../assets/image/verify.png" alt="" />
    </div>
    <div class="flex-1 p-l-4 p-r-4">
      <div class="content c-#666">
        <strong>{{message.type === 'announ' ?'【公告】':'【审核】'}}</strong>
        {{ message.desc }}
      </div>
      <div class="c-#999 p-t-2">{{message.createTime}}</div>
    </div>
    <div class="right-tool" v-if="message.type=== 'announ' ">
      <a-button size="small" @click="$emit('changeRead', message.id)" class="w-80px">{{message.isRead ? '已读':'设为已读'}}</a-button>
    </div>
    <div class="right-tool" v-else>
      <a-button class="w-80px" size="small">查看</a-button>
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
