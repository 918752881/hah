import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@name',
    abbreviation: '@cfirst',
    deparment: '@cname',
    modifyTime: '@datetime'
  }]
})

const searchData = Mock.mock({
  'items|20': [{
    id: '@id',
    name: '@name',
    abbreviation: '@cfirst',
    deparment: '@cname',
    modifyTime: '@datetime'
  }]
})

export default [
  {
    url: '/getSourceSysList\.*',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        count: items.length,
        data: items
      }
    }
  },
  {
    url: '/addSourceSys',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/updateSourceSys',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/deleteSourceSys',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/searchSourceSysList\.*',
    type: 'get',
    response: config => {
      const items = searchData.items
      return {
        code: 200,
        count: items.length,
        data: items
      }
    }
  }
]
