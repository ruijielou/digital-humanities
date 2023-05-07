<script setup lang="ts">
import CardFooter from "./CardFooter.vue";
import type { CardType } from "./type";
import { imgBaseUrl } from "@/utils/config";

const emit = defineEmits(["cancelFavorited"]);
const props = withDefaults(
  defineProps<{
    card: CardType;
    noShowNumber?: boolean;
    noShowViews?: boolean;
    hoverCard?: boolean;
  }>(),
  {
    noShowNumber: false,
    hoverCard: false,
  }
);

const favorited = (id: number) => {
  emit('cancelFavorited', id)
}
</script>
<template>
  <div
    class="w-100% flex flex-col card-item"
    :class="{ hoverCard: hoverCard }"
    :style="{ backgroundImage: hoverCard && card.lastCover ? `url(${imgBaseUrl + card.lastCover})` : '' }"
  >
    <div
      class="card-image"
      :style="{
        backgroundImage: `url(${card.cover ? (imgBaseUrl + card.cover ): '/src/assets/image/card.png'})`,
        opacity: hoverCard ? 0 : 1,
      }"
    ></div>
    <CardFooter
      class="card-footer"
      :noShowNumber="props.noShowNumber"
      :noShowViews="props.noShowViews"
      :card="card"
      @favorited="favorited"
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
    height: 70%;
  }
  .card-footer {
    height: 30%;
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
        content: "";
        position: absolute;
        top: 0;
        left: 0;
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
