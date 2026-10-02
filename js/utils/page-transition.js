/**
 * WARISARA — Cinematic Page Transition Engine
 * Provides smooth, zero-flicker transitions between pages while preserving
 * fast in-page anchor scrolling on the single/hybrid landing page.
 */

window.WARISARA_TRANSITION = {
  isTransitioning: false,
  veilEl: null,

  init: function () {
    this.createVeil();
    this.bindLinkInterception();
    this.handlePageShow();
    this.initScrollReveal();
  },

  createVeil: function () {
    if (document.getElementById("page-transition-veil")) {
      this.veilEl = document.getElementById("page-transition-veil");
      return;
    }

    const wasTransitioning = sessionStorage.getItem("warisara_page_transition") === "true";
    if (wasTransitioning) {
      try {
        sessionStorage.removeItem("warisara_page_transition");
      } catch (e) {}
    }

    const veil = document.createElement("div");
    veil.id = "page-transition-veil";
    veil.setAttribute("aria-hidden", "true");
    if (wasTransitioning) {
      veil.classList.add("active");
    }

    veil.innerHTML = `
      <div class="veil-shimmer-pattern"></div>
      <div class="veil-content">
        <div class="veil-logo-badge">W</div>
        <div class="veil-title">WARISARA</div>
        <div class="veil-bar-track">
          <div class="veil-bar-fill"></div>
        </div>
      </div>
    `;

    document.body.appendChild(veil);
    this.veilEl = veil;

    // Smoothly dissolve veil on page open
    requestAnimationFrame(() => {
      document.body.classList.add("page-fade-in");
      if (wasTransitioning) {
        setTimeout(() => {
          veil.classList.remove("active");
        }, 60);
      }
    });
  },

  navigateTo: function (url) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    if (!this.veilEl) this.createVeil();

    try {
      sessionStorage.setItem("warisara_page_transition", "true");
    } catch (e) {}

    // Show the veil
    this.veilEl.classList.add("active");

    // Wait for veil animation, then navigate
    setTimeout(() => {
      window.location.href = url;
    }, 340);
  },

  bindLinkInterception: function () {
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");

      // Skip non-page links, external protocols, downloads, or target="_blank"
      if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:") || target === "_blank") {
        return;
      }

      // Check if it is an external link (http/https not matching current origin)
      if (href.startsWith("http://") || href.startsWith("https://")) {
        try {
          const urlObj = new URL(href);
          if (urlObj.origin !== window.location.origin) return;
        } catch (err) {
          return;
        }
      }

      // Intercept local HTML page navigation
      e.preventDefault();
      this.navigateTo(href);
    });
  },

  handlePageShow: function () {
    // Dismiss veil immediately on bfcache (Back/Forward Cache) restoration
    window.addEventListener("pageshow", (event) => {
      this.isTransitioning = false;
      if (this.veilEl) {
        this.veilEl.classList.remove("active");
      }
      document.body.classList.add("page-fade-in");
    });
  },

  initScrollReveal: function () {
    const reveals = document.querySelectorAll(".reveal-on-scroll");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => window.WARISARA_TRANSITION.init());
} else {
  window.WARISARA_TRANSITION.init();
}
