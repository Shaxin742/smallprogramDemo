//app.js
App({
  onLaunch: function() {
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res)
    //     //session 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })
    // wx.checkSession({
    //   success: function(res) {
    //     console.log(res)
    //     //session 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function () {
    //     console.log(222)
    //     //登录态过期
    //     wx.login({
    //       success: res => {
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    console.log(logs)
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.showToast({
            title: '请授权登录！',
            icon: 'none',
            duration: 1500,
            success: function () {
              //定时器，未授权1.5秒后跳转授权页面
              // setTimeout(function () {
              //   wx.reLaunch({
              //     url: '../login/login',
              //   })
              // }, 1500);
            }
          })
        }
      }
    })
  },
  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },

  /**
   * 监听属性 并执行监听函数
   */
  observe(obj, key, watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function() {
        return val;
      }
    })
  },
  globalData: {
    userInfo: null,
    latitude: null,
    val: '全局状态',
    longitude: null
  },
  onHide() {
    wx.setEnableDebug({
      enableDebug: true
    })
  },

  // 地图授权
  getLocPermission() {
    wx.getSetting({
      success: function(res) {
        console.log(res)
        var statu = res.authSetting;
        if (!statu['scope.userLocation']) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function(tip) {
              if (tip.confirm) {
                console.log(res)
                wx.openSetting({
                  success: function(data) {
                    if (data.authSetting["scope.userLocation"] === true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //授权成功之后，再调用chooseLocation选择地方
                      wx.chooseLocation({
                        success: function(res) {
                          obj.setData({
                            addr: res.address
                          })
                        },
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '调用授权窗口失败',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  getPermission: function(obj) {
    wx.getLocation({
      fail: function() {
        wx.getSetting({
          success: function(res) {
            console.log(res)
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              this.getLocPermission()
            }
          },
          fail: function(res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  }
})