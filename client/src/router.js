import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('./views/Index.vue'),
      children: [
        {path: '', component: () => import ('./views/Home.vue')},
        {path: '/home', name: 'Home', component: () => import ('./views/Home.vue')},
        {path: '/infoshow', name: 'Infoshow', component: () => import ('./views/InfoShow.vue')},
        {path: '/fundlist', name: 'FundList', component: () => import ('./views/FundList.vue')}
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.Token? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin? next() : next('/login')
  }
})

export default router
