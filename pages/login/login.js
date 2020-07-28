import {
  login
} from '../../api/login.js'
Page({
  data: {
    form: {
      username: '',
      password: '',
    }
  },
  onShow: function() {
    wx.hideHomeButton();
    console.log(wx.getAccountInfoSync().miniProgram)
  },
  login() {
    console.log(1111)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        wx.request({
          url: 'https://api.sopans.com/third/wxOpenId.php',
          data: {
            code: res.code
          },
          success: function(wxInfo) {
            console.log(wxInfo);
            self.data.openid = wxInfo.data.openid
          }
        })
      }
    })
  },
  test() {
    let data = {
      name: '周'
    }
    getSongs(data).then(res => {
      console.log(res)
    })
    // myRequest(
    //   "/components/getSongs", {
    //     method: 'get',
    //     data
    //   }).then(res => {
    //   console.log(res)
    // })
    // myRequest(
    //   "/user/login", {
    //     method: 'post',
    //     data
    //   }).then(res => {
    //   console.log(res)
    // })
  },

  nameChange: function(e) {
    var val = e.detail.value;
    let name = 'form.username'
    this.setData({
      [name]: val
    });
  },
  pwChange: function(e) {
    var val = e.detail.value;
    let pw = 'form.password'
    this.setData({
      [pw]: val
    });
  },
  login() {
    console.log(this.data.form)
    // login(this.data.form).then(res => {
    //   console.log(res)
    //   setTimeout(function() {
    //     wx.reLaunch({
    //       url: '../my/my',
    //     })
    //   }, 1500);
    // })
  }
})