<script lang="ts" setup>
defineProps<{
  text: string
}>()
</script>
<template>
  <div class="contribute-page-title text-center">
    <img src="../assets/image/title-l.png" alt="" />
    <span class="p-l-4 p-r-4 text-6 v-middle" style="letter-spacing: 5px">{{ text }}</span>
    <img src="../assets/image/title-r.png" alt="" />
  </div>
</template>