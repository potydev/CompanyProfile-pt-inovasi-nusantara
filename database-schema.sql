-- Database Schema untuk PT. Inovasi Digital Nusantara
-- Jalankan script ini di Supabase SQL Editor

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create tables

-- 1. Table Produk/Layanan
CREATE TABLE IF NOT EXISTS produk (
    id BIGSERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    harga VARCHAR(100),
    gambar_url TEXT,
    fitur JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table FAQ
CREATE TABLE IF NOT EXISTS faq (
    id BIGSERIAL PRIMARY KEY,
    pertanyaan TEXT NOT NULL,
    jawaban TEXT NOT NULL,
    kategori VARCHAR(100) DEFAULT 'umum',
    urutan INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table Testimoni
CREATE TABLE IF NOT EXISTS testimoni (
    id BIGSERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    perusahaan VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    pesan TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table User Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    nama VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_produk_kategori ON produk(kategori);
CREATE INDEX IF NOT EXISTS idx_faq_kategori ON faq(kategori);
CREATE INDEX IF NOT EXISTS idx_faq_urutan ON faq(urutan);
CREATE INDEX IF NOT EXISTS idx_testimoni_rating ON testimoni(rating);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_produk_updated_at BEFORE UPDATE ON produk FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON faq FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimoni_updated_at BEFORE UPDATE ON testimoni FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimoni ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Produk policies
CREATE POLICY "Produk dapat dibaca oleh semua" ON produk FOR SELECT USING (true);
CREATE POLICY "Produk dapat diubah oleh admin" ON produk FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

-- FAQ policies
CREATE POLICY "FAQ dapat dibaca oleh semua" ON faq FOR SELECT USING (true);
CREATE POLICY "FAQ dapat diubah oleh admin" ON faq FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

-- Testimoni policies
CREATE POLICY "Testimoni dapat dibaca oleh semua" ON testimoni FOR SELECT USING (true);
CREATE POLICY "Testimoni dapat diubah oleh admin" ON testimoni FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

-- User profiles policies
CREATE POLICY "User dapat melihat profil sendiri" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin dapat melihat semua profil" ON user_profiles FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);
CREATE POLICY "User dapat update profil sendiri" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, nama, role)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'nama', 'User'), 'user');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data

-- Sample Produk/Layanan
INSERT INTO produk (nama, deskripsi, kategori, harga, fitur) VALUES
('Konsultasi Digital Transformation', 'Layanan konsultasi untuk transformasi digital perusahaan Anda', 'Konsultasi', 'Mulai dari Rp 50.000.000', '["Analisis kebutuhan bisnis", "Roadmap transformasi digital", "Implementasi teknologi", "Training tim"]'),
('Pengembangan Aplikasi Mobile', 'Pengembangan aplikasi mobile native dan cross-platform', 'Development', 'Mulai dari Rp 100.000.000', '["iOS & Android", "React Native", "Flutter", "UI/UX Design", "Testing & Deployment"]'),
('Cloud Infrastructure Setup', 'Setup dan migrasi infrastruktur ke cloud (AWS, GCP, Azure)', 'Infrastructure', 'Mulai dari Rp 75.000.000', '["Cloud Migration", "DevOps Setup", "Security Implementation", "Monitoring & Backup"]'),
('Data Analytics & BI', 'Implementasi sistem analytics dan business intelligence', 'Analytics', 'Mulai dari Rp 80.000.000', '["Data Warehouse", "Dashboard & Reporting", "Machine Learning", "Data Visualization"]');

-- Sample FAQ
INSERT INTO faq (pertanyaan, jawaban, kategori, urutan) VALUES
('Apa saja layanan yang ditawarkan PT. Inovasi Digital Nusantara?', 'Kami menawarkan berbagai layanan teknologi termasuk konsultasi digital transformation, pengembangan aplikasi, cloud infrastructure, dan data analytics.', 'layanan', 1),
('Berapa lama waktu pengerjaan project?', 'Waktu pengerjaan bervariasi tergantung kompleksitas project, mulai dari 2-3 bulan untuk project sederhana hingga 12 bulan untuk project enterprise.', 'project', 2),
('Apakah ada garansi untuk layanan yang diberikan?', 'Ya, kami memberikan garansi 1 tahun untuk semua produk yang kami kembangkan, termasuk maintenance dan bug fixing.', 'garansi', 3),
('Bagaimana cara memulai kerjasama?', 'Anda dapat menghubungi kami melalui form kontak atau email. Tim kami akan melakukan konsultasi awal untuk memahami kebutuhan Anda.', 'kerjasama', 4);

-- Sample Testimoni
INSERT INTO testimoni (nama, perusahaan, jabatan, pesan, rating) VALUES
('Budi Santoso', 'PT. Maju Bersama', 'IT Director', 'Tim PT. Inovasi Digital Nusantara sangat profesional dan membantu transformasi digital perusahaan kami. Hasil kerja mereka melampaui ekspektasi.', 5),
('Sari Dewi', 'CV. Kreatif Solusi', 'CEO', 'Aplikasi mobile yang dikembangkan sangat user-friendly dan sesuai dengan kebutuhan bisnis kami. Highly recommended!', 5),
('Ahmad Rahman', 'PT. Teknologi Masa Depan', 'CTO', 'Proses migrasi ke cloud berjalan sangat smooth berkat expertise tim IDN. Support yang diberikan juga sangat responsif.', 4);

-- Create admin user (you need to register this user first through Supabase Auth)
-- Then update the role to admin
-- UPDATE user_profiles SET role = 'admin' WHERE email = 'admin@inovasidigital.com';

