/**
 * Si Wari Global Companion — wari-mascot.js
 * Mascot with smooth, contextual animations for all WARISARA pages.
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
      idleQuotes: [
        'Indonesia kaya budaya!',
        'Lestarikan warisan leluhur 🌿',
        'Klik aku, aku ramah! 😄',
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
      idleQuotes: [
        'Mulai jelajahimu sekarang!',
        'Indonesia begitu kaya budaya 🏛️',
        'Klik aku kapan saja ya! 😊',
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
      idleQuotes: [
        'Lagi mikir nih... 🤔',
        'Kuis budaya menanti kamu!',
        'Jangan lupa kuisnya ya!',
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
      idleQuotes: [
        'Cerita yang indah, bukan? 🌙',
        'Warisan lisan yang berharga...',
        'Aku suka cerita rakyat! 📜',
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
      idleQuotes: [
        'Nusantara sangat indah!',
        'Dari Sabang sampai Merauke~ 🌊',
        'Banyak budaya keren di sini!',
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
      idleQuotes: [
        'Seni tradisional itu luar biasa!',
        'Pusaka kita harus dijaga 🏛️',
        'Begitu banyak keindahan!',
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
      idleQuotes: [
        'Mereka menjaga tradisi kita!',
        'Para maestro kebudayaan 🎭',
        'Karya mereka luar biasa!',
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
      idleQuotes: [
        'Produk lokal makin kece!',
        'Ekonomi kreatif itu seru 💼',
        'Beli lokal yuk! 🛒',
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
      idleQuotes: [
        'Tradisi & modern berpadu indah!',
        'Inovasi dari akar budaya 🌱',
        'Heritage × Modern = 🔥',
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
      idleQuotes: [
        'Ide kreatif bermunculan! 💡',
        'Lab kreativitas terbuka!',
        'Cipta karya budaya yuk! 🖌️',
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
      idleQuotes: [
        'Warisan itu untuk diteruskan!',
        'Berbagi pengetahuan budaya 🌿',
        'Kamu agen pelestari budaya!',
      ],
    },
  };

  // ── State ─────────────────────────────────────────────────────────────────
  let el = null;           // companion wrapper
  let spriteEl = null;     // <img>
  let bubbleEl = null;     // speech bubble
  let bubbleTimer = null;
  let idleTimer = null;
  let moodCycleTimer = null;
  let currentMood = 'idle';
  let cfg = null;
  let isReacting = false;  // blocks mood-cycle during reactions

  // All animation class names for clean removal
  const ALL_ANIM_CLASSES = [
    'wari-animating-float','wari-animating-bob','wari-animating-breath',
    'wari-animating-wave','wari-animating-hop','wari-animating-nod',
    'wari-animating-glow','wari-animating-happyglow','wari-animating-shiver',
    'wari-animating-spin','wari-animating-land','wari-animating-excited',
    'wari-animating-think',
  ];

  // ── Determine page ────────────────────────────────────────────────────────
  function detectPage () {
    const body = document.body;
    const dataPage = body.dataset.page || '';
    // Try to match known pages
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

    // Idle quotes loop
    scheduleIdleQuote();

    // Auto mood-cycle loop
    scheduleMoodCycle();
  }

  function getSpeechTipClass (pos) {
    const map = { br: 'tip-left', bl: 'tip-right', tr: 'tip-left', tl: 'tip-right' };
    return map[pos] || 'tip-bottom';
  }

  function positionBubble (pos, bubble, size) {
    // Bigger sizes need more offset — map: sm=80 md=104 lg=130
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
    // Idle animation matches current mood
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
    void spriteEl.offsetWidth;
    spriteEl.classList.add(cls);
    if (durationMs) {
      setTimeout(() => {
        if (spriteEl) spriteEl.classList.remove(cls);
        startIdleAnimation();
      }, durationMs);
    }
  }

  function setMood (mood, silent) {
    if (!spriteEl) return;
    const prev = currentMood;
    currentMood = mood;
    const src = IMGS[mood] || IMGS.idle;
    // Already same sprite? Skip image swap but update idle anim
    const currentSrc = spriteEl.getAttribute('src') || '';
    const targetSuffix = src.replace('../','').replace('./','');
    const sameImg = currentSrc.endsWith(targetSuffix);
    if (sameImg) { if (!silent) startIdleAnimation(); return; }

    // Animate out
    spriteEl.classList.add('mood-changing');
    setTimeout(() => {
      if (!spriteEl) return;
      spriteEl.src = src;
      spriteEl.classList.remove('mood-changing');
      spriteEl.style.transform = 'scale(1.06) rotate(2deg)';
      spriteEl.style.transition = 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => {
        if (!spriteEl) return;
        spriteEl.style.transform = '';
        spriteEl.style.transition = '';
        if (!silent) startIdleAnimation();
      }, 300);
    }, 180);
  }

  // ── Speech bubble ─────────────────────────────────────────────────────────
  function showBubble (text, duration = 3200) {
    if (!bubbleEl) return;
    clearTimeout(bubbleTimer);
    bubbleEl.textContent = text;
    bubbleEl.classList.add('visible');
    bubbleTimer = setTimeout(() => {
      bubbleEl.classList.remove('visible');
    }, duration);
  }

  function greet () {
    const msgs = cfg.greetings;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    setMood('happy', true);
    playAnim(cfg.initAnim || 'wave', 1400);
    setTimeout(() => { showBubble(msg, 3800); }, 350);
    setTimeout(() => { setMood('idle'); }, 2400);
  }

  // ── Auto mood cycling ─────────────────────────────────────────────────────
  // Sequence of auto mood cycles with paired animations and optional quotes
  const MOOD_CYCLE_EVENTS = [
    { mood: 'happy',    anim: 'excited', dur: 1150, quote: null },
    { mood: 'thinking', anim: 'think',   dur: 1450, quote: null },
    { mood: 'idle',     anim: 'wave',    dur: 1350, quote: null },
    { mood: 'happy',    anim: 'hop',     dur: 900,  quote: '😊' },
    { mood: 'thinking', anim: 'nod',     dur: 1050, quote: null },
    { mood: 'idle',     anim: 'float',   dur: null,  quote: null },
  ];
  let moodCycleIdx = 0;

  function scheduleMoodCycle () {
    // Cycle every 7–13 seconds
    const delay = 7000 + Math.random() * 6000;
    moodCycleTimer = setTimeout(() => {
      if (document.hidden || isReacting) { scheduleMoodCycle(); return; }
      const ev = MOOD_CYCLE_EVENTS[moodCycleIdx % MOOD_CYCLE_EVENTS.length];
      moodCycleIdx++;

      setMood(ev.mood, true);
      if (ev.dur) {
        playAnim(ev.anim, ev.dur);
      } else {
        startIdleAnimation();
      }
      if (ev.quote) {
        const allQ = [...(cfg.greetings || []), ...(cfg.idleQuotes || [])];
        const txt = allQ[Math.floor(Math.random() * allQ.length)];
        setTimeout(() => showBubble(txt, 2600), 200);
      }
      scheduleMoodCycle();
    }, delay);
  }

  function scheduleIdleQuote () {
    const minMs = 20000;
    const maxMs = 42000;
    const delay = minMs + Math.random() * (maxMs - minMs);
    idleTimer = setTimeout(() => {
      if (document.hidden) { scheduleIdleQuote(); return; }
      const quotes = cfg.idleQuotes;
      showBubble(quotes[Math.floor(Math.random() * quotes.length)], 3000);
      playAnim('nod', 1050);
      scheduleIdleQuote();
    }, delay);
  }

  // ── Interaction handlers ──────────────────────────────────────────────────
  function onSpriteClick () {
    isReacting = true;
    const msgs = cfg.greetings;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    setMood('happy', true);
    playAnim('excited', 1150);
    showBubble(msg, 3400);
    setTimeout(() => { setMood('idle'); isReacting = false; }, 1600);
  }

  function onSpriteHover () {
    if (!spriteEl) return;
    spriteEl.style.filter = 'drop-shadow(0 20px 36px rgba(0,0,0,0.6)) drop-shadow(0 0 42px rgba(201,165,103,0.55)) brightness(1.08)';
    spriteEl.style.transform = 'scale(1.08)';
    spriteEl.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease';
  }

  function onSpriteLeave () {
    if (!spriteEl) return;
    spriteEl.style.filter = '';
    spriteEl.style.transform = '';
    spriteEl.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease';
    setTimeout(() => { if (spriteEl) spriteEl.style.transition = ''; }, 400);
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
        playAnim('spin', 920);
        showBubble('Luar biasa! Kamu keren sekali! 🌟', 3800);
        setTimeout(() => {
          playAnim('happyglow');
          setTimeout(() => { setMood('idle'); isReacting = false; }, 2200);
        }, 950);
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
    if (document.getElementById('wari-global-companion')) return; // already present
    // belajar.html has its own full mascot system — skip the global companion
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
