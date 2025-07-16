<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">
          {{ content.about.title }}
        </h1>
        <p class="text-xl lg:text-2xl text-primary-100 max-w-4xl mx-auto">
          {{ content.about.description }}
        </p>
      </div>
    </section>

    <!-- Vision & Mission -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Vision -->
          <div class="card">
            <div class="text-primary-600 mb-4">
              <svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-secondary-900 mb-4">
              {{ content.about.vision.title }}
            </h2>
            <p class="text-lg text-secondary-600">
              {{ content.about.vision.content }}
            </p>
          </div>

          <!-- Mission -->
          <div class="card">
            <div class="text-primary-600 mb-4">
              <svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-secondary-900 mb-4">
              {{ content.about.mission.title }}
            </h2>
            <ul class="space-y-3">
              <li
                v-for="item in content.about.mission.content"
                :key="item"
                class="flex items-start space-x-3"
              >
                <svg class="h-6 w-6 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-secondary-600">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-secondary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            {{ content.about.values.title }}
          </h2>
          <p class="text-xl text-secondary-600">
            Prinsip-prinsip yang memandu setiap langkah kami
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="value in content.about.values.items"
            :key="value.title"
            class="card text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div class="text-primary-600 mb-4 flex justify-center">
              <component :is="getValueIcon(value.title)" class="h-12 w-12" />
            </div>
            <h3 class="text-xl font-semibold text-secondary-900 mb-3">
              {{ value.title }}
            </h3>
            <p class="text-secondary-600">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            {{ content.team.title }}
          </h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            {{ content.team.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="member in content.team.members"
            :key="member.name"
            class="card text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div class="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl font-bold text-white">
                {{ member.name.split(' ').map(n => n[0]).join('') }}
              </span>
            </div>
            <h3 class="text-xl font-semibold text-secondary-900 mb-2">
              {{ member.name }}
            </h3>
            <p class="text-primary-600 font-medium mb-2">
              {{ member.position }}
            </p>
            <p class="text-sm text-secondary-500 mb-3">
              {{ member.experience }}
            </p>
            <p class="text-sm text-secondary-600">
              {{ member.expertise }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-20 bg-primary-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">
            Pencapaian Kami
          </h2>
          <p class="text-xl text-primary-100">
            Angka-angka yang menunjukkan dedikasi dan kualitas layanan kami
          </p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="stat in content.stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="text-4xl lg:text-6xl font-bold mb-2">
              {{ stat.number }}
            </div>
            <div class="text-lg font-semibold mb-1">
              {{ stat.label }}
            </div>
            <div class="text-sm text-primary-200">
              {{ stat.description }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-secondary-900 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">
          Bergabunglah dengan Klien Terpercaya Kami
        </h2>
        <p class="text-xl mb-8 text-secondary-300">
          Ratusan perusahaan telah mempercayai kami untuk transformasi digital mereka. 
          Saatnya giliran Anda merasakan perbedaannya.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/kontak"
            class="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
          >
            Mulai Konsultasi
          </router-link>
          <router-link
            to="/layanan"
            class="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
          >
            Lihat Layanan
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { companyContent } from '@/data/company-content'

const content = companyContent

const getValueIcon = (title: string) => {
  const icons: Record<string, string> = {
    'Inovasi': 'InnovationIcon',
    'Integritas': 'IntegrityIcon',
    'Kolaborasi': 'CollaborationIcon',
    'Keunggulan': 'ExcellenceIcon'
  }
  return icons[title] || 'DefaultIcon'
}

// Icon components
const InnovationIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  `
}

const IntegrityIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `
}

const CollaborationIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  `
}

const ExcellenceIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  `
}

const DefaultIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  `
}
</script>

