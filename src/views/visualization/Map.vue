<script setup lang="ts">
import {loadBMap, styleJson} from "./map";
import { ref, onMounted } from "vue";
const mapRef = ref<any>(null);
const map = ref<any>(null);

const initMap = () => {
  const mapObj = new BMap.Map(mapRef.value);
  const center = new BMap.Point(116.404, 39.915);
  mapObj.centerAndZoom(center, 1);
  mapObj.enableScrollWheelZoom();
  mapObj.setMapStyleV2({styleJson: styleJson});
  

};
onMounted(() => {
  loadBMap("QR2VypGlmA5SG62gsKdAUVVPAPeIrXzi").then(() => {
    initMap();
  })
});
</script>
<template>
    <div id="map" style="width: 100%; height: 100%" ref="mapRef"></div>

</template>
