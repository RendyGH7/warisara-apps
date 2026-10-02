# WARISARA — HERO SECTION SPECIFICATION
## Interactive Indonesia Map Hero

> **Scope:** Dokumen ini KHUSUS untuk Hero Section WARISARA.
>
> Dokumen ini bukan PRD seluruh website. Jangan mengimplementasikan section lain berdasarkan dokumen ini.
>
> Hero harus menjadi pengalaman pertama dan paling kuat ketika user membuka website WARISARA.

---

# 1. HERO OBJECTIVE

Hero WARISARA tidak boleh menggunakan pola landing page biasa seperti:

- headline besar
- gambar background
- button
- selesai

Sebaliknya, hero harus menjadikan **peta Indonesia interaktif sebagai visual utama sekaligus interaction utama**.

Konsep:

> **Jelajahi Nusantara melalui peta. Temukan cerita di balik setiap wilayah.**

Hero harus membuat user langsung memahami bahwa:

1. WARISARA berhubungan dengan warisan Nusantara.
2. Indonesia merupakan pusat pengalaman.
3. Setiap provinsi dapat dieksplorasi.
4. Ketika provinsi dipilih, user mendapatkan cerita/informasi.
5. Peta bukan dekorasi, tetapi merupakan navigation/interaction utama.

---

# 2. HERO CORE MESSAGE

## Brand

**WARISARA**

## Main tagline

**Yang diwariskan, yang kita teruskan.**

## Supporting copy

> Jelajahi Nusantara. Temukan cerita, pengetahuan, dan karya yang hidup dari generasi ke generasi.

## Map instruction

> **Pilih sebuah provinsi untuk memulai perjalanan.**

Alternative microcopy yang dapat digunakan jika diperlukan:

> **38 provinsi. Ribuan cerita. Satu warisan Nusantara.**

Jangan menggunakan semua copy sekaligus.

Hierarchy harus tetap sederhana.

---

# 3. HERO VISUAL CONCEPT

Visual direction:

**Interactive cultural map × editorial digital experience**

Hero harus terasa:

- premium
- modern
- cultural
- immersive
- elegant
- informative
- interactive

Bukan:

- website sekolah
- peta Google Maps
- dashboard
- marketplace
- template landing page
- website dengan ornamen budaya berlebihan
- peta PNG statis
- desain penuh warna tanpa hierarchy

---

# 4. HERO LAYOUT

Desktop layout secara konseptual:

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  WARISARA             Explore Stories Makers Learn            │
│                                                               │
│                                                               │
│                 WARISARA                                      │
│                                                               │
│          Yang diwariskan,                                     │
│          yang kita teruskan.                                  │
│                                                               │
│      Jelajahi Nusantara. Temukan cerita,                      │
│      pengetahuan, dan karya yang hidup                        │
│      dari generasi ke generasi.                               │
│                                                               │
│              [ Mulai Menjelajah ]                             │
│                                                               │
│                         ┌───────────────┐                     │
│                        /   SUMATRA       \                    │
│                       /                   \                   │
│                          KALIMANTAN                           │
│                               ●                             │
│                       JAVA          SULAWESI                  │
│                         ●              ●                      │
│                              BALI                            │
│                               ●                              │
│                                           PAPUA               │
│                                             ●                 │
│                                                               │
│             38 PROVINSI • RIBUAN CERITA                       │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

Layout aktual boleh disesuaikan setelah browser testing.

Prioritas visual:

1. Map
2. Brand/tagline
3. Province interaction
4. Supporting text
5. CTA
6. Decorative elements

---

# 5. MAP IS THE HERO

Peta Indonesia harus menjadi elemen visual terbesar/terpenting.

Jangan membuat peta terlalu kecil sehingga terlihat seperti icon.

Peta harus memiliki presence yang kuat.

Idealnya:
- desktop: sekitar 45–65% area visual hero
- mobile: sekitar 70–90% area visual hero setelah headline

Nilai tersebut bukan pixel requirement. Gunakan sebagai visual guideline.

---

# 6. MAP TECHNOLOGY

Gunakan:

**SVG**

Bukan:
- PNG
- JPG
- screenshot map
- static image map

Alasan:
- setiap provinsi dapat menjadi interactive element
- dapat diberi hover
- dapat diberi active state
- dapat dianimasikan
- scalable untuk desktop/mobile
- lebih mudah dikontrol dengan JavaScript

---

# 7. SVG STRUCTURE

Gunakan struktur yang data-driven.

Contoh konseptual:

```html
<svg
    id="indonesia-map"
    viewBox="..."
    aria-label="Peta interaktif Indonesia"
>
    <g
        class="province"
        data-province="aceh"
        tabindex="0"
        role="button"
        aria-label="Aceh"
    >
        ...
    </g>

    <g
        class="province"
        data-province="sumatera-utara"
        tabindex="0"
        role="button"
        aria-label="Sumatera Utara"
    >
        ...
    </g>

    ...
</svg>
```

Tidak wajib menggunakan struktur persis seperti di atas, tetapi prinsipnya harus sama:

**setiap provinsi harus dapat diidentifikasi dan dihubungkan dengan data.**

---

# 8. 38 PROVINCE SUPPORT

Hero harus dirancang untuk mendukung 38 provinsi Indonesia.

Setiap province object minimal memiliki:

```javascript
{
    id: "aceh",
    name: "Aceh",
    island: "Sumatra",
    capital: "...",
    shortDescription: "...",
    heroImage: "...",
    heritage: [],
    colors: {
        primary: "...",
        accent: "..."
    }
}
```

Jangan memasukkan informasi budaya yang belum diverifikasi.

Untuk MVP, semua provinsi harus memiliki:
- map geometry
- name
- click target
- basic data

Tidak semua provinsi wajib memiliki deep content di hero.

---

# 9. INITIAL HERO STATE

Saat halaman pertama kali dibuka:

## Sequence

### Step 1
Background muncul.

### Step 2
Navbar/brand muncul.

### Step 3
Brand/tagline muncul.

### Step 4
Peta mulai terbentuk.

### Step 5
Pulau-pulau muncul secara halus.

### Step 6
Province markers/highlights muncul.

### Step 7
Instruction text muncul.

Animation harus terasa seperti:

**Nusantara sedang "muncul" dari kegelapan/ruang kosong.**

Jangan menggunakan animation yang terlalu cepat atau terlalu flashy.

---

# 10. HERO ANIMATION STYLE

Preferred animation:
- fade
- translate
- scale
- stroke reveal
- clip-path
- subtle glow
- opacity
- map line drawing

Avoid:
- excessive bounce
- spinning map
- flashing
- random particle overload
- giant parallax
- animation yang mengganggu readability

Animation harus membantu storytelling.

---

# 11. MAP DEFAULT STATE

Dalam kondisi normal:

- province tidak semuanya menyala terang
- map memiliki hierarchy
- beberapa subtle markers dapat terlihat
- outline pulau jelas
- background tidak terlalu ramai

User harus melihat bahwa:

> "Peta ini dapat disentuh/diklik."

Gunakan subtle visual affordance.

---

# 12. PROVINCE MARKER

Marker digunakan untuk membantu user menemukan province.

Marker dapat berupa:

```text
●
```

atau bentuk custom sederhana.

Marker tidak boleh terlalu besar.

Marker:
- visible
- subtle
- clickable
- touch-friendly
- tidak menutupi map

Jika semua 38 marker terlihat terlalu ramai pada desktop/mobile, gunakan adaptive behavior.

---

# 13. HOVER INTERACTION

Saat mouse hover sebuah province:

### Province:
- highlight
- slight brightness increase
- optional scale 1.01–1.03
- subtle glow

### Tooltip:
muncul dekat province.

Contoh:

```text
┌────────────────────────┐
│ JAWA TENGAH             │
│                         │
│ Warisan • Seni • Cerita │
└────────────────────────┘
```

Tooltip tidak boleh terlalu besar.

Hover hanya untuk discovery.

---

# 14. HOVER PERFORMANCE

Jangan menggunakan animation yang menyebabkan:
- layout shift
- map jumping
- neighboring province moving
- tooltip flickering

Gunakan:
- transform
- opacity
- filter secukupnya

Tooltip harus memiliki delay sangat kecil atau langsung muncul.

---

# 15. CLICK INTERACTION

Saat user klik province:

Contoh:

**Jawa Tengah**

Flow:

```text
USER CLICK
    ↓
Province selected
    ↓
Other provinces dim
    ↓
Selected province highlighted
    ↓
Map focus/zoom
    ↓
Detail panel appears
```

Province yang dipilih harus menjadi visual focal point.

---

# 16. MAP FOCUS / ZOOM

Ketika province diklik:

Jangan benar-benar mengubah browser zoom.

Gunakan transform pada map container atau SVG.

Contoh:

```text
Full Indonesia
      ↓
Scale + translate
      ↓
Selected province centered
```

Zoom harus:
- smooth
- tidak terlalu besar
- tidak membuat user kehilangan context
- reversible

User harus tetap memahami bahwa province tersebut berada di Indonesia.

---

# 17. PROVINCE DETAIL PANEL

Setelah click, munculkan panel.

Desktop:

```text
┌───────────────────────────────────────────────────────┐
│                                                       │
│                     JAWA TENGAH                       │
│                                                       │
│              Tanah tempat tradisi                     │
│              terus hidup.                             │
│                                                       │
│             [ VISUAL / IMAGE ]                        │
│                                                       │
│    ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│    │ BATIK    │ │ WAYANG   │ │ GAMELAN  │            │
│    └──────────┘ └──────────┘ └──────────┘            │
│                                                       │
│                 [ Jelajahi ]                          │
│                                                       │
│                                     [ × Tutup ]       │
└───────────────────────────────────────────────────────┘
```

Panel dapat berupa:
- modal
- side panel
- overlay
- bottom sheet

Pilih berdasarkan hasil visual testing.

---

# 18. PROVINCE PANEL INFORMATION

Minimal:

### Province name

Contoh:
**JAWA TENGAH**

### Short statement

Contoh:
**Tanah tempat tradisi terus hidup.**

### Location

```text
Pulau Jawa
```

### Featured heritage

Minimal 2–3 item jika tersedia.

### CTA

```text
Jelajahi Warisan
```

### Close

```text
×
```

Jangan memasukkan paragraph panjang.

---

# 19. PROVINCE PANEL VISUAL

Setiap province detail dapat memiliki:
- hero image
- local craft image
- texture
- abstract cultural pattern
- subtle local visual treatment

Image harus:
- legal
- optimized
- local asset
- memiliki alt text

Jika image belum tersedia:
gunakan placeholder yang elegan, bukan broken image.

---

# 20. PROVINCE COLOR ADAPTATION

Opsional.

Setiap province dapat memiliki subtle accent color.

Contoh:

```javascript
colors: {
    primary: "#...",
    accent: "#..."
}
```

Tetapi:

**JANGAN membuat setiap province menjadi warna neon yang berbeda.**

Perubahan warna harus subtle dan tetap berada dalam design system WARISARA.

---

# 21. MAP + PANEL RELATIONSHIP

Map dan panel harus terasa sebagai satu experience.

Jangan:

```text
Map
↓
random modal
```

Harus terasa:

```text
Map
↓
selected province
↓
province becomes focus
↓
story emerges
```

---

# 22. CLOSE / BACK EXPERIENCE

Saat user menekan close:

```text
Province Detail
      ↓
Panel closes
      ↓
Map returns to full Indonesia
      ↓
Selected province remains subtly highlighted
      ↓
User can choose another province
```

Jika menggunakan zoom:
kembalikan transform dengan animation.

Jangan langsung menghilangkan panel tanpa transition.

---

# 23. KEYBOARD ACCESSIBILITY

Province harus dapat diakses keyboard.

Minimal:
- `tabindex`
- focus state
- Enter/Space untuk select
- Esc untuk close detail

Contoh:

```javascript
province.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        openProvince(province.dataset.province);
    }
});
```

Focus state harus terlihat.

---

# 24. MOBILE EXPERIENCE

Mobile tidak boleh hanya menjadi desktop yang diperkecil.

Struktur:

```text
┌──────────────────────┐
│ WARISARA         ☰   │
│                      │
│ Yang diwariskan,     │
│ yang kita teruskan.  │
│                      │
│ Jelajahi Nusantara.  │
│                      │
│     [ MAP ]          │
│                      │
│  Pilih provinsi      │
│                      │
└──────────────────────┘
```

Setelah province dipilih:

```text
┌──────────────────────┐
│ JAWA BARAT        ×  │
│                      │
│ [ Visual ]           │
│                      │
│ Tanah Sunda...       │
│                      │
│ BATIK                │
│ ANGKLUNG             │
│                      │
│ [ Jelajahi ]         │
└──────────────────────┘
```

Gunakan:
**bottom sheet** atau **full-screen detail view** jika lebih nyaman.

---

# 25. MOBILE MAP INTERACTION

Jangan mengandalkan hover.

Mobile:
- tap province
- tap marker
- tap/select province

Jika province terlalu kecil untuk disentuh:

buat interaction target yang lebih besar daripada visual path tanpa mengubah tampilan.

Alternatif:

```text
[ Pilih Provinsi ▼ ]
```

Dropdown/select hanya sebagai fallback/accessibility.

---

# 26. MOBILE MAP LABELS

Jangan menampilkan 38 label secara permanen jika menyebabkan:
- overlap
- unreadable
- clutter

Prioritas:

**Map shape > interaction > labels**

Label dapat muncul setelah selected.

---

# 27. HERO HEIGHT

Desktop:
- hero dapat menggunakan `min-height: 100svh`
- jangan menggunakan fixed height yang menyebabkan content terpotong

Mobile:
- gunakan `min-height: 100svh`
- perhatikan browser mobile address bar
- gunakan modern viewport units jika sesuai

Hero harus terasa seperti full-screen opening experience.

---

# 28. SCROLL BEHAVIOR

Hero tidak boleh membuat user merasa terjebak.

Berikan indicator:

```text
SCROLL TO EXPLORE
        ↓
       ↓
```

atau:

```text
Explore the stories ↓
```

Indicator harus subtle.

Setelah user scroll:
- hero tetap smooth
- map dapat sedikit parallax
- jangan menggunakan parallax berat yang mengganggu mobile

---

# 29. NAVBAR WITHIN HERO

Navbar minimal:

```text
WARISARA

Explore
Stories
Makers
Creative Lab
Learn
```

CTA:

```text
[ Mulai Menjelajah ]
```

Navbar tidak boleh mengambil terlalu banyak ruang.

Desktop:
- horizontal
- transparent/soft background

Setelah scroll:
- boleh berubah menjadi solid/translucent

Mobile:
- hamburger
- accessible menu

---

# 30. HERO BACKGROUND

Background harus membantu map.

Recommended direction:
- deep earthy dark
- charcoal
- dark brown/green
- subtle texture

Contoh baseline:

```css
--hero-bg: #171612;
```

Boleh diberi:
- noise texture
- subtle radial gradient
- faint grid
- subtle organic pattern

Jangan:
- full photo background yang membuat map sulit dibaca
- gradient neon
- excessive particles

---

# 31. MAP COLOR

Map harus kontras dengan background.

Contoh direction:

```text
Background:
dark charcoal

Map:
warm cream / muted gold

Selected province:
accent gold

Hover:
brighter accent

Other provinces:
low opacity
```

Jangan terlalu terang sampai terasa seperti game map.

---

# 32. MAP VISUAL LANGUAGE

Peta harus terlihat:
- artistic
- clean
- precise
- premium

Tambahkan visual treatment seperti:
- thin strokes
- subtle grain
- elegant glow
- low-opacity outlines

Tetapi bentuk geografis provinsi harus tetap jelas.

---

# 33. MAP SOURCE / ACCURACY

Peta harus menggunakan geometry yang akurat dan sumber yang legal.

Jangan menggambar 38 provinsi secara asal.

Sebelum memasukkan map asset:
1. pastikan sumber
2. pastikan license
3. simpan source information
4. simpan asset lokal
5. optimalkan SVG

Tambahkan dokumentasi source jika menggunakan asset pihak ketiga.

---

# 34. HERO DATA FLOW

Flow:

```text
SVG Province
      ↓
data-province ID
      ↓
province data object
      ↓
openProvince(id)
      ↓
get province data
      ↓
update selected state
      ↓
animate map
      ↓
render province panel
```

Jangan hard-code 38 event handler secara terpisah.

Gunakan event/data-driven architecture.

---

# 35. STATE MODEL

Hero minimal memiliki:

```javascript
let selectedProvince = null;
let isProvincePanelOpen = false;
let isMapFocused = false;
```

Atau gunakan state structure yang lebih baik jika diperlukan.

State harus memiliki satu source of truth.

---

# 36. EXPECTED FUNCTIONS

Nama fungsi dapat berbeda, tetapi logic minimal:

```javascript
initializeMap()
bindProvinceEvents()
handleProvinceHover()
handleProvinceLeave()
openProvince(provinceId)
focusProvince(provinceId)
renderProvincePanel(province)
closeProvince()
resetMapView()
```

Jangan membuat logic map tersebar di banyak file tanpa alasan.

---

# 37. HERO FILE STRUCTURE

Minimal:

```text
index.html

css/
├── style.css
├── hero.css
└── animations.css

js/
├── main.js
├── map.js
├── province.js
└── animations.js

data/
└── provinces.js

assets/
├── map/
│   └── indonesia.svg
├── images/
└── fonts/
```

Jika project menggunakan struktur yang sudah ada dari master PRD, integrasikan hero ke struktur tersebut.

Jangan membuat duplicate CSS/JS tanpa alasan.

---

# 38. PERFORMANCE REQUIREMENTS

Hero adalah first impression.

Prioritaskan:
- fast initial load
- optimized SVG
- compressed image
- minimal JS
- no huge video background
- no unnecessary 3D library

Jangan menggunakan:
- Three.js
- WebGL
- heavy map engine

kecuali benar-benar diperlukan dan sudah disetujui.

Untuk konsep ini, **SVG + Vanilla JS + CSS + optional GSAP sudah cukup.**

---

# 39. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce) {
    /* reduce or disable non-essential animation */
}
```

User tetap harus bisa menggunakan map tanpa animation.

---

# 40. HERO ERROR FALLBACK

Jika SVG map gagal:
- tampilkan fallback map container
- jangan blank page

Jika province data gagal:
- tampilkan nama province
- tampilkan basic fallback message

Jika image gagal:
- gunakan fallback visual

JavaScript error tidak boleh membuat seluruh hero rusak.

---

# 41. HERO CONTENT RULE

Hero tidak boleh menjadi tempat untuk menjelaskan seluruh konsep WARISARA.

Hero hanya perlu menjawab:

### WHAT?
WARISARA adalah pengalaman tentang warisan Nusantara.

### HOW?
Melalui peta Indonesia interaktif.

### ACTION?
Pilih provinsi dan mulai menjelajah.

Informasi lebih dalam diletakkan di section berikutnya.

---

# 42. DO NOT DO

AI Agent DILARANG membuat hero menjadi:

### ❌ Generic SaaS Hero

```text
Build better future
[Get Started]
```

### ❌ Generic tourism website

```text
Explore Indonesia
[Book Now]
```

### ❌ Static culture gallery

```text
Image
Image
Image
```

### ❌ Dashboard

```text
Province
Stats
Cards
Charts
```

### ❌ Google Maps clone

Jangan membuat UI seperti aplikasi navigasi.

### ❌ Excessive cultural decoration

Jangan memenuhi seluruh background dengan batik/ornamen.

---

# 43. DO

Hero harus:

### ✓ Memiliki identitas WARISARA
### ✓ Menjadikan Indonesia sebagai focal point
### ✓ Menjadikan map sebagai interaction
### ✓ Membuat user penasaran
### ✓ Memberikan feedback ketika province disentuh
### ✓ Memberikan informasi ketika province dipilih
### ✓ Terlihat premium
### ✓ Responsive
### ✓ Accessible
### ✓ Fast
### ✓ Original

---

# 44. HERO QUALITY CHECK

Sebelum dianggap selesai:

```text
[ ] Hero terlihat kuat dalam 3–5 detik pertama
[ ] Indonesia langsung terbaca sebagai objek utama
[ ] Map bukan sekadar dekorasi
[ ] 38 province dapat diidentifikasi
[ ] Province dapat di-hover desktop
[ ] Province dapat di-tap mobile
[ ] Province dapat dipilih dengan keyboard
[ ] Province active state jelas
[ ] Detail panel muncul dengan smooth
[ ] Close/back bekerja
[ ] Map dapat kembali ke keadaan awal
[ ] Tidak ada animation yang mengganggu
[ ] Tidak ada console error
[ ] Tidak ada broken image
[ ] Mobile tidak overflow
[ ] Text tetap readable
[ ] Map tidak terlalu kecil
[ ] Map tidak terlalu besar sampai menghilangkan hierarchy
[ ] Hero tidak terasa seperti template
[ ] PUSAKA terasa melalui konsep dan visual
```

---

# 45. ACCEPTANCE CRITERIA

Hero dinyatakan selesai apabila user dapat melakukan flow berikut:

```text
OPEN WEBSITE
    ↓
SEE WARISARA
    ↓
SEE INDONESIA MAP
    ↓
UNDERSTAND MAP IS INTERACTIVE
    ↓
HOVER/TAP A PROVINCE
    ↓
SEE PROVINCE HIGHLIGHT
    ↓
CLICK/TAP PROVINCE
    ↓
MAP FOCUSES ON PROVINCE
    ↓
PROVINCE STORY PANEL APPEARS
    ↓
READ BASIC INFORMATION
    ↓
CLOSE PANEL
    ↓
RETURN TO FULL INDONESIA MAP
```

Flow tersebut harus bekerja tanpa reload.

---

# 46. FIRST IMPLEMENTATION TASK

AI Agent harus mengerjakan hero secara bertahap.

## TASK A — Setup

Buat:
- hero HTML
- hero CSS
- map JS
- province data

Jangan mengerjakan section berikutnya.

## TASK B — Map

Implement:
- SVG
- 38 provinces
- IDs
- data attributes

## TASK C — Interaction

Implement:
- hover
- focus
- click
- selected state

## TASK D — Province Panel

Implement:
- panel
- content rendering
- close
- reset

## TASK E — Animation

Implement:
- initial reveal
- hover
- focus
- zoom
- panel transition

## TASK F — Responsive

Implement:
- desktop
- tablet
- mobile
- touch behavior

## TASK G — QA

Test:
- all province clicks
- keyboard
- mobile
- console
- performance
- reduced motion

---

# 47. AGENT RULE FOR THIS DOCUMENT

AI Agent harus menganggap dokumen ini sebagai:

**Hero-specific implementation specification.**

Jika master PRD memiliki aturan yang lebih umum, ikuti master PRD.

Jika ada konflik:
1. Competition rules memiliki prioritas tertinggi.
2. Master PRD menjadi acuan project.
3. Dokumen ini menjadi acuan detail khusus Hero.

Jangan mengubah:
- nama WARISARA
- tagline utama
- konsep interactive Indonesia map
- 38 province support

tanpa persetujuan pengguna.

---

# 48. FINAL HERO VISION

Ketika seseorang membuka WARISARA, mereka tidak langsung melihat:

> "sebuah website tentang budaya Indonesia."

Mereka melihat:

> **Indonesia.**

Kemudian mereka menyadari:

> **Setiap bagian dari Indonesia memiliki cerita.**

Mereka memilih satu provinsi.

Peta bergerak.

Provinsi menjadi fokus.

Sebuah cerita muncul.

Dan dari cerita tersebut, mereka mulai memahami:

**WARISAN → PENGETAHUAN → MANUSIA → KARYA → MASA DEPAN**

Itulah fungsi utama Hero WARISARA.

---

# 49. FINAL HERO COPY

Gunakan sebagai baseline:

**WARISARA**

**Yang diwariskan,  
yang kita teruskan.**

> Jelajahi Nusantara. Temukan cerita, pengetahuan, dan karya yang hidup dari generasi ke generasi.

**Pilih sebuah provinsi untuk memulai perjalanan.**

Optional small text:

**38 Provinsi • Ribuan Cerita**

---

# END OF HERO SPECIFICATION
