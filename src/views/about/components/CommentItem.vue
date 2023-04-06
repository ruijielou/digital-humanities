<script lang="ts" setup>
import type { CommentItemType } from "../type";

defineProps<{
  comment: CommentItemType;
}>();
</script>
<template>
  <div class="flex p-t-4 p-b-4">
    <div class="left-icon">
      <a-avatar shape="circle" :size="40" class="m-r-2" :title="comment.username">
        <template #icon>
          <img v-if="comment.userAvatar" :src="comment.userAvatar" alt="" />
          <UserOutlined v-else />
        </template>
      </a-avatar>
    </div>
    <div class="flex-1 p-l-4 p-r-4">
      <div class="content c-#666">
        <div>
            {{comment.username}} 评论了“{{comment.caseName}}”：
        </div>
        <div class="c-#999 p-t-2">{{ comment.remark }}</div>
      </div>
    </div>
    <div class="right-tool">
      <a-button class="w-80px" size="small" @click="$emit('openView', comment)">查看</a-button>
    </div>
  </div>
</template>

