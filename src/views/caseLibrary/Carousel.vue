<script setup lang="ts">
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
const props = withDefaults(defineProps<{
    hoverDark?: boolean,
    arrowTop?: boolean
}>(), {
    hoverDark: false,
    arrowTop: false
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
      <div class="custom-slick-arrow left-arrow">
        <ArrowLeftOutlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow right-arrow">
        <ArrowRightOutlined />
      </div>
    </template>
    <slot name="cards"></slot>
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
.custom-slick-arrow.left-arrow{
  left: -6vw;
}
.custom-slick-arrow.right-arrow{
  right: -6vw;
}
.arrowTop .custom-slick-arrow.left-arrow{
  right: 50px;
  top: -20px;
  left: inherit;
  height: 30px;
  &:hover {
    background-color: #ccc;
  }
}
.arrowTop .custom-slick-arrow.right-arrow{
  right: 0;
  top: -20px;
  height: 30px;
  &:hover {
    background-color: #ccc;
  }
}
</style>
