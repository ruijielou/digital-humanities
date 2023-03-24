<script lang="ts" setup>
import { EyeOutlined, UserOutlined } from "@ant-design/icons-vue"
import type { CardType } from "./type";
defineProps<{
  card: CardType
}>()
</script>
<template>
  <div>
    <h3 class="code" v-if="card.code">{{ card.code }}</h3>
    <h4 class="card-title">{{ card.title }}</h4>
    <div>
      <span>案例量：</span>
      <span>{{ card.caseNumber }}</span>
    </div>
    <div>
      <span>最近更新：</span>
      <span>{{ card.recentUpdates }}</span>
    </div>
    <div class="flex">
      <div class="flex-1">
        <a-avatar shape="square" :size="64">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </div>
      <div>
        <eye-outlined />
        {{ card.viewsNumber }}
      </div>
    </div>
  </div>
</template>