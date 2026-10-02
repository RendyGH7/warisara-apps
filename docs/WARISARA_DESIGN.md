# WARISARA — DESIGN SYSTEM
## Visual, Motion & Content Specification untuk AI Agent

> Dokumen ini adalah **lampiran teknis dari `WARISARA_PRD.md`**, fokus khusus pada: warna, tipografi, aset, copywriting, layout, dan animasi.
> Jika ada hal yang tidak diatur di sini, kembali ke prinsip di PRD Bab 7 (Design Philosophy) dan Bab 24 (Anti-Generic Check).
> Semua ketentuan teknis di PRD Bab 3 (stack: HTML + Tailwind + Vanilla JS, tanpa framework) tetap berlaku penuh di dokumen ini.

---

# 0. DESIGN PRINCIPLE SUMMARY

Lima aturan yang tidak boleh dilanggar di seluruh halaman:

1. **Tidak ada emoji** — di mana pun. Gunakan ikon custom/Material Symbols atau tidak sama sekali.
2. **Tulisan singkat, padat, kuat** — setiap kalimat harus pantas ditampilkan besar. Tidak ada paragraf panjang yang membuat orang malas baca.
3. **Setiap aset terasa dibuat khusus** — tidak ada stock icon generik, tidak ada clip art, tidak ada foto template. Semua terasa *bespoke* dan mewah.
4. **Layout harus presisi** — semua elemen align ke grid, spacing konsisten, tidak ada yang "hampir rapi".
5. **Animasi smooth dan bermakna** — setiap interaksi (hover, scroll, klik) punya gerakan halus yang terasa premium, bukan sekadar efek.

---

# 1. COLOR SYSTEM — "NUSANTARA MODERN"

## 1.1 Filosofi Warna

Palet tidak memakai merah-putih (bendera) atau emas berlebihan (klise "budaya = emas"). Sebagai gantinya, warna diambil dari material otentik Nusantara yang justru terasa **mewah secara alami**:

| Sumber Inspirasi | Warna yang Diambil |
|---|---|
| Indigo tarum (pewarna batik/tenun ikat tertua Nusantara) | Biru-hitam pekat, deep indigo |
| Tanah liat & gerabah | Terracotta hangat |
| Hutan tropis & daun jati | Hijau tua kehutanan |
| Benang songket & perunggu | Emas kusam (brass), bukan emas berkilau |
| Kain lawas & kertas daluang | Krem hangat, bukan putih bersih |
| Arang & kayu jati tua | Hitam kecoklatan (bukan hitam pekat #000) |

Hasilnya: palet yang terasa **otentik, bersahaja, tapi tetap premium dan modern** — seperti galeri museum kelas dunia, bukan dekorasi pasar seni.

## 1.2 Core Palette (Design Tokens)

```css
:root {
    /* Base */
    --color-bg: #F6F1E7;          /* krem hangat, dasar daluang */
    --color-bg-alt: #EFE7D8;      /* krem lebih gelap, untuk section alternating */
    --color-surface: #FBF8F2;     /* putih gading, untuk card/panel */

    /* Ink / Dark */
    --color-ink: #1A1612;         /* hitam kecoklatan, bukan black pure */
    --color-ink-soft: #3A322A;    /* untuk body text sekunder */

    /* Primary — Indigo Tarum */
    --color-indigo-900: #16213A;
    --color-indigo-700: #233A5E;
    --color-indigo-500: #35578A;

    /* Secondary — Hijau Hutan */
    --color-forest-900: #1E2E24;
    --color-forest-700: #2E4A38;
    --color-forest-500: #3F6350;

    /* Accent — Terracotta */
    --color-terracotta-700: #A8512F;
    --color-terracotta-500: #C06A42;
    --color-terracotta-300: #DDA07C;

    /* Accent — Brass / Perunggu (dipakai sangat terbatas) */
    --color-brass-600: #A47E3F;
    --color-brass-400: #C9A567;

    /* Utility */
    --color-border: #D9CDB8;
    --color-overlay: rgba(26, 22, 18, 0.72);
}
```

## 1.3 Tailwind Config (via CDN script, bukan file build)

Karena memakai Tailwind Play CDN (lihat PRD Bab 3.4), daftarkan token warna di atas sebagai extend config agar bisa dipakai sebagai utility class (`bg-indigo-900`, `text-terracotta-500`, dst) tanpa menulis CSS custom berulang:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          bg: '#F6F1E7',
          'bg-alt': '#EFE7D8',
          surface: '#FBF8F2',
          ink: '#1A1612',
          'ink-soft': '#3A322A',
          indigo: { 900: '#16213A', 700: '#233A5E', 500: '#35578A' },
          forest: { 900: '#1E2E24', 700: '#2E4A38', 500: '#3F6350' },
          terracotta: { 700: '#A8512F', 500: '#C06A42', 300: '#DDA07C' },
          brass: { 600: '#A47E3F', 400: '#C9A567' },
          border: '#D9CDB8'
        },
        fontFamily: {
          display: ['Fraunces', 'serif'],
          body: ['Manrope', 'sans-serif']
        }
      }
    }
  }
</script>
```

## 1.4 Aturan Pemakaian Warna

| Peran | Warna | Catatan |
|---|---|---|
| Background utama | `--color-bg` | Dominan di hampir semua halaman |
| Section alternatif | `--color-bg-alt` | Dipakai bergantian agar ritme halaman tidak monoton |
| Teks utama | `--color-ink` | Jangan pakai hitam pure (#000) |
| Teks sekunder | `--color-ink-soft` | Untuk caption, metadata |
| Warna dominan brand/CTA utama | `indigo-900` / `indigo-700` | Identitas utama WARISARA — tegas, premium |
| Highlight hangat (makers, produk) | `terracotta-500` | Untuk elemen manusia & karya (Meet the Makers, From Hands to Home) |
| Elemen alam/nilai/edukasi | `forest-700` / `forest-500` | Untuk Belajar dari Akar, Heritage × Modern |
| Aksen premium (sangat terbatas) | `brass-400` / `brass-600` | Hanya untuk garis tipis, border aktif, atau detail kecil — **jangan** jadi warna dominan |

**Larangan:** jangan campur lebih dari 3 warna non-neutral dalam satu section. Pilih satu warna dominan per section sesuai konteksnya (lihat tabel di atas).

---

# 2. TYPOGRAPHY

## 2.1 Font Selection

| Peran | Font | Sumber | Alasan |
|---|---|---|---|
| Display / Headline | **Fraunces** | Google Fonts | Serif editorial dengan karakter hangat & sedikit "handmade", terasa premium tanpa kaku, punya optical size variant yang bagus untuk headline besar |
| Body / UI | **Manrope** | Google Fonts | Sans-serif modern, geometris tapi humanis, sangat mudah dibaca di semua ukuran layar — cocok untuk semua umur |
| Angka/Metadata (opsional) | **Manrope** (tabular numerals) | Google Fonts | Konsistensi dengan body font |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

## 2.2 Type Scale

| Token | Ukuran (desktop) | Ukuran (mobile) | Font | Pemakaian |
|---|---|---|---|---|
| `display-xl` | 88px / 1.0 | 44px / 1.05 | Fraunces, 400 | Hero headline "WARISARA" |
| `display-lg` | 56px / 1.05 | 36px / 1.1 | Fraunces, 400 | Section headline besar |
| `display-md` | 36px / 1.15 | 28px / 1.2 | Fraunces, 500 | Sub-section headline |
| `heading-sm` | 22px / 1.3 | 20px / 1.3 | Manrope, 700 | Card title, nama provinsi |
| `body-lg` | 19px / 1.6 | 17px / 1.6 | Manrope, 400 | Supporting copy, intro paragraf |
| `body-base` | 16px / 1.6 | 16px / 1.6 | Manrope, 400 | Body text umum |
| `caption` | 13px / 1.4, letter-spacing 0.03em | 12px / 1.4 | Manrope, 600, uppercase | Label kategori, metadata |

## 2.3 Aturan Tipografi

- Maksimal **2 font family** total (sudah ditetapkan: Fraunces + Manrope). Jangan tambah font ketiga.
- Headline (`display-*`) selalu memakai **Fraunces**, body selalu **Manrope** — jangan ditukar.
- Line-length body text maksimal **65–75 karakter per baris** agar nyaman dibaca semua umur.
- Font-size dasar body **tidak boleh di bawah 16px** (aturan aksesibilitas lansia dari PRD Bab 16).
- Gunakan `font-variation-settings` Fraunces (`opsz`) untuk headline besar agar detail serif terlihat tajam di ukuran besar.

---

# 3. CONTENT & COPYWRITING RULES

## 3.1 Prinsip Utama

> Tulisan WARISARA harus terasa seperti **caption di museum premium** — singkat, puitis, tapi informatif. Bukan artikel blog, bukan brosur sekolah.

## 3.2 Aturan Panjang Teks

| Jenis Teks | Batas Maksimal |
|---|---|
| Headline section | 6–8 kata |
| Sub-headline/supporting copy | 1 kalimat (maks ±18 kata) |
| Card description (Featured Heritage, Produk) | 2 kalimat pendek, maks ±25 kata total |
| Province short statement | 1 kalimat puitis, maks ±10 kata |
| Maker quote | 1 kalimat, terasa personal |
| Paragraf terpanjang di seluruh web (province deep story) | Maks 3–4 kalimat per blok, dipecah per section, bukan satu blok panjang |

**Jika draft teks melebihi batas ini → potong, jangan diringkas jadi padat tapi tetap panjang. Hilangkan kata yang tidak menambah makna.**

## 3.3 Teknik Menulis "Singkat tapi Kuat"

1. **Satu ide per kalimat.** Jangan gabungkan dua informasi dalam satu kalimat panjang.
2. **Mulai dari gambaran, bukan definisi.** Hindari "Batik adalah..." → lebih baik "Motif yang menyimpan cerita dan filosofi."
3. **Gunakan jeda baris sebagai alat desain**, bukan hanya tanda baca — baris pendek yang di-breakdown terasa lebih kuat secara visual daripada satu kalimat panjang rata kanan-kiri.
4. **Hindari kata pengisi** ("sangat", "banyak sekali", "merupakan salah satu") — langsung ke inti.
5. **Fakta spesifik > klaim umum.** "Teknik batik tulis, satu kain satu bulan pengerjaan" lebih kuat daripada "Batik adalah warisan budaya yang berharga."

## 3.4 Larangan Konten

- **Tidak ada emoji** di headline, body, button, maupun microcopy mana pun.
- Tidak ada tanda seru berlebihan (`!!!`), tidak ada huruf kapital semua untuk menekankan emosi (CAPS LOCK berlebihan) — kecuali untuk `caption` label kategori yang memang didesain uppercase kecil.
- Tidak ada jargon teknologi/marketing kosong ("revolusioner", "terdepan", "no. 1").
- Tidak boleh ada klaim budaya tanpa dasar (lihat PRD Bab 22).

## 3.5 Microcopy (Tombol, Label, CTA)

Semua microcopy maksimal **2–3 kata**, kalimat perintah aktif, bukan deskriptif:

| Buruk | Baik |
|---|---|
| "Klik di sini untuk melihat info lebih lanjut" | "Explore" |
| "Lihat profil lengkap pembuatnya" | "Kenali Pembuatnya" |
| "Mulai mengerjakan kuis sekarang" | "Mulai Kuis" |

---

# 4. ASSET DIRECTION — "BESPOKE & PREMIUM"

## 4.1 Prinsip Umum

Semua aset visual **harus terasa dibuat khusus untuk WARISARA**, bukan diambil dari library generik. Jika sebuah aset terlihat seperti bisa dipakai website lain tanpa diubah — aset itu salah.

## 4.2 Icon System

- **Dasar:** Material Symbols (Google, outlined/rounded variant, weight 300–400) via CDN — dipakai untuk ikon fungsional kecil (play/pause, close, menu, arrow) agar konsisten dan tidak perlu digambar manual satu per satu.
- **Icon tematik/dekoratif** (kategori Warisan/Seni/Kerajinan/Cerita, dsb): **digambar custom sebagai SVG line-art tipis**, terinspirasi garis motif Nusantara (parang, kawung, ikat) yang **disederhanakan menjadi bentuk minimal** — bukan motif penuh/ramai. Satu warna stroke (`currentColor`), stroke-width konsisten (1.25–1.5px), tanpa fill solid.
- **Jangan** memakai icon pack generik (Font Awesome gaya "flat colorful", emoji-style icon, atau clip-art bertema budaya yang terlihat murah).

## 4.3 Fotografi & Imagery

- Treatment warna: semua foto (makers, produk, heritage) melewati **duotone/color-grade overlay** yang selaras palet (indigo gelap atau terracotta hangat sebagai shadow tone) via CSS (`mix-blend-mode`, `filter: sepia() + hue-rotate()` atau overlay layer) — agar galeri foto terasa satu kesatuan visual, bukan kumpulan foto stok acak.
- Komposisi: utamakan macro shot (detail tangan, tekstur kain, proses kerja) dibanding foto wide generik — ini juga mendukung storytelling "manusia di balik karya".
- Semua foto final disimpan lokal di `assets/images/`, tidak hotlink (PRD Bab 22).

## 4.4 Model 3D (`<model-viewer>`)

- Styling konsisten lintas semua model 3D: `shadow-intensity`, `exposure`, `environment-image` (gunakan satu environment lighting preset neutral/studio untuk semua model agar terasa seperti **satu koleksi galeri yang sama**, bukan model acak dari sumber berbeda).
- Background viewer transparan/menyatu dengan `--color-surface`, bukan background putih default — agar terasa menyatu dengan desain, bukan "widget tempelan".

## 4.5 Pattern & Motif Digital (Creative Lab)

- Motif dasar yang disediakan di Creative Lab (PRD Bab 12.6) digambar sebagai **SVG/Canvas path custom**, bukan import pattern generik dari internet.
- Palet warna pilihan di Creative Lab tetap mengacu ke Color System Bab 1 (plus beberapa variasi tint/shade tambahan khusus untuk eksplorasi kreatif).

## 4.6 Texture & Background Detail

- Boleh menambahkan **subtle texture** (grain halus, noise sangat tipis) pada background krem untuk kesan "kertas/kain", menggunakan CSS `background-image` SVG noise generator inline — **sangat halus**, tidak boleh mengganggu keterbacaan teks.
- Hindari ornamen batik/ukiran sebagai background penuh — cukup garis/detail tipis di sudut atau pembatas section (lihat PRD Bab 7, larangan "excessive batik decoration").

---

# 5. LAYOUT & GRID SYSTEM

## 5.1 Grid Dasar

- **Desktop (≥1280px):** 12-column grid, max container width **1440px**, margin kiri-kanan min **80px**, gutter **24px**.
- **Tablet (768–1279px):** 8-column grid, margin **40px**, gutter **20px**.
- **Mobile (<768px):** 4-column grid, margin **20px**, gutter **16px**.

## 5.2 Spacing Scale (8pt System)

Gunakan kelipatan 4px/8px secara konsisten (via Tailwind spacing default sudah berbasis ini — pastikan tidak ada custom margin/padding acak di luar skala):

```
4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160
```

**Larangan:** tidak boleh ada nilai spacing acak seperti `padding: 13px` atau `margin: 27px` — semua harus merujuk ke skala ini.

## 5.3 Section Rhythm

- Jarak vertikal antar section besar (homepage): **96–160px** (desktop), **64–80px** (mobile).
- Setiap section memiliki padding internal konsisten di seluruh halaman — jangan ada section yang terasa lebih sempit/renggang tanpa alasan.

## 5.4 Alignment Rules

1. Semua elemen teks dalam satu blok (headline + sub-headline + body) harus align ke **baseline grid yang sama** — tidak boleh "hampir sejajar".
2. Card dalam satu row harus punya **tinggi, padding, dan radius yang identik** — gunakan satu komponen card yang direuse, bukan dibuat ulang per section dengan ukuran berbeda-beda.
3. Image dan teks di layout dua-kolom harus align secara vertikal (top-align atau center-align — pilih satu, konsisten di semua section serupa).
4. Icon dan teks di sebelahnya harus align secara optical (bukan hanya `align-items: center` default jika ikon punya visual weight berbeda).

## 5.5 Consistency Checklist (QA Visual)

```
[ ] Semua card punya padding yang sama persis
[ ] Semua button punya height & border-radius yang sama
[ ] Semua section-heading punya margin-bottom yang sama
[ ] Semua gambar dalam grid yang sama punya aspect-ratio yang sama
[ ] Tidak ada elemen yang "nyaris align" tapi sebenarnya off by 1-2px
[ ] Warna border/divider konsisten di seluruh halaman
```

---

# 6. ANIMATION & INTERACTION SYSTEM

## 6.1 Motion Principle

> Setiap animasi harus terasa seperti **gerakan fisik yang halus**, bukan efek digital yang tiba-tiba. Easing adalah kunci — jangan pernah pakai `linear` atau default `ease` bawaan browser untuk animasi UI.

## 6.2 Easing & Duration Tokens

```css
:root {
    --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);   /* ease-out kuat, untuk reveal/enter */
    --ease-smooth: cubic-bezier(0.65, 0, 0.35, 1);    /* ease-in-out, untuk transisi dua arah */
    --ease-snappy: cubic-bezier(0.33, 1, 0.68, 1);    /* untuk hover micro-interaction */

    --duration-fast: 180ms;     /* hover kecil (button, link) */
    --duration-base: 320ms;     /* transisi standar (card, panel kecil) */
    --duration-medium: 560ms;   /* reveal section, province detail panel */
    --duration-slow: 900ms;     /* map zoom/focus, hero load sequence */
}
```

Durasi ini selaras dengan PRD Bab 11.2 (target transisi province 300–900ms).

## 6.3 Hover Micro-Interactions (Wajib Ada di Semua Elemen Interaktif)

| Elemen | Perilaku Hover |
|---|---|
| Nav link | Underline tipis slide-in dari kiri (`transform: scaleX`), warna teks menguat, `--duration-fast` |
| Button primer | Background sedikit gelap/terang + scale `1.02`, `--ease-snappy` |
| Card (Heritage/Maker/Product) | Elevasi halus (shadow bertambah tipis), gambar di dalam card zoom `1.04` (`overflow: hidden` di parent), `--duration-base` |
| Province (SVG) | Fill berubah ke warna highlight + brightness naik tipis + glow halus (`filter: drop-shadow`), `--duration-fast`, lihat PRD Bab 11.1 |
| Icon button | Background circle muncul halus di belakang icon, `--duration-fast` |
| Link teks inline | Garis bawah dari tebal→tipis atau warna transisi, bukan langsung berubah warna instan |

**Semua hover harus punya efek balik (reverse) yang sama smooth-nya saat cursor keluar** — jangan hanya animasikan "masuk" tanpa animasi "keluar".

## 6.4 Scroll Reveal

- Gunakan `IntersectionObserver` (native, bukan library tambahan) untuk trigger reveal saat elemen masuk viewport.
- Pattern reveal: `opacity: 0 → 1` + `transform: translateY(24px) → translateY(0)`, durasi `--duration-medium`, `--ease-premium`.
- **Stagger** untuk grup elemen (grid card, list item): delay bertahap 60–100ms antar elemen — gunakan GSAP (CDN) jika stagger kompleks, atau `transition-delay` CSS per index jika sederhana.
- Jangan reveal ulang setiap kali elemen keluar-masuk viewport saat scroll naik-turun (sekali reveal, tetap terlihat) — supaya tidak mengganggu.

## 6.5 Map Animation Detail (merujuk PRD Bab 9 & 33)

| State | Animasi |
|---|---|
| Initial load | Outline pulau fade+draw (`stroke-dashoffset` animasi, seperti digambar), lalu marker muncul stagger per region, `--duration-slow` total |
| Hover province | Fill + glow transisi `--duration-fast`, tooltip fade+slide kecil |
| Click province | Province highlight instan → map pan/zoom `--duration-slow` dengan `--ease-smooth` → detail panel slide-in/fade `--duration-medium` dengan sedikit delay setelah zoom selesai (bukan bersamaan, agar terasa bertahap/cinematic) |
| Close/back | Reverse dengan durasi sedikit lebih cepat dari saat membuka (terasa lebih responsif saat keluar) |

## 6.6 Page/Section Transition

- Transisi antar halaman (`index.html` → `explore.html` dst, jika memakai multi-page) sebaiknya memakai **fade transition halus** (`opacity` out lalu in, ±200–250ms) via JS sederhana agar tidak terasa "loncat" seperti navigasi browser biasa — tetap tanpa framework, cukup event listener pada link + `setTimeout` sebelum navigasi, atau View Transitions API native (`document.startViewTransition`) jika mendukung progressive enhancement (fallback: navigasi normal tanpa transisi di browser yang tidak support, tidak error).

## 6.7 Larangan Animasi

- Tidak ada animasi "bounce" (elastic overshoot) — kesan terlalu playful/kekanakan, tidak sesuai arah premium-editorial.
- Tidak ada floating/parallax acak tanpa tujuan naratif.
- Tidak ada animasi loop infinite yang mengganggu fokus (kecuali elemen kecil yang memang perlu menarik perhatian sekali, misalnya indikator "scroll down" di hero — itu pun harus halus dan subtle).
- Hormati `prefers-reduced-motion`: sediakan fallback non-animasi (langsung tampil tanpa transisi) untuk user yang mengaktifkan setting ini di sistem operasi mereka.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 7. COMPONENT-LEVEL VISUAL SPEC (Ringkas)

| Komponen | Spesifikasi Kunci |
|---|---|
| Button Primary | Bg `indigo-900`, teks `surface`, radius 999px (pill) atau 8px (pilih satu gaya, konsisten di semua tombol), padding `16px 32px`, hover: scale + darken |
| Button Secondary | Border 1px `border` color, teks `ink`, bg transparan, hover: bg `bg-alt` |
| Card | Bg `surface`, radius 12–16px, border 1px `border` (tipis, bukan shadow berat), padding konsisten `24–32px` |
| Province Tooltip | Bg `ink` dengan opacity tinggi, teks `surface`, radius kecil 6px, padding `8px 12px`, font `caption` style |
| Navbar | Bg transparan di hero, berubah ke `bg` + border-bottom tipis saat scroll (`backdrop-filter: blur()` boleh dipakai untuk efek premium) |
| Divider antar section | Garis tipis 1px `border`, bukan spacer kosong besar tanpa elemen visual |

---

# 8. FINAL QUALITY GATE (Sebelum Dianggap Selesai Secara Visual)

```
[ ] Tidak ada satupun emoji di seluruh halaman
[ ] Semua teks sudah dipangkas sesuai batas Bab 3.2
[ ] Semua icon dekoratif adalah custom SVG, bukan icon pack generik bertema budaya
[ ] Semua foto sudah melewati treatment warna yang konsisten
[ ] Grid & spacing sudah diperiksa sesuai checklist Bab 5.5
[ ] Setiap elemen interaktif punya hover state yang smooth (masuk & keluar)
[ ] Scroll reveal berjalan konsisten di seluruh section, tanpa re-trigger berulang yang mengganggu
[ ] Map animation mengikuti sequence Bab 6.5 secara penuh
[ ] prefers-reduced-motion sudah di-handle
[ ] Font hanya Fraunces + Manrope di seluruh halaman, tidak ada font ketiga yang menyelip
[ ] Warna yang dipakai hanya dari token Bab 1, tidak ada warna acak baru yang muncul di tengah development
```
