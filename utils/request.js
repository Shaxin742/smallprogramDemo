// const myRequest = (url, data) => {
//   const baseUrl = 'XXX';
//   const data = data || {};
//   if (wx.getStorageSync("sessionid")) {
//     data.sessionid = wx.getStorageSync("sessionid");
//   }
//   return new Promise((res, rej) => {
//     wx.request({
//       url: baseUrl + url,
//       method: "POST",
//       data: data,
//       header: {
//         'content-type': 'application/json'
//       },
//       success(obj) {
//         if (obj.statusCode >= 200 && obj.statusCode < 300 || obj.statusCode === 304) {
//           res(obj.data);
//         } else {
//           rej({
//             msg: `网络错误:${obj.statusCode}`,
//             detail: obj
//           });
//         }
//       },
//       fail(err) {
//         rej(err);
//       }
//     })
//   })
// }
export function myRequest(url, options) {
  console.log(url, options)
  const baseUrl = 'http://localhost:3366';
  if (options.method.toUpperCase() === 'GET' && options.params) {
    let searchStr = '';
    if (options.params instanceof Object) {
      for (let i in options.params) {
        searchStr += (i + '=' + options.params[i]) + '&';
      }
    }
    url = url + '?' + searchStr.substr(0, searchStr.length - 1);;
  }
  console.log('url', url)
  let token = 'token'
  console.log("token", token)
  let authToken = {}
  if (token) {
    authToken = {
      headers: {
        Authorization: token,
      },
    };
  }
  const defaultOptions = {
    credentials: 'include'
  };

  Object.assign(defaultOptions, options)

  console.log(defaultOptions)
  // if (!(options.body instanceof FormData)) {
  //   defaultOptions.headers = {
  //     'content-type': 'application/json',
  //     ...options.headers,
  //     ...authToken.headers,
  //   }
  // } else {
  //   defaultOptions.headers = {
  //     ...options.headers
  //   }
  // }
  console.log(defaultOptions)

  return new Promise((res, rej) => {
    wx.request({
      url: baseUrl + url,
      method: options.method,
      data: options.data,
      header: defaultOptions.headers,
      success(obj) {
        if (obj.statusCode >= 200 && obj.statusCode < 300 || obj.statusCode === 304) {
          res(obj.data);
        } else {
          rej({
            msg: `网络错误:${obj.statusCode}`,
            detail: obj
          });
        }
      },
      fail(err) {
        rej(err);
      }
    })
  })
}