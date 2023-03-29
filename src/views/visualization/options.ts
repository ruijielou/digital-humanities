export const USADATA = [
  { name: 'Alaska', value: 731449, pointer: [-131.602021, 55.117982] },
  { name: 'Arizona', value: 6553255, pointer: [-109.042503, 37.000263] },
  { name: 'Arkansas', value: 2949131, pointer: [-94.473842, 36.501861] },
  { name: 'California', value: 38041430, pointer: [-123.233256, 42.006186] },
  { name: 'Colorado', value: 5187582, pointer: [-107.919731, 41.003906] },
  { name: 'Connecticut', value: 3590347, pointer: [-73.053528, 42.039048] },
  { name: 'Delaware', value: 917092, pointer: [-75.414089, 39.804456] },
  { name: 'District of Columbia', value: 632323, pointer: [-77.035264, 38.993869] },
  { name: 'Florida', value: 19317568, pointer: [-85.497137, 30.997536] },
  { name: 'Georgia', value: 9919945, pointer: [-83.109191, 35.00118] },
  { name: 'Hawaii', value: 1392313, pointer: [-155.634835, 18.948267] },
]
const HKDATA = [
  { name: 'Eastern', value: 20057.34, pointer: [114.198250, 22.258787] },
  { name: 'Islands', value: 15477.48, pointer: [113.924026, 22.157084] },
  { name: 'Kowloon', value: 31686.1, pointer: [114.179657, 22.349068] },
]
var chinaData = [
  {
    name: '无名', value: 72, pointer: [
      120.14322240845,
      30.236064370321
    ]
  },
  { name: '北京', value: 15, pointer: [116.40342230333138, 39.92498414216742] },

];
export const MAPDATA = [USADATA,HKDATA,chinaData ]



// export const worldOption = {
//   backgroundColor: "#0E102D99",
//   tooltip: {}, // 鼠标移到图里面的浮动提示框
//   dataRange: {
//     show: false,
//     min: 0,
//     max: 1000,
//     text: ['High', 'Low'],
//     realtime: true,
//     calculable: true,
//     color: ['red', 'yellow', 'lightskyblue']
//   },
//   geo: { // 这个是重点配置区
//     map: 'world', // 表示中国地图
//     roam: true,
//     label: {
//       normal: {
//         show: false, // 是否显示对应地名
//         textStyle: {
//           color: 'rgba(0,0,0,0.4)'
//         }
//       }
//     },
//     itemStyle: {
//       textStyle: {
//         color: 'green'
//       },
//       normal: {
//         areaColor: '#292B61',
//         borderColor: '#7643DF99',

//       },
//       emphasis: {
//         areaColor: '#7a8cfced',
//         shadowOffsetX: 0,
//         shadowOffsetY: 0,
//         shadowBlur: 20,
//         borderWidth: 0,
//         shadowColor: 0,
//       }
//     }
//   },
//   series: [{
//     type: 'scatter',
//     coordinateSystem: 'geo' // 对应上方配置
//   },
//   {
//     name: '启动次数', // 浮动框的标题
//     type: 'map',
//     geoIndex: 0,
//     data: [{
//       "name": "北京",
//       "value": 599
//     }, {
//       "name": "上海",
//       "value": 142
//     }, {
//       "name": "黑龙江",
//       "value": 44
//     }, {
//       "name": "深圳",
//       "value": 92
//     }, {
//       "name": "湖北",
//       "value": 810
//     }, {
//       "name": "四川",
//       "value": 453
//     }]
//   }
//   ]
// }