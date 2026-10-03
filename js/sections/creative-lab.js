/**
 * WARISARA — Creative Lab Showcase Widget (Landing Page Edition)
 * Pure Native Canvas API & Vanilla JS
 */

window.WARISARA_CREATIVE_LAB = {
  canvas: null,
  ctx: null,
  currentMotif: "kawung",
  currentColor: "#16213A",
  currentDensity: 4,

  init: function () {
    this.canvas = document.getElementById("creative-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    this.bindControls();
    this.renderPattern();
  },

  bindControls: function () {
    const motifBtns = document.querySelectorAll(".motif-btn");
    motifBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        motifBtns.forEach((b) => {
          b.classList.remove("active", "border-brass-400", "bg-brass-500/20", "text-brass-300");
          b.classList.add("border-white/10", "bg-white/5", "text-surface/80");
        });
        btn.classList.add("active", "border-brass-400", "bg-brass-500/20", "text-brass-300");
        btn.classList.remove("border-white/10", "bg-white/5", "text-surface/80");
        this.currentMotif = btn.dataset.motif;
        this.renderPattern();
      });
    });

    const colorBtns = document.querySelectorAll(".color-btn");
    colorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        colorBtns.forEach((b) => b.classList.remove("ring-2", "ring-brass-400"));
        btn.classList.add("ring-2", "ring-brass-400");
        this.currentColor = btn.dataset.color;
        this.renderPattern();
      });
    });

    const downloadBtn = document.getElementById("canvas-download-btn");
    if (downloadBtn && this.canvas) {
      downloadBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = `WARISARA-${this.currentMotif.toUpperCase()}-Showcase.png`;
        link.href = this.canvas.toDataURL("image/png");
        link.click();
      });
    }
  },

  renderPattern: function () {
    if (!this.ctx || !this.canvas) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.fillStyle = "#F6F1E7";
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.strokeStyle = this.currentColor;
    this.ctx.lineWidth = 2.5;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    const gridSize = w / this.currentDensity;

    for (let x = 0; x < w; x += gridSize) {
      for (let y = 0; y < h; y += gridSize) {
        const cx = x + gridSize / 2;
        const cy = y + gridSize / 2;

        if (this.currentMotif === "kawung") {
          this.drawKawung(cx, cy, gridSize / 2.2);
        } else if (this.currentMotif === "parang") {
          this.drawParang(x, y, gridSize);
        } else if (this.currentMotif === "songket") {
          this.drawSongket(x, y, gridSize);
        } else if (this.currentMotif === "truntum") {
          this.drawTruntum(cx, cy, gridSize / 2.5);
        } else if (this.currentMotif === "megamendung") {
          this.drawMegamendung(cx, cy, gridSize);
        }
      }
    }
  },

  drawKawung: function (cx, cy, r) {
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, r, r / 2.5, 0, 0, Math.PI * 2);
    this.ctx.ellipse(cx, cy, r, r / 2.5, Math.PI / 2, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r / 5, 0, Math.PI * 2);
    this.ctx.fillStyle = this.currentColor;
    this.ctx.fill();
  },

  drawParang: function (x, y, size) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + size);
    this.ctx.lineTo(x + size, y);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(x + size / 2, y + size / 2, size / 5, 0, Math.PI * 2);
    this.ctx.stroke();
  },

  drawSongket: function (x, y, size) {
    const half = size / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x + half, y + 4);
    this.ctx.lineTo(x + size - 4, y + half);
    this.ctx.lineTo(x + half, y + size - 4);
    this.ctx.lineTo(x + 4, y + half);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(x + half, y + half, size / 7, 0, Math.PI * 2);
    this.ctx.fillStyle = this.currentColor;
    this.ctx.fill();
  },

  drawTruntum: function (cx, cy, r) {
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 4;
      this.ctx.beginPath();
      this.ctx.moveTo(cx - Math.cos(angle) * r, cy - Math.sin(angle) * r);
      this.ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      this.ctx.stroke();
    }
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r / 3.5, 0, Math.PI * 2);
    this.ctx.fillStyle = this.currentColor;
    this.ctx.fill();
  },

  drawMegamendung: function (cx, cy, size) {
    const half = size / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - half * 0.7, cy);
    this.ctx.bezierCurveTo(cx - half * 0.4, cy - half * 0.8, cx + half * 0.2, cy - half * 0.7, cx + half * 0.7, cy);
    this.ctx.bezierCurveTo(cx + half * 0.2, cy + half * 0.7, cx - half * 0.4, cy + half * 0.8, cx - half * 0.7, cy);
    this.ctx.stroke();
  }
};
