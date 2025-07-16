import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_anon_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
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

