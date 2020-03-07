export default [
  {
  path: '/',
  redirect: '/index',
  component: () => import('@/views/Index.vue')
  },
  {
    path: '/index',
    component: () => import('@/views/Index.vue'),
    children: [
      {path: '', component: () => import ('@/views/Home.vue')},
      {path: '/home', name: 'Home', component: () => import ('@/views/Home.vue')},
      {path: '/infoshow', name: 'Infoshow', component: () => import ('@/views/InfoShow.vue')},
      {path: '/fundlist', name: 'FundList', component: () => import ('@/views/FundList.vue')},
      {path: '/management', name: 'Management', component: () => import('@/views/management.vue')}
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
];
