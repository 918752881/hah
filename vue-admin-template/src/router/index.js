import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/datamap/datamap'),
      meta: { title: '数据地图', icon: '' }
    }]
  },

  {
    path: '/meta',
    component: Layout,
    redirect: '/meta/manage',
    name: 'Meta',
    meta: { title: '元数据管理', icon: '' },
    children: [
      {
        path: 'manage',
        name: 'Manage',
        component: () => import('@/views/metadata/manage/manage'),
        meta: { title: '数据源管理', icon: 'table' }
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/metadata/task/task'),
        meta: { title: '采集任务', icon: 'tree' }
      },
      {
        path: 'scheduler',
        name: 'Scheduler',
        component: () => import('@/views/metadata/scheduler/scheduler'),
        meta: { title: '采集日志', icon: 'tree' }
      },
      {
        path: 'list/:id',
        name: 'List',
        component: () => import('@/views/metadata/list/list'),
        meta: { title: '元数据列表', icon: 'tree' }
      },
      {
        path: 'blood/:id',
        name: 'Blood',
        component: () => import('@/views/metadata/list/blood'),
        meta: { title: '血缘关系', icon: 'tree' }
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('@/views/metadata/search/search'),
        meta: { title: '元数据检索', icon: 'tree' }
      }
    ]
  },

  {
    path: '/quality',
    component: Layout,
    redirect: '/quality',
    children: [{
      path: '',
      name: 'Quality',
      component: () => import('@/views/quality/quality'),
      meta: { title: '数据质量检查', icon: '' }
    }]
  },

  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/resource',
    name: 'Sys',
    meta: { title: '配置中心', icon: '' },
    children: [
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/sys/department/department'),
        meta: { title: '部门管理', icon: '' }
      },
      {
        path: 'source',
        name: 'Source',
        component: () => import('@/views/sys/source/source'),
        meta: { title: '源系统管理', icon: '' }
      },
      {
        path: 'roleList',
        name: 'RoleList',
        component: () => import('@/views/sys/role'),
        meta: { title: '角色管理', icon: '' }
      },
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/sys/user'),
        meta: { title: '用户管理', icon: '' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
