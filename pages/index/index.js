//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    rebackVal:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShareAppMessage: function () {
    return {
      title: '我好帅',
      path: '/pages/gdmap'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  buy(){
    wx.navigateTo({
      url: '../projects/projects'
    })
  },
  tobdmap(){
    wx.navigateTo({
      url: '../bdmap/bdmap'
    })
  },
  togdmap(){
    wx.navigateTo({
      url: '../gdmap/gdmap'
    })
  },
  txmap(){
    wx.navigateTo({
      url: '../txmap/txmap'
    })
  },
  msg(){
    wx.navigateTo({
      url: '../newpage/newpage?val=1'
    })
  }, 
  echarts() {
    wx.navigateTo({
      url: '../echarts/echarts'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow(){
    console.log(app.globalData.val)
    var v = app.globalData.val
    this.setData({
      rebackVal: v
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
