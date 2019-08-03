import request from '@/utils/request'
import {
  GET_SOURCESYS_LIST,
  ADD_SOURCESYS,
  UPDATE_SOURCESYS,
  DELETE_SOURCESYS,
  SEARCH_SOURCESYS
} from './api'

// 列表
export function getSourceSysList(data) {
  return request({
    url: GET_SOURCESYS_LIST,
    method: 'get',
    params: data
  })
}

// 新增
export function addRourceSys(data) {
  return request({
    url: ADD_SOURCESYS,
    method: 'post',
    data: data
  })
}
// gengxin
export function updateRourceSys(data) {
  return request({
    url: UPDATE_SOURCESYS,
    method: 'post',
    data: data
  })
}

// 删除
export function deleteRourceSys(data) {
  return request({
    url: DELETE_SOURCESYS,
    method: 'post',
    data: data
  })
}

export function searchRourceSys(data) {
  return request({
    url: SEARCH_SOURCESYS,
    method: 'get',
    params: data
  })
}
