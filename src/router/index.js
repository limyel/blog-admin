import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Theme',
    component: () => import('../views/Theme'),
    children: [
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('../views/Posts')
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
