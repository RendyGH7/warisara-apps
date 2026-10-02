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
    this.animateEntrance();
    this.startTaglineCycle();
  },

  animateEntrance: function () {
    const mapWrapper = document.getElementById("hero-map-wrapper");
    const promptBlock = document.getElementById("hero-map-prompt");

    // Map: reveal after a short pause so letters have time to animate first
    setTimeout(() => {
      if (mapWrapper) {
        mapWrapper.classList.remove("opacity-0", "scale-95");
        mapWrapper.classList.add("opacity-100", "scale-100");
      }
    }, 350);

    setTimeout(() => {
      if (promptBlock) {
        promptBlock.classList.remove("opacity-0");
        promptBlock.classList.add("opacity-100");
      }
    }, 700);
  },

  /**
   * Rotating Nusantara tagline — cycles through phrases every 3.5 s.
   * Uses CSS animation classes (tagline-active / tagline-exit) for
   * smooth crossfade. First phrase appears after letters finish (900ms).
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
          // Remove exit class if lingering, then trigger entrance
          el.classList.remove("tagline-exit");
          // Force reflow so animation restarts cleanly
          void el.offsetWidth;
          el.classList.add("tagline-active");
        } else if (el.classList.contains("tagline-active")) {
          // Exit the currently visible phrase
          el.classList.remove("tagline-active");
          el.classList.add("tagline-exit");
          // Clean up exit class after animation ends
          el.addEventListener("animationend", () => {
            el.classList.remove("tagline-exit");
          }, { once: true });
        }
      });
    };

    // First phrase appears after letter entrance animation completes
    setTimeout(() => {
      showPhrase(0);
      this._taglineTimer = setInterval(() => {
        current = (current + 1) % phrases.length;
        showPhrase(current);
      }, 3500);
    }, 900);
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

  animateViewBox: function (targetX, targetY, targetW, targetH, duration = 1100, callback = null) {
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
      // We match the SVG zoom ratio so the background scales in harmony with
      // the island map. Parallax pan follows the viewport center offset.
      if (this.bgImage) {
        const baseW = 982;   // SVG natural width
        const baseH = 390;   // SVG natural height
        const zoomRatio = baseW / Math.max(1, curW);  // > 1 when zoomed in

        // How far the viewport center has drifted from the SVG center (–1 to +1)
        const normX = ((curX + curW * 0.5) - baseW * 0.5) / (baseW * 0.5);
        const normY = ((curY + curH * 0.5) - baseH * 0.5) / (baseH * 0.5);

        // Background scales gently (0.22 factor = subtle depth cue, not 1:1)
        const bgScale = 1.01 + (zoomRatio - 1) * 0.22;

        // Pan in the opposite direction to the viewport drift (parallax)
        const bgPanX = -normX * 28;
        const bgPanY = -normY * 18;

        // Single composed transform — no CSS transition fighting this
        this.bgImage.style.transform = `scale(${bgScale.toFixed(5)}) translate(${bgPanX.toFixed(3)}px, ${bgPanY.toFixed(3)}px)`;
      }
      // ──────────────────────────────────────────────────────────────────────

      if (rawProgress < 1) {
        this._animFrameId = requestAnimationFrame(step);
      } else {
        this._animFrameId = null;
        // Release the GPU layer hint
        if (this.bgImage) this.bgImage.style.willChange = "transform";
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
      this.svgMap.querySelectorAll(".map-province-group").forEach((g) => g.classList.remove("active"));
      this.svgMap.querySelectorAll(".map-province-path").forEach((p) => p.classList.remove("active"));
      this.svgMap.querySelectorAll(".map-marker").forEach((m) => m.classList.remove("active"));

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

    // 1. Smoothly glide camera into the selected province
    this.focusMapOnProvince(data.svgCenter);

    // 2. Open panel quickly — don't make user wait for full zoom to finish
    if (shouldOpenPanel && window.WARISARA_PROVINCE_PANEL) {
      if (this._modalTimer) clearTimeout(this._modalTimer);
      this._modalTimer = setTimeout(() => {
        window.WARISARA_PROVINCE_PANEL.openPanel(data);
      }, 180);
    }
  },

  focusMapOnProvince: function (center, callback = null) {
    if (!this.svgMap || !center) return;

    const baseW = 982;
    const baseH = 390;
    const zoomFactor = 1.85;  // Comfortable zoom — shows the province clearly without extreme crop

    const newWidth  = baseW / zoomFactor;
    const newHeight = baseH / zoomFactor;

    // Allow slight overflow beyond SVG bounds so edge provinces (Sabang, Papua) aren't clamped
    const newMinX = center.x - newWidth  / 2;
    const newMinY = center.y - newHeight / 2;

    // 1 100 ms — smooth cinematic glide into the province
    this.animateViewBox(newMinX, newMinY, newWidth, newHeight, 1100, callback);
    this.isZoomed = true;
  },

  resetView: function (callback = null) {
    if (!this.svgMap) return;

    if (this._modalTimer) clearTimeout(this._modalTimer);

    // 1 000 ms smooth zoom-out back to full Indonesia view
    this.animateViewBox(0, 18, 982, 390, 1000, () => {
      this.svgMap.classList.remove("map-dimmed");
      this.svgMap.querySelectorAll(".map-province-group").forEach((g) => g.classList.remove("active"));
      this.svgMap.querySelectorAll(".map-province-path").forEach((p) => p.classList.remove("active"));
      this.svgMap.querySelectorAll(".map-marker").forEach((m) => m.classList.remove("active"));
      this.selectedProvinceId = null;
      this.isZoomed = false;
      if (callback) callback();
    });

    if (this.provinceSelectDropdown) {
      this.provinceSelectDropdown.value = "";
    }
  }
};
