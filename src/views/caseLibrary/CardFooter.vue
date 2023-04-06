<script lang="ts" setup>
import { EyeOutlined, UserOutlined } from "@ant-design/icons-vue"
import type { CardType } from "./type";
const props = withDefaults(defineProps<{
  card: CardType,
  noShowNumber?: boolean,
  noShowViews?: boolean
}>(), {
  noShowNumber: false,
  noShowViews: false
})

</script>
<template>
  <div class="p-4">
    <h2 class="code m-0" v-if="card && card.code">{{ '0' + card.code }}</h2>
    <h4 class="card-title">{{ card.caseName }}</h4>
   <template v-if="!props.noShowNumber">
    <div>
      <span>案例量：</span>
      <span>{{ card.caseQuantity }}</span>
    </div>
    <div class="p-b-2">
      <span>最近更新：</span>
      <span>{{ card.lastCaseName }}</span>
    </div>
   </template>
    <div class="flex  ">
      <div class="flex-1">
        <a-avatar shape="circle" :size="24" class="m-r-2" :title="person.name" v-for="person in card.userAvatarList">
          <template #icon>
            <img v-if="person.photo" :src="person.photo" alt="">
            <UserOutlined v-else/>
          </template>
        </a-avatar>
      </div>
      <div v-if="!noShowViews">
        <eye-outlined />
        {{ card.visitQuantity }}
      </div>
    </div>
  </div>
</template>