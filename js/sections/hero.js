window.WARISARA_HERO_MAP = {
  svgMap: null,
  mapContainer: null,
  tooltip: null,
  bgImage: null,
  provinceSelectDropdown: null,
  selectedProvinceId: null,
  isZoomed: false,
  _animFrameId: null,
  _modalTimer: null,
  _taglineIndex: 0,
  _taglineTimer: null,

  init: function () {
    this.svgMap = document.getElementById("indonesia-map-svg");
    this.mapContainer = document.getElementById("map-container");
    this.tooltip = document.getElementById("map-hover-tooltip");
    this.bgImage = document.querySelector("#hero .hero-canvas-image");
    this.provinceSelectDropdown = document.getElementById("mobile-province-select");

    if (!this.svgMap) return;

    this.populateMobileDropdown();
    this.bindIslandChips();
    this.bindResetButton();
    this.bindMapEvents();

    this.startTaglineCycle();
  },

  islandBounds: {
    "all": [0, 18, 982, 390],
    "Sumatera": [10, 30, 270, 250],
    "Jawa": [210, 275, 240, 120],
    "Bali & Nusa Tenggara": [410, 310, 220, 100],
    "Kalimantan": [310, 80, 240, 190],
    "Sulawesi": [490, 90, 190, 200],
    "Maluku & Papua": [670, 100, 310, 250]
  },

  bindIslandChips: function () {
    const chips = document.querySelectorAll(".btn-island-chip");
    if (!chips.length) return;

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const island = chip.dataset.island;
        if (island) {
          this.zoomToIsland(island);
        }
      });
    });
  },

  bindResetButton: function () {
    const resetBtn = document.getElementById("hero-map-reset-btn");
    if (!resetBtn) return;

    resetBtn.addEventListener("click", () => {
      this.resetView();
    });
  },

  zoomToIsland: function (islandKey) {
    const bounds = this.islandBounds[islandKey] || this.islandBounds["all"];
    this.animateViewBox(bounds[0], bounds[1], bounds[2], bounds[3], 520, () => {
      this.isZoomed = islandKey !== "all";
      this.updateResetButton(this.isZoomed);
    });

    document.querySelectorAll(".btn-island-chip").forEach((btn) => {
      const match = btn.dataset.island === islandKey;
      btn.classList.toggle("active", match);
    });
  },

  updateResetButton: function (visible) {
    const btn = document.getElementById("hero-map-reset-btn");
    if (!btn) return;
    if (visible) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  },

  startTaglineCycle: function () {
    const wrapper = document.getElementById("hero-tagline-wrapper");
    if (!wrapper) return;

    const phrases = wrapper.querySelectorAll(".hero-tagline-phrase");
    if (!phrases.length) return;

    let current = 0;

    const showPhrase = (index) => {
      phrases.forEach((el, i) => {
        if (i === index) {
          el.classList.remove("tagline-exit");
          void el.offsetWidth;
          el.classList.add("tagline-active");
        } else if (el.classList.contains("tagline-active")) {
          el.classList.remove("tagline-active");
          el.classList.add("tagline-exit");
          el.addEventListener("animationend", () => {
            el.classList.remove("tagline-exit");
          }, { once: true });
        }
      });
    };

    const runSequence = () => {

      setTimeout(() => {
        showPhrase(0);
        if (this._taglineTimer) clearInterval(this._taglineTimer);
        this._taglineTimer = setInterval(() => {
          current = (current + 1) % phrases.length;
          showPhrase(current);
        }, 3800);
      }, 1600);
    };

    if (document.body.classList.contains("hero-animated") || !document.getElementById("warisara-preloader")) {
      runSequence();
    } else {
      window.addEventListener("warisara:hero-animated", runSequence, { once: true });
    }
  },

  populateMobileDropdown: function () {
    if (!window.PROVINCES_DATA) return;

    // Fill hidden native select if present for accessibility
    if (this.provinceSelectDropdown) {
      this.provinceSelectDropdown.innerHTML = '<option value="">Pilih Provinsi Nusantara...</option>';
      const sorted = Object.values(window.PROVINCES_DATA).sort((a, b) => a.name.localeCompare(b.name));
      sorted.forEach((province) => {
        const option = document.createElement("option");
        option.value = province.id;
        option.textContent = `${province.name} (${province.island})`;
        this.provinceSelectDropdown.appendChild(option);
      });
    }

    this.initCustomProvinceDropdown();
  },

  initCustomProvinceDropdown: function () {
    const capsule = document.getElementById("hero-province-selector-capsule");
    const triggerBtn = document.getElementById("hero-province-trigger-btn");
    const menu = document.getElementById("hero-province-menu");
    const backdrop = document.getElementById("hero-province-menu-backdrop");
    const listContainer = document.getElementById("hero-province-list");
    const searchInput = document.getElementById("hero-province-search-input");
    const searchClear = document.getElementById("hero-province-search-clear");
    const filterChips = document.querySelectorAll("#hero-province-filter-chips .hero-prov-chip");
    const emptyState = document.getElementById("hero-province-empty");
    const countBadge = document.getElementById("hero-province-count-badge");

    if (!triggerBtn || !menu || !listContainer) return;

    let activeIslandFilter = "all";
    let currentSearchQuery = "";

    const sortedProvinces = Object.values(window.PROVINCES_DATA).sort((a, b) => a.name.localeCompare(b.name));

    // Render luxury province items
    listContainer.innerHTML = "";
    sortedProvinces.forEach((province) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "hero-province-item w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left transition-all duration-150 group cursor-pointer hover:bg-brass-400/15 hover:border-brass-400/40 border border-transparent";
      item.dataset.provId = province.id;
      item.dataset.provName = province.name.toLowerCase();
      item.dataset.provIsland = province.island;
      item.dataset.provCapital = (province.capital || "").toLowerCase();

      item.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-6 h-6 rounded-full bg-white/[0.06] group-hover:bg-brass-400/25 border border-white/10 group-hover:border-brass-400/50 flex items-center justify-center shrink-0 transition-colors">
            <span class="material-symbols-outlined text-xs text-brass-300">location_on</span>
          </div>
          <div class="min-w-0">
            <div class="province-name-text text-xs font-semibold text-stone-100 group-hover:text-brass-200 truncate transition-colors">${province.name}</div>
            <div class="text-[10px] text-stone-400 font-light truncate">${province.capital ? province.capital + ' • ' : ''}${province.island}</div>
          </div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <span class="text-[9px] font-medium text-stone-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 group-hover:border-brass-400/30 group-hover:text-brass-300 transition-colors">${province.island}</span>
          <span class="material-symbols-outlined text-xs text-stone-500 group-hover:text-brass-300 group-hover:translate-x-0.5 transition-all">chevron_right</span>
        </div>
      `;

      item.addEventListener("click", () => {
        closeDropdown();
        this.selectProvince(province.id, true);
      });

      listContainer.appendChild(item);
    });

    const filterList = () => {
      let visibleCount = 0;
      const items = listContainer.querySelectorAll(".hero-province-item");

      items.forEach((item) => {
        const matchesIsland = activeIslandFilter === "all" || item.dataset.provIsland === activeIslandFilter;
        const matchesSearch = !currentSearchQuery || 
          item.dataset.provName.includes(currentSearchQuery) || 
          item.dataset.provCapital.includes(currentSearchQuery) || 
          item.dataset.provIsland.toLowerCase().includes(currentSearchQuery);

        if (matchesIsland && matchesSearch) {
          item.classList.remove("hidden");
          item.style.display = "flex";
          visibleCount++;
        } else {
          item.classList.add("hidden");
          item.style.display = "none";
        }
      });

      if (emptyState) emptyState.classList.toggle("hidden", visibleCount > 0);
      if (countBadge) countBadge.textContent = `${visibleCount} Provinsi`;
    };

    const openDropdown = () => {
      menu.classList.remove("hidden");
      if (backdrop) backdrop.classList.remove("hidden");
      if (capsule) capsule.classList.add("is-menu-open");
      triggerBtn.setAttribute("aria-expanded", "true");

      const items = listContainer.querySelectorAll(".hero-province-item");
      items.forEach((item) => {
        const isSelected = item.dataset.provId === this.selectedProvinceId;
        item.classList.toggle("active-selected", isSelected);
      });

      setTimeout(() => {
        if (searchInput && window.innerWidth > 640) searchInput.focus();
      }, 50);
    };

    const closeDropdown = () => {
      menu.classList.add("hidden");
      if (backdrop) backdrop.classList.add("hidden");
      if (capsule) capsule.classList.remove("is-menu-open");
      triggerBtn.setAttribute("aria-expanded", "false");
    };

    triggerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !menu.classList.contains("hidden");
      if (isOpen) closeDropdown();
      else openDropdown();
    });

    if (backdrop) {
      backdrop.addEventListener("click", closeDropdown);
    }

    document.addEventListener("click", (e) => {
      if (capsule && !capsule.contains(e.target) && (!backdrop || !backdrop.contains(e.target))) {
        closeDropdown();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.classList.contains("hidden")) {
        closeDropdown();
      }
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        if (searchClear) searchClear.classList.toggle("hidden", !currentSearchQuery);
        filterList();
      });
    }

    if (searchClear && searchInput) {
      searchClear.addEventListener("click", () => {
        searchInput.value = "";
        currentSearchQuery = "";
        searchClear.classList.add("hidden");
        filterList();
        searchInput.focus();
      });
    }

    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => {
          c.classList.remove("bg-brass-400", "text-ink", "font-bold");
          c.classList.add("bg-white/5", "border", "border-white/10", "text-stone-300", "font-medium");
        });
        chip.classList.add("bg-brass-400", "text-ink", "font-bold");
        chip.classList.remove("bg-white/5", "border", "border-white/10", "text-stone-300", "font-medium");

        activeIslandFilter = chip.dataset.island || "all";
        filterList();
      });
    });
  },

  bindMapEvents: function () {
    const provinceGroups = this.svgMap.querySelectorAll(".map-province-group");
    const markers = this.svgMap.querySelectorAll(".map-marker");

    provinceGroups.forEach((group) => {
      const provId = group.dataset.province;

      group.addEventListener("mouseenter", (e) => this.handleHoverEnter(e, provId));
      group.addEventListener("mousemove", (e) => this.handleHoverMove(e));
      group.addEventListener("mouseleave", () => this.handleHoverLeave());
      group.addEventListener("click", () => {
        if (typeof group.blur === "function") group.blur();
        this.selectProvince(provId, true);
      });

      group.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.selectProvince(provId, true);
        }
      });
    });

    markers.forEach((marker) => {
      const provId = marker.dataset.province;
      marker.addEventListener("mouseenter", (e) => this.handleHoverEnter(e, provId));
      marker.addEventListener("mousemove", (e) => this.handleHoverMove(e));
      marker.addEventListener("mouseleave", () => this.handleHoverLeave());
      marker.addEventListener("click", () => {
        if (typeof marker.blur === "function") marker.blur();
        this.selectProvince(provId, true);
      });
    });
  },

  handleHoverEnter: function (e, provId) {
    if (!this.tooltip || !window.PROVINCES_DATA || !window.PROVINCES_DATA[provId]) return;

    const data = window.PROVINCES_DATA[provId];
    const tooltipTitle = this.tooltip.querySelector(".tooltip-title");
    const tooltipIsland = this.tooltip.querySelector(".tooltip-island");
    const tooltipHeritage = this.tooltip.querySelector(".tooltip-heritage");

    if (tooltipTitle) tooltipTitle.textContent = data.name;
    if (tooltipIsland) tooltipIsland.textContent = data.island;
    if (tooltipHeritage && data.heritage) tooltipHeritage.textContent = `${data.heritage.length} Warisan Unggulan`;

    this.tooltip.classList.add("visible");
    this.positionTooltip(e);
  },

  handleHoverMove: function (e) {
    if (!this.tooltip || !this.tooltip.classList.contains("visible")) return;
    this.positionTooltip(e);
  },

  positionTooltip: function (e) {
    if (!this.mapContainer || !this.tooltip) return;
    const rect = this.mapContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
  },

  handleHoverLeave: function () {
    if (this.tooltip) {
      this.tooltip.classList.remove("visible");
    }
  },

  animateViewBox: function (targetX, targetY, targetW, targetH, duration = 500, callback = null) {
    if (!this.svgMap) return;

    if (this._animFrameId) {
      cancelAnimationFrame(this._animFrameId);
      this._animFrameId = null;
    }

    const currentVB = (this.svgMap.getAttribute("viewBox") || "0 18 982 390").split(/\s+/).map(Number);
    const startX = isFinite(currentVB[0]) ? currentVB[0] : 0;
    const startY = isFinite(currentVB[1]) ? currentVB[1] : 18;
    const startW = isFinite(currentVB[2]) ? currentVB[2] : 982;
    const startH = isFinite(currentVB[3]) ? currentVB[3] : 390;

    if (this.bgImage) {
      this.bgImage.style.willChange = "transform";
    }

    const startTime = performance.now();

    const easeOutExpo = (t) => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const step = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(rawProgress);

      const curX = startX + (targetX - startX) * eased;
      const curY = startY + (targetY - startY) * eased;
      const curW = startW + (targetW - startW) * eased;
      const curH = startH + (targetH - startH) * eased;

      this.svgMap.setAttribute("viewBox", `${curX.toFixed(3)} ${curY.toFixed(3)} ${curW.toFixed(3)} ${curH.toFixed(3)}`);

      if (this.bgImage) {
        const baseW = 982;   
        const baseH = 390;   
        const zoomRatio = baseW / Math.max(1, curW);

        const normX = ((curX + curW * 0.5) - baseW * 0.5) / (baseW * 0.5);
        const normY = ((curY + curH * 0.5) - baseH * 0.5) / (baseH * 0.5);

        const bgScale = 1.01 + (zoomRatio - 1) * 0.22;
        const bgPanX = -normX * 28;
        const bgPanY = -normY * 18;

        this.bgImage.style.transform = `scale(${bgScale.toFixed(5)}) translate(${bgPanX.toFixed(3)}px, ${bgPanY.toFixed(3)}px)`;
      }

      if (rawProgress < 1) {
        this._animFrameId = requestAnimationFrame(step);
      } else {
        this._animFrameId = null;

        if (this.bgImage) this.bgImage.style.willChange = "auto";
        if (callback) callback();
      }
    };

    this._animFrameId = requestAnimationFrame(step);
  },

  selectProvince: function (provId, shouldOpenPanel = true) {
    if (!window.PROVINCES_DATA) return;
    const data = window.PROVINCES_DATA[provId];
    if (!data) return;

    this.selectedProvinceId = provId;

    if (this.svgMap) {
      this.svgMap.classList.add("map-dimmed");

      this.svgMap.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));

      const targetGroup = this.svgMap.querySelector(`.map-province-group[data-province="${provId}"]`);
      if (targetGroup) {
        targetGroup.classList.add("active");
        const path = targetGroup.querySelector(".map-province-path");
        if (path) path.classList.add("active");
      }

      const targetMarker = this.svgMap.querySelector(`.map-marker[data-province="${provId}"]`);
      if (targetMarker) targetMarker.classList.add("active");
    }

    if (this.provinceSelectDropdown) {
      this.provinceSelectDropdown.value = provId;
    }

    const label = document.getElementById("hero-selected-province-label");
    if (label && data) {
      label.textContent = `${data.name} (${data.island})`;
    }

    const listContainer = document.getElementById("hero-province-list");
    if (listContainer) {
      listContainer.querySelectorAll(".hero-province-item").forEach((item) => {
        item.classList.toggle("active-selected", item.dataset.provId === provId);
      });
    }

    this.focusMapOnProvince(data.svgCenter);

    if (shouldOpenPanel) {
      document.body.classList.add("province-modal-open", "modal-open");
      const navbar = document.getElementById("main-navbar");
      if (navbar) navbar.classList.add("navbar-hidden");

      if (window.WARISARA_PROVINCE_PANEL) {
        if (this._modalTimer) clearTimeout(this._modalTimer);
        this._modalTimer = setTimeout(() => {
          window.WARISARA_PROVINCE_PANEL.openPanel(data);
        }, 260);
      }
    }
  },

  focusMapOnProvince: function (center, callback = null) {
    if (!this.svgMap || !center) return;

    const baseW = 982;
    const baseH = 390;
    const zoomFactor = 1.85;

    const newWidth  = baseW / zoomFactor;
    const newHeight = baseH / zoomFactor;

    const newMinX = center.x - newWidth  / 2;
    const newMinY = center.y - newHeight / 2;

    this.animateViewBox(newMinX, newMinY, newWidth, newHeight, 500, callback);
    this.isZoomed = true;
    this.updateResetButton(true);
  },

  resetView: function (callback = null) {
    if (!this.svgMap) return;

    if (this._modalTimer) clearTimeout(this._modalTimer);

    document.body.classList.remove("province-modal-open", "modal-open");
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.classList.remove("navbar-hidden");

    this.animateViewBox(0, 18, 982, 390, 480, () => {
      this.svgMap.classList.remove("map-dimmed");
      this.svgMap.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
      this.selectedProvinceId = null;
      this.isZoomed = false;
      this.updateResetButton(false);

      document.querySelectorAll(".btn-island-chip").forEach((btn) => {
        const isAll = btn.dataset.island === "all";
        btn.classList.toggle("active", isAll);
      });

      if (callback) callback();
    });

    if (this.provinceSelectDropdown) {
      this.provinceSelectDropdown.value = "";
    }

    const label = document.getElementById("hero-selected-province-label");
    if (label) {
      label.textContent = "Pilih Provinsi Nusantara";
    }

    const listContainer = document.getElementById("hero-province-list");
    if (listContainer) {
      listContainer.querySelectorAll(".hero-province-item").forEach((item) => {
        item.classList.remove("active-selected");
      });
    }
  }
};
