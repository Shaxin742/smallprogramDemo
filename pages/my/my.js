var info = require("../../data/info.js")
import * as echarts from '../../components/ec-canvas/echarts';
const innerAudioContext = wx.createInnerAudioContext();

function getBarOption(legendData, chartData) {
  return {
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    legend: {
      // orient: 'vertical',
      // top: 'middle',
      bottom: 10,
      left: 'center',
      data: legendData
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: chartData.sort(function(a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function(idx) {
        return Math.random() * 200;
      }
    }]
  };
}
Page({
  data: {
    ecBar: {
      lazyLoad: true
    },
    legendData: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    chartData: [{
        value: 335,
        name: '直接访问'
      },
      {
        value: 310,
        name: '邮件营销'
      },
      {
        value: 274,
        name: '联盟广告'
      },
      {
        value: 235,
        name: '视频广告'
      },
      {
        value: 400,
        name: '搜索引擎'
      }
    ],
    // 轮播
    swiperCurrent: 0,
    current: 0,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showIcon:false,
    playMusic: true
  },
  watch: {
    playMusic: function (newValue) {
      console.log(newValue); // name改变时，调用该方法输出新值。
      // setTimeout(()=>{},1000)
    }
  },
  onReady() {
    this.initChart()
    innerAudioContext.src = 'http://pqe7sifjw.bkt.clouddn.com/limingqiandeheian.mp3'
    innerAudioContext.onEnded((res) => {
      this.play()
    })
  },
  onShow() {
    this.play()
  },
  onLoad: function(options) {
    getApp().setWatcher(this.data, this.watch);
    this.ecComponent = this.selectComponent('#mychart-dom-move-bar');
    wx.hideShareMenu()
    this.setData({
      info: info.info
    });
  },
  // 轮播
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swiperTap: function(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
  },

  // 初始化echart
  initChart() {
    this.ecComponent.init((canvas, width, height) => {
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(barChart);
      barChart.setOption(getBarOption(this.data.legendData, this.data.chartData));

      return barChart;
    })
  },
  pageCli() {
    this.setData({
      showIcon: false
    })
    console.log(this.data.showIcon)
  },
  // 音频
  toggleplay() {
    this.setData({
      showIcon: true
    })
    this.data.playMusic ? this.pause() : this.play()
  },
  play: function(e) {
    innerAudioContext.play();
    this.setData({
      playMusic: true
    })
  },
  //点击 停止
  pause: function() {
    innerAudioContext.pause();
    this.setData({
      playMusic: false
    })
  }
});