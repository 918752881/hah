import request from '@/utils/request'
import {
  GET_DEPARMENT_LIST,
  GET_ENGINES_LIST,
  SYS_TYPE,
  GET_DBS_LIST,
  FILED_META_SEARCH,
  TABLE_META_SEARCH

} from './api'

// 部门列表
export function getdepList() {
  return request({
    url: GET_DEPARMENT_LIST,
    method: 'get'
  })
}

// 元数据类型
export function gettypeList() {
  return request({
    url: GET_ENGINES_LIST,
    method: 'get'
  })
}

// 系统列表
export function getsysList() {
  return request({
    url: SYS_TYPE,
    method: 'get'
  })
}

// 数据库列表
export function getdbList() {
  return request({
    url: GET_DBS_LIST,
    method: 'get'
  })
}

// 字段搜索列表
export function metaFiledSearch(data) {
  return request({
    url: FILED_META_SEARCH + '?' + 'page=' + data.page + '&limit=' + data.limit + '&columnComment=' + data.columnComment + '&columnName=' + data.columnName,
    method: 'post',
    data: data.formdata
  })
}

// 表级搜搜列表
export function metaTableSearch(data) {
  return request({
    url: TABLE_META_SEARCH + '?' + 'page=' + data.page + '&limit=' + data.limit + '&tableComment=' + data.tableComment + '&tableName=' + data.tableName,
    method: 'post',
    data: data.formdata
  })
}

