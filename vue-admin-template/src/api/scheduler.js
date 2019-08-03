import request from '@/utils/request'
import { GET_SCHEDULETASK } from './api'
// 渲染表格
export function getScheduleTask(data) {
  return request({
    url: GET_SCHEDULETASK, // 元数据列表
    method: 'get',
    params: data
  })
}
