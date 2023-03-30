import * as echarts from 'echarts';
import { componentMap } from "./type";

const USADATA = [
  { name: 'Alaska', value: 731449, pointer: [-131.602021, 55.117982] },
  { name: 'Arizona', value: 53255, pointer: [-109.042503, 37.000263] },
  { name: 'Arkansas', value: 49131, pointer: [-94.473842, 36.501861] },
  { name: 'California', value: 341430, pointer: [-123.233256, 42.006186] },
  { name: 'Colorado', value: 51582, pointer: [-107.919731, 41.003906] },
  { name: 'Connecticut', value: 90347, pointer: [-73.053528, 42.039048] },
  { name: 'Delaware', value: 9192, pointer: [-75.414089, 39.804456] },
  { name: 'District of Columbia', value: 632323, pointer: [-77.035264, 38.993869] },
  { name: 'Florida', value: 193568, pointer: [-85.497137, 30.997536] },
  { name: 'Georgia', value: 99945, pointer: [-83.109191, 35.00118] },
  { name: 'Hawaii', value: 13913, pointer: [-155.634835, 18.948267] },
]
const HKDATA = [
  { name: 'Eastern', value: 20057.34, pointer: [114.198250, 22.258787] },
  { name: 'Islands', value: 15477.48, pointer: [113.924026, 22.157084] },
  { name: 'Kowloon', value: 31686.1, pointer: [114.179657, 22.349068] },
]
const chinaData = [
  {
    name: '无名', value: 72, pointer: [
      120.14322240845,
      30.236064370321
    ]
  },
  { name: '北京', value: 15, pointer: [116.40342230333138, 39.92498414216742] },

];
export const MAPDATA = [USADATA, HKDATA, chinaData] //测试地图用的数据

const colors = [
  ["rgba(245, 68, 168, 1)",
    "rgba(245, 103, 214, 1)"],
  ["rgba(242, 67, 217, 1)",
    "rgba(216, 82, 250, 1)"],
  ["rgba(201, 135, 250, 1)",
    "rgba(143, 88, 255, 1)"],
  ["rgba(91, 61, 242, 1)",
    "rgba(100, 100, 250, 1)"],
  ["rgba(34, 73, 241, 1)",
    "rgba(67, 131, 250, 1)"],
  ["rgba(99, 179, 255, 1)",
    "rgba(1, 160, 233, 1)"],
  ["rgba(37, 183, 191, 1)",
    "rgba(38, 216, 238, 1)"],
  ["rgba(102, 235, 239, 1)",
    "rgba(38, 215, 191, 1)"],
  ["rgba(156, 219, 28, 1)",
    "rgba(205, 217, 34, 1)"],
  ["rgba(255, 149, 113, 1)",
    "rgba(245, 103, 133, 1)"]
]

const grid = {
  left: '12%',
  right: '4%',
  bottom: '3%',
  containLabel: true
}

const tooltip = {
  trigger: 'item',
  axisPointer: {
    type: 'cross',
    label: {
      backgroundColor: 'transparent'
    }
  }
}

const getTime = (chartData: any) => {
  return {
    color: colors.map(item => {
      return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: item[0]
        },
        // {
        //   offset: 0.5,
        //   color: item[1]
        // },
        {
          offset: 1,
          color: 'rgba(0,0,0,1)'
        }
      ])
    }),
    grid,
    tooltip,
    legend: {
      icon: 'circle',
      padding: [15, 0, 0, 0],
      textStyle: {
        color: '#fff'
      },
      itemStyle: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffsetY: 5,
        shadowBlur: 5
      },
      data: chartData.map((item: any) => item.name)
    },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: { color: '#6960BA' },
        },
        axisLabel: { show: true, textStyle: { color: '#6E72F2' } },
        data: chartData[0].data.map((item: { year: string, value: number }) => item.year)
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: { color: '#6960BA' },
        },
        axisLabel: { show: true, textStyle: { color: '#6E72F2' } },
      }
    ],
    series: chartData.map((item: any, index: number) => {
      return {
        name: item.name,
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colors[index % 10][0]
            },
            {
              offset: 0.5,
              color: colors[index % 10][1]
            },
            {
              offset: 1,
              color: "rgba(0,0,0,1)"
            }
          ])
        },
        data: item.data.map((item: any) => item.value)
      }
    })
  }
};

const getCooperate = (chartData: any) => {
  return {
    color: colors.map(item => item[0]),
    tooltip,
    series: [
      {
        type: 'sankey',
        nodeAlign: 'left',
        data: chartData.nodes || [],
        links: chartData.links || [],
        left: '15%',
        nodeWidth: 5,
        lineStyle: {
          color: "#6960BA",
          opacity: 0.39,
        },
        label: {
          color: '#fff'
        }
      }
    ]
  }
}

// Theme,
// Cooperate,
// Distribution,
// Time,
// Knowledge,

export const getOption = (type: componentMap, chartData: any) => {
  // const optionsMap = {
  //   [componentMap.Time]: { ...getTime(chartData) },
  //   [componentMap.Theme]: { ...getDistribution(chartData) },
  //   [componentMap.Cooperate]: null,
  //   [componentMap.Distribution]: null,
  //   [componentMap.Knowledge]: null,
  // }

  switch (type) {
    case componentMap.Time:
      return { ...getTime(chartData) }
      break;
    case componentMap.Cooperate:
      return { ...getCooperate(chartData) }
      break;
    default:
      return null
      break;
  }
}