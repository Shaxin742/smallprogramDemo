// pages/newpage/newpage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:'123',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{
      this.setData({
        val: options.val
      })
    },1000)
    app.globalData.val = '返回值'
    console.log(app.globalData.val)
  },
})