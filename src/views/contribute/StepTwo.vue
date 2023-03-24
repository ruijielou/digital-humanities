<script setup lang="ts">
defineProps<{
  selectedTag: string[];
}>();

</script>
<template>
  <div class="step-two">
    <div class="group-item">
      <div class="group-item-title">
        <span class="line-title">所属案例库</span>
      </div>
      {{ selectedTag }}
      <div class="group-tags">
        <span
          v-for="(tag, i) in selectedTag"
          :key="i"
          class="tag-item active"
          >{{ tag }}</span
        >
      </div>
    </div>
  </div>
</template>
