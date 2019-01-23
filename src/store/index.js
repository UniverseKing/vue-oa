// 1. 导入vuex
import Vuex from 'vuex'
import Vue from 'vue'
import router from '@/router'

import {
  fetch_menus
} from '@/api'

// 2. 使用Vue.use()安装vuex
Vue.use(Vuex)

// 3. 创建store实例
const store = new Vuex.Store({
  // state用于定义公共数据
  state: {
    menus: JSON.parse(localStorage.getItem('menus')) || [] // 菜单列表
  },
  // mutations用于定义修改公共数据的方法
  mutations: {
    setmenus(state, list) {
      state.menus = list
      localStorage.setItem('menus', JSON.stringify(list))
      router.push('/welcome')
    }
  },
  // 定义随着state里面数据变化而变化的数据(类似vue实例中的计算属性)
  getters: {
    // 路由规则的组装放到getters中
    // 根据menus菜单数组组装出路由规则数组
    // menus -> routes
    // 从菜单列表数组转换为路由规则数组
    menuRoutes(state) {
      let routes = []
      state.menus.forEach(v => {
        v.children.forEach(item => {
          const obj = {
            path: '/' + item.path,
            component: () => import(`@/components/${v.path}/${item.path}.vue`)
          }
          routes.push(obj)
        })
      })
      console.log(routes)
      // localStorage.setItem('routes',JSON.stringify(routes))
      return routes
    }
  },
  // 定义用于修改数据的异步方法,不直接修改数据,拿到数据之后交由mutations进行修改
  actions: {
    getmenus(context, arg) {
      fetch_menus().then(res => {
        // 将菜单数据存放到vuex的state中
        // res.data.data
        context.commit('setmenus', res.data.data)
      })
    }
  }
})

// 4. 导出store实例
export default store
