import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home.vue')
    },
    {
      path: '/tentang',
      name: 'About',
      component: () => import('@/pages/About.vue')
    },
    {
      path: '/layanan',
      name: 'Services',
      component: () => import('@/pages/Services.vue')
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: () => import('@/pages/FAQ.vue')
    },
    {
      path: '/kontak',
      name: 'Contact',
      component: () => import('@/pages/Contact.vue')
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('@/pages/admin/Login.vue')
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('@/pages/admin/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboardAlias',
      component: () => import('@/pages/admin/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/produk',
      name: 'AdminProducts',
      component: () => import('@/pages/admin/Products.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/faq',
      name: 'AdminFAQ',
      component: () => import('@/pages/admin/FAQ.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/testimoni',
      name: 'AdminTestimonials',
      component: () => import('@/pages/admin/Testimonials.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue')
    }
  ]
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Simple check - in real app this would check actual auth state
    const isAuthenticated = localStorage.getItem('admin_logged_in') === 'true'
    if (!isAuthenticated) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

