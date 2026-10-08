/**
 * Si Wari Global Companion — wari-mascot.js  v3.0
 *
 * Architecture (two-layer, zero-conflict):
 *   .wari-companion        = fixed position anchor + entrance animation
 *   .wari-sprite-wrap      = idle looping animation + CSS :hover/:active
 *   img.wari-sprite        = expressive one-shots via Web Animations API
 *
 * Why this is smooth:
 *   1. Idle animation runs on wrapEl — NEVER interrupted or restarted.
 *   2. Expressive animations run on spriteEl via WAAPI — no class-swap jank,
 *      no forced reflow (void offsetWidth removed entirely).
 *   3. Hover/active handled purely by CSS :hover on wrapEl — no competing JS
 *      inline styles on the animated element.
 *   4. setMood() uses WAAPI opacity animation — never touches transform.
 *   5. Mouse parallax tilt on hover via CSS custom props.
 *
 * NOTE: Skips 'belajar' page which has its own dedicated mascot system.
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

  // ── Page-specific configuration ─────────────────────────────────────
  const PAGE_CONFIGS = {
    default: {
      position: 'br', size: 'md', initMood: 'idle', initAnim: 'wave', idleAnim: 'bob',
      greetings: ['Halo! 👋 Saya Si Wari!','Selamat datang di WARISARA!','Yuk, jelajahi budaya Nusantara!','Ada yang bisa kubantu? 😊'],
      contextQuotes: [
        { mood:'happy',    anim:'wave',    text:'Indonesia kaya budaya! 🌺' },
        { mood:'idle',     anim:'bob',     text:'Lestarikan warisan leluhur 🌿' },
        { mood:'thinking', anim:'think',   text:'Kamu sudah tahu batik Pekalongan? 🤔' },
        { mood:'happy',    anim:'excited', text:'Yuk eksplorasi bareng! 🎉' },
        { mood:'idle',     anim:'nod',     text:'34 bahasa daerah hampir punah... 😢' },
        { mood:'happy',    anim:'hop',     text:'Budaya kita mendunia! 🌍' },
        { mood:'thinking', anim:'think',   text:'Warisan takbenda itu penting lho~' },
        { mood:'happy',    anim:'wave',    text:'Klik aku kapan saja! 😄' },
      ],
    },
    index: {
      position: 'br', size: 'md', initMood: 'happy', initAnim: 'wave', idleAnim: 'float',
      greetings: ['Halo! Aku Si Wari, maskot WARISARA! 👋','Selamat datang di WARISARA!','Jelajahi 38 Provinsi Nusantara!','Warisan budaya kita luar biasa! 🌺'],
      contextQuotes: [
        { mood:'happy',    anim:'wave',    text:'Selamat datang di WARISARA! 🏛️' },
        { mood:'happy',    anim:'hop',     text:'38 Provinsi menunggumu di peta! 🗺️' },
        { mood:'thinking', anim:'think',   text:'Provinsi mana yang belum kamu jelajahi?' },
        { mood:'happy',    anim:'excited', text:'Indonesia itu luar biasa indah! 🌺' },
        { mood:'idle',     anim:'nod',     text:'Coba klik provinsi di peta interaktif! 👇' },
        { mood:'happy',    anim:'wave',    text:'Dari Sabang sampai Merauke~ 🌊' },
        { mood:'thinking', anim:'think',   text:'Sudah tahu Raja Ampat ada di Papua Barat? 🐠' },
        { mood:'happy',    anim:'hop',     text:'Banyak kejutan di setiap provinsi! ✨' },
        { mood:'idle',     anim:'bob',     text:'Scroll ke bawah yuk! Ada banyak hal seru~' },
        { mood:'happy',    anim:'wave',    text:'WARISARA — Warisan Rasa Kita! 🤝' },
      ],
    },
    belajar: {
      position:'br', size:'md', initMood:'happy', initAnim:'land', idleAnim:'float',
      greetings: ['Semangat belajar hari ini! 🌟','Ilmu adalah harta abadi!','Ayo kerjakan kuisnya! 💪','Budaya kita harus dijaga! 🇮🇩'],
      contextQuotes: [
        { mood:'happy',    anim:'wave',    text:'Semangat belajar! 📚' },
        { mood:'thinking', anim:'think',   text:'Sudah siap ujian budaya? 🤔' },
        { mood:'happy',    anim:'excited', text:'Ayo tunjukkan kemampuanmu! 💪' },
        { mood:'idle',     anim:'nod',     text:'Belajar budaya itu menyenangkan! 🌿' },
        { mood:'happy',    anim:'hop',     text:'Kuis budaya menanti! Siap? 🎯' },
      ],
    },
    cerita: {
      position:'bl', size:'md', initMood:'idle', initAnim:'wave', idleAnim:'bob',
      greetings: ['Ssst... ada cerita menarik! 📖','Kisah leluhur penuh makna~','Simak ceritanya ya! ✨','Buku cerita terbuka untukmu!'],
      contextQuotes: [
        { mood:'idle',     anim:'bob',     text:'Cerita rakyat itu harta tak ternilai 📜' },
        { mood:'thinking', anim:'think',   text:'Sudah baca legenda Danau Toba? 🌊' },
        { mood:'happy',    anim:'wave',    text:'Kisah yang indah, bukan? ✨' },
        { mood:'idle',     anim:'nod',     text:'Setiap cerita menyimpan kearifan lokal~' },
        { mood:'thinking', anim:'think',   text:'Apa cerita favorit dari daerahmu? 🤔' },
        { mood:'happy',    anim:'excited', text:'Mari lestarikan cerita leluhur! 📖' },
        { mood:'idle',     anim:'bob',     text:'Warisan lisan yang berharga... 🌙' },
        { mood:'happy',    anim:'wave',    text:'Aku suka cerita rakyat! Kamu? 😊' },
      ],
    },
    jelajahi: {
      position:'br', size:'md', initMood:'happy', initAnim:'hop', idleAnim:'float',
      greetings: ['38 Provinsi menunggumu! 🗺️','Jelajahi setiap sudut Nusantara!','Indonesia itu luar biasa! 🌺','Provinsi mana dulu nih?'],
      contextQuotes: [
        { mood:'happy',    anim:'hop',     text:'38 Provinsi, tak ada habisnya dijelajahi! 🗺️' },
        { mood:'thinking', anim:'think',   text:'Sudah tahu Tari Saman dari Aceh? 💃' },
        { mood:'happy',    anim:'excited', text:'Nusantara sangat kaya ragam budaya! 🌺' },
        { mood:'idle',     anim:'nod',     text:'Dari Sabang sampai Merauke~ 🌊' },
        { mood:'happy',    anim:'wave',    text:'Coba jelajahi Kalimantan! Penuh keajaiban 🌴' },
        { mood:'thinking', anim:'think',   text:'Rumah adat Toraja itu unik sekali lho... 🏠' },
        { mood:'happy',    anim:'hop',     text:'Bali indah, tapi NTT lebih mengejutkan! ✨' },
        { mood:'idle',     anim:'bob',     text:'Setiap provinsi punya cerita sendiri~ 📖' },
      ],
    },
    warisan: {
      position:'tr', size:'sm', initMood:'idle', initAnim:'wave', idleAnim:'bob',
      greetings: ['Karya pusaka leluhur kita! 🎨','Indahnya seni Nusantara~','Batik, ukiran, tenun... cantik!','Warisan tak ternilai harganya!'],
      contextQuotes: [
        { mood:'idle',     anim:'bob',     text:'Seni tradisional itu luar biasa! 🎨' },
        { mood:'thinking', anim:'think',   text:'Batik sudah diakui UNESCO lho! 🏅' },
        { mood:'happy',    anim:'wave',    text:'Tenun ikat begitu indah dan rumit~' },
        { mood:'idle',     anim:'nod',     text:'Pusaka kita harus dijaga 🏛️' },
        { mood:'thinking', anim:'think',   text:'Keris punya makna spiritual mendalam 🗡️' },
        { mood:'happy',    anim:'excited', text:'Warisan takbenda mendunia! 🌍' },
        { mood:'idle',     anim:'bob',     text:'Begitu banyak keindahan di sini! ✨' },
      ],
    },
    makers: {
      position:'br', size:'md', initMood:'happy', initAnim:'wave', idleAnim:'bob',
      greetings: ['Para pelestari budaya terbaik! 🌟','Merekalah pahlawan budaya kita!','Inspiratif sekali, bukan? 💪','Yuk dukung para pengrajin kita!'],
      contextQuotes: [
        { mood:'happy',    anim:'wave',    text:'Para maestro kebudayaan sejati! 🎭' },
        { mood:'idle',     anim:'nod',     text:'Mereka menjaga tradisi tiap hari... 🙏' },
        { mood:'happy',    anim:'excited', text:'Karya mereka luar biasa! Dukung yuk! 💪' },
        { mood:'thinking', anim:'think',   text:'Berapa generasi yang telah mewarisi seni ini? 🤔' },
        { mood:'happy',    anim:'hop',     text:'Beli produk mereka = lestarikan budaya! 🛍️' },
        { mood:'idle',     anim:'bob',     text:'Tangan terampil yang penuh dedikasi~ ✋' },
      ],
    },
    'ekonomi-kreatif': {
      position:'bl', size:'md', initMood:'happy', initAnim:'hop', idleAnim:'float',
      greetings: ['Produk lokal berkualitas tinggi! 🛍️','Beli lokal, dukung budaya!','UMKM kita keren-keren lho!','Bangga produk Indonesia! 🇮🇩'],
      contextQuotes: [
        { mood:'happy',    anim:'hop',     text:'Produk lokal makin kece & berkualitas! 🛍️' },
        { mood:'thinking', anim:'think',   text:'UMKM budaya membutuhkan dukunganmu~ 💼' },
        { mood:'happy',    anim:'excited', text:'Beli lokal = cinta budaya! 🇮🇩' },
        { mood:'idle',     anim:'nod',     text:'Ekonomi kreatif tumbuh dari akar budaya~' },
        { mood:'happy',    anim:'wave',    text:'Produk Indonesia go global! 🌍' },
        { mood:'thinking', anim:'think',   text:'Batik bisa jadi fashion global lho! 👗' },
        { mood:'happy',    anim:'hop',     text:'Bangga pakai buatan Indonesia! ✨' },
      ],
    },
    'heritage-modern': {
      position:'tr', size:'sm', initMood:'thinking', initAnim:'nod', idleAnim:'bob',
      greetings: ['Tradisi bertemu modernitas! ✨','Heritage yang tetap relevan~','Keren banget kolaborasinya!','Masa lalu yang menginspirasi masa kini!'],
      contextQuotes: [
        { mood:'thinking', anim:'think',   text:'Tradisi & modern bisa berpadu indah! ✨' },
        { mood:'happy',    anim:'excited', text:'Heritage x Modern = inovasi luar biasa! 🔥' },
        { mood:'idle',     anim:'nod',     text:'Inovasi dari akar budaya yang kuat 🌱' },
        { mood:'thinking', anim:'think',   text:'Bagaimana batik bisa tampil di fashion show? 🤔' },
        { mood:'happy',    anim:'wave',    text:'Masa lalu yang menginspirasi masa depan! 🚀' },
        { mood:'idle',     anim:'bob',     text:'Relevansi budaya itu kunci! 🔑' },
      ],
    },
    'creative-lab': {
      position:'br', size:'md', initMood:'happy', initAnim:'spin', idleAnim:'float',
      greetings: ['Waktunya berkreasi! 🎨','Creative Lab siap meluncur!','Ekspresi budayamu di sini!','Ayo ciptakan sesuatu yang keren!'],
      contextQuotes: [
        { mood:'happy',    anim:'excited', text:'Ide kreatifmu bisa mengubah dunia! 💡' },
        { mood:'happy',    anim:'spin',    text:'Lab kreativitas budaya terbuka! 🎨' },
        { mood:'thinking', anim:'think',   text:'Budaya bisa menjadi inspirasi desain modern 🤔' },
        { mood:'happy',    anim:'hop',     text:'Cipta karya budayamu sekarang! 🖌️' },
        { mood:'idle',     anim:'bob',     text:'Kreativitasmu tidak ada batasnya~ ✨' },
        { mood:'happy',    anim:'wave',    text:'Ekspresikan jiwa budayamu! 🌟' },
      ],
    },
    'pass-it-on': {
      position:'bl', size:'md', initMood:'happy', initAnim:'wave', idleAnim:'bob',
      greetings: ['Teruskan warisan ke generasi berikut! 🤝','Berbagi itu indah!','Budaya hidup dari kita ke kita~','Lestarikan, sebarkan, wariskan!'],
      contextQuotes: [
        { mood:'happy',    anim:'wave',    text:'Warisan itu untuk diteruskan! 🤝' },
        { mood:'idle',     anim:'nod',     text:'Berbagi pengetahuan budaya itu mulia 🌿' },
        { mood:'happy',    anim:'hop',     text:'Kamu adalah agen pelestari budaya! 🌟' },
        { mood:'thinking', anim:'think',   text:'Sudah ajarkan anak cucu tentang batik? 🤔' },
        { mood:'happy',    anim:'excited', text:'Sebarkan cinta budaya ke semua! ❤️' },
        { mood:'idle',     anim:'bob',     text:'Budaya hidup dari mulut ke mulut~ 📢' },
      ],
    },
  };

  // ── State ───────────────────────────────────────────────────────────
  let el       = null;   // .wari-companion (position anchor)
  let wrapEl   = null;   // .wari-sprite-wrap (idle loop + hover layer)
  let spriteEl = null;   // img.wari-sprite (expressive anims target)
  let bubbleEl = null;
  let bubbleTimer   = null;
  let contextTimer  = null;
  let currentMood   = 'idle';
  let cfg           = null;
  let isReacting    = false;
  let contextQuoteIdx = 0;
  let clickCount      = 0;
  let activeExpressiveAnim = null;

  // ── Idle CSS classes (applied to wrapEl) ───────────────────────────
  const ALL_IDLE_CLASSES = [
    'wari-idle-float','wari-idle-bob','wari-idle-breath',
    'wari-idle-happyglow','wari-idle-glow',
  ];

  // ── Web Animations API keyframe definitions ─────────────────────────
  const WAAPI_ANIMS = {
    wave: {
      frames: [
        { transform:'rotate(0deg) scale(1) translateY(0)',         offset:0    },
        { transform:'rotate(-20deg) scale(1.12) translateY(-6px)', offset:0.07 },
        { transform:'rotate(16deg) scale(1.10) translateY(-12px)', offset:0.20 },
        { transform:'rotate(-14deg) scale(1.12) translateY(-7px)', offset:0.34 },
        { transform:'rotate(11deg) scale(1.07) translateY(-4px)',  offset:0.48 },
        { transform:'rotate(-8deg) scale(1.04) translateY(-2px)',  offset:0.62 },
        { transform:'rotate(4deg) scale(1.02) translateY(-1px)',   offset:0.76 },
        { transform:'rotate(-1.5deg) scale(1.005)',                offset:0.90 },
        { transform:'rotate(0deg) scale(1) translateY(0)',         offset:1    },
      ],
      options: { duration:1500, easing:'cubic-bezier(0.34,1.56,0.64,1)', fill:'both' },
    },
    hop: {
      frames: [
        { transform:'translateY(0) scaleX(1) scaleY(1) rotate(0deg)',          offset:0    },
        { transform:'translateY(-14px) scaleX(0.88) scaleY(1.14) rotate(-5deg)', offset:0.09 },
        { transform:'translateY(-52px) scaleX(0.92) scaleY(1.12) rotate(7deg)',  offset:0.28 },
        { transform:'translateY(-63px) scaleX(0.95) scaleY(1.08) rotate(3.5deg)',offset:0.44 },
        { transform:'translateY(-26px) scaleX(0.99) scaleY(1.02) rotate(-1deg)', offset:0.60 },
        { transform:'translateY(9px) scaleX(1.15) scaleY(0.85)',               offset:0.74 },
        { transform:'translateY(-7px) scaleX(0.96) scaleY(1.05)',              offset:0.84 },
        { transform:'translateY(2px) scaleX(1.02) scaleY(0.99)',               offset:0.93 },
        { transform:'translateY(0) scaleX(1) scaleY(1) rotate(0deg)',          offset:1    },
      ],
      options: { duration:1000, easing:'cubic-bezier(0.34,1.56,0.64,1)', fill:'both' },
    },
    excited: {
      frames: [
        { transform:'translateY(0) rotate(0deg) scale(1)',          offset:0    },
        { transform:'translateY(-20px) rotate(-7deg) scale(1.13)',  offset:0.07 },
        { transform:'translateY(-5px) rotate(6deg) scale(1.07)',    offset:0.16 },
        { transform:'translateY(-22px) rotate(-6.5deg) scale(1.15)',offset:0.26 },
        { transform:'translateY(-4px) rotate(5.5deg) scale(1.07)', offset:0.36 },
        { transform:'translateY(-18px) rotate(-5deg) scale(1.12)', offset:0.46 },
        { transform:'translateY(-3px) rotate(3.5deg) scale(1.06)', offset:0.56 },
        { transform:'translateY(-12px) rotate(-2.5deg) scale(1.09)',offset:0.66 },
        { transform:'translateY(-2px) rotate(1.5deg) scale(1.04)', offset:0.76 },
        { transform:'translateY(5px) scaleX(1.11) scaleY(0.89)',   offset:0.86 },
        { transform:'translateY(-2px) scale(1.01)',                 offset:0.94 },
        { transform:'translateY(0) rotate(0deg) scale(1)',          offset:1    },
      ],
      options: { duration:1300, easing:'cubic-bezier(0.34,1.56,0.64,1)', fill:'both' },
    },
    spin: {
      frames: [
        { transform:'rotate(0deg) scale(1)',    offset:0    },
        { transform:'rotate(82deg) scale(1.17)',offset:0.16 },
        { transform:'rotate(190deg) scale(1.23)',offset:0.42 },
        { transform:'rotate(298deg) scale(1.15)',offset:0.70 },
        { transform:'rotate(348deg) scale(1.04)',offset:0.88 },
        { transform:'rotate(360deg) scale(1)',  offset:1    },
      ],
      options: { duration:1000, easing:'cubic-bezier(0.34,1.56,0.64,1)', fill:'both' },
    },
    nod: {
      frames: [
        { transform:'rotate(0deg) translateY(0)',      offset:0    },
        { transform:'rotate(-11deg) translateY(-5px)', offset:0.12 },
        { transform:'rotate(13deg) translateY(-2px)',  offset:0.28 },
        { transform:'rotate(-9deg) translateY(-4px)',  offset:0.44 },
        { transform:'rotate(8deg) translateY(-1px)',   offset:0.60 },
        { transform:'rotate(-3deg) translateY(-2px)',  offset:0.76 },
        { transform:'rotate(1deg) translateY(0)',      offset:0.90 },
        { transform:'rotate(0deg) translateY(0)',      offset:1    },
      ],
      options: { duration:1200, easing:'ease-in-out', fill:'both' },
    },
    shiver: {
      frames: [
        { transform:'rotate(0deg) translateX(0) scaleX(1)',           offset:0   },
        { transform:'rotate(-6.5deg) translateX(-5px) scaleX(0.95)', offset:0.1 },
        { transform:'rotate(6.5deg) translateX(5px) scaleX(1.05)',   offset:0.2 },
        { transform:'rotate(-5.5deg) translateX(-4px) scaleX(0.96)', offset:0.3 },
        { transform:'rotate(5.5deg) translateX(4px) scaleX(1.04)',   offset:0.4 },
        { transform:'rotate(-4deg) translateX(-3.5px)',               offset:0.5 },
        { transform:'rotate(4deg) translateX(3.5px)',                 offset:0.6 },
        { transform:'rotate(-2.5deg) translateX(-2px)',               offset:0.7 },
        { transform:'rotate(2.5deg) translateX(2px)',                 offset:0.8 },
        { transform:'rotate(-1deg) translateX(-1px)',                 offset:0.9 },
        { transform:'rotate(0deg) translateX(0)',                     offset:1   },
      ],
      options: { duration:800, easing:'ease-in-out', fill:'both' },
    },
    think: {
      frames: [
        { transform:'rotate(0deg) translateX(0)',                           offset:0    },
        { transform:'rotate(-7.5deg) translateX(-3.5px) translateY(-4px)', offset:0.12 },
        { transform:'rotate(5.5deg) translateX(2.5px) translateY(-7px)',   offset:0.26 },
        { transform:'rotate(-6.5deg) translateX(-3px) translateY(-4px)',   offset:0.40 },
        { transform:'rotate(4.5deg) translateX(2.5px) translateY(-5.5px)', offset:0.54 },
        { transform:'rotate(-4deg) translateX(-2px) translateY(-3px)',     offset:0.68 },
        { transform:'rotate(2.5deg) translateX(1px) translateY(-1px)',     offset:0.82 },
        { transform:'rotate(-0.8deg) translateX(0)',                       offset:0.93 },
        { transform:'rotate(0deg) translateX(0)',                          offset:1    },
      ],
      options: { duration:1600, easing:'ease-in-out', fill:'both' },
    },
    bounce: {
      frames: [
        { transform:'translateY(0) scaleX(1) scaleY(1)',          offset:0    },
        { transform:'translateY(-9px) scaleX(0.93) scaleY(1.09)', offset:0.10 },
        { transform:'translateY(-38px) scaleX(0.89) scaleY(1.13)',offset:0.26 },
        { transform:'translateY(-60px) scaleX(0.91) scaleY(1.11)',offset:0.40 },
        { transform:'translateY(-40px) scaleX(0.94) scaleY(1.07)',offset:0.56 },
        { transform:'translateY(7px) scaleX(1.17) scaleY(0.83)',  offset:0.68 },
        { transform:'translateY(-18px) scaleX(0.94) scaleY(1.09)',offset:0.78 },
        { transform:'translateY(4px) scaleX(1.07) scaleY(0.93)',  offset:0.87 },
        { transform:'translateY(-7px) scaleX(0.98) scaleY(1.03)', offset:0.94 },
        { transform:'translateY(0) scaleX(1) scaleY(1)',          offset:1    },
      ],
      options: { duration:1000, easing:'cubic-bezier(0.34,1.56,0.64,1)', fill:'both' },
    },
    tada: {
      frames: [
        { transform:'scale(1) rotate(0deg)',     offset:0    },
        { transform:'scale(0.93) rotate(-3.5deg)', offset:0.06 },
        { transform:'scale(1.13) rotate(3.5deg)',  offset:0.20 },
        { transform:'scale(1.13) rotate(-3.5deg)', offset:0.30 },
        { transform:'scale(1.13) rotate(3.5deg)',  offset:0.40 },
        { transform:'scale(1.13) rotate(-3.5deg)', offset:0.50 },
        { transform:'scale(1.13) rotate(3.5deg)',  offset:0.60 },
        { transform:'scale(1.17) rotate(2.5deg)',  offset:0.74 },
        { transform:'scale(1.07) rotate(-1.2deg)', offset:0.88 },
        { transform:'scale(1) rotate(0deg)',       offset:1    },
      ],
      options: { duration:1050, easing:'cubic-bezier(0.34,1.56,0.64,1)', fill:'both' },
    },
    wobble: {
      frames: [
        { transform:'translateX(0) rotate(0deg)',        offset:0    },
        { transform:'translateX(-15px) rotate(-5.5deg)', offset:0.12 },
        { transform:'translateX(13px) rotate(4.5deg)',   offset:0.24 },
        { transform:'translateX(-11px) rotate(-3deg)',   offset:0.36 },
        { transform:'translateX(9px) rotate(2.2deg)',    offset:0.48 },
        { transform:'translateX(-7px) rotate(-1.5deg)',  offset:0.60 },
        { transform:'translateX(5px) rotate(0.9deg)',    offset:0.72 },
        { transform:'translateX(-3px) rotate(-0.4deg)',  offset:0.84 },
        { transform:'translateX(1.5px) rotate(0.2deg)',  offset:0.92 },
        { transform:'translateX(0) rotate(0deg)',        offset:1    },
      ],
      options: { duration:900, easing:'ease-in-out', fill:'both' },
    },
    land: {
      frames: [
        { transform:'translateY(-110px) scaleX(1) scaleY(1) rotate(-20deg)',   offset:0    },
        { transform:'translateY(12px) scaleX(1.20) scaleY(0.80) rotate(3.5deg)',offset:0.44 },
        { transform:'translateY(-9px) scaleX(0.93) scaleY(1.07) rotate(-2.5deg)',offset:0.62 },
        { transform:'translateY(4px) scaleX(1.04) scaleY(0.96) rotate(1deg)',  offset:0.78 },
        { transform:'translateY(-2px) scaleX(0.99) scaleY(1.01)',              offset:0.90 },
        { transform:'translateY(0) scaleX(1) scaleY(1) rotate(0deg)',          offset:1    },
      ],
      options: { duration:880, easing:'cubic-bezier(0.22,1,0.36,1)', fill:'both' },
    },
    bob: {
      frames: [
        { transform:'translateY(0) rotate(-0.6deg)',    offset:0    },
        { transform:'translateY(-13px) rotate(0.9deg)', offset:0.35 },
        { transform:'translateY(-7px) rotate(-0.4deg)', offset:0.65 },
        { transform:'translateY(0) rotate(-0.6deg)',    offset:1    },
      ],
      options: { duration:1400, easing:'cubic-bezier(0.45,0,0.55,1)', fill:'both' },
    },
  };

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

    // Speech bubble (inside wrapEl so it moves with idle float)
    bubbleEl = document.createElement('div');
    bubbleEl.className = 'wari-speech ' + getSpeechTipClass(cfg.position);
    positionBubble(cfg.position, bubbleEl);
    wrapEl.appendChild(bubbleEl);

    // Sprite image (expressive animation target only)
    spriteEl = document.createElement('img');
    spriteEl.className = `wari-sprite wari-sprite-${cfg.size}`;
    spriteEl.src = IMGS[cfg.initMood] || IMGS.idle;
    spriteEl.alt = 'Si Wari Maskot';
    spriteEl.draggable = false;
    wrapEl.appendChild(spriteEl);

    document.body.appendChild(el);

    // Events on wrapEl — hover/active handled by CSS :hover/:active on wrapEl
    wrapEl.addEventListener('click',      onWrapClick);
    wrapEl.addEventListener('mousemove',  onWrapMouseMove);
    wrapEl.addEventListener('mouseleave', onWrapMouseLeave);

    // Start idle animation after entrance, then greet
    setTimeout(() => {
      startIdleAnimation();
      greet();
    }, 1200);

    // Context quotes (starts after greet finishes and a calm pause)
    setTimeout(() => startContextQuoteLoop(), 10500);
  }

  function getSpeechTipClass (pos) {
    const map = { br:'tip-right', bl:'tip-left', tr:'tip-right', tl:'tip-left' };
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

  // ── IDLE ANIMATION — runs on wrapEl, never restarted ───────────────
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

  // ── EXPRESSIVE ANIMATION — Web Animations API on spriteEl ──────────
  function playAnim (anim) {
    if (!spriteEl) return;
    const def = WAAPI_ANIMS[anim];
    if (!def) return;

    // Cancel previous gracefully
    if (activeExpressiveAnim) {
      try { activeExpressiveAnim.cancel(); } catch (e) {}
      activeExpressiveAnim = null;
    }

    const a = spriteEl.animate(def.frames, def.options);
    activeExpressiveAnim = a;
    a.onfinish = () => { activeExpressiveAnim = null; };
    return a;
  }

  // ── MOOD / SPRITE SWAP — pure opacity/scale via WAAPI ───────────────
  function setMood (mood, silent) {
    if (!spriteEl) return;
    currentMood = mood;
    const src = IMGS[mood] || IMGS.idle;
    const currentSrc = spriteEl.getAttribute('src') || '';
    const targetSuffix = src.replace('../', '').replace('./', '');
    const sameImg = currentSrc.endsWith(targetSuffix);

    if (sameImg) {
      if (!silent) startIdleAnimation();
      return;
    }

    // Fade out via WAAPI (never touches CSS idle on wrapEl)
    const fadeOut = spriteEl.animate(
      [{ opacity:1, transform:'scale(1) rotate(0deg)' },
       { opacity:0, transform:'scale(0.88) rotate(-4deg)' }],
      { duration:150, easing:'ease-out', fill:'forwards' }
    );
    fadeOut.onfinish = () => {
      if (!spriteEl) return;
      spriteEl.src = src;
      const popIn = spriteEl.animate(
        [{ opacity:0, transform:'scale(0.88) rotate(-4deg)' },
         { opacity:1, transform:'scale(1.08) rotate(2deg)' },
         { opacity:1, transform:'scale(1) rotate(0deg)' }],
        { duration:420, easing:'cubic-bezier(0.34,1.56,0.64,1)', fill:'forwards' }
      );
      popIn.onfinish = () => {
        popIn.cancel(); // clear fill so idle can take over
        if (!silent) startIdleAnimation();
      };
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
    setMood('happy', true);
    playAnim(cfg.initAnim || 'wave');
    setTimeout(() => showBubble(msg, 7200), 300);
    setTimeout(() => setMood('idle'), 7200);
  }

  // ── CONTEXT QUOTE LOOP ──────────────────────────────────────────────
  function startContextQuoteLoop () { runContextQuote(); }

  function runContextQuote () {
    if (!cfg || !cfg.contextQuotes) { scheduleNextContextQuote(); return; }
    if (document.hidden || isReacting) { scheduleNextContextQuote(); return; }
    const quotes = cfg.contextQuotes;
    const ev = quotes[contextQuoteIdx % quotes.length];
    contextQuoteIdx++;

    setMood(ev.mood, true);
    playAnim(ev.anim);
    setTimeout(() => showBubble(ev.text, 7200), 200);
    setTimeout(() => { if (!isReacting) setMood('idle'); }, 7200);
    scheduleNextContextQuote(11500);
  }

  function scheduleNextContextQuote (delay) {
    clearTimeout(contextTimer);
    contextTimer = setTimeout(runContextQuote, delay || 11500);
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
  function onWrapClick () {
    isReacting = true;
    clickCount++;
    const reactions = [
      clickReact_happy,
      clickReact_excited,
      clickReact_bounce,
      clickReact_tada,
      clickReact_spin,
    ];
    reactions[(clickCount - 1) % reactions.length]();
    setTimeout(() => { isReacting = false; setMood('idle'); }, 7000);
    clearTimeout(onWrapClick._reset);
    onWrapClick._reset = setTimeout(() => { clickCount = 0; }, 12000);
  }

  function clickReact_happy () {
    const msg = cfg.greetings[Math.floor(Math.random() * cfg.greetings.length)];
    setMood('happy', true);
    playAnim('wave');
    showBubble(msg, 7000);
  }
  function clickReact_excited () {
    const msgs = ['Hei hei! Kenapa kamu klik aku terus? 😂','Aku senang! Klik lagi dong! 😄','Kamu bikin aku semangat! 🎉','Wow, perhatiannya ke aku! 🥰'];
    setMood('happy', true);
    playAnim('excited');
    showBubble(msgs[Math.floor(Math.random() * msgs.length)], 7000);
  }
  function clickReact_bounce () {
    setMood('happy', true);
    playAnim('bounce');
    showBubble('Yeay!! 🎊 Kamu terus klik aku!', 7000);
  }
  function clickReact_tada () {
    setMood('happy', true);
    playAnim('tada');
    showBubble('🌟 Ta-da! Aku Si Wari yang hebat!', 7000);
  }
  function clickReact_spin () {
    setMood('happy', true);
    playAnim('spin');
    showBubble('Pusing~ Tapi tetap senang! 😵‍💫✨', 7000);
  }

  // ── PUBLIC API ──────────────────────────────────────────────────────
  window.WariMascot = {
    react: function (type) {
      if (!spriteEl) return;
      isReacting = true;
      if (type === 'correct') {
        setMood('happy', true); playAnim('excited');
        showBubble('Mantap! Jawaban benar! 🎉', 3000);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1800);
      } else if (type === 'wrong') {
        setMood('thinking', true); playAnim('shiver');
        showBubble('Yah, hampir! Coba lagi ya 😊', 3000);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1200);
      } else if (type === 'celebrate') {
        setMood('happy', true); playAnim('tada');
        showBubble('Luar biasa! Kamu keren sekali! 🌟', 3800);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 2400);
      } else if (type === 'thinking') {
        setMood('thinking', true); playAnim('think');
        showBubble('Hmm, pikirkan baik-baik ya... 🤔', 2800);
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1800);
      } else if (type === 'wave') {
        setMood('happy', true); playAnim('wave');
        setTimeout(() => { setMood('idle'); isReacting = false; }, 1800);
      } else {
        isReacting = false;
      }
    },
    say: function (text, duration) { showBubble(text, duration || 3000); },
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
