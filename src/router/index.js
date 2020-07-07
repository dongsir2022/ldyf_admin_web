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
        meta: { title: '交易一览', icon: 'home', affix: true }
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
  'merchant-list': () => import('@/views/merchant/merchantListIndex'),
  'merchant-account': () => import('@/views/merchant/merchantAccountIndex'),
  'merchant-tradeTerminal-list': () => import('@/views/merchant/tradeTerminalListIndex'),
  'merchant-tradeTerminal-info': () => import('@/views/merchant/tradeTerminalInfoIndex'),
  'merchant-info': () => import('@/views/merchant/merchantInfoIndex'),
  'settlement-batch': () => import('@/views/settlement/settlementBatchIndex'),
  'settlement-payable': () => import('@/views/settlement/payableIndex'),
  'settlement-receivable': () => import('@/views/settlement/receivableIndex'),
  'settlement-collect-records': () => import('@/views/settlement/collectRecordsIndex'),
  'config-split': () => import('@/views/config/split/splitIndex'),
  'config-split-temp': () => import('@/views/config/split/splitTempIndex'),
  'config-holiday': () => import('@/views/config/holiday/holidayIndex'),
  'config-appVersion': () => import('@/views/config/appVersion/appVersionIndex'),
  'merchant-withdraw-record': () => import('@/views/merchant/withdrawRecordIndex'),
  'merchant-settle': () => import('@/views/merchant/merchantSettleIndex'),
  'payment-list': () => import('@/views/payment/paymentIndex'),
  'work-merchant-approve-list': () => import('@/views/work/merchant/merchantApproveListIndex'),
  'work-merchant-approve-page': () => import('@/views/work/merchant/merchantApproveIndex'),
  'merchant-tradeDevice-list': () => import('@/views/merchant/tradeDeviceListIndex'),
  'config-agency-list': () => import('@/views/config/agencyInfo/agencyInfoListIndex'),
  'config-commonProblem-list': () => import('@/views/config/commonProblemInfo/commonProblemInfoIndex'),
  'reconciliation-internal-list': () => import('@/views/reconciliation/internalBillLogIndex'),
  'reconciliation-external-list': () => import('@/views/reconciliation/externalBillLogIndex'),
  'config-notice-list': () => import('@/views/config/noticeInfo/noticeInfoIndex'),
  'system-customer-manager': () => import('@/views/system/customerManager/customerManager'),
  'settlement-query': () => import('@/views/settlement/queryList'),
  'config-qrCode': () => import('@/views/config/qrCode/qrCodeIndex'),
  'config-cloudHorn': () => import('@/views/config/cloudHorn/cloudHornIndex')
}

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
