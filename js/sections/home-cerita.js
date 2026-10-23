(function () {
  "use strict";

  const FEATURED_STORIES = [
    {
      id: "legenda-pinisi",
      title: "Pelayaran Sawerigading & Lahirnya Perahu Pinisi",
      subtitle: "Kisah Epik I La Galigo & Rahasia Sumpah Panrita Lopi",
      origin: "Bulukumba, Sulawesi Selatan",
      category: "Mitologi Maritim",
      theme: "maritim",
      coverImage: "assets/images/stories/story_pinisi.jpg",
      quote: "Bukan kayu semata yang membuat kapal terapung, melainkan doa, martabat, dan kesatuan niat pembuatnya dengan samudra.",
      summary: "Kisah epik I La Galigo tentang pangeran Sawerigading yang kapalnya terbelah badai menjadi cikal bakal tradisi pembuatan perahu layar Pinisi tanpa paku besi.",
      excerptPage1: {
        title: "Penebangan Pohon Keramat Welenreng",
        text: "Alkisah Pangeran Sawerigading hendak berlayar menuju Negeri Tiongkok untuk meminang Putri We Cudai. Demi membangun bahtera tangguh, ditebanglah pohon raksasa keramat Welenrengnge di belantara Luwu. Setelah berbulan-bulan dikerjakan para empu, lahirlah kapal megah bertiang kokoh yang meluncur membelah ombak samudra."
      },
      excerptPage2: {
        title: "Sumpah Suci Panrita Lopi di Tiga Pesisir",
        text: "Ketika diterjang badai dahsyat saat kembali, kapal terbelah menjadi tiga bagian di pesisir Bira, Ara, dan Lemo-Lemo. Para tetua berikrar melahirkan tradisi Panrita Lopi: merakit kapal hanya dengan pasak kayu ulin tanpa sebatang paku besi pun, mengandalkan ketajaman rasa batin dan harmoni alam."
      }
    },
    {
      id: "tenun-gringsing",
      title: "Tenun Gringsing & Bintang Pelindung Dewa Indra",
      subtitle: "Kain Sakral Dobel Ikat Desa Kuno Tenganan Pegringsingan",
      origin: "Karangasem, Bali",
      category: "Wastra & Tenun Sakral",
      theme: "tenun",
      coverImage: "assets/images/stories/story_gringsing.jpg",
      quote: "Kain ini bukan sekadar sandang, ia adalah perisai gaib yang menolak kegelapan penyakit dan marabahaya fana.",
      summary: "Dewa Indra mengabadikan gemerlap gugusan bintang malam ke dalam helaian benang tenun ikat ganda sebagai pelindung sakral masyarakat Bali Aga.",
      excerptPage1: {
        title: "Wahyu Langit di Lembah Tenganan",
        text: "Masyarakat Bali Aga meyakini mereka adalah keturunan pilihan Dewa Indra, sang dewa perang dan pelindung semesta. Pada suatu malam gulita, Dewa Indra menampakkan keindahan langit bertabur bintang kepada para tetua, memerintahkan mereka menenun keagungan kosmos itu ke dalam lembaran benang kapas suci."
      },
      excerptPage2: {
        title: "Ketelitian Teknik Dobel Ikat Selama Bertahun-tahun",
        text: "Tenun Gringsing adalah satu-satunya teknik dobel ikat di Nusantara di mana benang pakan dan lungsi sama-sama diikat dan dicelup warna sebelum ditenun. Membutuhkan waktu hingga 3 sampai 5 tahun untuk menyelesaikan sehelai kain yang digunakan dalam upacara daur hidup sakral."
      }
    },
    {
      id: "falsafah-huma-betang",
      title: "Falsafah Rumah Panjang Huma Betang",
      subtitle: "Rukun Seratus Jiwa di Bawah Naungan Atap Kayu Ulin",
      origin: "Kapuas, Kalimantan Tengah",
      category: "Falsafah Hidup & Arsitektur",
      theme: "falsafah",
      coverImage: "assets/images/stories/story_dayak.jpg",
      quote: "Perbedaan agama dan bilik keluarga lebur dalam satu kehangatan: pantang bertikai di bawah atap Betang yang sama.",
      summary: "Kearifan suku Dayak merawat toleransi, gotong royong, dan kesetaraan dengan hidup bersama puluhan keluarga dalam satu rumah panggung ulin.",
      excerptPage1: {
        title: "Arsitektur Megah Melawan Banjir Rimba",
        text: "Huma Betang dibangun setinggi 3 hingga 5 meter di atas tiang-tiang kayu ulin raksasa sepanjang hingga 150 meter. Di dalamnya hidup rukun puluhan kepala keluarga dengan latar keyakinan berbeda, berbagi ruang beranda luas (Los) sebagai pusat musyawarah adat dan pesta panen."
      },
      excerptPage2: {
        title: "Empat Tiang Falsafah Luhur Dayak",
        text: "Kehidupan di Betang ditegakkan oleh empat pilar: gotong royong tanpa pamrih, kesetaraan hak pria dan wanita, musyawarah mufakat, serta ketaatan mutlak menjaga kelestarian rimba Kalimantan dari kerusakan serakah."
      }
    }
  ];

  const HomeCerita = {
    stories: FEATURED_STORIES,
    activeStory: null,
    activePage: 1,
    audioCtx: null,

    init: function () {
      this.cacheDom();
      if (!this.gridContainer) return;
      this.bindEvents();
      this.renderCards("all");
    },

    cacheDom: function () {
      this.gridContainer = document.getElementById("home-stories-grid");
      this.filterBtns = document.querySelectorAll(".home-story-filter-btn");
      this.modalOverlay = document.getElementById("home-story-modal-overlay");
      this.modalCloseBtn = document.getElementById("home-story-modal-close");
      this.modalTitle = document.getElementById("home-story-modal-title");
      this.modalOrigin = document.getElementById("home-story-modal-origin");
      this.modalCover = document.getElementById("home-story-modal-cover");
      this.modalSectionTitle = document.getElementById("home-story-modal-section-title");
      this.modalText = document.getElementById("home-story-modal-text");
      this.modalQuote = document.getElementById("home-story-modal-quote");
      this.modalPageIndicator = document.getElementById("home-story-page-indicator");
      this.modalPrevPageBtn = document.getElementById("home-story-prev-page");
      this.modalNextPageBtn = document.getElementById("home-story-next-page");
      this.modalFullStoryBtn = document.getElementById("home-story-read-full-btn");
      this.quoteToast = document.getElementById("home-story-quote-toast");
      this.quoteToastText = document.getElementById("home-story-quote-toast-text");
    },

    bindEvents: function () {
      this.filterBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const rect = btn.getBoundingClientRect();
          const ripple = document.createElement("span");
          ripple.className = "home-filter-ripple";
          const size = Math.max(rect.width, rect.height) * 1.5;
          ripple.style.width = ripple.style.height = `${size}px`;
          const clientX = e.clientX || (rect.left + rect.width / 2);
          const clientY = e.clientY || (rect.top + rect.height / 2);
          ripple.style.left = `${clientX - rect.left - size / 2}px`;
          ripple.style.top = `${clientY - rect.top - size / 2}px`;
          btn.appendChild(ripple);
          setTimeout(() => ripple.remove(), 650);

          btn.classList.add("btn-press");
          setTimeout(() => btn.classList.remove("btn-press"), 220);

          this.filterBtns.forEach((b) => {
            b.classList.remove("active", "bg-terracotta-500", "text-white");
            b.classList.add("bg-white/5", "text-surface/80", "border-white/10");
          });
          btn.classList.add("active", "bg-terracotta-500", "text-white");
          btn.classList.remove("bg-white/5", "text-surface/80", "border-white/10");

          if (this.gridContainer) {
            this.gridContainer.style.transition = "opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1), transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)";
            this.gridContainer.style.opacity = "0.35";
            this.gridContainer.style.transform = "translateY(6px)";
            setTimeout(() => {
              this.renderCards(btn.dataset.theme);
              this.gridContainer.style.opacity = "1";
              this.gridContainer.style.transform = "translateY(0)";
            }, 160);
          } else {
            this.renderCards(btn.dataset.theme);
          }
        });
      });

      if (this.modalCloseBtn && this.modalOverlay) {
        this.modalCloseBtn.addEventListener("click", () => this.closeModal());
        this.modalOverlay.addEventListener("click", (e) => {
          if (e.target === this.modalOverlay) this.closeModal();
        });
      }

      if (this.modalPrevPageBtn) {
        this.modalPrevPageBtn.addEventListener("click", () => this.setPage(1));
      }
      if (this.modalNextPageBtn) {
        this.modalNextPageBtn.addEventListener("click", () => this.setPage(2));
      }

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.modalOverlay && !this.modalOverlay.classList.contains("hidden")) {
          this.closeModal();
        }
      });
    },

    playQuoteSound: function (quoteText, storyTitle) {
      try {
        if (!this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this.audioCtx = new AudioContext();
        }
        if (this.audioCtx && this.audioCtx.state === "suspended") {
          this.audioCtx.resume();
        }

        if (this.audioCtx) {
          const now = this.audioCtx.currentTime;

          [440, 554.37, 659.25, 880].forEach((f, idx) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(f, now + idx * 0.12);
            gain.gain.setValueAtTime(0, now + idx * 0.12);
            gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.12 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start(now + idx * 0.12);
            osc.stop(now + idx * 0.12 + 0.81);
          });
        }

        if (this.quoteToast && this.quoteToastText) {
          this.quoteToastText.innerHTML = `<strong>${storyTitle}:</strong> "${quoteText}"`;
          this.quoteToast.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
          this.quoteToast.classList.add("opacity-100", "translate-y-0");

          if (this.toastTimeout) clearTimeout(this.toastTimeout);
          this.toastTimeout = setTimeout(() => {
            this.quoteToast.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
            this.quoteToast.classList.remove("opacity-100", "translate-y-0");
          }, 6000);
        }

        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(quoteText);
          utterance.lang = "id-ID";
          utterance.rate = 0.95;
          utterance.pitch = 0.98;
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {
      }
    },

    renderCards: function (themeFilter) {
      if (!this.gridContainer) return;
      this.gridContainer.innerHTML = "";

      const filtered = themeFilter === "all"
        ? this.stories
        : this.stories.filter((s) => s.theme === themeFilter);

      filtered.forEach((story) => {
        const card = document.createElement("div");
        card.className = "home-story-card glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 md:hover:border-terracotta-400/50 transition-all duration-200 md:duration-300 md:hover:-translate-y-1.5 flex flex-col justify-between group shadow-xl bg-[#16120F] cursor-pointer select-none touch-manipulation";

        card.innerHTML = `
          <div>
            <!-- Cover image header with badges -->
            <div class="relative w-full h-28 sm:h-52 overflow-hidden bg-black/60 pointer-events-none">
              <img src="${story.coverImage}" alt="${story.title}" class="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-500 ease-out" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#16120F] via-black/30 to-black/20 pointer-events-none"></div>

              <div class="absolute top-2 left-2 sm:top-3 sm:left-3">
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-terracotta-300">
                  <span class="material-symbols-outlined text-[10px] sm:text-xs">auto_stories</span>
                  <span class="truncate max-w-[80px] sm:max-w-none">${story.category}</span>
                </span>
              </div>

              <div class="absolute bottom-1.5 left-2 right-2 sm:bottom-2.5 sm:left-4 sm:right-4">
                <div class="text-[8.5px] sm:text-[10px] text-brass-300/90 font-mono tracking-wider uppercase mb-0.5 truncate">${story.origin}</div>
                <h3 class="font-display text-xs sm:text-xl font-light text-white leading-tight drop-shadow line-clamp-1">${story.title}</h3>
              </div>
            </div>

            <!-- Body Content -->
            <div class="p-3 sm:p-5 space-y-2">
              <p class="text-[10px] sm:text-xs text-surface/80 font-light leading-snug sm:leading-relaxed line-clamp-2">${story.summary}</p>
              <div class="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-brass-300/80 font-medium pt-0.5">
                <span class="material-symbols-outlined text-xs text-terracotta-400">auto_stories</span>
                <span>Falsafah Tradisi</span>
              </div>
            </div>
          </div>

          <!-- Card Actions -->
          <div class="p-3 pt-0 sm:p-5 sm:pt-0 border-t border-white/5 flex items-center justify-between gap-1.5 sm:gap-2">
            <button type="button" class="btn-play-quote flex-1 py-1.5 px-2 sm:py-2 sm:px-3 rounded-full bg-white/[0.05] hover:bg-terracotta-500/20 active:bg-terracotta-500/30 active:scale-95 border border-white/10 hover:border-terracotta-400/40 text-surface/80 hover:text-white text-[9px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all duration-150 touch-manipulation cursor-pointer" title="Dengarkan Petuah Hikayat">
              <span class="material-symbols-outlined text-[12px] sm:text-sm text-terracotta-400">volume_up</span>
              <span class="truncate">Petuah</span>
            </button>

            <button type="button" class="btn-open-preview flex-1 py-1.5 px-2 sm:py-2 sm:px-4 rounded-full bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-500 hover:to-terracotta-400 active:scale-95 text-white text-[9px] sm:text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1 transition-all duration-150 shadow-md touch-manipulation cursor-pointer">
              <span class="truncate">Baca</span>
              <span class="material-symbols-outlined text-[12px] sm:text-sm">arrow_forward</span>
            </button>
          </div>
        `;

        card.addEventListener("click", (e) => {
          if (e.target.closest(".btn-play-quote")) return;
          this.openModal(story, card);
        });

        card.querySelector(".btn-play-quote").addEventListener("click", (e) => {
          e.stopPropagation();
          this.playQuoteSound(story.quote, story.title);
        });

        card.querySelector(".btn-open-preview").addEventListener("click", (e) => {
          e.stopPropagation();
          this.openModal(story, e.currentTarget || e.target || card);
        });

        this.gridContainer.appendChild(card);
      });
    },

    openModal: function (story, triggerEl) {
      this.activeStory = story;
      this.activePage = 1;

      if (!this.modalOverlay) return;

      if (this.modalTitle) this.modalTitle.textContent = story.title;
      if (this.modalOrigin) this.modalOrigin.textContent = `${story.origin} • ${story.category}`;
      if (this.modalCover) this.modalCover.src = story.coverImage;
      if (this.modalQuote) this.modalQuote.textContent = `"${story.quote}"`;

      this.updatePageContent();

      var container = this.modalOverlay.querySelector('.modal-container, .relative') || this.modalOverlay.firstElementChild;
      if (window.WARISARA_POPUP && window.WARISARA_POPUP.open) {
        window.WARISARA_POPUP.open(this.modalOverlay, container, triggerEl);
      } else {
        this.modalOverlay.classList.remove("hidden");
        this.modalOverlay.classList.add("active");
      }
      document.body.classList.add("overflow-hidden");
    },

    closeModal: function () {
      if (!this.modalOverlay) return;
      var container = this.modalOverlay.querySelector('.modal-container, .relative') || this.modalOverlay.firstElementChild;
      var finish = () => {
        document.body.classList.remove("overflow-hidden");
        try {
          if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        } catch (e) {}
      };
      if (window.WARISARA_POPUP && window.WARISARA_POPUP.close) {
        window.WARISARA_POPUP.close(this.modalOverlay, container, finish);
      } else {
        this.modalOverlay.classList.remove("active");
        this.modalOverlay.classList.add("hidden");
        finish();
      }
    },

    setPage: function (pageNumber) {
      this.activePage = pageNumber;
      this.updatePageContent();
    },

    updatePageContent: function () {
      if (!this.activeStory) return;

      const pageData = this.activePage === 1 ? this.activeStory.excerptPage1 : this.activeStory.excerptPage2;

      if (this.modalSectionTitle) this.modalSectionTitle.textContent = pageData.title;
      if (this.modalText) this.modalText.textContent = pageData.text;

      if (this.modalPageIndicator) {
        this.modalPageIndicator.textContent = `Lembaran 0${this.activePage} dari 02 (Cuplikan)`;
      }

      if (this.modalPrevPageBtn) {
        this.modalPrevPageBtn.disabled = this.activePage === 1;
        this.modalPrevPageBtn.classList.toggle("opacity-40", this.activePage === 1);
      }
      if (this.modalNextPageBtn) {
        this.modalNextPageBtn.disabled = this.activePage === 2;
        this.modalNextPageBtn.classList.toggle("opacity-40", this.activePage === 2);
      }
    }
  };

  window.WARISARA_HOME_CERITA = HomeCerita;

  document.addEventListener("DOMContentLoaded", function () {
    HomeCerita.init();
  });
})();
