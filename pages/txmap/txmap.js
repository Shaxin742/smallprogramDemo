// pages/txmap/txmap.js
var QQMapWX = require('../../libs/js/qqmap-wx-jssdk.min.js');
Page({
  data:{
    qqmapsdk:null,
    isShow: false,
    currentLo: null,
    currentLa: null,
    newCurrentLo: null,
    newCurrentLa: null,
    distance: 0,
    duration: 0,
    markers: null,
    scale: 16,
    polyline: null,
    statusType: 'car',
    includePoints: []
  },
  onLoad: function() {
    // 实例化API核心类
    this.state.qqmapsdk = new QQMapWX({
      key: 'EFFBZ-FDXWV-2JQPP-UEEZU-LRBIS-FFBKO'
    });
    var _this = this;
    wx.getLocation({
      success(res) {
        _this.setData({
          currentLo: res.longitude,
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            label: {
              anchorX: '-8px',
              anchorY: '-36px',
              content: '你',
              fontSize: '12px',
              borderWidth: '1px',
              borderColor: 'green',
              borderRadius: '4px',
              padding: '3px',
              textAlign: 'left',
              display: 'BYCLICK'
            },
            iconPath: '../../static/marker_red.png',
            width: 16,
            height: 16
          }]
        });
      }
    })
  },
  onShow: function() {
    // 调用接口
    this.state.qqmapsdk.search({
      keyword: '酒店',
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  }
})