import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import store from '@/store';
import { readFromLocalStorage } from '../utils/localStorageHandler'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/message_board',
    name: 'Message Board',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MessageBoardView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAlreadyLogin = readFromLocalStorage('isAuthenticated')
  isAlreadyLogin && store.commit('setAuthenticated', isAlreadyLogin)
  const isAuthenticated = store.state.isAuthenticated
  if (requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router
