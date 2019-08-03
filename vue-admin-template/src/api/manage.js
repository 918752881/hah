import request from '@/utils/request'
import {
  DSINFO_LIST,
  SYS_TYPE,
  GET_DBS_LIST,
  DATASOURCE_TYPE,
  GETDBS_BY_DATASOURCEID,
  DELETE_BY_DBSID,
  UPDATA_DATASOURCE,
  DELETE_DATASOURCE,
  SEARCH_DATASOURCE,
  DELETE_BYIDS,
  ADD_DATASOURCE,
  ADD_CONNINFO,
  CONNECT_CHECK
} from './api'
// 元数据列表
export function getList(params) {
  return request({
    url: DSINFO_LIST, // 元数据列表
    method: 'get',
    params: { page: params.page, limit: params.limit }
  })
}

// 加载数据类型选项
export function getdsTypeList() {
  return request({
    url: DATASOURCE_TYPE, // 元数据列表
    method: 'get'
  })
}

// 系统列表
export function getSysList() {
  return request({
    url: SYS_TYPE,
    method: 'get'
  })
}

// 数据库列表
export function getdbsList() {
  return request({
    url: GET_DBS_LIST,
    method: 'get'
  })
}

//  搜索
export function searchDataSource(data) {
  return request({
    url: SEARCH_DATASOURCE, // 元数据列表
    method: 'post',
    data
  })
}

//  新建
export function addDataSource(data) {
  return request({
    url: ADD_DATASOURCE, // 元数据列表
    method: 'post',
    data
  })
}

// 新建链接信息
export function addConnInfo(data) {
  return request({
    url: ADD_CONNINFO,
    method: 'post',
    data
  })
}

// 删除多行
export function deleteByIds(data) {
  return request({
    url: DELETE_BYIDS, // 元数据列表
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

// 编辑获取信息
export function getDBsByDataSourceId(data) {
  return request({
    url: GETDBS_BY_DATASOURCEID + data, // 更新
    method: 'get'
  })
}

// 编辑提交
export function updateDataSource(data) {
  return request({
    url: UPDATA_DATASOURCE, // 更新
    method: 'post',
    data
  })
}

// 点击删除一行信息
export function deleteDataSource(data) {
  return request({
    url: DELETE_DATASOURCE + data,
    method: 'get'
  })
}

// 删除行里的链接信息
export function deleteByDBsId(data) {
  return request({
    url: DELETE_BY_DBSID + data,
    method: 'get'
  })
}
// 连通性检测
export function connectCheck(data) {
  return request({
    url: CONNECT_CHECK,
    method: 'post',
    data
  })
}
