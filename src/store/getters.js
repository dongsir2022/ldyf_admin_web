const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  refresh_token: state => state.user.refresh_token,
  visitedViews: state => state.tagsView.visitedViews,
  permission_names: state => state.permission.permission_names,
  permission_paths: state => state.permission.permission_paths,
  permission_routers: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  menus: state => state.user.menus
}
export default getters
