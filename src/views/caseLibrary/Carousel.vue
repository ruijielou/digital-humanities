<script setup lang="ts">
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
const props = withDefaults(defineProps<{
    hoverDark: boolean
}>(), {
    hoverDark: false
})
</script>
<template>
  <a-carousel
    arrows
    :dots="false"
    :slides-to-show="3"
    :slides-to-scroll="1"
    class="third-pages-carousel w-100% h-100%"
    :class="{hoverDark: hoverDark}"
  >
    <template #prevArrow>
      <div class="custom-slick-arrow"  style="left: -6vw">
        <ArrowLeftOutlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow"  style="right: -6vw">
        <ArrowRightOutlined />
      </div>
    </template>
    <slot name="cards"></slot>
    <!-- <div class="h-100%" v-for="item in cardData">
      <Card style="width: 25vw; height: 55vh" :card="item" />
    </div> -->
  </a-carousel>
</template>
<style lang="less">
.ant-carousel .slick-prev,
.ant-carousel .slick-next {
  display: block;
  width: 28px;
  height: 95%;
  top: 5%;
  padding: 0 5px;
  color: #ccc;
  transition: all 0.3s linear;
  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .anticon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
.hoverDark.ant-carousel .slick-prev,
.hoverDark.ant-carousel .slick-next
{
    &:hover {
    color: #333;
    background-color: #f1f1f1;
  }
}
</style>
