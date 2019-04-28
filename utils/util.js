const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const createAnimate = (time,timing,delay,origin) => {
  const animate = wx.createAnimation({
    duration: time,
    timingFunction: timing,
    delay: delay,
    transformOrigin: origin,
    success: function (res) {
      console.log("res")
    }
  })
  return animate
}

module.exports = {
  formatTime: formatTime,
  createAnimate: createAnimate
}
