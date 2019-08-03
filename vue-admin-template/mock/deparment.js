import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    modifyTime: '@datetime',
    'id|+1': 1,
    deptName: '@cname'
  }]
})

export default [
  {
    url: '/dept/getDepts',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        count: items.length,
        datas: items
      }
    }
  },
  {
    url: '/addDeparment',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/updateDeparment',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/deleteDeparment',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
