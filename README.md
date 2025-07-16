# PT. Inovasi Digital Nusantara - Company Profile Website

Website company profile modern untuk PT. Inovasi Digital Nusantara, perusahaan konsultan teknologi terdepan di Indonesia.

## 🚀 Tech Stack

- **Frontend Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: CSS3 (Custom styling)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Icons**: Heroicons
- **Deployment**: Vercel/Netlify Ready

## 📋 Fitur

### Fitur Publik
- ✅ **Home Page** - Hero section dengan CTA dan logo partner
- ✅ **Tentang Kami** - Visi, misi, dan profil perusahaan
- ✅ **Produk & Layanan** - Katalog layanan (data dari Supabase)
- ✅ **FAQ** - Frequently Asked Questions (data dari Supabase)
- ✅ **Kontak** - Form kontak dan informasi perusahaan
- ✅ **Responsive Design** - Optimized untuk desktop dan mobile

### Fitur Admin
- ✅ **Login Admin** - Authentication dengan Supabase Auth
- ✅ **Dashboard** - Overview statistik dan aktivitas
- ✅ **CRUD Produk/Layanan** - Manajemen katalog layanan
- ✅ **CRUD FAQ** - Manajemen pertanyaan dan jawaban
- ✅ **CRUD Testimoni** - Manajemen testimoni klien

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Akun Supabase (untuk backend)

### 1. Clone Repository
```bash
git clone <repository-url>
cd pt-inovasi-digital
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Buat file `.env` berdasarkan `.env.example`:

```bash
cp .env.example .env
```

Edit file `.env` dan isi dengan kredensial Supabase Anda:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Buat project baru atau gunakan yang sudah ada
3. Jalankan SQL script dari file `database-schema.sql` di SQL Editor
4. Enable Row Level Security (RLS) untuk semua tabel
5. Setup authentication policies sesuai kebutuhan

### 5. Development Server
```bash
npm run dev
```

Website akan berjalan di `http://localhost:5173`

## 📁 Struktur Project

```
pt-inovasi-digital/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, logos, icons
│   │   └── images/        # Generated logos dan gambar
│   ├── components/        # Vue components
│   │   ├── Navbar.vue     # Navigation component
│   │   ├── Footer.vue     # Footer component
│   │   └── Layout.vue     # Main layout wrapper
│   ├── pages/             # Page components
│   │   ├── Home.vue       # Homepage
│   │   ├── About.vue      # Tentang Kami
│   │   ├── Services.vue   # Produk & Layanan
│   │   ├── FAQ.vue        # FAQ page
│   │   ├── Contact.vue    # Kontak page
│   │   ├── NotFound.vue   # 404 page
│   │   └── admin/         # Admin pages
│   │       ├── Login.vue      # Admin login
│   │       ├── Dashboard.vue  # Admin dashboard
│   │       ├── Products.vue   # CRUD Produk
│   │       ├── FAQ.vue        # CRUD FAQ
│   │       └── Testimonials.vue # CRUD Testimoni
│   ├── router/            # Vue Router configuration
│   │   └── index.ts       # Routes definition
│   ├── store/             # Pinia stores
│   │   └── index.ts       # State management
│   ├── utils/             # Utility functions
│   │   └── supabaseClient.ts # Supabase configuration
│   ├── data/              # Static data
│   │   └── company-content.ts # Company information
│   ├── App.vue            # Root component
│   ├── main.ts            # App entry point
│   └── style.css          # Global styles
├── database-schema.sql    # Database schema
├── .env.example          # Environment variables template
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
└── README.md             # Documentation
```

## 🗄️ Database Schema

### Tables
- **produk** - Katalog produk dan layanan
- **faq** - Frequently Asked Questions
- **testimoni** - Testimoni klien
- **users** - User authentication (Supabase Auth)

Detail schema tersedia di file `database-schema.sql`.

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#475569)
- **Accent**: Orange (#f59e0b)
- **Background**: White (#ffffff)
- **Text**: Dark Gray (#1f2937)

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold, various sizes
- **Body**: Regular, 16px base

### Components
- **Buttons**: Primary, Secondary, Outline variants
- **Cards**: Shadow, rounded corners
- **Forms**: Consistent input styling
- **Navigation**: Responsive navbar with mobile menu

## 🚀 Deployment

### Vercel Deployment
1. Push code ke GitHub repository
2. Connect repository di Vercel dashboard
3. Set environment variables di Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automatically

### Netlify Deployment
1. Build project: `npm run build`
2. Upload `dist` folder ke Netlify
3. Set environment variables di Netlify dashboard
4. Configure redirects untuk SPA routing

### Manual Deployment
```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy dist folder to your hosting provider
```

## 🔧 Configuration

### Vite Configuration
File `vite.config.ts` sudah dikonfigurasi dengan:
- Path aliases (`@` untuk `src/`)
- Vue plugin
- TypeScript support

### Router Configuration
- Hash mode untuk compatibility
- Route guards untuk admin pages
- Lazy loading untuk optimal performance

### State Management
Pinia stores untuk:
- Authentication state
- Products management
- FAQ management
- Testimonials management

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loading dan responsive
- [ ] Navigation antar halaman
- [ ] Form kontak submission
- [ ] Admin login functionality
- [ ] CRUD operations di admin panel
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Fast loading times
- [ ] Optimized images
- [ ] Minimal bundle size

## 🔐 Security

### Authentication
- Supabase Auth untuk admin login
- Route guards untuk protected pages
- Session management

### Data Protection
- Environment variables untuk sensitive data
- Row Level Security di Supabase
- Input validation dan sanitization

## 📞 Support & Contact

Untuk pertanyaan teknis atau support:
- **Email**: tech@inovasidigital.com
- **Phone**: +62 21 1234 5678
- **Address**: Jl. Sudirman No. 123, Jakarta Pusat

## 📄 License

© 2024 PT. Inovasi Digital Nusantara. All rights reserved.

---

**Developed with ❤️ by PT. Inovasi Digital Nusantara Development Team**

