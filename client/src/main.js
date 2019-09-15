import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Bus from './bus'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = axios

// 在实例上注册bus
// 在各组件中，使用this.$bus.$on()来监听绑定事件  this.$bus.$emit()来触发事件
// Vue.prototype.$bus = Bus;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
