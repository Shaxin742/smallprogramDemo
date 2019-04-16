// pages/fatherSon/fatherSon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:'没有值',
    toSonVal: '父亲的值'
  },
  onReady(){
    this.sonCom = this.selectComponent("#sonCom")
  },
  emitData(e) {
    console.log(e)
    this.setData({
      val: e.detail.val
    })
  },
  test(){
    this.sonCom.test()
  }
})