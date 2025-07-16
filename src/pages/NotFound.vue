<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <img
          src="@/assets/images/logo-idn-icon.png"
          alt="PT. Inovasi Digital Nusantara"
          class="h-16 w-16 mx-auto mb-6"
        >
        <h1 class="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-secondary-900 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p class="text-secondary-600 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. 
          Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
        </p>
      </div>
      
      <div class="space-y-4">
        <router-link
          to="/"
          class="btn-primary w-full"
        >
          Kembali ke Beranda
        </router-link>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <router-link
            to="/layanan"
            class="btn-outline flex-1"
          >
            Lihat Layanan
          </router-link>
          <router-link
            to="/kontak"
            class="btn-outline flex-1"
          >
            Hubungi Kami
          </router-link>
        </div>
      </div>
      
      <div class="mt-12 text-sm text-secondary-500">
        <p>Butuh bantuan? Hubungi kami di:</p>
        <a
          href="mailto:info@inovasidigital.com"
          class="text-primary-600 hover:text-primary-700"
        >
          info@inovasidigital.com
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for this simple 404 page
</script>

