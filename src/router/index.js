import Vue from 'vue'
import Router from 'vue-router'

import {fetch_menus} from '@/api'
import store from '@/store'

// 登录
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Users from '@/components/users/users'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/login',
      component:Login
    },{
      path:'/welcome',
      component:Welcome,
      children:[
        // {
        //   path:'/users',// 有 / 时访问子路由可以不拼接父路由路径
        //   component:Users
        // }
      ]
    },
    // {
    //   path:'/car',
    //   component:'',
    //   beforeEnter:function(to,form,next){

    //   }
    // }
  ]
})

// const user = {
//   path:'/users',
//   component:Users
// }
// router.options.routes[1].children.push(user)
// // router.addRoutes()这个方法可以向router实例动态添加路由,传入的是一个数组,数组中存放当前项目的所有路由规则
// router.addRoutes(router.options.routes)

// console.log(router)


// 1. 获取到用户对应的权限菜单
/*
fetch_menus().then(res=>{
  console.log(1)
  // console.log(res.data.data)
  res.data.data.forEach(v=>{
    // console.log(v)
    v.children.forEach(item=>{
      console.log(item.path)
      // 创建路由规则对象
      // 在组装路由规则时需要通过路由懒加载动态获取路由组件
      const obj =  {
        path:'/'+item.path,
        component:() => import(`@/components/${v.path}/${item.path}.vue`)
        // component: function(){
        //   return import('@/components/users/users.vue')
        // }
      }
      router.options.routes[1].children.push(obj)
    })
  })

  router.addRoutes(router.options.routes)
  console.log(router)
})
*/

// const routerList = JSON.parse(localStorage.getItem('routes')) || []

// // 如果本地存储中存在路由规则数组就不需要重新调用getters
// if(routerList.length > 0){
//   console.log(123)
//   router.options.routes[1].children = router.options.routes[1].children.concat(routerList)
// }else{
//   router.options.routes[1].children = router.options.routes[1].children.concat(store.getters.menuRoutes)
// }
// router.addRoutes(router.options.routes)

router.options.routes[1].children = router.options.routes[1].children.concat(store.getters.menuRoutes)
router.addRoutes(router.options.routes)


// 2. 遍历权限菜单,根据有几个菜单项创建几个路由规则对象
// 2.1 双重for循环进行遍历
// 2.2 需要组装路由规则对象,需要用到路由懒加载 {path:'',component:}
// 3. 将创建好的路由规则对象添加到router.options.routes[1].children
// 4. 调用router.addRoutes(router.options.routes)将所有路由规则动态添加完毕



// 路由全局守卫实现拦截
router.beforeEach(function(to,from,next){
  // to表示要去的路由
  // from表示要离开的路由
  // next本质是一个函数,就是守卫,通过调用next才能让当前函数继续向后执行

  const token = localStorage.getItem('token')
  // 判断用户是否登录,如果登录了就放行
  if(token){
    next()
  }else{
    if(to.path === '/login'){
      next()
    }else{
      next('/login')
    }
  }
})

export default router

// 用户有哪些权限菜单，路由规则就应该有哪些
// 问题:如果路由规则写死之后,假设用户没有某项菜单的权限，在地址栏输入路由路径也可以访问到对应的组件
// 解决方案:
// 动态路由:用户有哪些权限菜单,就对应加哪些路由规则
// router.addRoutes()