import Vue from 'vue'
import Router from 'vue-router'

import HomeList from './views/HomeList.vue'

Vue.use(Router);

export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    // http://62.234.129.16/ningmengwu/#/
    routes: [
        {
            path: '/',
            name: 'hotel',
            component: () => import('./views/Hotel.vue')
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
            path: '/hotel',
            name: 'hotel',
            component: () => import('./views/Hotel.vue')
        },
        {
            path: '/information',
            name: 'information',
            component: () => import('./views/Information.vue')
        },
        {
            path: '/orderForm',
            name: 'orderForm',
            component: () => import('./views/OrderForm.vue')
        },
        {
            path: '/invoice',
            name: 'invoice',
            component: () => import('./views/Invoice.vue')
        },
        {
            path: '/homepage',
            name: 'homepage',
            component: () => import('./views/HomePage.vue')
        },
        {
            path: '/order',
            name: 'order',
            component: () => import('./views/OrderForm.vue')
        },
        {
            path: '/indent',
            name: 'indent',
            component: () => import('./views/Indent.vue')
        },
        {
            path: '/orderadd',
            name: 'orderadd',
            component: () => import('./views/OrderAdd.vue')
        },
        {
            path: '/me',
            name: 'me',
            component: () => import('./views/Me.vue')
        },
        {
            path: '/web',
            name: 'web',
            component: () => import('./views/WebPage.vue')
        },
        {
            path: '/webverify',
            name: 'webverify',
            component: () => import('./views/WebVerify.vue')
        },
        {
            path: '/management',
            name: 'management',
            component: () => import('./views/Management.vue')
        },
        {
            path: '/rounds',
            name: 'rounds',
            component: () => import('./views/Rounds.vue')
        },
        {
            path:"/charge",
            name:"charge",
            component: () => import('./views/Charge.vue')
        },
        {
            path:"/chargepage",
            name:"chargepage",
            component: () => import('./views/ChargePage.vue')
        }

    ]
})
