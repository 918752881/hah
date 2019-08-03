import request from '@/utils/request'
import {
  GET_DEPARMENT_LIST,
  ADD_DEPARMENT,
  UPDATE_DEPARMENT,
  DELETE_DEPARMENT
} from './api'

// 部门列表
export function getDeparmentList(data) {
  return request({
    url: GET_DEPARMENT_LIST,
    method: 'get',
    params: data
  })
}

// 新增
export function addDeparment(data) {
  return request({
    url: ADD_DEPARMENT,
    method: 'post',
    data: data,
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}
// gengxin
export function updateDeparment(data) {
  return request({
    url: UPDATE_DEPARMENT,
    method: 'post',
    data: data
  })
}

// 删除
export function deleteDeparment(data) {
  return request({
    url: DELETE_DEPARMENT,
    method: 'post',
    data: data
  })
}

