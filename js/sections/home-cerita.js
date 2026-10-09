/**
 * WARISARA — Cerita yang Diwariskan Preview Showcase (30% Cuplikan Fitur)
 * Mengelola kartu cerita pilihan, pemutar kutipan audio, dan modal lembaran mini pada index.html
 */

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
        btn.addEventListener("click", () => {
          this.filterBtns.forEach((b) => {
            b.classList.remove("active", "bg-terracotta-500", "text-white");
            b.classList.add("bg-white/5", "text-surface/80", "border-white/10");
          });
          btn.classList.add("active", "bg-terracotta-500", "text-white");
          btn.classList.remove("bg-white/5", "text-surface/80", "border-white/10");
          this.renderCards(btn.dataset.theme);
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
          // Melodi genta mistis Nusantara (chime pembuka kisah)
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

        // Tampilkan toast petuah
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

        // Jika SpeechSynthesis tersedia dalam bahasa Indonesia
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(quoteText);
          utterance.lang = "id-ID";
          utterance.rate = 0.95;
          utterance.pitch = 0.98;
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {
        // Fallback
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
        card.className = "glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-terracotta-400/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-xl bg-[#16120F]";

        card.innerHTML = `
          <div>
            <!-- Cover image header with badges -->
            <div class="relative w-full h-48 sm:h-52 overflow-hidden bg-black/60">
              <img src="${story.coverImage}" alt="${story.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#16120F] via-black/30 to-black/20 pointer-events-none"></div>

              <div class="absolute top-3 left-3">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-terracotta-300">
                  <span class="material-symbols-outlined text-xs">auto_stories</span>
                  <span>${story.category}</span>
                </span>
              </div>

              <div class="absolute bottom-2.5 left-4 right-4">
                <div class="text-[10px] text-brass-300/90 font-mono tracking-wider uppercase mb-0.5">${story.origin}</div>
                <h3 class="font-display text-lg sm:text-xl font-light text-white leading-tight drop-shadow line-clamp-1">${story.title}</h3>
              </div>
            </div>

            <!-- Body Content -->
            <div class="p-5 space-y-3.5">
              <p class="text-xs text-surface/80 font-light leading-relaxed line-clamp-2">${story.summary}</p>

              <!-- Moral Lore Quote -->
              <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div class="text-[9px] uppercase font-bold tracking-widest text-terracotta-400 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">format_quote</span>
                  <span>Falsafah Luhur</span>
                </div>
                <p class="text-[11px] text-surface/85 italic leading-relaxed">"${story.quote}"</p>
              </div>
            </div>
          </div>

          <!-- Card Actions -->
          <div class="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2">
            <button type="button" class="btn-play-quote px-3 py-2 rounded-full bg-white/[0.05] hover:bg-terracotta-500/20 border border-white/10 hover:border-terracotta-400/40 text-surface/80 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors" title="Dengarkan Petuah Hikayat">
              <span class="material-symbols-outlined text-sm text-terracotta-400">volume_up</span>
              <span>Dengar Petuah</span>
            </button>

            <button type="button" class="btn-open-preview px-4 py-2 rounded-full bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-500 hover:to-terracotta-400 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-transform hover:scale-102 shadow-md">
              <span>Buka Cuplikan</span>
              <span class="material-symbols-outlined text-sm">menu_book</span>
            </button>
          </div>
        `;

        // Card button events
        card.querySelector(".btn-play-quote").addEventListener("click", () => {
          this.playQuoteSound(story.quote, story.title);
        });

        card.querySelector(".btn-open-preview").addEventListener("click", () => {
          this.openModal(story);
        });

        this.gridContainer.appendChild(card);
      });
    },

    openModal: function (story) {
      this.activeStory = story;
      this.activePage = 1;

      if (!this.modalOverlay) return;

      if (this.modalTitle) this.modalTitle.textContent = story.title;
      if (this.modalOrigin) this.modalOrigin.textContent = `${story.origin} • ${story.category}`;
      if (this.modalCover) this.modalCover.src = story.coverImage;
      if (this.modalQuote) this.modalQuote.textContent = `"${story.quote}"`;

      this.updatePageContent();

      this.modalOverlay.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    },

    closeModal: function () {
      if (!this.modalOverlay) return;
      this.modalOverlay.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
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
