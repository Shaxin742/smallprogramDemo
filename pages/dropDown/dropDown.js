const order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 0,
    datas: [1, 2, 3, 4, 5, 6, 7, 22, 8, 9, 33, 1, 2, 3, 4, 5, 6, 7, 22, 8, 9, 33, 1, 2, 3, 4, 5, 6, 7, 22, 8, 9, 33, 0]
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  scroll(e) {
    console.log(e)
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 3000)
  },
  onLoad() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#dadada'
    })
  },
  onReachBottom() {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 3000)
  },
  tap(e) {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})