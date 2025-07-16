<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">
          {{ content.contact.title }}
        </h1>
        <p class="text-xl lg:text-2xl text-primary-100 max-w-4xl mx-auto">
          {{ content.contact.subtitle }}
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <div class="card">
              <h2 class="text-2xl font-bold text-secondary-900 mb-6">
                Kirim Pesan
              </h2>
              
              <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Name -->
                <div>
                  <label for="name" class="form-label">
                    Nama Lengkap *
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="form-input"
                    placeholder="Masukkan nama lengkap Anda"
                  >
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="form-label">
                    Email *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="form-input"
                    placeholder="nama@perusahaan.com"
                  >
                </div>

                <!-- Phone -->
                <div>
                  <label for="phone" class="form-label">
                    Nomor Telepon
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="form-input"
                    placeholder="+62 812 3456 7890"
                  >
                </div>

                <!-- Company -->
                <div>
                  <label for="company" class="form-label">
                    Nama Perusahaan
                  </label>
                  <input
                    id="company"
                    v-model="form.company"
                    type="text"
                    class="form-input"
                    placeholder="PT. Nama Perusahaan"
                  >
                </div>

                <!-- Service Interest -->
                <div>
                  <label for="service" class="form-label">
                    Layanan yang Diminati
                  </label>
                  <select
                    id="service"
                    v-model="form.service"
                    class="form-input"
                  >
                    <option value="">Pilih layanan</option>
                    <option value="konsultasi">Konsultasi Digital Transformation</option>
                    <option value="development">Pengembangan Aplikasi</option>
                    <option value="infrastructure">Cloud Infrastructure</option>
                    <option value="analytics">Data Analytics & BI</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <!-- Budget Range -->
                <div>
                  <label for="budget" class="form-label">
                    Estimasi Budget
                  </label>
                  <select
                    id="budget"
                    v-model="form.budget"
                    class="form-input"
                  >
                    <option value="">Pilih range budget</option>
                    <option value=">50jt">Rp 50 Juta</option>
                    <option value="50-100jt">Rp 50 - 100 Juta</option>
                    <option value="100-500jt">Rp 100 - 500 Juta</option>
                    <option value="500jt-1m">Rp 500 Juta - 1 Miliar</option>
                    <option value="> 1m">> Rp 1 Miliar</option>
                  </select>
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="form-label">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    required
                    rows="5"
                    class="form-input"
                    placeholder="Ceritakan tentang kebutuhan teknologi perusahaan Anda..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="btn-primary w-full"
                    :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
                  >
                    <span v-if="isSubmitting" class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </span>
                    <span v-else>Kirim Pesan</span>
                  </button>
                </div>
              </form>

              <!-- Success Message -->
              <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div class="flex">
                  <svg class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div class="ml-3">
                    <p class="text-sm text-green-700">
                      Pesan Anda telah berhasil dikirim! Tim kami akan menghubungi Anda dalam 1x24 jam.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="showError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div class="flex">
                  <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div class="ml-3">
                    <p class="text-sm text-red-700">
                      Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi kami langsung.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Contact Details -->
            <div class="card">
              <h2 class="text-2xl font-bold text-secondary-900 mb-6">
                Informasi Kontak
              </h2>
              
              <div class="space-y-6">
                <!-- Address -->
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-secondary-900">Alamat</h3>
                    <p class="text-secondary-600">
                      {{ content.contact.address.street }}<br>
                      {{ content.contact.address.city }}<br>
                      {{ content.contact.address.country }}
                    </p>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-secondary-900">Telepon</h3>
                    <p class="text-secondary-600">{{ content.contact.phone }}</p>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-secondary-900">Email</h3>
                    <p class="text-secondary-600">{{ content.contact.email }}</p>
                  </div>
                </div>

                <!-- WhatsApp -->
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-secondary-900">WhatsApp</h3>
                    <p class="text-secondary-600">{{ content.contact.whatsapp }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="card">
              <h2 class="text-2xl font-bold text-secondary-900 mb-6">
                Hubungi Kami Langsung
              </h2>
              
              <div class="space-y-4">
                <a
                  :href="`https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}`"
                  target="_blank"
                  class="btn-primary w-full text-center flex items-center justify-center space-x-2"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                  </svg>
                  <span>Chat WhatsApp</span>
                </a>
                
                <a
                  :href="`tel:${content.contact.phone}`"
                  class="btn-outline w-full text-center flex items-center justify-center space-x-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Telepon Sekarang</span>
                </a>
                
                <a
                  :href="`mailto:${content.contact.email}`"
                  class="btn-secondary w-full text-center flex items-center justify-center space-x-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Kirim Email</span>
                </a>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="card">
              <h2 class="text-2xl font-bold text-secondary-900 mb-6">
                Jam Operasional
              </h2>
              
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-secondary-600">Senin - Jumat</span>
                  <span class="font-medium text-secondary-900">09:00 - 18:00 WIB</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-secondary-600">Sabtu</span>
                  <span class="font-medium text-secondary-900">09:00 - 15:00 WIB</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-secondary-600">Minggu</span>
                  <span class="font-medium text-secondary-900">Tutup</span>
                </div>
              </div>
              
              <div class="mt-4 p-3 bg-primary-50 rounded-lg">
                <p class="text-sm text-primary-700">
                  <strong>Catatan:</strong> Untuk konsultasi darurat, Anda dapat menghubungi kami melalui WhatsApp 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { companyContent } from '@/data/company-content'

const content = companyContent

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real application, you would send the form data to your backend
    console.log('Form submitted:', form)
    
    // Reset form
    Object.keys(form).forEach(key => {
      form[key as keyof typeof form] = ''
    })
    
    showSuccess.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Form submission error:', error)
    showError.value = true
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

