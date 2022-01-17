import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
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
      },
      {
        path: 'abouts',
        name: 'Abouts',
        component: () => import('../components/Abouts')
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    return next();
  }
  let token = window.localStorage.JWT_TOKEN;
  if (!token) {
    return next('/login');
  }
  next();
})

export default router
