import {
  myRequest
} from '../utils/request.js'
export function login(data) {
  return myRequest(
      `/user/login`,
      {
        method: 'post',
        data
      })
  }