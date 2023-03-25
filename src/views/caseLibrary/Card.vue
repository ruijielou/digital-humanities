<script setup lang="ts">
import CardFooter from "./CardFooter.vue";
import type { CardType } from "./type";
// const card
const props = withDefaults(
  defineProps<{
    card: CardType;
    noShowNumber?: boolean;
    hoverCard?: boolean;
  }>(),
  {
    noShowNumber: false,
    hoverCard: false,
  }
);
</script>
<template>
  <div
    class="m-5 w-100 flex flex-col card-item"
    :class="{ hoverCard: hoverCard }"
    :style="{ backgroundImage: hoverCard ? `url(${card.image})` : '' }"
  >
    <div
      class="flex-1 card-image"
      :style="{
        backgroundImage: `url(${card.image})`,
        opacity: hoverCard ? 0 : 1,
      }"
    ></div>
    <CardFooter
      class="card-footer"
      :noShowNumber="props.noShowNumber"
      :card="card"
    />
  </div>
</template>
<style lang="less">
.card-item {
  background-color: #f7f7f7;
  transition: all 0.4s linear;
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: #5b3df2;
    * {
      color: #fff;
    }
  }
  .card-image {
    background-size: cover;
    background-position: center center;
  }
  &.hoverCard {
    .card-footer {
      height: 100%;
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      background: linear-gradient(
        270deg,
        rgba(20, 4, 46, 0.86) 0%,
        rgba(5, 17, 49, 0.8) 49%,
        rgba(23, 5, 51, 0.86) 100%
      );
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      transition: all 0.3s linear;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left:0;
        width: 100%;
        height: 16px;
        background: #f243d9;
      }
    }
    &:hover {
      .card-footer {
        top: 0;
      }
    }
  }
}
</style>
