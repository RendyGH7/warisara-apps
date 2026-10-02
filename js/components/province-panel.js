/**
 * WARISARA — Province Detail Center Modal Component
 * Orchestrates modal content rendering and smooth transitions.
 */

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
        this.closePanel(false); // Close modal without resetting map immediately if scrolling to section
      });
    }

    if (this.modalOverlay) {
      this.modalOverlay.addEventListener("click", (e) => {
        // If clicked on backdrop outside modal container
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
    const capitalEl = document.getElementById("modal-province-capital");
    const statementEl = document.getElementById("modal-province-statement");
    const descEl = document.getElementById("modal-province-desc");
    const craftHighlightEl = document.getElementById("modal-craft-highlight");
    const heritageListEl = document.getElementById("modal-heritage-list");
    const makerNameEl = document.getElementById("modal-maker-name");
    const makerRoleEl = document.getElementById("modal-maker-role");
    const makerQuoteEl = document.getElementById("modal-maker-quote");

    if (nameEl) nameEl.textContent = province.name;
    if (islandEl) islandEl.textContent = `PULAU ${province.island.toUpperCase()}`;
    if (capitalEl) capitalEl.textContent = province.capital;
    if (statementEl) statementEl.textContent = `"${province.shortStatement}"`;
    if (descEl) descEl.textContent = province.shortDescription;
    if (craftHighlightEl) craftHighlightEl.textContent = province.craftHighlight;

    if (makerNameEl && province.maker) makerNameEl.textContent = province.maker.name;
    if (makerRoleEl && province.maker) makerRoleEl.textContent = province.maker.role;
    if (makerQuoteEl && province.maker) makerQuoteEl.textContent = `"${province.maker.quote}"`;

    if (heritageListEl && province.heritage) {
      heritageListEl.innerHTML = "";
      province.heritage.forEach((item) => {
        const card = document.createElement("div");
        card.className = "bg-white/[0.03] border border-white/10 p-3.5 rounded-xl hover:border-brass-400/60 transition-colors flex flex-col justify-between";
        card.innerHTML = `
          <div>
            <span class="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/30 mb-2">
              ${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.category) : item.category}
            </span>
            <h4 class="font-display text-base font-normal text-surface mb-1">${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.name) : item.name}</h4>
          </div>
          <p class="text-[11px] text-surface/70 leading-relaxed mt-1">${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.desc) : item.desc}</p>
        `;
        heritageListEl.appendChild(card);
      });
    }

    this.isOpen = true;
    this.modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // prevent background scroll while modal is active
  },

  closePanel: function (resetMap = true) {
    if (!this.modalOverlay || !this.isOpen) return;

    this.isOpen = false;
    this.modalOverlay.classList.remove("active");
    document.body.style.overflow = "";

    if (resetMap && window.WARISARA_HERO_MAP) {
      // Allow slight delay so the modal starts fading, then smoothly animate map back
      setTimeout(() => {
        window.WARISARA_HERO_MAP.resetView();
      }, 100);
    }
  }
};
