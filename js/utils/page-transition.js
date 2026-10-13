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
    const preserved = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('warisara_')) {
        preserved[k] = localStorage.getItem(k);
      }
    }

    // 2. Bersihkan aktivitas non-aplikasi lain di localStorage
    localStorage.clear();

    // 3. Pulihkan kembali semua data warisara pengguna
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
  isInitialized: false,
  isTransitioning: false,
  veilEl: null,

  init: function () {
    if (this.isInitialized) return;
    this.isInitialized = true;

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

      // Jika halaman dibuka dari proses transisi:
      // Sembunyikan logo/loader (veil-exit-only) agar animasi transisi HANYA MUNCUL 1 KALI (pada saat berpindah).
      // Halaman tujuan hanya membuka tirai dengan dissolve yang sangat halus dan mewah.
      if (wasTransitioning) {
        veil.classList.add("veil-exit-only");
        veil.style.transition = "none";
        veil.style.opacity = "1";
        veil.style.visibility = "visible";
        veil.classList.add("active");
        void veil.offsetHeight;
      }

      document.body.appendChild(veil);
      this.veilEl = veil;
    } else {
      this.veilEl = document.getElementById("page-transition-veil");
      if (wasTransitioning) {
        this.veilEl.classList.add("veil-exit-only");
        this.veilEl.style.transition = "none";
        this.veilEl.style.opacity = "1";
        this.veilEl.style.visibility = "visible";
        this.veilEl.classList.add("active");
        void this.veilEl.offsetHeight;
      }
    }

    if (wasTransitioning) {
      this._handleIncomingPage();
    }
  },

  /**
   * Halaman baru dimuat dari proses transisi:
   * – Layar tetap tertutup tirai gelap (tanpa menampilkan logo/loader ulang sehingga TIDAK dobel).
   * – Menambahkan kelas animasi masuk halus (page-entering-active) pada konten halaman tujuan.
   * – Membuka/melarutkan tirai keluar (veil-exiting) secara ultra-smooth.
   */
  _handleIncomingPage: function () {
    try { sessionStorage.removeItem("warisara_page_transition"); } catch (e) {}

    if (document.documentElement) {
      document.documentElement.classList.remove("page-transitioning-in");
    }

    if (!this.veilEl) return;

    this.veilEl.classList.add("veil-exit-only");
    this.veilEl.classList.remove("veil-exiting");
    this.veilEl.style.transition = "none";
    this.veilEl.style.opacity = "1";
    this.veilEl.style.visibility = "visible";
    void this.veilEl.offsetHeight;

    // Pasang animasi masuk halus pada konten halaman tujuan
    if (document.body) {
      document.body.classList.add("page-entering-active");
    }

    // Jeda kecil (60ms) agar browser selesai menyusun layout halaman baru di balik tirai
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (!this.veilEl) return;

          // Aktifkan kembali CSS transition untuk animasi dissolve keluar yang ultra-smooth
          this.veilEl.style.transition = "";
          this.veilEl.classList.add("veil-exiting");

          // Setelah durasi transisi dissolve selesai (900ms), bersihkan kelas dan status
          setTimeout(() => {
            if (this.veilEl) {
              this.veilEl.classList.remove("active", "veil-exiting", "veil-exit-only");
              this.veilEl.style.opacity = "";
              this.veilEl.style.visibility = "";
              this.veilEl.style.transition = "";
            }
            if (document.body) {
              document.body.classList.remove("page-entering-active");
            }
            this.isTransitioning = false;
          }, 900);
        }, 60);
      });
    });
  },

  /**
   * Navigasi keluar:
   * – Menampilkan SATU-SATUNYA animasi transisi lengkap dengan logo berputar dan laser sweep.
   * – Durasi dibuat 780ms agar terasa sinematik, anggun, mewah, dan tidak terburu-buru.
   */
  navigateTo: function (url) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    if (!this.veilEl) this.createVeil();

    try { sessionStorage.setItem("warisara_page_transition", "true"); } catch (e) {}

    // Pastikan konten logo dan loader terlihat untuk animasi transisi satu-satunya ini
    this.veilEl.classList.remove("veil-exit-only", "veil-exiting");
    this.veilEl.style.transition = "";
    this.veilEl.style.opacity = "";
    this.veilEl.style.visibility = "";
    this.veilEl.classList.add("active");

    // Durasi dibuat sedikit lebih lama (780ms) untuk transisi yang smooth dan stabil
    setTimeout(() => {
      window.location.href = url;
    }, 780);
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

      // Cegah navigasi ulang jika user mengklik link yang mengarah ke halaman yang sedang dibuka
      try {
        const urlObj = new URL(href, window.location.href);
        if (
          urlObj.origin === window.location.origin &&
          urlObj.pathname === window.location.pathname &&
          urlObj.search === window.location.search &&
          !urlObj.hash
        ) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      } catch (err) {}

      e.preventDefault();
      this.navigateTo(href);
    });
  },

  handlePageShow: function () {
    window.addEventListener("pageshow", (event) => {
      this.isTransitioning = false;
      try { sessionStorage.removeItem("warisara_page_transition"); } catch (e) {}
      if (this.veilEl) {
        this.veilEl.style.transition = "none";
        this.veilEl.style.opacity = "0";
        this.veilEl.style.visibility = "hidden";
        this.veilEl.classList.remove("active", "veil-exiting", "veil-exit-only");
      }
      if (document.body) {
        document.body.classList.remove("page-entering-active");
      }
      if (document.documentElement) {
        document.documentElement.classList.remove("page-transitioning-in");
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
