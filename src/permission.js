import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

function hasPermission(permissionNames, permissionPaths, _route) {
  if (_route.name) {
    return (permissionNames.indexOf(_route.name) >= 0)
  } else {
    if (whiteList.indexOf(_route.path) >= 0) {
      return true
    } else {
      return (permissionPaths) && (permissionPaths.indexOf(_route.path) >= 0)
    }
  }
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        if (hasPermission(store.getters.permission_names, store.getters.permission_paths, to)) {
          next()
        } else {
          next({ path: '/' })
        }
      } else {
        store.dispatch('user/getInfo').then(res => {
          const menus = res.menus
          store.dispatch('permission/generateRoutes', { menus }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
            if (hasPermission(store.getters.permission_names, store.getters.permission_paths, to)) {
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            } else {
              next({ path: '/' })
            }
          })
        }).catch(error => {
        })
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
