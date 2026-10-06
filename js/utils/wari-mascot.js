/**
 * Si Wari Global Companion — wari-mascot.js
 * Ultra-smooth animations, 4s auto-commenting with page-aware contextual quotes.
 * NOTE: Skips 'belajar' page which has its own dedicated mascot system.
 */
(function () {
  'use strict';

  // ── Detect asset base path (pages/ or root) ──────────────────────────────
  const isInPages = window.location.pathname.includes('/pages/');
  const BASE = isInPages ? '../' : './';

  const IMGS = {
    idle:     BASE + 'assets/mascot/wari-idle-clean.png',
    happy:    BASE + 'assets/mascot/wari-happy-clean.png',
    thinking: BASE + 'assets/mascot/wari-thinking.png',
  };

  // ── Page-specific configuration ───────────────────────────────────────────
  const PAGE_CONFIGS = {
    default: {
      position: 'br',
      size: 'md',
      initMood: 'idle',
      initAnim: 'wave',
      idleAnim: 'bob',
      greetings: [
        'Halo! 👋 Saya Si Wari!',
        'Selamat datang di WARISARA!',
        'Yuk, jelajahi budaya Nusantara!',
        'Ada yang bisa kubantu? 😊',
      ],
      // Contextual quotes shown every 4 seconds — rich & varied
      contextQuotes: [
        { mood: 'happy',    anim: 'wave',    text: 'Indonesia kaya budaya! 🌺' },
        { mood: 'idle',     anim: 'bob',     text: 'Lestarikan warisan leluhur 🌿' },
        { mood: 'thinking', anim: 'think',   text: 'Kamu sudah tahu batik Pekalongan? 🤔' },
        { mood: 'happy',    anim: 'excited', text: 'Yuk eksplorasi bareng! 🎉' },
        { mood: 'idle',     anim: 'nod',     text: '34 bahasa daerah hampir punah... 😢' },
        { mood: 'happy',    anim: 'hop',     text: 'Budaya kita mendunia! 🌍' },
        { mood: 'thinking', anim: 'think',   text: 'Warisan takbenda itu penting lho~' },
        { mood: 'happy',    anim: 'wave',    text: 'Klik aku kapan saja! 😄' },
      ],
    },
    index: {
      position: 'br',
      size: 'md',
      initMood: 'happy',
      initAnim: 'wave',
      idleAnim: 'float',
      greetings: [
        'Halo! Aku Si Wari, maskot WARISARA! 👋',
        'Selamat datang di WARISARA!',
        'Jelajahi 38 Provinsi Nusantara!',
        'Warisan budaya kita luar biasa! 🌺',
      ],
      contextQuotes: [
        { mood: 'happy',    anim: 'wave',    text: 'Selamat datang di WARISARA! 🏛️' },
        { mood: 'happy',    anim: 'hop',     text: '38 Provinsi menunggumu di peta! 🗺️' },
        { mood: 'thinking', anim: 'think',   text: 'Provinsi mana yang belum kamu jelajahi?' },
        { mood: 'happy',    anim: 'excited', text: 'Indonesia itu luar biasa indah! 🌺' },
        { mood: 'idle',     anim: 'nod',     text: 'Coba klik provinsi di peta interaktif! 👇' },
        { mood: 'happy',    anim: 'wave',    text: 'Dari Sabang sampai Merauke~ 🌊' },
        { mood: 'thinking', anim: 'think',   text: 'Sudah tahu Raja Ampat ada di Papua Barat? 🐠' },
        { mood: 'happy',    anim: 'hop',     text: 'Banyak kejutan di setiap provinsi! ✨' },
        { mood: 'idle',     anim: 'bob',     text: 'Scroll ke bawah yuk! Ada banyak hal seru~' },
        { mood: 'happy',    anim: 'wave',    text: 'WARISARA — Warisan Rasa Kita! 🤝' },
      ],
    },
    belajar: {
      position: 'br',
      size: 'md',
      initMood: 'happy',
      initAnim: 'land',
      idleAnim: 'float',
      greetings: [
        'Semangat belajar hari ini! 🌟',
        'Ilmu adalah harta abadi!',
        'Ayo kerjakan kuisnya! 💪',
        'Budaya kita harus dijaga! 🇮🇩',
      ],
      contextQuotes: [
        { mood: 'happy',    anim: 'wave',    text: 'Semangat belajar! 📚' },
        { mood: 'thinking', anim: 'think',   text: 'Sudah siap ujian budaya? 🤔' },
        { mood: 'happy',    anim: 'excited', text: 'Ayo tunjukkan kemampuanmu! 💪' },
        { mood: 'idle',     anim: 'nod',     text: 'Belajar budaya itu menyenangkan! 🌿' },
        { mood: 'happy',    anim: 'hop',     text: 'Kuis budaya menanti! Siap? 🎯' },
      ],
    },
    cerita: {
      position: 'bl',
      size: 'md',
      initMood: 'idle',
      initAnim: 'wave',
      idleAnim: 'bob',
      greetings: [
        'Ssst... ada cerita menarik! 📖',
        'Kisah leluhur penuh makna~',
        'Simak ceritanya ya! ✨',
        'Buku cerita terbuka untukmu!',
      ],
      contextQuotes: [
        { mood: 'idle',     anim: 'bob',     text: 'Cerita rakyat itu harta tak ternilai 📜' },
        { mood: 'thinking', anim: 'think',   text: 'Sudah baca legenda Danau Toba? 🌊' },
        { mood: 'happy',    anim: 'wave',    text: 'Kisah yang indah, bukan? ✨' },
        { mood: 'idle',     anim: 'nod',     text: 'Setiap cerita menyimpan kearifan lokal~' },
        { mood: 'thinking', anim: 'think',   text: 'Apa cerita favorit dari daerahmu? 🤔' },
        { mood: 'happy',    anim: 'excited', text: 'Mari lestarikan cerita leluhur! 📖' },
        { mood: 'idle',     anim: 'bob',     text: 'Warisan lisan yang berharga... 🌙' },
        { mood: 'happy',    anim: 'wave',    text: 'Aku suka cerita rakyat! Kamu? 😊' },
      ],
    },
    jelajahi: {
      position: 'br',
      size: 'md',
      initMood: 'happy',
      initAnim: 'hop',
      idleAnim: 'float',
      greetings: [
        '38 Provinsi menunggumu! 🗺️',
        'Jelajahi setiap sudut Nusantara!',
        'Indonesia itu luar biasa! 🌺',
        'Provinsi mana dulu nih?',
      ],
      contextQuotes: [
        { mood: 'happy',    anim: 'hop',     text: '38 Provinsi, tak ada habisnya dijelajahi! 🗺️' },
        { mood: 'thinking', anim: 'think',   text: 'Sudah tahu Tari Saman dari Aceh? 💃' },
        { mood: 'happy',    anim: 'excited', text: 'Nusantara sangat kaya ragam budaya! 🌺' },
        { mood: 'idle',     anim: 'nod',     text: 'Dari Sabang sampai Merauke~ 🌊' },
        { mood: 'happy',    anim: 'wave',    text: 'Coba jelajahi Kalimantan! Penuh keajaiban 🌴' },
        { mood: 'thinking', anim: 'think',   text: 'Rumah adat Toraja itu unik sekali lho... 🏠' },
        { mood: 'happy',    anim: 'hop',     text: 'Bali indah, tapi NTT lebih mengejutkan! ✨' },
        { mood: 'idle',     anim: 'bob',     text: 'Setiap provinsi punya cerita sendiri~ 📖' },
      ],
    },
    warisan: {
      position: 'tr',
      size: 'sm',
      initMood: 'idle',
      initAnim: 'wave',
      idleAnim: 'bob',
      greetings: [
        'Karya pusaka leluhur kita! 🎨',
        'Indahnya seni Nusantara~',
        'Batik, ukiran, tenun... cantik!',
        'Warisan tak ternilai harganya!',
      ],
      contextQuotes: [
        { mood: 'idle',     anim: 'bob',     text: 'Seni tradisional itu luar biasa! 🎨' },
        { mood: 'thinking', anim: 'think',   text: 'Batik sudah diakui UNESCO lho! 🏅' },
        { mood: 'happy',    anim: 'wave',    text: 'Tenun ikat begitu indah dan rumit~' },
        { mood: 'idle',     anim: 'nod',     text: 'Pusaka kita harus dijaga 🏛️' },
        { mood: 'thinking', anim: 'think',   text: 'Keris punya makna spiritual mendalam 🗡️' },
        { mood: 'happy',    anim: 'excited', text: 'Warisan takbenda mendunia! 🌍' },
        { mood: 'idle',     anim: 'bob',     text: 'Begitu banyak keindahan di sini! ✨' },
      ],
    },
    makers: {
      position: 'br',
      size: 'md',
      initMood: 'happy',
      initAnim: 'wave',
      idleAnim: 'bob',
      greetings: [
        'Para pelestari budaya terbaik! 🌟',
        'Merekalah pahlawan budaya kita!',
        'Inspiratif sekali, bukan? 💪',
        'Yuk dukung para pengrajin kita!',
      ],
      contextQuotes: [
        { mood: 'happy',    anim: 'wave',    text: 'Para maestro kebudayaan sejati! 🎭' },
        { mood: 'idle',     anim: 'nod',     text: 'Mereka menjaga tradisi tiap hari... 🙏' },
        { mood: 'happy',    anim: 'excited', text: 'Karya mereka luar biasa! Dukung yuk! 💪' },
        { mood: 'thinking', anim: 'think',   text: 'Berapa generasi yang telah mewarisi seni ini? 🤔' },
        { mood: 'happy',    anim: 'hop',     text: 'Beli produk mereka = lestarikan budaya! 🛍️' },
        { mood: 'idle',     anim: 'bob',     text: 'Tangan terampil yang penuh dedikasi~ ✋' },
      ],
    },
    'ekonomi-kreatif': {
      position: 'bl',
      size: 'md',
      initMood: 'happy',
      initAnim: 'hop',
      idleAnim: 'float',
      greetings: [
        'Produk lokal berkualitas tinggi! 🛍️',
        'Beli lokal, dukung budaya!',
        'UMKM kita keren-keren lho!',
        'Bangga produk Indonesia! 🇮🇩',
      ],
      contextQuotes: [
        { mood: 'happy',    anim: 'hop',     text: 'Produk lokal makin kece & berkualitas! 🛍️' },
        { mood: 'thinking', anim: 'think',   text: 'UMKM budaya membutuhkan dukunganmu~ 💼' },
        { mood: 'happy',    anim: 'excited', text: 'Beli lokal = cinta budaya! 🇮🇩' },
        { mood: 'idle',     anim: 'nod',     text: 'Ekonomi kreatif tumbuh dari akar budaya~' },
        { mood: 'happy',    anim: 'wave',    text: 'Produk Indonesia go global! 🌍' },
        { mood: 'thinking', anim: 'think',   text: 'Batik bisa jadi fashion global lho! 👗' },
        { mood: 'happy',    anim: 'hop',     text: 'Bangga pakai buatan Indonesia! ✨' },
      ],
    },
    'heritage-modern': {
      position: 'tr',
      size: 'sm',
      initMood: 'thinking',
      initAnim: 'nod',
      idleAnim: 'bob',
      greetings: [
        'Tradisi bertemu modernitas! ✨',
        'Heritage yang tetap relevan~',
        'Keren banget kolaborasinya!',
        'Masa lalu yang menginspirasi masa kini!',
      ],
      contextQuotes: [
        { mood: 'thinking', anim: 'think',   text: 'Tradisi & modern bisa berpadu indah! ✨' },
        { mood: 'happy',    anim: 'excited', text: 'Heritage × Modern = inovasi luar biasa! 🔥' },
        { mood: 'idle',     anim: 'nod',     text: 'Inovasi dari akar budaya yang kuat 🌱' },
        { mood: 'thinking', anim: 'think',   text: 'Bagaimana batik bisa tampil di fashion show? 🤔' },
        { mood: 'happy',    anim: 'wave',    text: 'Masa lalu yang menginspirasi masa depan! 🚀' },
        { mood: 'idle',     anim: 'bob',     text: 'Relevansi budaya itu kunci! 🔑' },
      ],
    },
    'creative-lab': {
      position: 'br',
      size: 'md',
      initMood: 'happy',
      initAnim: 'spin',
      idleAnim: 'float',
      greetings: [
        'Waktunya berkreasi! 🎨',
        'Creative Lab siap meluncur!',
        'Ekspresi budayamu di sini!',
        'Ayo ciptakan sesuatu yang keren!',
      ],
      contextQuotes: [
        { mood: 'happy',    anim: 'excited', text: 'Ide kreatifmu bisa mengubah dunia! 💡' },
        { mood: 'happy',    anim: 'spin',    text: 'Lab kreativitas budaya terbuka! 🎨' },
        { mood: 'thinking', anim: 'think',   text: 'Budaya bisa menjadi inspirasi desain modern 🤔' },
        { mood: 'happy',    anim: 'hop',     text: 'Cipta karya budayamu sekarang! 🖌️' },
        { mood: 'idle',     anim: 'bob',     text: 'Kreativitasmu tidak ada batasnya~ ✨' },
        { mood: 'happy',    anim: 'wave',    text: 'Ekspresikan jiwa budayamu! 🌟' },
      ],
    },
    'pass-it-on': {
      position: 'bl',
      size: 'md',
      initMood: 'happy',
      initAnim: 'wave',
      idleAnim: 'bob',
      greetings: [
        'Teruskan warisan ke generasi berikut! 🤝',
        'Berbagi itu indah!',
        'Budaya hidup dari kita ke kita~',
        'Lestarikan, sebarkan, wariskan!',
      ],
      contextQuotes: [
        { mood: 'happy',    anim: 'wave',    text: 'Warisan itu untuk diteruskan! 🤝' },
        { mood: 'idle',     anim: 'nod',     text: 'Berbagi pengetahuan budaya itu mulia 🌿' },
        { mood: 'happy',    anim: 'hop',     text: 'Kamu adalah agen pelestari budaya! 🌟' },
        { mood: 'thinking', anim: 'think',   text: 'Sudah ajarkan anak cucu tentang batik? 🤔' },
        { mood: 'happy',    anim: 'excited', text: 'Sebarkan cinta budaya ke semua! ❤️' },
        { mood: 'idle',     anim: 'bob',     text: 'Budaya hidup dari mulut ke mulut~ 📢' },
      ],
    },
  };

  // ── State ─────────────────────────────────────────────────────────────────
  let el = null;
  let spriteEl = null;
  let bubbleEl = null;
  let bubbleTimer = null;
  let contextTimer = null;
  let moodCycleTimer = null;
  let currentMood = 'idle';
  let cfg = null;
  let isReacting = false;
  let contextQuoteIdx = 0;   // cycles through contextQuotes in order
  let clickCount = 0;        // for escalating click reactions

  // All animation class names for clean removal
  const ALL_ANIM_CLASSES = [
    'wari-animating-float','wari-animating-bob','wari-animating-breath',
    'wari-animating-wave','wari-animating-hop','wari-animating-nod',
    'wari-animating-glow','wari-animating-happyglow','wari-animating-shiver',
    'wari-animating-spin','wari-animating-land','wari-animating-excited',
    'wari-animating-think','wari-animating-bounce','wari-animating-rubberband',
    'wari-animating-tada','wari-animating-heartbeat','wari-animating-wobble',
  ];

  // ── Determine page ────────────────────────────────────────────────────────
  function detectPage () {
    const body = document.body;
    const dataPage = body.dataset.page || '';
    if (dataPage) return dataPage;
    const path = window.location.pathname;
    for (const key of Object.keys(PAGE_CONFIGS)) {
      if (key !== 'default' && path.includes(key)) return key;
    }
    return 'default';
  }

  // ── DOM building ──────────────────────────────────────────────────────────
  function buildMascot () {
    const page = detectPage();
    cfg = PAGE_CONFIGS[page] || PAGE_CONFIGS.default;

    // Wrapper
    el = document.createElement('div');
    el.className = `wari-companion wari-companion-${cfg.position}`;
    el.id = 'wari-global-companion';
    el.setAttribute('role', 'complementary');
    el.setAttribute('aria-label', 'Si Wari — Maskot WARISARA');

    // Speech bubble
    bubbleEl = document.createElement('div');
    bubbleEl.className = 'wari-speech ' + getSpeechTipClass(cfg.position);
    positionBubble(cfg.position, bubbleEl, cfg.size);
    el.appendChild(bubbleEl);

    // Sprite
    spriteEl = document.createElement('img');
    spriteEl.className = `wari-sprite wari-sprite-${cfg.size}`;
    spriteEl.src = IMGS[cfg.initMood] || IMGS.idle;
    spriteEl.alt = 'Si Wari Maskot';
    spriteEl.draggable = false;
    el.appendChild(spriteEl);

    document.body.appendChild(el);

    // Bind interactions
    spriteEl.addEventListener('click', onSpriteClick);
    spriteEl.addEventListener('mouseenter', onSpriteHover);
    spriteEl.addEventListener('mouseleave', onSpriteLeave);

    // Start idle animation after entrance, then greet
    setTimeout(() => {
      startIdleAnimation();
      greet();
    }, 1200);

    // Context quotes every 4 seconds (with 6s initial delay after greet)
    setTimeout(() => startContextQuoteLoop(), 6000);
  }

  function getSpeechTipClass (pos) {
    const map = { br: 'tip-right', bl: 'tip-left', tr: 'tip-right', tl: 'tip-left' };
    return map[pos] || 'tip-bottom';
  }

  function positionBubble (pos, bubble, size) {
    const offset = size === 'sm' ? 80 : size === 'lg' ? 130 : 104;
    if (pos === 'br') {
      bubble.style.cssText = `right:${offset + 10}px;bottom:50%;transform:translateY(50%);`;
    } else if (pos === 'bl') {
      bubble.style.cssText = `left:${offset + 10}px;bottom:50%;transform:translateY(50%);`;
    } else if (pos === 'tr') {
      bubble.style.cssText = `right:${offset + 10}px;top:50%;transform:translateY(-50%);`;
    } else if (pos === 'tl') {
      bubble.style.cssText = `left:${offset + 10}px;top:50%;transform:translateY(-50%);`;
    }
  }

  // ── Animations ────────────────────────────────────────────────────────────
  function startIdleAnimation () {
    if (!spriteEl) return;
    spriteEl.classList.remove(...ALL_ANIM_CLASSES);
    void spriteEl.offsetWidth;
    if (currentMood === 'happy') {
      spriteEl.classList.add('wari-animating-happyglow');
    } else if (currentMood === 'thinking') {
      spriteEl.classList.add('wari-animating-breath');
    } else {
      spriteEl.classList.add(`wari-animating-${cfg.idleAnim}`);
    }
  }

  function playAnim (anim, durationMs) {
    if (!spriteEl) return;
    const cls = `wari-animating-${anim}`;
    spriteEl.classList.remove(...ALL_ANIM_CLASSES);
    // Double rAF for GPU-smooth animation restart
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!spriteEl) return;
        spriteEl.classList.add(cls);
        if (durationMs) {
          setTimeout(() => {
            if (spriteEl) {
              spriteEl.classList.remove(cls);
              startIdleAnimation();
            }
          }, durationMs);
        }
      });
    });
  }

  function setMood (mood, silent) {
    if (!spriteEl) return;
    currentMood = mood;
    const src = IMGS[mood] || IMGS.idle;
    const currentSrc = spriteEl.getAttribute('src') || '';
    const targetSuffix = src.replace('../','').replace('./','');
    const sameImg = currentSrc.endsWith(targetSuffix);
    if (sameImg) { if (!silent) startIdleAnimation(); return; }

    // Smooth fade-out → swap → pop-in
    spriteEl.style.transition = 'opacity 0.15s ease-out, transform 0.15s ease-out';
    spriteEl.style.opacity = '0';
    spriteEl.style.transform = 'scale(0.88) rotate(-4deg)';
    setTimeout(() => {
      if (!spriteEl) return;
      spriteEl.src = src;
      spriteEl.style.transition = 'opacity 0.22s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
      spriteEl.style.opacity = '1';
      spriteEl.style.transform = 'scale(1.08) rotate(2deg)';
      setTimeout(() => {
        if (!spriteEl) return;
        spriteEl.style.transition = 'transform 0.28s cubic-bezier(0.22,1,0.36,1)';
        spriteEl.style.transform = '';
        setTimeout(() => {
          if (!spriteEl) return;
          spriteEl.style.transition = '';
          if (!silent) startIdleAnimation();
        }, 290);
      }, 250);
    }, 160);
  }

  // ── Speech bubble ─────────────────────────────────────────────────────────
  function showBubble (text, duration = 3200) {
    if (!bubbleEl) return;
    clearTimeout(bubbleTimer);

    // Animate out first if already visible
    if (bubbleEl.classList.contains('visible')) {
      bubbleEl.classList.remove('visible');
      setTimeout(() => _showBubbleInner(text, duration), 200);
    } else {
      _showBubbleInner(text, duration);
    }
  }

  function _showBubbleInner (text, duration) {
    if (!bubbleEl) return;
    bubbleEl.textContent = text;
    // Use rAF to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (bubbleEl) bubbleEl.classList.add('visible');
      });
    });
    bubbleTimer = setTimeout(() => {
      if (bubbleEl) bubbleEl.classList.remove('visible');
    }, duration);
  }

  function greet () {
    const msgs = cfg.greetings;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    setMood('happy', true);
    playAnim(cfg.initAnim || 'wave', 1400);
    setTimeout(() => { showBubble(msg, 3800); }, 350);
    setTimeout(() => { setMood('idle'); }, 2600);
  }

  // ── Context quote loop — every 4 seconds ──────────────────────────────────
  function startContextQuoteLoop () {
    runContextQuote();
  }

  function runContextQuote () {
    if (!cfg || !cfg.contextQuotes) { scheduleNextContextQuote(); return; }
    if (document.hidden || isReacting) { scheduleNextContextQuote(); return; }

    const quotes = cfg.contextQuotes;
    const ev = quotes[contextQuoteIdx % quotes.length];
    contextQuoteIdx++;

    setMood(ev.mood, true);
    playAnim(ev.anim, 1300);
    setTimeout(() => showBubble(ev.text, 3600), 250);
    // Return to idle mood after animation
    setTimeout(() => { if (!isReacting) setMood('idle'); }, 1600);

    scheduleNextContextQuote();
  }

  function scheduleNextContextQuote () {
    clearTimeout(contextTimer);
    // 4 seconds between quotes
    contextTimer = setTimeout(runContextQuote, 4000);
  }

  // ── Interaction handlers ──────────────────────────────────────────────────
  function onSpriteClick () {
    isReacting = true;
    clickCount++;

    // Escalating reactions for repeated clicks
    const reactions = [
      () => clickReact_happy(),
      () => clickReact_excited(),
      () => clickReact_bounce(),
      () => clickReact_tada(),
      () => clickReact_spin(),
    ];
    const idx = (clickCount - 1) % reactions.length;
    reactions[idx]();

    // Cooldown
    setTimeout(() => { isReacting = false; }, 2200);
    // Reset click escalation after 8 seconds idle
    clearTimeout(onSpriteClick._resetTimer);
    onSpriteClick._resetTimer = setTimeout(() => { clickCount = 0; }, 8000);
  }

  function clickReact_happy () {
    const msgs = cfg.greetings;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    setMood('happy', true);
    playAnim('wave', 1350);
    showBubble(msg, 3400);
  }

  function clickReact_excited () {
    const clickMsgs = [
      'Hei hei! Kenapa kamu klik aku terus? 😂',
      'Aku senang! Klik lagi dong! 😄',
      'Kamu bikin aku semangat! 🎉',
      'Wow, perhatiannya ke aku! 🥰',
    ];
    setMood('happy', true);
    playAnim('excited', 1150);
    showBubble(clickMsgs[Math.floor(Math.random() * clickMsgs.length)], 3400);
  }

  function clickReact_bounce () {
    setMood('happy', true);
    playAnim('bounce', 900);
    showBubble('Yeay!! 🎊 Kamu terus klik aku!', 3000);
  }

  function clickReact_tada () {
    setMood('happy', true);
    playAnim('tada', 1000);
    showBubble('🌟 Ta-da! Aku Si Wari yang hebat!', 3200);
  }

  function clickReact_spin () {
    setMood('happy', true);
    playAnim('spin', 920);
    showBubble('Pusing~ Tapi tetap senang! 😵‍💫✨', 3000);
  }

  function onSpriteHover () {
    if (!spriteEl) return;
    spriteEl.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease';
    spriteEl.style.filter = 'drop-shadow(0 20px 36px rgba(0,0,0,0.6)) drop-shadow(0 0 42px rgba(201,165,103,0.55)) brightness(1.08)';
    spriteEl.style.transform = 'scale(1.10) translateY(-3px)';
  }

  function onSpriteLeave () {
    if (!spriteEl) return;
    spriteEl.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease';
    spriteEl.style.filter = '';
    spriteEl.style.transform = '';
    setTimeout(() => { if (spriteEl) spriteEl.style.transition = ''; }, 450);
  }

  // ── Public API (exposed globally) ─────────────────────────────────────────
  window.WariMascot = {
    react (type) {
      if (!spriteEl) return;
      isReacting = true;
      if (type === 'correct') {
        setMood('happy', true);
        playAnim('excited', 1150);
        showBubble('Mantap! Jawaban benar! 🎉', 3000);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1600);
      } else if (type === 'wrong') {
        setMood('thinking', true);
        playAnim('shiver', 720);
        showBubble('Yah, hampir! Coba lagi ya 😊', 3000);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1100);
      } else if (type === 'celebrate') {
        setMood('happy', true);
        playAnim('tada', 1000);
        showBubble('Luar biasa! Kamu keren sekali! 🌟', 3800);
        setTimeout(() => {
          playAnim('happyglow');
          setTimeout(() => { setMood('idle'); isReacting = false; }, 2200);
        }, 1050);
      } else if (type === 'thinking') {
        setMood('thinking', true);
        playAnim('think', 1450);
        showBubble('Hmm, pikirkan baik-baik ya... 🤔', 2800);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1600);
      } else if (type === 'wave') {
        setMood('happy', true);
        playAnim('wave', 1350);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1500);
      } else {
        isReacting = false;
      }
    },
    say (text, duration) {
      showBubble(text, duration || 3000);
    },
    setMood,
    playAnim,
  };

  // ── Init on DOMContentLoaded ──────────────────────────────────────────────
  function init () {
    if (document.getElementById('wari-global-companion')) return;
    const bodyPage = document.body.dataset.page || '';
    if (bodyPage === 'belajar') return;
    buildMascot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
