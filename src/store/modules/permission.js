import { componentMap, constantRoutes } from '@/router'
import { isNotBlank } from '@/utils/utils'
import Layout from '@/layout'

/**
 * 递归转换路由信息
 * @param _route
 */
function transferRouteInfo(_route) {
  _route.hidden = (_route.hidden === 1)
  _route.alwaysShow = (_route.always_show === 1)
  if (!_route.component || typeof (_route.component) === 'undefined' || 'Layout'.toLowerCase() === _route.component.toLowerCase()) {
    _route.component = Layout
  } else {
    _route.component = componentMap[_route.name]
  }
  _route.meta = {
    title: _route.title,
    icon: _route.icon,
    noCache: (_route.cache === 0),
    readOnly: (_route.read_only === 1),
  }
  if (_route.children) {
    for (let m = 0; m < _route.children.length; m++) {
      transferRouteInfo(_route.children[m])
    }
    if (_route.children.length === 0) {
      _route.children = undefined
    }
  }
}

/**
 * 将菜单树加载为路由信息
 * @param menuTree 父子关系的菜单树结构
 */
function initMenuTreeToRouter(menuTree) {
  let routers = [...menuTree]
  for (let i = 0; i < routers.length; i++) {
    transferRouteInfo(routers[i])
  }
  return routers
}

function loadPermission(names, paths, parentPath, _routers) {
  for (let i = 0; i < _routers.length; i++) {
    if (isNotBlank(_routers[i].name)) {
      names.push(_routers[i].name)
    }
    let currentFullPath = _routers[i].path
    if (isNotBlank(_routers[i].path)) {
      if (isNotBlank(parentPath)) {
        currentFullPath = parentPath + '/' + currentFullPath
        currentFullPath = currentFullPath.replace('//', '/')
      }
      paths.push(currentFullPath)
    }
    if (_routers[i].children) {
      loadPermission(names, paths, currentFullPath, _routers[i].children)
    }
  }
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMISSION_NAMES: (state, names) => {
    state.permission_names = names
  },
  SET_PERMISSION_PATHS: (state, paths) => {
    state.permission_paths = paths
  }
}

const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      let accessedRoutes = initMenuTreeToRouter(data.menus)
      // let accessedRoutes = []
      let permissionNames = []
      let permissionPaths = []
      loadPermission(permissionNames, permissionPaths, null, constantRoutes)
      loadPermission(permissionNames, permissionPaths, null, accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_PERMISSION_NAMES', permissionNames)
      commit('SET_PERMISSION_PATHS', permissionPaths)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
