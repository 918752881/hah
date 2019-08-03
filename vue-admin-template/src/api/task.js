import request from '@/utils/request'
import { GET_TASKLIST, GET_DATASOURCELIST, ADD_METATASK, UPDATE_STATUS, SCHEDULER_EXCTASK, DELETE_METATASK, UPDATE_METATASK, HIVE_METASTORE } from './api'
// 渲染表格
export function getTaskList(data) {
  return request({
    url: GET_TASKLIST, // 元数据列表
    method: 'get',
    params: data
  })
}

// 加载数据类型选项
export function getDataSourceList(data) {
  return request({
    url: GET_DATASOURCELIST,
    method: 'post',
    data
  })
}
// 新建
export function addMetaTask(data) {
  // console.log(data)
  return request({
    url: ADD_METATASK, // 元数据列表
    method: 'post',
    data
  })
}

//  批量启用
export function onBatchUpdateStatus(data) {
  return request({
    url: UPDATE_STATUS, // 元数据列表
    method: 'post',
    data
  })
}

//  立即执行
export function onImmediatelyExecute(data) {
  return request({
    url: SCHEDULER_EXCTASK,
    method: 'post',
    data
  })
}
// 删除
export function deleteMetaTask(data) {
  return request({
    url: DELETE_METATASK,
    method: 'post',
    data
  })
}

// 编辑
export function updateMetaTask(data) {
  return request({
    url: UPDATE_METATASK,
    method: 'post',
    data
  })
}

// 全量采集Hive
export function HiveMetaStore() {
  return request({
    url: HIVE_METASTORE,
    method: 'get'
  })
}
