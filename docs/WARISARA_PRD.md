# WARISARA — PRODUCT REQUIREMENTS DOCUMENT (PRD)
## TECHTOPIA Vol. 2 — Lomba Web Design (Konteks: Standar Internasional)

> **Dokumen ini adalah single source of truth untuk AI Agent.**
> AI Agent WAJIB membaca dokumen ini secara penuh sebelum menulis, mengubah, atau menghapus kode apa pun.
> Jika ada instruksi lain (chat, komentar, dsb.) yang bertentangan dengan dokumen ini, dokumen ini yang menang — kecuali ada persetujuan eksplisit dari pemilik project.

---

# 0. DOCUMENT CONTROL

| Field | Value |
|---|---|
| Product Name | **WARISARA** |
| Document Type | Product Requirements Document (PRD) + AI Agent Build Spec |
| Status | Active — Source of Truth |
| Target Event | TECHTOPIA Vol. 2 (bagian dari rangkaian INTEGER#8) — Lomba Web Design |
| Target Standard | Kualitas setara kompetisi/showcase internasional, bukan sekadar lomba sekolah |
| Primary Stack | HTML5 + Tailwind CSS + Vanilla JavaScript (STRICT — lihat Bab 3) |
| Target Users | Juri lomba **dan** seluruh kalangan masyarakat (anak-anak s.d. lansia) |

---

# 1. PRODUCT OVERVIEW

## 1.1 Nama & Tagline

**WARISARA**
- WARIS = Warisan
- NUSANTARA = representasi keberagaman wilayah Indonesia

**Tagline:** *"Yang diwariskan, yang kita teruskan."*

## 1.2 Pernyataan Produk (Product Statement)

WARISARA adalah **pengalaman web interaktif**, bukan website informasi statis, yang menjadikan **peta Indonesia sebagai pintu masuk utama** untuk menjelajahi budaya, seni, pengetahuan lokal, manusia di balik karya (maker/pengrajin), dan ekonomi kreatif Nusantara.

Alur konsep inti:

```
PETA → PROVINSI → WARISAN → CERITA → MANUSIA → KARYA → PENGETAHUAN → GENERASI BERIKUTNYA
```

Pesan emosional yang harus terasa di seluruh website:

> Warisan bukan sesuatu yang hanya disimpan di masa lalu. Warisan adalah pengetahuan, nilai, cerita, dan karya yang dapat dipahami, dikembangkan, dan diteruskan.

## 1.3 Mengapa Produk Ini Harus "WOW"

Tujuan proyek ini bukan sekadar lolos ketentuan lomba, melainkan **membuat juri terkesan sejak detik pertama** dan membuat **siapa pun — dari anak kecil sampai orang tua — ingin menjelajahi web ini sampai habis**. Maka setiap keputusan desain dan fitur harus diuji dengan pertanyaan:

> "Apakah ini membuat orang ingin melanjutkan menjelajah, atau membuat orang berhenti dan menutup tab?"

Jika jawabannya ragu-ragu, desain tersebut harus direvisi.

---

# 2. KONTEKS KOMPETISI (WAJIB DIPATUHI)

## 2.1 Tema & Subtema Resmi

**Tema:** PUSAKA — *"Preserving Unity, Sustaining Ancestral Knowledge & Artistry."*

Makna tema yang harus terasa dalam produk:
- **Preserving unity** → persatuan Nusantara ditampilkan lewat keberagaman 38 provinsi dalam satu peta/satu pengalaman.
- **Sustaining ancestral knowledge** → pengetahuan leluhur disajikan sebagai sesuatu yang hidup dan bisa dipelajari (bukan museum beku).
- **Sustaining artistry** → seni dan kerajinan ditampilkan sebagai karya yang terus berkembang, bukan artefak mati.

**Subtema yang WAJIB terintegrasi, bukan terpisah:**

| # | Subtema Resmi | Implementasi di WARISARA |
|---|---|---|
| 1 | Warisan Budaya & Seni | Peta provinsi, Featured Heritage, cerita budaya, Suara Mereka |
| 2 | Pendidikan Berbasis Lokal | Belajar dari Akar (micro-learning + quiz) |
| 3 | Ekonomi Kreatif & Produk Lokal | From Hands to Home, Meet the Makers |

Ketiga subtema disatukan dalam satu narasi perjalanan agar juri melihat **hubungan yang jelas**, bukan tiga fitur yang berdiri sendiri.

## 2.2 Kriteria Penilaian Resmi (Tahap Penyisihan)

| Kriteria | Bobot | Prioritas Implementasi |
|---|---|---|
| Kreativitas Desain | 30% | **Tertinggi** — konsep unik, visual beda, tipografi, warna, estetika |
| Kesesuaian Tema | 20% | Hubungan kuat & eksplisit dengan "PUSAKA" |
| Efektivitas Penyampaian Informasi | 20% | Hierarki jelas, tidak membingungkan, cepat dipahami |
| Responsivitas & UX | 15% | Desktop, tablet, mobile, navigasi, interaksi |
| Penggunaan Teknologi | 15% | Interaksi & animasi yang relevan — bukan gimmick |

**Prinsip implementasi (urutan prioritas):**

```
DESIGN + STORYTELLING + INFORMATION  >  TECHNOLOGY GIMMICK
```

Jangan mengejar teknologi sebanyak mungkin. Teknologi hanya dipakai jika benar-benar meningkatkan pengalaman.

## 2.3 Kriteria Penilaian Tahap Final (Presentasi)

| Kriteria | Bobot |
|---|---|
| Kemampuan Komunikasi & Presentasi | 30% |
| Penguasaan Materi | 30% |
| Keterkaitan dengan Tema | 20% |
| Kemampuan Menyampaikan Nilai (manfaat bagi pengguna) | 20% |

→ Produk harus mudah **diceritakan** dalam 15 menit: konsep, proses, dan nilai/manfaatnya harus jelas sejak awal pengembangan, bukan ditambahkan belakangan.

---

# 3. ATURAN TEKNIS — STRICT, TIDAK BOLEH DILANGGAR

## 3.1 WAJIB

- HTML5 (semantik)
- CSS3
- **Tailwind CSS** (via CDN/CLI build tanpa bundler framework — lihat 3.4)
- Vanilla JavaScript (ES6+, tanpa framework)

## 3.2 DIPERBOLEHKAN (via CDN/embed, bukan instalasi framework)

- Bootstrap (opsional, tidak wajib dipakai bersamaan Tailwind)
- Library JavaScript via CDN (contoh: GSAP untuk animasi)
- Library SVG via CDN bila diperlukan
- **Google `<model-viewer>` web component** (lihat Bab 9 — ini adalah *custom element*, bukan framework, resmi dari Google, dimuat lewat satu `<script type="module">` tag CDN)
- Google Fonts (CDN)
- **Material Symbols / Material Icons by Google** (CDN, sebagai icon system agar konsisten dan modern tanpa perlu desain icon dari nol)
- Web API native browser: Web Speech API, Web Share API, Canvas API, IntersectionObserver API, localStorage

## 3.3 DILARANG KERAS

- React.js, Vue.js, Svelte, SvelteKit, Next.js
- Laravel, framework PHP apa pun
- Framework berbasis Node.js/Deno/Bun
- Build/export dari framework menjadi static HTML (akan didiskualifikasi jika terdeteksi)
- UI library siap pakai: Flowbite, DaisyUI, atau sejenisnya
- Backend server apa pun
- Database untuk kebutuhan fungsi utama (localStorage client-side diperbolehkan untuk progres quiz/preferensi, ini BUKAN database server)

## 3.4 Prinsip Penting Soal Tailwind

> Boleh pakai Tailwind, tapi **jangan install via npm + build step berbasis Node** yang menyerupai pipeline framework modern.

Gunakan salah satu dari:
- Tailwind Play CDN (`<script src="https://cdn.tailwindcss.com"></script>`) untuk development cepat, **atau**
- Tailwind CLI standalone (binary, tanpa Node project/package.json yang menyerupai framework) jika build CSS production diperlukan, dengan output akhir berupa file CSS statis yang disertakan dalam project — bukan proses build yang dijalankan panitia.

Jika ragu, **gunakan Tailwind CDN** untuk keamanan compliance maksimum, lalu optimalkan dengan custom CSS tambahan di `css/style.css` untuk hal yang Tailwind utility tidak cover (animasi kompleks, SVG map styling, dsb).

## 3.5 Prinsip Umum

Jangan membangun project menggunakan framework lalu mengonversinya menjadi HTML statis. Project harus **dibangun langsung** sebagai HTML/CSS/JS statis dari awal.

---

# 4. ATURAN ORISINALITAS & ASET

- Karya harus 100% orisinal, belum pernah dipublikasikan/menang lomba lain, bebas plagiarisme.
- Semua aset eksternal (gambar, foto, font, audio, ikon, ilustrasi, model 3D) harus:
  - royalty-free / public domain / lisensi yang mengizinkan penggunaan kompetisi, **atau**
  - memiliki izin penggunaan eksplisit.
- Setiap aset eksternal yang dipakai dicatat sumber & lisensinya di `LICENSES.md`.
- Jangan mengarang fakta budaya (sejarah, filosofi motif, asal-usul, teknik kerajinan) — gunakan sumber yang dapat dipertanggungjawabkan, catat di `SOURCES.md`.
- Model 3D dari Google (lihat Bab 9) tetap harus dicek lisensinya sebelum dipakai; jika memakai model generik (bukan artefak budaya spesifik berhak cipta pihak lain), risikonya lebih rendah.

---

# 5. TARGET AUDIENCE — "SEMUA KALANGAN"

Ini adalah requirement baru yang membedakan WARISARA dari kompetitor: **produk harus terasa relevan dan menarik untuk rentang usia dan latar belakang yang sangat luas**, tanpa membuat dua versi web terpisah.

| Segmen | Kebutuhan Utama | Implikasi Desain |
|---|---|---|
| Anak-anak & remaja | Visual menarik, interaksi cepat terasa hasilnya, tidak banyak teks | Micro-learning singkat, Creative Lab (bikin motif = main), feedback visual instan |
| Dewasa muda / mahasiswa | Estetika modern, storytelling, ingin berbagi (share) | Desain premium/editorial, Web Share API, konten yang "layak di-screenshot" |
| Orang tua / profesional | Informasi jelas, kredibel, tidak membingungkan | Hierarki informasi tegas, bahasa Indonesia baku, tidak ada jargon berlebihan |
| Lansia / pengguna awam teknologi | Navigasi sederhana, kontras cukup, tidak bergantung hover | Touch-friendly, ukuran target sentuh besar, fallback dropdown/search provinsi, teks dapat dibacakan (text-to-speech) |
| Pengguna disabilitas (low vision, motorik) | Aksesibilitas dasar | Semantic HTML, alt text, keyboard navigation, kontras warna cukup, aria-label |

**Prinsip desain "All Ages, One Experience":**
1. Jangan membuat mode terpisah ("mode anak" vs "mode dewasa") — itu memecah fokus development dan melanggar prinsip "jangan overbuild" (Bab 15).
2. Satu desain yang **visual-first, teks ringkas, hierarki jelas** secara alami cocok untuk semua umur.
3. Interaksi utama (klik provinsi, Creative Lab, quiz) harus **self-explanatory dalam 5 detik** tanpa butuh instruksi panjang.
4. Sediakan fallback non-hover (tap/klik, dropdown search) agar lansia dan pengguna mobile tidak bergantung pada hover.
5. Audio narasi (Suara Mereka) dan opsional text-to-speech membantu pengguna yang kurang nyaman membaca teks panjang (anak kecil & lansia).

---

# 6. ATURAN TEKNIS — TARGET PENILAIAN (RINGKASAN PRIORITAS)

Urutan prioritas pengambilan keputusan ketika ada konflik:

```
1. Kepatuhan aturan lomba (Bab 3)      → tidak bisa ditawar
2. Konsep & storytelling PUSAKA         → jiwa produk
3. Visual & kreativitas desain          → bobot penilaian tertinggi (30%)
4. Kejelasan informasi                  → bobot 20%
5. Responsivitas & UX                   → bobot 15%
6. Teknologi/animasi                    → bobot 15%, HANYA pendukung, bukan tujuan
```

---

# 7. DESIGN PHILOSOPHY

**Arah visual:** Indonesian Heritage × Editorial × Premium Digital Experience.

Website harus terasa seperti:
- museum digital modern
- digital cultural archive
- interactive editorial website
- premium cultural experience

Website **TIDAK BOLEH** terasa seperti:
- website sekolah / tugas kelas
- template marketplace
- dashboard admin
- ensiklopedia online biasa
- website penuh ornamen batik berlebihan
- dominan merah-putih berlebihan
- hasil AI-generated generik (gradient ungu-biru pasaran, ikon emoji berlebihan, stock photo generik)

---

# 8. CORE EXPERIENCE

## 8.1 Hero Bukan Hero Biasa

Hero utama = **INTERACTIVE MAP OF INDONESIA**. Peta adalah objek utama halaman awal, bukan dekorasi di samping headline.

Pengunjung harus langsung memahami dalam 5–10 detik:
> "Saya bisa menjelajahi Indonesia melalui peta ini."

Hero **dilarang** hanya berisi headline + tombol + foto latar biasa — peta harus menjadi pusat perhatian visual.

## 8.2 Initial Load Sequence

1. Background tampil.
2. Logo WARISARA muncul.
3. Headline muncul.
4. Subheadline muncul.
5. Peta Indonesia muncul bertahap (outline pulau → marker provinsi).
6. Interface siap menerima interaksi.

**Copy:**
- Headline: **WARISARA**
- Sub-headline: **"Yang diwariskan, yang kita teruskan."**
- Supporting copy: *"Jelajahi Nusantara. Temukan cerita, pengetahuan, dan karya yang hidup dari generasi ke generasi."*
- Map prompt: *"Pilih sebuah provinsi untuk memulai perjalanan."*
- CTA (opsional, tidak boleh lebih menonjol dari peta): **"Mulai Menjelajah"**

## 8.3 User Journey (Final Experience Target)

```
BUKA WEBSITE → LIHAT PETA INDONESIA → PAHAM PESAN UTAMA
→ HOVER PROVINSI → KLIK PROVINSI → PETA ZOOM
→ TEMUKAN CERITA → KENALI PENGRAJIN → PAHAMI WARISAN
→ LIHAT POTENSI MODERNNYA → CIPTAKAN SESUATU (Creative Lab)
→ BELAJAR SESUATU (Learn) → PAHAMI NILAINYA → TERUSKAN
```

Setiap tahap harus terasa seperti kelanjutan alami dari tahap sebelumnya, bukan lompatan antarhalaman yang terasa terpisah.

---

# 9. INTERACTIVE INDONESIA MAP + GOOGLE 3D ASSETS

## 9.1 Teknologi Peta

Gunakan **SVG**, bukan PNG, sebagai peta utama. Setiap provinsi adalah SVG `<path>`/`<g>` yang menerima event JS via `data-province`.

```html
<svg id="indonesia-map">
    <g data-province="aceh">...</g>
    <g data-province="sumatera-utara">...</g>
    ...
</svg>
```

## 9.2 Fitur "WOW" Tambahan — Google 3D Assets (`<model-viewer>`)

Ini adalah jawaban langsung untuk permintaan "aset 3D dari Google" dengan tetap 100% patuh pada aturan static HTML/CSS/JS:

**Teknologi:** [`<model-viewer>`](https://modelviewer.dev) — web component resmi dari Google (open source, project Google Chrome/ModelViewer team), dimuat lewat satu baris:

```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>

<model-viewer
  src="assets/models/gerabah.glb"
  alt="Model 3D kerajinan gerabah"
  camera-controls
  auto-rotate
  ar
  ar-modes="webxr scene-viewer quick-look"
  shadow-intensity="1">
</model-viewer>
```

**Catatan penting:** `<model-viewer>` adalah custom element (Web Components API bawaan browser), **bukan framework JavaScript** — ini tetap tergolong "library JavaScript via CDN" sesuai Bab 3.2, jadi aman secara compliance.

**Di mana dipakai:**
- Pada **Featured Heritage** / **From Hands to Home**: tampilkan 1–3 objek kerajinan pilihan (misal gerabah, wayang, ukiran) dalam format 3D yang bisa diputar user — jauh lebih "wow" daripada foto statis.
- Mendukung **AR langsung dari HP** (`ar` attribute) — user bisa melihat objek budaya di ruangan mereka sendiri lewat kamera, tanpa install aplikasi tambahan.
- Model 3D (`.glb`/`.gltf`) bisa diambil dari sumber royalty-free (Sketchfab CC0, Poly Pizza — arsip hasil Google Poly yang sudah dilisensikan terbuka) — **wajib dicatat di LICENSES.md**.

**Prinsip pemakaian:** jangan taruh model 3D di semua provinsi — cukup 2–4 objek unggulan (Level 3 "deep stories", lihat Bab 11) agar tetap ringan dan tidak overbuild.

## 9.3 Google Fonts & Material Symbols (Icon System)

- **Google Fonts** (CDN) untuk typography (lihat Bab 13).
- **Material Symbols** by Google (CDN) sebagai icon system konsisten untuk UI (ikon play/pause audio, close panel, menu, dsb) — menghindari kebutuhan desain icon custom dari nol sambil tetap terlihat modern dan rapi.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
```

Icon hanya dipakai jika membantu pemahaman fungsi (bukan dekorasi berlebihan) — sesuai Bab 17.

---

# 10. PROVINCE DATA ARCHITECTURE

Data provinsi dipisahkan dari logic UI.

```javascript
// data/provinces.js
const provinces = {
  aceh: {
    id: "aceh",
    name: "Aceh",
    island: "Sumatra",
    capital: "...",
    shortDescription: "...",
    heroImage: "...",
    heritage: [],
    arts: [],
    crafts: [],
    foods: [],
    values: [],
    makers: [],
    model3d: null // path ke .glb jika provinsi ini punya featured 3D object
  }
};
```

Struktur folder data jika membesar:

```
/data/
    provinces.js
    heritage.js
    makers.js
    products.js
    learning.js
```

Tidak ada backend — semua data static JS/JSON yang di-fetch client-side atau langsung di-embed.

### Strategi Kedalaman Konten (38 Provinsi)

| Level | Cakupan | Konten |
|---|---|---|
| Level 1 | Semua 38 provinsi | Geometri peta, nama, metadata dasar, klik interaksi |
| Level 2 | Featured provinces (pilihan) | Visual, heritage, makers, products, stories, learning |
| Level 3 | Deep stories (sangat terbatas) | Audio, storytelling detail, model 3D interaktif |

Jangan membuat 38 halaman terpisah — gunakan data-driven rendering dari satu template.

---

# 11. PROVINCE INTERACTION STATES

## 11.1 Hover State
- Province highlight, slight scale/brightness, subtle glow, transisi halus.
- Tooltip minimal (contoh: `JAWA TENGAH` / `3 featured heritage` / `5 stories`) — **jangan** paragraf panjang saat hover.
- Fungsi hover: **recognition + discovery** saja.

## 11.2 Click / Active State
1. Disable klik berulang yang tidak sengaja.
2. Province menjadi active + highlight.
3. Map melakukan zoom/focus.
4. Overlay/background bertransisi.
5. Province detail panel muncul, konten dimuat dari data provinsi.
6. User dapat close/back dengan jelas.

**Target durasi transisi: 300–900ms.** Jangan gunakan animasi panjang yang menghambat.

## 11.3 Province Detail Panel — Information Hierarchy

Urutan tampil (jangan seperti artikel panjang):
1. Nama provinsi
2. Pernyataan singkat (short statement)
3. Visual utama
4. Key facts (provinsi, pulau)
5. Featured heritage (kategori: Warisan / Seni / Kerajinan / Cerita)
6. Makers
7. Creative products
8. Learn (tautan ke micro-learning terkait)
9. CTA

Target: pengunjung paham provinsi tersebut **dalam hitungan detik**, bukan menit.

---

# 12. HOMEPAGE STRUCTURE (Section Order)

```
01 HERO / INTERACTIVE MAP
02 WHY HERITAGE MATTERS
03 FEATURED HERITAGE
04 MEET THE MAKERS
05 FROM HANDS TO HOME
06 HERITAGE × MODERN
07 CREATIVE LAB
08 BELAJAR DARI AKAR
09 SUARA MEREKA
10 PASS IT ON
11 FOOTER
```

## 12.1 Section 02 — Why Heritage Matters
Headline: **"Warisan bukan sekadar benda."**
Supporting: *"Di balik sebuah motif terdapat pengetahuan. Di balik sebuah karya terdapat tangan. Di balik sebuah tradisi terdapat cerita."*
Visual: detail motif, texture, macro craft photo, animated line, typography editorial. Section singkat, tidak panjang.

## 12.2 Section 03 — Featured Heritage
Card berisi: image, category, name, region, deskripsi singkat, CTA "Explore". Hindari grid card generik yang terlalu banyak — pilih kurasi, bukan kuantitas.

## 12.3 Section 04 — Meet the Makers
Tujuan: menunjukkan manusia di balik warisan.
Maker card: portrait, nama, lokasi, profesi, craft, quote singkat.
Detail maker: story, teknik, karya, relasi dengan warisan lokal.

## 12.4 Section 05 — From Hands to Home (Subtema: Ekonomi Kreatif)
**Bukan** marketplace biasa — fokus **story-first commerce**. Setiap produk menjelaskan: produk, maker, origin, material, teknik, proses, makna, harga (opsional), CTA "Kenali Pembuatnya".

## 12.5 Section 06 — Heritage × Modern
Pesan: **"Tradisi tidak harus berhenti di masa lalu."**
Interaksi: before/after slider atau drag comparison (motif tradisional → digital pattern, tenun → fashion, kerajinan → interior, cerita → media digital).

## 12.6 Section 07 — Creative Lab (Fitur Interaktif Utama)
Headline: **"Create From The Roots"** / Subheadline: *"Kenali akar. Ciptakan sesuatu yang baru."*

User dapat: pilih motif → pilih warna → pilih layout → generate pattern (Canvas API) → preview → reset → download → share (Web Share API jika didukung browser).

Teknologi: **HTML Canvas + Vanilla JavaScript** murni (bukan AI generatif, bukan library eksternal besar) — ini justru nilai tambah di kriteria *Penggunaan Teknologi* karena menunjukkan kemampuan coding asli.

**Penting:** hasil pattern harus jelas berstatus "inspirasi digital", **bukan** diklaim sebagai motif tradisional asli — hindari kesalahpahaman budaya.

## 12.7 Section 08 — Belajar dari Akar (Subtema: Pendidikan Berbasis Lokal)
Format: **micro-learning**. Struktur per lesson: Cerita → Makna → Teknik → Nilai → Quiz.
Setelah selesai: feedback positif singkat (contoh: "Lesson Completed +100 Knowledge"), progres disimpan di `localStorage`.
Jangan buat mekanik game kompleks — fokus pada pemahaman budaya, bukan gamifikasi berlebihan.

## 12.8 Section 09 — Suara Mereka
Gunakan **HTML Audio** native dengan custom player (play/pause, progress, durasi, judul, nama narasumber). Konten: cerita pengrajin, cerita budaya, narasi lokal.
**Jangan autoplay** — user harus melakukan interaksi untuk memulai audio (wajib untuk aksesibilitas dan etika UX).

## 12.9 Section 10 — Pass It On (Closing)
Pesan penutup: **"Warisan tidak berhenti pada kita. Kita meneruskannya."**
Visual: akar, pohon, garis penghubung, generasi, titik-titik peta, simbol warisan. Harus terasa emosional namun tetap elegan, tidak berlebihan.

---

# 13. NAVIGATION

```
WARISARA     Explore   Stories   Makers   Creative Lab   Learn     [ Mulai Menjelajah ]
```

- Minimal, mudah dibaca, sticky jika sesuai, berubah style saat scroll, responsif.
- Mobile: hamburger menu, accessible, smooth open/close.

---

# 14. VISUAL SYSTEM

## 14.1 General Direction
Earthy, natural, elegan, editorial, modern, premium, dengan sentuhan visual khas Indonesia yang halus (bukan dekoratif berlebihan).

**Hindari:** merah-putih berlebihan, emas berlebihan, ornamen batik berlebihan, gradient pelangi, glassmorphism generik, kartu/card berlebihan, shadow berlebihan.

## 14.2 Color System (Design Tokens Baseline)

```css
:root {
    --color-bg: #F5F0E8;
    --color-surface: #E7DED0;
    --color-dark: #171612;
    --color-primary: #6B3F2A;
    --color-accent: #C8954A;
    --color-secondary: #315C50;
}
```

Boleh refinement setelah visual testing, tapi jangan ke arah warna neon/ramai berlebihan. Pastikan rasio kontras cukup untuk aksesibilitas semua umur (lihat Bab 16).

## 14.3 Typography

- **Display**: serif editorial/elegan (via Google Fonts).
- **Body**: sans-serif modern, mudah dibaca semua umur (via Google Fonts).
- Prinsip: *traditional feeling + modern readability*.
- Maksimal 1 font family display + 1 font family body — jangan lebih.
- Pastikan ukuran font dasar cukup besar (minimal 16px body) agar nyaman dibaca lansia tanpa perlu zoom.

## 14.4 Shape Language
Rounded corner secukupnya, border tipis, whitespace editorial, layout asimetris jika relevan, bentuk organik, detail garis halus. Jangan jadikan semua komponen berbentuk rounded card generik.

## 14.5 Icon System
Gunakan **Material Symbols (Google, CDN)** untuk konsistensi, atau icon custom SVG jika relevan secara tematik. Icon hanya dipakai jika membantu pemahaman fungsi.

## 14.6 Animation Principles
Animasi harus punya tujuan: reveal informasi, transisi antar state peta, mengarahkan perhatian, storytelling visual, feedback interaksi.

**Hindari:** animasi di setiap elemen, bounce berlebihan, floating acak, animasi terlalu lambat.

**Preferred properties:** opacity, transform, scale, clip-path, stroke-dashoffset, subtle blur, scroll reveal.

GSAP (via CDN) boleh dipakai jika benar-benar membantu kompleksitas animasi peta/transisi.

---

# 15. RESPONSIVE DESIGN & MOBILE MAP STRATEGY

Wajib mendukung desktop, laptop, tablet, mobile.

| Breakpoint | Strategi Peta |
|---|---|
| Desktop | Peta sebagai visual dominan, label & marker lengkap |
| Tablet | Kurangi label, elemen dekoratif, lebar side panel |
| Mobile | **Jangan** memaksakan layout desktop. Gunakan layout sendiri: tap province → highlight → bottom sheet |

**Mobile fallback wajib:** dropdown/select `"Pilih Provinsi ▼"` sebagai alternatif aksesibilitas jika 38 label provinsi tidak terbaca di layar kecil.

Contoh flow mobile:
```
WARISARA → Headline → [ Interactive Map ] → 38 Provinsi [ Select Province ▼ ]
→ Selected: Jawa Barat → [ Visual ] → [ Explore Heritage ]
```

---

# 16. ACCESSIBILITY (Krusial untuk "Semua Kalangan")

Minimal yang wajib dipenuhi:
- Semantic HTML (`<button>` untuk tombol, bukan `<div>`)
- Alt text untuk semua gambar
- Keyboard focus & visible focus state
- Kontras warna cukup (WCAG AA minimal)
- `aria-label` untuk icon button
- SVG province memiliki accessible name dan idealnya dapat diakses keyboard
- Jangan mengandalkan hover untuk fungsi utama di mobile
- Audio tidak autoplay
- Opsional (nilai tambah): dukungan text-to-speech (Web Speech API) untuk membacakan cerita budaya — membantu anak kecil & lansia

---

# 17. PERFORMANCE

- Optimalkan dimensi & format gambar (WebP/AVIF bila cocok), gunakan SVG untuk vector, audio terkompresi.
- Lazy loading untuk gambar/model 3D di luar viewport awal.
- Model 3D (`.glb`) dioptimalkan ukurannya (idealnya di bawah 2–5MB per model) agar tidak membebani load time — ingat batas file project untuk ZIP submission.
- Jangan memasukkan aset berukuran sangat besar tanpa alasan jelas.

---

# 18. FOLDER STRUCTURE

```
WARISARA/
│
├── index.html
├── explore.html
├── makers.html
├── creative-lab.html
├── learn.html
│
├── css/
│   ├── style.css
│   ├── components.css
│   └── animations.css
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── map.js
│   ├── province.js
│   ├── makers.js
│   ├── creative-lab.js
│   ├── quiz.js
│   ├── audio.js
│   └── animations.js
│
├── data/
│   ├── provinces.js
│   ├── heritage.js
│   ├── makers.js
│   ├── products.js
│   └── learning.js
│
├── assets/
│   ├── images/
│   ├── map/
│   ├── models/        ← file .glb/.gltf untuk <model-viewer>
│   ├── icons/
│   ├── audio/
│   └── fonts/
│
├── README.md
├── LICENSES.md
└── SOURCES.md
```

Jika jumlah halaman akhir dikurangi, folder boleh disederhanakan. Jangan membuat file yang tidak terpakai.

---

# 19. CODE QUALITY & JAVASCRIPT ARCHITECTURE

**Wajib:**
- Indentasi konsisten, nama variable/function deskriptif, function kecil & jelas.
- Tidak ada dead code, tidak ada console error, tidak ada duplikasi logic yang bisa dihindari.
- Komentar hanya untuk logic yang memang perlu dijelaskan.

**Contoh pola yang baik:**
```javascript
function openProvince(provinceId) {
    const province = provinces[provinceId];
    if (!province) return;

    renderProvinceDetail(province);
    animateProvinceFocus(provinceId);
}
```

**Struktur modular JS:**
```
main.js
  ↓
navigation.js | map.js | province.js | animations.js | creative-lab.js | quiz.js | audio.js
```

Masing-masing modul bertanggung jawab atas domainnya sendiri (map: init/hover/click/active/reset; province: data lookup/render/panel state; creative lab: canvas/pattern state/controls/export; quiz: question/answer/score/completion).

---

# 20. ERROR HANDLING

- **Map**: jika data provinsi tidak ditemukan → tampilkan fallback, jangan crash.
- **Image**: fallback image/placeholder jika asset gagal dimuat.
- **Audio**: tampilkan info sesuai jika browser tidak mendukung.
- **Canvas**: fallback message jika Canvas API tidak tersedia.
- **Model 3D (`<model-viewer>`)**: sediakan `poster` image sebagai fallback visual saat model belum/tidak termuat, dan pesan sopan jika AR tidak didukung perangkat.
- Tidak boleh ada uncaught JavaScript error pada flow normal.

---

# 21. UX RULES

1. User harus selalu tahu di mana mereka berada.
2. Jangan membuat interaksi tanpa feedback visual.
3. Klik provinsi harus memberi feedback jelas.
4. Modal/panel harus mudah ditutup.
5. Jangan mengunci user dalam animasi (user bisa skip/interrupt).
6. Tombol back/close harus jelas dan konsisten posisinya.
7. Interaksi mobile harus touch-friendly (target sentuh cukup besar).
8. Jangan mengandalkan hover untuk fungsi utama di mobile.
9. Jangan autoplay audio.
10. CTA harus jelas, tidak ambigu.
11. Jangan membuat navigasi terlalu banyak item.
12. Jangan membuat user membaca paragraf panjang hanya untuk memahami cara pakai fitur.

---

# 22. ASSET SOURCING CHECKLIST

Sebelum memasukkan aset apa pun (gambar, audio, model 3D):

```
[ ] Source diketahui
[ ] License diketahui
[ ] Boleh dipakai untuk kompetisi/commercial use
[ ] Attribution diperlukan?
[ ] Attribution sudah dicatat di LICENSES.md
[ ] File sudah disimpan lokal di folder assets/ (bukan hotlink remote)
```

Untuk model 3D via `<model-viewer>`: sumber yang direkomendasikan adalah repositori CC0/CC-BY seperti Poly Pizza (arsip terbuka eks-Google Poly) atau Sketchfab dengan filter lisensi "downloadable" — tetap dicek dan dicatat satu per satu.

---

# 23. DEVELOPMENT ORDER (JANGAN LANGSUNG BUAT SEMUA)

```
Phase 01 — Foundation       : folder, HTML skeleton, CSS variables, typography, navbar, base responsive
Phase 02 — Hero             : hero layout, map SVG, map data, markers, hover, click, detail panel
Phase 03 — Map Refinement   : map animation, zoom, transisi, mobile behavior
Phase 04 — Home Storytelling: Why Heritage, Featured Heritage, Heritage × Modern
Phase 05 — Makers           : data, cards, detail story
Phase 06 — Creative Lab     : canvas, motif, palette, generator, export
Phase 07 — Learning         : lessons, quiz, score, completion
Phase 08 — Audio            : story player, controls
Phase 09 — 3D/AR Showcase   : integrasi <model-viewer> pada 2–4 objek unggulan
Phase 10 — Polish           : responsive, animasi, aksesibilitas, performa
Phase 11 — QA               : link, console, aset, responsive, GitHub Pages check
```

## 23.1 MVP Priority

**MUST HAVE:**
1. Interactive Indonesia Map
2. Province hover
3. Province click
4. Province detail panel
5. Strong visual design
6. Featured Heritage
7. Makers
8. Creative Lab
9. Responsive design
10. Theme storytelling (PUSAKA terasa jelas)

**SHOULD HAVE:**
11. Google `<model-viewer>` 3D/AR showcase (2–4 objek)
12. Audio narasi (Suara Mereka)
13. Advanced map transitions
14. Web Share API

**COULD HAVE (jika waktu memungkinkan):**
15. Lebih banyak deep province stories
16. Lebih banyak konten quiz
17. Text-to-speech opsional untuk aksesibilitas

**Prinsip:** jangan korbankan visual utama (map + storytelling) demi fitur tambahan.

---

# 24. DESIGN ANTI-GENERIC CHECK

Sebelum dianggap final, periksa:

```
[ ] Apakah terlihat seperti template?
[ ] Apakah terlalu banyak card?
[ ] Apakah warna terlalu generik?
[ ] Apakah map benar-benar menjadi pengalaman utama?
[ ] Apakah budaya hanya menjadi dekorasi, bukan substansi?
[ ] Apakah user memahami konsep dalam 5–10 detik?
[ ] Apakah visual memiliki hierarchy yang jelas?
[ ] Apakah setiap interaksi memiliki alasan (bukan gimmick)?
[ ] Apakah anak kecil DAN orang tua sama-sama bisa menggunakannya tanpa instruksi panjang?
```

Jika ada jawaban buruk → revisi sebelum lanjut.

---

# 25. COMPETITION COMPLIANCE CHECKLIST (Sebelum Submission)

```
[ ] Static HTML/CSS/JS murni
[ ] Tidak menggunakan React/Vue/Svelte/Next.js
[ ] Tidak menggunakan Laravel/framework PHP
[ ] Tidak menggunakan framework Node/Deno/Bun
[ ] Tidak build/export dari framework ke static HTML
[ ] Tidak menggunakan UI library terlarang (Flowbite/DaisyUI/dsb)
[ ] Tailwind hanya sebagai CSS framework (CDN atau CLI standalone), bukan bagian dari build pipeline framework
[ ] Semua library eksternal (termasuk model-viewer, GSAP) dimuat via CDN/embed
[ ] Folder project rapi sesuai struktur Bab 18
[ ] Semua aset tersedia di dalam ZIP (tidak hotlink remote untuk aset final)
[ ] Desain responsif (desktop/tablet/mobile)
[ ] Bahasa Indonesia sebagai bahasa utama konten
[ ] Tidak ada unsur SARA/pornografi/kekerasan
[ ] Karya 100% original
[ ] Sumber/lisensi aset terdokumentasi (LICENSES.md, SOURCES.md)
[ ] Surat pernyataan orisinalitas karya (bermaterai) siap, sesuai template panitia
[ ] Tidak ada console error
[ ] Semua link internal berfungsi
[ ] Kompatibel dengan GitHub Pages (hosting dilakukan panitia)
[ ] Landing page: 1–10 halaman sesuai batas ketentuan teknis
```

---

# 26. IMPORTANT AI AGENT RULES

AI Agent **HARUS**:

1. Membaca dokumen PRD ini secara penuh sebelum mulai coding.
2. Memahami bahwa project ini adalah **static website untuk kompetisi**, bukan aplikasi production bebas.
3. Tidak mengganti stack teknologi tanpa izin eksplisit dari pemilik project.
4. Tidak menginstal framework apa pun (React/Vue/dsb), termasuk tidak menjalankan `npm create vite`, `npx create-react-app`, atau sejenisnya.
5. Tidak menggunakan generated UI template siap pakai.
6. Tidak mengubah konsep inti WARISARA (peta sebagai pintu masuk, narasi PETA→PROVINSI→WARISAN→...→GENERASI BERIKUTNYA) tanpa persetujuan.
7. Tidak menghapus fitur MUST HAVE (Bab 23.1) tanpa alasan dan tanpa izin.
8. Tidak menumpuk seluruh kode dalam satu file jika dapat dipisah secara wajar sesuai Bab 18.
9. Tidak membuat interaksi palsu (terlihat berfungsi tapi sebenarnya tidak — misal tombol download yang tidak benar-benar mendownload apa pun).
10. Tidak menggunakan aset berhak cipta pihak lain sembarangan; harus dicek lisensinya dan dicatat.
11. Tidak mengarang fakta budaya sebagai kebenaran absolut tanpa sumber.
12. Memprioritaskan responsive design sejak awal, bukan ditambal di akhir.
13. Memastikan setiap interaksi memberi feedback (visual/animasi/state change).
14. Menjaga visual tetap premium dan tidak generik (lihat Bab 24).
15. Menguji aksesibilitas dasar (keyboard, alt text, kontras) sebagai bagian dari "selesai", bukan opsional.

---

# 27. AGENT WORKFLOW

**Sebelum coding:**
- **STEP A** — Inspect workspace (apakah sudah ada file project sebelumnya).
- **STEP B** — Baca project files, README (jika ada), folder asset, kode yang sudah ada.
- **STEP C** — Buat/rapikan struktur folder sesuai Bab 18.
- **STEP D** — Bangun foundation (HTML skeleton, CSS variables, navbar, base responsive).
- **STEP E** — Implementasikan Hero + Map terlebih dahulu (ini bagian paling kritikal).
- **STEP F** — Test interaksi peta secara menyeluruh (hover, click, mobile fallback).
- **STEP G** — Baru lanjut ke section/fitur lain sesuai Development Order (Bab 23).

**Jangan membangun seluruh website sekaligus tanpa testing bertahap.**

## 27.1 Iteration Rule

Setelah setiap fitur besar selesai:
1. Jalankan/test website.
2. Cek console (tidak boleh ada error).
3. Cek tampilan desktop.
4. Cek tampilan mobile.
5. Cek interaksi (klik, hover, tap).
6. Perbaiki isu yang ditemukan.
7. Baru lanjut ke fitur berikutnya.

**Milestones:**
```
M1 — Foundation
M2 — Interactive Map
M3 — Province Experience
M4 — Homepage Storytelling
M5 — Makers
M6 — Creative Lab
M7 — Learning
M8 — 3D/AR Showcase (Google model-viewer)
M9 — Polish
M10 — QA
```

## 27.2 "Jangan Overbuild" — Prinsip Keputusan

Jika dihadapkan dua pilihan:

| Opsi A | vs | Opsi B | Pilih |
|---|---|---|---|
| Fitur sangat kompleks tapi tidak stabil | vs | Fitur sederhana tapi polished | **B** |
| Menambah teknologi baru | vs | Memperbaiki visual/UX yang sudah ada | **B** |

WARISARA harus menang melalui **konsep, visual, storytelling, dan interaksi yang bermakna** — bukan jumlah library atau fitur yang dipasang.

---

# 28. DEFINITION OF DONE

Project dianggap selesai jika memenuhi semua poin berikut:

**Visual:** premium, kohesif, original, mudah dibaca, relevan secara budaya.

**UX:** intuitif, responsif, mulus (smooth), accessible untuk semua kalangan umur.

**Technical:** static HTML/CSS/JS murni, kompatibel GitHub Pages, tidak ada pelanggaran aturan framework, tidak ada console error, semua aset tersedia dalam project.

**Concept:** tema PUSAKA terasa jelas, budaya bukan hanya dekorasi, unsur pendidikan terasa, unsur ekonomi kreatif terasa, peta menjadi pengalaman inti (core experience).

**Competition Readiness:** source code siap di-ZIP, surat pernyataan orisinalitas siap, lisensi/sumber aset terdokumentasi, materi siap dipresentasikan dalam 15 menit.

---

# 29. HOMEPAGE COPY REFERENCE (Bahasa Indonesia — Final)

| Bagian | Copy |
|---|---|
| Hero | **WARISARA** — *"Yang diwariskan, yang kita teruskan."* |
| Supporting | *"Jelajahi Nusantara. Temukan cerita, pengetahuan, dan karya yang hidup dari generasi ke generasi."* |
| Map Prompt | *"Pilih sebuah provinsi untuk memulai perjalanan."* |
| Section 02 | *"Warisan bukan sekadar benda."* |
| Section 04 | *"Mereka yang menjaganya tetap hidup."* |
| Section 05 | *"Dari tangan, menjadi karya."* |
| Section 06 | *"Tradisi tidak harus berhenti di masa lalu."* |
| Creative Lab | *"Kenali akar. Ciptakan sesuatu yang baru."* |
| Learning | *"Belajar dari akar."* |
| Closing | *"Warisan tidak berhenti pada kita. Kita meneruskannya."* |

---

# 30. END GOAL

WARISARA harus terasa seperti:

> **Sebuah perjalanan digital menyusuri Nusantara — bukan sekadar website tentang budaya Indonesia.**

Peta Indonesia adalah pintu masuk. Setiap provinsi adalah sebuah cerita. Setiap cerita membawa kita kepada warisan. Setiap warisan membawa kita kepada manusia. Setiap manusia membawa kita kepada karya. Dan karya tersebut menjadi sesuatu yang dapat diteruskan oleh generasi berikutnya — oleh siapa pun yang membukanya, dari anak kecil sampai orang tua.

**WARISARA — Yang diwariskan, yang kita teruskan.**

---

# 31. IMMEDIATE FIRST TASK FOR AI AGENT

Jangan langsung mengimplementasikan seluruh website.

## TASK 01 — FOUNDATION + INTERACTIVE MAP

**Deliverables:**
1. Struktur folder project sesuai Bab 18.
2. `index.html` dengan skeleton semantik.
3. CSS foundation (`style.css`) + Tailwind CDN terpasang.
4. JS foundation (`main.js`, `navigation.js`, `map.js`).
5. Navbar sesuai Bab 13.
6. Hero section sesuai Bab 8.
7. SVG peta Indonesia dengan minimal struktur `data-province` untuk 38 provinsi (geometri boleh disederhanakan di tahap awal, detail dapat diperhalus di Phase 03).
8. Struktur data 38 provinsi (`data/provinces.js`).
9. Province hover behavior.
10. Province click behavior.
11. Province detail panel (versi awal, boleh belum lengkap kontennya).
12. Responsive behavior dasar (desktop + mobile fallback dropdown).
13. Initial load animation sesuai Bab 8.2.

**Setelah TASK 01 selesai, AI Agent WAJIB:**
- Melaporkan file yang dibuat/diubah.
- Melaporkan keterbatasan yang diketahui (known limitations).
- **Tidak lanjut** ke fitur besar berikutnya (Creative Lab, Makers, dll) sebelum hasil map direview oleh pemilik project.
