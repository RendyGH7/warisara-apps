/**
 * WARISARA - LOGIKA INTERAKTIF 38 PROVINSI & PASPOR PENJELAJAH NUSANTARA
 * Mengatur interaktivitas: Ensiklopedia Mendalam, 3-5+ Foto Realistis, Kuis Kilat,
 * Berita Hot, Audio Sapaan, Kompas Budaya Acak, dan Paspor Digital.
 */

(function () {
  'use strict';

  // --- PATH NORMALIZER FOR LOCAL & REMOTE ASSETS ---
  function fixImgPath(url) {
    if (!url) return 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    var inPages = window.location.pathname.includes('/pages/');
    if (inPages) {
      if (url.startsWith('../')) return url;
      if (url.startsWith('assets/')) return '../' + url;
      if (url.startsWith('./assets/')) return '../' + url.substring(2);
      return '../' + url;
    } else {
      if (url.startsWith('../assets/')) return url.substring(3);
      return url;
    }
  }

  // --- AUDIO SYNTHESIZER (Web Audio API) ---
  var audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    try {
      var ctx = getAudioContext();
      if (!ctx) return;

      var now = ctx.currentTime;
      if (type === 'success') {
        // Chord kemenangan ceria (C5, E5, G5, C6)
        var freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach(function (f, idx) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + idx * 0.08);
          gain.gain.setValueAtTime(0.18, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.6);
        });
      } else if (type === 'stamp') {
        // Suara cap stempel mekanis mantap
        var oscStamp = ctx.createOscillator();
        var gainStamp = ctx.createGain();
        oscStamp.type = 'sine';
        oscStamp.frequency.setValueAtTime(140, now);
        oscStamp.frequency.exponentialRampToValueAtTime(45, now + 0.22);
        gainStamp.gain.setValueAtTime(0.4, now);
        gainStamp.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        oscStamp.connect(gainStamp);
        gainStamp.connect(ctx.destination);
        oscStamp.start(now);
        oscStamp.stop(now + 0.25);
      } else if (type === 'wrong') {
        // Suara boop lembut
        var oscW = ctx.createOscillator();
        var gainW = ctx.createGain();
        oscW.type = 'sawtooth';
        oscW.frequency.setValueAtTime(220, now);
        oscW.frequency.linearRampToValueAtTime(160, now + 0.25);
        gainW.gain.setValueAtTime(0.12, now);
        gainW.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        oscW.connect(gainW);
        gainW.connect(ctx.destination);
        oscW.start(now);
        oscW.stop(now + 0.28);
      } else if (type === 'tick') {
        // Tick jarum kompas
        var oscT = ctx.createOscillator();
        var gainT = ctx.createGain();
        oscT.type = 'triangle';
        oscT.frequency.setValueAtTime(800, now);
        gainT.gain.setValueAtTime(0.08, now);
        gainT.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        oscT.connect(gainT);
        gainT.connect(ctx.destination);
        oscT.start(now);
        oscT.stop(now + 0.04);
      }
    } catch (e) {
      // Audio fallback fail-safe
    }
  }

  // --- VOICE SYNTHESIZER ---
  function speakRegionalGreeting(greetingText) {
    playSound('success');
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var cleanText = greetingText.split('(')[0].trim();
      var utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  // --- CONFETTI GENERATOR ---
  function fireConfetti() {
    var canvas = document.getElementById('confetti-canvas-layer');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var particles = [];
    var colors = ['#C9A567', '#E6D3A7', '#DDA07C', '#2ECC71', '#3498DB', '#F1C40F'];
    for (var i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() * 200 - 100),
        y: canvas.height / 3 + (Math.random() * 100 - 50),
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    var startTime = performance.now();
    function animate(time) {
      var elapsed = time - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var allDone = true;

      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.rotation += p.rSpeed;
        p.opacity = Math.max(0, 1 - elapsed / 2200);

        if (p.opacity > 0) {
          allDone = false;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });

      if (!allDone) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(animate);
  }

  function getPassportKey() {
    try {
      var u = (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.getUser === 'function') 
        ? window.WARISARA_AUTH.getUser() 
        : null;
      if (!u) {
        var rawUser = localStorage.getItem('warisara_active_user');
        if (rawUser) u = JSON.parse(rawUser);
      }
      if (u && u.email) {
        return 'warisara_passport_' + u.email.toLowerCase().trim();
      }
    } catch (e) {}
    return 'warisara_explorer_passport';
  }

  function getPassportData() {
    try {
      var key = getPassportKey();
      var raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { stamped: [] };
  }

  function savePassportData(data) {
    try {
      var key = getPassportKey();
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  }

  function isProvinceStamped(provId) {
    var data = getPassportData();
    return data.stamped.indexOf(provId) !== -1;
  }

  function stampProvince(provId) {
    var data = getPassportData();
    if (data.stamped.indexOf(provId) === -1) {
      data.stamped.push(provId);
      savePassportData(data);
      playSound('stamp');
      fireConfetti();
      updatePassportUI();
      return true;
    }
    return false;
  }

  function getLevelTitle(count) {
    if (count >= 38) return { title: 'Adiraja Kebudayaan Nusantara 👑', badge: 'Tuntas 100%' };
    if (count >= 25) return { title: 'Mahapatih Nusantara 🥇', badge: 'Tingkat Mahir' };
    if (count >= 12) return { title: 'Pengelana Khatulistiwa 🥈', badge: 'Tingkat Menengah' };
    if (count >= 1) return { title: 'Pelancong Pemula 🥉', badge: 'Tingkat Awal' };
    return { title: 'Calon Penjelajah 🌿', badge: 'Belum Mulai' };
  }

  // --- STATE ---
  var currentIsland = 'all';
  var currentStatus = 'all';
  var currentSearchQuery = '';
  var currentSort = 'name';
  var activeProvinceId = null;
  var currentModalTab = 'overview';
  var activeGalleryIndex = 0;
  var activeGalleryList = [];

  // --- UI UPDATE FOR PASSPORT WIDGET ---
  function updatePassportUI() {
    var data = getPassportData();
    var count = data.stamped.length;
    var total = 38;
    var percent = Math.round((count / total) * 100);
    var level = getLevelTitle(count);

    var countEls = document.querySelectorAll('.passport-count-val');
    countEls.forEach(function (el) { el.textContent = count; });

    var percentEls = document.querySelectorAll('.passport-percent-val');
    percentEls.forEach(function (el) { el.textContent = percent + '%'; });

    var progressBars = document.querySelectorAll('.passport-progress-fill');
    progressBars.forEach(function (bar) { bar.style.width = percent + '%'; });

    var levelTitleEls = document.querySelectorAll('.passport-level-title');
    levelTitleEls.forEach(function (el) { el.textContent = level.title; });

    var levelBadgeEls = document.querySelectorAll('.passport-level-badge');
    levelBadgeEls.forEach(function (el) { el.textContent = level.badge; });
  }

  // --- PROVINCE RENDERING ---
  function renderProvincesGrid() {
    var gridEl = document.getElementById('provinces-grid');
    var emptyEl = document.getElementById('provinces-empty-state');
    var visibleCountEl = document.getElementById('visible-count');
    if (!gridEl || !window.PROVINCES_DATA) return;

    var provinces = Object.values(window.PROVINCES_DATA);

    // Filter
    var filtered = provinces.filter(function (prov) {
      // Filter Pulau
      var matchIsland = currentIsland === 'all' || prov.island.toLowerCase() === currentIsland.toLowerCase();

      // Filter Status Paspor
      var isStamped = isProvinceStamped(prov.id);
      var matchStatus = true;
      if (currentStatus === 'stamped') matchStatus = isStamped;
      if (currentStatus === 'unstamped') matchStatus = !isStamped;

      // Filter Search
      var q = currentSearchQuery.toLowerCase().trim();
      var matchQuery = !q ||
        prov.name.toLowerCase().indexOf(q) !== -1 ||
        prov.capital.toLowerCase().indexOf(q) !== -1 ||
        prov.island.toLowerCase().indexOf(q) !== -1 ||
        (prov.culinary && prov.culinary.name.toLowerCase().indexOf(q) !== -1) ||
        (prov.weapon && prov.weapon.name.toLowerCase().indexOf(q) !== -1) ||
        (prov.tourism && prov.tourism.name.toLowerCase().indexOf(q) !== -1) ||
        (prov.founders && prov.founders.toLowerCase().indexOf(q) !== -1) ||
        (prov.craftHighlight && prov.craftHighlight.toLowerCase().indexOf(q) !== -1);

      return matchIsland && matchStatus && matchQuery;
    });

    // Sort
    filtered.sort(function (a, b) {
      if (currentSort === 'name') return a.name.localeCompare(b.name, 'id');
      if (currentSort === 'year') return parseInt(a.established || 1945) - parseInt(b.established || 1945);
      if (currentSort === 'island') return a.island.localeCompare(b.island, 'id');
      return 0;
    });

    if (visibleCountEl) visibleCountEl.textContent = filtered.length;

    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyEl) emptyEl.classList.remove('hidden');
      return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');

    gridEl.innerHTML = filtered.map(function (prov) {
      var isStamped = isProvinceStamped(prov.id);
      var rawCover = (prov.tourism && (prov.tourism.photo || prov.tourism.image)) || (prov.gallery && prov.gallery[0] && prov.gallery[0].url) || 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80';
      var coverPhoto = fixImgPath(rawCover);
      var culinaryName = prov.culinary ? prov.culinary.name : 'Kuliner Khas';
      var weaponName = prov.weapon ? prov.weapon.name : 'Senjata Pusaka';
      var tourismName = prov.tourism ? prov.tourism.name : 'Wisata Unggulan';

      return `
        <article class="province-card-ultimate group cursor-pointer" data-prov-id="${prov.id}">
          <div class="province-card-cover">
            <img src="${coverPhoto}" alt="${prov.name}" loading="lazy" />
            <div class="province-card-cover-overlay"></div>
            
            <div class="absolute top-3 left-3 z-10 flex items-center gap-1.5">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-brass-300 border border-brass-400/30 backdrop-blur-md">
                ${prov.island}
              </span>
            </div>

            <div class="stamp-mini-badge ${isStamped ? 'stamped' : 'unstamped'}">
              <span class="material-symbols-outlined text-[12px]">${isStamped ? 'verified' : 'lock'}</span>
              <span>${isStamped ? 'Terjelajahi' : 'Belum Dicap'}</span>
            </div>

            <div class="absolute bottom-3 left-4 right-4 z-10">
              <span class="text-[10px] uppercase font-mono tracking-wider text-surface/60">Ibu Kota: ${prov.capital}</span>
              <h3 class="font-display text-2xl font-light text-surface group-hover:text-brass-300 transition-colors drop-shadow">
                ${prov.name}
              </h3>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <blockquote class="text-xs text-surface/75 font-light italic leading-relaxed line-clamp-2 border-l-2 border-brass-400/50 pl-3 py-0.5">
              "${prov.shortStatement}"
            </blockquote>

            <!-- Mini Highlight Badges: Kuliner, Senjata, Wisata -->
            <div class="space-y-2 pt-3 border-t border-white/10 text-xs">
              <div class="flex items-center gap-2 text-surface/85">
                <span class="w-6 h-6 rounded-lg bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-300 flex items-center justify-center text-xs flex-shrink-0">🍲</span>
                <span class="text-surface/50 text-[11px] font-mono">Kuliner:</span>
                <span class="truncate font-medium text-brass-200 text-xs">${culinaryName}</span>
              </div>
              <div class="flex items-center gap-2 text-surface/85">
                <span class="w-6 h-6 rounded-lg bg-brass-500/15 border border-brass-500/30 text-brass-300 flex items-center justify-center text-xs flex-shrink-0">🗡️</span>
                <span class="text-surface/50 text-[11px] font-mono">Senjata:</span>
                <span class="truncate font-medium text-brass-200 text-xs">${weaponName}</span>
              </div>
              <div class="flex items-center gap-2 text-surface/85">
                <span class="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-center text-xs flex-shrink-0">🏞️</span>
                <span class="text-surface/50 text-[11px] font-mono">Wisata:</span>
                <span class="truncate font-medium text-brass-200 text-xs">${tourismName}</span>
              </div>
            </div>

            <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-brass-400 font-bold uppercase tracking-wider group-hover:text-brass-300 transition-colors">
              <span>Buka Ensiklopedia &amp; Kuis</span>
              <span class="material-symbols-outlined text-sm group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click triggers to open modal
    gridEl.querySelectorAll('.province-card-ultimate').forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-prov-id');
        openProvinceModal(id);
      });
    });
  }

  // --- PROVINCE DETAIL MODAL (HIGH-END PAVILION) ---
  function openProvinceModal(provId) {
    var prov = window.PROVINCES_DATA ? window.PROVINCES_DATA[provId] : null;
    if (!prov) return;
    activeProvinceId = provId;

    var modalOverlay = document.getElementById('province-modal-overlay');
    if (!modalOverlay) return;

    // Setup Available Illustrations for Province
    var heroBanner = document.getElementById('modal-hero-banner');
    var rawModalCover = (prov.tourism && (prov.tourism.photo || prov.tourism.image)) || (prov.gallery && prov.gallery[0] && prov.gallery[0].url);
    var coverImg = fixImgPath(rawModalCover);

    var artItems = {
      landmark: {
        url: coverImg,
        title: prov.name,
        caption: (prov.tourism ? prov.tourism.name : 'Landmark & Lanskap Utama')
      },
      culinary: {
        url: fixImgPath((prov.culinary && (prov.culinary.photo || prov.culinary.image)) || ''),
        title: prov.culinary ? prov.culinary.name : 'Kuliner Khas',
        caption: 'Kuliner Autentik: ' + (prov.culinary ? prov.culinary.name : 'Khas')
      },
      weapon: {
        url: fixImgPath((prov.weapon && (prov.weapon.photo || prov.weapon.image)) || ''),
        title: prov.weapon ? prov.weapon.name : 'Senjata Pusaka',
        caption: 'Pusaka Adat: ' + (prov.weapon ? prov.weapon.name : 'Senjata')
      },
      tourism: {
        url: fixImgPath((prov.tourism && (prov.tourism.photo || prov.tourism.image)) || ''),
        title: prov.tourism ? prov.tourism.name : 'Destinasi Wisata',
        caption: 'Wisata: ' + (prov.tourism ? prov.tourism.name : 'Ikonik')
      },
      gallery: {
        url: fixImgPath((prov.gallery && prov.gallery[0] && prov.gallery[0].url) || coverImg),
        title: (prov.gallery && prov.gallery[0] && prov.gallery[0].title) || 'Galeri Dokumentasi',
        caption: 'Dokumentasi Warisan Budaya'
      }
    };

    var currentHeroArt = 'landmark';

    function setHeroIllustration(artKey) {
      currentHeroArt = artKey;
      var art = artItems[artKey];
      if (!art || !art.url) return;

      if (heroBanner) {
        heroBanner.style.backgroundImage = 'linear-gradient(180deg, rgba(12, 10, 8, 0.15) 0%, rgba(18, 15, 13, 0.8) 100%), url(' + art.url + ')';
      }

      var indicator = document.getElementById('illustration-caption-indicator');
      if (indicator) indicator.textContent = art.caption;

      var chips = document.querySelectorAll('.art-switcher-chip');
      chips.forEach(function (chip) {
        if (chip.getAttribute('data-art') === artKey) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });
    }

    // Initialize Default Illustration (Landmark)
    setHeroIllustration('landmark');

    // Wire Quick Switcher Chips
    var chips = document.querySelectorAll('.art-switcher-chip');
    chips.forEach(function (chip) {
      chip.onclick = function (e) {
        e.stopPropagation();
        var key = chip.getAttribute('data-art');
        setHeroIllustration(key);
      };
    });

    // Modal Hero Photo Zoom (Zooms currently displayed art)
    var heroZoomBtn = document.getElementById('modal-hero-zoom-btn');
    if (heroZoomBtn) {
      heroZoomBtn.onclick = function (e) {
        e.stopPropagation();
        var art = artItems[currentHeroArt] || artItems.landmark;
        openCustomLightbox(art.url, art.title, art.caption);
      };
    }

    var nameEl = document.getElementById('modal-province-name');
    if (nameEl) nameEl.textContent = prov.name;

    var islandEl = document.getElementById('modal-province-island');
    if (islandEl) islandEl.textContent = 'PULAU ' + prov.island.toUpperCase();

    var capitalEl = document.getElementById('modal-province-capital');
    if (capitalEl) capitalEl.textContent = prov.capital;

    var estEl = document.getElementById('modal-province-established');
    if (estEl) estEl.textContent = prov.established || '1945';

    var foundersEl = document.getElementById('modal-province-founders');
    if (foundersEl) foundersEl.textContent = prov.founders || 'Pahlawan & Tokoh Adat Daerah';

    var statementEl = document.getElementById('modal-province-statement');
    if (statementEl) statementEl.textContent = `"${prov.shortStatement}"`;

    // Stamp Status Badge
    updateModalStampBadge(provId);

    // Sapaan Audio Trigger
    var voiceBtn = document.getElementById('modal-voice-greeting-btn');
    var greetingText = prov.language ? `${prov.language.greeting} (${prov.language.meaning})` : 'Selamat Datang!';
    if (voiceBtn) {
      voiceBtn.onclick = function (e) {
        e.stopPropagation();
        speakRegionalGreeting(prov.language ? prov.language.greeting : 'Halo Selamat Datang');
      };
    }

    // Helper: Format Sejarah Ringkas & Menarik (Bite-Sized Timeline Points + Accordion)
    function formatBiteSizedHistory(prov) {
      var raw = (prov.historyBrief || prov.shortDescription || '').trim();
      if (!raw) return '';

      var sentences = raw.split(/(?<=[.?!])\s+/).filter(function (s) { return s.trim().length > 0; });
      var bullets = [];

      if (sentences.length >= 2) {
        bullets.push({
          tag: 'Akar Peradaban',
          icon: 'account_balance',
          color: 'brass',
          text: sentences[0]
        });
        bullets.push({
          tag: 'Tonggak Perjuangan',
          icon: 'military_tech',
          color: 'terracotta',
          text: sentences[1]
        });
        if (sentences.length >= 3) {
          bullets.push({
            tag: 'Era Kontemporer',
            icon: 'stars',
            color: 'forest',
            text: sentences.slice(2).join(' ')
          });
        }
      } else {
        bullets.push({
          tag: 'Intisari Sejarah',
          icon: 'history_edu',
          color: 'brass',
          text: raw
        });
      }

      return `
        <div class="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/10 space-y-3.5">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-brass-400"></span>
              <h4 class="text-[11px] font-bold uppercase tracking-wider text-brass-300 font-mono">
                Intisari Kilas Sejarah
              </h4>
            </div>
            <span class="text-[10px] text-surface/50 font-mono bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">Ringkas &amp; Esensial</span>
          </div>

          <div class="grid grid-cols-1 gap-2.5">
            ${bullets.map(function (b) {
              var iconColor = b.color === 'brass' ? 'text-brass-400' : (b.color === 'terracotta' ? 'text-terracotta-400' : 'text-emerald-400');
              var badgeBg = b.color === 'brass' ? 'bg-brass-400/15 border-brass-400/30 text-brass-300' : (b.color === 'terracotta' ? 'bg-terracotta-500/15 border-terracotta-500/30 text-terracotta-300' : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300');
              return `
                <div class="history-milestone-item p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-3">
                  <span class="material-symbols-outlined text-lg ${iconColor} flex-shrink-0 mt-0.5">${b.icon}</span>
                  <div class="space-y-1 min-w-0 flex-1">
                    <span class="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${badgeBg} font-mono">
                      ${b.tag}
                    </span>
                    <p class="text-xs text-surface/90 font-light leading-relaxed">
                      ${b.text}
                    </p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Accordion Baca Narasi Lengkap -->
          <div class="pt-1 border-t border-white/10 flex flex-col">
            <button id="toggle-history-narrative-btn" class="history-expand-btn self-start inline-flex items-center gap-1.5 text-xs text-brass-400 hover:text-brass-300 font-semibold transition-colors py-1 cursor-pointer">
              <span>Baca Narasi Lengkap</span>
              <span class="material-symbols-outlined text-sm transition-transform duration-300">expand_more</span>
            </button>
            <div id="history-full-narrative" class="history-full-narrative">
              <p class="text-xs text-surface/75 font-light leading-relaxed pt-2 pl-3 border-l-2 border-brass-400/40 my-1 bg-white/[0.01] rounded-r-lg">
                ${raw}
              </p>
            </div>
          </div>
        </div>
      `;
    }

    // Render Tab 1: Ikhtisar & Sejarah (Bite-sized, clean, modular)
    var historyEl = document.getElementById('tab-history-content');
    if (historyEl) {
      historyEl.innerHTML = `
        <div class="space-y-4">
          <!-- 1. Intisari Kilas Sejarah (Bite-Sized) -->
          ${formatBiteSizedHistory(prov)}

          <!-- 2. Grid Sapaan Daerah & Kriya Luhur -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Kartu Bahasa & Sapaan Ramah -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-brass-500/10 via-white/[0.02] to-transparent border border-brass-400/25 flex flex-col justify-between space-y-3">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brass-300 font-mono">
                  <span class="material-symbols-outlined text-sm text-brass-400">record_voice_over</span>
                  <span>${prov.language ? prov.language.name : 'Bahasa Daerah'}</span>
                </div>
                <button id="card-voice-play-btn" class="px-2.5 py-1 rounded-full bg-brass-400/20 hover:bg-brass-400 hover:text-ink text-brass-300 border border-brass-400/40 text-[10px] font-bold flex items-center gap-1 transition-all shadow-sm cursor-pointer" title="Dengarkan Sapaan">
                  <span class="material-symbols-outlined text-sm">volume_up</span>
                  <span>Dengar</span>
                </button>
              </div>

              <div class="p-3 rounded-xl bg-black/40 border border-brass-400/20 shadow-inner">
                <span class="text-[9px] uppercase font-mono tracking-widest text-surface/50 block mb-1">Sapaan Khas:</span>
                <h5 class="font-display text-base sm:text-lg text-brass-100 font-light leading-snug mb-0.5">
                  &ldquo;${prov.language ? prov.language.greeting : 'Selamat Datang'}&rdquo;
                </h5>
                <p class="text-xs text-surface/65 italic font-light">
                  Artinya: &ldquo;${prov.language ? prov.language.meaning : 'Salam persaudaraan'}&rdquo;
                </p>
              </div>

              ${prov.language && prov.language.commonPhrases && prov.language.commonPhrases.length ? `
                <div class="pt-2 border-t border-white/10 space-y-1">
                  <span class="text-[9px] font-bold uppercase tracking-wider text-surface/50 font-mono block">Ungkapan Populer:</span>
                  <div class="flex flex-wrap gap-1">
                    ${prov.language.commonPhrases.slice(0, 2).map(function (cp) {
                      var phraseText = (typeof cp === 'object' && cp) ? cp.phrase : cp;
                      var meaningText = (typeof cp === 'object' && cp) ? cp.meaning : '';
                      return `
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-surface/80">
                          <strong class="font-display text-brass-300 font-medium">${phraseText}</strong>
                          ${meaningText ? `<span class="text-surface/40 text-[9px]">&bull;</span><span class="text-surface/60 text-[9px] italic">${meaningText}</span>` : ''}
                        </span>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Kartu Keahlian Kriya Luhur -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-terracotta-500/10 via-white/[0.02] to-transparent border border-terracotta-400/25 flex flex-col justify-between space-y-3">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-terracotta-300 font-mono">
                  <span class="material-symbols-outlined text-sm text-terracotta-400">palette</span>
                  <span>Kriya Luhur</span>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-terracotta-500/20 text-terracotta-200 border border-terracotta-500/30 font-mono">
                  Pusaka Lokal
                </span>
              </div>

              <div class="p-3 rounded-xl bg-black/40 border border-terracotta-500/20 shadow-inner">
                <span class="text-[9px] uppercase font-mono tracking-widest text-surface/50 block mb-1">Identitas Kriya:</span>
                <h5 class="font-display text-base sm:text-lg text-terracotta-100 font-light leading-snug mb-1">
                  ${prov.craftHighlight}
                </h5>
                <p class="text-[11px] text-surface/70 font-light leading-relaxed">
                  Keahlian adiluhung penopang ekonomi kreatif masyarakat setempat.
                </p>
              </div>

              <div class="flex items-center justify-between pt-1 text-[11px]">
                <span class="text-surface/50 font-mono">Koleksi Wastra & Kriya</span>
                <a href="ekonomi-kreatif.html" class="inline-flex items-center gap-1 text-terracotta-300 hover:text-terracotta-200 font-semibold transition-colors">
                  <span>Lihat Produk</span>
                  <span class="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>

          <!-- 3. Warisan Budaya Takbenda (WBTb) Seal Badges -->
          ${(prov.heritage && prov.heritage.length) ? `
            <div class="space-y-2.5 pt-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-brass-400">verified</span>
                  <h4 class="text-[11px] font-bold uppercase tracking-wider text-surface/80 font-mono">
                    Warisan Budaya Takbenda (WBTb)
                  </h4>
                </div>
                <span class="text-[10px] text-surface/50 font-mono">${prov.heritage.length} Pusaka Resmi</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                ${prov.heritage.map(function (item) {
                  var isUnesco = item.category && item.category.toLowerCase().includes('unesco');
                  var badgeBorder = isUnesco ? 'border-amber-400/40 bg-amber-500/15 text-amber-300' : 'border-brass-400/30 bg-brass-400/15 text-brass-300';
                  return `
                    <div class="wbtb-badge-card p-3 rounded-xl bg-white/[0.025] border border-white/10 flex flex-col justify-between space-y-1.5">
                      <div>
                        <div class="flex items-center justify-between gap-1 mb-1">
                          <span class="inline-block px-1.5 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wider border ${badgeBorder} font-mono">
                            ${item.category}
                          </span>
                          ${isUnesco ? '<span class="material-symbols-outlined text-[13px] text-amber-400" title="UNESCO">grade</span>' : ''}
                        </div>
                        <h5 class="font-display text-sm font-medium text-surface mb-0.5">${item.name}</h5>
                        <p class="text-[11px] text-surface/70 font-light leading-relaxed line-clamp-2">${item.desc}</p>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- 4. Suara Pelestari Tradisi -->
          ${prov.maker ? `
            <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-forest-900/30 via-black/40 to-transparent border border-forest-500/25 flex items-start gap-3">
              <div class="w-8 h-8 rounded-xl bg-forest-500/20 border border-forest-500/30 flex items-center justify-center text-forest-300 flex-shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-base">person</span>
              </div>
              <div class="min-w-0 flex-1 space-y-0.5">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-forest-300 font-mono">Pesan Luhur Pelestari Tradisi</span>
                  <span class="text-[10px] text-surface/50 font-mono">${prov.maker.role}</span>
                </div>
                <p class="italic text-xs text-surface/90 font-light leading-relaxed">
                  &ldquo;${prov.maker.quote}&rdquo;
                </p>
                <span class="text-[11px] font-semibold text-brass-300 block pt-0.5">— ${prov.maker.name}</span>
              </div>
            </div>
          ` : ''}
        </div>
      `;

      // Wire accordion expand narrative button
      var toggleNarrativeBtn = document.getElementById('toggle-history-narrative-btn');
      var narrativeBox = document.getElementById('history-full-narrative');
      if (toggleNarrativeBtn && narrativeBox) {
        toggleNarrativeBtn.addEventListener('click', function () {
          var isExpanded = narrativeBox.classList.toggle('open');
          toggleNarrativeBtn.classList.toggle('open', isExpanded);
          toggleNarrativeBtn.querySelector('span:first-child').textContent = isExpanded ? 'Sembunyikan Narasi' : 'Baca Narasi Lengkap';
        });
      }

      // Wire card voice play button
      var cardVoiceBtn = document.getElementById('card-voice-play-btn');
      if (cardVoiceBtn && prov.language) {
        cardVoiceBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          speakRegionalGreeting(prov.language.greeting);
        });
      }
    }

    // Render Tab 2: Kuliner & Senjata Pusaka
    var culinaryWeaponEl = document.getElementById('tab-culinary-weapon-content');
    if (culinaryWeaponEl) {
      culinaryWeaponEl.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Kuliner Khas -->
          <div class="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 flex flex-col">
            <div class="relative h-48 sm:h-56 overflow-hidden bg-[#151310] group cursor-pointer" onclick="window.warisaraZoomImg('${fixImgPath((prov.culinary && (prov.culinary.photo || prov.culinary.image)) || '')}', '${prov.culinary ? (prov.culinary.name || '').replace(/'/g, "\\'") : 'Kuliner'}', '${prov.culinary ? (prov.culinary.desc || '').replace(/'/g, "\\'") : ''}')" title="Klik untuk perbesar ilustrasi">
              <img src="${fixImgPath((prov.culinary && (prov.culinary.photo || prov.culinary.image)) || 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80')}" 
                   alt="${prov.culinary ? prov.culinary.name : 'Kuliner'}" 
                   class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-terracotta-300 border border-terracotta-400/30 backdrop-blur-md flex items-center gap-1">
                <span>🍲</span>
                <span>Makanan Khas Autentik</span>
              </span>
              <div class="absolute bottom-3 left-4 right-4">
                <h4 class="font-display text-xl sm:text-2xl text-surface font-light drop-shadow">
                  ${prov.culinary ? prov.culinary.name : 'Kuliner Khas'}
                </h4>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between text-xs text-surface/80">
              <p class="font-light leading-relaxed mb-4">
                ${prov.culinary ? prov.culinary.desc : 'Kekayaan rempah nusantara dengan perpaduan resep leluhur yang khas.'}
              </p>
              <div class="p-3 rounded-xl bg-terracotta-500/10 border border-terracotta-500/20 text-[11px] text-terracotta-200">
                <strong class="block mb-0.5 text-terracotta-300 font-semibold">Karakter Rasa:</strong>
                Kaya akan bumbu rempah alami lokal yang mencerminkan kekayaan bumi provinsi ${prov.name}.
              </div>
            </div>
          </div>

          <!-- Senjata Tradisional -->
          <div class="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 flex flex-col">
            <div class="relative h-48 sm:h-56 overflow-hidden bg-[#151310] group cursor-pointer" onclick="window.warisaraZoomImg('${fixImgPath((prov.weapon && (prov.weapon.photo || prov.weapon.image)) || '')}', '${prov.weapon ? (prov.weapon.name || '').replace(/'/g, "\\'") : 'Senjata Pusaka'}', '${prov.weapon ? (prov.weapon.desc || '').replace(/'/g, "\\'") : ''}')" title="Klik untuk perbesar ilustrasi">
              <img src="${fixImgPath((prov.weapon && (prov.weapon.photo || prov.weapon.image)) || 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80')}" 
                   alt="${prov.weapon ? prov.weapon.name : 'Senjata Pusaka'}" 
                   class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-brass-300 border border-brass-400/30 backdrop-blur-md flex items-center gap-1">
                <span>🗡️</span>
                <span>Senjata Khas & Pusaka</span>
              </span>
              <div class="absolute bottom-3 left-4 right-4">
                <h4 class="font-display text-xl sm:text-2xl text-surface font-light drop-shadow">
                  ${prov.weapon ? prov.weapon.name : 'Senjata Pusaka'}
                </h4>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between text-xs text-surface/80">
              <p class="font-light leading-relaxed mb-4">
                ${prov.weapon ? prov.weapon.desc : 'Senjata pusaka berfilosofi tinggi yang melambangkan keberanian dan kehormatan adat.'}
              </p>
              <div class="p-3 rounded-xl bg-brass-500/10 border border-brass-500/20 text-[11px] text-brass-200">
                <strong class="block mb-0.5 text-brass-300 font-semibold">Filosofi Pusaka:</strong>
                Simbol ksatria, ketahanan jiwa, dan perlindungan marwah adat istiadat leluhur.
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Render Tab 3: Wisata & Berita Hot
    var tourismNewsEl = document.getElementById('tab-tourism-news-content');
    if (tourismNewsEl) {
      tourismNewsEl.innerHTML = `
        <div class="space-y-6">
          <!-- Destinasi Wisata -->
          <div class="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
            <div class="relative h-56 sm:h-72 overflow-hidden bg-[#151310] group cursor-pointer" onclick="window.warisaraZoomImg('${fixImgPath((prov.tourism && (prov.tourism.photo || prov.tourism.image)) || '')}', '${prov.tourism ? (prov.tourism.name || '').replace(/'/g, "\\'") : 'Destinasi Wisata'}', '${prov.tourism ? (prov.tourism.desc || '').replace(/'/g, "\\'") : ''}')" title="Klik untuk perbesar ilustrasi">
              <img src="${fixImgPath((prov.tourism && (prov.tourism.photo || prov.tourism.image)) || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80')}" 
                   alt="${prov.tourism ? prov.tourism.name : 'Destinasi Wisata'}" 
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-emerald-300 border border-emerald-400/30 backdrop-blur-md flex items-center gap-1">
                <span>🏞️</span>
                <span>Destinasi Wisata Ikonik</span>
              </span>
              <div class="absolute bottom-4 left-5 right-5">
                <h4 class="font-display text-2xl sm:text-3xl text-surface font-light drop-shadow">
                  ${prov.tourism ? prov.tourism.name : 'Wisata Unggulan'}
                </h4>
              </div>
            </div>
            <div class="p-5 text-xs sm:text-sm text-surface/85 font-light leading-relaxed">
              <p>${prov.tourism ? prov.tourism.desc : 'Keindahan bentang alam dan cagar budaya yang memikat jutaan wisatawan dari seluruh penjuru dunia.'}</p>
            </div>
          </div>

          <!-- Berita Hot Terkini -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-red-950/20 via-black/40 to-black/30 border border-red-500/30">
            <div class="flex items-center justify-between mb-3">
              <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600/20 text-red-300 border border-red-500/40 flex items-center gap-1.5 hot-badge-pulse">
                <span class="material-symbols-outlined text-[13px] text-red-400">local_fire_department</span>
                <span>BERITA HOT TERKINI</span>
              </span>
              <span class="text-[11px] text-surface/50 font-mono">${prov.hotNews ? prov.hotNews.date : 'Terkini 2026'}</span>
            </div>
            <h4 class="font-display text-lg sm:text-xl text-surface font-normal mb-2 leading-snug">
              ${prov.hotNews ? prov.hotNews.headline : `Kabar Terhangat Kebudayaan & Pariwisata ${prov.name}`}
            </h4>
            <p class="text-xs text-surface/80 font-light leading-relaxed mb-3">
              ${prov.hotNews ? prov.hotNews.summary : 'Perkembangan terbaru seputar festival budaya, konservasi tradisi, dan kemajuan pariwisata lokal.'}
            </p>
            <div class="flex items-center gap-2 text-[10px] uppercase tracking-wider text-surface/50 font-mono">
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-brass-300">#${prov.hotNews ? prov.hotNews.tag : 'Budaya'}</span>
              <span>Laporan Edukasi Budaya Warisara</span>
            </div>
          </div>
        </div>
      `;
    }

    // Render Tab 4: Galeri Realistis (5 Foto HD)
    var galleryEl = document.getElementById('tab-gallery-content');
    activeGalleryList = prov.gallery || [];
    if (galleryEl) {
      if (activeGalleryList.length === 0) {
        galleryEl.innerHTML = '<p class="text-xs text-surface/60 text-center py-8">Galeri foto sedang diperbarui.</p>';
      } else {
        galleryEl.innerHTML = `
          <div class="space-y-4">
            <p class="text-xs text-surface/70 font-light">Klik foto mana pun untuk memperbesar tampilan dalam resolusi ultra jernih.</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              ${activeGalleryList.map(function (item, idx) {
                return `
                  <div class="gallery-thumb-card group" data-gallery-index="${idx}">
                    <img src="${fixImgPath(item.url)}" alt="${item.title}" loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                      <p class="font-display text-[11px] text-surface font-medium line-clamp-1">${item.title}</p>
                      <p class="text-[9px] text-surface/60 line-clamp-1">${item.caption}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;

        galleryEl.querySelectorAll('.gallery-thumb-card').forEach(function (card) {
          card.addEventListener('click', function () {
            var idx = parseInt(card.getAttribute('data-gallery-index'), 10);
            openLightbox(idx);
          });
        });
      }
    }

    // Render Tab 5: Kuis Kilat Edukatif
    renderProvinceQuiz(prov);

    // Render Wari Mascot Dialogue Tip
    var wariTipEl = document.getElementById('modal-wari-tip-text');
    if (wariTipEl) {
      var wariGreetings = {
        'aceh': 'Di Aceh, kopi disaring berulang kali secara unik dengan saringan kain panjang (Kopi Tarik)! Rasanya gurih dan mantap!',
        'sumatera-barat': 'Di Ranah Minang, rumah Gadang dirancang tahan gempa dengan tiang yang tidak ditanam ke tanah melainkan bertumpu pada batu sandi!',
        'dki-jakarta': 'Ondel-ondel dulunya berfungsi sebagai penolak bala dan pelindung desa dari roh jahat lho!',
        'jawa-barat': 'Alat musik Angklung dari Jawa Barat telah diakui UNESCO sebagai Karya Agung Warisan Budaya Lisan dan Takbenda Manusia sejak 2010!',
        'bali': 'Sistem pengairan Subak di Bali bukan sekadar irigasi, tapi perwujudan filosofi Tri Hita Karana (harmoni manusia, alam, dan Tuhan)!',
        'di-yogyakarta': 'Tahu nggak? Garis lurus imaginer menghubungkan Gunung Merapi, Tugu Pal Putih, Keraton Yogyakarta, dan Pantai Parangkusumo!'
      };
      wariTipEl.textContent = wariGreetings[prov.id] || `Provinsi ${prov.name} menyimpan ribuan misteri adat dan keindahan yang membanggakan bangsa! Ayo jawab kuisnya dan kumpulkan stempel paspor!`;
    }

    // Switch to active tab (default: overview)
    switchModalTab(currentModalTab || 'overview');

    // Show modal overlay with smooth spring animation
    modalOverlay.classList.remove('hidden', 'modal-closing');
    modalOverlay.style.display = 'flex';

    // Double requestAnimationFrame ensures that CSS transitions trigger smoothly without snap
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        modalOverlay.classList.add('active');
        document.documentElement.classList.add('province-modal-open', 'modal-open');
        document.documentElement.style.overflow = 'hidden';
        document.body.classList.add('province-modal-open', 'modal-open');
        document.body.style.overflow = 'hidden';
      });
    });

    // Hide mascot comment / tooltip while modal is open
    if (window.WariMascot && window.WariMascot.hideTooltip) {
      window.WariMascot.hideTooltip();
    }

    // Reset modal scroll pane to top
    var scrollPane = document.querySelector('.modal-scroll-pane');
    if (scrollPane) {
      scrollPane.scrollTop = 0;
    }

    var navbar = document.getElementById('main-navbar');
    if (navbar) navbar.classList.add('navbar-hidden');
  }

  function updateModalStampBadge(provId) {
    var badge = document.getElementById('modal-stamp-status-badge');
    if (!badge) return;
    var stamped = isProvinceStamped(provId);
    if (stamped) {
      badge.className = 'px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brass-400/25 text-brass-300 border border-brass-400/50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(201,165,103,0.3)]';
      badge.innerHTML = '<span class="material-symbols-outlined text-sm">verified</span><span>Stempel Emas Diperoleh</span>';
    } else {
      badge.className = 'px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 text-surface/70 border border-white/20 flex items-center gap-1.5 cursor-pointer hover:bg-brass-400/20 hover:text-brass-300 transition-colors';
      badge.innerHTML = '<span class="material-symbols-outlined text-sm">assignment_turned_in</span><span>Jawab Kuis untuk Cap</span>';
      badge.onclick = function () {
        switchModalTab('quiz');
      };
    }
  }

  function switchModalTab(tabKey) {
    currentModalTab = tabKey;
    var tabs = ['overview', 'culinary-weapon', 'tourism-news', 'gallery', 'quiz'];
    tabs.forEach(function (t) {
      var btn = document.getElementById('tab-btn-' + t);
      var content = document.getElementById('tab-' + t + '-content');
      if (btn) {
        if (t === tabKey) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
      if (content) {
        if (t === tabKey) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      }
    });

    // Reset scroll pane to top so questions/content are never cut off
    var scrollPane = document.querySelector('.modal-scroll-pane');
    if (scrollPane) {
      scrollPane.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      scrollPane.scrollTop = 0;
    }
  }

  // --- QUIZ INTERACTION ---
  function renderProvinceQuiz(prov) {
    var quizContainer = document.getElementById('tab-quiz-content');
    if (!quizContainer) return;
    var quiz = prov.quiz;

    if (!quiz) {
      quizContainer.innerHTML = '<p class="text-xs text-surface/60 text-center py-6">Kuis untuk provinsi ini segera hadir.</p>';
      return;
    }

    var isStamped = isProvinceStamped(prov.id);

    quizContainer.innerHTML = `
      <div class="space-y-5">
        <div class="p-5 rounded-2xl bg-gradient-to-b from-brass-900/20 to-black/40 border border-brass-500/30">
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/30">
              Uji Wawasan Budaya
            </span>
            <span class="text-[11px] text-surface/60 font-mono">1 Soal Kilat • Hadiah Stempel Paspor</span>
          </div>
          
          <h4 class="font-display text-base sm:text-lg text-surface font-light leading-snug mb-5">
            ${quiz.question}
          </h4>

          <div id="quiz-options-group" class="space-y-2.5">
            ${quiz.options.map(function (opt, idx) {
              var letter = String.fromCharCode(65 + idx);
              return `
                <button class="quiz-option-btn group" data-option-idx="${idx}">
                  <span class="w-6 h-6 rounded-full bg-white/10 text-surface/80 text-[11px] font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-brass-400 group-hover:text-ink transition-colors">
                    ${letter}
                  </span>
                  <span>${opt}</span>
                </button>
              `;
            }).join('')}
          </div>

          <div id="quiz-feedback-box" class="hidden mt-5 p-4 rounded-xl text-xs leading-relaxed border transition-all">
            <!-- Dynamic feedback injected on click -->
          </div>
        </div>

        ${isStamped ? `
          <div class="p-4 rounded-xl bg-brass-400/10 border border-brass-400/20 text-center text-xs text-brass-300 flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-base">verified</span>
            <span>Kamu sudah mengoleksi stempel paspor untuk provinsi <strong>${prov.name}</strong>!</span>
          </div>
        ` : ''}
      </div>
    `;

    var optionBtns = quizContainer.querySelectorAll('.quiz-option-btn');
    var feedbackBox = document.getElementById('quiz-feedback-box');

    optionBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var selectedIdx = parseInt(btn.getAttribute('data-option-idx'), 10);
        var correctIdx = (typeof quiz.correct !== 'undefined' ? quiz.correct : quiz.answer);

        optionBtns.forEach(function (b) { b.disabled = true; });

        if (selectedIdx === correctIdx) {
          btn.classList.add('correct');
          stampProvince(prov.id);
          updateModalStampBadge(prov.id);
          renderProvincesGrid();

          feedbackBox.className = 'mt-5 p-4 rounded-xl text-xs leading-relaxed bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 block';
          feedbackBox.innerHTML = `
            <div class="flex items-center gap-2 text-emerald-300 font-bold mb-1.5 text-sm">
              <span class="material-symbols-outlined text-lg">check_circle</span>
              <span>Luar Biasa, Jawabanmu Benar!</span>
            </div>
            <p class="font-light mb-3 text-surface/90">${quiz.explanation}</p>
            <div class="flex items-center gap-2 pt-2 border-t border-emerald-500/30 text-[11px] text-emerald-300 font-semibold">
              <span class="material-symbols-outlined text-sm">military_tech</span>
              <span>Stempel Resmi "${prov.name}" Berhasil Dicap ke Paspor Penjelajahmu!</span>
            </div>
          `;
        } else {
          btn.classList.add('wrong');
          playSound('wrong');
          if (optionBtns[correctIdx]) optionBtns[correctIdx].classList.add('correct');

          feedbackBox.className = 'mt-5 p-4 rounded-xl text-xs leading-relaxed bg-red-950/40 border border-red-500/40 text-red-200 block';
          feedbackBox.innerHTML = `
            <div class="flex items-center gap-2 text-red-300 font-bold mb-1.5 text-sm">
              <span class="material-symbols-outlined text-lg">cancel</span>
              <span>Jawaban Kurang Tepat</span>
            </div>
            <p class="font-light mb-3 text-surface/90">${quiz.explanation}</p>
            <button id="quiz-retry-btn" class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-surface text-xs font-semibold inline-flex items-center gap-1 transition-colors">
              <span class="material-symbols-outlined text-sm">replay</span>
              <span>Coba Lagi</span>
            </button>
          `;

          var retryBtn = document.getElementById('quiz-retry-btn');
          if (retryBtn) {
            retryBtn.onclick = function () {
              renderProvinceQuiz(prov);
            };
          }
        }
      });
    });
  }

  var isProvinceModalClosing = false;

  function closeProvinceModal() {
    var modalOverlay = document.getElementById('province-modal-overlay');
    if (!modalOverlay || isProvinceModalClosing) return;
    if (!modalOverlay.classList.contains('active')) return;

    isProvinceModalClosing = true;
    modalOverlay.classList.remove('active');
    modalOverlay.classList.add('modal-closing');

    // Smooth exit transition before fully hiding
    setTimeout(function () {
      modalOverlay.classList.remove('modal-closing');
      modalOverlay.classList.add('hidden');
      modalOverlay.style.display = 'none';

      document.documentElement.classList.remove('province-modal-open', 'modal-open');
      document.documentElement.style.overflow = '';
      document.body.classList.remove('province-modal-open', 'modal-open');
      document.body.style.overflow = '';

      var navbar = document.getElementById('main-navbar');
      if (navbar) navbar.classList.remove('navbar-hidden');

      if (window.WariMascot && window.WariMascot.showTooltip) {
        window.WariMascot.showTooltip();
      }

      isProvinceModalClosing = false;
    }, 280);
  }

  // --- LIGHTBOX VIEWER ---
  function openCustomLightbox(url, title, caption) {
    var lightbox = document.getElementById('gallery-lightbox-modal');
    if (!lightbox) return;

    var imgEl = document.getElementById('lightbox-img');
    var titleEl = document.getElementById('lightbox-title');
    var captionEl = document.getElementById('lightbox-caption');
    var counterEl = document.getElementById('lightbox-counter');
    var prevBtn = document.getElementById('lightbox-prev-btn');
    var nextBtn = document.getElementById('lightbox-next-btn');

    if (imgEl) imgEl.src = url;
    if (titleEl) titleEl.textContent = title;
    if (captionEl) captionEl.textContent = caption || '';
    if (counterEl) counterEl.textContent = 'Ilustrasi HD';
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    lightbox.classList.remove('hidden');
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    document.documentElement.classList.add('modal-open', 'lightbox-open');
    document.body.classList.add('modal-open', 'lightbox-open');

    if (window.WariMascot && window.WariMascot.hideTooltip) {
      window.WariMascot.hideTooltip();
    }
  }
  window.warisaraZoomImg = openCustomLightbox;

  function openLightbox(index) {
    if (!activeGalleryList || activeGalleryList.length === 0) return;
    activeGalleryIndex = index;
    var lightbox = document.getElementById('gallery-lightbox-modal');
    if (!lightbox) return;

    var prevBtn = document.getElementById('lightbox-prev-btn');
    var nextBtn = document.getElementById('lightbox-next-btn');
    if (prevBtn) prevBtn.style.display = '';
    if (nextBtn) nextBtn.style.display = '';

    updateLightboxImage();
    lightbox.classList.remove('hidden');
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    document.documentElement.classList.add('modal-open', 'lightbox-open');
    document.body.classList.add('modal-open', 'lightbox-open');

    if (window.WariMascot && window.WariMascot.hideTooltip) {
      window.WariMascot.hideTooltip();
    }
  }

  function updateLightboxImage() {
    var item = activeGalleryList[activeGalleryIndex];
    if (!item) return;

    var imgEl = document.getElementById('lightbox-img');
    var titleEl = document.getElementById('lightbox-title');
    var captionEl = document.getElementById('lightbox-caption');
    var counterEl = document.getElementById('lightbox-counter');

    if (imgEl) imgEl.src = fixImgPath(item.url);
    if (titleEl) titleEl.textContent = item.title;
    if (captionEl) captionEl.textContent = item.caption;
    if (counterEl) counterEl.textContent = `${activeGalleryIndex + 1} / ${activeGalleryList.length}`;
  }

  function closeLightbox() {
    var lightbox = document.getElementById('gallery-lightbox-modal');
    if (lightbox) {
      lightbox.classList.remove('active');
      lightbox.classList.add('hidden');
      lightbox.style.display = 'none';
      document.documentElement.classList.remove('lightbox-open');
      document.body.classList.remove('lightbox-open');

      var provModal = document.getElementById('province-modal-overlay');
      if (!provModal || !provModal.classList.contains('active')) {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        if (window.WariMascot && window.WariMascot.showTooltip) {
          window.WariMascot.showTooltip();
        }
      }
    }
  }

  // --- PASPOR PENJELAJAH MODAL ---
  function openPassportModal() {
    var modal = document.getElementById('passport-book-modal');
    if (!modal || !window.PROVINCES_DATA) return;

    var data = getPassportData();
    var count = data.stamped.length;
    var total = 38;
    var percent = Math.round((count / total) * 100);
    var level = getLevelTitle(count);

    var levelEl = document.getElementById('passport-modal-level-title');
    if (levelEl) levelEl.textContent = level.title;

    var badgeEl = document.getElementById('passport-modal-level-badge');
    if (badgeEl) badgeEl.textContent = level.badge;

    var countEl = document.getElementById('passport-modal-count');
    if (countEl) countEl.textContent = `${count} dari ${total} Provinsi (${percent}%)`;

    var barEl = document.getElementById('passport-modal-bar');
    if (barEl) barEl.style.width = percent + '%';

    var grid = document.getElementById('passport-stamps-grid');
    if (grid) {
      var allProvinces = Object.values(window.PROVINCES_DATA);
      grid.innerHTML = allProvinces.map(function (prov) {
        var earned = isProvinceStamped(prov.id);
        return `
          <div class="passport-stamp-card ${earned ? 'earned' : 'locked'}" data-prov-id="${prov.id}">
            <div class="stamp-seal-circle">
              <span class="material-symbols-outlined text-2xl">${earned ? 'verified' : 'lock'}</span>
            </div>
            <h5 class="font-display text-xs font-medium text-surface mb-0.5 line-clamp-1">${prov.name}</h5>
            <span class="text-[9px] uppercase tracking-wider text-surface/50 font-mono">${prov.island}</span>
            <span class="text-[8px] mt-1 font-bold ${earned ? 'text-brass-300' : 'text-surface/30'}">
              ${earned ? 'TERCAP' : 'KUNJUNGI'}
            </span>
          </div>
        `;
      }).join('');

      grid.querySelectorAll('.passport-stamp-card').forEach(function (card) {
        card.addEventListener('click', function () {
          var provId = card.getAttribute('data-prov-id');
          closePassportModal();
          setTimeout(function () {
            openProvinceModal(provId);
          }, 150);
        });
      });
    }

    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.documentElement.classList.add('modal-open', 'passport-modal-open');
    document.body.classList.add('modal-open', 'passport-modal-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (window.WariMascot && window.WariMascot.hideTooltip) {
      window.WariMascot.hideTooltip();
    }
  }

  function closePassportModal() {
    var modal = document.getElementById('passport-book-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.classList.add('hidden');
      document.documentElement.classList.remove('passport-modal-open');
      document.body.classList.remove('passport-modal-open');

      if (!document.getElementById('province-modal-overlay').classList.contains('active')) {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        if (window.WariMascot && window.WariMascot.showTooltip) {
          window.WariMascot.showTooltip();
        }
      }
    }
  }

  // --- KOMPAS BUDAYA MODAL (RANDOMIZER) ---
  var isSpinning = false;
  function openCompassModal() {
    var modal = document.getElementById('compass-randomizer-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (window.WariMascot && window.WariMascot.hideTooltip) {
      window.WariMascot.hideTooltip();
    }
  }

  function closeCompassModal() {
    var modal = document.getElementById('compass-randomizer-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.classList.add('hidden');
      if (!document.getElementById('province-modal-overlay').classList.contains('active')) {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        if (window.WariMascot && window.WariMascot.showTooltip) {
          window.WariMascot.showTooltip();
        }
      }
    }
  }

  function spinCulturalCompass() {
    if (isSpinning || !window.PROVINCES_DATA) return;
    isSpinning = true;

    var needle = document.getElementById('compass-needle-el');
    var resultCard = document.getElementById('compass-result-card');
    var spinBtn = document.getElementById('compass-spin-action-btn');
    if (spinBtn) spinBtn.disabled = true;
    if (resultCard) resultCard.classList.add('hidden');

    // Suara putaran kompas
    var tickInterval = setInterval(function () {
      playSound('tick');
    }, 120);

    var provinces = Object.values(window.PROVINCES_DATA);
    var randomIndex = Math.floor(Math.random() * provinces.length);
    var pickedProvince = provinces[randomIndex];

    var randomRotations = 1080 + Math.floor(Math.random() * 360);
    if (needle) {
      needle.style.transform = `rotate(${randomRotations}deg)`;
    }

    setTimeout(function () {
      clearInterval(tickInterval);
      playSound('success');
      isSpinning = false;
      if (spinBtn) spinBtn.disabled = false;

      if (resultCard && pickedProvince) {
        resultCard.innerHTML = `
          <div class="p-5 rounded-2xl bg-brass-400/10 border border-brass-400/30 text-center animate-fade-in">
            <span class="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/30 mb-2">
              Jarum Kompas Menunjuk Ke:
            </span>
            <h4 class="font-display text-2xl text-surface font-light mb-1">${pickedProvince.name}</h4>
            <p class="text-xs text-brass-200 italic mb-3">"${pickedProvince.shortStatement}"</p>
            <div class="flex items-center justify-center gap-3 text-xs text-surface/80 mb-4">
              <span>🍲 ${pickedProvince.culinary ? pickedProvince.culinary.name : 'Kuliner'}</span>
              <span>•</span>
              <span>🏞️ ${pickedProvince.tourism ? pickedProvince.tourism.name : 'Wisata'}</span>
            </div>
            <button id="compass-visit-btn" class="px-6 py-2.5 rounded-full bg-brass-400 hover:bg-brass-300 text-ink text-xs font-bold shadow-lg transition-transform hover:scale-105">
              Jelajahi Sekarang ➔
            </button>
          </div>
        `;
        resultCard.classList.remove('hidden');

        var visitBtn = document.getElementById('compass-visit-btn');
        if (visitBtn) {
          visitBtn.onclick = function () {
            closeCompassModal();
            setTimeout(function () {
              openProvinceModal(pickedProvince.id);
            }, 150);
          };
        }
      }
    }, 1800);
  }

  // --- PREV / NEXT PROVINCE CONTROLS ---
  function navigateProvince(offset) {
    if (!activeProvinceId || !window.PROVINCES_DATA) return;
    var keys = Object.keys(window.PROVINCES_DATA);
    var currentIndex = keys.indexOf(activeProvinceId);
    if (currentIndex === -1) return;

    var newIndex = (currentIndex + offset + keys.length) % keys.length;
    openProvinceModal(keys[newIndex]);
  }

  // --- INITIALIZATION ---
  function init() {
    updatePassportUI();
    renderProvincesGrid();

    // Event Search
    var searchInput = document.getElementById('province-search-input');
    var clearSearchBtn = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        currentSearchQuery = e.target.value;
        if (clearSearchBtn) {
          if (currentSearchQuery.length > 0) {
            clearSearchBtn.classList.remove('hidden');
          } else {
            clearSearchBtn.classList.add('hidden');
          }
        }
        renderProvincesGrid();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        currentSearchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderProvincesGrid();
      });
    }

    // Event Island Filters
    var islandBtns = document.querySelectorAll('.island-btn');
    islandBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        islandBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        currentIsland = btn.getAttribute('data-island');
        renderProvincesGrid();
      });
    });

    // Event Status Filters (All, Stamped, Unstamped)
    var statusBtns = document.querySelectorAll('.status-filter-btn');
    statusBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        statusBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        currentStatus = btn.getAttribute('data-status');
        renderProvincesGrid();
      });
    });

    // Modal Tabs
    var tabBtns = document.querySelectorAll('.modal-tab-btn');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabKey = btn.getAttribute('data-tab');
        switchModalTab(tabKey);
      });
    });

    // Close Modal Events
    var closeBtns = document.querySelectorAll('.province-modal-close-trigger');
    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', closeProvinceModal);
    });

    var modalOverlay = document.getElementById('province-modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeProvinceModal();
      });
    }

    // Prev / Next Modal
    var prevBtn = document.getElementById('modal-nav-prev');
    if (prevBtn) prevBtn.addEventListener('click', function () { navigateProvince(-1); });

    var nextBtn = document.getElementById('modal-nav-next');
    if (nextBtn) nextBtn.addEventListener('click', function () { navigateProvince(1); });

    // Passport Triggers
    var passportTriggers = document.querySelectorAll('.open-passport-trigger');
    passportTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', openPassportModal);
    });

    var passportClose = document.querySelectorAll('.close-passport-trigger');
    passportClose.forEach(function (btn) {
      btn.addEventListener('click', closePassportModal);
    });

    var passportModalOverlay = document.getElementById('passport-book-modal');
    if (passportModalOverlay) {
      passportModalOverlay.addEventListener('click', function (e) {
        if (e.target === passportModalOverlay) closePassportModal();
      });
    }

    // Compass Triggers
    var compassTriggers = document.querySelectorAll('.open-compass-trigger');
    compassTriggers.forEach(function (btn) {
      btn.addEventListener('click', openCompassModal);
    });

    var compassClose = document.querySelectorAll('.close-compass-trigger');
    compassClose.forEach(function (btn) {
      btn.addEventListener('click', closeCompassModal);
    });

    var compassSpinBtn = document.getElementById('compass-spin-action-btn');
    if (compassSpinBtn) {
      compassSpinBtn.addEventListener('click', spinCulturalCompass);
    }

    // Lightbox Controls
    var lightboxClose = document.querySelectorAll('.close-lightbox-trigger');
    lightboxClose.forEach(function (btn) {
      btn.addEventListener('click', closeLightbox);
    });

    var lightboxPrev = document.getElementById('lightbox-prev-btn');
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function () {
        if (activeGalleryList.length === 0) return;
        activeGalleryIndex = (activeGalleryIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
        updateLightboxImage();
      });
    }

    var lightboxNext = document.getElementById('lightbox-next-btn');
    if (lightboxNext) {
      lightboxNext.addEventListener('click', function () {
        if (activeGalleryList.length === 0) return;
        activeGalleryIndex = (activeGalleryIndex + 1) % activeGalleryList.length;
        updateLightboxImage();
      });
    }

    // Scroll To Top Button
    var scrollTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // App Download Buttons
    document.querySelectorAll('.app-download-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var storeText = btn.querySelector('.font-display') ? btn.querySelector('.font-display').textContent : 'Store';
        playSound('success');
        
        var modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-[1200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4';
        modal.innerHTML = `
          <div class="bg-[#181512] border border-brass-400/40 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl">
            <div class="w-12 h-12 rounded-2xl bg-brass-400/20 text-brass-300 border border-brass-400/30 flex items-center justify-center mx-auto mb-3">
              <span class="material-symbols-outlined text-2xl">install_mobile</span>
            </div>
            <h4 class="font-display text-lg text-surface font-light mb-1">Aplikasi ${storeText}</h4>
            <p class="text-xs text-surface/75 font-light leading-relaxed mb-4">
              Aplikasi mobile native WARISARA di <strong>${storeText}</strong> sedang dalam tahap finalisasi dan segera dirilis untuk publik!
            </p>
            <div class="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-surface/60 mb-5 text-left flex items-start gap-2">
              <span class="material-symbols-outlined text-sm text-brass-400 flex-shrink-0 mt-0.5">info</span>
              <span>Saat ini Anda sudah dapat memasang versi <strong>Web App (PWA)</strong> langsung dari browser di ponsel Anda.</span>
            </div>
            <button class="w-full py-2.5 rounded-full bg-brass-400 hover:bg-brass-300 text-ink text-xs font-bold transition-colors cursor-pointer">
              Mengerti
            </button>
          </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('button').onclick = function () { modal.remove(); };
        modal.onclick = function (ev) { if (ev.target === modal) modal.remove(); };
      });
    });

    // Global Keydown
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeLightbox();
        closeCompassModal();
        closePassportModal();
        closeProvinceModal();
      }
      if (e.key === 'ArrowLeft' && !document.getElementById('province-modal-overlay').classList.contains('hidden')) {
        navigateProvince(-1);
      }
      if (e.key === 'ArrowRight' && !document.getElementById('province-modal-overlay').classList.contains('hidden')) {
        navigateProvince(1);
      }
    });

    // Check query param e.g. ?province=aceh or ?province=bali
    var urlParams = new URLSearchParams(window.location.search);
    var provParam = urlParams.get('province');
    if (provParam && window.PROVINCES_DATA && window.PROVINCES_DATA[provParam]) {
      setTimeout(function () {
        openProvinceModal(provParam);
      }, 300);
    }

    window.addEventListener('warisara_auth_changed', function () {
      updatePassportUI();
      renderProvincesGrid();
    });
  }

  // Expose global API
  window.WARISARA_JELAJAHI = {
    init: init,
    openProvinceModal: openProvinceModal,
    openPassportModal: openPassportModal,
    openCompassModal: openCompassModal,
    stampProvince: stampProvince
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
