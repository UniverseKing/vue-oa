/**
 * 项目中所有的请求接口都应该定义在这个文件中,其他组件中需要用到某个请求时只导入自己需要的函数即可
 */
import axios from 'axios'

// 所有的请求在发送之前都会进入这个拦截函数,在拦截函数中通过配置对象设置请求头
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('token')
  // config是请求的配置对象,里面存储的有当前的请求方法、请求路径、请求头信息
  if(token){
    config.headers.Authorization = token
  }
  return config
})

/**
 * 登录
 * {
 *  username:'admin',
 *  password:'123456'
 *  }
 */
export function fetch_login(params){
  return axios.post('http://www.lovegf.cn:8888/api/private/v1/login',params)
}

// export function fetch_menus(){
//   return axios.get('http://www.lovegf.cn:8888/api/private/v1/menus',{  
//   headers:{
//       // 设置请求头携带token信息
//       Authorization:localStorage.getItem('token')
//     }
//   })
// }

export function fetch_menus(){
  return axios.get('http://www.lovegf.cn:8888/api/private/v1/menus')
}

export function fetch_users(){

}



