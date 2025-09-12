import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginView.vue'),
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/Login/SignUpView.vue'),
    },
    {
      path: '/Password-reset',
      name: 'Password-reset',
      component: () => import('../views/Login/ResetPassword.vue'),
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('../views/Profile/Profile.vue'),
    },
    {
      path: '/MotivationPage',
      name: 'motivation_page',
      component: () => import('../views/MotivationPage.vue')
    },
    {
      path: '/Stats',
      name: 'stats',
      component: () => import('../views/Profile/Stats.vue')
    },
    {
      path: '/FocusList',
      name: 'focus_list',
      component: () => import('../views/FocusList.vue')
    },
  ],
})

export default router