# WARISARA — Yang diwariskan, yang kita teruskan.

WARISARA adalah pengalaman web interaktif yang menjadikan peta Indonesia sebagai pintu masuk utama untuk menjelajahi budaya, seni, pengetahuan lokal, para penjaga tradisi (maker/pengrajin), dan ekonomi kreatif Nusantara dari 38 provinsi di Indonesia.

Dibangun khusus untuk kompetisi **TECHTOPIA Vol. 2 (INTEGER#8) — Lomba Web Design** bertema **PUSAKA** (*Preserving Unity, Sustaining Ancestral Knowledge & Artistry*).

---

## 🛠️ Arsitektur Teknologi & Kepatuhan Kompetisi

- **HTML5 Semantik**
- **Tailwind CSS** (via Play CDN dengan konfigurasi token palet *Nusantara Modern*)
- **CSS Modular** (`css/variables.css`, `css/base.css`, `css/navbar.css`, `css/hero.css`, `css/sections.css`, `css/components.css`, `css/creative-lab.css`, `css/responsive.css`)
- **Vanilla JavaScript (ES6+) Modular** murni tanpa framework (React/Vue/Next.js dsb.)
- **Interactive SVG Map** dengan visual affordance, smooth zoom & focus, dan sinkronisasi drawer.
- **Canvas API Native** untuk generator pola geometris *Creative Lab*.

---

## 📂 Struktur Folder Proyek

```text
WARISARA/
│
├── index.html
├── README.md
├── LICENSES.md
├── SOURCES.md
│
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── patterns/
│   │   ├── maps/
│   │   ├── heritage/
│   │   ├── makers/
│   │   ├── products/
│   │   └── provinces/
│   └── audio/
│       └── stories/
│
├── css/
│   ├── style.css
│   ├── variables.css
│   ├── base.css
│   ├── navbar.css
│   ├── hero.css
│   ├── sections.css
│   ├── components.css
│   ├── creative-lab.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   │
│   ├── data/
│   │   ├── provinces.js
│   │   ├── heritage.js
│   │   ├── makers.js
│   │   └── products.js
│   │
│   ├── components/
│   │   ├── navbar.js
│   │   ├── province-panel.js
│   │   ├── modal.js
│   │   ├── audio-player.js
│   │   └── quiz.js
│   │
│   ├── sections/
│   │   ├── hero.js
│   │   ├── heritage.js
│   │   ├── makers.js
│   │   ├── economy.js
│   │   ├── modern.js
│   │   ├── creative-lab.js
│   │   ├── learning.js
│   │   ├── stories.js
│   │   └── pass-it-on.js
│   │
│   └── utils/
│       ├── animation.js
│       ├── scroll.js
│       └── helpers.js
│
└── docs/
    ├── WARISARA_PRD.md
    ├── WARISARA_DESIGN.md
    └── WARISARA_HERO_SECTION_SPEC.md
```
