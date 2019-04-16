Component({

  behaviors: [],

  properties: {
    sonVal: String
  },
  data: {

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },

  methods: {
    emitData: function () {
      this.triggerEvent('myevent', { val: '儿子的值' });
    },

    bindCode(e) {
      var that = this;
      console.log(e.detail)
      var val = e.detail.value; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('myevent', myEventDetail)
    },
    
    test(){
      wx.showLoading({
        title: '调用成功',
      })
      setTimeout(()=>{
        wx.hideLoading()
      },2000)
    }
  }
})