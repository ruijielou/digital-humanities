import * as echarts from 'echarts';
import { componentMap } from "@/utils/type";
import { styleJson } from "./map"

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
 const nodes = chartData.nodes && chartData.nodes.filter((item, index, self) => {
  return index === self.findIndex((t) => t.name === item.name);
});
  return {
    color: colors.map(item => item[0]),
    tooltip,
    series: [
      {
        type: 'sankey',
        nodeAlign: 'left',
        focusNodeAdjacency: 'allEdges',
        data: nodes || [],
        links: chartData.links || [],
        top: 70,
        left: '15%',
        nodeWidth: 5,
        lineStyle: {
          color: "#6960BA",
          opacity: 0.39,
        },
        emphasis: {
          focus: 'adjacency'
        },
        label: {
          color: '#fff'
        }
      }
    ]
  }
}

const convertData = function (data: any) {
  const res: any = {};
  for (const item of data) {
    try {
      const locations = item.cityLocation && JSON.parse(item.cityLocation);
      if(locations){
        let loc;
        for(loc in locations){
          if (res[loc]) {
            res[loc].value[2] += 1;
          } else {
            res[loc] = {
              name: loc,
              value: [locations[loc][1], locations[loc][0], 1]
            }
          }
        }
      }
    } catch (error) {
      console.log(item, '解析失败' + error);
    }
  }
  
  return Object.values(res);
};

const getDistribution = (chartData: any) => {
  return {
    tooltip: {
      trigger: 'item'
    },

    visualMap: [
      {
        type: 'piecewise',
        inverse: true,
        left: 'right',
        bottom: 46,
        pieces: [
          { max: 1 },
          { max: 20 },
          { max: 40 },
          { max: 60 },
          { max: 80 },
          { max: 116 }
        ],
        inRange: {
          color: '#6A6FFA',
        },
        itemWidth: 90,
        align: 'left',
        dimension: 2,//哪个维度映射
        textStyle: { color: '#fff' },
        // controller: {
        //   inRange: {
        //     symbolSize: [300, 100]
        //   }
        // },
      },
      {
        min: -6,
        max: 6,
        bottom: 10,
        seriesIndex: 0,
        itemHeight: 90,
        right: 55,
        dimension: 2,//哪个维度映射
        inRange: {
          color: ['#2246E899', '#7643DF99', '#F243D999'],
        },
        "orient": "horizontal",
        textStyle: { color: '#fff' },
      }
    ],

    geo: { // 这个是重点配置区
      map: 'world',
      // roam: true,
      mapStyle: styleJson,
      label: {
        show: false, // 是否显示对应地名
        textStyle: {
          color: 'rgba(0,0,0,0.4)'
        }
      },
      emphasis: {
        label: {
          show: true, // 显示国家名称
          color: '#fff' // 设置hover状态下的国家文本颜色
        }
      },
      itemStyle: {
        textStyle: {
          color: '#fff'
        },
        normal: {
          areaColor: '#292B61',
          borderColor: '#7643DF99',
        },
        emphasis: {
          areaColor: '#7a8cfced',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 0,
          color: '#fff'
        }
      }
    },
    series: [
      {
        name: '',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(chartData),
        symbolSize: (val: any) => {
          return val[2] * 6;
        },

        colorBy: 'data',
        encode: {
          value: 2
        },
        itemStyle: {
          normal: {
            color: (data: any) => {
              return data.color
            }
          }
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        }
      },
    ]
  };
}

const KnowledgeColor = [
  {
    c1: '#7643DF',
    c2: '#7643DF80',
  },
  {
    c1: "#2246E8",
    c2: "#2246E880",
  },
  {
    c1: '#F243D9',
    c2: '#F243D980',
  },
]

const legendColor = colors.map((item) => item[1]);

//计算list
function getLists(arr: any) {
  const list: any = []
  arr.forEach((item: any, index: number) => {
    if (item.name === null) {
      return false;
    }
    // 设置节点大小
    let symbolSize = 10;
    switch (item.level) {
      case 1:
        symbolSize = 40;
        break;
      case 2:
        symbolSize = 30;
        break;
      case 3:
        symbolSize = 20;
        break;
      default:
        break;
    }

    // 每个节点所对应的文本标签的样式。
    let label = null;
    if (item.isParent) {
      label = {
        position: "inside",
        rotate: 0,
      };
    }

    //计算出颜色,从第二级开始
    const color = KnowledgeColor[item.level - 1] ? KnowledgeColor[item.level - 1] : KnowledgeColor[2];
    // 设置线条颜色
    let lineStyle = {
      color: '#7643DF80',
    };
    const noedeCorlours = item.colorValue && `#${item.colorValue}`;
    const noedeCorloursLess = noedeCorlours && `${noedeCorlours}80`;
    
    // 设置节点样式
    let bgcolor = null;
    if (item.isParent) {
      bgcolor = {
        type: "radial",
        x: 0.5,
        y: 0.5,
        r: 0.5,
        colorStops: [
          {
            offset: 0.8,
            color:  noedeCorlours || color.c1, // 0% 处的颜色
          },
          {
            offset: 0.8,
            color: 'rgba(0, 0, 0, .0)', // 80% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(0, 0, 0, 0)", // 100% 处的颜色
          },
        ],
        global: false,
      };
    } else {
      bgcolor = {
        type: "radial",
        x: 0.5,
        y: 0.5,
        r: 0.5,
        colorStops: [
          {
            offset: 0.1,
            color: noedeCorloursLess || color.c2, // 0% 处的颜色
          },
          {
            offset: 0.6,
            color: noedeCorloursLess || color.c2, // 0% 处的颜色
          },
          {
            offset: 0.6,
            color: noedeCorlours ||color.c1, // 0% 处的颜色
          },
          {
            offset: 0.7,
            color: noedeCorlours || color.c1, // 0% 处的颜色
          },
          {
            offset: 0.7,
            color: 'rgba(0, 0, 0, 0)', // 80% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(0, 0, 0, 0)", // 100% 处的颜色
          },
        ],

        global: false,
      };
    }
    let itemStyle = null;
    if (!item.isParent) {
      //非子节点
      itemStyle = {
        borderColor: noedeCorloursLess || color.c2,
        borderWidth: 1,
        color: bgcolor,
        borderType: item.level == 1 ? [55, 5] : [40, 5],
      };
    } else {
      itemStyle = {
        color: bgcolor,
        borderWidth: 1,
        borderColor: noedeCorloursLess || color.c2,
        borderType: [110 / (item.level + 1), 5],
      };
    }
    itemStyle = Object.assign(itemStyle, {
      shadowColor: "rgba(255, 255, 255, 0.5)",
      shadowBlur: 0,
    });

    let obj = {
      name: item.name,
      symbolSize: symbolSize,
      label,
      color: bgcolor,
      itemStyle,
      lineStyle,
    };
    obj = Object.assign(item, obj);
    if (item.level === 1) {
      obj = Object.assign(obj, {
        root: true,
      });
    }
    if (item.list && item.list.length === 0) {
      obj = Object.assign(obj, {
        isEnd: true,
      });
    }
    list.push(obj);

  });
  return list
}
// 计算links
function getLinks(arr: any) {
  const links: any = []
  arr.forEach((item: any) => {
    let lineStyle = {
      normal: {
        color: "#6960BA80",
      },
    };
    let obj = {
      label: {
        show: true,
        fontSize: 10,
        color: '#fff',
        formatter: function (params: any) {
          return params.data.name
        }
      },
      lineStyle,
      ...item
    };
    links.push(obj);
  });
  return links
}

const getKnowledge = (chartData: any) => {

  return {
    toolbox: {
      show: true,
      left: "right",
      right: 20,
      top: "bottom",
      bottom: 20,
    },
    color: legendColor,
    selectedMode: "false",
    bottom: 20,
    left: 0,
    right: 0,
    top: 0,
    type: "graph",
    animationDuration: 1000,
    // animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: "知识图谱",
        type: "graph",
        hoverAnimation: true,
        layout: "force",
        force: {
          edgeLength: 130,
          repulsion: 400,
          gravity: 0.2
        },
        nodeScaleRatio: 0.6,
        draggable: true,
        roam: true,
        symbol: "circle",
        data: getLists(chartData.data),
        links: getLinks(chartData.links),
        categories: chartData.categories,
        focusNodeAdjacency: true,
        scaleLimit: {
          //所属组件的z分层，z值小的图形会被z值大的图形覆盖
          min: 0.5, //最小的缩放值
          max: 9, //最大的缩放值
        },
        edgeSymbolSize: [20, 20],
        label: {
          normal: {
            show: true,
            position: "right",
            color: "#fff",
            distance: 5,
            fontSize: 10,
          },
        },
        itemStyle: {
          borderType: [60, 4],
          borderDashOffset: 5
        },
        lineStyle: {
          normal: {
            width: 1,
            curveness: 0,
            type: "solid",
          },
        },
      },
    ],
  };
}

const getTheme = (chartData: any) => {
  
  return {
    grid,
    tooltip: {},
    visualMap: {
      min: -100,
      max: 100,
      calculable: true,
      show: false,
      inRange: {
        color: ['#2246E899', '#7643DF99', '#F243D999'],
        symbolSize: [30, 100],
      },
    },
    xAxis: {
      type: "category",
      axisLine: {
        show: false,
      },
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: "#483E7F99 ",
        },
      },
      axisLabel: {
        show: false,
      },
      data: chartData.map((item: any) => item.title),
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        type: "scatter",
        symbol: "circle",
        label: {
          normal: {
            show: true,
            formatter: (data: any) => {
              return `${data.name}\n${data.value}`
            },
            color: "#fff",
          },
        },
        itemStyle: {
          borderColor: 'source'
        },
        data: chartData.map(item => {
          return {
            name: item.title,
            value: item.quantity,
            itemStyle: {
              color: '#' + item.colorValue
            }
          }
        }),
      },
    ],
  };
}
export const getOption = (type: componentMap, chartData: any) => {
  let options = null;
  switch (type) {
    case componentMap.Time:
      options = { ...getTime(chartData) }
      break;
    case componentMap.Cooperate:
      options = { ...getCooperate(chartData) }
      console.log(options, "====d");
      break;
    case componentMap.Knowledge:
      options = { ...getKnowledge(chartData) }
      break;
    case componentMap.Distribution:
      options = { ...getDistribution(chartData) }
      break;
    case componentMap.Theme:
      options = { ...getTheme(chartData) }
      console.log(options);
      
      break;
  }
  return options
}