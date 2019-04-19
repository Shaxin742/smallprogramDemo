var amapFile = require('../../libs/js/amap-wx.js');
Page({
  data: {
    key: 'b843e162c8f9889f18ddc0ffe1bb3421',
    userlat:'',
    userlot:''
  },
  onLoad: function (options) {
    var self = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        self.setData({
          userlat:res.latitude,
          userlot:res.longitude
        })
      },
    })
    var amap = new amapFile.AMapWX({
      key: this.data.key,
      zoom: 11, //初始地图级别
      center: [this.data.userlat, this.data.userlot], //初始地图中心点
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})