<template>
  <div class="min-h-screen bg-secondary-50">
    <!-- Admin Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <img
              src="@/assets/images/logo-idn-icon.png"
              alt="PT. Inovasi Digital Nusantara"
              class="h-8 w-8"
            >
            <h1 class="text-xl font-semibold text-secondary-900">Admin Dashboard</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-secondary-600">
              {{ authStore.user?.email }}
            </span>
            <button
              @click="handleLogout"
              class="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-secondary-500 truncate">
                  Total Produk
                </dt>
                <dd class="text-lg font-medium text-secondary-900">
                  {{ productsStore.products.length }}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-secondary-500 truncate">
                  Total FAQ
                </dt>
                <dd class="text-lg font-medium text-secondary-900">
                  {{ faqStore.faqs.length }}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-secondary-500 truncate">
                  Total Testimoni
                </dt>
                <dd class="text-lg font-medium text-secondary-900">
                  {{ testimonialsStore.testimonials.length }}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-secondary-500 truncate">
                  Rata-rata Rating
                </dt>
                <dd class="text-lg font-medium text-secondary-900">
                  {{ averageRating.toFixed(1) }}/5
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-secondary-900">Quick Actions</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <router-link
                to="/admin/produk"
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <div class="font-medium text-secondary-900">Kelola Produk</div>
                  <div class="text-sm text-secondary-500">Tambah, edit, hapus produk</div>
                </div>
              </router-link>

              <router-link
                to="/admin/faq"
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div class="font-medium text-secondary-900">Kelola FAQ</div>
                  <div class="text-sm text-secondary-500">Tambah, edit, hapus FAQ</div>
                </div>
              </router-link>

              <router-link
                to="/admin/testimoni"
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="h-8 w-8 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <div>
                  <div class="font-medium text-secondary-900">Kelola Testimoni</div>
                  <div class="text-sm text-secondary-500">Tambah, edit, hapus testimoni</div>
                </div>
              </router-link>

              <a
                href="/"
                target="_blank"
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="h-8 w-8 text-purple-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <div class="font-medium text-secondary-900">Lihat Website</div>
                  <div class="text-sm text-secondary-500">Buka website publik</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-secondary-900">Recent Activity</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-secondary-900">
                    Website berhasil di-deploy
                  </p>
                  <p class="text-xs text-secondary-500">2 jam yang lalu</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-secondary-900">
                    Database berhasil disetup
                  </p>
                  <p class="text-xs text-secondary-500">3 jam yang lalu</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg class="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-secondary-900">
                    Admin login berhasil
                  </p>
                  <p class="text-xs text-secondary-500">Baru saja</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Data -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Products -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-secondary-900">Produk Terbaru</h3>
            <router-link
              to="/admin/produk"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Lihat Semua
            </router-link>
          </div>
          <div class="p-6">
            <div v-if="productsStore.products.length === 0" class="text-center py-4">
              <p class="text-secondary-500">Belum ada produk</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="product in productsStore.products.slice(0, 3)"
                :key="product.id"
                class="flex items-start space-x-3"
              >
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-secondary-900 truncate">
                    {{ product.nama }}
                  </p>
                  <p class="text-xs text-secondary-500">
                    {{ product.kategori }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Testimonials -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-secondary-900">Testimoni Terbaru</h3>
            <router-link
              to="/admin/testimoni"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Lihat Semua
            </router-link>
          </div>
          <div class="p-6">
            <div v-if="testimonialsStore.testimonials.length === 0" class="text-center py-4">
              <p class="text-secondary-500">Belum ada testimoni</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="testimonial in testimonialsStore.testimonials.slice(0, 3)"
                :key="testimonial.id"
                class="flex items-start space-x-3"
              >
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-secondary-900">
                    {{ testimonial.nama }}
                  </p>
                  <p class="text-xs text-secondary-500">
                    {{ testimonial.perusahaan }} • {{ testimonial.rating }}/5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useProductsStore, useFAQStore, useTestimonialsStore } from '@/store'

const router = useRouter()
const authStore = useAuthStore()
const productsStore = useProductsStore()
const faqStore = useFAQStore()
const testimonialsStore = useTestimonialsStore()

const averageRating = computed(() => {
  if (testimonialsStore.testimonials.length === 0) return 0
  const sum = testimonialsStore.testimonials.reduce((acc, t) => acc + t.rating, 0)
  return sum / testimonialsStore.testimonials.length
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}

onMounted(() => {
  // Load data for dashboard
  productsStore.fetchProducts()
  faqStore.fetchFAQs()
  testimonialsStore.fetchTestimonials()
})
</script>

