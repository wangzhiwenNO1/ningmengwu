import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
<<<<<<< HEAD
import axios from 'axios'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
=======
import axios from 'axios';
import './plugins/iview.js'
import qs from 'qs'
import dateTime from 'vue-date-time-m';

>>>>>>> 30e9e64e43fe646b37626afee0806eb59ca0a2aa


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;


Vue.component('data-time', dateTime);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
