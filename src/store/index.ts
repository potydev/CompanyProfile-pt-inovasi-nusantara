import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabaseClient'

// Types
export interface Produk {
  id: number
  nama: string
  kategori: string
  deskripsi: string
  harga?: string
  gambar_url?: string
  fitur?: string[]
  created_at: string
}

export interface FAQ {
  id: number
  pertanyaan: string
  jawaban: string
  kategori: string
  urutan: number
  created_at: string
}

export interface Testimoni {
  id: number
  nama: string
  perusahaan: string
  jabatan: string
  pesan: string
  rating: number
  foto_url?: string
  created_at: string
}

export interface User {
  id: string
  email: string
}

// Auth Store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        // Mock authentication for demo
        if (email === 'admin@inovasidigital.com' && password === 'admin123') {
          this.user = { id: '1', email }
          localStorage.setItem('admin_logged_in', 'true')
          return { success: true }
        } else {
          this.error = 'Email atau password salah'
          return { success: false, error: this.error }
        }
      } catch (error) {
        this.error = 'Terjadi kesalahan saat login'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.user = null
      this.error = null
      localStorage.removeItem('admin_logged_in')
    }
  }
})

// Products Store
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Produk[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await supabase
          .from('produk')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        this.products = data || []
      } catch (error) {
        this.error = 'Gagal memuat produk'
      } finally {
        this.loading = false
      }
    },

    async addProduct(productData: Omit<Produk, 'id' | 'created_at'>) {
      try {
        const { data, error } = await supabase
          .from('produk')
          .insert([{ ...productData }])
          .select()
        if (error) throw error
        if (data && data.length > 0) {
          this.products.push(data[0])
          return { success: true }
        }
        return { success: false, error: 'Gagal menambah produk' }
      } catch (error: any) {
        console.error('Supabase error:', error)
        let msg = error?.message
        if (!msg && typeof error === 'object') {
          msg = JSON.stringify(error)
        }
        return { success: false, error: msg }
      }
    },

    async updateProduct(id: number, productData: Partial<Produk>) {
      try {
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...productData }
        }
        return { success: true }
      } catch (error) {
        return { success: false, error: 'Gagal mengupdate produk' }
      }
    },

    async deleteProduct(id: number) {
      try {
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products.splice(index, 1)
        }
        return { success: true }
      } catch (error) {
        return { success: false, error: 'Gagal menghapus produk' }
      }
    }
  }
})

// FAQ Store
export const useFAQStore = defineStore('faq', {
  state: () => ({
    faqs: [] as FAQ[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchFAQs() {
      this.loading = true
      this.error = null

      try {
        // Mock data for demo
        this.faqs = [
          {
            id: 1,
            pertanyaan: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?',
            jawaban: 'Waktu penyelesaian proyek bervariasi tergantung kompleksitas dan scope. Untuk proyek web development sederhana biasanya 2-3 bulan, sedangkan untuk transformasi digital komprehensif bisa 6-12 bulan.',
            kategori: 'project',
            urutan: 1,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            pertanyaan: 'Apakah ada garansi untuk layanan yang diberikan?',
            jawaban: 'Ya, kami memberikan garansi 1 tahun untuk semua produk yang kami develop, termasuk bug fixing dan maintenance dasar. Untuk layanan konsultasi, kami memberikan follow-up support selama 3 bulan.',
            kategori: 'garansi',
            urutan: 2,
            created_at: new Date().toISOString()
          },
          {
            id: 3,
            pertanyaan: 'Bagaimana sistem pembayaran untuk proyek?',
            jawaban: 'Sistem pembayaran kami fleksibel: 30% down payment, 40% di tengah proyek, dan 30% setelah selesai. Untuk proyek besar, kami juga menerima pembayaran per milestone.',
            kategori: 'kerjasama',
            urutan: 3,
            created_at: new Date().toISOString()
          }
        ]
      } catch (error) {
        this.error = 'Gagal memuat FAQ'
      } finally {
        this.loading = false
      }
    },

    async addFAQ(faqData: Omit<FAQ, 'id' | 'created_at'>) {
      try {
        const { data, error } = await supabase
          .from('faq')
          .insert([{ ...faqData }])
          .select()
        if (error) throw error
        if (data && data.length > 0) {
          this.faqs.push(data[0])
          this.faqs.sort((a, b) => a.urutan - b.urutan)
          return { success: true }
        }
        return { success: false, error: 'Gagal menambah FAQ' }
      } catch (error: any) {
        console.error('Supabase error:', error)
        let msg = error?.message
        if (!msg && typeof error === 'object') {
          msg = JSON.stringify(error)
        }
        return { success: false, error: msg }
      }
    },

    async updateFAQ(id: number, faqData: Partial<FAQ>) {
      try {
        const index = this.faqs.findIndex(f => f.id === id)
        if (index !== -1) {
          this.faqs[index] = { ...this.faqs[index], ...faqData }
          this.faqs.sort((a, b) => a.urutan - b.urutan)
        }
        return { success: true }
      } catch (error) {
        return { success: false, error: 'Gagal mengupdate FAQ' }
      }
    },

    async deleteFAQ(id: number) {
      try {
        const index = this.faqs.findIndex(f => f.id === id)
        if (index !== -1) {
          this.faqs.splice(index, 1)
        }
        return { success: true }
      } catch (error) {
        return { success: false, error: 'Gagal menghapus FAQ' }
      }
    }
  }
})

// Testimonials Store
export const useTestimonialsStore = defineStore('testimonials', {
  state: () => ({
    testimonials: [] as Testimoni[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchTestimonials() {
      this.loading = true
      this.error = null

      try {
        // Mock data for demo
        this.testimonials = [
          {
            id: 1,
            nama: 'Budi Santoso',
            perusahaan: 'PT. Maju Bersama',
            jabatan: 'CEO',
            pesan: 'Tim IDN sangat profesional dan memahami kebutuhan bisnis kami. Transformasi digital yang mereka lakukan meningkatkan efisiensi operasional hingga 40%.',
            rating: 5,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            nama: 'Sari Dewi',
            perusahaan: 'CV. Teknologi Nusantara',
            jabatan: 'CTO',
            pesan: 'Aplikasi web yang dikembangkan sangat user-friendly dan sesuai dengan requirement. Support tim juga sangat responsif.',
            rating: 5,
            created_at: new Date().toISOString()
          },
          {
            id: 3,
            nama: 'Ahmad Rizki',
            perusahaan: 'PT. Digital Solusi',
            jabatan: 'IT Manager',
            pesan: 'Migrasi ke cloud berjalan lancar tanpa downtime. Tim IDN sangat berpengalaman dalam cloud infrastructure.',
            rating: 4,
            created_at: new Date().toISOString()
          }
        ]
      } catch (error) {
        this.error = 'Gagal memuat testimoni'
      } finally {
        this.loading = false
      }
    },

    async addTestimonial(testimonialData: Omit<Testimoni, 'id' | 'created_at'>) {
      try {
        const { data, error } = await supabase
          .from('testimoni')
          .insert([{ ...testimonialData }])
          .select()
        if (error) throw error
        if (data && data.length > 0) {
          this.testimonials.push(data[0])
          return { success: true }
        }
        return { success: false, error: 'Gagal menambah testimoni' }
      } catch (error: any) {
        console.error('Supabase error:', error)
        let msg = error?.message
        if (!msg && typeof error === 'object') {
          msg = JSON.stringify(error)
        }
        return { success: false, error: msg }
      }
    },

    async updateTestimonial(id: number, testimonialData: Partial<Testimoni>) {
      try {
        const index = this.testimonials.findIndex(t => t.id === id)
        if (index !== -1) {
          this.testimonials[index] = { ...this.testimonials[index], ...testimonialData }
        }
        return { success: true }
      } catch (error) {
        return { success: false, error: 'Gagal mengupdate testimoni' }
      }
    },

    async deleteTestimonial(id: number) {
      try {
        const index = this.testimonials.findIndex(t => t.id === id)
        if (index !== -1) {
          this.testimonials.splice(index, 1)
        }
        return { success: true }
      } catch (error) {
        return { success: false, error: 'Gagal menghapus testimoni' }
      }
    }
  }
})

