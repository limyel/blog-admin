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
        path: '',
        name: 'Home',
        component: () => import('../components/Home')
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('../components/Posts')
      },
      {
        path: 'posts/edit',
        name: 'PostEdit',
        component: () => import('../components/PostEdit')
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('../components/Tags')
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
