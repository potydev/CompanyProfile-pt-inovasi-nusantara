<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">
          Produk & Layanan
        </h1>
        <p class="text-xl lg:text-2xl text-primary-100 max-w-4xl mx-auto">
          Solusi teknologi komprehensif untuk transformasi digital perusahaan Anda. 
          Dari konsultasi hingga implementasi, kami siap membantu bisnis Anda berkembang.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="productsStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p class="mt-4 text-secondary-600">Memuat layanan...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="productsStore.error" class="text-center py-12">
          <div class="text-red-600 mb-4">
            <svg class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-red-600 mb-4">{{ productsStore.error }}</p>
          <button
            @click="productsStore.fetchProducts()"
            class="btn-primary"
          >
            Coba Lagi
          </button>
        </div>

        <!-- Services Content -->
        <div v-else>
          <!-- Categories Filter -->
          <div class="mb-12">
            <div class="flex flex-wrap justify-center gap-4">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                class="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                :class="selectedCategory === category 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Services Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="card hover:shadow-lg transition-shadow duration-300"
            >
              <!-- Service Image -->
              <div v-if="product.gambar_url" class="mb-6">
                <img
                  :src="product.gambar_url"
                  :alt="product.nama"
                  class="w-full h-48 object-cover rounded-lg"
                >
              </div>
              <div v-else class="mb-6">
                <div class="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                  <component :is="getServiceIcon(product.kategori)" class="h-16 w-16 text-primary-600" />
                </div>
              </div>

              <!-- Service Content -->
              <div class="flex-1">
                <div class="flex items-center justify-between mb-3">
                  <span class="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full">
                    {{ product.kategori }}
                  </span>
                  <span v-if="product.harga" class="text-primary-600 font-semibold">
                    {{ product.harga }}
                  </span>
                </div>

                <h3 class="text-xl font-semibold text-secondary-900 mb-3">
                  {{ product.nama }}
                </h3>

                <p class="text-secondary-600 mb-4">
                  {{ product.deskripsi }}
                </p>

                <!-- Features -->
                <div v-if="product.fitur && product.fitur.length > 0" class="mb-6">
                  <h4 class="font-medium text-secondary-900 mb-2">Fitur Utama:</h4>
                  <ul class="space-y-1">
                    <li
                      v-for="fitur in product.fitur.slice(0, 4)"
                      :key="fitur"
                      class="flex items-start space-x-2 text-sm text-secondary-600"
                    >
                      <svg class="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{{ fitur }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- CTA Button -->
              <div class="mt-auto">
                <router-link
                  to="/kontak"
                  class="btn-primary w-full text-center"
                >
                  Konsultasi Sekarang
                </router-link>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredProducts.length === 0" class="text-center py-12">
            <div class="text-secondary-400 mb-4">
              <svg class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-12 0H4m8 0V9m0 4v6m0-6h4m-4 0H8" />
              </svg>
            </div>
            <p class="text-secondary-600">Tidak ada layanan untuk kategori ini.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-20 bg-secondary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Proses Kerja Kami
          </h2>
          <p class="text-xl text-secondary-600">
            Metodologi yang terbukti untuk memastikan kesuksesan proyek Anda
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="text-center"
          >
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                {{ index + 1 }}
              </div>
              <div v-if="index < processSteps.length - 1" class="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-200 -translate-x-8"></div>
            </div>
            <h3 class="text-lg font-semibold text-secondary-900 mb-3">
              {{ step.title }}
            </h3>
            <p class="text-secondary-600">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">
          Siap Memulai Proyek Anda?
        </h2>
        <p class="text-xl mb-8 text-primary-100">
          Konsultasikan kebutuhan teknologi perusahaan Anda dengan tim ahli kami. 
          Dapatkan proposal dan estimasi yang sesuai dengan budget Anda.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/kontak"
            class="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
          >
            Konsultasi Gratis
          </router-link>
          <a
            :href="`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`"
            target="_blank"
            class="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
          >
            WhatsApp Kami
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/store'
import { companyContent } from '@/data/company-content'

const productsStore = useProductsStore()
const contact = companyContent.contact

const selectedCategory = ref('Semua')

const categories = computed(() => {
  const cats = ['Semua']
  const uniqueCats = [...new Set(productsStore.products.map(p => p.kategori))]
  return cats.concat(uniqueCats)
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'Semua') {
    return productsStore.products
  }
  return productsStore.products.filter(p => p.kategori === selectedCategory.value)
})

const processSteps = [
  {
    title: 'Konsultasi & Analisis',
    description: 'Memahami kebutuhan bisnis dan tantangan yang dihadapi perusahaan Anda'
  },
  {
    title: 'Perencanaan & Desain',
    description: 'Merancang solusi teknologi yang tepat sesuai dengan kebutuhan dan budget'
  },
  {
    title: 'Implementasi',
    description: 'Mengembangkan dan mengimplementasikan solusi dengan metodologi terbaik'
  },
  {
    title: 'Support & Maintenance',
    description: 'Memberikan dukungan berkelanjutan dan maintenance untuk memastikan performa optimal'
  }
]

const getServiceIcon = (kategori: string) => {
  const icons: Record<string, string> = {
    'Konsultasi': 'ConsultingIcon',
    'Development': 'DevelopmentIcon',
    'Infrastructure': 'InfrastructureIcon',
    'Analytics': 'AnalyticsIcon'
  }
  return icons[kategori] || 'DefaultServiceIcon'
}

onMounted(() => {
  productsStore.fetchProducts()
})

// Icon components
const ConsultingIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  `
}

const DevelopmentIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  `
}

const InfrastructureIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  `
}

const AnalyticsIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  `
}

const DefaultServiceIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  `
}
</script>

