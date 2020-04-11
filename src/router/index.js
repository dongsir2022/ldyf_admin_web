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
    children: [
      {
        path: '',
        component: () => import('@/views/index'),
        name: 'home',
        meta: { title: '欢迎登录', icon: 'home', affix: true }
      }
    ],
    hidden: true
  }
  // 404 page must be placed at the end !!!
  // { path: '/404', redirect: '/404', hidden: true }
]

export const componentMap = {
  'system-account': () => import('@/views/system/account/accountIndex'),
  'system-menu': () => import('@/views/system/menu/menuIndex'),
  'system-role': () => import('@/views/system/role/roleIndex'),
  'system-role-edit': () => import('@/views/system/role/roleEditIndex'),
  'merchant-list': () => import('@/views/merchant/merchantIndex'),
  'merchant-account': () => import('@/views/merchant/merchantAccountIndex'),
  'settlement-batch': () => import('@/views/settlement/settlementBatchIndex'),
  'settlement-payable': () => import('@/views/settlement/payableIndex'),
  'settlement-receivable': () => import('@/views/settlement/receivableIndex'),
  'settlement-collect-records': () => import('@/views/settlement/collectRecordsIndex'),
  'config-split': () => import('@/views/config/splitIndex'),
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export  function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
