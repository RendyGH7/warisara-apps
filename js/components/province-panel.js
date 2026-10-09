window.WARISARA_PROVINCE_PANEL = {
  modalOverlay: null,
  modalElement: null,
  closeBtn: null,
  mapCloseBtn: null,
  exploreBtn: null,
  isOpen: false,

  init: function () {
    this.modalOverlay = document.getElementById("province-modal-overlay");
    this.modalElement = document.getElementById("province-detail-modal");
    this.closeBtn = document.getElementById("province-modal-close-btn");
    this.mapCloseBtn = document.getElementById("modal-btn-close-map");
    this.exploreBtn = document.getElementById("modal-btn-explore-heritage");

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closePanel());
    }

    if (this.mapCloseBtn) {
      this.mapCloseBtn.addEventListener("click", () => this.closePanel());
    }

    if (this.exploreBtn) {
      this.exploreBtn.addEventListener("click", () => {
        this.closePanel(false); 
      });
    }

    if (this.modalOverlay) {
      this.modalOverlay.addEventListener("click", (e) => {
        
        if (e.target === this.modalOverlay) {
          this.closePanel();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closePanel();
      }
    });
  },

  openPanel: function (province) {
    if (!this.modalOverlay || !province) return;

    const nameEl = document.getElementById("modal-province-name");
    const islandEl = document.getElementById("modal-province-island");
    const islandTextEl = document.getElementById("modal-province-island-text");
    const capitalEl = document.getElementById("modal-province-capital");
    const statementEl = document.getElementById("modal-province-statement");
    const descEl = document.getElementById("modal-province-desc");
    const craftHighlightEl = document.getElementById("modal-craft-highlight");
    const heritageListEl = document.getElementById("modal-heritage-list");
    const makerCardEl = document.getElementById("modal-maker-card");
    const makerNameEl = document.getElementById("modal-maker-name");
    const makerRoleEl = document.getElementById("modal-maker-role");
    const makerQuoteEl = document.getElementById("modal-maker-quote");

    if (nameEl) nameEl.textContent = province.name;
    const islandLabel = `PULAU ${province.island ? province.island.toUpperCase() : ""}`;
    if (islandTextEl) {
      islandTextEl.textContent = islandLabel;
    } else if (islandEl) {
      islandEl.textContent = islandLabel;
    }
    if (capitalEl) capitalEl.textContent = province.capital || "";
    if (statementEl) statementEl.textContent = `"${province.shortStatement || ""}"`;
    if (descEl) descEl.textContent = province.shortDescription || "";
    if (craftHighlightEl) craftHighlightEl.textContent = province.craftHighlight || "";

    if (province.maker && (province.maker.name || province.maker.quote)) {
      if (makerCardEl) makerCardEl.style.display = "";
      if (makerNameEl) makerNameEl.textContent = province.maker.name || "";
      if (makerRoleEl) makerRoleEl.textContent = province.maker.role || "";
      if (makerQuoteEl) makerQuoteEl.textContent = `"${province.maker.quote || ""}"`;
    } else if (makerCardEl) {
      makerCardEl.style.display = "none";
    }

    if (this.exploreBtn && province.id) {
      this.exploreBtn.href = `pages/jelajahi.html?province=${encodeURIComponent(province.id)}`;
      const btnSpan = this.exploreBtn.querySelector("span:not(.material-symbols-outlined)");
      if (btnSpan) btnSpan.textContent = `Jelajahi ${province.name}`;
    }

    if (heritageListEl && province.heritage) {
      heritageListEl.innerHTML = "";
      province.heritage.forEach((item) => {
        const card = document.createElement("div");
        card.className = "bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brass-400/50 p-4 rounded-2xl transition-all duration-200 flex flex-col justify-between group shadow-sm hover:-translate-y-0.5";
        card.innerHTML = `
          <div>
            <div class="flex items-center justify-between mb-2.5">
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-terracotta-500/15 text-terracotta-300 border border-terracotta-500/25">
                ${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.category) : item.category}
              </span>
            </div>
            <h4 class="font-display text-base font-normal text-surface group-hover:text-brass-200 transition-colors leading-snug mb-1.5">${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.name) : item.name}</h4>
          </div>
          <p class="text-xs text-surface/70 leading-relaxed font-light mt-2 border-t border-white/[0.05] pt-2">${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.desc) : item.desc}</p>
        `;
        heritageListEl.appendChild(card);
      });
    }

    // Reset scroll position to top
    const scrollContainer = this.modalElement ? this.modalElement.querySelector(".custom-modal-scroll") : null;
    if (scrollContainer) scrollContainer.scrollTop = 0;

    this.isOpen = true;
    this.modalOverlay.classList.add("active");
    this.modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("province-modal-open", "modal-open");
    document.body.style.overflow = "hidden";

    // Hide navbar and mobile drawer
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.classList.add("navbar-hidden");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (mobileDrawer) {
      mobileDrawer.classList.add("opacity-0", "pointer-events-none");
    }
  },

  closePanel: function (resetMap = true) {
    if (!this.modalOverlay || !this.isOpen) return;

    this.isOpen = false;
    this.modalOverlay.classList.remove("active");
    this.modalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("province-modal-open", "modal-open");
    document.body.style.overflow = "";

    // Restore navbar
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.classList.remove("navbar-hidden");

    if (resetMap && window.WARISARA_HERO_MAP) {
      setTimeout(() => {
        window.WARISARA_HERO_MAP.resetView();
      }, 100);
    }
  }
};
