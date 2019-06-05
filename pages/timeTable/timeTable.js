// pages/timeTable/timeTable.js
Page({
  data: {
    data: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '佰', '仟', '万'],
    hourList: [],
    curHour: 0,
    dayList: [],
    curDay: 0,
    minutesList: [],
    curMin: 0,
    secondsList: [],
    curSec: 0,
    year: ''
  },
  onLoad() {
    this.dealData()
    var secondsList = JSON.parse(JSON.stringify(this.data.minutesList))
    this.setData({
      secondsList: secondsList
    })
    var sky = ['', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚']
    var land = ['', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申']
    var one = new Date().getFullYear() % 10
    var two = new Date().getFullYear() % 12
    this.setData({
      year: sky[one] + land[two]
    })
    setInterval(() => {
      this.getTime()
    }, 1000)
  },
  dealData() { // 生成数据
    // 星期
    let dayList=[];
    let hourList=[];
    let minutesList=[];

    for (let i = 0; i < 7; i++) {
      dayList.push('星期' + this.data.data[i + 1])
    }
    // 小时
    for (let i = 0; i < 24; i++) {
      console.log(i)
      if (i < 11) {
        hourList.push(this.data.data[i])
      } else {
        hourList.push((parseInt(i / 10) > 1 ? this.data.data[parseInt(i / 10)] : '') + '拾' + (parseInt(i % 10) !== 0 ? this.data.data[i % 10] : ''))
      }
    }
    // // 分钟
    for (let i = 0; i < 60; i++) {
      if (i < 11) {
        minutesList.push(this.data.data[i])
      } else {
        minutesList.push((parseInt(i / 10) > 1 ? this.data.data[parseInt(i / 10)] : '') + '拾' + (parseInt(i % 10) !== 0 ? this.data.data[i % 10] : ''))
      }
    }
    this.setData({
      dayList: dayList,
      hourList: hourList,
      minutesList: minutesList
    })
    console.log(this.data.minutesList)
  },
  getTime() { // 获取时间
    var now = new Date()
    this.setData({
      curSec: now.getSeconds(),
      curDay: now.getDay(),
      curMin: now.getMinutes(),
      curHour: now.getHours()+1
    })
  }
})