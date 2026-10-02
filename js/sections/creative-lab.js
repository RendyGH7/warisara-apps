/**
 * WARISARA — Creative Lab (HTML5 Canvas Pattern Generator)
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
        motifBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
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
        link.download = `warisara-${this.currentMotif}-pattern.png`;
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
    this.ctx.lineWidth = 2;

    const gridSize = w / this.currentDensity;

    for (let x = 0; x < w; x += gridSize) {
      for (let y = 0; y < h; y += gridSize) {
        if (this.currentMotif === "kawung") {
          this.drawKawung(x + gridSize / 2, y + gridSize / 2, gridSize / 2.2);
        } else if (this.currentMotif === "parang") {
          this.drawParang(x, y, gridSize);
        } else if (this.currentMotif === "songket") {
          this.drawSongket(x, y, gridSize);
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
    this.ctx.beginPath();
    this.ctx.moveTo(x + size / 2, y);
    this.ctx.lineTo(x + size, y + size / 2);
    this.ctx.lineTo(x + size / 2, y + size);
    this.ctx.lineTo(x, y + size / 2);
    this.ctx.closePath();
    this.ctx.stroke();
  }
};
