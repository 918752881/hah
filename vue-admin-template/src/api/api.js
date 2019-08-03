// export const CONTEXT = './api';
// const isDev = process.env.NODE_ENV === 'development';

// const CONTEXT = isDev ? 'https://easy-mock.com/mock/5d0b51ccd2f8f3349abf20dd/example' : 'http://10.4.89.29:8080';
const CONTEXT = '/mock-api'
const CONTEXT1 = '/api'
const WY = '/wangyi'
const YAO = '/yaoyao'
export const LOGIN = CONTEXT + '/user/login'
export const GET_INFO = CONTEXT + '/user/info'
export const LOGOUT = CONTEXT + '/user/logout'
export const CHANGE_PWD = CONTEXT + '/changePwd'
export const MSG_TOP_TEN = CONTEXT + '/messageList'
export const TEST_DATA = CONTEXT + '/static/data/data.json'

// 权限菜单
export const MENU_LIST = CONTEXT + '/menulist'

// 数据地图
export const DATA_MAP = CONTEXT1 + '/datamap/getDataMap'

// 数据源管理
export const DSINFO_LIST = WY + '/dataSource/getDataSourceList'
export const DATASOURCE_TYPE = WY + '/dataSource/getDsTypeList'
export const SYS_TYPE = WY + '/system/getSystems'

// 数据库列表
export const GET_DBS_LIST = WY + '/dbs/getDBs'
// 模糊搜索
export const SEARCH_DATASOURCE = WY + '/dataSource/getDsByDsTypeOrDsName'
export const ADD_DATASOURCE = WY + '/dataSource/addOrUpdateDataSource'
export const ADD_CONNINFO = WY + '/dbs/addOrUpdateDBs'

export const GETDBS_BY_DATASOURCEID = WY + '/dbs/getDBsByDataSourceId/'
export const DELETE_BY_DBSID = WY + '/dbs/deleteByDBsId/'
// 批量删除
export const DELETE_BYIDS = WY + '/dataSource/deleteDataSourceByIds'
export const UPDATA_DATASOURCE = CONTEXT1 + '/dataSource/updateDataSource'
export const DELETE_DATASOURCE = WY + '/dataSource/deleteDataSourceById/'
export const CONNECT_CHECK = WY + '/dbs/checkAllEngineConnection'

// 采集任务
export const GET_TASKLIST = CONTEXT1 + '/metaTask/getMetaTaskList'
export const GET_DATASOURCELIST = CONTEXT1 + '/dataSource/getDataSourceList'
export const ADD_METATASK = CONTEXT1 + '/metaTask/addMetaTask'
export const UPDATE_STATUS = CONTEXT1 + '/metaTask/updateTaskStatus'
export const SCHEDULER_EXCTASK = CONTEXT1 + '/scheduler/execTask'
export const DELETE_METATASK = CONTEXT1 + '/metaTask/deleteMetaTask'
export const UPDATE_METATASK = CONTEXT1 + '/metaTask/updateMetaTask'
export const HIVE_METASTORE = CONTEXT1 + '/metaTask/updateMetaTask'

// 采集日志
export const GET_SCHEDULETASK = CONTEXT1 + '/scheduler/getScheduleTask'

// 元数据列表
export const GET_MENU = WY + '/tableMeta/getMenu'
export const GET_TABLEMENU = WY + '/tableMeta/getTableMenuByDbId'
export const SEARCH_MENU = WY + '/tableMeta/getMenuNameByName'
export const GET_BASEINFO = WY + '/tableMeta/getTableMetaForBaseInfoById'
export const GET_ATTRSINFO = WY + '/tableParam/getTableParamByTableId'
export const GET_COLUMNINFO = WY + '/tableMeta/getTableColInfoByIdForPage'
export const GET_STOREINFO = WY + '/metaStorage/getStorageByTableId'
export const GET_STOREFORMATE = WY + '/tableMeta/getFormateInfoByTableId'
export const GET_PARTION = WY + '/metaStorage/getPartitionListByTableId'
export const GET_CHANGEHISTORY = WY + '/tableMeta/getChangeHistoryByTableId'
export const GET_RELATIONTABLE = CONTEXT1 + '/tableMeta/getBloodSourceTable'
export const GET_INFLUENCETABLE = WY + '/tableMeta/getInfuenceTableByTableId'
export const GET_QUALITY = CONTEXT1 + '/datamap/getDataCheckResult'
export const SAVE_TABLEPARAM = WY + '/tableParam/saveTableParamList'

// 元数据搜索
export const GET_ENGINES_LIST = WY + '/engine/getEngines'
export const FILED_META_SEARCH = YAO + '/tableMeta/getColumnMetaSearch'
export const TABLE_META_SEARCH = YAO + '/tableMeta/getTableMetaSearch'

// 血缘
export const GET_BLOODSOURCE_FOR_TABLE = CONTEXT + '/bloodSource/getBloodSourceForTable'

// 系统
// 部门管理
export const GET_DEPARMENT_LIST = WY + '/dept/getDepts'
export const ADD_DEPARMENT = CONTEXT + '/addDeparment'
export const UPDATE_DEPARMENT = CONTEXT + '/updateDeparment'
export const DELETE_DEPARMENT = CONTEXT + '/deleteDeparment'

// 源系统管理
export const GET_SOURCESYS_LIST = CONTEXT + '/getSourceSysList'
export const ADD_SOURCESYS = CONTEXT + '/addSourceSys'
export const UPDATE_SOURCESYS = CONTEXT + '/updateSourceSys'
export const DELETE_SOURCESYS = CONTEXT + '/deleteSourceSys'
export const SEARCH_SOURCESYS = CONTEXT + '/searchSourceSysList'

export default {
  LOGIN,
  GET_INFO,
  LOGOUT,
  // 源数据管理
  DSINFO_LIST,
  SYS_TYPE,
  GET_DBS_LIST,
  DATASOURCE_TYPE,
  SEARCH_DATASOURCE,
  DELETE_BYIDS,
  ADD_DATASOURCE,
  ADD_CONNINFO,
  GETDBS_BY_DATASOURCEID,
  DELETE_BY_DBSID,
  UPDATA_DATASOURCE,
  DELETE_DATASOURCE,
  CONNECT_CHECK,
  // 采集任务
  GET_TASKLIST,
  GET_DATASOURCELIST,
  ADD_METATASK,
  UPDATE_STATUS,
  SCHEDULER_EXCTASK,
  DELETE_METATASK,
  UPDATE_METATASK,
  HIVE_METASTORE,
  // 日志管理
  GET_SCHEDULETASK,
  // 元数据列表
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
  GET_BLOODSOURCE_FOR_TABLE,
  // 元数据搜索
  GET_ENGINES_LIST,
  FILED_META_SEARCH,
  TABLE_META_SEARCH,
  // 部门管理
  GET_DEPARMENT_LIST,
  ADD_DEPARMENT,
  UPDATE_DEPARMENT,
  DELETE_DEPARMENT,
  // 源系统管理
  GET_SOURCESYS_LIST,
  ADD_SOURCESYS,
  UPDATE_SOURCESYS,
  DELETE_SOURCESYS,
  SEARCH_SOURCESYS
}
