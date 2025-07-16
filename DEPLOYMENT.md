# 🚀 Deployment Guide

Panduan lengkap untuk deploy website PT. Inovasi Digital Nusantara ke berbagai platform hosting.

## 📋 Pre-deployment Checklist

### 1. Environment Setup
- [ ] File `.env` sudah dikonfigurasi dengan benar
- [ ] Supabase project sudah setup dan running
- [ ] Database schema sudah dijalankan
- [ ] Test aplikasi di local environment
- [ ] Build berhasil tanpa error

### 2. Code Quality
- [ ] Tidak ada console.log atau debug code
- [ ] Error handling sudah proper
- [ ] Loading states sudah diimplementasi
- [ ] Responsive design sudah ditest

### 3. Performance
- [ ] Images sudah dioptimasi
- [ ] Bundle size reasonable
- [ ] Lazy loading diimplementasi
- [ ] SEO meta tags sudah ada

## 🌐 Platform Deployment

### 1. Vercel (Recommended)

#### Automatic Deployment via GitHub
1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect di Vercel**
   - Login ke [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import dari GitHub repository
   - Select repository `pt-inovasi-digital`

3. **Configure Build Settings**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables**
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be available at `https://your-project.vercel.app`

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Redeploy with env vars
vercel --prod
```

### 2. Netlify

#### Via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod --dir=dist
```

#### Via Netlify Dashboard
1. **Build Project**
   ```bash
   npm run build
   ```

2. **Manual Upload**
   - Login ke [Netlify Dashboard](https://app.netlify.com)
   - Drag & drop folder `dist` ke deploy area

3. **Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Configure Redirects**
   Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

#### GitHub Integration
1. **Connect Repository**
   - New site from Git
   - Choose GitHub provider
   - Select repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy
```

### 4. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

### 5. Traditional Web Hosting (cPanel, etc.)

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Upload Files**
   - Compress `dist` folder to ZIP
   - Upload via File Manager or FTP
   - Extract to public_html or www folder

3. **Configure Server**
   - Ensure server supports SPA routing
   - Add `.htaccess` for Apache:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 🔧 Build Optimization

### 1. Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
})

# Build and analyze
npm run build
```

### 2. Performance Optimization
```bash
# Optimize images
npm install --save-dev vite-plugin-imagemin

# Enable gzip compression
npm install --save-dev vite-plugin-compression
```

## 🌍 Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### Netlify
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

## 🔒 SSL Certificate

Most modern hosting platforms (Vercel, Netlify) provide automatic SSL certificates. For traditional hosting:

1. **Let's Encrypt (Free)**
   - Use Certbot or hosting panel integration
   - Auto-renewal recommended

2. **Commercial SSL**
   - Purchase from SSL provider
   - Install via hosting control panel

## 📊 Monitoring & Analytics

### 1. Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 2. Performance Monitoring
- **Vercel Analytics**: Built-in for Vercel deployments
- **Netlify Analytics**: Available in Netlify dashboard
- **Google PageSpeed Insights**: Regular performance checks

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Environment Variables Not Working
- Ensure variables start with `VITE_`
- Check spelling and case sensitivity
- Restart dev server after changes

#### 3. Routing Issues (404 on refresh)
- Configure server redirects
- Check SPA routing setup
- Verify `.htaccess` or `_redirects` file

#### 4. Supabase Connection Issues
- Verify URL and API key
- Check CORS settings in Supabase
- Ensure RLS policies are correct

### Debug Commands
```bash
# Check build output
npm run build -- --debug

# Preview production build locally
npm run preview

# Check environment variables
echo $VITE_SUPABASE_URL
```

## 📞 Support

Jika mengalami masalah deployment:
1. Check logs di hosting platform
2. Verify environment variables
3. Test build locally first
4. Contact support team

---

**Happy Deploying! 🚀**

