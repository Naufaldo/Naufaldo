# Changelog — Naufaldo M.Sc. Portfolio Website

Semua perubahan signifikan pada proyek ini akan didokumentasikan di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) dan versi menggunakan tanggal rilis (`vYYYY.MM.DD`).

---

## [v2026.08.12.7] — 2026-08-12

### Fixed / Diperbaiki
- **`fix(robotics-sim)`**: Menambahkan blok `DOMContentLoaded` untuk inisialisasi semua 7 modul simulasi robotika interaktif (sebelumnya semua class terdefinisi tapi tidak pernah dijalankan)
- **`css/style.css`**: Menambahkan class CSS `.sim-canvas-wrapper` (tinggi 420px) dan `.sim-tab-content` yang sebelumnya tidak ada, menyebabkan canvas tidak tampil
- **`robotics-sim.html`**: Menambahkan tombol "Mulai Eksplorasi" dan "Reset Grid" pada Tab 6 (Indoor Exploration)
- Tab switching engine diperbaiki dengan handler terpusat di `robotics-sim.js`
- Slider kecepatan roda `ωr` dan `ωl` pada Modul 2 kini terhubung dengan benar ke model kinematika DDMR
- KaTeX LaTeX formula renderer kini dipanggil dengan benar setelah DOM ready

---

## [v2026.08.12.6] — 2026-08-12

### Security / Keamanan
- **`fix(security)`**: Mengganti semua penetapan `innerHTML` dinamis berisiko XSS di `js/app.js` dengan `DOMParser`, `createTextNode()`, dan `appendChild()` yang aman
- **`.github/workflows/deploy.yml`**: Menambahkan `persist-credentials: false` pada langkah `actions/checkout@v4` untuk mencegah kebocoran kredensial Git

---

## [v2026.08.12.5] — 2026-08-12

### SEO
- **`seo(all-pages)`**: Memperbarui metadata SEO Google secara menyeluruh di semua halaman:
  - Canonical URLs unik per halaman
  - OpenGraph (`og:title`, `og:description`, `og:image`) untuk tampilan preview link yang optimal
  - Twitter Card (`twitter:card`, `twitter:title`) untuk distribusi media sosial
  - Geo Location meta tags (`geo.region: ID-JB`, `geo.placename: Bandung`) untuk ranking pencarian lokal
  - JSON-LD Schema.org: `Person`, `Organization`, `EducationalOccupationalCredential`, `CollectionPage`, `WebApplication`
  - Keywords diperkaya dengan: *Naufaldo M.Sc.*, *Asesor LSP TPTU*, *No. Reg. MET.000.002933 2026*, *Refrigerasi F-Gas Tingkat 4*, *Cold Storage Bandung*, *DAC MATLAB Patent*, *Swarm Drone SICE FES 2025*
- **`sitemap.xml`**: Diperbarui dengan 4 URL halaman aktif dan prioritas yang tepat
- **`robots.txt`**: Mengarahkan crawler ke sitemap.xml baru

---

## [v2026.08.12.4] — 2026-08-12

### Changed / Diubah
- **`style(navbar)`**: Menyederhanakan teks item navigasi di semua halaman:
  - "Pengalaman & Skill" → "Pengalaman"
  - "Fitur & Tool" → "Simulasi"
  - "Blogspot" → "Blog"
- Tombol Login di navbar diubah dari "Admin CMS" menjadi "Login" (lebih bersih dan profesional)
- Judul modal login diubah dari "Admin CMS Portal" menjadi "Login Admin"
- Navbar semua halaman (`index.html`, `projects.html`, `publications.html`, `robotics-sim.html`) kini konsisten dengan link yang sama

---

## [v2026.08.12.3] — 2026-08-12

### Security / Keamanan
- **`fix(security)`**: Menghapus nilai `value="naufaldo"` dan `value="admin123"` yang hardcoded pada form login CMS di `index.html`
- Input username dan password kini kosong dengan placeholder teks yang deskriptif

---

## [v2026.08.12.2] — 2026-08-12

### Added / Ditambahkan
- **`feat(ci-cd)`**: Menambahkan workflow GitHub Actions `deploy.yml` untuk deployment otomatis ke GitHub Pages setiap kali push ke branch `main`
- **`feat(cms)`**: Admin CMS Portal interaktif dengan tombol Login di navbar (ikon gembok ungu)
  - Login form dengan validasi username/password
  - Tab "Galeri Proyek": Form untuk menambah proyek baru termasuk embed YouTube unlisted
  - Tab "Artikel Blogspot": Form untuk menulis dan menerbitkan artikel teknis baru
  - Data disimpan di `localStorage` browser
- **`feat(blog)`**: Sistem artikel Blogspot/Teknis dengan 3 artikel perdana:
  1. Optimasi Efisiensi Energi Freezer Room & ABF
  2. Riset Swarm Quadcopters SICE FES 2025
  3. Direct Air Capture (DAC) & Hak Cipta Paten MATLAB

---

## [v2026.08.12.1] — 2026-08-12

### Added / Ditambahkan
- **`feat(cv-sync)`**: Sinkronisasi lengkap konten website dengan CV resmi Naufaldo:
  - Profil lengkap sebagai Direktur CV. Dingin Lestari Teknik & Asesor PT. LSP TPTU
  - No. Reg. Asesor: `MET.000.002933 2026`
  - Sertifikasi Teknis Refrigerasi F-Gas Tingkat 4
  - Timeline pengalaman kerja: 6 posisi dari 2018 hingga sekarang
  - Timeline pendidikan: M.Sc. NTUT Taiwan, S.Tr.T POLMAN Bandung, SMK N4 Bandung
  - Penghargaan: Bangkit TOP 20 Capstone, Beasiswa NTUT, Paten MATLAB DAC
  - Progress bar skill teknis (Cold Storage, Robotika, Cloud, IoT, ERP)
- **`feat(github-stats)`**: Badge GitHub developer analytics (stats, streak, top languages) dikembalikan ke README.md

### Changed / Diubah
- Teks profil hero section diperbarui untuk mencerminkan status sebagai Asesor LSP TPTU dengan nomor registrasi resmi
- JSON-LD Schema.org diperbarui dengan data `EducationalOccupationalCredential` untuk sertifikasi F-Gas

---

## [v2026.08.12.0] — 2026-08-12 *(Sesi Pengembangan Besar)*

### Added / Ditambahkan
- **`feat(youtube-embeds)`**: 5 video YouTube unlisted diintegrasikan sebagai player lightbox di galeri proyek:
  - Swarm Drone SICE FES 2025 (`JKuoD_4qvYw`)
  - Leader-Follower M.Sc. Thesis Lemniscate (`SJYSznTkrM0`)
  - Leader-Follower M.Sc. Thesis Circular (`iG-kYV0TVr8`)
  - Robot Following Gazebo OpenCV (`tfDiMlBXNsY`)
  - Ball Following Gazebo OpenCV (`AqM-iCrh1rQ`)
- **`feat(robotics-sim)`**: 7 modul simulasi robotika interaktif berbasis HTML5 Canvas:
  1. Fuzzy PID DDMR + APF Multi-Agent (ICCAS 2025)
  2. Model Matematika Kinematika ke Simulasi 2D (KaTeX LaTeX)
  3. Path Tracking vs Trajectory Tracking Comparison
  4. Vision-Based Leader-Follower (OpenCV Bounding Box)
  5. Drone Swarm Flocking 3D (SICE FES 2025)
  6. Indoor Exploration: Floodfill vs Frontier (ICCAS 2024)
  7. LiDAR SLAM Autonomous Navigation (IJRA 2024)
- **`feat(katex)`**: Integrasi KaTeX untuk rendering formula LaTeX matematika kinematika robot
- **`feat(multi-page)`**: Arsitektur multi-halaman dengan 4 halaman terpisah:
  - `index.html` — Beranda utama portofolio
  - `projects.html` — Galeri proyek & inovasi rekayasa
  - `publications.html` — Daftar publikasi ilmiah
  - `robotics-sim.html` — Lab simulasi robotika interaktif
- **`feat(calculator)`**: Kalkulator estimasi kapasitas cold storage (Cooling Load) interaktif
- **`feat(bilingual)`**: Sistem multi-bahasa Indonesia/English dengan toggle di navbar
- **`feat(publications)`**: Daftar 7 publikasi ilmiah internasional terindeks dengan fitur filter dan salin sitasi

### Fixed / Diperbaiki
- **`fix(images)`**: Kompresi gambar `CS_1.jpg` dari 3.2MB menjadi ~98KB (pengurangan 97%)
- Perbaikan penampilan galeri proyek yang sebelumnya tidak muncul

### Performance / Performa
- **`perf`**: Arsitektur multi-halaman menggantikan single-page untuk mempercepat loading awal
- Video berat diganti dengan lazy-loaded YouTube embed via lightbox modal

---

## [v2026.06.23] — 2026-06-23

### Added / Ditambahkan
- Revisi README.md dengan profil yang diperbarui dan keahlian terkini
- Google Search Console verification file (`google53e48b176c822ec6.html`)
- Pembaruan konten profil dan keahlian teknis

---

## [v2025.04.20] — 2025-04-20

### Changed / Diubah
- Pembaruan konten README dan profil

---

## [v2024.08.23] — 2024-08-23

### Changed / Diubah
- Pembaruan README.md dengan informasi profil terkini

---

## [v2023.12.06] — 2023-12-06

### Changed / Diubah
- Perubahan konfigurasi CNAME
- Pembaruan konten website

---

## [v2023.05.03] — 2023-05-03

### Changed / Diubah
- Pembaruan konten portfolio website

---

## [v2023.03.16] — 2023-03-16

### Added / Ditambahkan
- Inisialisasi ulang repository GitHub Pages
- Konfigurasi domain dan CNAME

---

## [v2023.02.20] — 2023-02-20

### Added / Ditambahkan
- **Initial commit**: Website portfolio pertama Naufaldo di GitHub Pages
- Konten README dasar dengan profil engineering

---

*File ini dikelola secara otomatis oleh AI Agent sesuai aturan di `.agents/AGENTS.md`.*
*Setiap perubahan kode yang di-commit ke repository WAJIB diperbarui di file ini sebelum `git push`.*
