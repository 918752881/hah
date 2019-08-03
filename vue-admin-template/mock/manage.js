import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    dbName: '@name',
    engineId: '@integer(1,3)',
    dsDesc: '@name',
    updateTime: '@datetime',
    createUserName: '@cname',
    connStatus: '@integer(0, 1)',
    sysId: '@natural(1, 30)'
  }],
  'sysList|30': [{
    sysName: '@cname',
    'id|+1': 1
  }]
})

export default [
  {
    url: '/dataSource/addDataSource',
    type: 'post',
    response: config => {
      return {
        code: 200,
        datas: 1
      }
    }
  },
  {
    url: '/dbs/addOrUpdateDBs',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/dataSource/getDataSourceList\.*',
    type: 'get',
    response: config => {
      const items = data.items
      const count = items.length
      return {
        code: 200,
        data: items,
        count: count
      }
    }
  },
  {
    url: '/dataSource/getSys',
    type: 'get',
    response: config => {
      const items = data.sysList
      return {
        code: 200,
        data: items
      }
    }
  },
  {
    url: '/mgr/list\.*',
    type: 'get',
    response: config => {
      const items = data.sysList
      return {
        code: 200,
        data: items
      }
    }
  }
]
