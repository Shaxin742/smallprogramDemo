import {
  myRequest
} from '../utils/request.js'
export function getSongs(data) {
  console.log(data)
  return myRequest(
      `user/login`,
      {
        method: 'post',
        data
      })
  }