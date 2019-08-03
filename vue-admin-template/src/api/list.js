import request from '@/utils/request'
import {
  GET_MENU,
  GET_TABLEMENU,
  SEARCH_MENU,
  GET_BASEINFO,
  GET_ATTRSINFO,
  GET_COLUMNINFO,
  GET_STOREFORMATE,
  GET_STOREINFO,
  GET_PARTION,
  GET_CHANGEHISTORY,
  GET_RELATIONTABLE,
  GET_INFLUENCETABLE,
  GET_QUALITY,
  SAVE_TABLEPARAM,
  GET_BLOODSOURCE_FOR_TABLE
}
  from './api'

// 部门树
export function getMenuList() {
  return request({
    url: GET_MENU,
    method: 'get'
  })
}

// 加载表
export function getTableMenu(data) {
  return request({
    url: GET_TABLEMENU + '/' + data,
    method: 'get'
  })
}

// 搜索部门树
export function searchMenuList(data) {
  return request({
    url: SEARCH_MENU + '/' + data,
    method: 'get'
  })
}

// 加载基础信息
export function loadInfo(data) {
  return request({
    url: GET_BASEINFO + '/' + data, // 元数据列表
    method: 'get'
  })
}

export function loadAttrs(data) {
  return request({
    url: GET_ATTRSINFO + '/' + data, // 元数据列表
    method: 'get'
  })
}

// 加载字段信息
export function loadColumnInfo(data) {
  return request({
    url: GET_COLUMNINFO,
    method: 'get',
    params: data
  })
}

// 存储情况
export function loadStoreInfo(data) {
  return request({
    url: GET_STOREINFO + '/' + data, // 元数据列表
    method: 'get'
  })
}

// 存储格式
export function loadStoreFormate(data) {
  return request({
    url: GET_STOREFORMATE + '/' + data, // 元数据列表
    method: 'get'
  })
}

// 分区情况
export function loadPartion(data) {
  return request({
    url: GET_PARTION + '/' + data, // 元数据列表
    method: 'get'
  })
}

// 变更历史
export function loadChangeHistory(data) {
  return request({
    url: GET_CHANGEHISTORY + '/' + data, // 元数据列表
    method: 'get'
  })
}

// 血缘关系表
export function loadRelationtable(data) {
  return request({
    url: GET_RELATIONTABLE,
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

// 影响表
export function loadInfluenceTable(data) {
  return request({
    url: GET_INFLUENCETABLE + '/' + data,
    method: 'get'
  })
}

// 质量情况
export function loadQuality(data) {
  return request({
    url: GET_QUALITY,
    method: 'get',
    params: data
  })
}

// 添加修改属性借口
export function saveTableParamList(data) {
  return request({
    url: SAVE_TABLEPARAM,
    method: 'post',
    data: data
  })
}

export function getBloodSourceForTable(data) {
  return request({
    url: GET_BLOODSOURCE_FOR_TABLE + '/' + data,
    method: 'get'
  })
}
