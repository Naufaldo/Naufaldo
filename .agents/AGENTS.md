# Naufaldo Portfolio — Agent Governance Rules (AGENTS.md)

## Identitas Proyek

- **Nama Proyek**: Naufaldo M.Sc. — Portfolio Website
- **URL Produksi**: https://naufaldo.github.io/Naufaldo/
- **Repository**: https://github.com/Naufaldo/Naufaldo
- **Tech Stack**: Vanilla HTML, CSS, JavaScript — GitHub Pages
- **Deployment**: GitHub Actions CI/CD (auto-deploy on push to `main`)

---

## 1. Aturan Umum Agent (General Rules)

- Setiap perubahan kode wajib di-commit ke git dengan pesan commit yang **mengikuti format Conventional Commits** (lihat Bagian 4).
- Setelah setiap sesi kerja atau perubahan signifikan, agent **wajib memperbarui `CHANGELOG.md`** di root repository.
- Jangan pernah menghapus kode yang masih berfungsi tanpa konfirmasi eksplisit dari pengguna.
- Selalu jalankan `git status` sebelum commit untuk memastikan tidak ada file yang tertinggal.
- Jangan commit file `lighthouse.json`, file log sementara, atau data scratchpad ke repository.
- **Selalu buat atau perbarui `CHANGELOG.md`** setiap kali ada commit baru sebelum melakukan `git push`.

---

## 2. Aturan Keamanan (Security Rules)

- **DILARANG** menggunakan `innerHTML` atau `document.write()` secara langsung untuk memasukkan input pengguna — gunakan `textContent`, `createTextNode()`, atau `DOMParser`.
- **DILARANG** menyimpan username atau password secara hardcoded di dalam HTML dengan atribut `value=""` yang terlihat di source code.
- Selalu tambahkan `rel="noopener noreferrer"` pada semua `<a target="_blank">` link eksternal.
- GitHub Actions workflow wajib menggunakan `persist-credentials: false` pada langkah `actions/checkout`.
- Jangan pernah commit API keys, token, atau credential sensitif ke repository.

---

## 3. Aturan Arsitektur & Kode (Code Architecture Rules)

### HTML
- Setiap halaman HTML harus memiliki tag SEO lengkap: `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">`, OpenGraph, Twitter Card, dan JSON-LD Schema.org.
- Setiap halaman wajib memiliki `<h1>` yang unik dan deskriptif.
- Semua gambar harus memiliki atribut `alt`, `width`, dan `height` yang tepat.
- Gunakan semantic HTML5: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.

### CSS
- Semua variabel desain (warna, font, spacing) didefinisikan sebagai CSS Custom Properties di `:root` dalam `css/style.css`.
- Jangan menggunakan Tailwind CSS kecuali diminta secara eksplisit.
- Semua halaman menggunakan file CSS yang sama: `css/style.css`.
- Gunakan `@media` breakpoints yang konsisten untuk responsivitas mobile.

### JavaScript
- Semua kode JS utama berada di `js/app.js`.
- Kode simulasi robotika berada di `js/robotics-sim.js`.
- Setiap modul simulasi adalah sebuah class JavaScript yang diinisialisasi dalam blok `DOMContentLoaded`.
- Gunakan `localStorage` untuk menyimpan preferensi bahasa dan data CMS lokal.
- **DILARANG** menggunakan `eval()`, `Function()`, atau metode dynamic code execution lainnya.
- Selalu tambahkan error handling dan pengecekan null sebelum mengakses elemen DOM.

### Simulasi Robotika (`robotics-sim.html` + `js/robotics-sim.js`)
- Setiap modul simulasi harus memiliki class JS yang mandiri dengan method: `constructor(canvasId)`, `update()`, `draw()`, `loop()`, dan `resize()`.
- Canvas harus menggunakan wrapper CSS `.sim-canvas-wrapper` dengan ukuran tinggi tetap.
- Semua 7 modul simulasi harus diinisialisasi dalam satu `DOMContentLoaded` event listener.
- Tab switching harus ditangani oleh handler yang terpusat di file robotics-sim.js.

---

## 4. Konvensi Commit (Conventional Commits)

Format wajib untuk setiap commit:

```
<type>(<scope>): <deskripsi singkat>
```

### Tipe Commit yang Diizinkan:

| Tipe | Penggunaan |
|------|-----------|
| `feat` | Fitur baru |
| `fix` | Perbaikan bug |
| `perf` | Optimasi performa |
| `style` | Perubahan visual/CSS/UI |
| `refactor` | Refactoring kode tanpa perubahan fitur |
| `docs` | Perubahan dokumentasi (README, CHANGELOG) |
| `seo` | Perubahan khusus SEO/meta tags |
| `ci` | Perubahan CI/CD workflow |
| `chore` | Pemeliharaan rutin (dependencies, config) |
| `security` | Perbaikan keamanan |

### Contoh Pesan Commit yang Benar:

```
feat(robotics-sim): add LiDAR SLAM autonomous navigation module
fix(security): remove hardcoded credentials from CMS login form
seo(all-pages): update OpenGraph meta tags with project-specific descriptions
perf(images): compress CS_1.jpg from 3.2MB to 98KB using WebP conversion
docs(changelog): update CHANGELOG.md for v2026.08.12 release
```

---

## 5. Aturan Deployment & CI/CD

- Branch produksi: `main`
- Deployment otomatis via `.github/workflows/deploy.yml` setiap kali push ke `main`
- Sebelum push ke `main`, pastikan:
  - [ ] Semua file JS/HTML/CSS tidak mengandung error sintaks
  - [ ] `CHANGELOG.md` sudah diperbarui
  - [ ] `sitemap.xml` mencerminkan semua halaman aktif
  - [ ] `robots.txt` mengarah ke `sitemap.xml` yang benar
- Jangan gunakan `git push --force` ke branch `main` tanpa alasan yang sangat mendesak.

---

## 6. Aturan SEO & Aksesibilitas

- Setiap halaman baru wajib ditambahkan ke `sitemap.xml` sebelum di-push.
- Semua form input harus memiliki `<label>` yang terhubung via atribut `for`.
- Semua tombol (`<button>`) harus memiliki teks yang deskriptif atau atribut `aria-label`.
- Pastikan rasio kontras warna teks vs background minimal **4.5:1** (WCAG AA).
- Selalu gunakan font dari Google Fonts yang sudah terdefinisi dalam desain sistem.

---

## 7. Aturan CHANGELOG (Wajib Dipatuhi)

> **ATURAN KRITIS**: Agent wajib memperbarui file `CHANGELOG.md` setiap kali melakukan perubahan kode yang akan di-commit ke repository.

### Format CHANGELOG:

```markdown
## [vYYYY.MM.DD] - YYYY-MM-DD

### Added / Ditambahkan
- Deskripsi fitur baru

### Fixed / Diperbaiki
- Deskripsi bug yang diperbaiki

### Changed / Diubah
- Deskripsi perubahan yang ada

### Security / Keamanan
- Deskripsi perbaikan keamanan

### Performance / Performa
- Deskripsi optimasi performa

### Docs / Dokumentasi
- Deskripsi perubahan dokumentasi
```

### Prosedur Wajib Sebelum Setiap `git push`:

1. Perbarui `CHANGELOG.md` dengan ringkasan semua commit baru.
2. Commit CHANGELOG update dengan pesan: `docs(changelog): update CHANGELOG.md for vYYYY.MM.DD`
3. Lanjutkan dengan `git push origin main`.

---

## 8. Aturan Data & Konten

- Data portofolio (publikasi, proyek, pengalaman kerja) didefinisikan sebagai array/object JavaScript di `js/app.js`.
- Data blog tersimpan di `localStorage` dengan key `naufaldo_blog_posts`.
- Data proyek tersimpan di `localStorage` dengan key `naufaldo_projects`.
- Semua konten yang berkaitan dengan identitas profesional harus sesuai dengan data di CV resmi dan LinkedIn Naufaldo.
- Jangan menambah atau mengubah data kualifikasi/sertifikasi tanpa konfirmasi eksplisit dari pengguna.

---

## 9. Larangan Tegas (Hard Rules — DILARANG)

- ❌ DILARANG menggunakan `innerHTML` langsung untuk memasukkan data dari sumber eksternal/user input.
- ❌ DILARANG menyimpan credential atau API key di file JS/HTML yang bisa diakses publik.
- ❌ DILARANG menghapus file yang masih direferensikan oleh halaman lain.
- ❌ DILARANG commit `lighthouse.json`, `node_modules/`, atau file binary besar ke repository.
- ❌ DILARANG menambahkan library/framework baru tanpa persetujuan pengguna.
- ❌ DILARANG mendeploy langsung ke `main` tanpa memperbarui `CHANGELOG.md` terlebih dahulu.
- ❌ DILARANG menghapus atau mengubah data publikasi ilmiah, sertifikasi, atau penghargaan Naufaldo tanpa konfirmasi eksplisit.

---

## 10. Referensi File Penting

| File | Deskripsi |
|------|-----------|
| `index.html` | Halaman utama portofolio |
| `projects.html` | Galeri proyek & inovasi rekayasa |
| `publications.html` | Daftar publikasi ilmiah |
| `robotics-sim.html` | Lab simulasi robotika interaktif |
| `css/style.css` | Design system CSS utama |
| `js/app.js` | Logic utama aplikasi & data |
| `js/robotics-sim.js` | Engine simulasi robotika (7 modul) |
| `sitemap.xml` | XML sitemap untuk Google Search |
| `robots.txt` | Aturan crawler mesin pencari |
| `CHANGELOG.md` | Log perubahan versi (WAJIB diperbarui) |
| `.github/workflows/deploy.yml` | CI/CD GitHub Actions deployment |
| `.agents/AGENTS.md` | File ini — aturan governance agent |
