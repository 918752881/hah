const typeList = [{
  id: 1,
  label: 'hive'
}, {
  id: 2,
  label: 'mysql'
}, {
  id: 3,
  label: 'css'
}]

export default [
  {
    url: '/engine/getEngines',
    type: 'get',
    response: config => {
      return {
        code: 200,
        datas: typeList
      }
    }
  },
  {
    url: '/tableMeta/getTableMetaSearch',
    type: 'post',
    response: config => {
      return {
        code: 200,
        datas: [{
          tableName: 'lala',
          updateTime: '2019-01-01',
          tableDesc: '表搜搜',
          dbName: 'Mysql',
          belongSysName: 'sys',
          belongRoleName: '大数据1',
          tableId: 1,
          useTime: 100,
          useScope: 10
        }],
        count: 30

      }
    }
  },
  {
    url: '/tableMeta/getColumnMetaSearch',
    type: 'post',
    response: config => {
      return {
        code: 200,
        datas: [{
          filedName: 'aaaaa',
          filedType: 'hive',
          filedDesc: '2019-01-01',
          belongTableName: 'table2',
          belongDbName: 'css2',
          belongSysName: 'sys2',
          tableId: 1
        }],
        count: 30
      }
    }
  }
]
