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
      data: chartData.sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
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
    legendData: ['html', 'css', 'js', 'vue', 'ps', '其他'],
    chartData: [
      {
        value: 335,
        name: 'html'
      },
      {
        value: 310,
        name: 'css'
      },
      {
        value: 274,
        name: 'js'
      },
      {
        value: 235,
        name: 'vue'
      },
      {
        value: 125,
        name: 'ps'
      },
      {
        value: 150,
        name: '其他'
      }
    ],
    // 轮播
    swiperCurrent: 0,
    current: 0,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showIcon: false,
    playMusic: true,
    animation: {},
    animaNum: 0
  },
  watch: {
    playMusic: function (newValue) {
      // console.log(newValue); // name改变时，调用该方法输出新值。
      // setTimeout(()=>{},1000)
    }
  },
  onReady() {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function (res) {
        console.log("res")
      }
    })
    innerAudioContext.src = 'http://pqe7sifjw.bkt.clouddn.com/limingqiandeheian.mp3'
    this.play()
    this.rotateAni()
    this.initChart()
    innerAudioContext.onEnded((res) => {
      this.play()
    })
  },
  rotateAni: function (n) {
    this.interval = setInterval(() => {
      this.data.animaNum += 1
      this.animation.rotate(10 * (this.data.animaNum)).step()
      this.setData({
        animation: this.animation.export()
      })
    }, 1000)
  },
  stopRefresh: function () {
    console.log(this.interval)
    if (this.interval > 0) {
      clearInterval(this.interval)
      this.interval = 0
    }
  },
  onShow() { },
  onLoad: function (options) {
    getApp().setWatcher(this.data, this.watch);
    this.ecComponent = this.selectComponent('#mychart-dom-move-bar');
    wx.hideShareMenu()
    this.setData({
      info: info.info
    });
  },
  // 轮播
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swiperTap: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    wx.showToast({
      title: 'id' + e.currentTarget.dataset.id,
      icon: 'success',
      duration: 2000
    })
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
  },
  // 音频
  toggleplay() {
    this.setData({
      showIcon: true
    })
    this.data.playMusic ? this.stopRefresh() : this.rotateAni();
    this.data.playMusic ? this.pause() : this.play();
  },
  play: function (e) {
    innerAudioContext.play();
    this.setData({
      playMusic: true
    })
  },
  //点击 停止
  pause: function () {
    innerAudioContext.pause();
    this.setData({
      playMusic: false
    })
  }
});