// pages/my/my.js
var info = require("../../data/info.js")
import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  console.log(echarts)
  chart = echarts.init(canvas, null, {
    width: '200px',
    height: '200px'
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({
  data: {
    info:[],
    data: {
      ec: {
        onInit: initChart
      }
    },
    imgUrls: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      }
    ],
    swiperCurrent: 0,
    current: 0,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      info: info.info
    });
  },
  onShow: function () {
    return new Promise((resolve,reject)=>{
      initChart()
      resolve()
    }).then(res=>{
      console.log(1)
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swiperTap: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
  },
})