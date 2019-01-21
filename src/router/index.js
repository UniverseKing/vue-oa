import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      component:Login
    }
  ]
})
