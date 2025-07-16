<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">
          Frequently Asked Questions
        </h1>
        <p class="text-xl lg:text-2xl text-primary-100 max-w-4xl mx-auto">
          Temukan jawaban atas pertanyaan yang sering diajukan tentang layanan dan proses kerja kami
        </p>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="faqStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p class="mt-4 text-secondary-600">Memuat FAQ...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="faqStore.error" class="text-center py-12">
          <div class="text-red-600 mb-4">
            <svg class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-red-600 mb-4">{{ faqStore.error }}</p>
          <button
            @click="faqStore.fetchFAQs()"
            class="btn-primary"
          >
            Coba Lagi
          </button>
        </div>

        <!-- FAQ Content -->
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
                {{ getCategoryLabel(category) }}
              </button>
            </div>
          </div>

          <!-- Search -->
          <div class="mb-8">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari pertanyaan..."
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
              <svg class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- FAQ List -->
          <div class="space-y-4">
            <div
              v-for="faq in filteredFAQs"
              :key="faq.id"
              class="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                @click="toggleFAQ(faq.id)"
                class="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
              >
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium text-secondary-900 pr-4">
                    {{ faq.pertanyaan }}
                  </h3>
                  <svg
                    class="h-5 w-5 text-secondary-500 transform transition-transform duration-200"
                    :class="{ 'rotate-180': openFAQs.includes(faq.id) }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                v-show="openFAQs.includes(faq.id)"
                class="px-6 py-4 bg-gray-50 border-t border-gray-200"
              >
                <div class="prose prose-secondary max-w-none">
                  <p class="text-secondary-700 leading-relaxed">{{ faq.jawaban }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredFAQs.length === 0" class="text-center py-12">
            <div class="text-secondary-400 mb-4">
              <svg class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-secondary-600 mb-4">
              {{ searchQuery ? 'Tidak ada FAQ yang sesuai dengan pencarian Anda.' : 'Tidak ada FAQ untuk kategori ini.' }}
            </p>
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="btn-outline"
            >
              Hapus Pencarian
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-20 bg-secondary-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
          Masih Ada Pertanyaan?
        </h2>
        <p class="text-xl text-secondary-600 mb-8">
          Tim ahli kami siap membantu menjawab pertanyaan spesifik tentang kebutuhan teknologi perusahaan Anda
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/kontak"
            class="btn-primary"
          >
            Hubungi Kami
          </router-link>
          <a
            :href="`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`"
            target="_blank"
            class="btn-outline"
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
import { useFAQStore } from '@/store'
import { companyContent } from '@/data/company-content'

const faqStore = useFAQStore()
const contact = companyContent.contact

const selectedCategory = ref('semua')
const searchQuery = ref('')
const openFAQs = ref<number[]>([])

const categories = computed(() => {
  const cats = ['semua']
  const uniqueCats = [...new Set(faqStore.faqs.map(f => f.kategori))]
  return cats.concat(uniqueCats)
})

const filteredFAQs = computed(() => {
  let filtered = faqStore.faqs

  // Filter by category
  if (selectedCategory.value !== 'semua') {
    filtered = filtered.filter(f => f.kategori === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(f => 
      f.pertanyaan.toLowerCase().includes(query) || 
      f.jawaban.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'semua': 'Semua',
    'layanan': 'Layanan',
    'project': 'Project',
    'garansi': 'Garansi',
    'kerjasama': 'Kerjasama',
    'umum': 'Umum'
  }
  return labels[category] || category.charAt(0).toUpperCase() + category.slice(1)
}

const toggleFAQ = (id: number) => {
  const index = openFAQs.value.indexOf(id)
  if (index > -1) {
    openFAQs.value.splice(index, 1)
  } else {
    openFAQs.value.push(id)
  }
}

onMounted(() => {
  faqStore.fetchFAQs()
})
</script>

