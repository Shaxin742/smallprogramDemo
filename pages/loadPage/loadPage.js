// pages/loadPage/loadPage.js
let util = require('../../utils/util.js')
Page({
  data: {
    anima:{}
  },
  onLoad(){
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#016d88'
    })
  },
  onReady(){
    this.anima = util.createAnimate(1000, 'linear', 0, '50%,50%')
    this.addAnimate()
  },
  addAnimate(){
    this.anima.opacity(0).step().opacity(1).step().opacity(0).step().opacity(1).step()
    this.setData({
      anima: this.anima.export()
    })
  },
  tomy(){
    wx.switchTab({
      url: '../my/my',
    })
  },
  onShareAppMessage: function () {

  }
})