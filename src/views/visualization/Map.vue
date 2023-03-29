<script setup lang="ts">
import { loadBMap, styleJson } from "./map";
import { MAPDATA } from "./options";
import { ref, onMounted } from "vue";
import USA from "./USA.json";
const mapRef = ref<any>(null);
const map = ref<any>(null);
const colorIndex = ref<number>(0);
const color = ["#F243D999", "#2246E899", "#7643DF99"];

const initMap = () => {
  const mapObj = new BMapGL.Map(mapRef.value);
  const center = new BMapGL.Point(-73.343806, 45.013027);
  mapObj.centerAndZoom(center, 1);
  mapObj.enableScrollWheelZoom();
  mapObj.setMapStyleV2({ styleJson: styleJson });

  // 自定义展示内容
  function createDOM() {
    let div = document.createElement("div");
    div.style.zIndex = BMapGL.Overlay.getZIndex(this.point.lat);
    div.style.backgroundColor = color[colorIndex.value] || "#454399";
    div.style.color = "#fff";
    div.style.height = "130px";
    div.style.width = "130px";
    div.style.padding = "2px";
    div.style.lineHeight = "30px";
    div.style.whiteSpace = "nowrap";
    div.style.userSelect = "none";
    div.style.fontSize = "12px";
    div.style.borderRadius = "50%";

    // let value = document.createElement("div");
    // value.style.display = "none";
    // value.style.backgroundColor = "white";
    // value.style.transform = "translateX(-100px)";
    // value.style.padding = "5px 10px";
    // value.style.lineHeight = "16px";
    // value.style.fontSize = "16px";
    // div.appendChild(value);
    // value.appendChild(document.createTextNode(this.properties.value));
    div.addEventListener("mouseover",function(e) {
        // console.log(e);
      this.style.backgroundColor = "#fff";
    //   value.style.display = "block";
    //   this.style.transform = "scale(1.2)";
    //   this.style.boxShadow =
    //     "0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)";
    }),
    // div.onmouseover = function (e) {
    //   console.log(e);
    //   div.style.backgroundColor = "#fff";
    // //   value.style.display = "block";
    //   this.style.transform = "scale(1.2)";
    //   this.style.boxShadow =
    //     "0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)";
    // };

    div.onmouseout = function () {
    //   this.style.boxShadow = "none";
    //   this.style.backgroundColor = "#fff";
    //   value.style.display = "none";
    //   this.style.transform = "scale(1)";
    };
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
        //   opacity: 0.5,
        offsetY: -10,
        properties: {
          name: item.name,
          value: item.value,
        },
      });

      mapObj.addOverlay(customOverlay);
      customOverlay.addEventListener("click", function (e) {
        var data = e.target.properties.value;
        alert(data);
      });
      //   customOverlay.addEventListener("mouseover", function (e) {
      // //   customOverlay.onmouseover = function (e) {
      //     console.log(e);

      //     //value.style.display = "block";
      //     e.target.style.transform = "scale(1.2)";
      //     e.target.style.boxShadow =
      //       "0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)";
      //   });

      //   customOverlay.onmouseout = function () {
      //     this.style.boxShadow = "none";
      //     value.style.display = "none";
      //     this.style.transform = "scale(1)";
      //   };
      //   customOverlay.addEventListener("mouseover", function (e) {
      //     console.log(e.target.querySelect('.title'));

      //     var data = e.target.properties.value;
      //     alert(data);
      //   });
    }
  }
};
onMounted(() => {
  loadBMap("QR2VypGlmA5SG62gsKdAUVVPAPeIrXzi").then(() => {
    initMap();
  });
});
</script>
<template>
  <div id="map" style="width: 100%; height: 100%" ref="mapRef"></div>
</template>
<style lang="less">
.pointer-item {
  //border: 5px solid #000;
}
.pointer-item:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
