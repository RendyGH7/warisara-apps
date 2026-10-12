// Selalu kembalikan posisi scroll ke hero/awal saat reload atau navigasi
if ('scrollRestoration' in history) {
  try {
    history.scrollRestoration = 'manual';
  } catch (e) {}
}
window.scrollTo(0, 0);

// Utilitas Global: Pembersihan Aktivitas saat Refresh dengan 3 Pengecualian (Whitelist)
window.WARISARA_RESET_REFRESH = function () {
  try {
    // 1. Data yang DIKECUALIKAN / DIPERTAHANKAN (Whitelist):
    // - Pengecualian 1: Desain Creative Lab (warisara_creative_gallery)
    // - Pengecualian 2: Akun Google login & produk listing user (warisara_active_user, warisara_user_products)
    // - Pengecualian 3: Skor kuis tertinggi & statistik belajar (warisara_quiz_learning_stats, warisara_quiz_progress, warisara_quiz_seen_ids)
    const WHITELIST_KEYS = [
      'warisara_creative_gallery',     // Pengecualian 1: Desain Creative Lab
      'warisara_active_user',          // Pengecualian 2: Akun Google login produk lokal
      'warisara_user_products',        // Pengecualian 2: Produk karya user
      'warisara_quiz_learning_stats',  // Pengecualian 3: Skor kuis tertinggi & statistik belajar
      'warisara_quiz_progress',        // Pengecualian 3: Progres modul kuis
      'warisara_quiz_seen_ids'         // Pengecualian 3: Riwayat soal kuis
    ];

    const preserved = {};
    WHITELIST_KEYS.forEach(function (key) {
      const val = localStorage.getItem(key);
      if (val !== null) preserved[key] = val;
    });

    // 2. Bersihkan semua aktivitas lain di localStorage
    localStorage.clear();

    // 3. Pulihkan kembali HANYA 3 data whitelist
    Object.keys(preserved).forEach(function (key) {
      localStorage.setItem(key, preserved[key]);
    });

    // 4. Bersihkan sessionStorage agar loading screen selalu diputar dari awal
    sessionStorage.removeItem('warisara_intro_played');
    sessionStorage.removeItem('warisara_page_transition');
  } catch (err) {
    console.warn('[WARISARA] Reset refresh error:', err);
  }
};

window.WARISARA_TRANSITION = {
  isTransitioning: false,
  veilEl: null,

  init: function () {
    this.initScrollToTopOnRefresh();
    this.createVeil();
    this.bindLinkInterception();
    this.handlePageShow();
    this.initScrollReveal();
    this.initNavbarLogoSpin();
  },

  initScrollToTopOnRefresh: function () {
    if ('scrollRestoration' in history) {
      try {
        history.scrollRestoration = 'manual';
      } catch (e) {}
    }

    const forceScrollToHero = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    forceScrollToHero();

    window.addEventListener('beforeunload', () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      forceScrollToHero();
    });

    window.addEventListener('pagehide', () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      forceScrollToHero();
    });

    // Tangkap shortcut refresh keyboard (Ctrl+R, F5, Cmd+R)
    window.addEventListener('keydown', (e) => {
      const isCtrlR = (e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R' || e.code === 'KeyR');
      const isF5 = e.key === 'F5' || e.code === 'F5';
      if (isCtrlR || isF5) {
        e.preventDefault();
        if (typeof window.WARISARA_RESET_REFRESH === 'function') {
          window.WARISARA_RESET_REFRESH();
        }
        const isSubpage = window.location.pathname.includes('/pages/');
        if (isSubpage) {
          window.location.replace('../index.html#hero');
        } else {
          forceScrollToHero();
          try {
            history.replaceState(null, '', 'index.html#hero');
          } catch (err) {}
          window.location.reload();
        }
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      forceScrollToHero();
      const isSubpage = window.location.pathname.includes('/pages/');
      if (!isSubpage) {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }
      requestAnimationFrame(forceScrollToHero);
      setTimeout(forceScrollToHero, 30);
      setTimeout(forceScrollToHero, 100);
      setTimeout(forceScrollToHero, 250);
    });

    window.addEventListener('load', () => {
      forceScrollToHero();
      setTimeout(forceScrollToHero, 50);
      setTimeout(forceScrollToHero, 150);
    });

    window.addEventListener('pageshow', () => {
      forceScrollToHero();
      setTimeout(forceScrollToHero, 50);
    });
  },

  initNavbarLogoSpin: function () {
    const bindSpin = () => {
      const selector = '#main-navbar a[aria-label*="WARISARA"] img, a[aria-label="WARISARA Beranda"] img, .navbar-brand-emblem, .nav-brand-logo-interactive';
      const logos = document.querySelectorAll(selector);

      logos.forEach((img) => {
        img.classList.add('nav-brand-logo-interactive');
        const parentLink = img.closest('a') || img;

        if (parentLink.dataset.spinBound === "true") return;
        parentLink.dataset.spinBound = "true";

        let isSpinningBack = false;

        parentLink.addEventListener("click", () => {
          img.classList.remove("spin-back");
          void img.offsetWidth;
          img.classList.add("spin-back");
          isSpinningBack = true;
          setTimeout(() => {
            img.classList.remove("spin-back");
            isSpinningBack = false;
          }, 700);
        });

        parentLink.addEventListener("mouseleave", () => {
          if (!isSpinningBack) img.classList.remove("spin-back");
        });
      });
    };

    bindSpin();
    window.addEventListener("load", bindSpin);
  },

  createVeil: function () {
    const wasTransitioning = sessionStorage.getItem("warisara_page_transition") === "true";

    if (!document.getElementById("page-transition-veil")) {
      const isSubpage = window.location.pathname.includes("/pages/");
      const assetPrefix = isSubpage ? "../" : "";

      const veil = document.createElement("div");
      veil.id = "page-transition-veil";
      veil.setAttribute("aria-hidden", "true");

      veil.innerHTML = `
        <div class="veil-shimmer-pattern"></div>
        <div class="veil-content">
          <div class="veil-brand-unit">
            <div class="veil-emblem-wrap">
              <img src="${assetPrefix}assets/logo/logo-emblem.png?v=31" alt="WARISARA Emblem" class="veil-emblem-img" />
            </div>
            <img src="${assetPrefix}assets/logo/logo-text.png?v=31" alt="WariSara" class="veil-text-img" />
          </div>
          <div class="veil-loader-wrapper">
            <div class="veil-bar-track">
              <div class="veil-bar-fill"></div>
            </div>
            <div class="veil-loading-label">
              <span class="veil-pulse-dot"></span>
              <span>MEMUAT PUSAKA</span>
              <span class="veil-pulse-dot"></span>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(veil);
      this.veilEl = veil;
    } else {
      this.veilEl = document.getElementById("page-transition-veil");
    }

    if (wasTransitioning) {
      this._handleIncomingPage();
    }
  },

  /**
   * Halaman baru dimuat:
   * – Veil langsung disembunyikan tanpa animasi apapun.
   * – Halaman langsung muncul. Bersih, tanpa efek gelap tambahan.
   */
  _handleIncomingPage: function () {
    try { sessionStorage.removeItem("warisara_page_transition"); } catch (e) {}

    if (!this.veilEl) return;

    // Matikan semua transisi CSS pada veil, lalu sembunyikan seketika
    this.veilEl.style.transition = "none";
    this.veilEl.style.opacity = "0";
    this.veilEl.style.visibility = "hidden";
    this.veilEl.classList.remove("active", "veil-exiting");

    // Pulihkan CSS veil ke kondisi semula setelah satu frame
    // (agar siap dipakai untuk navigasi berikutnya)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (this.veilEl) {
          this.veilEl.style.transition = "";
          this.veilEl.style.opacity = "";
          this.veilEl.style.visibility = "";
        }
      });
    });
  },

  /**
   * Navigasi keluar:
   * – Veil muncul dengan animasi lengkap (logo memutar, loading bar).
   * – Setelah 1050ms (animasi loading ≈1 siklus penuh), baru navigasi.
   */
  navigateTo: function (url) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    if (!this.veilEl) this.createVeil();

    try { sessionStorage.setItem("warisara_page_transition", "true"); } catch (e) {}

    this.veilEl.style.transition = "";
    this.veilEl.style.opacity = "";
    this.veilEl.style.visibility = "";
    this.veilEl.classList.remove("veil-exiting");
    this.veilEl.classList.add("active");

    setTimeout(() => {
      window.location.href = url;
    }, 1050);
  },

  bindLinkInterception: function () {
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target === "_blank"
      ) return;

      if (href.startsWith("http://") || href.startsWith("https://")) {
        try {
          const urlObj = new URL(href);
          if (urlObj.origin !== window.location.origin) return;
        } catch (err) { return; }
      }

      e.preventDefault();
      this.navigateTo(href);
    });
  },

  handlePageShow: function () {
    window.addEventListener("pageshow", (event) => {
      this.isTransitioning = false;
      if (event.persisted && this.veilEl) {
        this.veilEl.style.transition = "none";
        this.veilEl.style.opacity = "0";
        this.veilEl.style.visibility = "hidden";
        this.veilEl.classList.remove("active", "veil-exiting");
      }
    });
  },

  initScrollReveal: function () {
    const reveals = document.querySelectorAll(".reveal-on-scroll");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-revealed");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => window.WARISARA_TRANSITION.init());
} else {
  window.WARISARA_TRANSITION.init();
}
