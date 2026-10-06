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
  let el = null;        // companion wrapper
  let spriteEl = null;  // <img>
  let bubbleEl = null;  // speech bubble
  let bubbleTimer = null;
  let idleTimer = null;
  let currentMood = 'idle';
  let cfg = null;
  let floatInterval = null;

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

    // Start idle animation after entrance
    setTimeout(() => {
      startIdleAnimation();
      greet();
    }, 1200);

    // Idle quotes loop
    scheduleIdleQuote();
  }

  function getSpeechTipClass (pos) {
    const map = { br: 'tip-left', bl: 'tip-right', tr: 'tip-left', tl: 'tip-right' };
    return map[pos] || 'tip-bottom';
  }

  function positionBubble (pos, bubble, size) {
    const offset = size === 'sm' ? 58 : size === 'md' ? 74 : 92;
    if (pos === 'br') {
      bubble.style.cssText = `right:${offset + 8}px;bottom:50%;transform:translateY(50%);`;
    } else if (pos === 'bl') {
      bubble.style.cssText = `left:${offset + 8}px;bottom:50%;transform:translateY(50%);`;
    } else if (pos === 'tr') {
      bubble.style.cssText = `right:${offset + 8}px;top:50%;transform:translateY(-50%);`;
    } else if (pos === 'tl') {
      bubble.style.cssText = `left:${offset + 8}px;top:50%;transform:translateY(-50%);`;
    }
  }

  // ── Animations ────────────────────────────────────────────────────────────
  function startIdleAnimation () {
    if (!spriteEl) return;
    spriteEl.classList.remove(
      'wari-animating-float','wari-animating-bob','wari-animating-wave',
      'wari-animating-hop','wari-animating-nod','wari-animating-glow',
      'wari-animating-shiver','wari-animating-spin','wari-animating-land'
    );
    void spriteEl.offsetWidth; // reflow
    spriteEl.classList.add(`wari-animating-${cfg.idleAnim}`);
  }

  function playAnim (anim, durationMs) {
    if (!spriteEl) return;
    const cls = `wari-animating-${anim}`;
    spriteEl.classList.remove(
      'wari-animating-float','wari-animating-bob','wari-animating-wave',
      'wari-animating-hop','wari-animating-nod','wari-animating-glow',
      'wari-animating-shiver','wari-animating-spin','wari-animating-land'
    );
    void spriteEl.offsetWidth;
    spriteEl.classList.add(cls);
    if (durationMs) {
      setTimeout(() => {
        if (spriteEl) spriteEl.classList.remove(cls);
        startIdleAnimation();
      }, durationMs);
    }
  }

  function setMood (mood) {
    if (!spriteEl) return;
    currentMood = mood;
    const src = IMGS[mood] || IMGS.idle;
    if (spriteEl.src.endsWith(src.replace('./', '').replace('../', ''))) return;
    spriteEl.style.opacity = '0.7';
    spriteEl.style.transform = 'scale(0.92)';
    spriteEl.style.transition = 'opacity 0.22s, transform 0.22s';
    setTimeout(() => {
      spriteEl.src = src;
      spriteEl.style.opacity = '1';
      spriteEl.style.transform = 'scale(1)';
    }, 150);
    setTimeout(() => {
      spriteEl.style.transition = '';
    }, 400);
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
    setMood('happy');
    playAnim(cfg.initAnim || 'wave', 1200);
    setTimeout(() => { showBubble(msg, 3500); }, 300);
    setTimeout(() => { setMood('idle'); startIdleAnimation(); }, 2000);
  }

  function scheduleIdleQuote () {
    const minMs = 18000;
    const maxMs = 38000;
    const delay = minMs + Math.random() * (maxMs - minMs);
    idleTimer = setTimeout(() => {
      if (document.hidden) { scheduleIdleQuote(); return; }
      const quotes = cfg.idleQuotes;
      showBubble(quotes[Math.floor(Math.random() * quotes.length)], 2800);
      playAnim('nod', 900);
      scheduleIdleQuote();
    }, delay);
  }

  // ── Interaction handlers ──────────────────────────────────────────────────
  function onSpriteClick () {
    const msgs = cfg.greetings;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    setMood('happy');
    playAnim('hop', 800);
    showBubble(msg, 3200);
    setTimeout(() => { setMood('idle'); startIdleAnimation(); }, 1200);
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
      if (type === 'correct') {
        setMood('happy');
        playAnim('hop', 800);
        showBubble('Mantap! Jawaban benar! 🎉', 2800);
        setTimeout(() => { setMood('idle'); startIdleAnimation(); }, 1200);
      } else if (type === 'wrong') {
        setMood('thinking');
        playAnim('shiver', 700);
        showBubble('Yah, hampir! Coba lagi ya 😊', 2800);
        setTimeout(() => { setMood('idle'); startIdleAnimation(); }, 1000);
      } else if (type === 'celebrate') {
        setMood('happy');
        playAnim('spin', 900);
        showBubble('Luar biasa! Kamu keren sekali! 🌟', 3500);
        setTimeout(() => { setMood('idle'); startIdleAnimation(); }, 1400);
      } else if (type === 'thinking') {
        setMood('thinking');
        playAnim('nod', 900);
        showBubble('Hmm, pikirkan baik-baik ya... 🤔', 2600);
        setTimeout(() => { setMood('idle'); startIdleAnimation(); }, 1200);
      } else if (type === 'wave') {
        setMood('happy');
        playAnim('wave', 1200);
        setTimeout(() => { setMood('idle'); startIdleAnimation(); }, 1400);
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
