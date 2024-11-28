import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tasks from '../views/Tasks.vue'
import SignUpView from '../views/SignUpView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUpView.vue'),
    },
  ],
})

export default router
