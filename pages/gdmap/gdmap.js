var amapFile = require('../../libs/js/amap-wx.js');
var app = getApp()
Page({
  data: {
    key: 'b843e162c8f9889f18ddc0ffe1bb3421',
    isShow: false,
    currentLo: null,
    currentLa: null,
    newCurrentLo: null,
    newCurrentLa: null,
    distance: 0,
    duration: 0,
    markers: null,
    scale: 12,
    polyline: null,
    statusType: 'car',
    includePoints: []
  },
  // getAddress: function () {
  //   var that = this;
  //   app.getPermission(that);    //传入that值可以在app.js页面直接设置内容    
  // }, 
  onLoad() {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //wgs8
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
            // label:{
            //   anchorX:'-8px',
            //   anchorY:'-36px',
            //   content: '你',
            //   fontSize: '12px',
            //   borderWidth: '1px',
            //   borderColor: 'green',
            //   borderRadius: '4px',
            //   padding: '3px',
            //   textAlign: 'left',
            //   display:'BYCLICK'
            // },
            // iconPath: '../../static/marker_red.png',
            width:16,
            height:16
          }]
        });
      },
      fail(){
        console.log(112312312313)
        // _this.getLocPermission()
        _this.getAddress()
      }
    })
  },
  getAddress(e) {
    var _this = this;
    _this.setData({
      markers : []
    })
    console.log(123123123)
    wx.chooseLocation({
      success(res) {
        var markers = _this.data.markers;
        markers.push({
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          iconPath: '../../static/marker_red.png',
          width: 32,
          height: 32
        });

        var points = _this.data.includePoints;
        points.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        _this.setData({
          newCurrentLo: res.longitude,
          newCurrentLa: res.latitude,
          includePoints: points,
          markers: markers,
          isShow: true
        });
        wx.showLoading({
          title: _this.data.isShow ? '成功' : '失败' ,
        })
        setTimeout(() => {
          wx.hideLoading()
        }, 2000)
        _this.getPolyline(_this.data.statusType);
      },
      fail(){
        
      }
    });
  },
  drawPolyline(self, color) {
    return {
      origin: this.data.currentLo + ',' + this.data.currentLa,
      destination: this.data.newCurrentLo + ',' + this.data.newCurrentLa,
      success(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        self.setData({
          distance: data.paths[0].distance,
          duration: parseInt(data.paths[0].duration / 60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
      }
    }
  },
   // 路线
  getPolyline(_type) {
    var amap = new amapFile.AMapWX({
      key: this.data.key
    });
    var self = this;
    switch (_type) {
      case 'car':
        amap.getDrivingRoute(this.drawPolyline(this, "#0091ff"));
        break;
      case 'walk':
        amap.getWalkingRoute(this.drawPolyline(this, "#1afa29"));
        break;
      case 'ride':
        amap.getRidingRoute(this.drawPolyline(this, "#1296db"));
        break;
      default:
        return false;
    }
  },
  goTo(e) {
    console.log(e)
    var _type = e.currentTarget.dataset.type;
    this.setData({
      statusType: _type
    });
    this.getPolyline(_type);
  }
})