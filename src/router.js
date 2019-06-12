import Vue from 'vue'
import Router from 'vue-router'

import Me from './views/Me.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Me',
      component: Me
    },
    {
      path: '/homelist',
      name: 'HomeList',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/HomeList.vue')
    },
    {
      path:'/hotel',
      name: 'hotel',
      component: () => import('./views/Hotel.vue')
    }
  ]
})
