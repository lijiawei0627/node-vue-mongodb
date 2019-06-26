import axios from 'axios'
import { Loading, Message } from 'element-ui';
// import { start } from 'repl';
import router from './router'

let loading;
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () {
  loading.close()
}
// 请求拦截
axios.interceptors.request.use(config => {
  startLoading();
  if (localStorage.Token) {
    // 设置统一的请求头
    config.headers.Authorization = localStorage.Token;
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  endLoading()
  // 错误提醒
  // Message.error(response.data.error)

  // 获取错误状态码
  const {status} = response.data
  
  if (status == 401) {
    this.$message({
      type: 'warning',
      message: 'Token失效，请重新登录'
    })
    //  清除Token
    localStorage.removeItem('Token')

    router.push('/login')
  }
  return response
}, error => {
  endLoading();
  Message.error(error.response.data)
  return Promise.reject(error)
})

export default axios