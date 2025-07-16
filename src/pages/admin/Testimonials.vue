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
            <h1 class="text-xl font-semibold text-secondary-900">Kelola Testimoni</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              @click="showAddModal = true"
              class="btn-primary"
            >
              Tambah Testimoni
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
      <div v-if="testimonialsStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-secondary-600">Memuat testimoni...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="testimonialsStore.error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-red-600 mb-4">{{ testimonialsStore.error }}</p>
        <button
          @click="testimonialsStore.fetchTestimonials()"
          class="btn-primary"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Testimonials Grid -->
      <div v-else>
        <div class="mb-6">
          <h2 class="text-lg font-medium text-secondary-900">
            Daftar Testimoni ({{ testimonialsStore.testimonials.length }})
          </h2>
        </div>

        <div v-if="testimonialsStore.testimonials.length === 0" class="text-center py-12 bg-white rounded-lg shadow">
          <svg class="h-12 w-12 mx-auto text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <p class="mt-4 text-secondary-600">Belum ada testimoni. Tambahkan testimoni pertama Anda.</p>
          <button
            @click="showAddModal = true"
            class="mt-4 btn-primary"
          >
            Tambah Testimoni
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="testimonial in testimonialsStore.testimonials"
            :key="testimonial.id"
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <!-- Rating -->
            <div class="flex items-center mb-4">
              <div class="flex">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="h-5 w-5"
                  :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-2 text-sm text-secondary-600">{{ testimonial.rating }}/5</span>
            </div>

            <!-- Message -->
            <blockquote class="text-secondary-700 mb-4">
              "{{ testimonial.pesan }}"
            </blockquote>

            <!-- Author Info -->
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold text-secondary-900">{{ testimonial.nama }}</div>
                <div class="text-sm text-secondary-600">{{ testimonial.jabatan }}</div>
                <div class="text-sm text-secondary-500">{{ testimonial.perusahaan }}</div>
                <div class="text-xs text-secondary-400 mt-1">
                  {{ formatDate(testimonial.created_at) }}
                </div>
              </div>
              
              <!-- Photo -->
              <div v-if="testimonial.foto_url" class="flex-shrink-0">
                <img
                  :src="testimonial.foto_url"
                  :alt="testimonial.nama"
                  class="h-12 w-12 object-cover rounded-full"
                >
              </div>
              <div v-else class="flex-shrink-0">
                <div class="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-primary-600 font-semibold">
                    {{ testimonial.nama.split(' ').map(n => n[0]).join('').slice(0, 2) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
              <button
                @click="editTestimonial(testimonial)"
                class="text-primary-600 hover:text-primary-900 text-sm font-medium"
              >
                Edit
              </button>
              <button
                @click="deleteTestimonial(testimonial)"
                class="text-red-600 hover:text-red-900 text-sm font-medium"
              >
                Hapus
              </button>
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
            {{ showAddModal ? 'Tambah Testimoni Baru' : 'Edit Testimoni' }}
          </h3>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="form-label">Nama *</label>
            <input
              v-model="form.nama"
              type="text"
              required
              class="form-input"
              placeholder="Nama lengkap"
            >
          </div>

          <!-- Company -->
          <div>
            <label class="form-label">Perusahaan *</label>
            <input
              v-model="form.perusahaan"
              type="text"
              required
              class="form-input"
              placeholder="Nama perusahaan"
            >
          </div>

          <!-- Position -->
          <div>
            <label class="form-label">Jabatan *</label>
            <input
              v-model="form.jabatan"
              type="text"
              required
              class="form-input"
              placeholder="Jabatan di perusahaan"
            >
          </div>

          <!-- Message -->
          <div>
            <label class="form-label">Pesan Testimoni *</label>
            <textarea
              v-model="form.pesan"
              required
              rows="4"
              class="form-input"
              placeholder="Tulis testimoni atau review tentang layanan kami"
            ></textarea>
          </div>

          <!-- Rating -->
          <div>
            <label class="form-label">Rating *</label>
            <select
              v-model.number="form.rating"
              required
              class="form-input"
            >
              <option value="">Pilih rating</option>
              <option value="5">⭐⭐⭐⭐⭐ (5 - Sangat Baik)</option>
              <option value="4">⭐⭐⭐⭐ (4 - Baik)</option>
              <option value="3">⭐⭐⭐ (3 - Cukup)</option>
              <option value="2">⭐⭐ (2 - Kurang)</option>
              <option value="1">⭐ (1 - Sangat Kurang)</option>
            </select>
          </div>

          <!-- Photo URL -->
          <div>
            <label class="form-label">URL Foto</label>
            <input
              v-model="form.foto_url"
              type="url"
              class="form-input"
              placeholder="https://example.com/photo.jpg"
            >
            <p class="text-xs text-secondary-500 mt-1">
              Opsional. Jika tidak diisi, akan menggunakan inisial nama.
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
          <h3 class="mb-2 text-lg font-semibold text-secondary-900">Hapus Testimoni</h3>
          <p class="mb-6 text-secondary-600">
            Apakah Anda yakin ingin menghapus testimoni dari "{{ testimonialToDelete?.nama }}"? 
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
import { useAuthStore, useTestimonialsStore } from '@/store'
import type { Testimoni } from '@/utils/supabaseClient'

const router = useRouter()
const authStore = useAuthStore()
const testimonialsStore = useTestimonialsStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)

const testimonialToDelete = ref<Testimoni | null>(null)
const editingTestimonial = ref<Testimoni | null>(null)

const form = reactive({
  nama: '',
  perusahaan: '',
  jabatan: '',
  pesan: '',
  rating: 5,
  foto_url: ''
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (key === 'rating') {
      form[key as keyof typeof form] = 5
    } else {
      form[key as keyof typeof form] = ''
    }
  })
  editingTestimonial.value = null
}

const editTestimonial = (testimonial: Testimoni) => {
  editingTestimonial.value = testimonial
  form.nama = testimonial.nama
  form.perusahaan = testimonial.perusahaan
  form.jabatan = testimonial.jabatan
  form.pesan = testimonial.pesan
  form.rating = testimonial.rating
  form.foto_url = testimonial.foto_url || ''
  showEditModal.value = true
}

const deleteTestimonial = (testimonial: Testimoni) => {
  testimonialToDelete.value = testimonial
  showDeleteModal.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  
  const testimonialData = {
    ...form,
    foto_url: form.foto_url || null
  }
  
  try {
    let result
    if (showAddModal.value) {
      result = await testimonialsStore.addTestimonial(testimonialData)
    } else {
      result = await testimonialsStore.updateTestimonial(editingTestimonial.value!.id, testimonialData)
    }

    if (result.success) {
      closeModal()
    } else {
      alert('Terjadi kesalahan: ' + result.error)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat menyimpan testimoni')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = async () => {
  if (!testimonialToDelete.value) return
  
  isDeleting.value = true
  
  try {
    const result = await testimonialsStore.deleteTestimonial(testimonialToDelete.value.id)
    if (result.success) {
      showDeleteModal.value = false
      testimonialToDelete.value = null
    } else {
      alert('Terjadi kesalahan: ' + result.error)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat menghapus testimoni')
  } finally {
    isDeleting.value = false
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}

onMounted(() => {
  testimonialsStore.fetchTestimonials()
})
</script>

