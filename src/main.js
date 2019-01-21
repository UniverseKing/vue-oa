import Vue from 'vue'
import App from './App'
import router from './router'

// 当项目进入发布阶段(使用npm run build打包之后),项目中所有的打印提示都不会再控制台出现
Vue.config.productionTip = false

// 导入公共样式
import '@/css/common.css'

// 集成element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
