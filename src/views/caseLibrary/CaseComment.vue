<script setup lang="ts">
import { ref,reactive } from "vue";
import { message } from "ant-design-vue";
import { comment } from "@/api";
import { useRoute } from "vue-router";
import { imgBaseUrl } from "@/utils/config";
import { useUserStore } from "@/store/user";
import { UserOutlined, CommentOutlined } from "@ant-design/icons-vue";

const { userInfo } = useUserStore();
const caseComment = ref<string>("");
const textareaRef = ref<any>(null);
const replayUser = reactive<any>({data: null});
const commentList = ref<any>([]);
const route = useRoute();

const publishComment = async () => {
  if (!caseComment.value) {
    message.error("评论内容不能为空");
    return;
  }
  const params = {
    contentId: route.params.id,
    commentId: replayUser.data ? replayUser.data.id : null,
    remark: caseComment.value,
  };
  const res = await comment.insert(params);
  if (res.success) {
    message.success("评论成功");
    caseComment.value = "";
    replayUser.data = null;
    getCommentList();
  }
};
const getCommentList = async () => {
  const { result } = await comment.page(route.params.id as string);
  if (result) {
    commentList.value = [...result.records];
  }
};

const replay = (commentItem: any) => {
  replayUser.data = {...commentItem}
  textareaRef.value && textareaRef.value.focus()
}
const removeReplay = () => {
  replayUser.data = null;
  caseComment.value = "";
}
getCommentList();
</script>
<template>
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
            :src="imgBaseUrl + userInfo.avatar"
          >
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>

          <a-textarea
            class="flex-1"
            ref="textareaRef"
            v-model:value="caseComment"
            :placeholder="replayUser.data ? `回复${replayUser.data.username}` : '请输入评论'"
            :rows="4"
          />
        </div>
        <div class="text-right p-t-2">
          <a-button size="small" class="m-r-3" type="info" v-if="replayUser.data" @click="removeReplay"
            >取消回复</a-button
          >
          <a-button size="small" type="primary" @click="publishComment"
            >{{replayUser.data ? `回复` : '发布'}}</a-button
          >
         
        </div>
      </div>
      <div class="flex" v-for="item in commentList">
        <a-avatar
          shape="circle"
          :size="24"
          class="m-r-2"
          title="person"
          :src="imgBaseUrl + item.userAvatar"
        >
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <div class="comment-detail">
          <div>{{ item.username }}</div>
          <div>{{ `${item.commentId ? '回复：': ''}${item.remark}` }}</div>
          <p class="c-#999">
            {{ item.createTime }}
            <span class="cursor-pointer hover-color-#5b3df2" @click="replay(item)"> <comment-outlined /> </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
