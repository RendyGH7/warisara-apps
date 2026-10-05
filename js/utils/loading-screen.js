window.WARISARA_PRELOADER = {
  container: null,
  progressBar: null,
  counterEl: null,
  wisdomTextEl: null,
  canvas: null,
  ctx: null,
  animationFrameId: null,
  particles: [],
  isFinished: false,

  stanzas: [
    "Di antara samudera khatulistiwa, terhampar 38 bentang alam pusaka...",
    "Dari pahatan wayang, pamor keris, hingga helaian tenun & batik leluhur...",
    "Setiap guratan adalah doa, kearifan, dan jiwa peradaban bangsa...",
    "Yang diwariskan oleh masa lalu, kini saatnya kita teruskan...",
    "Menyibak gerbang penjelajahan WARISARA..."
  ],

  init: function () {
    
    if (window.location.pathname.includes("/pages/")) {
      document.body.classList.remove("preloader-active");
      document.body.classList.add("page-fade-in");
      return;
    }

    let isReload = false;
    try {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && navEntries[0].type === "reload") {
        isReload = true;
      } else if (performance.navigation && performance.navigation.type === 1) {
        isReload = true;
      }
    } catch (e) {}

    const hasPlayedBefore = sessionStorage.getItem("warisara_intro_played") === "true";

    if (!isReload && hasPlayedBefore) {
      document.body.classList.remove("preloader-active");
      document.body.classList.add("hero-animated");
      document.body.classList.add("page-fade-in");
      window.dispatchEvent(new CustomEvent("warisara:hero-animated"));
      return;
    }

    try {
      sessionStorage.setItem("warisara_intro_played", "true");
    } catch (e) {}

    document.body.classList.add("preloader-active");
    this.createDom();
    this.initCanvas();
    this.startCinematicSequence();
  },

  createDom: function () {
    if (document.getElementById("warisara-preloader")) {
      this.container = document.getElementById("warisara-preloader");
    } else {
      
      const isSubpage = window.location.pathname.includes("/pages/");
      const assetPrefix = isSubpage ? "../" : "";

      const preloader = document.createElement("div");
      preloader.id = "warisara-preloader";
      preloader.setAttribute("aria-hidden", "true");
      preloader.innerHTML = `
        
        <div class="preloader-backdrop-canvas">
          <img src="${assetPrefix}assets/images/loading-screen/bg-loading-batik-wayang.jpg" 
               class="preloader-backdrop-image" 
               alt="Batik dan Wayang Nusantara" />
          <div class="preloader-backdrop-vignette"></div>
        </div>

        <canvas id="preloader-particles-canvas"></canvas>

        <div class="preloader-glow-orb preloader-glow-orb-1"></div>
        <div class="preloader-glow-orb preloader-glow-orb-2"></div>

        <button id="preloader-skip-btn" class="preloader-skip-btn" type="button" aria-label="Lewati Intro">
          <span>Lewati Intro</span>
          <span class="material-symbols-outlined" style="font-size:13px;">east</span>
        </button>

        <div class="preloader-stage">
          
          <div class="preloader-seal-theater">
            
            <svg class="preloader-wayang-silhouette" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M80 8C80 8 135 70 145 125C155 180 120 195 80 215C40 195 5 180 15 125C25 70 80 8 80 8Z" stroke="#C9A567" stroke-width="1.8" stroke-dasharray="3 2" fill="url(#gununganGoldGrad)" />
              <path d="M80 25V195M55 110C65 118 75 120 80 120C85 120 95 118 105 110M50 145C65 155 95 155 110 145M60 80C70 88 90 88 100 80" stroke="#E6D3A7" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />
              <circle cx="80" cy="55" r="4" fill="#C9A567" />
              <defs>
                <radialGradient id="gununganGoldGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#C9A567" stop-opacity="0.18" />
                  <stop offset="100%" stop-color="#8A5822" stop-opacity="0.02" />
                </radialGradient>
              </defs>
            </svg>

            <div class="preloader-ring-outer"></div>
            <div class="preloader-ring-mid"></div>
            <div class="preloader-seal-core">
              <span class="preloader-seal-letter">W</span>
            </div>
          </div>

          <div class="preloader-title-container" aria-label="WARISARA">
            <span class="preloader-char" style="--char-index:0;">W</span>
            <span class="preloader-char" style="--char-index:1;">A</span>
            <span class="preloader-char" style="--char-index:2;">R</span>
            <span class="preloader-char" style="--char-index:3;">I</span>
            <span class="preloader-char" style="--char-index:4;">S</span>
            <span class="preloader-char" style="--char-index:5;">A</span>
            <span class="preloader-char" style="--char-index:6;">R</span>
            <span class="preloader-char" style="--char-index:7;">A</span>
          </div>

          <div class="preloader-divider-ribbon">
            <span class="preloader-ribbon-line"></span>
            <span class="preloader-ribbon-diamond">◆</span>
            <span class="preloader-ribbon-line"></span>
          </div>

          <div class="preloader-wisdom-stage">
            <p id="preloader-wisdom-text" class="preloader-wisdom-line">
              Di antara samudera khatulistiwa, terhampar 38 bentang alam pusaka...
            </p>
          </div>

          <div class="preloader-gauge-system">
            <div class="preloader-rail">
              <div id="preloader-laser-fill" class="preloader-laser-fill"></div>
            </div>
            <div class="preloader-meta-row">
              <span class="preloader-label-arch">Pusaka Nusantara</span>
              <span id="preloader-counter-digital" class="preloader-counter-digital">0%</span>
            </div>
          </div>
        </div>
      `;
      document.body.prepend(preloader);
      this.container = preloader;
    }

    this.progressBar = document.getElementById("preloader-laser-fill");
    this.counterEl = document.getElementById("preloader-counter-digital");
    this.wisdomTextEl = document.getElementById("preloader-wisdom-text");

    const skipBtn = document.getElementById("preloader-skip-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => this.finish());
    }
  },

  initCanvas: function () {
    this.canvas = document.getElementById("preloader-particles-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    const resize = () => {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particleCount = Math.min(60, Math.floor(window.innerWidth / 24));
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2.2 + 0.6,
        speedY: Math.random() * 0.4 + 0.18,
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.65 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const renderParticles = () => {
      if (this.isFinished || !this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let p of this.particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulsePhase += p.pulseSpeed;

        const dynamicAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulsePhase) * 0.2);

        if (p.y < -10) {
          p.y = this.canvas.height + 10;
          p.x = Math.random() * this.canvas.width;
        }

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(230, 211, 167, ${dynamicAlpha})`;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = "rgba(201, 165, 103, 0.75)";
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }

      this.animationFrameId = requestAnimationFrame(renderParticles);
    };

    renderParticles();
  },

  startCinematicSequence: function () {
    let progress = 0;
    let stanzaIndex = 0;
    const startTime = performance.now();
    const sequenceDuration = 6200; 

    const tick = () => {
      if (this.isFinished) return;

      const elapsed = performance.now() - startTime;
      const target = Math.min(100, Math.floor((elapsed / sequenceDuration) * 100));

      if (progress < target) {
        progress += Math.max(1, Math.floor((target - progress) * 0.18));
        if (progress > 100) progress = 100;

        if (this.progressBar) this.progressBar.style.width = `${progress}%`;
        if (this.counterEl) this.counterEl.textContent = `${progress}%`;

        const nextStanzaIndex = Math.min(
          this.stanzas.length - 1,
          Math.floor((progress / 100) * this.stanzas.length)
        );

        if (nextStanzaIndex !== stanzaIndex && this.wisdomTextEl) {
          stanzaIndex = nextStanzaIndex;
          this.wisdomTextEl.style.opacity = "0";
          this.wisdomTextEl.style.transform = "translateY(8px)";
          setTimeout(() => {
            if (this.wisdomTextEl) {
              this.wisdomTextEl.textContent = this.stanzas[stanzaIndex];
              this.wisdomTextEl.style.opacity = "1";
              this.wisdomTextEl.style.transform = "translateY(0)";
            }
          }, 240);
        }
      }

      if (progress >= 100) {
        this.finish();
      } else {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);

    setTimeout(() => {
      if (!this.isFinished) this.finish();
    }, 8200);
  },

  finish: function () {
    if (this.isFinished) return;
    this.isFinished = true;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.progressBar) this.progressBar.style.width = "100%";
    if (this.counterEl) this.counterEl.textContent = "100%";

    try {
      sessionStorage.setItem("warisara_intro_played", "true");
    } catch (e) {}

    setTimeout(() => {
      if (this.container) {
        this.container.classList.add("preloader-hidden");
      }
      document.body.classList.remove("preloader-active");
      document.body.classList.add("hero-animated");
      document.body.classList.add("page-fade-in");
      window.dispatchEvent(new CustomEvent("warisara:hero-animated"));
    }, 320);

    setTimeout(() => {
      if (this.container && this.container.parentNode) {
        this.container.remove();
      }
    }, 1900);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => window.WARISARA_PRELOADER.init());
} else {
  window.WARISARA_PRELOADER.init();
}
