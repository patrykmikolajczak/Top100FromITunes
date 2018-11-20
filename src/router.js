import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dodaj-profil',
      name: 'add-profile',
      component: () => import('./views/AddProfile.vue')
    },
    {
      path: '/wybierz-profil',
      name: 'select-profile',
      component: () => import('./views/SelectProfile.vue')
    }
  ]
})
