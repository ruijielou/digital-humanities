export function loadBMap(ak: string) {
  return new Promise(function (resolve, reject) {
    if (typeof BMapGL !== 'undefined') {
      resolve(BMapGL);
      return true
    }
    window.onBMapCallback = () => {
      resolve(BMapGL);
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      // 'https://map.qq.com/api/gljs?v=1.exp&key='+ ak + '&__ec_v__=20190126&callback=onBMapCallback'
      'https://api.map.baidu.com/api?type=webgl&v=1.0&ak=' + ak + '&callback=onBMapCallback'
      // 'https://api.map.baidu.com/api?&v=3.0&ak=' + ak + '&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script);

    // <script src="//mapv.baidu.com/build/mapv.min.js"></script>
    // <script src="https://unpkg.com/mapvgl@1.0.0-beta.168/dist/mapvgl.min.js"></script>
  })
}

export const styleJson = [{
  "featureType": "land",
  "elementType": "geometry",
  "stylers": {
    "visibility": "on",
    "color": "#292B61ff"
  }
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#1e1f4aff"
  }
}, {
  "featureType": "building",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#13133bff"
  }
}, {
  "featureType": "building",
  "elementType": "geometry.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#040122ff"
  }
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": {
    "visibility": "on",
    "color": "#1e1f4aff"
  }
}, {
  "featureType": "village",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "town",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "district",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
},
// {
//   "featureType": "country",
//   "elementType": "labels.text.fill",
//   "stylers": {
//       "visibility": "off",
//       "color": "#7478a8ff",
//       "weight": 1
//   }
// }, 
{
  "featureType": "city",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "continent",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "poilabel",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "poilabel",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "airportlabel",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "airportlabel",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "road",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "road",
  "elementType": "geometry.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#571167ff"
  }
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": {
    "weight": "3"
  }
}, {
  "featureType": "green",
  "elementType": "geometry",
  "stylers": {
    "visibility": "on",
    "color": "#a53daeff"
  }
}, {
  "featureType": "scenicspots",
  "elementType": "geometry",
  "stylers": {
    "visibility": "on",
    "color": "#1e1f4aff"
  }
}, {
  "featureType": "scenicspots",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "scenicspots",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "continent",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": 0.2
  }
},
// {
//   "featureType": "country",
//   "elementType": "labels.text.stroke",
//   "stylers": {
//       "visibility": "off",
//       "color": "#5e64e2ff",
//       "weight": 0.2,
//       "opacity": "a8"
//   }
// }, 
{
  "featureType": "city",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff",
    "weight": "1"
  }
}, {
  "featureType": "city",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "airportlabel",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "railway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "subway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "highwaysign",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "nationalwaysign",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "nationalwaysign",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "provincialwaysign",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "provincialwaysign",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "tertiarywaysign",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "tertiarywaysign",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "subwaylabel",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "subwaylabel",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff",
    "weight": "90"
  }
}, {
  "featureType": "road",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "shopping",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "scenicspots",
  "elementType": "labels",
  "stylers": {
    "visibility": "on"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "manmade",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "manmade",
  "elementType": "labels",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "highwaysign",
  "elementType": "labels.icon",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "water",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#a53dae00"
  }
}, {
  "featureType": "road",
  "stylers": {
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "stylers": {
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "stylers": {
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "stylers": {
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "road",
  "elementType": "labels.text",
  "stylers": {
    "fontsize": "24"
  }
}, {
  "featureType": "highway",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry.stroke",
  "stylers": {
    "color": "#1c4f7eff"
  }
}, {
  "featureType": "highway",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry",
  "stylers": {
    "weight": "3"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry.stroke",
  "stylers": {
    "color": "#1c4f7eff"
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry",
  "stylers": {
    "weight": "3",
    "visibility": "off"
  }
}, {
  "featureType": "provincialway",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "arterial",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "local",
  "elementType": "geometry.fill",
  "stylers": {
    "visibility": "on",
    "color": "#75348fff"
  }
}, {
  "featureType": "provincialway",
  "elementType": "geometry.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#571167ff"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#571167ff"
  }
}, {
  "featureType": "arterial",
  "elementType": "geometry.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#571167ff"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "geometry.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#571167ff"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "geometry.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#571167ff"
  }
}, {
  "featureType": "local",
  "elementType": "geometry.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#571167ff"
  }
}, {
  "featureType": "local",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "local",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "arterial",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "provincialway",
  "elementType": "labels.text.fill",
  "stylers": {
    "visibility": "on",
    "color": "#7478a8ff"
  }
}, {
  "featureType": "provincialway",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "arterial",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "labels.text.stroke",
  "stylers": {
    "visibility": "on",
    "color": "#5e64e2ff",
    "weight": "1"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "geometry",
  "stylers": {
    "weight": "1"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "geometry",
  "stylers": {
    "weight": "1"
  }
}, {
  "featureType": "local",
  "elementType": "geometry",
  "stylers": {
    "weight": "1"
  }
}, {
  "featureType": "provincialway",
  "elementType": "geometry",
  "stylers": {
    "weight": "3"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry",
  "stylers": {
    "weight": "3"
  }
}, {
  "featureType": "arterial",
  "elementType": "geometry",
  "stylers": {
    "weight": "3"
  }
}, {
  "featureType": "highway",
  "stylers": {
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "stylers": {
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "stylers": {
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "stylers": {
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "highway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "stylers": {
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "stylers": {
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "stylers": {
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "stylers": {
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "provincialway",
  "stylers": {
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "8-10"
  }
}, {
  "featureType": "provincialway",
  "stylers": {
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "8-10"
  }
}, {
  "featureType": "provincialway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "8-10"
  }
}, {
  "featureType": "provincialway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "8-10"
  }
}, {
  "featureType": "provincialway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "8-10"
  }
}, {
  "featureType": "provincialway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "8-10"
  }
}, {
  "featureType": "cityhighway",
  "stylers": {
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "stylers": {
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "stylers": {
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "stylers": {
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "6",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "7",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "8",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "6-9"
  }
}, {
  "featureType": "arterial",
  "stylers": {
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "9-9"
  }
}, {
  "featureType": "arterial",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "9-9"
  }
}, {
  "featureType": "arterial",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "level": "9",
    "curZoomRegionId": "0",
    "curZoomRegion": "9-9"
  }
}, {
  "featureType": "subwaystation",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "country",
  "elementType": "labels",
  "stylers": {
    "visibility": "off",
    "color": "#7478a8ff",
    "weight": "1"
  }
},
{
  "featureType": "boundary",
  "elementType": "geometry",
  "stylers": {
    "visibility": "on",
    "color": "#7643DF66",
    "weight": "1"
  }
},
{
  "featureType": "boundary",
  "elementType": "geometry.fill",
  "stylers": {
    "color": "#7643DF66",
  }
},
{
  "featureType": "laneline",
  "elementType": "geometry",
  "stylers": {
    "visibility": "off"
  }
}, {
  "featureType": "background",
  "elementType": "geometry",
  "stylers": {
    "visibility": "on",
    "color": "#0f0101ff"
  }
}]


export function initMap(options) {
  options = Object.assign({
    tilt: 60,
    heading: 0
  }, options);
  var map = new BMapGL.Map(options.map_container, {
    restrictCenter: false,
    style: { styleJson: options.style || styleJson }
  });
  map.enableKeyboard();
  map.enableScrollWheelZoom();
  map.enableInertialDragging();
  map.enableContinuousZoom();

  map.setDisplayOptions(options.displayOptions || {
    indoor: false,
    poi: true,
    skyColors: options.skyColors || [
      'rgba(5, 5, 30, 0.01)',
      'rgba(5, 5, 30, 1.0)'
    ]
  });
  if (options.center && options.zoom) {
    let center = options.center;
    if (center instanceof Array) {
      center = new BMapGL.Point(options.center[0], options.center[1])
    }
    map.centerAndZoom(center, options.zoom);
  }

  map.setTilt(options.tilt);
  map.setHeading(options.heading);
  return map;
}

