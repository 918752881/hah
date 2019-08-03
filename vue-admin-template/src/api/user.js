import request from '@/utils/request'
import { LOGIN, GET_INFO, LOGOUT } from './api'
export function login(data) {
  return request({
    url: LOGIN,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: GET_INFO,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: LOGOUT,
    method: 'post'
  })
}

export function loadMenu() {
  return request({
    url: '/mock-api/mgr/list',
    method: 'get'
  })
}
