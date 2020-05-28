import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getRefreshToken, getToken, removeCookie, setToken } from '@/utils/auth'
import { refreshToken } from '@/api/user'
import { isNotBlank } from '@/utils/utils'
import router from '../router'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (config.method === 'GET' || config.method === 'POST') {
      config.data = qs.stringify(config.data)
    }
    if (config.baseURL.indexOf('http://') > 0) {
      config.url = config.baseURL
    }
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === -1) {
      Message({
        message: res.message,
        type: 'error',
        duration: 2000
      })
      return Promise.reject(res)
    } else if (res.code === 200) {
      return res
    } else if (res.code === 400 || res.code === 401) {
      let requestUrl = response.config.url
      //刷新token
      let token = getRefreshToken()
      let refreshResult = false
      if (isNotBlank(token)) {
        refreshToken(token).then(res => {
          refreshResult = true
          setToken(res.token.value)
        }).catch(res => {
          removeCookie()
        })
      }
      if (!refreshResult) {
        router.replace({
          path: '/'
        })
      }
    } else {
      let errorMessage = res
      if (res.hasOwnProperty('code')) {
        errorMessage = res.message
      }
      Message({
        message: errorMessage,
        type: 'error',
        duration: 2000
      })
      return Promise.reject(res)
    }
  },
  error => {
    //debug
    if (error.response.data.code === 400 || error.response.data.code === 401) {
      removeCookie()
      router.replace({
        path: '/'
      })
    } else {
      if (error.response && error.response.data.errors) {
        Message({
          message: error.response.data.errors[0].defaultMessage,
          type: 'error',
          duration: 2000
        })
      } else {
        if (error.response && error.response.data.message) {
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 2000
          })
        } else {
          Message({
            message: error.message,
            type: 'error',
            duration: 2000
          })
        }
      }
    }
    return Promise.reject(error)
  }
)

export default service
