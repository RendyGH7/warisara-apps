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
  currentProvince: null,
  currentMaker: null,
  currentHeroView: "landmark",
  currentFactIndex: 0,
  wariTimer: null,
  btnToggleLandmark: null,
  btnToggleMaker: null,

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

  getIllustrationForProvince: function (province) {
    if (!province) return "assets/images/hero/bg-hero-batik-hd.jpg";
    if (province.tourism && (province.tourism.photo || province.tourism.image)) {
      let p = province.tourism.photo || province.tourism.image;
      if (p.startsWith("../")) p = p.substring(3);
      return p;
    }
    if (province.id) {
      return "assets/images/provinces/" + province.id + "-cover.jpg";
    }
    return "assets/images/hero/bg-hero-batik-hd.jpg";
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
    this.btnToggleLandmark = document.getElementById("modal-toggle-view-landmark");
    this.btnToggleMaker = document.getElementById("modal-toggle-view-maker");

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
        this.showToast("Gamelan Gong Berbunyi — Merayakan Budaya Nusantara");
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

    if (this.btnToggleLandmark) {
      this.btnToggleLandmark.addEventListener("click", () => this.switchHeroView("landmark"));
    }
    if (this.btnToggleMaker) {
      this.btnToggleMaker.addEventListener("click", () => this.switchHeroView("maker"));
    }

    const btnPronounce = document.getElementById("modal-btn-pronounce-greeting");
    if (btnPronounce) {
      btnPronounce.addEventListener("click", () => this.pronounceGreeting());
    }

    const btnStamp = document.getElementById("modal-btn-stamp");
    if (btnStamp) {
      btnStamp.addEventListener("click", () => this.togglePassportStamp());
    }

    const dnaCardWeapon = document.getElementById("modal-dna-card-weapon");
    if (dnaCardWeapon) {
      dnaCardWeapon.addEventListener("click", () => this.showDnaDetail("weapon"));
    }
    const dnaCardCulinary = document.getElementById("modal-dna-card-culinary");
    if (dnaCardCulinary) {
      dnaCardCulinary.addEventListener("click", () => this.showDnaDetail("culinary"));
    }
    const dnaCardTourism = document.getElementById("modal-dna-card-tourism");
    if (dnaCardTourism) {
      dnaCardTourism.addEventListener("click", () => this.showDnaDetail("tourism"));
    }
    const dnaCardLanguage = document.getElementById("modal-dna-card-language");
    if (dnaCardLanguage) {
      dnaCardLanguage.addEventListener("click", () => this.showDnaDetail("language"));
    }

    const tabBtns = document.querySelectorAll(".province-tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabTarget = btn.getAttribute("data-tab");
        this.switchTab(tabTarget);
      });
    });

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

  switchHeroView: function (mode) {
    this.currentHeroView = mode;
    const btnLandmark = document.getElementById("modal-toggle-view-landmark");
    const btnMaker = document.getElementById("modal-toggle-view-maker");
    const illustrationImg = document.getElementById("modal-province-illustration");
    const tagIcon = document.getElementById("modal-illustration-tag-icon");
    const tagText = document.getElementById("modal-illustration-tag-text");
    const categoryEl = document.getElementById("modal-illustration-category");
    const captionEl = document.getElementById("modal-illustration-caption");
    const subtextEl = document.getElementById("modal-illustration-subtext");

    const province = this.currentProvince;
    const maker = this.currentMaker;
    if (!province) return;

    if (mode === "maker") {
      if (btnMaker) {
        btnMaker.className = "px-2.5 py-1 rounded-full bg-brass-400 text-ink font-bold text-[10.5px] transition-all flex items-center gap-1 shadow-sm cursor-pointer";
      }
      if (btnLandmark) {
        btnLandmark.className = "px-2.5 py-1 rounded-full text-surface/80 hover:text-white font-medium text-[10.5px] transition-all flex items-center gap-1 cursor-pointer";
      }
      if (illustrationImg) {
        illustrationImg.src = `assets/images/Pelestari/${province.id}.jpg`;
        illustrationImg.alt = maker ? `Foto Maestro ${maker.name}` : `Foto Maestro Pelestari`;
      }
      if (tagIcon) tagIcon.textContent = "person";
      if (tagText) tagText.textContent = "Sosok Penjaga Tradisi";
      if (categoryEl) categoryEl.textContent = "Maestro Pelestari Kebudayaan";
      if (captionEl) captionEl.textContent = maker ? maker.name : "Penjaga Tradisi Nusantara";
      if (subtextEl) {
        subtextEl.textContent = maker ? `${maker.role} • ${maker.experience || 'Pelestari Aktif'}` : `Mendedikasikan hidup menjaga tradisi leluhur di ${province.name}.`;
      }
    } else {
      if (btnLandmark) {
        btnLandmark.className = "px-2.5 py-1 rounded-full bg-brass-400 text-ink font-bold text-[10.5px] transition-all flex items-center gap-1 shadow-sm cursor-pointer";
      }
      if (btnMaker) {
        btnMaker.className = "px-2.5 py-1 rounded-full text-surface/80 hover:text-white font-medium text-[10.5px] transition-all flex items-center gap-1 cursor-pointer";
      }
      const illusUrl = this.getIllustrationForProvince(province);
      if (illustrationImg) {
        illustrationImg.src = illusUrl;
        illustrationImg.alt = `Ilustrasi Pusaka ${province.name}`;
      }
      if (tagIcon) tagIcon.textContent = "landscape";
      if (tagText) tagText.textContent = "Pusaka & Alam Nusantara";
      if (categoryEl) categoryEl.textContent = "Mahakarya Ikonik Wilayah";
      if (captionEl) {
        captionEl.textContent = province.craftHighlight ? province.craftHighlight.split("motif")[0].trim() : `Pusaka Budaya ${province.name}`;
      }
      if (subtextEl) {
        subtextEl.textContent = province.craftHighlight ? `Karya kriya otentik bernilai sakral dari ${province.name}.` : "Mahakarya luhur bangsa Indonesia yang dirawat lestari.";
      }
    }
  },

  interactWithWari: function () {
    if (!this.wariSprite || !this.currentProvinceId) return;

    this.wariSprite.src = "assets/images/mascot/wari-happy-clean.png";
    this.wariSprite.classList.add("modal-wari-bounce");

    this.playTraditionalSound("chime");

    const facts = this.getTriviaForProvince(this.currentProvinceId);
    this.currentFactIndex = (this.currentFactIndex + 1) % facts.length;
    if (this.wariSpeech) {
      this.wariSpeech.textContent = `"${facts[this.currentFactIndex]}"`;
    }

    if (this.wariTimer) clearTimeout(this.wariTimer);
    this.wariTimer = setTimeout(() => {
      if (this.wariSprite) {
        this.wariSprite.src = "assets/images/mascot/wari-idle-clean.png";
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

  pronounceGreeting: function () {
    if (!this.currentProvince) return;
    const prov = this.currentProvince;
    const greetingText = (this.greetings && this.greetings[prov.id]) || 
                         (prov.language && prov.language.greeting) || 
                         "Salam Budaya!";
    const meaning = (prov.language && prov.language.meaning) ? prov.language.meaning : "";

    this.playTraditionalSound("chime");

    const soundwave = document.getElementById("greeting-soundwave");
    if (soundwave) {
      soundwave.classList.remove("hidden");
      soundwave.classList.add("inline-flex");
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = greetingText.replace(/["'!]/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "id-ID";
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      utterance.onend = () => {
        if (soundwave) {
          soundwave.classList.remove("inline-flex");
          soundwave.classList.add("hidden");
        }
      };
      utterance.onerror = () => {
        if (soundwave) {
          soundwave.classList.remove("inline-flex");
          soundwave.classList.add("hidden");
        }
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        if (soundwave) {
          soundwave.classList.remove("inline-flex");
          soundwave.classList.add("hidden");
        }
      }, 1600);
    }

    const toastMsg = meaning
      ? `"${greetingText}" — Makna: ${meaning}`
      : `Sapaan Adat ${prov.name}: "${greetingText}"`;
    this.showToast(toastMsg);
  },

  getPassportStamps: function () {
    try {
      const raw = localStorage.getItem("warisara_passport_stamps");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  togglePassportStamp: function () {
    if (!this.currentProvinceId) return;
    const provId = this.currentProvinceId;
    const prov = this.currentProvince || (window.PROVINCES_DATA && window.PROVINCES_DATA[provId]);
    const provName = prov ? prov.name : "Provinsi";

    let stamps = this.getPassportStamps();
    const alreadyStamped = stamps.includes(provId);

    if (!alreadyStamped) {
      stamps.push(provId);
      try {
        localStorage.setItem("warisara_passport_stamps", JSON.stringify(stamps));
      } catch (e) {}

      this.playTraditionalSound("gong");
      this.updatePassportUI(true, stamps.length);

      const badge = document.getElementById("modal-stamp-badge");
      if (badge) {
        badge.classList.remove("stamp-slam-anim");
        void badge.offsetWidth;
        badge.classList.add("stamp-slam-anim");
      }

      this.showToast(`Cap Paspor Budaya ${provName} Berhasil Dikoleksi! (${stamps.length}/38 Wilayah)`);
    } else {
      this.playTraditionalSound("chime");
      this.showToast(`${provName} Sudah Terkoleksi di Paspor! (${stamps.length}/38 Terjelajahi)`);
    }
  },

  updatePassportUI: function (isStamped, totalCount) {
    const badge = document.getElementById("modal-stamp-badge");
    const badgeIcon = document.getElementById("modal-stamp-badge-icon");
    const statusEl = document.getElementById("modal-stamp-status");
    const countEl = document.getElementById("modal-stamp-count");
    const btn = document.getElementById("modal-btn-stamp");
    const btnText = document.getElementById("modal-btn-stamp-text");

    if (countEl) countEl.textContent = `${totalCount}/38`;

    if (isStamped) {
      if (badge) {
        badge.className = "w-8 h-8 rounded-full bg-brass-400/25 border border-brass-400/60 shadow-[0_0_12px_rgba(201,165,103,0.35)] flex items-center justify-center shrink-0 transition-transform duration-300";
      }
      if (badgeIcon) {
        badgeIcon.textContent = "verified";
        badgeIcon.className = "material-symbols-outlined text-base text-brass-300";
      }
      if (statusEl) {
        statusEl.textContent = "Terkoleksi di Paspor Budaya";
        statusEl.className = "text-[11px] text-brass-200/95 font-medium truncate";
      }
      if (btn) {
        btn.className = "shrink-0 px-3 py-1.5 rounded-full bg-brass-500/20 hover:bg-brass-500/30 border border-brass-400/50 text-brass-300 font-semibold text-xs transition-all duration-200 shadow-sm flex items-center gap-1.5 cursor-pointer";
      }
      if (btnText) btnText.textContent = "Terkoleksi";
    } else {
      if (badge) {
        badge.className = "w-8 h-8 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-300";
      }
      if (badgeIcon) {
        badgeIcon.textContent = "approval";
        badgeIcon.className = "material-symbols-outlined text-base text-stone-400";
      }
      if (statusEl) {
        statusEl.textContent = "Belum dicap di paspor penjelajahmu";
        statusEl.className = "text-[11px] text-stone-300/80 font-light truncate";
      }
      if (btn) {
        btn.className = "shrink-0 px-3 py-1.5 rounded-full bg-brass-400 hover:bg-brass-300 text-stone-950 font-bold text-xs transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-1.5 cursor-pointer";
      }
      if (btnText) btnText.textContent = "Cap Paspor";
    }
  },

  showDnaDetail: function (type) {
    if (!this.currentProvince) return;
    const prov = this.currentProvince;
    this.playTraditionalSound("chime");

    let title = "";
    let desc = "";

    if (type === "weapon" && prov.weapon) {
      title = `Pusaka: ${prov.weapon.name}`;
      desc = prov.weapon.desc || "Pusaka bernilai sakral dan identitas pertahanan kehormatan masyarakat.";
    } else if (type === "culinary" && prov.culinary) {
      title = `Kuliner Khas: ${prov.culinary.name}`;
      desc = prov.culinary.desc || "Cita rasa kuliner legendaris yang kaya rempah dan diwariskan turun-temurun.";
    } else if (type === "tourism" && prov.tourism) {
      title = `Bentang Alam: ${prov.tourism.name}`;
      desc = prov.tourism.desc || "Keajaiban lanskap alam dan cagar budaya yang dilindungi kelestariannya.";
    } else if (type === "language" && prov.language) {
      title = `Tutur: ${prov.language.name}`;
      const greeting = prov.language.greeting ? `Sapaan: "${prov.language.greeting}" (${prov.language.meaning || ''})` : "";
      const phrases = prov.language.commonPhrases && prov.language.commonPhrases.length > 0 
        ? prov.language.commonPhrases.map(p => `"${p.phrase}" (${p.meaning})`).join(" • ")
        : "";
      desc = [greeting, phrases].filter(Boolean).join(" | ") || "Bahasa daerah perekat tali silaturahmi.";
    }

    if (title && desc) {
      this.showToast(`${title} — ${desc}`);
    }
  },

  handleShare: function () {
    if (!this.currentProvinceId || !window.PROVINCES_DATA) return;
    const prov = window.PROVINCES_DATA[this.currentProvinceId];
    const shareText = `Jelajahi keindahan budaya ${prov.name} di WARISARA — ${prov.shortStatement}`;
    const shareUrl = `${window.location.origin}${window.location.pathname}?province=${encodeURIComponent(prov.id)}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        this.showToast(`Tautan Budaya ${prov.name} disalin ke clipboard!`);
      }).catch(() => {
        this.showToast(`${prov.name} siap dibagikan!`);
      });
    } else {
      this.showToast(`Berbagi kebudayaan ${prov.name}!`);
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

    let maker = null;
    if (window.MAKERS_DATA && Array.isArray(window.MAKERS_DATA)) {
      maker = window.MAKERS_DATA.find((m) => m.provinceId === province.id);
    }
    if (!maker && province.maker) {
      maker = province.maker;
    }
    this.currentProvince = province;
    this.currentMaker = maker;

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

    if (nameEl) nameEl.textContent = province.name;
    if (topBarProvName) topBarProvName.textContent = province.name;
    if (labProvName) labProvName.textContent = province.name;

    const islandLabel = `PULAU ${(province.island || "").toUpperCase()}`;
    if (islandTextEl) islandTextEl.textContent = islandLabel;
    if (topBarIsland) topBarIsland.textContent = islandLabel;
    if (quickStatIsland) {
      quickStatIsland.textContent = province.craftHighlight ? province.craftHighlight.split("motif")[0].trim() : (province.island ? "Pusaka " + province.island : "Kriya Nusantara");
    }

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

    // Populate 4 Cultural DNA Pillars
    const dnaWeapon = document.getElementById("modal-dna-weapon");
    const dnaWeaponDesc = document.getElementById("modal-dna-weapon-desc");
    const dnaCulinary = document.getElementById("modal-dna-culinary");
    const dnaCulinaryDesc = document.getElementById("modal-dna-culinary-desc");
    const dnaTourism = document.getElementById("modal-dna-tourism");
    const dnaTourismDesc = document.getElementById("modal-dna-tourism-desc");
    const dnaLanguage = document.getElementById("modal-dna-language");
    const dnaLanguageDesc = document.getElementById("modal-dna-language-desc");

    if (dnaWeapon) dnaWeapon.textContent = (province.weapon && province.weapon.name) ? province.weapon.name : "Pusaka Adat Daerah";
    if (dnaWeaponDesc) dnaWeaponDesc.textContent = (province.weapon && province.weapon.desc) ? province.weapon.desc : "Pusaka sakral dan identitas leluhur";

    if (dnaCulinary) dnaCulinary.textContent = (province.culinary && province.culinary.name) ? province.culinary.name : "Kuliner Khas Daerah";
    if (dnaCulinaryDesc) dnaCulinaryDesc.textContent = (province.culinary && province.culinary.desc) ? province.culinary.desc : "Warisan gastronomi kaya rempah";

    if (dnaTourism) dnaTourism.textContent = (province.tourism && province.tourism.name) ? province.tourism.name : "Bentang Alam Daerah";
    if (dnaTourismDesc) dnaTourismDesc.textContent = (province.tourism && province.tourism.desc) ? province.tourism.desc : "Keindahan alam & cagar budaya";

    if (dnaLanguage) dnaLanguage.textContent = (province.language && province.language.name) ? province.language.name : "Bahasa & Tutur Daerah";
    if (dnaLanguageDesc) {
      if (province.language && province.language.greeting) {
        dnaLanguageDesc.textContent = `"${province.language.greeting}"${province.language.meaning ? ' (' + province.language.meaning + ')' : ''}`;
      } else {
        dnaLanguageDesc.textContent = "Tutur bijak kearifan leluhur";
      }
    }

    // Update Paspor Budaya Stamp Collector UI
    const stamps = this.getPassportStamps();
    const isStamped = stamps.includes(province.id);
    this.updatePassportUI(isStamped, stamps.length);

    const spotlightAvatar = document.getElementById("modal-maker-avatar");
    const spotlightExp = document.getElementById("modal-maker-experience");
    const spotlightName = document.getElementById("modal-maker-spotlight-name");
    const spotlightRole = document.getElementById("modal-maker-spotlight-role");
    const spotlightQuote = document.getElementById("modal-maker-spotlight-quote");
    const spotlightLink = document.getElementById("modal-maker-link");

    if (spotlightAvatar) {
      spotlightAvatar.src = `assets/images/Pelestari/${province.id}.jpg`;
      spotlightAvatar.alt = maker ? `Foto ${maker.name}` : "Foto Pelestari";
    }
    if (spotlightExp) {
      spotlightExp.textContent = maker && maker.experience ? maker.experience : "Pelestari Generasi Aktif";
    }
    if (spotlightName) {
      spotlightName.textContent = maker ? maker.name : (province.maker ? province.maker.name : "Penjaga Tradisi");
    }
    if (spotlightRole) {
      const locationText = maker && maker.location ? maker.location.split(",")[0].trim() : province.capital || province.name;
      const roleText = maker ? `${maker.role} • ${locationText}` : (province.craftHighlight || "Kriya Nusantara");
      spotlightRole.textContent = roleText;
    }
    if (spotlightQuote) {
      const quoteText = maker && maker.quote ? maker.quote : (province.shortStatement || "Merawat pusaka leluhur dengan ketulusan jiwa.");
      spotlightQuote.textContent = `"${quoteText}"`;
    }
    if (spotlightLink) {
      spotlightLink.href = `pages/jelajahi.html?province=${encodeURIComponent(province.id)}&view=pelestari`;
    }

    this.switchHeroView("landmark");

    const facts = this.getTriviaForProvince(province.id);
    if (this.wariSpeech) {
      this.wariSpeech.textContent = `"${facts[0]}"`;
    }
    if (this.wariSprite) {
      this.wariSprite.src = "assets/images/mascot/wari-idle-clean.png";
      this.wariSprite.classList.remove("modal-wari-bounce");
    }

    const tabMakerPhoto = document.getElementById("modal-tab-maker-photo");
    const tabMakerExpText = document.getElementById("modal-tab-maker-exp-text");
    const tabMakerName = document.getElementById("modal-maker-name");
    const tabMakerRole = document.getElementById("modal-maker-role");
    const tabMakerQuote = document.getElementById("modal-maker-quote");
    const tabMakerStory = document.getElementById("modal-tab-maker-story");
    const tabMakerProfileBtn = document.getElementById("modal-tab-maker-profile-btn");

    if (tabMakerPhoto) {
      tabMakerPhoto.src = `assets/images/Pelestari/${province.id}.jpg`;
      tabMakerPhoto.alt = maker ? `Foto Maestro ${maker.name}` : "Foto Maestro Pelestari";
    }
    if (tabMakerExpText) {
      tabMakerExpText.textContent = maker && maker.experience ? maker.experience : "Pelestari Generasi Aktif";
    }
    if (tabMakerName) {
      tabMakerName.textContent = maker ? maker.name : (province.maker ? province.maker.name : "Sosok Penjaga Tradisi");
    }
    if (tabMakerRole) {
      tabMakerRole.textContent = maker ? `${maker.role} • ${maker.location || province.name}` : (province.craftHighlight || "Maestro Kebudayaan");
    }
    if (tabMakerQuote) {
      tabMakerQuote.textContent = maker && maker.quote ? `"${maker.quote}"` : `"${province.shortStatement || ''}"`;
    }
    if (tabMakerStory) {
      tabMakerStory.textContent = maker && maker.story ? maker.story : (province.shortDescription || "Mendedikasikan hidup merawat pusaka luhur leluhur demi masa depan kebudayaan Nusantara.");
    }
    if (tabMakerProfileBtn) {
      tabMakerProfileBtn.href = `pages/jelajahi.html?province=${encodeURIComponent(province.id)}&view=pelestari`;
    }

    if (this.exploreBtn && province.id) {
      this.exploreBtn.href = `pages/jelajahi.html?province=${encodeURIComponent(province.id)}`;
      const btnSpan = this.exploreBtn.querySelector("span:not(.material-symbols-outlined)");
      if (btnSpan) btnSpan.textContent = `Jelajahi Budaya`;
    }

    const bottomExploreBtn = document.getElementById("modal-bottom-explore-btn");
    if (bottomExploreBtn && province.id) {
      bottomExploreBtn.href = `pages/jelajahi.html?province=${encodeURIComponent(province.id)}`;
      const bottomBtnSpan = bottomExploreBtn.querySelector("span:not(.material-symbols-outlined)");
      if (bottomBtnSpan) bottomBtnSpan.textContent = `Jelajahi Koleksi`;
    }

    const directLabBtn = document.getElementById("modal-btn-direct-lab");
    if (directLabBtn) {
      directLabBtn.href = `pages/creative-lab.html`;
    }

    if (heritageListEl && province.heritage) {
      heritageListEl.innerHTML = "";
      province.heritage.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "bg-[#16120E]/90 hover:bg-[#1E1712] border border-white/10 hover:border-brass-400/50 p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-0.5";
        card.innerHTML = `
          <div>
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-brass-400/10 text-brass-300 border border-brass-400/20 mb-3">
              ${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.category) : item.category}
            </span>
            <h4 class="font-display text-base sm:text-lg font-medium text-white group-hover:text-brass-200 transition-colors leading-snug mb-2">${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.name) : item.name}</h4>
          </div>
          <p class="text-xs text-stone-300/80 leading-relaxed font-light mt-2 line-clamp-3">${window.WARISARA_UTILS ? window.WARISARA_UTILS.escapeHtml(item.desc) : item.desc}</p>
        `;
        heritageListEl.appendChild(card);
      });
    }

    this.switchTab("tab-heritage");

    if (this.modalOverlay) this.modalOverlay.scrollTop = 0;
    window.scrollTo(0, 0);

    this.isOpen = true;
    const container = this.modalElement || this.modalOverlay.querySelector(".modal-container, .relative") || this.modalOverlay.firstElementChild;
    if (window.WARISARA_POPUP && window.WARISARA_POPUP.open) {
      window.WARISARA_POPUP.open(this.modalOverlay, container);
    } else {
      this.modalOverlay.classList.add("active");
    }
    this.modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("province-modal-open", "modal-open");
    document.body.style.overflow = "hidden";

    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.classList.add("navbar-hidden");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (mobileDrawer) {
      mobileDrawer.classList.add("opacity-0", "pointer-events-none");
    }

    if (window.WARISARA_MASCOT && typeof window.WARISARA_MASCOT.closeChat === "function") {
      window.WARISARA_MASCOT.closeChat();
    }
  },

  closePanel: function (resetMap = true) {
    if (!this.modalOverlay || !this.isOpen) return;

    this.isOpen = false;
    this.modalOverlay.setAttribute("aria-hidden", "true");

    const container = this.modalElement || this.modalOverlay.querySelector(".modal-container, .relative") || this.modalOverlay.firstElementChild;
    const finish = () => {
      document.body.classList.remove("province-modal-open", "modal-open");
      document.body.style.overflow = "";

      const navbar = document.getElementById("main-navbar");
      if (navbar) navbar.classList.remove("navbar-hidden");

      if (resetMap && window.WARISARA_HERO_MAP) {
        setTimeout(() => {
          window.WARISARA_HERO_MAP.resetView();
        }, 100);
      }
    };

    if (window.WARISARA_POPUP && window.WARISARA_POPUP.close) {
      window.WARISARA_POPUP.close(this.modalOverlay, container, finish);
    } else {
      this.modalOverlay.classList.remove("active");
      finish();
    }
  }
};
