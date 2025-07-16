<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <img 
            src="/src/assets/images/logo-idn-icon.png" 
            alt="IDN Logo" 
            class="h-10 w-10"
          />
          <div class="flex flex-col">
            <span class="text-xl font-bold text-secondary-800">PT. Inovasi Digital</span>
            <span class="text-sm text-secondary-600">Nusantara</span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="nav-link">Beranda</router-link>
          <router-link to="/tentang" class="nav-link">Tentang Kami</router-link>
          <router-link to="/layanan" class="nav-link">Layanan</router-link>
          <router-link to="/faq" class="nav-link">FAQ</router-link>
          <router-link to="/kontak" class="nav-link">Kontak</router-link>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <router-link to="/kontak" class="btn-primary">
            Konsultasi Gratis
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              v-if="!mobileMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div 
        v-show="mobileMenuOpen"
        class="md:hidden border-t border-gray-200 py-4 animate-fade-in"
      >
        <div class="flex flex-col space-y-4">
          <router-link 
            to="/" 
            class="nav-link block py-2"
            @click="closeMobileMenu"
          >
            Beranda
          </router-link>
          <router-link 
            to="/tentang" 
            class="nav-link block py-2"
            @click="closeMobileMenu"
          >
            Tentang Kami
          </router-link>
          <router-link 
            to="/layanan" 
            class="nav-link block py-2"
            @click="closeMobileMenu"
          >
            Layanan
          </router-link>
          <router-link 
            to="/faq" 
            class="nav-link block py-2"
            @click="closeMobileMenu"
          >
            FAQ
          </router-link>
          <router-link 
            to="/kontak" 
            class="nav-link block py-2"
            @click="closeMobileMenu"
          >
            Kontak
          </router-link>
          <div class="pt-4">
            <router-link 
              to="/kontak" 
              class="btn-primary w-full text-center"
              @click="closeMobileMenu"
            >
              Konsultasi Gratis
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

