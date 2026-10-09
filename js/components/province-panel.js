window.WARISARA_PROVINCE_PANEL = {
  modalOverlay: null,
  modalElement: null,
  closeBtn: null,
  mapCloseBtn: null,
  exploreBtn: null,
  prevBtn: null,
  nextBtn: null,
  audioBtn: null,
  shareBtn: null,
  wariTrigger: null,
  wariNextFactBtn: null,
  wariSprite: null,
  wariSpeech: null,
  isOpen: false,
  currentProvinceId: null,
  currentFactIndex: 0,
  wariTimer: null,

  // Regional & Province Greetings Dictionary
  greetings: {
    "aceh": "Saleum Teuka! (Selamat Datang)",
    "sumatera-utara": "Horas! Mejuah-juah! Njuah-njuah!",
    "sumatera-barat": "Salamaik Datang di Ranah Minang!",
    "riau": "Selamat Datang di Bumi Melayu Lancang Kuning!",
    "kepulauan-riau": "Selamat Datang di Negeri Segantang Lada!",
    "jambi": "Sepucuk Jambi Sembilan Lurah!",
    "sumatera-selatan": "Salam Dulur Kito! Selamat Datang!",
    "bengkulu": "Salam Bumi Rafflesia!",
    "lampung": "Tabik Pun! Salam Jejama!",
    "bangka-belitung": "Salam Serumpun Sebalai!",
    "dki-jakarta": "Halo Abang, Mpok, & Ncang Ncing!",
    "jawa-barat": "Sampurasun! Wilujeng Sumping!",
    "banten": "Sampurasun dulur sadaya!",
    "jawa-tengah": "Sugeng Rawuh ing Bumi Jawi!",
    "di-yogyakarta": "Sugeng Rawuh ing Ngayogyakarta Hadiningrat!",
    "jawa-timur": "Sugeng Rawuh Rek! Salam Satu Jiwa!",
    "bali": "Om Swastiastu! Rahajeng Rawuh!",
    "nusa-tenggara-barat": "Tabe! Salam Bumi Gora!",
    "nusa-tenggara-timur": "Mai Ga'e! Salve! Bolelebo!",
    "kalimantan-barat": "Adil Ka' Talino, Bacuramin Ka' Saruga!",
    "kalimantan-tengah": "Mamumpung Tabela Penyang Hinje Simpei!",
    "kalimantan-selatan": "Haram Manyarah Waja Sampai Kaputing!",
    "kalimantan-timur": "Ruhui Rahayu! Adil Ka' Talino!",
    "kalimantan-utara": "Benuanta! Salam Tapal Batas Borneo!",
    "sulawesi-utara": "Tabea! Torang Samua Basudara!",
    "gorontalo": "Duluwo Limo Lo Pohalaa!",
    "sulawesi-tengah": "Nalindo! Sintuwu Maroso!",
    "sulawesi-barat": "Salama'ki Tapada Salama'!",
    "sulawesi-selatan": "Kurru Sumange'! Salama'ki!",
    "sulawesi-tenggara": "Tabea Metanoa! Mepokoaso!",
    "maluku": "Tabea! Ambon Manise Lawamena Haulala!",
    "maluku-utara": "Marimoi Ngone Futuru! Salam Kesultanan!",
    "papua": "Amolongo! Salam Damai Cenderawasih!",
    "papua-barat": "Mansinam Menggema! Salam Damai!",
    "papua-selatan": "Anim Ha! Salam Persaudaraan Sejati!",
    "papua-tengah": "Noken Persatuan! Salam Damai Lembah!",
    "papua-pegunungan": "Wamena Mengalun! Kurima Kurima!",
    "papua-barat-daya": "Raja Ampat Permata Lautan! Tabea!"
  },

  // Wari's Cultural Trivia Bank
  trivia: {
    "kalimantan-timur": [
      "Kain tenun Ulap Doyo dibuat dari serat daun liar Doyo yang kuat dan dipintal dengan tangan oleh wanita Dayak Benuaq secara turun-temurun!",
      "Alat musik Sampe dibuat dari kayu marong atau kayu pelantan, diukir dengan motif taring naga Aso untuk mengiringi tari kancet papatai.",
      "Kalimantan Timur memiliki Sungai Mahakam yang legendaris, rumah bagi mamalia air tawar langka: Pesut Mahakam!",
      "Meronce manik-manik Dayak Kenyah pada topi saung memerlukan waktu berbulan-bulan dengan ketelitian geometris tingkat tinggi!"
    ],
    "aceh": [
      "Tari Saman ditarikan tanpa iringan alat musik melodis, hanya mengandalkan suara tepukan dada, paha, dan nyanyian para penari yang sinkron sempurna!",
      "Bentuk gagang Rencong menyerupai huruf Arab 'Ba' dan bilahnya menyerupai 'Bismillah', melambangkan tauhid dan pertahanan kehormatan masyarakat Aceh.",
      "Sulam Kasab menggunakan benang emas murni yang dijahit timbul pada kain beludru pekat, warisan kemegahan era Kesultanan Iskandar Muda."
    ],
    "jawa-barat": [
      "Angklung terdaftar sebagai Warisan Budaya Takbenda Dunia UNESCO sejak 2010 dan mengajarkan harmoni gotong royong.",
      "Motif Batik Megamendung dari Cirebon melambangkan awan pembawa hujan penyejuk jiwa dengan gradasi 7 lapisan warna.",
      "Wayang Golek Sunda menggunakan boneka kayu berukir lentur yang digerakkan oleh dalang dengan narasi penuh humor dan pesan bijak."
    ],
    "di-yogyakarta": [
      "Batik Keraton Yogyakarta sarat aturan adat, seperti motif Parang Rusak Barong yang dulunya hanya boleh dikenakan oleh Raja/Sultan.",
      "Gamelan Sekaten hanya ditabuh setahun sekali saat perayaan Maulid Nabi di Alun-Alun Utara Kraton Yogyakarta.",
      "Arsitektur Keraton Yogyakarta dibangun dengan garis imajiner kosmologis yang menghubungkan Gunung Merapi, Keraton, dan Pantai Parangtritis."
    ],
    "bali": [
      "Kain Tenun Gringsing dari Desa Tenganan Pegringsingan adalah satu-satunya teknik tenun ikat ganda di Indonesia, dipercaya menangkal marabahaya.",
      "Setiap pura di Bali dihiasi canang sari berbunga harum sebagai wujud syukur Tri Hita Karana (harmoni Tuhan, sesama, dan alam).",
      "Ukiran batu padas Bali dibuat oleh para undagi (arsitek tradisional) dengan proporsi sakral asta kosala kosali."
    ],
    "sulawesi-selatan": [
      "Kapal Pinisi dari Bulukumba telah mengarungi lima benua dan dibuat tanpa sehelai paku logam pun, hanya pasak kayu ulin purba!",
      "Tenun Sutra Sengkang ditenun dari ulat sutra Murbei lokal dengan warna-warni cerah yang mencerminkan status dan kegembiraan perayaan Bugis.",
      "Rumah adat Tongkonan menghadap ke utara, arah yang dipercaya masyarakat Toraja sebagai tempat peristirahatan para leluhur."
    ],
    "papua": [
      "Tas Noken Papua dirajut dari serat kulit kayu pohon melinjo atau manduam oleh para mama Papua, dan digantung di dahi sebagai simbol rahim kehidupan.",
      "Suku Asmat percaya bahwa setiap ukiran kayu patung Bisj yang mereka buat memahat kembali roh leluhur agar tetap hidup bersama mereka.",
      "Tifa Papua dibuat dari kayu bulat yang dilubangi dan dipasang kulit biawak atau rusa dengan perekat darah kapur alami."
    ]
  },

  // Regional Illustration Fallback Directory
  getIllustrationForProvince: function (province) {
    if (!province) return "assets/images/hero/bg-hero-batik-hd.jpg";
    if (province.id === "kalimantan-timur") {
      return "assets/images/provinces/kalimantan-timur.jpg";
    }

    const island = (province.island || "").toLowerCase();
    if (island.includes("sumat")) return "assets/images/provinces/region-sumatra.jpg";
    if (island.includes("jaw")) return "assets/images/provinces/region-jawa.jpg";
    if (island.includes("bali")) return "assets/images/provinces/region-bali.jpg";
    if (island.includes("nusa") || island.includes("tenggara")) return "assets/images/provinces/region-nusa-tenggara.jpg";
    if (island.includes("kaliman") || island.includes("borneo")) return "assets/images/provinces/region-kalimantan.jpg";
    if (island.includes("sulaw") || island.includes("celebes")) return "assets/images/provinces/region-sulawesi.jpg";
    if (island.includes("maluk")) return "assets/images/provinces/region-maluku.jpg";
    if (island.includes("papua")) return "assets/images/provinces/region-papua.jpg";

    return "assets/images/provinces/region-jawa.jpg";
  },

  init: function () {
    this.modalOverlay = document.getElementById("province-modal-overlay");
    this.modalElement = document.getElementById("province-detail-modal");
    this.closeBtn = document.getElementById("province-modal-close-btn");
    this.mapCloseBtn = document.getElementById("modal-btn-close-map");
    this.exploreBtn = document.getElementById("modal-btn-explore-heritage");
    this.prevBtn = document.getElementById("modal-prev-prov-btn");
    this.nextBtn = document.getElementById("modal-next-prov-btn");
    this.audioBtn = document.getElementById("modal-btn-audio-chime");
    this.shareBtn = document.getElementById("modal-btn-share");
    this.wariTrigger = document.getElementById("modal-wari-trigger");
    this.wariNextFactBtn = document.getElementById("modal-wari-next-fact-btn");
    this.wariSprite = document.getElementById("modal-wari-sprite");
    this.wariSpeech = document.getElementById("modal-wari-speech");

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closePanel());
    }

    if (this.mapCloseBtn) {
      this.mapCloseBtn.addEventListener("click", () => this.closePanel());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.navigateProvince(-1));
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.navigateProvince(1));
    }

    if (this.audioBtn) {
      this.audioBtn.addEventListener("click", () => {
        this.playTraditionalSound("gong");
        this.showToast("🔔 Gamelan Gong Berbunyi — Merayakan Budaya Nusantara");
      });
    }

    if (this.shareBtn) {
      this.shareBtn.addEventListener("click", () => this.handleShare());
    }

    if (this.wariTrigger) {
      this.wariTrigger.addEventListener("click", () => this.interactWithWari());
    }

    if (this.wariNextFactBtn) {
      this.wariNextFactBtn.addEventListener("click", () => this.interactWithWari());
    }

    // Setup Tabs
    const tabBtns = document.querySelectorAll(".province-tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabTarget = btn.getAttribute("data-tab");
        this.switchTab(tabTarget);
      });
    });

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (!this.isOpen) return;
      if (e.key === "Escape") {
        this.closePanel();
      } else if (e.key === "ArrowLeft") {
        this.navigateProvince(-1);
      } else if (e.key === "ArrowRight") {
        this.navigateProvince(1);
      }
    });
  },

  switchTab: function (targetTabId) {
    const tabBtns = document.querySelectorAll(".province-tab-btn");
    const tabContents = document.querySelectorAll(".province-tab-content");

    tabBtns.forEach((btn) => {
      if (btn.getAttribute("data-tab") === targetTabId) {
        btn.classList.add("active");
        btn.classList.remove("text-surface/70");
      } else {
        btn.classList.remove("active");
        btn.classList.add("text-surface/70");
      }
    });

    tabContents.forEach((panel) => {
      if (panel.id === targetTabId) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    });
  },

  interactWithWari: function () {
    if (!this.wariSprite || !this.currentProvinceId) return;

    // Switch sprite to happy
    this.wariSprite.src = "assets/mascot/wari-happy-clean.png";
    this.wariSprite.classList.add("modal-wari-bounce");

    // Play chime sound
    this.playTraditionalSound("chime");

    // Next trivia fact
    const facts = this.getTriviaForProvince(this.currentProvinceId);
    this.currentFactIndex = (this.currentFactIndex + 1) % facts.length;
    if (this.wariSpeech) {
      this.wariSpeech.textContent = `"${facts[this.currentFactIndex]}"`;
    }

    if (this.wariTimer) clearTimeout(this.wariTimer);
    this.wariTimer = setTimeout(() => {
      if (this.wariSprite) {
        this.wariSprite.src = "assets/mascot/wari-idle-clean.png";
        this.wariSprite.classList.remove("modal-wari-bounce");
      }
    }, 2400);
  },

  getTriviaForProvince: function (provId) {
    if (this.trivia[provId] && this.trivia[provId].length > 0) {
      return this.trivia[provId];
    }
    const prov = window.PROVINCES_DATA ? window.PROVINCES_DATA[provId] : null;
    if (!prov) return ["Nusantara memiliki jutaan cerita kearifan lokal yang abadi!"];

    return [
      `Tahukah kamu? Di ${prov.name}, ${prov.craftHighlight}`,
      `Masyarakat ${prov.name} memegang teguh petuah: "${prov.shortStatement}"`,
      prov.maker && prov.maker.quote ? `Petuah dari ${prov.maker.name}: "${prov.maker.quote}"` : `Kekayaan budaya ${prov.name} merupakan bukti persatuan bangsa Indonesia.`
    ];
  },

  playTraditionalSound: function (type = "gong") {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;

      if (type === "gong") {
        // Deep resonant bronze gong tone
        const freqs = [110, 220, 277.18, 329.63, 440];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, now);
          const vol = idx === 0 ? 0.35 : 0.12 / (idx + 1);
          gain.gain.setValueAtTime(vol, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + (idx === 0 ? 2.4 : 1.7));
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 2.5);
        });
      } else {
        // Cheerful gamelan chime
        const notes = [392, 466.16, 587.33];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.2, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 1.3);
        });
      }
    } catch (e) {
      console.warn("Audio chime disabled or unavailable", e);
    }
  },

  handleShare: function () {
    if (!this.currentProvinceId || !window.PROVINCES_DATA) return;
    const prov = window.PROVINCES_DATA[this.currentProvinceId];
    const shareText = `Jelajahi keindahan budaya ${prov.name} di WARISARA — ${prov.shortStatement}`;
    const shareUrl = `${window.location.origin}${window.location.pathname}?province=${encodeURIComponent(prov.id)}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        this.showToast(`✨ Tautan Budaya ${prov.name} disalin ke clipboard!`);
      }).catch(() => {
        this.showToast(`✨ ${prov.name} siap dibagikan!`);
      });
    } else {
      this.showToast(`✨ Berbagi kebudayaan ${prov.name}!`);
    }
  },

  showToast: function (message) {
    let toast = document.getElementById("warisara-panel-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "warisara-panel-toast";
      toast.className = "fixed bottom-8 left-1/2 -translate-x-1/2 z-[1100] px-5 py-2.5 rounded-full bg-[#18130E] border border-brass-500/40 text-surface text-xs font-semibold shadow-2xl flex items-center gap-2 pointer-events-none transition-all duration-300 opacity-0 translate-y-4";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove("opacity-0", "translate-y-4");
    toast.classList.add("opacity-100", "translate-y-0");

    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-4");
    }, 2800);
  },

  navigateProvince: function (direction) {
    if (!window.PROVINCES_DATA) return;
    const keys = Object.keys(window.PROVINCES_DATA);
    if (keys.length === 0) return;

    let currentIndex = keys.indexOf(this.currentProvinceId);
    if (currentIndex === -1) currentIndex = 0;

    let nextIndex = (currentIndex + direction + keys.length) % keys.length;
    const nextProvId = keys[nextIndex];
    const nextProvince = window.PROVINCES_DATA[nextProvId];

    if (nextProvince) {
      this.openPanel(nextProvince);
      if (window.WARISARA_HERO_MAP && nextProvince.svgCenter) {
        window.WARISARA_HERO_MAP.selectProvince(nextProvId, false);
      }
    }
  },

  openPanel: function (province) {
    if (!this.modalOverlay || !province) return;

    this.currentProvinceId = province.id;
    this.currentFactIndex = 0;

    // Elements
    const nameEl = document.getElementById("modal-province-name");
    const topBarProvName = document.getElementById("top-bar-prov-name");
    const topBarIsland = document.getElementById("top-bar-island");
    const labProvName = document.getElementById("modal-lab-prov-name");
    const islandTextEl = document.getElementById("modal-province-island-text");
    const greetingTextEl = document.getElementById("modal-province-greeting-text");
    const capitalEl = document.getElementById("modal-province-capital");
    const quickStatCapital = document.getElementById("quick-stat-capital");
    const quickStatIsland = document.getElementById("quick-stat-island");
    const statementEl = document.getElementById("modal-province-statement");
    const descEl = document.getElementById("modal-province-desc");
    const wisdomFulltext = document.getElementById("modal-wisdom-fulltext");
    const craftHighlightEl = document.getElementById("modal-craft-highlight");
    const heritageListEl = document.getElementById("modal-heritage-list");
    const makerCardEl = document.getElementById("modal-maker-card");
    const makerNameEl = document.getElementById("modal-maker-name");
    const makerRoleEl = document.getElementById("modal-maker-role");
    const makerQuoteEl = document.getElementById("modal-maker-quote");
    const illustrationImg = document.getElementById("modal-province-illustration");
    const illustrationCaption = document.getElementById("modal-illustration-caption");
    const illustrationSubtext = document.getElementById("modal-illustration-subtext");

    // Populate data
    if (nameEl) nameEl.textContent = province.name;
    if (topBarProvName) topBarProvName.textContent = province.name;
    if (labProvName) labProvName.textContent = province.name;

    const islandLabel = `PULAU ${(province.island || "").toUpperCase()}`;
    if (islandTextEl) islandTextEl.textContent = islandLabel;
    if (topBarIsland) topBarIsland.textContent = islandLabel;
    if (quickStatIsland) quickStatIsland.textContent = islandLabel;

    if (capitalEl) capitalEl.textContent = province.capital || "";
    if (quickStatCapital) quickStatCapital.textContent = province.capital || "";

    const greeting = this.greetings[province.id] || "Salam Budaya Nusantara!";
    if (greetingTextEl) greetingTextEl.textContent = greeting;

    if (statementEl) statementEl.textContent = `"${province.shortStatement || ""}"`;
    if (descEl) descEl.textContent = province.shortDescription || "";
    if (wisdomFulltext) {
      wisdomFulltext.textContent = `${province.name} memiliki kekayaan tradisi yang telah bertahan melintasi zaman. ${province.shortDescription || ""} Nilai luhur ini diwariskan dari para leluhur melalui karya seni, adat istiadat, dan filosofi hidup selaras dengan alam semesta.`;
    }

    if (craftHighlightEl) craftHighlightEl.textContent = province.craftHighlight || "";

    // Illustration
    const illusUrl = this.getIllustrationForProvince(province);
    if (illustrationImg) {
      illustrationImg.src = illusUrl;
      illustrationImg.alt = `Ilustrasi Pusaka ${province.name}`;
    }
    if (illustrationCaption) {
      illustrationCaption.textContent = province.craftHighlight ? province.craftHighlight.split(" ")[0] + " & Pusaka " + province.name : `Pusaka Budaya ${province.name}`;
    }
    if (illustrationSubtext) {
      illustrationSubtext.textContent = province.shortStatement || "Mahakarya luhur bangsa Indonesia.";
    }

    // Wari Greeting & Fun Fact
    const facts = this.getTriviaForProvince(province.id);
    if (this.wariSpeech) {
      this.wariSpeech.textContent = `"${facts[0]}"`;
    }
    if (this.wariSprite) {
      this.wariSprite.src = "assets/mascot/wari-idle-clean.png";
      this.wariSprite.classList.remove("modal-wari-bounce");
    }

    // Maker
    if (province.maker && (province.maker.name || province.maker.quote)) {
      if (makerCardEl) makerCardEl.style.display = "";
      if (makerNameEl) makerNameEl.textContent = province.maker.name || "";
      if (makerRoleEl) makerRoleEl.textContent = province.maker.role || "";
      if (makerQuoteEl) makerQuoteEl.textContent = `"${province.maker.quote || ""}"`;
    } else if (makerCardEl) {
      makerCardEl.style.display = "none";
    }

    // Direct CTAs
    if (this.exploreBtn && province.id) {
      this.exploreBtn.href = `pages/jelajahi.html?province=${encodeURIComponent(province.id)}`;
      const btnSpan = this.exploreBtn.querySelector("span:not(.material-symbols-outlined)");
      if (btnSpan) btnSpan.textContent = `Jelajahi Arsip ${province.name}`;
    }

    const directLabBtn = document.getElementById("modal-btn-direct-lab");
    if (directLabBtn) {
      directLabBtn.href = `pages/creative-lab.html`;
    }

    // Populate Heritage List
    if (heritageListEl && province.heritage) {
      heritageListEl.innerHTML = "";
      province.heritage.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-brass-400/50 p-5 rounded-2xl transition-all duration-200 flex flex-col justify-between group shadow-sm hover:-translate-y-1";
        card.innerHTML = `
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-terracotta-500/15 text-terracotta-300 border border-terracotta-500/25">
                ${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.category) : item.category}
              </span>
              <span class="text-[10px] text-surface/40 font-mono">#0${idx + 1}</span>
            </div>
            <h4 class="font-display text-lg font-medium text-surface group-hover:text-brass-200 transition-colors leading-snug mb-2">${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.name) : item.name}</h4>
          </div>
          <p class="text-xs text-surface/75 leading-relaxed font-light mt-2 border-t border-white/[0.06] pt-2.5">${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.desc) : item.desc}</p>
        `;
        heritageListEl.appendChild(card);
      });
    }

    // Reset to Tab 1
    this.switchTab("tab-heritage");

    // Scroll back to top
    if (this.modalOverlay) this.modalOverlay.scrollTop = 0;
    window.scrollTo(0, 0);

    this.isOpen = true;
    this.modalOverlay.classList.add("active");
    this.modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("province-modal-open", "modal-open");
    document.body.style.overflow = "hidden";

    // Hide navbar and mobile drawer
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.classList.add("navbar-hidden");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (mobileDrawer) {
      mobileDrawer.classList.add("opacity-0", "pointer-events-none");
    }
  },

  closePanel: function (resetMap = true) {
    if (!this.modalOverlay || !this.isOpen) return;

    this.isOpen = false;
    this.modalOverlay.classList.remove("active");
    this.modalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("province-modal-open", "modal-open");
    document.body.style.overflow = "";

    // Restore navbar
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.classList.remove("navbar-hidden");

    if (resetMap && window.WARISARA_HERO_MAP) {
      setTimeout(() => {
        window.WARISARA_HERO_MAP.resetView();
      }, 100);
    }
  }
};
