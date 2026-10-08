/**
 * Si Wari Global Companion — wari-mascot.js  v4.0
 *
 * Architecture (Multi-layer zero-conflict & zero-flicker):
 *   .wari-companion        = fixed position anchor + entrance animation
 *   .wari-sprite-wrap      = idle looping animation + CSS :hover/:active
 *   .wari-sprite-stage     = expressive WAAPI anims + hover playful animation
 *   .wari-sprite-front     = visible front sprite (cross-dissolves smoothly)
 *   .wari-sprite-back      = hidden back sprite (for seamless zero-flicker mood swap)
 *   .wari-speech           = speech bubble with dark backdrop & independent filters
 *
 * Key features:
 *   1. Zero-Flicker Mood Morph: Uses dual-image cross-dissolve so Wari never blinks out of existence.
 *   2. Responsive Smooth Clicks: Clicks 1-6 play delightful elastic bounce animations on the mascot
 *      without interrupting the speech bubble or expression.
 *   3. Dizzy Rule (7th Click): Only on the 7th click does Wari spin dizzy, change expression, and
 *      complain about being dizzy for 7.2s before easing back to idle.
 *   4. Synchronized Timing: Facial expression & gesture fire first -> speech bubble blooms in at the crest
 *      of the animation (360ms) -> speech stays visible for 7.2s -> bubble fades -> settle buffer (450ms) ->
 *      Wari smoothly returns to idle.
 *   5. Lively Hover: Dynamic spring scale on wrap + playful micro-bobbing on sprite stage.
 */
(function () {
  'use strict';

  // ── Detect asset base path ──────────────────────────────────────────
  const isInPages = window.location.pathname.includes('/pages/');
  const BASE = isInPages ? '../' : './';

  const IMGS = {
    idle:     BASE + 'assets/mascot/wari-idle-clean.png',
    happy:    BASE + 'assets/mascot/wari-happy-clean.png',
    thinking: BASE + 'assets/mascot/wari-thinking.png',
  };

  // ── Preload mood images immediately ─────────────────────────────────
  Object.values(IMGS).forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // ── Page-specific configuration ─────────────────────────────────────
  const PAGE_CONFIGS = {
    default: {
      position: 'br', size: 'md', initMood: 'idle', initAnim: 'wave', idleAnim: 'bob',
      greetings: [
        'Halo! 👋 Saya Si Wari!',
        'Selamat datang di WARISARA!',
        'Yuk, jelajahi budaya Nusantara!',
        'Ada yang bisa kubantu? 😊'
      ],
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
      position: 'br', size: 'md', initMood: 'happy', initAnim: 'wave', idleAnim: 'float',
      greetings: [
        'Halo! Aku Si Wari, maskot WARISARA! 👋',
        'Selamat datang di WARISARA!',
        'Jelajahi 38 Provinsi Nusantara!',
        'Warisan budaya kita luar biasa! 🌺'
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
      position: 'br', size: 'md', initMood: 'happy', initAnim: 'land', idleAnim: 'float',
      greetings: [
        'Semangat belajar hari ini! 🌟',
        'Ilmu adalah harta abadi!',
        'Ayo kerjakan kuisnya! 💪',
        'Budaya kita harus dijaga! 🇮🇩'
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
      position: 'bl', size: 'md', initMood: 'idle', initAnim: 'wave', idleAnim: 'bob',
      greetings: [
        'Ssst... ada cerita menarik! 📖',
        'Kisah leluhur penuh makna~',
        'Simak ceritanya ya! ✨',
        'Buku cerita terbuka untukmu!'
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
      position: 'br', size: 'md', initMood: 'happy', initAnim: 'hop', idleAnim: 'float',
      greetings: [
        '38 Provinsi menunggumu! 🗺️',
        'Jelajahi setiap sudut Nusantara!',
        'Indonesia itu luar biasa! 🌺',
        'Provinsi mana dulu nih?'
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
      position: 'tr', size: 'sm', initMood: 'idle', initAnim: 'wave', idleAnim: 'bob',
      greetings: [
        'Karya pusaka leluhur kita! 🎨',
        'Indahnya seni Nusantara~',
        'Batik, ukiran, tenun... cantik!',
        'Warisan tak ternilai harganya!'
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
      position: 'br', size: 'md', initMood: 'happy', initAnim: 'wave', idleAnim: 'bob',
      greetings: [
        'Para pelestari budaya terbaik! 🌟',
        'Merekalah pahlawan budaya kita!',
        'Inspiratif sekali, bukan? 💪',
        'Yuk dukung para pengrajin kita!'
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
      position: 'bl', size: 'md', initMood: 'happy', initAnim: 'hop', idleAnim: 'float',
      greetings: [
        'Produk lokal berkualitas tinggi! 🛍️',
        'Beli lokal, dukung budaya!',
        'UMKM kita keren-keren lho!',
        'Bangga produk Indonesia! 🇮🇩'
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
      position: 'tr', size: 'sm', initMood: 'thinking', initAnim: 'nod', idleAnim: 'bob',
      greetings: [
        'Tradisi bertemu modernitas! ✨',
        'Heritage yang tetap relevan~',
        'Keren banget kolaborasinya!',
        'Masa lalu yang menginspirasi masa kini!'
      ],
      contextQuotes: [
        { mood: 'thinking', anim: 'think',   text: 'Tradisi & modern bisa berpadu indah! ✨' },
        { mood: 'happy',    anim: 'excited', text: 'Heritage x Modern = inovasi luar biasa! 🔥' },
        { mood: 'idle',     anim: 'nod',     text: 'Inovasi dari akar budaya yang kuat 🌱' },
        { mood: 'thinking', anim: 'think',   text: 'Bagaimana batik bisa tampil di fashion show? 🤔' },
        { mood: 'happy',    anim: 'wave',    text: 'Masa lalu yang menginspirasi masa depan! 🚀' },
        { mood: 'idle',     anim: 'bob',     text: 'Relevansi budaya itu kunci! 🔑' },
      ],
    },
    'creative-lab': {
      position: 'br', size: 'md', initMood: 'happy', initAnim: 'spin', idleAnim: 'float',
      greetings: [
        'Waktunya berkreasi! 🎨',
        'Creative Lab siap meluncur!',
        'Ekspresi budayamu di sini!',
        'Ayo ciptakan sesuatu yang keren!'
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
      position: 'bl', size: 'md', initMood: 'happy', initAnim: 'wave', idleAnim: 'bob',
      greetings: [
        'Teruskan warisan ke generasi berikut! 🤝',
        'Berbagi itu indah!',
        'Budaya hidup dari kita ke kita~',
        'Lestarikan, sebarkan, wariskan!'
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

  // ── State ───────────────────────────────────────────────────────────
  let el             = null;   // .wari-companion (position anchor)
  let wrapEl         = null;   // .wari-sprite-wrap (idle loop + hover container)
  let spriteStageEl  = null;   // .wari-sprite-stage (expressive anim target + hover bobbing)
  let spriteEl       = null;   // img.wari-sprite-front
  let spriteBackEl   = null;   // img.wari-sprite-back (for cross-dissolve)
  let bubbleEl       = null;   // .wari-speech

  let bubbleTimer      = null;
  let contextTimer     = null;
  let quoteSettleTimer = null;
  let currentMood      = 'idle';
  let cfg              = null;
  let isReacting       = false;
  let contextQuoteIdx  = 0;
  let clickCount       = 0;
  let clickAnimIdx     = 0;

  let activeExpressiveAnim = null;
  let activeMoodAnimFront  = null;
  let activeMoodAnimBack   = null;

  // ── Idle CSS classes (applied to wrapEl) ───────────────────────────
  const ALL_IDLE_CLASSES = [
    'wari-idle-float', 'wari-idle-bob', 'wari-idle-breath',
    'wari-idle-happyglow', 'wari-idle-glow',
  ];

  // ── Web Animations API keyframes ────────────────────────────────────
  const WAAPI_ANIMS = {
    // Gestures
    wave: {
      frames: [
        { transform: 'rotate(0deg) scale(1) translateY(0)',         offset: 0    },
        { transform: 'rotate(-20deg) scale(1.12) translateY(-6px)', offset: 0.07 },
        { transform: 'rotate(16deg) scale(1.10) translateY(-12px)', offset: 0.20 },
        { transform: 'rotate(-14deg) scale(1.12) translateY(-7px)', offset: 0.34 },
        { transform: 'rotate(11deg) scale(1.07) translateY(-4px)',  offset: 0.48 },
        { transform: 'rotate(-8deg) scale(1.04) translateY(-2px)',  offset: 0.62 },
        { transform: 'rotate(4deg) scale(1.02) translateY(-1px)',   offset: 0.76 },
        { transform: 'rotate(-1.5deg) scale(1.005)',                offset: 0.90 },
        { transform: 'rotate(0deg) scale(1) translateY(0)',         offset: 1    },
      ],
      options: { duration: 1500, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    hop: {
      frames: [
        { transform: 'translateY(0) scaleX(1) scaleY(1) rotate(0deg)',           offset: 0    },
        { transform: 'translateY(-14px) scaleX(0.88) scaleY(1.14) rotate(-5deg)', offset: 0.09 },
        { transform: 'translateY(-52px) scaleX(0.92) scaleY(1.12) rotate(7deg)',   offset: 0.28 },
        { transform: 'translateY(-63px) scaleX(0.95) scaleY(1.08) rotate(3.5deg)', offset: 0.44 },
        { transform: 'translateY(-26px) scaleX(0.99) scaleY(1.02) rotate(-1deg)',  offset: 0.60 },
        { transform: 'translateY(9px) scaleX(1.15) scaleY(0.85)',                offset: 0.74 },
        { transform: 'translateY(-7px) scaleX(0.96) scaleY(1.05)',               offset: 0.84 },
        { transform: 'translateY(2px) scaleX(1.02) scaleY(0.99)',                offset: 0.93 },
        { transform: 'translateY(0) scaleX(1) scaleY(1) rotate(0deg)',           offset: 1    },
      ],
      options: { duration: 1000, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    excited: {
      frames: [
        { transform: 'translateY(0) rotate(0deg) scale(1)',           offset: 0    },
        { transform: 'translateY(-20px) rotate(-7deg) scale(1.13)',   offset: 0.07 },
        { transform: 'translateY(-5px) rotate(6deg) scale(1.07)',     offset: 0.16 },
        { transform: 'translateY(-22px) rotate(-6.5deg) scale(1.15)', offset: 0.26 },
        { transform: 'translateY(-4px) rotate(5.5deg) scale(1.07)',  offset: 0.36 },
        { transform: 'translateY(-18px) rotate(-5deg) scale(1.12)',  offset: 0.46 },
        { transform: 'translateY(-3px) rotate(3.5deg) scale(1.06)',  offset: 0.56 },
        { transform: 'translateY(-12px) rotate(-2.5deg) scale(1.09)', offset: 0.66 },
        { transform: 'translateY(-2px) rotate(1.5deg) scale(1.04)',  offset: 0.76 },
        { transform: 'translateY(5px) scaleX(1.11) scaleY(0.89)',    offset: 0.86 },
        { transform: 'translateY(-2px) scale(1.01)',                  offset: 0.94 },
        { transform: 'translateY(0) rotate(0deg) scale(1)',           offset: 1    },
      ],
      options: { duration: 1300, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    spin: {
      frames: [
        { transform: 'rotate(0deg) scale(1)',     offset: 0    },
        { transform: 'rotate(82deg) scale(1.17)', offset: 0.16 },
        { transform: 'rotate(190deg) scale(1.23)',offset: 0.42 },
        { transform: 'rotate(298deg) scale(1.15)',offset: 0.70 },
        { transform: 'rotate(348deg) scale(1.04)',offset: 0.88 },
        { transform: 'rotate(360deg) scale(1)',   offset: 1    },
      ],
      options: { duration: 1000, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    nod: {
      frames: [
        { transform: 'rotate(0deg) translateY(0)',      offset: 0    },
        { transform: 'rotate(-11deg) translateY(-5px)', offset: 0.12 },
        { transform: 'rotate(13deg) translateY(-2px)',  offset: 0.28 },
        { transform: 'rotate(-9deg) translateY(-4px)',  offset: 0.44 },
        { transform: 'rotate(8deg) translateY(-1px)',   offset: 0.60 },
        { transform: 'rotate(-3deg) translateY(-2px)',  offset: 0.76 },
        { transform: 'rotate(1deg) translateY(0)',      offset: 0.90 },
        { transform: 'rotate(0deg) translateY(0)',      offset: 1    },
      ],
      options: { duration: 1200, easing: 'ease-in-out', fill: 'none' },
    },
    shiver: {
      frames: [
        { transform: 'rotate(0deg) translateX(0) scaleX(1)',           offset: 0   },
        { transform: 'rotate(-6.5deg) translateX(-5px) scaleX(0.95)',  offset: 0.1 },
        { transform: 'rotate(6.5deg) translateX(5px) scaleX(1.05)',    offset: 0.2 },
        { transform: 'rotate(-5.5deg) translateX(-4px) scaleX(0.96)',  offset: 0.3 },
        { transform: 'rotate(5.5deg) translateX(4px) scaleX(1.04)',    offset: 0.4 },
        { transform: 'rotate(-4deg) translateX(-3.5px)',                offset: 0.5 },
        { transform: 'rotate(4deg) translateX(3.5px)',                  offset: 0.6 },
        { transform: 'rotate(-2.5deg) translateX(-2px)',                offset: 0.7 },
        { transform: 'rotate(2.5deg) translateX(2px)',                  offset: 0.8 },
        { transform: 'rotate(-1deg) translateX(-1px)',                  offset: 0.9 },
        { transform: 'rotate(0deg) translateX(0)',                      offset: 1   },
      ],
      options: { duration: 800, easing: 'ease-in-out', fill: 'none' },
    },
    think: {
      frames: [
        { transform: 'rotate(0deg) translateX(0)',                           offset: 0    },
        { transform: 'rotate(-7.5deg) translateX(-3.5px) translateY(-4px)', offset: 0.12 },
        { transform: 'rotate(5.5deg) translateX(2.5px) translateY(-7px)',   offset: 0.26 },
        { transform: 'rotate(-6.5deg) translateX(-3px) translateY(-4px)',   offset: 0.40 },
        { transform: 'rotate(4.5deg) translateX(2.5px) translateY(-5.5px)', offset: 0.54 },
        { transform: 'rotate(-4deg) translateX(-2px) translateY(-3px)',     offset: 0.68 },
        { transform: 'rotate(2.5deg) translateX(1px) translateY(-1px)',     offset: 0.82 },
        { transform: 'rotate(-0.8deg) translateX(0)',                       offset: 0.93 },
        { transform: 'rotate(0deg) translateX(0)',                          offset: 1    },
      ],
      options: { duration: 1600, easing: 'ease-in-out', fill: 'none' },
    },
    bounce: {
      frames: [
        { transform: 'translateY(0) scaleX(1) scaleY(1)',           offset: 0    },
        { transform: 'translateY(-9px) scaleX(0.93) scaleY(1.09)',  offset: 0.10 },
        { transform: 'translateY(-38px) scaleX(0.89) scaleY(1.13)', offset: 0.26 },
        { transform: 'translateY(-60px) scaleX(0.91) scaleY(1.11)', offset: 0.40 },
        { transform: 'translateY(-40px) scaleX(0.94) scaleY(1.07)', offset: 0.56 },
        { transform: 'translateY(7px) scaleX(1.17) scaleY(0.83)',   offset: 0.68 },
        { transform: 'translateY(-18px) scaleX(0.94) scaleY(1.09)', offset: 0.78 },
        { transform: 'translateY(4px) scaleX(1.07) scaleY(0.93)',   offset: 0.87 },
        { transform: 'translateY(-7px) scaleX(0.98) scaleY(1.03)',  offset: 0.94 },
        { transform: 'translateY(0) scaleX(1) scaleY(1)',           offset: 1    },
      ],
      options: { duration: 1000, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    tada: {
      frames: [
        { transform: 'scale(1) rotate(0deg)',      offset: 0    },
        { transform: 'scale(0.93) rotate(-3.5deg)',offset: 0.06 },
        { transform: 'scale(1.13) rotate(3.5deg)', offset: 0.20 },
        { transform: 'scale(1.13) rotate(-3.5deg)',offset: 0.30 },
        { transform: 'scale(1.13) rotate(3.5deg)', offset: 0.40 },
        { transform: 'scale(1.13) rotate(-3.5deg)',offset: 0.50 },
        { transform: 'scale(1.13) rotate(3.5deg)', offset: 0.60 },
        { transform: 'scale(1.17) rotate(2.5deg)', offset: 0.74 },
        { transform: 'scale(1.07) rotate(-1.2deg)',offset: 0.88 },
        { transform: 'scale(1) rotate(0deg)',      offset: 1    },
      ],
      options: { duration: 1050, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    wobble: {
      frames: [
        { transform: 'translateX(0) rotate(0deg)',         offset: 0    },
        { transform: 'translateX(-15px) rotate(-5.5deg)',  offset: 0.12 },
        { transform: 'translateX(13px) rotate(4.5deg)',    offset: 0.24 },
        { transform: 'translateX(-11px) rotate(-3deg)',    offset: 0.36 },
        { transform: 'translateX(9px) rotate(2.2deg)',     offset: 0.48 },
        { transform: 'translateX(-7px) rotate(-1.5deg)',   offset: 0.60 },
        { transform: 'translateX(5px) rotate(0.9deg)',     offset: 0.72 },
        { transform: 'translateX(-3px) rotate(-0.4deg)',   offset: 0.84 },
        { transform: 'translateX(1.5px) rotate(0.2deg)',   offset: 0.92 },
        { transform: 'translateX(0) rotate(0deg)',         offset: 1    },
      ],
      options: { duration: 900, easing: 'ease-in-out', fill: 'none' },
    },
    land: {
      frames: [
        { transform: 'translateY(-110px) scaleX(1) scaleY(1) rotate(-20deg)',    offset: 0    },
        { transform: 'translateY(12px) scaleX(1.20) scaleY(0.80) rotate(3.5deg)', offset: 0.44 },
        { transform: 'translateY(-9px) scaleX(0.93) scaleY(1.07) rotate(-2.5deg)', offset: 0.62 },
        { transform: 'translateY(4px) scaleX(1.04) scaleY(0.96) rotate(1deg)',   offset: 0.78 },
        { transform: 'translateY(-2px) scaleX(0.99) scaleY(1.01)',               offset: 0.90 },
        { transform: 'translateY(0) scaleX(1) scaleY(1) rotate(0deg)',           offset: 1    },
      ],
      options: { duration: 880, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'none' },
    },
    bob: {
      frames: [
        { transform: 'translateY(0) rotate(-0.6deg)',    offset: 0    },
        { transform: 'translateY(-13px) rotate(0.9deg)', offset: 0.35 },
        { transform: 'translateY(-7px) rotate(-0.4deg)', offset: 0.65 },
        { transform: 'translateY(0) rotate(-0.6deg)',    offset: 1    },
      ],
      options: { duration: 1400, easing: 'cubic-bezier(0.45,0,0.55,1)', fill: 'none' },
    },
    // Dizzy reaction on the 7th click
    dizzy: {
      frames: [
        { transform: 'rotate(0deg) scale(1) translateY(0)',                           offset: 0    },
        { transform: 'rotate(120deg) scale(1.18) translateY(-14px)',                  offset: 0.15 },
        { transform: 'rotate(240deg) scale(1.22) translateY(-18px)',                  offset: 0.30 },
        { transform: 'rotate(360deg) scale(1.12) translateY(-8px)',                   offset: 0.45 },
        { transform: 'translateX(-16px) rotate(-12deg) scale(0.96) translateY(4px)',  offset: 0.58 },
        { transform: 'translateX(14px) rotate(10deg) scale(1.02) translateY(-2px)',   offset: 0.70 },
        { transform: 'translateX(-10px) rotate(-7deg) scale(0.98)',                   offset: 0.80 },
        { transform: 'translateX(6px) rotate(4deg) scale(1.01)',                      offset: 0.90 },
        { transform: 'translateX(0) rotate(0deg) scale(1) translateY(0)',             offset: 1    },
      ],
      options: { duration: 1800, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },

    // ── Dedicated Elastic Click Animations (Clicks 1 to 6) ─────────────
    clickBounce1: {
      frames: [
        { transform: 'scale(1) translateY(0)',                  offset: 0    },
        { transform: 'scale(1.14, 0.88) translateY(6px)',       offset: 0.18 },
        { transform: 'scale(0.92, 1.14) translateY(-18px)',     offset: 0.42 },
        { transform: 'scale(1.05, 0.96) translateY(-4px)',      offset: 0.68 },
        { transform: 'scale(0.98, 1.02) translateY(1px)',       offset: 0.86 },
        { transform: 'scale(1) translateY(0)',                  offset: 1    },
      ],
      options: { duration: 520, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    clickBounce2: {
      frames: [
        { transform: 'rotate(0deg) scale(1) translateY(0)',             offset: 0    },
        { transform: 'rotate(-9deg) scale(1.10, 0.92) translateY(-6px)',offset: 0.22 },
        { transform: 'rotate(8deg) scale(0.95, 1.08) translateY(-16px)',offset: 0.48 },
        { transform: 'rotate(-3deg) scale(1.02) translateY(-3px)',      offset: 0.72 },
        { transform: 'rotate(0deg) scale(1) translateY(0)',             offset: 1    },
      ],
      options: { duration: 560, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    clickBounce3: {
      frames: [
        { transform: 'rotate(0deg) scale(1) translateY(0)',             offset: 0    },
        { transform: 'rotate(10deg) scale(1.08, 0.94) translateY(-8px)',offset: 0.20 },
        { transform: 'rotate(-7deg) scale(0.96, 1.07) translateY(-15px)',offset: 0.46 },
        { transform: 'rotate(2.5deg) scale(1.02) translateY(-2px)',    offset: 0.72 },
        { transform: 'rotate(0deg) scale(1) translateY(0)',             offset: 1    },
      ],
      options: { duration: 560, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    clickBounce4: {
      frames: [
        { transform: 'translateY(0) scale(1)',            offset: 0    },
        { transform: 'translateY(-14px) scale(0.94, 1.12)', offset: 0.25 },
        { transform: 'translateY(5px) scale(1.09, 0.92)',  offset: 0.55 },
        { transform: 'translateY(-3px) scale(0.98, 1.02)', offset: 0.80 },
        { transform: 'translateY(0) scale(1)',            offset: 1    },
      ],
      options: { duration: 480, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    clickBounce5: {
      frames: [
        { transform: 'scale(1) rotate(0deg) translateY(0)',             offset: 0    },
        { transform: 'scale(1.12, 0.90) rotate(-5deg) translateY(5px)', offset: 0.20 },
        { transform: 'scale(0.94, 1.11) rotate(6deg) translateY(-17px)',offset: 0.46 },
        { transform: 'scale(1.04, 0.97) rotate(-2deg) translateY(-2px)',offset: 0.72 },
        { transform: 'scale(1) rotate(0deg) translateY(0)',             offset: 1    },
      ],
      options: { duration: 540, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
    clickBounce6: {
      frames: [
        { transform: 'translateY(0) scale(1)',            offset: 0    },
        { transform: 'translateY(-24px) scale(0.90, 1.16)', offset: 0.28 },
        { transform: 'translateY(7px) scale(1.12, 0.88)',  offset: 0.60 },
        { transform: 'translateY(-4px) scale(0.97, 1.03)', offset: 0.82 },
        { transform: 'translateY(0) scale(1)',            offset: 1    },
      ],
      options: { duration: 580, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'none' },
    },
  };

  const CLICK_ANIMS = [
    'clickBounce1', 'clickBounce2', 'clickBounce3',
    'clickBounce4', 'clickBounce5', 'clickBounce6'
  ];

  // ── Page detection ──────────────────────────────────────────────────
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

  // ── DOM building ────────────────────────────────────────────────────
  function buildMascot () {
    const page = detectPage();
    cfg = PAGE_CONFIGS[page] || PAGE_CONFIGS.default;

    // Position anchor
    el = document.createElement('div');
    el.className = `wari-companion wari-companion-${cfg.position}`;
    el.id = 'wari-global-companion';
    el.setAttribute('role', 'complementary');
    el.setAttribute('aria-label', 'Si Wari — Maskot WARISARA');

    // Hover + idle layer (wrap)
    wrapEl = document.createElement('div');
    wrapEl.className = 'wari-sprite-wrap';
    el.appendChild(wrapEl);

    // Speech bubble (inside wrapEl so it floats smoothly along with idle bob)
    bubbleEl = document.createElement('div');
    bubbleEl.className = 'wari-speech ' + getSpeechTipClass(cfg.position);
    positionBubble(cfg.position, bubbleEl);
    wrapEl.appendChild(bubbleEl);

    // Sprite stage container for expressive animations and lively hover bobs
    spriteStageEl = document.createElement('div');
    spriteStageEl.className = 'wari-sprite-stage';
    wrapEl.appendChild(spriteStageEl);

    // Front sprite image (visible layer)
    spriteEl = document.createElement('img');
    spriteEl.className = `wari-sprite wari-sprite-front wari-sprite-${cfg.size}`;
    spriteEl.src = IMGS[cfg.initMood] || IMGS.idle;
    spriteEl.alt = 'Si Wari Maskot';
    spriteEl.draggable = false;
    spriteStageEl.appendChild(spriteEl);

    // Back sprite image (for zero-flicker cross-dissolve mood morphing)
    spriteBackEl = document.createElement('img');
    spriteBackEl.className = `wari-sprite wari-sprite-back wari-sprite-${cfg.size}`;
    spriteBackEl.src = IMGS[cfg.initMood] || IMGS.idle;
    spriteBackEl.alt = '';
    spriteBackEl.draggable = false;
    spriteStageEl.appendChild(spriteBackEl);

    document.body.appendChild(el);

    // Events on wrapEl
    wrapEl.addEventListener('click',      onWrapClick);
    wrapEl.addEventListener('mousemove',  onWrapMouseMove);
    wrapEl.addEventListener('mouseleave', onWrapMouseLeave);

    // Start idle animation after entrance, then greet smoothly
    setTimeout(() => {
      startIdleAnimation();
      greet();
    }, 1200);

    // Context quotes (starts after greet finishes with calm spacing)
    setTimeout(() => startContextQuoteLoop(), 10500);
  }

  function getSpeechTipClass (pos) {
    const map = { br: 'tip-right', bl: 'tip-left', tr: 'tip-right', tl: 'tip-left' };
    return map[pos] || 'tip-bottom';
  }

  function positionBubble (pos, bubble) {
    if (pos === 'br' || pos === 'tr') {
      bubble.style.right = 'calc(100% + 14px)';
      bubble.style.left = 'auto';
      bubble.style.top = '50%';
      bubble.style.bottom = 'auto';
    } else if (pos === 'bl' || pos === 'tl') {
      bubble.style.left = 'calc(100% + 14px)';
      bubble.style.right = 'auto';
      bubble.style.top = '50%';
      bubble.style.bottom = 'auto';
    } else {
      bubble.style.right = 'calc(100% + 14px)';
      bubble.style.left = 'auto';
      bubble.style.top = '50%';
      bubble.style.bottom = 'auto';
    }
  }

  // ── IDLE ANIMATION — runs on wrapEl, never restarted abruptly ──────
  function startIdleAnimation () {
    if (!wrapEl) return;
    ALL_IDLE_CLASSES.forEach(c => wrapEl.classList.remove(c));
    if (currentMood === 'happy') {
      wrapEl.classList.add('wari-idle-happyglow');
    } else if (currentMood === 'thinking') {
      wrapEl.classList.add('wari-idle-breath');
    } else {
      wrapEl.classList.add(cfg.idleAnim === 'float' ? 'wari-idle-float' : 'wari-idle-bob');
    }
  }

  // ── EXPRESSIVE ANIMATION — Web Animations API on spriteStageEl ─────
  function playAnim (anim) {
    const target = spriteStageEl || spriteEl;
    if (!target) return;
    const def = WAAPI_ANIMS[anim];
    if (!def) return;

    // Gracefully cancel any running expressive animation
    if (activeExpressiveAnim) {
      try { activeExpressiveAnim.cancel(); } catch (e) {}
      activeExpressiveAnim = null;
    }

    const a = target.animate(def.frames, def.options);
    activeExpressiveAnim = a;

    // On completion, cancel effect so CSS hover animations can run cleanly
    a.onfinish = () => {
      if (activeExpressiveAnim === a) {
        try { a.cancel(); } catch (e) {}
        activeExpressiveAnim = null;
      }
    };
    return a;
  }

  // ── MOOD SWAP — Zero-flicker dual-layer cross-dissolve ──────────────
  function setMood (mood, silent) {
    if (!spriteEl || !spriteBackEl) return;
    currentMood = mood;
    const src = IMGS[mood] || IMGS.idle;
    const currentSrc = spriteEl.getAttribute('src') || '';
    const targetSuffix = src.replace('../', '').replace('./', '');
    const sameImg = currentSrc.endsWith(targetSuffix);

    if (sameImg) {
      if (!silent) startIdleAnimation();
      return;
    }

    if (activeMoodAnimFront) {
      try { activeMoodAnimFront.cancel(); } catch (e) {}
      activeMoodAnimFront = null;
    }
    if (activeMoodAnimBack) {
      try { activeMoodAnimBack.cancel(); } catch (e) {}
      activeMoodAnimBack = null;
    }

    // Set new image on back layer while front is still showing
    spriteBackEl.src = src;
    spriteBackEl.style.opacity = '0';
    spriteEl.style.opacity = '1';

    // Cross-dissolve: front eases out, back blooms in seamlessly
    activeMoodAnimFront = spriteEl.animate(
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.95)' }
      ],
      { duration: 320, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
    );

    activeMoodAnimBack = spriteBackEl.animate(
      [
        { opacity: 0, transform: 'scale(1.05)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      { duration: 340, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' }
    );

    activeMoodAnimBack.onfinish = () => {
      spriteEl.src = src;
      try { activeMoodAnimFront.cancel(); } catch (e) {}
      try { activeMoodAnimBack.cancel(); } catch (e) {}
      activeMoodAnimFront = null;
      activeMoodAnimBack = null;
      spriteEl.style.opacity = '1';
      spriteBackEl.style.opacity = '0';
      if (!silent) startIdleAnimation();
    };
  }

  // ── SPEECH BUBBLE ───────────────────────────────────────────────────
  function showBubble (text, duration) {
    duration = duration || 7200;
    if (!bubbleEl) return;
    clearTimeout(bubbleTimer);
    if (bubbleEl.classList.contains('visible')) {
      bubbleEl.classList.remove('visible');
      setTimeout(() => _showBubbleInner(text, duration), 220);
    } else {
      _showBubbleInner(text, duration);
    }
  }

  function _showBubbleInner (text, duration) {
    if (!bubbleEl) return;
    bubbleEl.textContent = text;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (bubbleEl) bubbleEl.classList.add('visible');
    }));
    bubbleTimer = setTimeout(() => {
      if (bubbleEl) bubbleEl.classList.remove('visible');
    }, duration);
  }

  // ── GREET ───────────────────────────────────────────────────────────
  function greet () {
    const msg = cfg.greetings[Math.floor(Math.random() * cfg.greetings.length)];

    // 1. Ekspresi ceria dan animasi salam awal
    setMood('happy', true);
    playAnim(cfg.initAnim || 'wave');

    // 2. Balon ucapan muncul tepat saat gestur sudah terbentuk (360ms)
    setTimeout(() => {
      showBubble(msg, 7200);
    }, 360);

    // 3. Setelah komentar 7.2s memudar, beri jeda tenang baru rileks ke idle
    clearTimeout(quoteSettleTimer);
    quoteSettleTimer = setTimeout(() => {
      if (!isReacting) setMood('idle');
    }, 7200 + 450);
  }

  // ── CONTEXT QUOTE LOOP ──────────────────────────────────────────────
  function startContextQuoteLoop () { runContextQuote(); }

  function runContextQuote () {
    if (!cfg || !cfg.contextQuotes) { scheduleNextContextQuote(); return; }
    if (document.hidden || isReacting) { scheduleNextContextQuote(); return; }
    const quotes = cfg.contextQuotes;
    const ev = quotes[contextQuoteIdx % quotes.length];
    contextQuoteIdx++;

    // 1. Maskot ganti ekspresi dan mulai bergerak (animasi gestur selaras)
    setMood(ev.mood, true);
    playAnim(ev.anim);

    // 2. Balon komentar muncul harmonis di puncak gestur (360ms)
    setTimeout(() => {
      if (!isReacting) showBubble(ev.text, 7200);
    }, 360);

    // 3. Setelah komentar 7.2 detik selesai memudar, maskot kembali ke idle secara halus
    clearTimeout(quoteSettleTimer);
    quoteSettleTimer = setTimeout(() => {
      if (!isReacting) setMood('idle');
    }, 7200 + 450);

    // Jeda 5 detik tenang sebelum komentar berikutnya
    scheduleNextContextQuote(12500);
  }

  function scheduleNextContextQuote (delay) {
    clearTimeout(contextTimer);
    contextTimer = setTimeout(runContextQuote, delay || 12500);
  }

  // ── MOUSE PARALLAX TILT ─────────────────────────────────────────────
  function onWrapMouseMove (e) {
    if (!wrapEl) return;
    const rect = wrapEl.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const tiltX = (-dy * 9).toFixed(1);
    const tiltY = ( dx * 9).toFixed(1);
    wrapEl.style.setProperty('--tilt-x', `${tiltX}deg`);
    wrapEl.style.setProperty('--tilt-y', `${tiltY}deg`);
    wrapEl.classList.add('wari-tilt');
  }

  function onWrapMouseLeave () {
    if (!wrapEl) return;
    wrapEl.classList.remove('wari-tilt');
    wrapEl.style.removeProperty('--tilt-x');
    wrapEl.style.removeProperty('--tilt-y');
  }

  // ── CLICK HANDLER ──────────────────────────────────────────────────
  const DIZZY_MSGS = [
    'Aduhh... pusinggg~ Kebanyakan diklik! 😵‍💫💫',
    'Pusing~ Berputar-putar rasanya! 😵‍💫✨',
    'Duh... kepalaku keliyengan, pelan-pelan ya! 😵‍💫🌀',
  ];

  function onWrapClick (e) {
    if (e) e.stopPropagation();
    clickCount++;

    // Klik 1 s/d 6: Tetap mainkan animasi elastis yang halus & lincah,
    // TETAPI comment dan ekspresi TIDAK ganti sama sekali!
    if (clickCount < 7) {
      const animName = CLICK_ANIMS[clickAnimIdx % CLICK_ANIMS.length];
      clickAnimIdx++;
      playAnim(animName);

      clearTimeout(onWrapClick._reset);
      onWrapClick._reset = setTimeout(() => { clickCount = 0; }, 15000);
      return;
    }

    // Tepat pada klik ke-7: reset hitungan dan picu reaksi pusing
    clickCount = 0;
    clearTimeout(onWrapClick._reset);

    isReacting = true;
    clearTimeout(quoteSettleTimer);

    const msg = DIZZY_MSGS[Math.floor(Math.random() * DIZZY_MSGS.length)];

    // Ekspresi pusing (thinking mood) + animasi putar pusing
    setMood('thinking', true);
    playAnim('dizzy');

    // Komentar pusing muncul pas di puncak putaran pusing (320ms)
    setTimeout(() => {
      showBubble(msg, 7200);
    }, 320);

    // Durasi pusing 7.2 detik, setelah memudar maskot rileks kembali ke idle
    setTimeout(() => {
      isReacting = false;
      setMood('idle');
    }, 7200 + 450);

    // Tunda siklus context quote agar komentar pusing tampil utuh
    scheduleNextContextQuote(12500);
  }

  // ── PUBLIC API ──────────────────────────────────────────────────────
  window.WariMascot = {
    react: function (type) {
      if (!spriteEl) return;
      isReacting = true;
      if (type === 'correct') {
        setMood('happy', true);
        playAnim('excited');
        setTimeout(() => showBubble('Mantap! Jawaban benar! 🎉', 3200), 320);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 3600);
      } else if (type === 'wrong') {
        setMood('thinking', true);
        playAnim('shiver');
        setTimeout(() => showBubble('Yah, hampir! Coba lagi ya 😊', 3200), 320);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 3600);
      } else if (type === 'celebrate') {
        setMood('happy', true);
        playAnim('tada');
        setTimeout(() => showBubble('Luar biasa! Kamu keren sekali! 🌟', 4000), 320);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 4400);
      } else if (type === 'thinking') {
        setMood('thinking', true);
        playAnim('think');
        setTimeout(() => showBubble('Hmm, pikirkan baik-baik ya... 🤔', 3200), 320);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 3600);
      } else if (type === 'wave') {
        setMood('happy', true);
        playAnim('wave');
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1800);
      } else {
        isReacting = false;
      }
    },
    say: function (text, duration) { showBubble(text, duration || 7200); },
    setMood: setMood,
    playAnim: playAnim,
  };

  // ── INIT ────────────────────────────────────────────────────────────
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
