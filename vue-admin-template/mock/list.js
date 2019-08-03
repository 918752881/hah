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

const data1 = {
  tables: [
    {
      id: '2046',
      name: '111111111',
      fields: ['1-1', '1-2', '1-3']
    },
    {
      id: '3567',
      name: '222222222',
      fields: ['2-1', '2-2', '2-3']
    },
    {
      id: '2051',
      name: '33333333',
      fields: ['3-1', '3-2', '3-3']
    },
    {
      id: '3969',
      name: '44444444',
      fields: ['4-1', '4-2', '4-3']
    },
    {
      id: '2012',
      name: '5555555',
      fields: ['5-1', '5-2', '5-3']
    },
    {
      id: '3566',
      name: '6666666',
      fields: ['6-1', '6-2', '6-3']
    },
    {
      id: '3689',
      name: '7777777',
      fields: ['7-1', '7-2', '7-3']
    }],
  tableRelations: [
    {
      applicationId: 'application_1551333222113_111010',
      sourceTableId: '3567',
      targetTableId: '3969'
    },
    {
      applicationId: 'application_1551333222113_111010',
      sourceTableId: '3969',
      targetTableId: '3566'
    },
    {
      applicationId: 'application_1551333222113_111003',
      sourceTableId: '2046',
      targetTableId: '3567'
    },
    {
      applicationId: 'application_1551333222113_111003',
      sourceTableId: '3689',
      targetTableId: '3567'
    },
    {
      applicationId: 'application_1551333222113_111003',
      sourceTableId: '2051',
      targetTableId: '3567'
    },
    {
      applicationId: 'application_1551333222113_111003',
      sourceTableId: '2012',
      targetTableId: '3567'
    }],
  currentTableId: 4837
}

export default [
  {
    url: '/bloodSource/getBloodSourceForTable',
    type: 'get',
    response: config => {
      return {
        code: 200,
        datas: data1
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
