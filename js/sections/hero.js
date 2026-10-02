/**
 * WARISARA — Hero Section & Interactive Indonesia SVG Map Controller
 * Manages 38-province SVG rendering, hover glow, coordinate markers,
 * smooth 60fps camera pan-zoom interpolation, and center pop-up triggers.
 */

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
    this.bindMapEvents();
    // NOTE: entrance animation is handled by CSS @keyframes in hero.css —
    // no JS class toggling needed here.
    this.startTaglineCycle();
  },

  /**
   * Rotating Nusantara tagline — cycles through phrases every 3.8 s.
   * Starts only after loading screen is dismissed and title letters enter.
   */
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
      // First phrase appears after letter entrance completes (~1600ms)
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
    if (!this.provinceSelectDropdown || !window.PROVINCES_DATA) return;

    const sortedProvinces = Object.values(window.PROVINCES_DATA).sort((a, b) => a.name.localeCompare(b.name));

    sortedProvinces.forEach((province) => {
      const option = document.createElement("option");
      option.value = province.id;
      option.textContent = `${province.name} (${province.island})`;
      this.provinceSelectDropdown.appendChild(option);
    });

    this.provinceSelectDropdown.addEventListener("change", (e) => {
      const provId = e.target.value;
      if (provId) {
        this.selectProvince(provId, true);
      }
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

    // Cancel any in-flight animation immediately
    if (this._animFrameId) {
      cancelAnimationFrame(this._animFrameId);
      this._animFrameId = null;
    }

    const currentVB = (this.svgMap.getAttribute("viewBox") || "0 18 982 390").split(/\s+/).map(Number);
    const startX = isFinite(currentVB[0]) ? currentVB[0] : 0;
    const startY = isFinite(currentVB[1]) ? currentVB[1] : 18;
    const startW = isFinite(currentVB[2]) ? currentVB[2] : 982;
    const startH = isFinite(currentVB[3]) ? currentVB[3] : 390;

    // Prime the GPU layer before animation begins
    if (this.bgImage) {
      this.bgImage.style.willChange = "transform";
    }

    const startTime = performance.now();

    /**
     * easeOutExpo: explosive start, ultra-smooth deceleration.
     * Gives a cinematic "camera glide" feel — much smoother than smootherstep.
     */
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

      // ── Synchronized Background Parallax ──────────────────────────────────
      if (this.bgImage) {
        const baseW = 982;   // SVG natural width
        const baseH = 390;   // SVG natural height
        const zoomRatio = baseW / Math.max(1, curW);

        const normX = ((curX + curW * 0.5) - baseW * 0.5) / (baseW * 0.5);
        const normY = ((curY + curH * 0.5) - baseH * 0.5) / (baseH * 0.5);

        const bgScale = 1.01 + (zoomRatio - 1) * 0.22;
        const bgPanX = -normX * 28;
        const bgPanY = -normY * 18;

        this.bgImage.style.transform = `scale(${bgScale.toFixed(5)}) translate(${bgPanX.toFixed(3)}px, ${bgPanY.toFixed(3)}px)`;
      }
      // ──────────────────────────────────────────────────────────────────────

      if (rawProgress < 1) {
        this._animFrameId = requestAnimationFrame(step);
      } else {
        this._animFrameId = null;
        // Release the GPU layer hint to free memory
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
      // Fast selective removal instead of querying all nodes
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

    // 1. Smoothly glide camera into the selected province (snappy 500ms)
    this.focusMapOnProvince(data.svgCenter);

    // 2. Open panel as camera settles into place
    if (shouldOpenPanel && window.WARISARA_PROVINCE_PANEL) {
      if (this._modalTimer) clearTimeout(this._modalTimer);
      this._modalTimer = setTimeout(() => {
        window.WARISARA_PROVINCE_PANEL.openPanel(data);
      }, 260);
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

    // Snappy, silky-smooth 500ms camera glide into the province
    this.animateViewBox(newMinX, newMinY, newWidth, newHeight, 500, callback);
    this.isZoomed = true;
  },

  resetView: function (callback = null) {
    if (!this.svgMap) return;

    if (this._modalTimer) clearTimeout(this._modalTimer);

    // Fast 480ms smooth zoom-out back to full Indonesia view
    this.animateViewBox(0, 18, 982, 390, 480, () => {
      this.svgMap.classList.remove("map-dimmed");
      this.svgMap.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
      this.selectedProvinceId = null;
      this.isZoomed = false;
      if (callback) callback();
    });

    if (this.provinceSelectDropdown) {
      this.provinceSelectDropdown.value = "";
    }
  }
};
