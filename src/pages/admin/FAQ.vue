<template>
  <div class="min-h-screen bg-secondary-50">
    <!-- Admin Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <router-link to="/admin" class="text-secondary-600 hover:text-secondary-900">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </router-link>
            <h1 class="text-xl font-semibold text-secondary-900">Kelola FAQ</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              @click="showAddModal = true"
              class="btn-primary"
            >
              Tambah FAQ
            </button>
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

      <!-- FAQ List -->
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-secondary-900">
            Daftar FAQ ({{ faqStore.faqs.length }})
          </h2>
        </div>

        <div v-if="faqStore.faqs.length === 0" class="text-center py-12">
          <svg class="h-12 w-12 mx-auto text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="mt-4 text-secondary-600">Belum ada FAQ. Tambahkan FAQ pertama Anda.</p>
          <button
            @click="showAddModal = true"
            class="mt-4 btn-primary"
          >
            Tambah FAQ
          </button>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="faq in faqStore.faqs"
            :key="faq.id"
            class="p-6 hover:bg-gray-50"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0 pr-4">
                <div class="flex items-center space-x-3 mb-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {{ getCategoryLabel(faq.kategori) }}
                  </span>
                  <span class="text-xs text-secondary-500">
                    Urutan: {{ faq.urutan }}
                  </span>
                </div>
                
                <h3 class="text-lg font-medium text-secondary-900 mb-2">
                  {{ faq.pertanyaan }}
                </h3>
                
                <p class="text-secondary-600 line-clamp-3">
                  {{ faq.jawaban }}
                </p>
                
                <p class="text-xs text-secondary-500 mt-2">
                  Dibuat: {{ formatDate(faq.created_at) }}
                </p>
              </div>
              
              <div class="flex items-center space-x-2">
                <button
                  @click="editFAQ(faq)"
                  class="text-primary-600 hover:text-primary-900 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  @click="deleteFAQ(faq)"
                  class="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="closeModal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white"
        @click.stop
      >
        <div class="mb-4">
          <h3 class="text-lg font-medium text-secondary-900">
            {{ showAddModal ? 'Tambah FAQ Baru' : 'Edit FAQ' }}
          </h3>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Question -->
          <div>
            <label class="form-label">Pertanyaan *</label>
            <textarea
              v-model="form.pertanyaan"
              required
              rows="2"
              class="form-input"
              placeholder="Masukkan pertanyaan"
            ></textarea>
          </div>

          <!-- Answer -->
          <div>
            <label class="form-label">Jawaban *</label>
            <textarea
              v-model="form.jawaban"
              required
              rows="4"
              class="form-input"
              placeholder="Masukkan jawaban lengkap"
            ></textarea>
          </div>

          <!-- Category -->
          <div>
            <label class="form-label">Kategori *</label>
            <select
              v-model="form.kategori"
              required
              class="form-input"
            >
              <option value="">Pilih kategori</option>
              <option value="layanan">Layanan</option>
              <option value="project">Project</option>
              <option value="garansi">Garansi</option>
              <option value="kerjasama">Kerjasama</option>
              <option value="umum">Umum</option>
            </select>
          </div>

          <!-- Order -->
          <div>
            <label class="form-label">Urutan *</label>
            <input
              v-model.number="form.urutan"
              type="number"
              required
              min="0"
              class="form-input"
              placeholder="0"
            >
            <p class="text-xs text-secondary-500 mt-1">
              Urutan tampil FAQ (angka kecil akan tampil lebih dulu)
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="btn-secondary"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary"
              :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
            >
              {{ isSubmitting ? 'Menyimpan...' : (showAddModal ? 'Tambah' : 'Update') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="showDeleteModal = false"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        @click.stop
      >
        <div class="text-center">
          <svg class="mx-auto mb-4 h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mb-2 text-lg font-semibold text-secondary-900">Hapus FAQ</h3>
          <p class="mb-6 text-secondary-600">
            Apakah Anda yakin ingin menghapus FAQ ini? 
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="flex justify-center space-x-3">
            <button
              @click="showDeleteModal = false"
              class="btn-secondary"
            >
              Batal
            </button>
            <button
              @click="confirmDelete"
              :disabled="isDeleting"
              class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              :class="{ 'opacity-50 cursor-not-allowed': isDeleting }"
            >
              {{ isDeleting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useFAQStore } from '@/store'
import type { FAQ } from '@/utils/supabaseClient'

const router = useRouter()
const authStore = useAuthStore()
const faqStore = useFAQStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)

const faqToDelete = ref<FAQ | null>(null)
const editingFAQ = ref<FAQ | null>(null)

const form = reactive({
  pertanyaan: '',
  jawaban: '',
  kategori: '',
  urutan: 0
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'layanan': 'Layanan',
    'project': 'Project',
    'garansi': 'Garansi',
    'kerjasama': 'Kerjasama',
    'umum': 'Umum'
  }
  return labels[category] || category.charAt(0).toUpperCase() + category.slice(1)
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (key === 'urutan') {
      form[key as keyof typeof form] = 0
    } else {
      form[key as keyof typeof form] = ''
    }
  })
  editingFAQ.value = null
}

const editFAQ = (faq: FAQ) => {
  editingFAQ.value = faq
  form.pertanyaan = faq.pertanyaan
  form.jawaban = faq.jawaban
  form.kategori = faq.kategori
  form.urutan = faq.urutan
  showEditModal.value = true
}

const deleteFAQ = (faq: FAQ) => {
  faqToDelete.value = faq
  showDeleteModal.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    let result
    if (showAddModal.value) {
      result = await faqStore.addFAQ(form)
    } else {
      result = await faqStore.updateFAQ(editingFAQ.value!.id, form)
    }

    if (result.success) {
      closeModal()
    } else {
      alert('Terjadi kesalahan: ' + result.error)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat menyimpan FAQ')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = async () => {
  if (!faqToDelete.value) return
  
  isDeleting.value = true
  
  try {
    const result = await faqStore.deleteFAQ(faqToDelete.value.id)
    if (result.success) {
      showDeleteModal.value = false
      faqToDelete.value = null
    } else {
      alert('Terjadi kesalahan: ' + result.error)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat menghapus FAQ')
  } finally {
    isDeleting.value = false
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}

onMounted(() => {
  faqStore.fetchFAQs()
})
</script>

