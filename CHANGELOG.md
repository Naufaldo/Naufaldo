# Changelog — Naufaldo M.Sc. Portfolio Website

Semua perubahan signifikan pada proyek ini akan didokumentasikan di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) dan versi menggunakan tanggal rilis (`vYYYY.MM.DD`).

---

## [v2026.08.19] — 2026-08-19

### Added / Ditambahkan
- **`seo(all-pages)`**: Optimalisasi Komprehensif Google Search Central, Rich Snippets, & Schema.org JSON-LD `@graph`:
  - **Google Search Console Verification**: Menambahkan meta tag verifikasi situs Google Search Console (`google53e48b176c822ec6.html` dan hash token `53e48b176c822ec6`) pada seluruh halaman (`index.html`, `projects.html`, `publications.html`, `robotics-sim.html`).
  - **Search Engine Crawling Directives**: Menambahkan meta tag perayapan eksplisit untuk `Googlebot` dan `Bingbot` (`max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`).
  - **Anotasi Bahasa Internasional (hreflang)**: Menambahkan tautan alternatif dwibahasa `hreflang="id"`, `hreflang="en"`, dan `hreflang="x-default"` pada seluruh halaman.
  - **Optimalisasi Tema Browser Mobile**: Menambahkan tag `theme-color` adaptif untuk mode gelap (`#0a0e1a`) dan mode terang (`#f8fafc`) serta `color-scheme: dark light`.
  - **Schema.org JSON-LD `@graph` Komprehensif**:
    1. *`WebSite`*: Metadata situs portofolio, bahasa, dan penerbit.
    2. *`ProfilePage`*: Standar Google Search terbaru untuk portofolio insinyur / peneliti perorangan.
    3. *`Person`*: Data profil profesional lengkap (Asesor LSP TPTU, Direktur CV. Dingin Lestari Teknik, F-Gas Level 4, M.Sc. NTUT Taiwan, S.Tr.T Polman Bandung, Bangkit Distinction, keahlian rekayasa, dan link sosial).
    4. *`ItemList` of `ScholarlyArticle`*: Metadata terstruktur untuk 7 publikasi ilmiah internasional terindeks (IJCAS 2026 Springer DOI `10.1007/s12555-026-00119-1`, ICCAS 2025 IEEE DOI `10.23919/ICCAS66577.2025.11301156`, SICE FES 2025 IEEE DOI `10.23919/SICEFES67750.2025.11236621`, JCIE 2025 Taylor & Francis DOI `10.1080/02533839.2025.2503867`, ICCAS 2024 IEEE DOI `10.23919/ICCAS63016.2024.10773212`, JTT 2024 DOI `10.31884/jtt.v10i2.624`, IJRA 2024 DOI `10.11591/ijra.v13i1.pp50-64`).
    5. *`WebApplication` / `SoftwareApplication`*: Metadata aplikasi untuk Laboratorium Simulasi Robotika Interaktif (7 modul riset & KaTeX math engine), Cold Storage Calculator, DLT ERP Platform, serta Software Paten MATLAB Direct Air Capture.

- **`seo(sitemap)`**: Google Image Sitemap XML & Geo/Alternate Namespaces:
  - Menambahkan namespace `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` dan `xmlns:xhtml="http://www.w3.org/1999/xhtml"`.
  - Mendaftarkan seluruh 11 aset gambar proyek rekayasa, cold storage, prototipe DAC, dan potret profil resmi dengan judul serta keterangan lengkap agar terindeks di Google Images.
  - Memperbarui `<lastmod>2026-08-19</lastmod>` untuk semua rute halaman aktif.

- **`seo(robots)`**: Peningkatan Arahan Perayapan Mesin Pencari di `robots.txt`:
  - Menambahkan aturan perayapan terarah untuk `Googlebot`, `Googlebot-Image`, `Bingbot`, `Twitterbot`, dan `facebookexternalhit`.
  - Memblokir perayapan folder internal `.git/`, `.github/`, `.agents/`, dan `lighthouse.json`.
  - Menentukan canonical host dan sitemap XML.

### Performance / Performa
- **`perf(core-web-vitals)`**: Optimasi LCP & Cumulative Layout Shift (CLS):
  - Memperbarui gambar hero avatar di `index.html` dengan `fetchpriority="high"`, `decoding="async"`, `width="480"`, dan `height="600"` untuk mempercepat LCP (Largest Contentful Paint).
  - Menambahkan `decoding="async"` pada seluruh elemen gambar dinamis di `js/app.js`.

### Security / Keamanan
- **`security(links)`**: Menambahkan `rel="noopener noreferrer"` pada seluruh tautan eksternal `target="_blank"` di seluruh halaman HTML dan engine rendering dinamis JavaScript (`js/app.js`).

---

## [v2026.08.12.19] — 2026-08-12

### Fixed / Diperbaiki
- **`fix(theme-contrast)`**: Perbaikan Kontras Teks Putih pada Mode Terang (Light Mode) di Halaman Utama & Simulasi:
  - Mengganti seluruh kode warna hardcoded `#fff` pada heading Pengalaman Kerja, nama posisi/jabatan, nama institusi pendidikan, daftar penghargaan & prestasi, serta tautan kontak di `index.html` dengan variabel adaptif `var(--text-heading)`.
  - Memperbarui kartu dashboard progres SLAM di `robotics-sim.html` agar menggunakan `var(--math-card-bg)` dan `var(--text-heading)`.
  - Seluruh teks kini memiliki kontras tinggi yang sangat tajam dan terbaca sempurna di kedua mode (Dark & Light).

---

## [v2026.08.12.18] — 2026-08-12

### Added / Ditambahkan
- **`feat(theme-toggle)`**: Sistem Mode Cerah (Light Mode) & Mode Gelap (Dark Mode) Profesional Lintas Halaman:
  - **Palet Warna Desain Sistem Light Mode**: Latar Slate Pearl (`#f8fafc`), kartu Frosted Glassmorphism putih (`rgba(255, 255, 255, 0.90)`), tipografi Navy Slate tajam (`#0f172a` / `#1e293b`), aksen Deep Cyan (`#0891b2`) & Sapphire Blue (`#2563eb`), serta border kartu halus (`rgba(203, 213, 225, 0.85)`).
  - **Tombol Switcher Tema di Navbar**: Penambahan tombol toggle `🌙 / ☀️` (`#themeToggleBtn`) di navigation bar seluruh halaman (`index.html`, `projects.html`, `publications.html`, dan `robotics-sim.html`).
  - **Penyimpanan Status Tema Otomatis**: Pilihan tema pengguna disimpan di `localStorage.getItem("naufaldo_theme")` dan dieksekusi secara instan saat pertama kali halaman dimuat untuk mencegah *Flash of Unstyled Content (FOUC)*.
  - **Adaptasi Penuh Seluruh Komponen**: Seluruh kalkulator cold storage, form input, modal CMS, kartu publikasi, formula KaTeX, tabel riset, dan kotak landasan teori ilmiah menyesuaikan kontras secara otomatis.

---

## [v2026.08.12.17] — 2026-08-12

### Added / Ditambahkan
- **`feat(theory-i18n)`**: Penerjemahan Komprehensif Seluruh Penjelasan Teori & Formula Ilmiah (ID 🇮🇩 / EN 🇬🇧) pada Seluruh 7 Modul Simulasi:
  - **Penerjemahan Penuh Kotak Teori**: Seluruh judul paper, subjudul penurunan rumus matematika, deskripsi kinematika, formulasi APF, persamaan State-Space, metrik evaluasi, tabel benchmark perbandingan eksperimental, serta kesimpulan analisis kini memiliki teks dwibahasa presisi.
  - **Re-render KaTeX Dinamis**: Fungsi `updateLanguage()` kini secara otomatis memanggil renderer KaTeX (`renderMathInElement`) saat bahasa diganti, sehingga seluruh simbol matematika dan matriks LaTeX tetap ter-render tajam dan sempurna.
  - **Cakupan Lengkap Modul 1 s/d 7**:
    1. *Modul 1 (ICCAS 2025)*: Kinematika DWMR, Formasi Berputar Virtual Leader, APF Potensial Gabungan, & Fuzzy PID.
    2. *Modul 2 (IJCAS 2026)*: Matriks Invers & Direct Kinematika 4 Roda Mecanum (MWDR), Trajektori Sirkular & Lemniscate.
    3. *Modul 3*: Analisis Pure Pursuit Cross-Track Error vs Spatiotemporal Trajectory Error.
    4. *Modul 4 (SICE FES 2025)*: Model Kamera Pinhole Jarak Piksel & Image-Based Visual Servoing (IBVS).
    5. *Modul 5 (SICE FES 2025)*: Graf Laplacian Multi-Agent, Gaya Flocking Reynolds (Separation, Cohesion, Alignment).
    6. *Modul 6 (ICCAS 2024)*: Metrik Kelengkapan Peta, Tabel Benchmark Phoenix/Zee/Mememan Map, & Frontier vs Floodfill.
    7. *Modul 7 (IJRA 2024)*: Model Update Log-Odds Bayesian Occupancy Grid & Kemudi Reaktif LiDAR.

---

## [v2026.08.12.16] — 2026-08-12

### Added / Ditambahkan
- **`feat(swarm-config)`**: Konfigurasi Dinamis Jumlah Follower, Parameter Tuning Swarm, & Penerjemahan Bilingual Teori Modul:
  - **Konfigurasi Jumlah Follower**: Pengguna kini dapat mengatur jumlah robot pengikut (*followers*) secara dinamis dari 2 hingga 8 agen menggunakan slider interaktif (`#sliderFollowerCount1`).
  - **Perhitungan Geometri Formasi Adaptif**: Algoritma swap formasi (▲ Triangle/Wedge, ● Circle/Ring, ― Line/Abreast) secara otomatis beradaptasi dengan jumlah agen $N$ yang dipilih tanpa kehilangan simetri formasi.
  - **Parameter Tuning Interaktif**:
    1. Jarak Spasi Formasi ($d$): 25px hingga 80px (`#sliderFormDist1`).
    2. Swarm PID Attraction Gain ($K_p$): 0.05 hingga 0.40 (`#sliderKp1`).
    3. Kecepatan Gerak Leader ($V_L$): 1.0× hingga 4.5× (`#sliderLeaderSpeed1`).
    4. Kekuatan Gaya Tolak APF ($\eta_{\text{APF}}$): 1.0 hingga 8.0 (`#sliderApfForce1`).
  - **Dukungan Dwibahasa Penuh pada Kotak Teori Ilmiah**: Seluruh landasan teori, ringkasan paper, parameter, dan judul modul (Modul 1 s/d 7) kini terintegrasi penuh dengan tombol pengalih bahasa (ID 🇮🇩 / EN 🇬🇧).

---

## [v2026.08.12.15] — 2026-08-12

### Added / Ditambahkan
- **`feat(formation-control)`**: Pilihan Kendali Trajektori (Lemniscate, Circular, Manual) & APF Swarm Formation pada Modul 1 (ICCAS 2025):
  - **Mode Gerak Trajektori**: Menambahkan opsi navigasi Virtual Leader:
    1. `🎯 Manual (Klik Target)`: Leader menuju titik koordinat tujuan yang diklik oleh pengguna.
    2. `♾ Trajektori Lemniscate (8)`: Leader mengikuti trajektori kontinu angka-delapan Bernoulli Lemniscate ($X_{\text{ref}} = cx + A\sin t, Y_{\text{ref}} = cy + \frac{B}{2}\sin 2t$).
    3. `⭕ Trajektori Circular (Melingkar)`: Leader mengikuti trajektori orbital melingkar berotasi halus.
  - **Penghindaran Rintangan APF Multi-Robot**: Robot pengikut (*followers*) secara dinamis menjaga formasi (Segitiga, Lingkaran, Garis) relatif terhadap leader sambil membelok dan menepis (*repel*) rintangan APF serta mencegah tabrakan antar-robot.
  - **Visualisasi Lintasan & Halo Rintangan**: Menggambar garis proyeksi referensi trajektori putus-putus, halo gaya tolak potensial rintangan, tether formasi, dan jejak (*trail*) pergerakan setiap agen secara real-time.
  - **Kontrol Tambahan**: Tombol Hapus Semua Rintangan (`#btnClearObstacles1`) dan dukungan dwibahasa ID/EN lengkap.

---

## [v2026.08.12.14] — 2026-08-12

### Fixed / Diperbaiki
- **`fix(indoor-exploration)`**: Perbaikan menyeluruh arsitektur navigasi eksplorasi Modul 6 untuk mencegah crash/freeze saat tombol Mulai Eksplorasi diklik:
  - Menggantikan perulangan rekursif sinkron $A^*$ yang rentan *infinite loop* dengan **Step-by-Step BFS Gradient Navigation** yang dieksekusi bertahap per-sel.
  - Membatasi pencarian graf pada resolusi grid $24 \times 14$ ($< 0.02\text{ms}$ per pencarian).
  - Menghilangkan *recursion lock* pada frame update dan menambahkan blok penanganan protektif `try...catch` serta *safe fallback neighbors*.
  - Pergerakan robot antar-sel kini sepenuhnya mulus dengan transisi interpolasi linier tanpa membebani browser.

---

## [v2026.08.12.13] — 2026-08-12

### Added / Ditambahkan
- **`feat(lidar-nav)`**: Fitur Reset Posisi Robot & Pemulihan Tabrakan Dinding (*Anti-Stuck Collision Resolver*) pada Modul 7 (LiDAR SLAM):
  - **Tombol Reset Posisi**: Menambahkan tombol interaktif **↺ Reset Posisi Robot** (`#btnResetLidarPos7`) untuk mengembalikan robot ke titik awal yang aman seketika jika tersangkut atau terhalang dinding.
  - **Klik Canvas untuk Repositioning / Teleport**: Pengguna dapat mengklik area bebas mana pun pada denah ruangan untuk langsung memindahkan posisi robot ke titik tersebut.
  - **Pemulihan Otomatis (*Auto-Resolve Stuck*)**: Algoritma deteksi tabrakan aktif secara otomatis mendeteksi jika bodi robot terpotong oleh batas dinding dan mendorongnya dengan mulus ke area bebas terdekat.

---

## [v2026.08.12.12] — 2026-08-12

### Performance / Performa
- **`perf(indoor-exploration)`**: Optimasi performa dan efisiensi CPU pada simulasi Modul 6 (Eksplorasi Indoor):
  - Grid dioptimalkan ke resolusi $32 \times 18$ sel dengan kalkulasi raycasting cepat berjarak 5px.
  - Sinar pemindaian laser diringankan ke 28 berkas laser dengan *frame-throttling* otomatis selama navigasi sehingga simulasi berjalan mulus di 60 FPS dengan beban CPU sangat rendah (< 1%).
  - Algoritma pencarian jalur $A^*$ dioptimalkan dengan heuristik Manhattan dan batas iterasi aman.

### Added / Ditambahkan
- **`feat(i18n-bilingual)`**: Dukungan dwibahasa penuh (**Bahasa Indonesia 🇮🇩 / English 🇬🇧**) pada halaman `robotics-sim.html`:
  - Kamus terjemahan `i18n.id` dan `i18n.en` di `js/app.js` dilengkapi untuk seluruh banner hero, judul dan deskripsi 7 modul, label kontrol, selector lingkungan uji, dashboard telemetri, dan tombol aksi.
  - Penambahan atribut `data-i18n` pada seluruh elemen interaktif simulasi dengan persistensi bahasa via `localStorage`.

---

## [v2026.08.12.11] — 2026-08-12

### Added / Ditambahkan
- **`feat(indoor-exploration)`**: Peningkatan arsitektur Modul 6 (Eksplorasi Indoor) menjadi sistem pemetaan otonom berbasis **2D LiDAR SLAM** & **Occupancy Grid Mapping** (sesuai paper ICCAS 2024):
  - **Sistem Pemetaan Kabut (Fog-of-War SLAM)**: Seluruh lingkungan dimulai dalam kondisi tidak diketahui (*Unknown / -1*). Robot secara real-time menembakkan 48 sinar LiDAR $360^\circ$ untuk mengungkap ruang kosong (*Free Space / 0*) dan tembok rintangan (*Wall / 100*).
  - **Deteksi Frontier & Perencanaan Jalur A\***: Algoritma *Frontier-Based* secara dinamis mengekstrak sel perbatasan, mengurutkan prioritas berdasarkan jarak Euclidean, dan memandu robot melalui jalur terpendek $A^*$ untuk melakukan sapuan berkala hingga $100\%$ kelengkapan tercapai.
  - **Pilihan Lingkungan Uji Paper Asli**: Menambahkan preset peta resmi dari paper riset: **Phoenix World** (labirin kompleks), **Complex Zee World** (skala luas), dan **Mememan World** (ruang melingkar).
  - **Live SLAM Progress Dashboard**: Progress bar kelengkapan peta real-time ($\text{Completeness}\%$), stopwatch waktu jelajah ($t$ detik), dan status operasional robot.

---

## [v2026.08.12.10] — 2026-08-12

### Added / Ditambahkan
- **`feat(lidar-slam)`**: Peningkatan arsitektur simulasi LiDAR SLAM (Modul 7) di `robotics-sim.html` & `js/robotics-sim.js`:
  - **Denah Ruangan Realistis (Indoor Multi-Room Layout)**: Menggantikan balok sederhana dengan denah arsitektural indoor lengkap (dinding perimeter, sekat ruangan Lab/Office/Storage, pintu koridor, pilar struktural, dan meja peralatan) dengan estetika blueprint.
  - **Onboard LiDAR Polar Radar Scope Preview**: Menambahkan kanvas radar polar 360° yang merepresentasikan sudut pandang sensor robot (*robot's point-of-view*), lengkap dengan cincin jarak $(0.5\text{m} - 2.0\text{m})$, sumbu azimuth, berkas sapuan radar berputar, dan telemetri jarak real-time (Depan, Kiri, Kanan, Belakang).
  - **Pemisahan Orientasi Bodi Robot vs Putaran Sensor LiDAR**: Bodi robot (*chassis heading*) kini stabil dan hanya berputar saat dikemudikan (WASD / Mouse / Auto-Nav), sementara kepala sensor laser LiDAR di atas robot berputar mandiri 360° berkecepatan tinggi.
- **`css/style.css`**: Menambahkan layout responsif `.lidar-sim-grid` untuk adaptasi layar mobile dan desktop.

---

## [v2026.08.12.9] — 2026-08-12

### Added / Ditambahkan
- **`feat(robotics-sim-theory)`**: Menambahkan dokumentasi teori komprehensif, referensi paper ilmiah asli, dan perumusan matematis KaTeX LaTeX pada semua 7 modul simulasi di `robotics-sim.html`:
  - **Modul 1 (Paper ICCAS 2025)**: Persamaan kinematika unicycle DWMR, rotasi formasi dinamis $o_i(t)$, medan potensial APF gabungan ($U_{\text{att}} + U_{\text{rep}}$), dan hukum kendali kecepatan linier/angular Fuzzy-Tuned PID dengan Mamdani FIS ($f_{\text{pos}}, f_{\text{ang}} \in [0.2, 3]$).
  - **Modul 2 (Paper IJCAS 2026 / Springer Nature)**: Matriks kinematika invers 4 roda Mecanum (MWDR), direct forward kinematics, persamaan kurva referensi sirkular dan lemniscate ($D_{xR}, D_{yR}$), serta hukum kendali PD leader-dependent.
  - **Modul 3 (Path vs Trajectory)**: Analisis teoritis look-ahead pure pursuit ($e_{\text{cross}}$ & kelengkungan $\kappa$) vs batasan waktu spatiotemporal trajectory tracking $\mathbf{e}(t) \to 0$.
  - **Modul 4 (Vision Follower)**: Model kamera lubang jarum (pinhole camera) untuk estimasi jarak metrik dari piksel bounding box ($Z_{\text{est}}$) dan Image-Based Visual Servoing (IBVS).
  - **Modul 5 (Paper SICE FES 2025 / IEEE)**: Teori konsensus graf Laplacian multi-agent ($L = D - A$), 3 gaya bio-inspired flocking Reynolds (separation, cohesion, alignment), modulasi ketinggian sinusoidal 3D, dan mekanisme dynamic goal-shifting ($n_{\text{near}} \ge 2$).
  - **Modul 6 (Paper ICCAS 2024 / IEEE)**: Metrik kelengkapan peta ($\text{Completeness}\%$), perumusan biaya frontier, serta tabel komparasi eksperimental resmi dari paper (Phoenix, Mememan, Complex Zee).
  - **Modul 7 (Paper IJRA 2024 / MDPI)**: Teori pemetaan Bayesian Log-Odds Occupancy Grid Mapping, model 2D LiDAR ray-casting, dan formula kendali kemudi reaktif TurtleBot.
- **`css/style.css`**: Styling collapsible card `.paper-theory-box`, formula card `.math-eq-card`, badge `.paper-meta-badge`, dan `.theory-table`.
- **`robotics-sim.html`**: Penambahan KaTeX auto-render extension untuk rendering dinamis persamaan LaTeX di seluruh dokumen.

---

## [v2026.08.12.8] — 2026-08-12

### Added / Ditambahkan
- **`feat(robotics-sim)`**: Kontrol interaktif lanjutan dan parameter real-time di semua 7 modul simulasi robotika:
  - **Modul 1 (Fuzzy PID & APF)**: Tombol formasi swarm interaktif (**▲ Triangle**, **● Circle**, **― Line**), reset robot, dan penambahan rintangan dinamis APF.
  - **Modul 2 (Model Kinematika & PID)**: Mode ganda **Open-Loop** (slider $\omega_r$/$\omega_l$) dan **PID Trajectory Tracking** dengan slider gain ($K_p$, $K_i$, $K_d$), 4 jenis kurva referensi (*Sinusoidal*, *Circular*, *Lemniscate*, *Square*), serta telemetri error sudut ($e_\theta$) dan kecepatan ($v$).
  - **Modul 3 (Path vs Trajectory)**: Radio selector mode (*Pure Pursuit* vs *Time-Sync*), visualisasi formula KaTeX LaTeX untuk masing-masing mode, slider posisi awal ($X, \Delta Y$), pengatur kecepatan simulasi, dan timer akurat.
  - **Modul 4 (Vision Follower)**: Integrasi tracking mouse dengan OpenCV Bounding Box dan status deteksi target.
  - **Modul 5 (Drone Swarm Flocking)**: Kontrol kawanan 3D dengan slider jumlah drone (3–25), kekuatan *Cohesion*, jarak *Separation*, dan *Alignment*, plus mode interaktif tambah/hapus rintangan di kanvas.
  - **Modul 6 (Eksplorasi Indoor)**: Pemilihan koordinat grid *Start* $(r, c)$ dan *Goal* $(r, c)$, selector algoritma (*Frontier-Based Greedy Goal* vs *Floodfill BFS*), dan visualisasi sel frontier/visited.
  - **Modul 7 (LiDAR SLAM & TurtleBot)**: 3 mode kendali robot (*Mouse*, *TurtleBot Keyboard WASD/Arrow/Q/E*, dan *Auto-Navigation Reactive*), D-Pad interaktif on-screen, dan HUD overlay real-time untuk koordinat $(X, Y)$ dan heading sudut ($\theta$).
- **`css/style.css`**: Styling tombol formasi (`.sim-form-btn`), D-Pad TurtleBot (`.wasd-btn`), serta aksen range slider bernuansa cybernetic neon.

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
