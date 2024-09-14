import { createApp } from 'vue'
//引入父组件
import App from './App.vue'
import router from './router'
import store from './store'

//createApp创建一个vue应用实例，App是父组件
//use是使用插件，store是vuex插件，router是路由插件
//mount挂载到id为app的元素上
createApp(App).use(store).use(router).mount('#app')
