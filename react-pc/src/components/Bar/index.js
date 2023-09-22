import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
function initCharts (node, title, xData, yData) {
  const myChart = echarts.init(node)
  // 绘制图表
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: yData
      }
    ]
  })
}
function Bar ({ title, xData, yData, style }) {
  const domRef = new useRef(null)
  useEffect(() => {
    initCharts(domRef.current, title, xData, yData)
  }, [])
  return (<div ref={domRef} style={style}></div>)
}
export default Bar