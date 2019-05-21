var info = require("../../data/info.js")
import * as echarts from '../../components/ec-canvas/echarts';
const innerAudioContext = wx.createInnerAudioContext();
const util = require('../../utils/util.js')
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
      data: legendData,
      zIndex:1,
      "textStyle": {
        "fontSize": 14
      }
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: chartData.sort(function (a, b) {
        return a.value - b.value;
      }),
      zIndex: 1,
      "textStyle": {
        "fontSize": 18
      },
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
    legendData: ['html', 'css', 'js', 'vue', '其他', 'ps'],
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
        value: 150,
        name: '其他'
      },
      {
        value: 125,
        name: 'ps'
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
    animaNum: 0,
    averAni: {},
    nameAni: {},
    infoAni: {},
  },
  watch: {
    playMusic: function (newValue) {
      // console.log(newValue); // name改变时，调用该方法输出新值。
      // setTimeout(()=>{},1000)
    }
  },
  onReady() {
    this.animation = util.createAnimate(1000,'linear',0,'50%,50%')
    this.averAni = util.createAnimate(200,'linear',0,'50%,50%')
    this.nameAni = util.createAnimate(200,'linear',300,'50%,50%')
    this.infoAni = util.createAnimate(200,'linear',500,'50%,50%')
    innerAudioContext.src = 'http://pqe7sifjw.bkt.clouddn.com/limingqiandeheian.mp3'
    console.log(innerAudioContext.src)
    // innerAudioContext.src = 'https://music.163.com/song?id=1349292048&userid=571759763'
    this.play() // 播放歌曲
    this.addAnimate() // 歌曲背景转动
    this.initChart() // echarts展示
    innerAudioContext.onEnded((res) => {
      this.play()
    })
  },
  addAnimate: function (n) {
    this.interval = setInterval(() => {
      this.data.animaNum += 1
      this.animation.rotate(10 * (this.data.animaNum)).step()
      this.setData({
        animation: this.animation.export()
      })
    }, 1000)
    this.averAni.scale3d(1, 1, 1).step().scale3d(1.25, 0.75, 1).step().scale3d(0.75, 1.25, 1).step().scale3d(1.15, 0.85, 1).step().scale3d(.95, 1.05, 1).step().scale3d(1.05, .95, 1).step().scale3d(1, 1, 1).step();
    this.setData({
      averAni: this.averAni.export()
    })
    this.nameAni.opacity(0).translate3d(0, '100%', 0).step().opacity(1).translate3d(0, 0, 0).step()
    this.setData({
      nameAni: this.nameAni.export()
    })
    this.infoAni.opacity(0).translate3d(0, '100%', 0).step().opacity(1).translate3d(0, 0, 0).step()
    this.setData({
      infoAni: this.infoAni.export()
    })
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
  rotateAni(){
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