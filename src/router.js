import Vue from 'vue'
import Router from 'vue-router'

import HomeList from './views/HomeList.vue'

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HomeList',
      component: HomeList
    },
    {
      path: '/homelist',
      name: 'homeList',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/HomeList.vue')
    },
    {
      path:'/hotel',
      name: 'hotel',
      component: () => import('./views/Hotel.vue')
    },
    {
      path:'/information',
      name: 'information',
      component: () => import('./views/Information.vue')
    },
    {
      path:'/invoice',
      name: 'invoice',
      component: () => import('./views/Invoice.vue')
    },
    {
      path:'/homepage',
      name: 'homepage',
      component: () => import('./views/HomePage.vue')
    },
    {
      path:'/order',
      name: 'order',
      component: () => import('./views/OrderForm.vue')
    },
    {
      path:'/indent',
      name: 'indent',
      component: () => import('./views/Indent.vue')
    },
    {
      path:'/orderadd',
      name: 'orderadd',
      component: () => import('./views/OrderAdd.vue')
    },
    {
      path:'/me',
      name: 'me',
      component: () => import('./views/Me.vue')
    },
    {
      path:'/web',
      name: 'web',
      component: () => import('./views/WebPage.vue')
    },
    {
      path:'/webverify',
      name: 'webverify',
      component: () => import('./views/WebVerify.vue')
    },
  ]
})
