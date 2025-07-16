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
            <h1 class="text-xl font-semibold text-secondary-900">Kelola Produk & Layanan</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              @click="showAddModal = true"
              class="btn-primary"
            >
              Tambah Produk
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
      <div v-if="productsStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-secondary-600">Memuat produk...</p>
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

      <!-- Products Table -->
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-secondary-900">
            Daftar Produk & Layanan ({{ productsStore.products.length }})
          </h2>
        </div>

        <div v-if="productsStore.products.length === 0" class="text-center py-12">
          <svg class="h-12 w-12 mx-auto text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-12 0H4m8 0V9m0 4v6m0-6h4m-4 0H8" />
          </svg>
          <p class="mt-4 text-secondary-600">Belum ada produk. Tambahkan produk pertama Anda.</p>
          <button
            @click="showAddModal = true"
            class="mt-4 btn-primary"
          >
            Tambah Produk
          </button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produk
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="product in productsStore.products"
                :key="product.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4">
                  <div class="flex items-start space-x-4">
                    <div v-if="product.gambar_url" class="flex-shrink-0">
                      <img
                        :src="product.gambar_url"
                        :alt="product.nama"
                        class="h-12 w-12 object-cover rounded-lg"
                      >
                    </div>
                    <div v-else class="flex-shrink-0">
                      <div class="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-secondary-900">
                        {{ product.nama }}
                      </p>
                      <p class="text-sm text-secondary-500 line-clamp-2">
                        {{ product.deskripsi }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {{ product.kategori }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                  {{ product.harga || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                  {{ formatDate(product.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="editProduct(product)"
                      class="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteProduct(product)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
            {{ showAddModal ? 'Tambah Produk Baru' : 'Edit Produk' }}
          </h3>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="form-label">Nama Produk *</label>
            <input
              v-model="form.nama"
              type="text"
              required
              class="form-input"
              placeholder="Masukkan nama produk"
            >
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
              <option value="Konsultasi">Konsultasi</option>
              <option value="Development">Development</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Analytics">Analytics</option>
            </select>
          </div>

          <!-- Description -->
          <div>
            <label class="form-label">Deskripsi *</label>
            <textarea
              v-model="form.deskripsi"
              required
              rows="3"
              class="form-input"
              placeholder="Deskripsi produk"
            ></textarea>
          </div>

          <!-- Price -->
          <div>
            <label class="form-label">Harga</label>
            <input
              v-model="form.harga"
              type="text"
              class="form-input"
              placeholder="Mulai dari Rp 50.000.000"
            >
          </div>

          <!-- Image URL -->
          <div>
            <label class="form-label">URL Gambar</label>
            <input
              v-model="form.gambar_url"
              type="url"
              class="form-input"
              placeholder="https://example.com/image.jpg"
            >
          </div>

          <!-- Features -->
          <div>
            <label class="form-label">Fitur (pisahkan dengan enter)</label>
            <textarea
              v-model="featuresText"
              rows="4"
              class="form-input"
              placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
            ></textarea>
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
          <h3 class="mb-2 text-lg font-semibold text-secondary-900">Hapus Produk</h3>
          <p class="mb-6 text-secondary-600">
            Apakah Anda yakin ingin menghapus produk "{{ productToDelete?.nama }}"? 
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useProductsStore } from '@/store'
import type { Produk } from '@/utils/supabaseClient'

const router = useRouter()
const authStore = useAuthStore()
const productsStore = useProductsStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)

const productToDelete = ref<Produk | null>(null)
const editingProduct = ref<Produk | null>(null)

const form = reactive({
  nama: '',
  kategori: '',
  deskripsi: '',
  harga: '',
  gambar_url: '',
})

const featuresText = ref('')

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
    form[key as keyof typeof form] = ''
  })
  featuresText.value = ''
  editingProduct.value = null
}

const editProduct = (product: Produk) => {
  editingProduct.value = product
  form.nama = product.nama
  form.kategori = product.kategori
  form.deskripsi = product.deskripsi
  form.harga = product.harga || ''
  form.gambar_url = product.gambar_url || ''
  featuresText.value = product.fitur ? product.fitur.join('\n') : ''
  showEditModal.value = true
}

const deleteProduct = (product: Produk) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  
  const fitur = featuresText.value
    .split('\n')
    .map(f => f.trim())
    .filter(f => f.length > 0)

  const productData = {
    ...form,
    fitur,
    harga: form.harga || null,
    gambar_url: form.gambar_url || null
  }

  try {
    let result
    if (showAddModal.value) {
      result = await productsStore.addProduct(productData)
    } else {
      result = await productsStore.updateProduct(editingProduct.value!.id, productData)
    }

    if (result.success) {
      closeModal()
    } else {
      alert('Terjadi kesalahan: ' + result.error)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat menyimpan produk')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = async () => {
  if (!productToDelete.value) return
  
  isDeleting.value = true
  
  try {
    const result = await productsStore.deleteProduct(productToDelete.value.id)
    if (result.success) {
      showDeleteModal.value = false
      productToDelete.value = null
    } else {
      alert('Terjadi kesalahan: ' + result.error)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat menghapus produk')
  } finally {
    isDeleting.value = false
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

