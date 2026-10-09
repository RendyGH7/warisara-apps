/**
 * WARISARA — Creative Lab Studio Mini Showcase (30% Cuplikan Fitur)
 * Mengelola kanvas generatif, pilihan motif adiluhung, kerapatan fraktal,
 * dan simulasi mockup produk (kemeja & scarf) langsung pada index.html
 */

(function () {
  "use strict";

  const PALETTES = {
    sogan: {
      primary: "#2A1E14",
      accent: "#C9A567",
      bg: "#F6F1E7"
    },
    indigo: {
      primary: "#16213A",
      accent: "#35578A",
      bg: "#ECE4D4"
    },
    terracotta: {
      primary: "#8F3A1D",
      accent: "#DDA07C",
      bg: "#FFF8ED"
    },
    brass: {
      primary: "#C9A567",
      accent: "#E6D3A7",
      bg: "#181410"
    }
  };

  const CreativeLab = {
    canvas: null,
    ctx: null,
    mockupCanvas: null,
    mockupCtx: null,
    currentMotif: "kawung",
    currentPaletteKey: "sogan",
    currentDensity: 4,
    currentStrokeWidth: 2.5,
    activeView: "flat", // "flat" | "shirt" | "scarf"

    init: function () {
      this.canvas = document.getElementById("creative-canvas");
      this.mockupCanvas = document.getElementById("creative-mockup-canvas");

      if (!this.canvas) return;
      this.ctx = this.canvas.getContext("2d");
      if (this.mockupCanvas) {
        this.mockupCtx = this.mockupCanvas.getContext("2d");
      }

      this.bindControls();
      this.render();
    },

    bindControls: function () {
      // Motif buttons
      const motifBtns = document.querySelectorAll(".lab-motif-btn");
      motifBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          motifBtns.forEach((b) => {
            b.classList.remove("active", "border-brass-400", "bg-brass-500/20", "text-brass-300");
            b.classList.add("border-white/10", "bg-white/5", "text-surface/80");
          });
          btn.classList.add("active", "border-brass-400", "bg-brass-500/20", "text-brass-300");
          btn.classList.remove("border-white/10", "bg-white/5", "text-surface/80");
          this.currentMotif = btn.dataset.motif;
          this.render();
        });
      });

      // Palette buttons
      const paletteBtns = document.querySelectorAll(".lab-palette-btn");
      paletteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          paletteBtns.forEach((b) => b.classList.remove("ring-2", "ring-brass-400", "scale-110"));
          btn.classList.add("ring-2", "ring-brass-400", "scale-110");
          this.currentPaletteKey = btn.dataset.palette;
          this.render();
        });
      });

      // Density slider
      const densitySlider = document.getElementById("lab-density-slider");
      const densityValDisplay = document.getElementById("lab-density-value");
      if (densitySlider) {
        densitySlider.addEventListener("input", (e) => {
          this.currentDensity = parseInt(e.target.value, 10);
          if (densityValDisplay) densityValDisplay.textContent = `${this.currentDensity}x`;
          this.render();
        });
      }

      // View tabs (Flat vs Shirt vs Scarf)
      const viewTabs = document.querySelectorAll(".lab-view-tab");
      viewTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          viewTabs.forEach((t) => {
            t.classList.remove("active", "bg-brass-500/20", "border-brass-400", "text-brass-300");
            t.classList.add("bg-white/5", "border-white/10", "text-surface/70");
          });
          tab.classList.add("active", "bg-brass-500/20", "border-brass-400", "text-brass-300");
          tab.classList.remove("bg-white/5", "border-white/10", "text-surface/70");
          this.activeView = tab.dataset.view;
          this.updateViewVisibility();
          this.render();
        });
      });

      // Randomize button
      const randomBtn = document.getElementById("lab-randomize-btn");
      if (randomBtn) {
        randomBtn.addEventListener("click", () => {
          const motifs = ["kawung", "parang", "megamendung", "songket", "truntum"];
          const palettes = Object.keys(PALETTES);
          const randMotif = motifs[Math.floor(Math.random() * motifs.length)];
          const randPal = palettes[Math.floor(Math.random() * palettes.length)];
          const randDensity = [2, 3, 4, 6][Math.floor(Math.random() * 4)];

          this.currentMotif = randMotif;
          this.currentPaletteKey = randPal;
          this.currentDensity = randDensity;

          // Sync UI
          motifBtns.forEach((b) => {
            const isMatch = b.dataset.motif === randMotif;
            b.classList.toggle("active", isMatch);
            b.classList.toggle("border-brass-400", isMatch);
            b.classList.toggle("bg-brass-500/20", isMatch);
            b.classList.toggle("text-brass-300", isMatch);
            b.classList.toggle("border-white/10", !isMatch);
            b.classList.toggle("bg-white/5", !isMatch);
            b.classList.toggle("text-surface/80", !isMatch);
          });

          paletteBtns.forEach((b) => {
            const isMatch = b.dataset.palette === randPal;
            b.classList.toggle("ring-2", isMatch);
            b.classList.toggle("ring-brass-400", isMatch);
            b.classList.toggle("scale-110", isMatch);
          });

          if (densitySlider) densitySlider.value = randDensity;
          if (densityValDisplay) densityValDisplay.textContent = `${randDensity}x`;

          this.render();
        });
      }

      // Download button
      const downloadBtn = document.getElementById("canvas-download-btn");
      if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
          const activeCanvas = (this.activeView !== "flat" && this.mockupCanvas) ? this.mockupCanvas : this.canvas;
          const link = document.createElement("a");
          link.download = `WARISARA-${this.currentMotif.toUpperCase()}-${this.activeView}.png`;
          link.href = activeCanvas.toDataURL("image/png");
          link.click();
        });
      }
    },

    updateViewVisibility: function () {
      if (!this.canvas || !this.mockupCanvas) return;
      if (this.activeView === "flat") {
        this.canvas.classList.remove("hidden");
        this.mockupCanvas.classList.add("hidden");
      } else {
        this.canvas.classList.add("hidden");
        this.mockupCanvas.classList.remove("hidden");
      }
    },

    render: function () {
      this.renderPattern();
      if (this.activeView !== "flat") {
        this.renderMockup();
      }
    },

    renderPattern: function () {
      if (!this.ctx || !this.canvas) return;

      const w = this.canvas.width;
      const h = this.canvas.height;
      const palette = PALETTES[this.currentPaletteKey] || PALETTES.sogan;

      this.ctx.fillStyle = palette.bg;
      this.ctx.fillRect(0, 0, w, h);

      this.ctx.strokeStyle = palette.primary;
      this.ctx.fillStyle = palette.primary;
      this.ctx.lineWidth = this.currentStrokeWidth;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";

      const gridSize = w / this.currentDensity;

      for (let x = 0; x < w; x += gridSize) {
        for (let y = 0; y < h; y += gridSize) {
          const cx = x + gridSize / 2;
          const cy = y + gridSize / 2;

          switch (this.currentMotif) {
            case "kawung":
              this.drawKawung(cx, cy, gridSize / 2.2, palette);
              break;
            case "parang":
              this.drawParang(x, y, gridSize, palette);
              break;
            case "megamendung":
              this.drawMegamendung(cx, cy, gridSize, palette);
              break;
            case "songket":
              this.drawSongket(x, y, gridSize, palette);
              break;
            case "truntum":
              this.drawTruntum(cx, cy, gridSize / 2.5, palette);
              break;
            default:
              this.drawKawung(cx, cy, gridSize / 2.2, palette);
          }
        }
      }
    },

    drawKawung: function (cx, cy, r, pal) {
      this.ctx.strokeStyle = pal.primary;
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy, r, r / 2.4, 0, 0, Math.PI * 2);
      this.ctx.ellipse(cx, cy, r, r / 2.4, Math.PI / 2, 0, Math.PI * 2);
      this.ctx.stroke();

      // Inti titik cecek emas
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r / 4.5, 0, Math.PI * 2);
      this.ctx.fillStyle = pal.accent;
      this.ctx.fill();
      this.ctx.strokeStyle = pal.primary;
      this.ctx.lineWidth = 1.2;
      this.ctx.stroke();
      this.ctx.lineWidth = this.currentStrokeWidth;
    },

    drawParang: function (x, y, size, pal) {
      this.ctx.strokeStyle = pal.primary;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + size);
      this.ctx.lineTo(x + size, y);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(x, y + size * 0.7);
      this.ctx.lineTo(x + size * 0.7, y);
      this.ctx.stroke();

      // Mlinjon belah ketupat
      const half = size / 2;
      this.ctx.beginPath();
      this.ctx.arc(x + half, y + half, size / 5.5, 0, Math.PI * 2);
      this.ctx.fillStyle = pal.accent;
      this.ctx.fill();
      this.ctx.stroke();
    },

    drawMegamendung: function (cx, cy, size, pal) {
      const half = size / 2;
      this.ctx.strokeStyle = pal.primary;

      // Lapisan awan bergradasi
      [0.9, 0.65, 0.4].forEach((scale, idx) => {
        this.ctx.beginPath();
        this.ctx.moveTo(cx - half * 0.8 * scale, cy);
        this.ctx.bezierCurveTo(
          cx - half * 0.4 * scale,
          cy - half * 0.8 * scale,
          cx + half * 0.2 * scale,
          cy - half * 0.6 * scale,
          cx + half * 0.8 * scale,
          cy
        );
        this.ctx.bezierCurveTo(
          cx + half * 0.2 * scale,
          cy + half * 0.6 * scale,
          cx - half * 0.4 * scale,
          cy + half * 0.8 * scale,
          cx - half * 0.8 * scale,
          cy
        );
        this.ctx.stroke();

        if (idx === 2) {
          this.ctx.fillStyle = pal.accent;
          this.ctx.fill();
        }
      });
    },

    drawSongket: function (x, y, size, pal) {
      const half = size / 2;
      this.ctx.strokeStyle = pal.primary;

      // Belah ketupat pucuk rebung
      this.ctx.beginPath();
      this.ctx.moveTo(x + half, y + 4);
      this.ctx.lineTo(x + size - 4, y + half);
      this.ctx.lineTo(x + half, y + size - 4);
      this.ctx.lineTo(x + 4, y + half);
      this.ctx.closePath();
      this.ctx.stroke();

      // Bintang dalam benang emas
      this.ctx.beginPath();
      this.ctx.moveTo(x + half, y + 8);
      this.ctx.lineTo(x + half, y + size - 8);
      this.ctx.moveTo(x + 8, y + half);
      this.ctx.lineTo(x + size - 8, y + half);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(x + half, y + half, size / 7, 0, Math.PI * 2);
      this.ctx.fillStyle = pal.accent;
      this.ctx.fill();
    },

    drawTruntum: function (cx, cy, r, pal) {
      this.ctx.strokeStyle = pal.primary;
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        this.ctx.beginPath();
        this.ctx.moveTo(cx - Math.cos(angle) * r, cy - Math.sin(angle) * r);
        this.ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
        this.ctx.stroke();
      }

      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r / 3.2, 0, Math.PI * 2);
      this.ctx.fillStyle = pal.accent;
      this.ctx.fill();
      this.ctx.stroke();
    },

    renderMockup: function () {
      if (!this.mockupCtx || !this.mockupCanvas || !this.canvas) return;

      const mCtx = this.mockupCtx;
      const mw = this.mockupCanvas.width;
      const mh = this.mockupCanvas.height;

      mCtx.clearRect(0, 0, mw, mh);

      // Background backdrop studio
      mCtx.fillStyle = "#14110E";
      mCtx.fillRect(0, 0, mw, mh);

      const pattern = mCtx.createPattern(this.canvas, "repeat");

      if (this.activeView === "shirt") {
        this.drawShirtMockup(mCtx, mw, mh, pattern);
      } else if (this.activeView === "scarf") {
        this.drawScarfMockup(mCtx, mw, mh, pattern);
      }
    },

    drawShirtMockup: function (mCtx, w, h, pattern) {
      mCtx.save();

      // Siluet Kemeja Pria Batik
      mCtx.beginPath();
      mCtx.moveTo(w * 0.35, h * 0.15);
      mCtx.lineTo(w * 0.2, h * 0.22);
      mCtx.lineTo(w * 0.08, h * 0.48);
      mCtx.lineTo(w * 0.22, h * 0.55);
      mCtx.lineTo(w * 0.28, h * 0.42);
      mCtx.lineTo(w * 0.26, h * 0.88);
      mCtx.quadraticCurveTo(w * 0.5, h * 0.94, w * 0.74, h * 0.88);
      mCtx.lineTo(w * 0.72, h * 0.42);
      mCtx.lineTo(w * 0.78, h * 0.55);
      mCtx.lineTo(w * 0.92, h * 0.48);
      mCtx.lineTo(w * 0.8, h * 0.22);
      mCtx.lineTo(w * 0.65, h * 0.15);
      mCtx.quadraticCurveTo(w * 0.5, h * 0.22, w * 0.35, h * 0.15);
      mCtx.closePath();

      mCtx.fillStyle = pattern;
      mCtx.fill();

      // Shading realistis lipatan kain
      const shadeGrad = mCtx.createLinearGradient(0, 0, w, 0);
      shadeGrad.addColorStop(0, "rgba(0,0,0,0.45)");
      shadeGrad.addColorStop(0.25, "rgba(255,255,255,0.12)");
      shadeGrad.addColorStop(0.5, "rgba(0,0,0,0.15)");
      shadeGrad.addColorStop(0.75, "rgba(255,255,255,0.15)");
      shadeGrad.addColorStop(1, "rgba(0,0,0,0.5)");
      mCtx.fillStyle = shadeGrad;
      mCtx.fill();

      mCtx.strokeStyle = "rgba(0,0,0,0.6)";
      mCtx.lineWidth = 2.5;
      mCtx.stroke();

      // Garis kancing tengah
      mCtx.beginPath();
      mCtx.moveTo(w * 0.5, h * 0.2);
      mCtx.lineTo(w * 0.5, h * 0.9);
      mCtx.strokeStyle = "rgba(0,0,0,0.5)";
      mCtx.lineWidth = 3;
      mCtx.stroke();

      // Kancing kerang emas
      for (let b = 1; b <= 5; b++) {
        const by = h * 0.22 + b * (h * 0.12);
        mCtx.beginPath();
        mCtx.arc(w * 0.5, by, 4.5, 0, Math.PI * 2);
        mCtx.fillStyle = "#E6D3A7";
        mCtx.fill();
        mCtx.strokeStyle = "#1A1612";
        mCtx.lineWidth = 1.2;
        mCtx.stroke();
      }

      // Kerah kemeja
      mCtx.beginPath();
      mCtx.moveTo(w * 0.35, h * 0.15);
      mCtx.lineTo(w * 0.5, h * 0.26);
      mCtx.lineTo(w * 0.65, h * 0.15);
      mCtx.strokeStyle = "rgba(0,0,0,0.7)";
      mCtx.lineWidth = 2.5;
      mCtx.stroke();

      mCtx.restore();
    },

    drawScarfMockup: function (mCtx, w, h, pattern) {
      mCtx.save();

      // Siluet Selendang / Scarf Sutra Melengkung Indah
      mCtx.beginPath();
      mCtx.moveTo(w * 0.2, h * 0.1);
      mCtx.bezierCurveTo(w * 0.45, h * 0.08, w * 0.55, h * 0.18, w * 0.8, h * 0.12);
      mCtx.bezierCurveTo(w * 0.88, h * 0.45, w * 0.75, h * 0.75, w * 0.78, h * 0.9);
      mCtx.lineTo(w * 0.45, h * 0.9);
      mCtx.bezierCurveTo(w * 0.42, h * 0.7, w * 0.18, h * 0.5, w * 0.2, h * 0.1);
      mCtx.closePath();

      mCtx.fillStyle = pattern;
      mCtx.fill();

      // Kilau sutra (sheen)
      const sheen = mCtx.createLinearGradient(0, 0, w, h);
      sheen.addColorStop(0, "rgba(255,255,255,0.25)");
      sheen.addColorStop(0.35, "rgba(0,0,0,0.3)");
      sheen.addColorStop(0.65, "rgba(255,255,255,0.2)");
      sheen.addColorStop(1, "rgba(0,0,0,0.4)");
      mCtx.fillStyle = sheen;
      mCtx.fill();

      mCtx.strokeStyle = "rgba(0,0,0,0.5)";
      mCtx.lineWidth = 2;
      mCtx.stroke();

      // Rumbai emas ujung selendang
      for (let f = 0; f < 12; f++) {
        const fx = w * 0.45 + f * ((w * 0.78 - w * 0.45) / 12);
        mCtx.beginPath();
        mCtx.moveTo(fx, h * 0.9);
        mCtx.lineTo(fx + (Math.random() * 4 - 2), h * 0.95);
        mCtx.strokeStyle = "#C9A567";
        mCtx.lineWidth = 1.5;
        mCtx.stroke();
      }

      mCtx.restore();
    }
  };

  window.WARISARA_CREATIVE_LAB = CreativeLab;

  document.addEventListener("DOMContentLoaded", function () {
    CreativeLab.init();
  });
})();
