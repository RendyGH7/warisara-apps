// Selalu kembalikan posisi scroll ke hero/awal saat reload atau navigasi
if ('scrollRestoration' in history) {
  try {
    history.scrollRestoration = 'manual';
  } catch (e) {}
}
window.scrollTo(0, 0);

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

    document.addEventListener('DOMContentLoaded', () => {
      forceScrollToHero();
      if (window.location.hash) {
        try {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch (e) {}
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
