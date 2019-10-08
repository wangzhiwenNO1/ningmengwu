import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
