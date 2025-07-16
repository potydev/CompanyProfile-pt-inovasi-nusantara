<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center hero-gradient">
      <div class="hero-overlay"></div>
      <div class="relative z-10 container-custom text-center text-white">
        <div class="max-w-4xl mx-auto animate-fade-in">
          <h1 class="heading-responsive font-bold mb-6">
            Transformasi Digital untuk 
            <span class="text-accent-400">Masa Depan</span> 
            Bisnis Anda
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            PT. Inovasi Digital Nusantara adalah partner terpercaya untuk konsultasi teknologi 
            dan transformasi digital perusahaan di Indonesia
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link to="/kontak" class="btn-accent text-lg px-8 py-4">
              Konsultasi Gratis Sekarang
            </router-link>
            <router-link to="/layanan" class="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-secondary-800">
              Lihat Layanan Kami
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="stat-card animate-slide-up">
            <div class="stat-number">200+</div>
            <div class="stat-label">Proyek Selesai</div>
            <p class="text-sm text-secondary-500 mt-2">Proyek teknologi yang berhasil diselesaikan</p>
          </div>
          <div class="stat-card animate-slide-up" style="animation-delay: 0.1s">
            <div class="stat-number">150+</div>
            <div class="stat-label">Klien Puas</div>
            <p class="text-sm text-secondary-500 mt-2">Perusahaan yang telah mempercayai layanan kami</p>
          </div>
          <div class="stat-card animate-slide-up" style="animation-delay: 0.2s">
            <div class="stat-number">10+</div>
            <div class="stat-label">Tahun Pengalaman</div>
            <p class="text-sm text-secondary-500 mt-2">Pengalaman dalam industri teknologi</p>
          </div>
          <div class="stat-card animate-slide-up" style="animation-delay: 0.3s">
            <div class="stat-number">50+</div>
            <div class="stat-label">Tim Ahli</div>
            <p class="text-sm text-secondary-500 mt-2">Profesional berpengalaman di bidangnya</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-secondary-800 mb-4">Layanan Unggulan Kami</h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            Solusi teknologi komprehensif untuk transformasi digital perusahaan Anda
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="service-card">
            <div class="card-body text-center">
              <div class="service-icon mx-auto mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-12 h-12">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-secondary-800 mb-3">Konsultasi Digital</h3>
              <p class="text-secondary-600 mb-4">Strategi transformasi digital yang tepat untuk bisnis Anda</p>
              <router-link to="/layanan" class="text-primary-600 font-medium hover:text-primary-700">
                Pelajari Lebih Lanjut →
              </router-link>
            </div>
          </div>

          <div class="service-card">
            <div class="card-body text-center">
              <div class="service-icon mx-auto mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-12 h-12">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-secondary-800 mb-3">Pengembangan Aplikasi</h3>
              <p class="text-secondary-600 mb-4">Aplikasi mobile dan web yang inovatif dan user-friendly</p>
              <router-link to="/layanan" class="text-primary-600 font-medium hover:text-primary-700">
                Pelajari Lebih Lanjut →
              </router-link>
            </div>
          </div>

          <div class="service-card">
            <div class="card-body text-center">
              <div class="service-icon mx-auto mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-12 h-12">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-secondary-800 mb-3">Cloud Infrastructure</h3>
              <p class="text-secondary-600 mb-4">Migrasi dan optimasi infrastruktur cloud yang aman</p>
              <router-link to="/layanan" class="text-primary-600 font-medium hover:text-primary-700">
                Pelajari Lebih Lanjut →
              </router-link>
            </div>
          </div>

          <div class="service-card">
            <div class="card-body text-center">
              <div class="service-icon mx-auto mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-12 h-12">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-secondary-800 mb-3">Data Analytics</h3>
              <p class="text-secondary-600 mb-4">Business intelligence dan insights dari data perusahaan</p>
              <router-link to="/layanan" class="text-primary-600 font-medium hover:text-primary-700">
                Pelajari Lebih Lanjut →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Preview Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-secondary-800 mb-6">
              Tentang PT. Inovasi Digital Nusantara
            </h2>
            <p class="text-lg text-secondary-600 mb-6 leading-relaxed">
              PT. Inovasi Digital Nusantara adalah perusahaan konsultan teknologi terdepan di Indonesia 
              yang berdedikasi untuk membantu perusahaan dalam transformasi digital. Dengan pengalaman 
              lebih dari 10 tahun, kami telah membantu ratusan perusahaan dari berbagai industri untuk 
              mengoptimalkan operasional bisnis melalui teknologi.
            </p>
            
            <div class="grid grid-cols-2 gap-6 mb-8">
              <div class="text-center p-4 bg-primary-50 rounded-lg">
                <h4 class="font-semibold text-primary-800 mb-2">Inovasi</h4>
                <p class="text-sm text-primary-600">Selalu mencari solusi kreatif dan teknologi terdepan untuk setiap tantangan bisnis</p>
              </div>
              <div class="text-center p-4 bg-accent-50 rounded-lg">
                <h4 class="font-semibold text-accent-800 mb-2">Integritas</h4>
                <p class="text-sm text-accent-600">Berkomitmen pada transparansi, kejujuran, dan etika bisnis yang tinggi</p>
              </div>
            </div>
            
            <router-link to="/tentang" class="btn-primary">
              Tentang Kami
            </router-link>
          </div>
          
          <div class="relative">
            <img 
              src="/src/assets/images/hero-consulting.jpg" 
              alt="Tim Konsultan" 
              class="rounded-xl shadow-custom w-full h-96 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-secondary-800 mb-4">Apa Kata Klien Kami</h2>
          <p class="text-xl text-secondary-600">Testimoni dari perusahaan yang telah mempercayai layanan kami</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="testimonial-card">
            <div class="testimonial-quote">
              "Tim PT. Inovasi Digital Nusantara sangat profesional dan membantu transformasi digital perusahaan kami."
            </div>
            <div class="testimonial-author">Budi Santoso</div>
            <div class="testimonial-role">IT Director, PT. Maju Bersama</div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-quote">
              "Aplikasi mobile yang dikembangkan sangat user-friendly dan sesuai dengan kebutuhan bisnis kami."
            </div>
            <div class="testimonial-author">Sari Dewi</div>
            <div class="testimonial-role">CEO, CV. Kreatif Solusi</div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-quote">
              "Proses migrasi ke cloud berjalan sangat smooth berkat expertise tim IDN."
            </div>
            <div class="testimonial-author">Ahmad Rahman</div>
            <div class="testimonial-role">CTO, PT. Teknologi Masa Depan</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-secondary-800 mb-4">Partner & Klien Terpercaya</h2>
          <p class="text-lg text-secondary-600">Dipercaya oleh perusahaan terkemuka di Indonesia</p>
        </div>
        
        <div class="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
          <img src="/src/assets/images/partners-tech.png" alt="Partner 1" class="h-12 grayscale hover:grayscale-0 transition-all">
          <img src="/src/assets/images/partners-logos.jpg" alt="Partner 2" class="h-12 grayscale hover:grayscale-0 transition-all">
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-primary-600 text-white">
      <div class="container-custom text-center">
        <h2 class="text-4xl font-bold mb-4">Siap Memulai Transformasi Digital?</h2>
        <p class="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
          Konsultasikan kebutuhan teknologi perusahaan Anda dengan tim ahli kami. 
          Dapatkan konsultasi gratis dan solusi yang tepat untuk bisnis Anda.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/kontak" class="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
            Konsultasi Gratis
          </router-link>
          <router-link to="/layanan" class="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
            Lihat Layanan
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

