/**
 * WARISARA — Home Page Interactive Micro-Features (Sections Companion)
 * Mengelola interaktivitas cuplikan modul di index.html:
 * - Sinkronisasi mini status Paspor Penjelajah (38 Provinsi)
 * - Pemutar petuah lisan audio maestro penjaga tradisi
 * - Trigger chat langsung produk pengrajin UMKM
 * - Eksplorasi interaktif cuplikan Aksara Nusantara
 */

(function () {
  "use strict";

  const WARISARA_HOME_SECTIONS = {
    init: function () {
      this.initPassportTeaser();
      this.initMaestroWisdom();
      this.initProductChatTriggers();
      this.initAksaraTeaser();
      this.initStatsCounter();
    },

    // 1. Sinkronisasi Mini Status Paspor di Section Jelajahi
    initPassportTeaser: function () {
      const countEl = document.getElementById("home-passport-count");
      const percentEl = document.getElementById("home-passport-percent");
      const barEl = document.getElementById("home-passport-bar");
      const levelEl = document.getElementById("home-passport-level");

      if (!countEl || !percentEl || !barEl) return;

      try {
        let visitedCount = 0;
        const raw = localStorage.getItem("warisara_passport_stamps");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) visitedCount = parsed.length;
        }

        const total = 38;
        const percent = Math.min(100, Math.round((visitedCount / total) * 100));

        countEl.textContent = visitedCount;
        percentEl.textContent = percent + "%";
        barEl.style.width = percent + "%";

        if (levelEl) {
          if (visitedCount >= 38) {
            levelEl.textContent = "Maestro Nusantara";
            levelEl.className = "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/30 text-amber-200 border border-amber-400/50";
          } else if (visitedCount >= 19) {
            levelEl.textContent = "Penjelajah Mahir";
            levelEl.className = "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-400/25 text-forest-200 border border-forest-400/40";
          } else if (visitedCount > 0) {
            levelEl.textContent = "Penjelajah Aktif";
            levelEl.className = "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brass-400/25 text-brass-200 border border-brass-400/40";
          } else {
            levelEl.textContent = "Tingkat Awal";
          }
        }
      } catch (e) {
        console.warn("Passport sync teaser error:", e);
      }
    },

    // 2. Pemutar Petuah Lisan Maestro di Section Makers
    initMaestroWisdom: function () {
      const btns = document.querySelectorAll(".home-play-wisdom-btn");
      const toast = document.getElementById("home-story-quote-toast");
      const toastText = document.getElementById("home-story-quote-toast-text");

      btns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const name = btn.getAttribute("data-name") || "Maestro";
          const quote = btn.getAttribute("data-quote") || "";

          // Tampilkan Toast
          if (toast && toastText) {
            toastText.innerHTML = `<strong>${name}:</strong> "${quote}"`;
            toast.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
            toast.classList.add("opacity-100", "translate-y-0");

            setTimeout(() => {
              toast.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
              toast.classList.remove("opacity-100", "translate-y-0");
            }, 6000);
          }

          // Audio Speech Synthesis Lisan
          if ("speechSynthesis" in window && quote) {
            try {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(quote);
              utterance.lang = "id-ID";
              utterance.rate = 0.9;
              utterance.pitch = 0.95;

              // Cari suara bahasa Indonesia jika ada
              const voices = window.speechSynthesis.getVoices();
              const idVoice = voices.find((v) => v.lang.includes("id") || v.lang.includes("ID"));
              if (idVoice) utterance.voice = idVoice;

              window.speechSynthesis.speak(utterance);
            } catch (err) {
              console.warn("Speech synthesis error:", err);
            }
          }

          // Efek visual tombol aktif sesaat
          const originalText = btn.innerHTML;
          btn.innerHTML = `
            <span class="material-symbols-outlined text-sm animate-pulse text-amber-300">graphic_eq</span>
            <span class="text-amber-200">Menuturkan Petuah...</span>
          `;
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 3500);
        });
      });
    },

    // 3. Tombol Tanya Pengrajin Langsung Buka Chat C2C di Section Ekonomi Kreatif
    initProductChatTriggers: function () {
      const chatBtns = document.querySelectorAll(".home-chat-maker-btn");
      chatBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const sellerEmail = btn.getAttribute("data-seller");
          const productId = btn.getAttribute("data-product-id");
          const productName = btn.getAttribute("data-product-name");

          if (window.WARISARA_MARKETPLACE_CHAT && typeof window.WARISARA_MARKETPLACE_CHAT.openChatWithSeller === "function") {
            window.WARISARA_MARKETPLACE_CHAT.openChatWithSeller(sellerEmail, productId, productName);
          } else {
            // Fallback buka halaman pasar langsung
            window.location.href = `pages/ekonomi-kreatif.html?chat=${productId}`;
          }
        });
      });
    },

    // 4. Eksplorasi Cuplikan Aksara Nusantara di Section Belajar
    initAksaraTeaser: function () {
      const aksaraData = {
        jawa: {
          title: "Aksara Jawa (Hanacaraka)",
          region: "Jawa Tengah & DI Yogyakarta",
          glyph: "ꦲ ꦤ ꦕ ꦫ ꦏ",
          latin: "Ha - Na - Ca - Ra - Ka",
          meaning: "Ada dua utusan yang setia mengemban amanah kebenaran budi pekerti luhur."
        },
        sunda: {
          title: "Aksara Sunda (Ngangalagena)",
          region: "Jawa Barat & Banten",
          glyph: "ᮊ ᮌ ᮍ ᮎ ᮏ",
          latin: "Ka - Ga - Nga - Ca - Ja",
          meaning: "Simbol ketulusan hati dalam merawat alam Parahyangan yang subur makmur."
        },
        batak: {
          title: "Surat Batak (Surat Si Sia-sia)",
          region: "Sumatera Utara",
          glyph: "ᯀ ᯄ ᯅ ᯑ ᯎ",
          latin: "A - Ha - Ma - Na - Ra",
          meaning: "Ditorehkan pada kulit kayu alim (Pustaha Laklak) sebagai lambang keteguhan hukum adat Dalihan Na Tolu."
        },
        lontara: {
          title: "Aksara Lontara (Sulapa Eppa)",
          region: "Sulawesi Selatan",
          glyph: "ᨀ ᨁ ᨂ ᨄ ᨅ",
          latin: "Ka - Ga - Nga - Pa - Ba",
          meaning: "Geometri belah ketupat empat sisi melambangkan tanah, api, air, dan angin dalam diri manusia."
        }
      };

      const tabs = document.querySelectorAll(".home-aksara-tab");
      const titleEl = document.getElementById("home-aksara-title");
      const regionEl = document.getElementById("home-aksara-region");
      const glyphEl = document.getElementById("home-aksara-glyph");
      const latinEl = document.getElementById("home-aksara-latin");
      const meaningEl = document.getElementById("home-aksara-meaning");

      if (!tabs.length || !glyphEl) return;

      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          tabs.forEach((t) => {
            t.classList.remove("bg-forest-500/30", "text-forest-200", "border-forest-400/50", "active");
            t.classList.add("bg-white/5", "text-surface/70", "border-white/10");
          });
          tab.classList.add("bg-forest-500/30", "text-forest-200", "border-forest-400/50", "active");
          tab.classList.remove("bg-white/5", "text-surface/70", "border-white/10");

          const scriptKey = tab.getAttribute("data-aksara");
          const item = aksaraData[scriptKey];
          if (item) {
            if (titleEl) titleEl.textContent = item.title;
            if (regionEl) regionEl.textContent = item.region;
            glyphEl.textContent = item.glyph;
            if (latinEl) latinEl.textContent = item.latin;
            if (meaningEl) meaningEl.textContent = `"${item.meaning}"`;
          }
        });
      });
    },

    // 5. Animasi Menghitung Angka Statistik (0 sampai Angka Target)
    initStatsCounter: function () {
      const counters = document.querySelectorAll(".home-stat-counter");
      const container = document.getElementById("home-stats-counter-bar") || document.querySelector("#module-jelajahi .bg-gradient-to-r");
      if (!counters.length || !container) return;

      let hasAnimated = false;

      function formatNumber(num, separator) {
        if (!separator) return num.toString();
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      }

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function startCounting() {
        if (hasAnimated) return;
        hasAnimated = true;

        counters.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target"), 10) || 0;
          const suffix = el.getAttribute("data-suffix") || "";
          const separator = el.getAttribute("data-separator") || "";
          const duration = 2200; // 2.2 detik untuk animasi yang halus dan memuaskan
          let startTime = null;

          function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentVal = Math.floor(easedProgress * target);

            el.textContent = formatNumber(currentVal, separator) + (progress === 1 ? suffix : "");

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = formatNumber(target, separator) + suffix;
            }
          }

          requestAnimationFrame(animate);
        });
      }

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                startCounting();
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(container);
      } else {
        startCounting();
      }
    }
  };

  window.WARISARA_HOME_SECTIONS = WARISARA_HOME_SECTIONS;

  document.addEventListener("DOMContentLoaded", function () {
    WARISARA_HOME_SECTIONS.init();
  });
})();
