<script setup lang="ts">
import { loadBMap, styleJson } from "./map";
import { MAPDATA } from "./options";
import { ref, onMounted } from "vue";
const mapRef = ref<any>(null);
const map = ref<any>(null);
const colorIndex = ref<number>(0);
/* 点的颜色预设 */
const color = ["#F243D999", "#2246E899", "#7643DF99"];

const initMap = () => {
  const mapObj = new BMapGL.Map(mapRef.value);
  const center = new BMapGL.Point(-73.343806, 45.013027);
  mapObj.centerAndZoom(center, 1);
  mapObj.enableScrollWheelZoom();
  /*  添加地图自定义样式 */
  mapObj.setMapStyleV2({ styleJson: styleJson });

  /* 自定义展示内容 */
  function createDOM() {
    let width = Math.sqrt(this.properties.value / 5e2);
    if (width > 100) width = 100;
    if (width < 10) width = 10;
    let div = document.createElement("div");
    div.className = "point-marker";
    //div.style.zIndex = BMapGL.Overlay.getZIndex(this.point.lat);
    div.style.backgroundColor = color[colorIndex.value] || "#454399";
    div.style.width = `${width}px`;
    div.style.height = `${width}px`;
    let value = document.createElement("div");
    value.className = "pointer-tip";
    div.style.color = color[colorIndex.value] || "#454399";
    div.appendChild(value);
    let title = document.createElement("div");
    title.innerHTML = this.properties.name;
    title.style.padding = "8px 0";
    value.appendChild(title);
    value.appendChild(document.createTextNode(`${this.properties.value} `));
    return div;
  }

  const domEvent = [];
  for (let index = 0; index < MAPDATA.length; index++) {
    const groupData = MAPDATA[index];
    colorIndex.value = index % 3;
    for (const item of groupData) {
      // 创建自定义覆盖物
      const customOverlay = new BMapGL.CustomOverlay(createDOM, {
        point: new BMapGL.Point(...item.pointer),
        offsetY: -10,
        properties: {
          name: item.name,
          value: item.value,
        },
      });

      mapObj.addOverlay(customOverlay);
      //   给点添加点击事件 如果需要的话
      /*  customOverlay.addEventListener("click", function (e) {
        var data = e.target.properties.value;
         alert(data);
      }); */
    }
  }
};
onMounted(() => {
  // 初始化地图
  loadBMap("QR2VypGlmA5SG62gsKdAUVVPAPeIrXzi").then(() => {
    initMap();
  });
});
</script>
<template>
  <div id="map" style="width: 100%; height: 100%" ref="mapRef"></div>
</template>
<style lang="less">
#cus_overlay {
  .point-marker {
    color: #fff;
    z-index: 10;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s linear;
    border-radius: 50%;
  }
  .pointer-tip {
    display: none;
    background-color: white;
    transform: translateX(40px);
    padding: 5px 10px;
    line-height: 16px;
    font-size: 16px;
    border-radius: 4px;
    width: max-content;
    position: absolute;
    z-index: 100;
  }
  &:hover {
    .point-marker {
      transform: scale(1.2) !important;
      & > .pointer-tip {
        display: block !important;
      }
    }
  }
}
</style>
