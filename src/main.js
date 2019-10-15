import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios';
import './plugins/iview.js'
import qs from 'qs'
import dateTime from 'vue-date-time-m'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)




Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;


Vue.component('data-time', dateTime);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
