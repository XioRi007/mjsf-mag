import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue';
import useAuth from '@/composables/useAuth';
import Register from '@/views/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach((to) => {
  const { userState } = useAuth()
  console.log(userState);
  if (to.name != 'login' && to.name != 'register' && !userState.authorized )  {
    return { name: 'login' };
  }
  if ( (to.name == 'login' || to.name == 'register') && userState.authorized ) {
    return { name: 'home' }
  }
  return true;
})

export default router
