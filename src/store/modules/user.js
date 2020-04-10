import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken, setRefreshToken, getRefreshToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    refresh_token: getRefreshToken(),
    name: '',
    avatar: '',
    userInfo: {},
    menus: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESH_TOKEN: (state, token) => {
    state.refresh_token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const data = response
        let refreshToken = ''
        if (data.token.refreshToken) {
          refreshToken = data.token.refreshToken.value
        }
        setToken(data.token.value)
        setRefreshToken(refreshToken)
        commit('SET_TOKEN', data.token.value)
        commit('SET_REFRESH_TOKEN', refreshToken)
        commit('SET_ROLES', data.site_name)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        let data = response
        commit('SET_MENUS', data.menus)
        commit('SET_USER_INFO', data.userInfo)
        commit('SET_NAME', data.userInfo.username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

