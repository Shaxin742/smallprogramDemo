// pages/login/login.js
import {
  myRequest
} from '../../utils/request.js'
import {
  getSongs
} from '../../api/login.js'
Page({
  data: {

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
    // getSongs(data).then(res => {
    //   console.log(res)
    // })
    myRequest(
      "/components/getSongs", {
        method: 'get',
        data
      }).then(res => {
      console.log(res)
    })
    // myRequest(
    //   "/user/login", {
    //     method: 'post',
    //     data
    //   }).then(res => {
    //   console.log(res)
    // })
  }
})