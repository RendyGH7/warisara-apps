(function () {
  "use strict";

  const StudioState = {
    
    currentMode: "generative",

    motif: "kawung", 

    layout: "grid", 

    isen: "cecek", 

    density: 4,          
    strokeWidth: 2.5,    
    scale: 1.0,          
    rotation: 0,         
    curviness: 1.0,      
    complexity: 3,       

    showCrackle: false,  
    showWeave: true,     
    alternateFlip: false,

    primaryColor: "#16213A",   
    secondaryColor: "#C9A567", 
    highlightColor: "#A8512F", 
    bgColor: "#F6F1E7",        
    bgStyle: "solid",          

    cantingTool: "brush",      
    cantingSize: 4,            
    cantingColor: "#16213A",
    cantingWaxBleed: true,
    cantingLayout: "grid",     
    cantingDensity: 4,         
    cantingIsPrinted: false,   

    activeView: "flat", 
    viewMode: "2d", // "2d" | "3d"
    mockupProduct: "dress", // "dress" | "totebag" | "shirt" | "scarf" | "cushion"
    mockupFabric: "cotton", // "cotton" | "silk" | "linen" | "canvas"
    mockupScale: 1.0,
    mockupRotation: 0,
    shadowIntensity: 1.0,
    highlightIntensity: 1.0,
    studioInspectorTab: "motif",

    seed: Math.floor(Math.random() * 1000000),
    authorName: "Rendy & Tim Warisara",
    artworkTitle: "Mahakarya Batik Nusantara",
    authorOrigin: "DI Yogyakarta",
    affiliation: "Studio Kreatif Warisara",
    role: "Perancang Digital Wastra",
    message: "Dipersembahkan untuk menjaga keluhuran dan keagungan wastra pusaka Nusantara."
  };

  const PRESETS = [
    {
      id: "kawung-kencana",
      name: "Kawung Kencana Sogan",
      category: "Batik Keraton",
      motif: "kawung",
      layout: "grid",
      isen: "cecek",
      density: 4,
      strokeWidth: 2.8,
      curviness: 1.1,
      complexity: 4,
      showCrackle: false,
      primaryColor: "#2A1E14",
      secondaryColor: "#C9A567",
      highlightColor: "#A8512F",
      bgColor: "#F6F1E7"
    },
    {
      id: "parang-barong",
      name: "Parang Barong Prabu",
      category: "Batik Klasik",
      motif: "parang",
      layout: "diagonal",
      isen: "sawut",
      density: 5,
      strokeWidth: 3.2,
      curviness: 1.3,
      complexity: 4,
      showCrackle: false,
      primaryColor: "#1F1610",
      secondaryColor: "#9E6438",
      highlightColor: "#E6D3A7",
      bgColor: "#ECE4D4"
    },
    {
      id: "megamendung-senja",
      name: "Megamendung Senja Cirebon",
      category: "Batik Pesisir",
      motif: "megamendung",
      layout: "brick",
      isen: "none",
      density: 3,
      strokeWidth: 2.6,
      curviness: 1.4,
      complexity: 5,
      showCrackle: false,
      primaryColor: "#16213A",
      secondaryColor: "#35578A",
      highlightColor: "#C06A42",
      bgColor: "#FBF8F2"
    },
    {
      id: "truntum-lintang",
      name: "Truntum Bintang Cinta",
      category: "Batik Keraton",
      motif: "truntum",
      layout: "grid",
      isen: "cecek",
      density: 6,
      strokeWidth: 2.0,
      curviness: 1.0,
      complexity: 3,
      showCrackle: true,
      primaryColor: "#1A1612",
      secondaryColor: "#C9A567",
      highlightColor: "#E6D3A7",
      bgColor: "#151310"
    },
    {
      id: "songket-palembang",
      name: "Songket Limar Emas",
      category: "Wastra Tenun",
      motif: "songket",
      layout: "grid",
      isen: "gringsing",
      density: 5,
      strokeWidth: 2.4,
      curviness: 0.9,
      complexity: 4,
      showCrackle: false,
      primaryColor: "#C9A567",
      secondaryColor: "#801B2B",
      highlightColor: "#E6D3A7",
      bgColor: "#2B0B14"
    },
    {
      id: "sekar-jagad-alam",
      name: "Sekar Jagad Nusantara",
      category: "Batik Kombinasi",
      motif: "sekarjagad",
      layout: "organic",
      isen: "ukel",
      density: 4,
      strokeWidth: 2.5,
      curviness: 1.2,
      complexity: 4,
      showCrackle: true,
      primaryColor: "#1E2E24",
      secondaryColor: "#C06A42",
      highlightColor: "#C9A567",
      bgColor: "#F6F1E7"
    },
    {
      id: "ceplok-kesatrian",
      name: "Ceplok Kesatrian Ageng",
      category: "Batik Keraton",
      motif: "ceplok",
      layout: "radial",
      isen: "sisik",
      density: 3,
      strokeWidth: 3.0,
      curviness: 1.0,
      complexity: 5,
      showCrackle: true,
      primaryColor: "#233A5E",
      secondaryColor: "#A47E3F",
      highlightColor: "#A8512F",
      bgColor: "#F4EDE1"
    },
    {
      id: "ikat-toraja",
      name: "Pa'teddong Toraja Pusaka",
      category: "Tenun Sulawesi",
      motif: "ikat_toraja",
      layout: "brick",
      isen: "none",
      density: 4,
      strokeWidth: 3.0,
      curviness: 0.8,
      complexity: 3,
      showCrackle: false,
      primaryColor: "#8C2D19",
      secondaryColor: "#D49B4B",
      highlightColor: "#EADCC2",
      bgColor: "#1C1715"
    },
    {
      id: "buketan-lasem",
      name: "Buketan Pesisir Lasem",
      category: "Batik Pesisir",
      motif: "pesisir_flora",
      layout: "organic",
      isen: "cecek",
      density: 3,
      strokeWidth: 2.2,
      curviness: 1.5,
      complexity: 4,
      showCrackle: true,
      primaryColor: "#9C2424",
      secondaryColor: "#2E5C44",
      highlightColor: "#C9A567",
      bgColor: "#FBF8F2"
    },
    {
      id: "lereng-gurdo",
      name: "Lereng Garuda Kencana",
      category: "Batik Klasik",
      motif: "garuda_lereng",
      layout: "diagonal",
      isen: "sawut",
      density: 4,
      strokeWidth: 2.8,
      curviness: 1.2,
      complexity: 4,
      showCrackle: true,
      primaryColor: "#1A1612",
      secondaryColor: "#A47E3F",
      highlightColor: "#C06A42",
      bgColor: "#EFE7D8"
    },
    {
      id: "cyber-indigo-neo",
      name: "Cyber Indigo Neo-Batik",
      category: "Heritage Modern",
      motif: "megamendung",
      layout: "radial",
      isen: "gringsing",
      density: 4,
      strokeWidth: 2.5,
      curviness: 1.3,
      complexity: 5,
      showCrackle: false,
      primaryColor: "#4E7BFF",
      secondaryColor: "#00E5FF",
      highlightColor: "#FF4081",
      bgColor: "#0A0D14"
    },
    {
      id: "pastel-minang",
      name: "Songket Pastel Kontemporer",
      category: "Wastra Modern",
      motif: "songket",
      layout: "brick",
      isen: "cecek",
      density: 5,
      strokeWidth: 2.0,
      curviness: 1.0,
      complexity: 4,
      showCrackle: false,
      primaryColor: "#5B7065",
      secondaryColor: "#C49A76",
      highlightColor: "#E0B589",
      bgColor: "#F9F6F0"
    }
  ];

  const PALETTES = [
    {
      name: "Keraton Sogan & Nila",
      primary: "#1A1612",
      secondary: "#A47E3F",
      highlight: "#A8512F",
      bg: "#F6F1E7"
    },
    {
      name: "Pesisir Pekalongan",
      primary: "#A32020",
      secondary: "#2E5C44",
      highlight: "#C9A567",
      bg: "#FBF8F2"
    },
    {
      name: "Songket Emas Palembang",
      primary: "#C9A567",
      secondary: "#7A1C29",
      highlight: "#E6D3A7",
      bg: "#240A10"
    },
    {
      name: "Indigo Wedel Klasik",
      primary: "#16213A",
      secondary: "#35578A",
      highlight: "#6B8AB8",
      bg: "#F4EDE1"
    },
    {
      name: "Hitam Keraton & Emas",
      primary: "#E6D3A7",
      secondary: "#C9A567",
      highlight: "#C06A42",
      bg: "#151310"
    },
    {
      name: "Toraja Pa'teddong",
      primary: "#8C2D19",
      secondary: "#D49B4B",
      highlight: "#ECE4D4",
      bg: "#181413"
    },
    {
      name: "Cyber Neon Heritage",
      primary: "#00E5FF",
      secondary: "#FF4081",
      highlight: "#C9A567",
      bg: "#0B0E14"
    },
    {
      name: "Sage & Terracotta Modern",
      primary: "#2E4A38",
      secondary: "#C06A42",
      highlight: "#C9A567",
      bg: "#F6F1E7"
    }
  ];

  const MOTIF_INFO = {
    kawung: {
      title: "Makna Filosofi Batik Kawung",
      origin: "Yogyakarta & Surakarta (Mataram)",
      symbolism: "Kesucian batin, ketulusan budi, dan manusia sebagai poros penjaga 4 arah mata angin semesta.",
      desc: "Bentuk elips menyerupai buah kolang-kaling yang tersusun rapi empat penjuru. Merupakan motif larangan (gehong) keraton yang melambangkan keadilan, kemurnian spiritual, dan pengendalian hawa nafsu."
    },
    parang: {
      title: "Makna Filosofi Batik Parang Rusak",
      origin: "Keraton Surakarta & Yogyakarta",
      symbolism: "Keteguhan ksatria, ombak samudra tak henti, dan perjuangan menaklukkan ego.",
      desc: "Pola diagonal tegas berupa jalinan leter S menyerupai deburan ombak yang menghantam karang tanpa henti. Mengajarkan manusia untuk tidak pernah menyerah dan senantiasa memperbaiki diri."
    },
    megamendung: {
      title: "Makna Filosofi Batik Megamendung",
      origin: "Cirebon, Jawa Barat",
      symbolism: "Kesejukan jiwa, kesabaran, dan akulturasi budaya Nusantara-Tiongkok.",
      desc: "Garis awan fraktal berlapis 5 tingkat gradasi warna. Melambangkan dunia atas yang luas, membawa awan pembawa hujan berkah, serta mengajarkan manusia untuk tetap berkepala dingin di saat amarah membara."
    },
    truntum: {
      title: "Makna Filosofi Batik Truntum",
      origin: "Surakarta, Jawa Tengah",
      symbolism: "Cinta kasih yang bersemi kembali (tumaruntum), ketulusan, dan bintang penuntun.",
      desc: "Diciptakan oleh Kanjeng Ratu Kencana saat menatap taburan bintang di langit malam. Menggambarkan cinta tulus tanpa pamrih yang terus bertumbuh mekar di tengah kegelapan."
    },
    sekarjagad: {
      title: "Makna Filosofi Batik Sekar Jagad",
      origin: "Yogyakarta & Solo",
      symbolism: "Keberagaman alam semesta, persatuan pulau, dan keindahan tanpa batas.",
      desc: "'Kar' bermakna peta dan 'Jagad' bermakna dunia. Motif tambal kepulauan ini menyatukan puluhan isen-isen bunga, sisik, dan geometri menjadi satu kain harmonis yang mempesona."
    },
    ceplok: {
      title: "Makna Motif Ceplok Kesatrian",
      origin: "Jawa Tengah & Yogyakarta",
      symbolism: "Keteraturan kosmik, keseimbangan hidup, dan keteguhan iman.",
      desc: "Komposisi geometris roset mandala memusat dengan pengulangan simetris sempurna. Menjadi cermin manusia yang memiliki prinsip hidup teguh dan seimbang dalam hubungan vertikal dan horizontal."
    },
    songket: {
      title: "Makna Songket Saik Kalam & Pucuk Rebung",
      origin: "Minangkabau, Sumatera Barat & Palembang",
      symbolism: "Kebijaksanaan kata, martabat luhur, dan kesinambungan generasi muda.",
      desc: "Geometri belah ketupat seimbang berpadu motif pucuk rebung bambu muda. Mengajarkan agar manusia berguna sejak muda hingga tua: 'Kecil berguna, tua terpakai'."
    },
    ikat_toraja: {
      title: "Makna Tenun Pa'teddong & Sekomandi",
      origin: "Tana Toraja, Sulawesi Selatan & Mamasa",
      symbolism: "Kemakmuran klan, keberanian, dan pelindung keluarga.",
      desc: "Representasi stilasi kepala dan tanduk kerbau (Tedong) yang dikombinasikan dengan segitiga bertingkat sakral. Lambang status kehormatan dan pengikat persaudaraan antar generasi."
    },
    pesisir_flora: {
      title: "Makna Batik Buketan Pesisir",
      origin: "Pekalongan, Lasem & Kudus",
      symbolism: "Kebebasan ekspresi, kesuburan tanah Nusantara, dan keterbukaan maritim.",
      desc: "Terinspirasi dari buket bunga tropis berwarna cerah, sulur teratai, dan dedaunan merambat. Menunjukkan keterbukaan masyarakat pesisir terhadap keindahan lintas peradaban."
    },
    garuda_lereng: {
      title: "Makna Motif Lereng Gurdo / Garuda",
      origin: "Yogyakarta & Surakarta",
      symbolism: "Kekuatan spiritual, kepemimpinan agung, dan kejayaan tanah air.",
      desc: "Sayap burung Garuda (Mahambara) yang terbentang gagah dalam susunan lereng diagonal. Simbol kendaraan Dewa Wisnu sebagai pemelihara kehidupan dan marwah kepemimpinan Nusantara."
    }
  };

  let canvas = null;
  let ctx = null;
  let freehandCanvas = null;
  let freehandCtx = null;

  const historyStack = [];
  const redoStack = [];
  const MAX_HISTORY = 20;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  let cachedCrackleLines = null;

  function drawRoundRect(c, x, y, width, height, radius) {
    if (typeof c.roundRect === "function") {
      c.roundRect(x, y, width, height, radius);
    } else {
      const r = typeof radius === "number" ? radius : 8;
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + width - r, y);
      c.quadraticCurveTo(x + width, y, x + width, y + r);
      c.lineTo(x + width, y + height - r);
      c.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
      c.lineTo(x + r, y + height);
      c.quadraticCurveTo(x, y + height, x, y + height - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    }
  }

  function init() {
    if (window.WARISARA_NAVBAR && typeof window.WARISARA_NAVBAR.init === "function") {
      window.WARISARA_NAVBAR.init();
      if (typeof window.WARISARA_NAVBAR.refresh === "function") {
        window.WARISARA_NAVBAR.refresh();
      }
    }

    canvas = document.getElementById("creative-canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d", { willReadFrequently: true });

    freehandCanvas = document.createElement("canvas");
    freehandCanvas.width = canvas.width;
    freehandCanvas.height = canvas.height;
    freehandCtx = freehandCanvas.getContext("2d");

    generateCrackleNoise();

    bindDomEvents();

    renderSavedGallery();

    saveHistoryState();

    updatePrintButtonState();

    render();
  }

  function saveHistoryState() {
    if (historyStack.length >= MAX_HISTORY) {
      historyStack.shift();
    }
    const snapshot = JSON.parse(JSON.stringify(StudioState));
    let freehandData = null;
    try {
      freehandData = freehandCtx.getImageData(0, 0, freehandCanvas.width, freehandCanvas.height);
    } catch (e) {}

    historyStack.push({ state: snapshot, freehand: freehandData });
    redoStack.length = 0;
    updateUndoRedoButtons();
  }

  function undo() {
    if (historyStack.length <= 1) return;
    const current = historyStack.pop();
    redoStack.push(current);
    const prev = historyStack[historyStack.length - 1];
    if (prev) {
      applySnapshot(prev);
    }
  }

  function redo() {
    if (redoStack.length === 0) return;
    const next = redoStack.pop();
    historyStack.push(next);
    applySnapshot(next);
  }

  function applySnapshot(item) {
    Object.assign(StudioState, item.state);
    if (item.freehand) {
      freehandCtx.putImageData(item.freehand, 0, 0);
    }
    syncUiToState();
    render();
    updateUndoRedoButtons();
    updatePrintButtonState();

    const mockupTabs = document.getElementById("mockup-tabs-container");
    if (mockupTabs) {
      if (StudioState.currentMode === "generative") {
        mockupTabs.classList.remove("hidden");
      } else {
        mockupTabs.classList.toggle("hidden", !StudioState.cantingIsPrinted);
      }
    }
  }

  function updateUndoRedoButtons() {
    const btnUndo = document.getElementById("btn-undo");
    const btnRedo = document.getElementById("btn-redo");
    if (btnUndo) btnUndo.disabled = historyStack.length <= 1;
    if (btnRedo) btnRedo.disabled = redoStack.length === 0;
  }

  function generateCrackleNoise() {
    const lines = [];
    const numBranches = 35;
    const w = 600;
    const h = 600;

    for (let i = 0; i < numBranches; i++) {
      let x = Math.random() * w;
      let y = Math.random() * h;
      const length = 20 + Math.random() * 80;
      let angle = Math.random() * Math.PI * 2;
      const segments = [];

      for (let s = 0; s < length / 8; s++) {
        const nextX = x + Math.cos(angle) * (6 + Math.random() * 6);
        const nextY = y + Math.sin(angle) * (6 + Math.random() * 6);
        segments.push({ x1: x, y1: y, x2: nextX, y2: nextY });
        x = nextX;
        y = nextY;
        angle += (Math.random() - 0.5) * 0.8;
      }
      lines.push(segments);
    }
    cachedCrackleLines = lines;
  }

  function render() {
    if (!ctx || !canvas) return;

    const w = canvas.width;
    const h = canvas.height;

    if (StudioState.currentMode === "canting" && !StudioState.cantingIsPrinted) {
      
      ctx.fillStyle = "#FAF8F5";
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.strokeStyle = "rgba(164, 126, 63, 0.32)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      drawRoundRect(ctx, w * 0.08, h * 0.08, w * 0.84, h * 0.84, 14);
      ctx.stroke();

      ctx.strokeStyle = "rgba(164, 126, 63, 0.18)";
      ctx.beginPath();
      ctx.moveTo(w / 2, h * 0.08);
      ctx.lineTo(w / 2, h * 0.92);
      ctx.moveTo(w * 0.08, h / 2);
      ctx.lineTo(w * 0.92, h / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(116, 66, 8, 0.55)";
      ctx.font = "600 11px 'Manrope', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Kanvas 1 Unit Motif — Goreskan Canting Bebas Buatan Anda Disini", w / 2, h * 0.055);
      ctx.restore();

      ctx.drawImage(freehandCanvas, 0, 0);

      updateInfoDisplay();
      updateLivePaletteDisplay();
      if (StudioState.viewMode === "3d" || StudioState.activeView !== "flat") {
        updateMockupView();
      }
      return;
    }

    if (StudioState.currentMode === "canting" && StudioState.cantingIsPrinted) {
      renderPrintedCustomFabric(ctx, w, h);
      if (StudioState.showWeave) {
        renderWeaveTexture(ctx, w, h);
      }
      updateInfoDisplay();
      updateLivePaletteDisplay();
      if (StudioState.viewMode === "3d" || StudioState.activeView !== "flat") {
        updateMockupView();
      }
      return;
    }

    renderFabricBackground(ctx, w, h);

    renderGenerativePattern(ctx, w, h);

    if (StudioState.showCrackle && cachedCrackleLines) {
      renderCrackleEffect(ctx, w, h);
    }
    if (StudioState.showWeave) {
      renderWeaveTexture(ctx, w, h);
    }

    updateInfoDisplay();
    updateLivePaletteDisplay();

    if (StudioState.viewMode === "3d" || StudioState.activeView !== "flat") {
      updateMockupView();
    }
  }

  function renderPrintedCustomFabric(targetCtx, w, h) {
    targetCtx.fillStyle = StudioState.bgColor || "#FAF8F5";
    targetCtx.fillRect(0, 0, w, h);

    const density = StudioState.cantingDensity || 4;
    const cellSize = w / density;
    const layout = StudioState.cantingLayout || "grid";

    const bbox = getCanvasBoundingBox(freehandCanvas);
    const srcX = bbox.x;
    const srcY = bbox.y;
    const srcW = bbox.w;
    const srcH = bbox.h;

    const pad = cellSize * 0.1;
    const dw = cellSize - pad * 2;
    const dh = cellSize - pad * 2;

    for (let r = 0; r < density; r++) {
      for (let c = 0; c < density; c++) {
        let x = c * cellSize + pad;
        let y = r * cellSize + pad;

        if (layout === "brick" && r % 2 === 1) {
          x += cellSize / 2;
          if (x >= w) x -= w;
        }

        targetCtx.save();
        const cx = x + dw / 2;
        const cy = y + dh / 2;
        targetCtx.translate(cx, cy);

        if (layout === "mirror") {
          const scaleX = c % 2 === 1 ? -1 : 1;
          const scaleY = r % 2 === 1 ? -1 : 1;
          targetCtx.scale(scaleX, scaleY);
        } else if (layout === "diagonal") {
          targetCtx.rotate(((r + c) * 45 * Math.PI) / 180);
        }

        targetCtx.drawImage(freehandCanvas, srcX, srcY, srcW, srcH, -dw / 2, -dh / 2, dw, dh);
        targetCtx.restore();
      }
    }
  }

  function getCanvasBoundingBox(srcCanvas) {
    if (!srcCanvas) return { x: 0, y: 0, w: 0, h: 0, empty: true };
    const sCtx = srcCanvas.getContext("2d", { willReadFrequently: true });
    const imgData = sCtx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
    const data = imgData.data;
    const w = srcCanvas.width;
    const h = srcCanvas.height;

    let minX = w, minY = h, maxX = 0, maxY = 0;
    let found = false;

    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const idx = (y * w + x) * 4;
        if (data[idx + 3] > 10) { 
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          found = true;
        }
      }
    }

    if (!found) {
      return { x: 0, y: 0, w: 0, h: 0, empty: true };
    }

    minX = Math.max(0, minX - 8);
    minY = Math.max(0, minY - 8);
    maxX = Math.min(w, maxX + 8);
    maxY = Math.min(h, maxY + 8);

    const bw = Math.max(20, maxX - minX);
    const bh = Math.max(20, maxY - minY);

    return { x: minX, y: minY, w: bw, h: bh, empty: false };
  }

  function hasFreehandDrawing() {
    if (!freehandCanvas) return false;
    const bbox = getCanvasBoundingBox(freehandCanvas);
    return !bbox.empty;
  }

  function updatePrintButtonState() {
    const btnPrintBatik = document.getElementById("btn-print-custom-batik");
    if (!btnPrintBatik) return;
    const hasDrawing = hasFreehandDrawing();

    btnPrintBatik.disabled = !hasDrawing;
    if (!hasDrawing) {
      btnPrintBatik.classList.add("opacity-40", "cursor-not-allowed", "pointer-events-none");
      btnPrintBatik.classList.remove("hover:scale-[1.02]", "cursor-pointer");
      btnPrintBatik.title = "Goreskan canting terlebih dahulu pada kanvas putih untuk mencetak";
    } else {
      btnPrintBatik.classList.remove("opacity-40", "cursor-not-allowed", "pointer-events-none");
      btnPrintBatik.classList.add("hover:scale-[1.02]", "cursor-pointer");
      btnPrintBatik.title = "Cetak motif goresan canting menjadi kain batik berulang";
    }
  }

  function renderFabricBackground(targetCtx, w, h) {
    if (StudioState.bgStyle === "gradient") {
      const grad = targetCtx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, StudioState.bgColor);
      grad.addColorStop(1, adjustColorBrightness(StudioState.bgColor, -25));
      targetCtx.fillStyle = grad;
    } else if (StudioState.bgStyle === "vignette") {
      const radGrad = targetCtx.createRadialGradient(w / 2, h / 2, w * 0.1, w / 2, h / 2, w * 0.7);
      radGrad.addColorStop(0, adjustColorBrightness(StudioState.bgColor, 10));
      radGrad.addColorStop(1, adjustColorBrightness(StudioState.bgColor, -20));
      targetCtx.fillStyle = radGrad;
    } else {
      targetCtx.fillStyle = StudioState.bgColor;
    }
    targetCtx.fillRect(0, 0, w, h);
  }

  function renderGenerativePattern(targetCtx, w, h) {
    targetCtx.save();

    const density = StudioState.density;
    const cellSize = w / density;
    const strokeWidth = StudioState.strokeWidth;
    const motif = StudioState.motif;
    const layout = StudioState.layout;
    const isen = StudioState.isen;
    const primary = StudioState.primaryColor;
    const secondary = StudioState.secondaryColor;
    const highlight = StudioState.highlightColor;
    const curviness = StudioState.curviness;
    const complexity = StudioState.complexity;
    const globalRotation = (StudioState.rotation * Math.PI) / 180;

    targetCtx.strokeStyle = primary;
    targetCtx.fillStyle = primary;
    targetCtx.lineWidth = strokeWidth;
    targetCtx.lineCap = "round";
    targetCtx.lineJoin = "round";

    if (layout === "radial") {
      
      const cx = w / 2;
      const cy = h / 2;
      const maxR = w * 0.48;
      const rings = Math.min(6, density + 1);

      for (let r = rings; r >= 1; r--) {
        const radius = (r / rings) * maxR;
        const petals = r * 4;
        for (let p = 0; p < petals; p++) {
          const angle = (p * 2 * Math.PI) / petals + globalRotation;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          const subSize = (cellSize * 0.9) * (r / rings);

          targetCtx.save();
          targetCtx.translate(px, py);
          targetCtx.rotate(angle + Math.PI / 2);
          drawSingleMotif(targetCtx, 0, 0, subSize, motif, isen, primary, secondary, highlight, curviness, complexity);
          targetCtx.restore();
        }
      }

      targetCtx.save();
      targetCtx.translate(cx, cy);
      targetCtx.rotate(globalRotation);
      drawSingleMotif(targetCtx, 0, 0, cellSize * 1.5, "ceplok", isen, primary, secondary, highlight, curviness, complexity);
      targetCtx.restore();

    } else if (layout === "diagonal") {
      
      const spacing = cellSize * 0.85;
      const diagSteps = Math.ceil((w + h) / spacing) + 2;

      for (let d = -2; d < diagSteps; d++) {
        for (let step = -2; step < density * 2 + 2; step++) {
          const x = step * spacing - d * (spacing * 0.5);
          const y = d * spacing + step * (spacing * 0.5);

          if (x < -cellSize * 1.5 || x > w + cellSize * 1.5 || y < -cellSize * 1.5 || y > h + cellSize * 1.5) continue;

          targetCtx.save();
          targetCtx.translate(x, y);
          targetCtx.rotate(Math.PI / 4 + globalRotation);
          drawSingleMotif(targetCtx, 0, 0, cellSize, motif, isen, primary, secondary, highlight, curviness, complexity);
          targetCtx.restore();
        }
      }

    } else if (layout === "brick") {
      
      let rowIdx = 0;
      for (let y = -cellSize / 2; y <= h + cellSize; y += cellSize * 0.86) {
        const xOffset = (rowIdx % 2 === 1) ? cellSize / 2 : 0;
        let colIdx = 0;
        for (let x = -cellSize / 2 + xOffset; x <= w + cellSize; x += cellSize) {
          const flip = StudioState.alternateFlip && (rowIdx + colIdx) % 2 === 1;
          targetCtx.save();
          targetCtx.translate(x + cellSize / 2, y + cellSize / 2);
          targetCtx.rotate(globalRotation + (flip ? Math.PI : 0));
          drawSingleMotif(targetCtx, 0, 0, cellSize, motif, isen, primary, secondary, highlight, curviness, complexity);
          targetCtx.restore();
          colIdx++;
        }
        rowIdx++;
      }

    } else if (layout === "organic") {
      
      let count = 0;
      for (let y = 0; y < h; y += cellSize * 0.9) {
        for (let x = 0; x < w; x += cellSize * 0.9) {
          count++;
          const pseudoNoiseX = Math.sin(count * 9.2 + StudioState.seed) * (cellSize * 0.18);
          const pseudoNoiseY = Math.cos(count * 5.4 + StudioState.seed) * (cellSize * 0.18);
          const pseudoRot = Math.sin(count * 3.1) * 0.4 + globalRotation;

          targetCtx.save();
          targetCtx.translate(x + cellSize / 2 + pseudoNoiseX, y + cellSize / 2 + pseudoNoiseY);
          targetCtx.rotate(pseudoRot);
          drawSingleMotif(targetCtx, 0, 0, cellSize * 0.95, motif, isen, primary, secondary, highlight, curviness, complexity);
          targetCtx.restore();
        }
      }

    } else {
      
      let row = 0;
      for (let y = 0; y < h; y += cellSize) {
        let col = 0;
        for (let x = 0; x < w; x += cellSize) {
          const flip = StudioState.alternateFlip && (row + col) % 2 === 1;
          targetCtx.save();
          targetCtx.translate(x + cellSize / 2, y + cellSize / 2);
          targetCtx.rotate(globalRotation + (flip ? Math.PI / 2 : 0));
          drawSingleMotif(targetCtx, 0, 0, cellSize, motif, isen, primary, secondary, highlight, curviness, complexity);
          targetCtx.restore();
          col++;
        }
        row++;
      }
    }

    targetCtx.restore();
  }

  function drawSingleMotif(c, cx, cy, size, motif, isen, primary, secondary, highlight, curviness, complexity) {
    const half = size / 2;
    const r = half * 0.85;

    switch (motif) {
      case "kawung":
        drawKawungMotif(c, cx, cy, r, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "parang":
        drawParangMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "megamendung":
        drawMegamendungMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "truntum":
        drawTruntumMotif(c, cx, cy, r, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "sekarjagad":
        drawSekarJagadMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "ceplok":
        drawCeplokMotif(c, cx, cy, r, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "songket":
        drawSongketMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "ikat_toraja":
        drawTorajaMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "pesisir_flora":
        drawPesisirFloraMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity);
        break;
      case "garuda_lereng":
        drawGarudaLerengMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity);
        break;
      default:
        drawKawungMotif(c, cx, cy, r, isen, primary, secondary, highlight, curviness, complexity);
    }
  }

  function drawKawungMotif(c, cx, cy, r, isen, primary, secondary, highlight, curviness, complexity) {
    const rx = r * 0.95 * curviness;
    const ry = r * 0.42;

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      c.save();
      c.translate(cx, cy);
      c.rotate(angle);

      c.beginPath();
      c.ellipse(rx * 0.55, 0, rx * 0.5, ry, 0, 0, Math.PI * 2);
      c.strokeStyle = primary;
      c.stroke();

      if (complexity >= 2) {
        c.beginPath();
        c.ellipse(rx * 0.55, 0, rx * 0.35, ry * 0.65, 0, 0, Math.PI * 2);
        c.strokeStyle = secondary;
        c.stroke();
      }

      if (isen === "cecek" && complexity >= 3) {
        c.fillStyle = secondary;
        for (let d = -2; d <= 2; d++) {
          c.beginPath();
          c.arc(rx * 0.55 + d * (ry * 0.35), 0, Math.max(1, c.lineWidth * 0.4), 0, Math.PI * 2);
          c.fill();
        }
      } else if (isen === "sawut") {
        c.beginPath();
        for (let s = -2; s <= 2; s++) {
          const sy = s * (ry * 0.3);
          c.moveTo(rx * 0.3, sy);
          c.lineTo(rx * 0.7, sy);
        }
        c.strokeStyle = secondary;
        c.stroke();
      }

      c.restore();
    }

    c.beginPath();
    c.arc(cx, cy, r * 0.22, 0, Math.PI * 2);
    c.fillStyle = highlight;
    c.fill();
    c.strokeStyle = primary;
    c.stroke();

    if (complexity >= 3) {
      c.fillStyle = "#FFFFFF";
      for (let i = 0; i < 4; i++) {
        const ca = (i * Math.PI) / 2 + Math.PI / 4;
        c.beginPath();
        c.arc(cx + Math.cos(ca) * (r * 0.12), cy + Math.sin(ca) * (r * 0.12), Math.max(1, c.lineWidth * 0.35), 0, Math.PI * 2);
        c.fill();
      }
    }
  }

  function drawParangMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity) {
    const half = size / 2;

    c.save();
    c.translate(cx, cy);

    c.beginPath();
    c.moveTo(-half * 0.9, half * 0.9);
    c.bezierCurveTo(
      -half * 0.2 * curviness, half * 0.5,
      half * 0.2 * curviness, -half * 0.5,
      half * 0.9, -half * 0.9
    );
    c.strokeStyle = primary;
    c.stroke();

    if (complexity >= 2) {
      c.beginPath();
      c.moveTo(-half * 0.6, half * 0.8);
      c.bezierCurveTo(
        -half * 0.05, half * 0.3,
        half * 0.35, -half * 0.3,
        half * 0.8, -half * 0.6
      );
      c.strokeStyle = secondary;
      c.stroke();
    }

    const mSize = size * 0.22;
    c.beginPath();
    c.moveTo(-half * 0.4, -half * 0.4 - mSize);
    c.lineTo(-half * 0.4 + mSize * 0.7, -half * 0.4);
    c.lineTo(-half * 0.4, -half * 0.4 + mSize);
    c.lineTo(-half * 0.4 - mSize * 0.7, -half * 0.4);
    c.closePath();
    c.fillStyle = highlight;
    c.fill();
    c.strokeStyle = primary;
    c.stroke();

    if (isen === "sawut" || isen === "cecek") {
      c.strokeStyle = secondary;
      c.fillStyle = secondary;
      for (let i = -3; i <= 3; i++) {
        const t = i / 4;
        const px = t * (half * 0.7);
        const py = -t * (half * 0.7);
        if (isen === "sawut") {
          c.beginPath();
          c.moveTo(px - 5, py - 5);
          c.lineTo(px + 6, py + 4);
          c.stroke();
        } else {
          c.beginPath();
          c.arc(px, py, Math.max(1, c.lineWidth * 0.4), 0, Math.PI * 2);
          c.fill();
        }
      }
    }

    c.restore();
  }

  function drawMegamendungMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity) {
    const half = size / 2;
    const layers = Math.min(5, complexity + 1);

    c.save();
    c.translate(cx, cy);

    const colors = [primary, secondary, highlight, "#5588C0", "#EAE6DF"];

    for (let l = layers; l >= 1; l--) {
      const scale = (l / layers) * curviness;
      const wCloud = half * 1.6 * scale;
      const hCloud = half * 0.85 * scale;

      c.beginPath();
      c.moveTo(-wCloud * 0.8, 0);
      c.bezierCurveTo(-wCloud * 0.6, -hCloud * 1.2, -wCloud * 0.2, -hCloud * 1.1, 0, -hCloud * 0.6);
      c.bezierCurveTo(wCloud * 0.3, -hCloud * 1.3, wCloud * 0.7, -hCloud * 0.9, wCloud * 0.9, 0);
      c.bezierCurveTo(wCloud * 0.7, hCloud * 0.9, wCloud * 0.1, hCloud * 1.1, -wCloud * 0.3, hCloud * 0.5);
      c.bezierCurveTo(-wCloud * 0.6, hCloud * 0.7, -wCloud * 0.8, 0, -wCloud * 0.8, 0);
      c.closePath();

      c.fillStyle = colors[(l - 1) % colors.length];
      c.fill();
      c.strokeStyle = primary;
      c.stroke();
    }

    c.restore();
  }

  function drawTruntumMotif(c, cx, cy, r, isen, primary, secondary, highlight, curviness, complexity) {
    const petals = 8;
    const outerR = r * 0.9;
    const innerR = r * 0.3;

    c.save();
    c.translate(cx, cy);

    for (let i = 0; i < petals; i++) {
      const angle = (i * 2 * Math.PI) / petals;
      c.save();
      c.rotate(angle);

      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(outerR * 0.3 * curviness, outerR * 0.5, 0, outerR);
      c.quadraticCurveTo(-outerR * 0.3 * curviness, outerR * 0.5, 0, 0);
      c.strokeStyle = primary;
      c.fillStyle = secondary;
      c.fill();
      c.stroke();

      if (complexity >= 2) {
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, outerR * 0.8);
        c.strokeStyle = primary;
        c.stroke();
      }

      c.restore();
    }

    c.beginPath();
    c.arc(0, 0, innerR, 0, Math.PI * 2);
    c.fillStyle = highlight;
    c.fill();
    c.strokeStyle = primary;
    c.stroke();

    if (complexity >= 3) {
      c.fillStyle = highlight;
      for (let s = 0; s < 4; s++) {
        const sa = (s * Math.PI) / 2 + Math.PI / 4;
        const dist = outerR * 1.15;
        c.beginPath();
        c.arc(Math.cos(sa) * dist, Math.sin(sa) * dist, Math.max(1.5, c.lineWidth * 0.45), 0, Math.PI * 2);
        c.fill();
      }
    }

    c.restore();
  }

  function drawSekarJagadMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity) {
    const half = size / 2;
    c.save();
    c.translate(cx, cy);

    c.beginPath();
    const points = 6;
    for (let p = 0; p < points; p++) {
      const angle = (p * 2 * Math.PI) / points;
      const rad = half * 0.85 * (0.75 + Math.sin(p * 2.3 + cx) * 0.25 * curviness);
      const px = Math.cos(angle) * rad;
      const py = Math.sin(angle) * rad;
      if (p === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.closePath();
    c.strokeStyle = primary;
    c.fillStyle = secondary + "25";
    c.fill();
    c.stroke();

    if (isen === "gringsing" || complexity >= 3) {
      c.strokeStyle = secondary;
      for (let gy = -half * 0.4; gy <= half * 0.4; gy += 10) {
        for (let gx = -half * 0.4; gx <= half * 0.4; gx += 10) {
          c.beginPath();
          c.arc(gx, gy, 4, 0, Math.PI);
          c.stroke();
        }
      }
    } else if (isen === "cecek") {
      c.fillStyle = highlight;
      for (let cy2 = -half * 0.4; cy2 <= half * 0.4; cy2 += 8) {
        for (let cx2 = -half * 0.4; cx2 <= half * 0.4; cx2 += 8) {
          c.beginPath();
          c.arc(cx2, cy2, 1.2, 0, Math.PI * 2);
          c.fill();
        }
      }
    } else {
      c.beginPath();
      c.arc(0, 0, half * 0.25, 0, Math.PI * 2);
      c.fillStyle = highlight;
      c.fill();
      c.strokeStyle = primary;
      c.stroke();
    }

    c.restore();
  }

  function drawCeplokMotif(c, cx, cy, r, isen, primary, secondary, highlight, curviness, complexity) {
    c.save();
    c.translate(cx, cy);

    const sides = 8;
    c.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.closePath();
    c.strokeStyle = primary;
    c.stroke();

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      c.save();
      c.rotate(angle);

      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(r * 0.3 * curviness, r * 0.4, 0, r * 0.7);
      c.quadraticCurveTo(-r * 0.3 * curviness, r * 0.4, 0, 0);
      c.fillStyle = secondary;
      c.fill();
      c.strokeStyle = primary;
      c.stroke();

      c.restore();
    }

    c.beginPath();
    c.arc(0, 0, r * 0.25, 0, Math.PI * 2);
    c.fillStyle = highlight;
    c.fill();
    c.strokeStyle = primary;
    c.stroke();

    c.restore();
  }

  function drawSongketMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity) {
    const half = size / 2;
    c.save();
    c.translate(cx, cy);

    c.beginPath();
    c.moveTo(0, -half * 0.95);
    c.lineTo(half * 0.95, 0);
    c.lineTo(0, half * 0.95);
    c.lineTo(-half * 0.95, 0);
    c.closePath();
    c.strokeStyle = primary;
    c.stroke();

    for (let d = 1; d <= Math.min(3, complexity); d++) {
      const factor = 1 - d * 0.25;
      c.beginPath();
      c.moveTo(0, -half * 0.95 * factor);
      c.lineTo(half * 0.95 * factor, 0);
      c.lineTo(0, half * 0.95 * factor);
      c.lineTo(-half * 0.95 * factor, 0);
      c.closePath();
      c.strokeStyle = d % 2 === 1 ? secondary : highlight;
      c.stroke();
    }

    if (complexity >= 3) {
      c.strokeStyle = primary;
      c.fillStyle = highlight;
      for (let s = 0; s < 4; s++) {
        const ca = (s * Math.PI) / 2;
        c.save();
        c.rotate(ca);
        c.beginPath();
        c.moveTo(0, -half * 0.7);
        c.lineTo(half * 0.15, -half * 0.95);
        c.lineTo(-half * 0.15, -half * 0.95);
        c.closePath();
        c.fill();
        c.stroke();
        c.restore();
      }
    }

    c.beginPath();
    c.arc(0, 0, half * 0.18, 0, Math.PI * 2);
    c.fillStyle = primary;
    c.fill();

    c.restore();
  }

  function drawTorajaMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity) {
    const half = size / 2;
    c.save();
    c.translate(cx, cy);

    c.beginPath();
    c.moveTo(-half * 0.85, -half * 0.4);
    c.quadraticCurveTo(-half * 0.3, half * 0.6, 0, half * 0.75);
    c.quadraticCurveTo(half * 0.3, half * 0.6, half * 0.85, -half * 0.4);
    c.lineTo(half * 0.65, -half * 0.45);
    c.quadraticCurveTo(half * 0.25, half * 0.4, 0, half * 0.5);
    c.quadraticCurveTo(-half * 0.25, half * 0.4, -half * 0.65, -half * 0.45);
    c.closePath();
    c.fillStyle = primary;
    c.fill();
    c.strokeStyle = highlight;
    c.stroke();

    c.beginPath();
    c.moveTo(0, -half * 0.85);
    c.lineTo(half * 0.5, -half * 0.2);
    c.lineTo(-half * 0.5, -half * 0.2);
    c.closePath();
    c.fillStyle = secondary;
    c.fill();
    c.strokeStyle = primary;
    c.stroke();

    c.beginPath();
    c.arc(0, 0, half * 0.15, 0, Math.PI * 2);
    c.fillStyle = highlight;
    c.fill();

    c.restore();
  }

  function drawPesisirFloraMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity) {
    const half = size / 2;
    c.save();
    c.translate(cx, cy);

    c.beginPath();
    c.moveTo(-half * 0.8, half * 0.7);
    c.bezierCurveTo(
      -half * 0.2, half * 0.8 * curviness,
      half * 0.1, -half * 0.2,
      half * 0.7, -half * 0.6
    );
    c.strokeStyle = primary;
    c.stroke();

    const petals = 5;
    for (let p = 0; p < petals; p++) {
      const angle = (p * Math.PI) / 3 - Math.PI / 2;
      c.save();
      c.translate(half * 0.25, -half * 0.25);
      c.rotate(angle);

      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(half * 0.25 * curviness, half * 0.35, 0, half * 0.5);
      c.quadraticCurveTo(-half * 0.25 * curviness, half * 0.35, 0, 0);
      c.fillStyle = secondary;
      c.fill();
      c.strokeStyle = primary;
      c.stroke();

      c.restore();
    }

    c.beginPath();
    c.ellipse(-half * 0.35, half * 0.2, half * 0.22, half * 0.1, Math.PI / 4, 0, Math.PI * 2);
    c.fillStyle = highlight;
    c.fill();
    c.strokeStyle = primary;
    c.stroke();

    c.restore();
  }

  function drawGarudaLerengMotif(c, cx, cy, size, isen, primary, secondary, highlight, curviness, complexity) {
    const half = size / 2;
    c.save();
    c.translate(cx, cy);

    const feathers = Math.min(6, complexity + 2);
    for (let f = 0; f < feathers; f++) {
      const prog = f / feathers;
      const angle = -Math.PI / 4 + prog * (Math.PI / 2.5);
      const fLength = half * 0.9 * (1 - prog * 0.35);

      c.save();
      c.rotate(angle);

      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(half * 0.15 * curviness, fLength * 0.5, 0, fLength);
      c.quadraticCurveTo(-half * 0.15 * curviness, fLength * 0.5, 0, 0);
      c.fillStyle = f % 2 === 0 ? secondary : highlight;
      c.fill();
      c.strokeStyle = primary;
      c.stroke();

      if (isen === "sawut") {
        c.beginPath();
        c.moveTo(0, fLength * 0.2);
        c.lineTo(0, fLength * 0.85);
        c.strokeStyle = primary;
        c.stroke();
      }

      c.restore();
    }

    c.beginPath();
    c.arc(0, 0, half * 0.25, 0, Math.PI * 2);
    c.fillStyle = primary;
    c.fill();
    c.strokeStyle = highlight;
    c.stroke();

    c.restore();
  }

  function renderCrackleEffect(targetCtx, w, h) {
    targetCtx.save();
    targetCtx.strokeStyle = StudioState.primaryColor;
    targetCtx.lineWidth = 0.7;
    targetCtx.globalAlpha = 0.35;

    cachedCrackleLines.forEach((segments) => {
      segments.forEach((seg) => {
        targetCtx.beginPath();
        targetCtx.moveTo(seg.x1, seg.y1);
        targetCtx.lineTo(seg.x2, seg.y2);
        targetCtx.stroke();
      });
    });

    targetCtx.restore();
  }

  function renderWeaveTexture(targetCtx, w, h) {
    targetCtx.save();
    targetCtx.strokeStyle = "#FFFFFF";
    targetCtx.globalAlpha = 0.05;
    targetCtx.lineWidth = 1;

    for (let x = 0; x < w; x += 4) {
      targetCtx.beginPath();
      targetCtx.moveTo(x, 0);
      targetCtx.lineTo(x, h);
      targetCtx.stroke();
    }
    for (let y = 0; y < h; y += 4) {
      targetCtx.beginPath();
      targetCtx.moveTo(0, y);
      targetCtx.lineTo(w, y);
      targetCtx.stroke();
    }
    targetCtx.restore();
  }

  function handleCanvasMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (StudioState.currentMode === "stamp") {
      placeStampOnCanvas(x, y);
      saveHistoryState();
      render();
      return;
    }

    if (StudioState.currentMode === "canting") {
      isDrawing = true;
      lastX = x;
      lastY = y;
      drawFreehandDot(x, y);
      render();
    }
  }

  function handleCanvasMouseMove(e) {
    if (!isDrawing || StudioState.currentMode !== "canting") return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    drawFreehandLine(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
    render();
  }

  function handleCanvasMouseUp() {
    if (isDrawing) {
      isDrawing = false;
      saveHistoryState();
      updatePrintButtonState();
    }
  }

  function drawFreehandDot(x, y) {
    freehandCtx.save();
    if (StudioState.cantingTool === "eraser") {
      freehandCtx.globalCompositeOperation = "destination-out";
      freehandCtx.beginPath();
      freehandCtx.arc(x, y, StudioState.cantingSize * 2, 0, Math.PI * 2);
      freehandCtx.fill();
    } else {
      freehandCtx.globalCompositeOperation = "source-over";
      freehandCtx.fillStyle = StudioState.cantingColor;
      freehandCtx.beginPath();
      freehandCtx.arc(x, y, StudioState.cantingSize / 2, 0, Math.PI * 2);
      freehandCtx.fill();

      if (StudioState.cantingWaxBleed) {
        freehandCtx.fillStyle = StudioState.cantingColor + "33";
        freehandCtx.beginPath();
        freehandCtx.arc(x, y, StudioState.cantingSize * 1.4, 0, Math.PI * 2);
        freehandCtx.fill();
      }
    }
    freehandCtx.restore();
  }

  function drawFreehandLine(x1, y1, x2, y2) {
    freehandCtx.save();
    if (StudioState.cantingTool === "eraser") {
      freehandCtx.globalCompositeOperation = "destination-out";
      freehandCtx.lineWidth = StudioState.cantingSize * 3;
      freehandCtx.lineCap = "round";
      freehandCtx.lineJoin = "round";
      freehandCtx.beginPath();
      freehandCtx.moveTo(x1, y1);
      freehandCtx.lineTo(x2, y2);
      freehandCtx.stroke();
    } else {
      freehandCtx.globalCompositeOperation = "source-over";
      freehandCtx.strokeStyle = StudioState.cantingColor;
      freehandCtx.lineWidth = StudioState.cantingSize;
      freehandCtx.lineCap = "round";
      freehandCtx.lineJoin = "round";

      freehandCtx.beginPath();
      freehandCtx.moveTo(x1, y1);
      freehandCtx.lineTo(x2, y2);
      freehandCtx.stroke();

      if (StudioState.cantingWaxBleed) {
        freehandCtx.strokeStyle = StudioState.cantingColor + "25";
        freehandCtx.lineWidth = StudioState.cantingSize * 2.2;
        freehandCtx.beginPath();
        freehandCtx.moveTo(x1, y1);
        freehandCtx.lineTo(x2, y2);
        freehandCtx.stroke();
      }
    }
    freehandCtx.restore();
  }

  function placeStampOnCanvas(x, y) {
    freehandCtx.save();
    freehandCtx.translate(x, y);
    freehandCtx.rotate((StudioState.stampRotation * Math.PI) / 180);
    const stampSize = 70 * StudioState.stampScale;

    freehandCtx.lineWidth = 2.5;
    freehandCtx.strokeStyle = StudioState.primaryColor;
    freehandCtx.fillStyle = StudioState.secondaryColor;

    drawSingleMotif(
      freehandCtx,
      0,
      0,
      stampSize,
      StudioState.stampMotif === "gunungan" ? "garuda_lereng" : StudioState.motif,
      StudioState.isen,
      StudioState.primaryColor,
      StudioState.secondaryColor,
      StudioState.highlightColor,
      1.1,
      4
    );

    freehandCtx.restore();
  }

  function clearFreehandOverlay() {
    freehandCtx.clearRect(0, 0, freehandCanvas.width, freehandCanvas.height);
    saveHistoryState();
    updatePrintButtonState();
    render();
  }

  function getColorCulturalName(hex) {
    if (!hex) return "Wastra Pusaka";
    const h = hex.toUpperCase();
    const map = {
      "#16213A": "Indigo Nila",
      "#233A5E": "Biru Samudra",
      "#35578A": "Nila Terang",
      "#6B8AB8": "Langit Cerbon",
      "#1A1612": "Hitam Malam",
      "#2A1E14": "Sogan Gelap",
      "#744208": "Sogan Keraton",
      "#A47E3F": "Cokelat Kuningan",
      "#B8924E": "Kencana Mataram",
      "#C9A567": "Emas Pusaka",
      "#D8BD87": "Emas Muda",
      "#E6D3A7": "Kuning Praba",
      "#A8512F": "Merah Terracotta",
      "#C06A42": "Merah Cabe",
      "#DDA07C": "Kastuba Muda",
      "#A32020": "Merah Lasem",
      "#7A1C29": "Merah Marun",
      "#240A10": "Merah Gelap",
      "#1E2E24": "Hijau Lumut",
      "#2E5C44": "Hijau Pesisir",
      "#3F6350": "Pandan Wangi",
      "#F6F1E7": "Katun Mori",
      "#FBF8F2": "Krem Alami",
      "#ECE4D4": "Blacu Halus",
      "#FFFFFF": "Putih Sutra",
      "#000000": "Wulung Hitam"
    };
    if (map[h]) return map[h];
    // Approximation by hue
    return "Aksen Nusantara";
  }

  function updateLivePaletteDisplay() {
    const activeColors = [
      { id: "primary", role: "Garis Canting", hex: StudioState.primaryColor, name: getColorCulturalName(StudioState.primaryColor) },
      { id: "secondary", role: "Isian Ornamen", hex: StudioState.secondaryColor, name: getColorCulturalName(StudioState.secondaryColor) },
      { id: "highlight", role: "Inti Roset", hex: StudioState.highlightColor, name: getColorCulturalName(StudioState.highlightColor) },
      { id: "bg", role: "Dasar Kain", hex: StudioState.bgColor, name: getColorCulturalName(StudioState.bgColor) }
    ];

    // 1. Update Master Unified Cards di Tab 2
    activeColors.forEach((c) => {
      const nameEl = document.getElementById(`label-name-${c.id}`);
      const hexEl = document.getElementById(`label-hex-${c.id}`);
      const pickerEl = document.getElementById(`picker-${c.id}`);
      if (nameEl) nameEl.textContent = c.name;
      if (hexEl) hexEl.textContent = c.hex.toUpperCase();
      if (pickerEl && pickerEl.value.toLowerCase() !== c.hex.toLowerCase()) {
        pickerEl.value = c.hex;
      }
    });

    // Fallback extractContainer jika ada
    const extractContainer = document.getElementById("active-palette-extract-container");
    if (extractContainer) {
      extractContainer.innerHTML = activeColors.map((c) => `
        <div class="color-swatch-badge p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
          <span class="w-6 h-6 rounded-lg flex-shrink-0 shadow-sm border border-white/20" style="background-color: ${c.hex}"></span>
          <div class="min-w-0">
            <span class="text-[11px] font-semibold text-surface block truncate">${c.name}</span>
            <span class="text-[9px] font-mono text-brass-300 block">${c.hex.toUpperCase()}</span>
          </div>
        </div>
      `).join("");
    }

    // 2. Update di bawah Kanvas Stage sebagai Micro Dot Swatches yang rapih & elegan
    const stageBreakdown = document.getElementById("stage-palette-breakdown");
    if (stageBreakdown) {
      stageBreakdown.innerHTML = activeColors.map((c) => `
        <span class="w-3.5 h-3.5 rounded-full shadow-sm border border-white/30 inline-block transition-transform hover:scale-125 cursor-pointer"
              style="background-color: ${c.hex}"
              title="${c.role}: ${c.name} (${c.hex.toUpperCase()})"></span>
      `).join("");
    }
  }

  function createScaledRotatedPattern(mCtx, sourceCanvas, scale, rotation) {
    const s = Math.max(0.3, Math.min(3.0, scale || 1.0));
    const pw = Math.round(sourceCanvas.width * s);
    const ph = Math.round(sourceCanvas.height * s);

    const pCanvas = document.createElement("canvas");
    pCanvas.width = pw;
    pCanvas.height = ph;
    const pCtx = pCanvas.getContext("2d");

    pCtx.save();
    if (rotation && rotation !== 0) {
      pCtx.translate(pw / 2, ph / 2);
      pCtx.rotate((rotation * Math.PI) / 180);
      pCtx.translate(-pw / 2, -ph / 2);
    }
    pCtx.drawImage(sourceCanvas, 0, 0, pw, ph);
    pCtx.restore();

    return mCtx.createPattern(pCanvas, "repeat");
  }

  function updateMockupView() {
    const mockupCanvas = document.getElementById("mockup-preview-canvas");
    if (!mockupCanvas) return;

    // Pastikan resolusi tajam
    if (mockupCanvas.width !== 1200) {
      mockupCanvas.width = 1200;
      mockupCanvas.height = 1200;
    }

    const mCtx = mockupCanvas.getContext("2d");
    const mw = mockupCanvas.width;
    const mh = mockupCanvas.height;

    mCtx.clearRect(0, 0, mw, mh);

    // Buat pola berulang yang dapat di-scale dan di-rotate
    const pattern = createScaledRotatedPattern(
      mCtx,
      canvas,
      StudioState.mockupScale || 1.0,
      StudioState.mockupRotation || 0
    );

    const product = StudioState.mockupProduct || "dress";
    const fabric = StudioState.mockupFabric || "cotton";
    const shadowInt = StudioState.shadowIntensity || 1.0;
    const highlightInt = StudioState.highlightIntensity || 1.0;

    if (product === "dress") {
      drawDressMockup(mCtx, mw, mh, pattern, fabric, shadowInt, highlightInt);
    } else if (product === "totebag") {
      drawToteBagMockup(mCtx, mw, mh, pattern, fabric, shadowInt, highlightInt);
    } else if (product === "shirt") {
      drawShirtMockup(mCtx, mw, mh, pattern, fabric, shadowInt, highlightInt);
    } else if (product === "scarf") {
      drawScarfMockup(mCtx, mw, mh, pattern, fabric, shadowInt, highlightInt);
    } else if (product === "cushion") {
      drawCushionMockup(mCtx, mw, mh, pattern, fabric, shadowInt, highlightInt);
    }

    updateLivePaletteDisplay();
  }

  // =========================================================================
  // 1. MOCKUP GAUN WASTRA NUSANTARA (MIDI BOHO DRESS - SESUAI GAMBAR 1)
  // =========================================================================
  function drawDressMockup(mCtx, w, h, pattern, fabric, shadowInt, highlightInt) {
    mCtx.save();

    // Studio Background Neutral Luxury
    const bgGrad = mCtx.createRadialGradient(w / 2, h * 0.45, w * 0.1, w / 2, h * 0.5, w * 0.7);
    bgGrad.addColorStop(0, "#221D18");
    bgGrad.addColorStop(1, "#14110E");
    mCtx.fillStyle = bgGrad;
    mCtx.fillRect(0, 0, w, h);

    // Floor light reflection
    const floorGrad = mCtx.createLinearGradient(0, h * 0.82, 0, h);
    floorGrad.addColorStop(0, "rgba(0,0,0,0)");
    floorGrad.addColorStop(1, "rgba(10,8,6,0.5)");
    mCtx.fillStyle = floorGrad;
    mCtx.fillRect(0, h * 0.82, w, h * 0.18);

    const cx = w / 2;

    // Ground Contact Shadow (Realistis di lantai bawah gaun)
    const shadowGrad = mCtx.createRadialGradient(cx, h * 0.915, 20, cx, h * 0.915, w * 0.36);
    shadowGrad.addColorStop(0, `rgba(0, 0, 0, ${0.75 * shadowInt})`);
    shadowGrad.addColorStop(0.35, `rgba(0, 0, 0, ${0.4 * shadowInt})`);
    shadowGrad.addColorStop(0.7, `rgba(0, 0, 0, ${0.12 * shadowInt})`);
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    mCtx.fillStyle = shadowGrad;
    mCtx.beginPath();
    mCtx.ellipse(cx, h * 0.915, w * 0.33, h * 0.045, 0, 0, Math.PI * 2);
    mCtx.fill();

    // Inner Back Neckline (Tengkuk leher dalam dengan label Warisara)
    mCtx.save();
    mCtx.beginPath();
    mCtx.moveTo(cx - w * 0.08, h * 0.13);
    mCtx.quadraticCurveTo(cx, h * 0.18, cx + w * 0.08, h * 0.13);
    mCtx.lineTo(cx, h * 0.245);
    mCtx.closePath();
    mCtx.fillStyle = "#1E1A16";
    mCtx.fill();
    
    // Label leher
    mCtx.fillStyle = "rgba(201, 165, 103, 0.75)";
    mCtx.font = `bold ${w * 0.012}px 'Fraunces', serif`;
    mCtx.textAlign = "center";
    mCtx.fillText("WARISARA NUSANTARA", cx, h * 0.165);
    mCtx.restore();

    // Path Gaun Wastra (Bodice, Flutter Sleeves, Smocked Waist, Flared Pleated Skirt)
    function createDressPath(ctx) {
      ctx.beginPath();
      // Titik tengah V-neck
      ctx.moveTo(cx, h * 0.245);
      // Naik ke bahu kiri V-neck
      ctx.lineTo(cx - w * 0.075, h * 0.13);
      // Bahu kiri
      ctx.quadraticCurveTo(cx - w * 0.13, h * 0.135, cx - w * 0.17, h * 0.155);
      // Lengan lonceng / flutter kiri
      ctx.bezierCurveTo(cx - w * 0.25, h * 0.18, cx - w * 0.33, h * 0.25, cx - w * 0.31, h * 0.34);
      // Ujung bawah lengan bergelombang
      ctx.quadraticCurveTo(cx - w * 0.24, h * 0.35, cx - w * 0.17, h * 0.31);
      // Ketiak kiri ke pinggang
      ctx.quadraticCurveTo(cx - w * 0.15, h * 0.34, cx - w * 0.125, h * 0.38);
      // Pinggang karet kiri
      ctx.lineTo(cx - w * 0.12, h * 0.44);
      // Rok jatuh mengembang kiri
      ctx.bezierCurveTo(cx - w * 0.16, h * 0.54, cx - w * 0.22, h * 0.68, cx - w * 0.28, h * 0.87);
      
      // Kelim bawah rok dengan 7 lekukan lipatan natural
      const folds = 7;
      const skirtLeft = cx - w * 0.28;
      const skirtRight = cx + w * 0.28;
      const foldW = (skirtRight - skirtLeft) / folds;
      for (let i = 0; i < folds; i++) {
        const p1x = skirtLeft + i * foldW;
        const p2x = p1x + foldW;
        const cpx = (p1x + p2x) / 2;
        const cpy = (i % 2 === 0) ? h * 0.89 : h * 0.865;
        ctx.quadraticCurveTo(cpx, cpy, p2x, (i % 2 === 0) ? h * 0.87 : h * 0.88);
      }

      // Rok jatuh kanan
      ctx.bezierCurveTo(cx + w * 0.22, h * 0.68, cx + w * 0.16, h * 0.54, cx + w * 0.12, h * 0.44);
      // Pinggang karet kanan
      ctx.lineTo(cx + w * 0.125, h * 0.38);
      // Ketiak kanan ke lengan
      ctx.quadraticCurveTo(cx + w * 0.15, h * 0.34, cx + w * 0.17, h * 0.31);
      // Ujung bawah lengan kanan
      ctx.quadraticCurveTo(cx + w * 0.24, h * 0.35, cx + w * 0.31, h * 0.34);
      // Lengan lonceng kanan
      ctx.bezierCurveTo(cx + w * 0.33, h * 0.25, cx + w * 0.25, h * 0.18, cx + w * 0.17, h * 0.155);
      // Bahu kanan
      ctx.quadraticCurveTo(cx + w * 0.13, h * 0.135, cx + w * 0.075, h * 0.13);
      // Turun ke V-neck kanan
      ctx.lineTo(cx, h * 0.245);
      ctx.closePath();
    }

    // Isi Gaun dengan Pola Batik
    mCtx.save();
    createDressPath(mCtx);
    mCtx.clip();

    mCtx.fillStyle = pattern;
    mCtx.fill();

    // MULTI-PASS SHADING: Crease & Pleat Shadows (MULTIPLY)
    mCtx.globalCompositeOperation = "multiply";
    const sMult = shadowInt || 1.0;

    // Bayangan vertikal lekukan rok (pleat fold troughs)
    const skirtLeft = cx - w * 0.28;
    const skirtRight = cx + w * 0.28;
    const foldW = (skirtRight - skirtLeft) / 7;
    for (let i = 0; i < 7; i++) {
      const fx = skirtLeft + (i + 0.5) * foldW;
      const fTopX = cx + ((i - 3) / 3) * (w * 0.1);
      const troughGrad = mCtx.createLinearGradient(fTopX, h * 0.44, fx, h * 0.88);
      if (i % 2 === 1) {
        // Lembah lekukan gelap
        troughGrad.addColorStop(0, `rgba(0, 0, 0, ${0.45 * sMult})`);
        troughGrad.addColorStop(0.5, `rgba(0, 0, 0, ${0.55 * sMult})`);
        troughGrad.addColorStop(1, `rgba(0, 0, 0, ${0.35 * sMult})`);
      } else {
        // Bayangan lembut lereng lipatan
        troughGrad.addColorStop(0, `rgba(0, 0, 0, ${0.15 * sMult})`);
        troughGrad.addColorStop(1, `rgba(0, 0, 0, ${0.2 * sMult})`);
      }
      mCtx.fillStyle = troughGrad;
      mCtx.beginPath();
      mCtx.moveTo(fTopX - foldW * 0.35, h * 0.44);
      mCtx.lineTo(fTopX + foldW * 0.35, h * 0.44);
      mCtx.lineTo(fx + foldW * 0.45, h * 0.89);
      mCtx.lineTo(fx - foldW * 0.45, h * 0.89);
      mCtx.closePath();
      mCtx.fill();
    }

    // Bayangan lekuk dada & sisi ketiak
    const bodiceShadow = mCtx.createRadialGradient(cx, h * 0.32, w * 0.05, cx, h * 0.32, w * 0.22);
    bodiceShadow.addColorStop(0, "rgba(0,0,0,0)");
    bodiceShadow.addColorStop(0.7, `rgba(0,0,0,${0.25 * sMult})`);
    bodiceShadow.addColorStop(1, `rgba(0,0,0,${0.6 * sMult})`);
    mCtx.fillStyle = bodiceShadow;
    mCtx.fillRect(0, 0, w, h);

    // Bayangan jatuh di bawah ban pinggang
    const waistDrop = mCtx.createLinearGradient(0, h * 0.44, 0, h * 0.50);
    waistDrop.addColorStop(0, `rgba(0,0,0,${0.5 * sMult})`);
    waistDrop.addColorStop(1, "rgba(0,0,0,0)");
    mCtx.fillStyle = waistDrop;
    mCtx.fillRect(cx - w * 0.16, h * 0.44, w * 0.32, h * 0.06);

    // Bayangan lengan flutter
    const leftSleeveShadow = mCtx.createLinearGradient(cx - w * 0.17, h * 0.2, cx - w * 0.31, h * 0.34);
    leftSleeveShadow.addColorStop(0, "rgba(0,0,0,0)");
    leftSleeveShadow.addColorStop(1, `rgba(0,0,0,${0.45 * sMult})`);
    mCtx.fillStyle = leftSleeveShadow;
    mCtx.fillRect(cx - w * 0.35, h * 0.15, w * 0.2, h * 0.22);

    const rightSleeveShadow = mCtx.createLinearGradient(cx + w * 0.17, h * 0.2, cx + w * 0.31, h * 0.34);
    rightSleeveShadow.addColorStop(0, "rgba(0,0,0,0)");
    rightSleeveShadow.addColorStop(1, `rgba(0,0,0,${0.45 * sMult})`);
    mCtx.fillStyle = rightSleeveShadow;
    mCtx.fillRect(cx + w * 0.15, h * 0.15, w * 0.2, h * 0.22);

    // MULTI-PASS LIGHTING: Specular Highlights & Sheen (SCREEN)
    mCtx.globalCompositeOperation = "screen";
    const hMult = highlightInt || 1.0;
    const isSilk = fabric === "silk";
    const hBoost = isSilk ? 1.6 : 1.0;

    // Kilau cahaya puncak lipatan rok
    for (let i = 0; i < 7; i += 2) {
      const fx = skirtLeft + (i + 0.5) * foldW;
      const fTopX = cx + ((i - 3) / 3) * (w * 0.09);
      const crestGrad = mCtx.createLinearGradient(fTopX, h * 0.44, fx, h * 0.88);
      crestGrad.addColorStop(0, `rgba(255, 255, 255, ${0.15 * hMult * hBoost})`);
      crestGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.4 * hMult * hBoost})`);
      crestGrad.addColorStop(1, `rgba(255, 255, 255, ${0.1 * hMult * hBoost})`);
      mCtx.fillStyle = crestGrad;
      mCtx.beginPath();
      mCtx.moveTo(fTopX - foldW * 0.15, h * 0.44);
      mCtx.lineTo(fTopX + foldW * 0.15, h * 0.44);
      mCtx.lineTo(fx + foldW * 0.2, h * 0.88);
      mCtx.lineTo(fx - foldW * 0.2, h * 0.88);
      mCtx.closePath();
      mCtx.fill();
    }

    // Kilau cahaya dada & bahu
    const bustHighlight = mCtx.createRadialGradient(cx - w * 0.04, h * 0.28, 5, cx - w * 0.04, h * 0.28, w * 0.1);
    bustHighlight.addColorStop(0, `rgba(255,255,255,${0.35 * hMult * hBoost})`);
    bustHighlight.addColorStop(1, "rgba(255,255,255,0)");
    mCtx.fillStyle = bustHighlight;
    mCtx.fillRect(cx - w * 0.15, h * 0.2, w * 0.22, h * 0.18);

    // Tekstur serat kain alami (Linen / Canvas Weave)
    if (fabric === "linen" || fabric === "canvas") {
      mCtx.globalCompositeOperation = "overlay";
      mCtx.strokeStyle = "rgba(0,0,0,0.18)";
      mCtx.lineWidth = 1;
      const step = fabric === "canvas" ? 4 : 3;
      for (let y = h * 0.12; y < h * 0.9; y += step) {
        mCtx.beginPath();
        mCtx.moveTo(cx - w * 0.35, y);
        mCtx.lineTo(cx + w * 0.35, y);
        mCtx.stroke();
      }
    }

    mCtx.restore(); // Selesai clipping gaun

    // DETAIL JAHITAN & AKSESORIS REALISTIS (Sesuai Gambar 1)
    mCtx.save();
    
    // Garis tepi halus
    createDressPath(mCtx);
    mCtx.strokeStyle = "rgba(26, 22, 18, 0.45)";
    mCtx.lineWidth = 1.5;
    mCtx.stroke();

    // Jahitan karet kerut pinggang (smocking elastic)
    mCtx.strokeStyle = "rgba(26, 22, 18, 0.5)";
    mCtx.lineWidth = 1.2;
    for (let s = 0; s < 4; s++) {
      const sy = h * 0.38 + s * (h * 0.018);
      mCtx.beginPath();
      mCtx.moveTo(cx - w * 0.123, sy);
      mCtx.quadraticCurveTo(cx, sy + h * 0.005, cx + w * 0.123, sy);
      mCtx.stroke();
    }

    // Topstitching V-neck
    mCtx.strokeStyle = "rgba(201, 165, 103, 0.7)";
    mCtx.lineWidth = 1.5;
    mCtx.beginPath();
    mCtx.moveTo(cx - w * 0.075, h * 0.13);
    mCtx.lineTo(cx, h * 0.245);
    mCtx.lineTo(cx + w * 0.075, h * 0.13);
    mCtx.stroke();

    // Tali serut leher (Braided Drawstrings) dengan manik kuningan
    mCtx.strokeStyle = "#E6D3A7";
    mCtx.lineWidth = 2.5;
    // Tali kiri
    mCtx.beginPath();
    mCtx.moveTo(cx - 3, h * 0.245);
    mCtx.quadraticCurveTo(cx - 16, h * 0.29, cx - 12, h * 0.34);
    mCtx.stroke();
    // Manik emas kiri
    mCtx.fillStyle = "#C9A567";
    mCtx.beginPath();
    mCtx.arc(cx - 12, h * 0.345, 5, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.strokeStyle = "#8A6427";
    mCtx.lineWidth = 1.5;
    mCtx.stroke();

    // Tali kanan
    mCtx.strokeStyle = "#E6D3A7";
    mCtx.lineWidth = 2.5;
    mCtx.beginPath();
    mCtx.moveTo(cx + 3, h * 0.245);
    mCtx.quadraticCurveTo(cx + 14, h * 0.28, cx + 10, h * 0.35);
    mCtx.stroke();
    // Manik emas kanan
    mCtx.fillStyle = "#C9A567";
    mCtx.beginPath();
    mCtx.arc(cx + 10, h * 0.355, 5, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.strokeStyle = "#8A6427";
    mCtx.lineWidth = 1.5;
    mCtx.stroke();

    mCtx.restore();
  }

  // =========================================================================
  // 2. MOCKUP TOTE BAG KRIYA KULIT & KANVAS (SESUAI GAMBAR REFERENSI 2)
  // =========================================================================
  function drawLeatherStraps(mCtx, w, h, cx, isBack) {
    mCtx.save();
    const strapW = 28;
    const topArchY = h * 0.12;

    // Tali Kiri
    mCtx.beginPath();
    mCtx.moveTo(cx - w * 0.14 - strapW / 2, h * 0.52);
    mCtx.bezierCurveTo(cx - w * 0.16, h * 0.32, cx - w * 0.14, topArchY, cx - w * 0.10, topArchY);
    mCtx.bezierCurveTo(cx - w * 0.08, topArchY, cx - w * 0.11, h * 0.32, cx - w * 0.14 + strapW / 2, h * 0.52);
    mCtx.closePath();

    const leatherGrad = mCtx.createLinearGradient(0, topArchY, 0, h * 0.52);
    if (isBack) {
      leatherGrad.addColorStop(0, "#4A240A");
      leatherGrad.addColorStop(1, "#361A07");
    } else {
      leatherGrad.addColorStop(0, "#8B4513");
      leatherGrad.addColorStop(0.5, "#A0522D");
      leatherGrad.addColorStop(1, "#5C2E0B");
    }
    mCtx.fillStyle = leatherGrad;
    mCtx.fill();

    // Jahitan Tepi Tali Kulit (Depan saja)
    if (!isBack) {
      mCtx.strokeStyle = "rgba(230, 211, 167, 0.85)";
      mCtx.lineWidth = 1.5;
      mCtx.setLineDash([4, 3]);
      mCtx.stroke();
      mCtx.setLineDash([]);

      // Patch Penguat Kulit & Rivet Logam di Tas
      const leftAnchorX = cx - w * 0.14;
      const anchorY = h * 0.48;
      mCtx.fillStyle = "#6E350E";
      mCtx.fillRect(leftAnchorX - strapW / 2 - 3, anchorY - 25, strapW + 6, 42);
      mCtx.strokeStyle = "#E6D3A7";
      mCtx.lineWidth = 1.5;
      mCtx.setLineDash([3, 2]);
      mCtx.strokeRect(leftAnchorX - strapW / 2 - 3, anchorY - 25, strapW + 6, 42);
      // Jahitan X penguat
      mCtx.beginPath();
      mCtx.moveTo(leftAnchorX - strapW / 2 - 1, anchorY - 23);
      mCtx.lineTo(leftAnchorX + strapW / 2 + 1, anchorY + 15);
      mCtx.moveTo(leftAnchorX + strapW / 2 + 1, anchorY - 23);
      mCtx.lineTo(leftAnchorX - strapW / 2 - 1, anchorY + 15);
      mCtx.stroke();
      mCtx.setLineDash([]);

      // Rivet Logam Kuningan
      mCtx.fillStyle = "#C9A567";
      mCtx.beginPath();
      mCtx.arc(leftAnchorX, anchorY - 5, 4.5, 0, Math.PI * 2);
      mCtx.fill();
      mCtx.strokeStyle = "#5C2E0B";
      mCtx.lineWidth = 1;
      mCtx.stroke();
    }

    // Tali Kanan
    mCtx.beginPath();
    mCtx.moveTo(cx + w * 0.14 - strapW / 2, h * 0.52);
    mCtx.bezierCurveTo(cx + w * 0.11, h * 0.32, cx + w * 0.08, topArchY, cx + w * 0.10, topArchY);
    mCtx.bezierCurveTo(cx + w * 0.14, topArchY, cx + w * 0.16, h * 0.32, cx + w * 0.14 + strapW / 2, h * 0.52);
    mCtx.closePath();
    mCtx.fillStyle = leatherGrad;
    mCtx.fill();

    if (!isBack) {
      mCtx.strokeStyle = "rgba(230, 211, 167, 0.85)";
      mCtx.lineWidth = 1.5;
      mCtx.setLineDash([4, 3]);
      mCtx.stroke();
      mCtx.setLineDash([]);

      const rightAnchorX = cx + w * 0.14;
      const anchorY = h * 0.48;
      mCtx.fillStyle = "#6E350E";
      mCtx.fillRect(rightAnchorX - strapW / 2 - 3, anchorY - 25, strapW + 6, 42);
      mCtx.strokeStyle = "#E6D3A7";
      mCtx.lineWidth = 1.5;
      mCtx.setLineDash([3, 2]);
      mCtx.strokeRect(rightAnchorX - strapW / 2 - 3, anchorY - 25, strapW + 6, 42);
      mCtx.beginPath();
      mCtx.moveTo(rightAnchorX - strapW / 2 - 1, anchorY - 23);
      mCtx.lineTo(rightAnchorX + strapW / 2 + 1, anchorY + 15);
      mCtx.moveTo(rightAnchorX + strapW / 2 + 1, anchorY - 23);
      mCtx.lineTo(rightAnchorX - strapW / 2 - 1, anchorY + 15);
      mCtx.stroke();
      mCtx.setLineDash([]);

      // Rivet Logam Kuningan
      mCtx.fillStyle = "#C9A567";
      mCtx.beginPath();
      mCtx.arc(rightAnchorX, anchorY - 5, 4.5, 0, Math.PI * 2);
      mCtx.fill();
      mCtx.strokeStyle = "#5C2E0B";
      mCtx.lineWidth = 1;
      mCtx.stroke();
    }

    mCtx.restore();
  }

  function drawLeatherBadge(mCtx, w, h, cx) {
    mCtx.save();
    const bw = 140;
    const bh = 46;
    const bx = cx - bw / 2;
    const by = h * 0.505;

    // Bayangan badge
    mCtx.fillStyle = "rgba(0,0,0,0.45)";
    drawRoundRect(mCtx, bx + 2, by + 4, bw, bh, 6);
    mCtx.fill();

    // Badan Kulit Badge
    const badgeGrad = mCtx.createLinearGradient(0, by, 0, by + bh);
    badgeGrad.addColorStop(0, "#8B4513");
    badgeGrad.addColorStop(0.5, "#A0522D");
    badgeGrad.addColorStop(1, "#5C2E0B");
    mCtx.fillStyle = badgeGrad;
    drawRoundRect(mCtx, bx, by, bw, bh, 5);
    mCtx.fill();

    // Jahitan Tepi Badge
    mCtx.strokeStyle = "rgba(230, 211, 167, 0.85)";
    mCtx.lineWidth = 1.2;
    mCtx.setLineDash([3, 2]);
    drawRoundRect(mCtx, bx + 3, by + 3, bw - 6, bh - 6, 3);
    mCtx.stroke();
    mCtx.setLineDash([]);

    // Teks Embossed Deboss
    mCtx.fillStyle = "#3D1E07";
    mCtx.font = "bold 11px 'Fraunces', serif";
    mCtx.textAlign = "center";
    mCtx.fillText("WARISARA", cx, by + 21);

    mCtx.font = "bold 7px 'Manrope', sans-serif";
    mCtx.fillText("KARYA LOKAL INDONESIA", cx, by + 33);

    mCtx.restore();
  }

  function drawToteBagMockup(mCtx, w, h, pattern, fabric, shadowInt, highlightInt) {
    mCtx.save();

    // Studio Background
    const bgGrad = mCtx.createRadialGradient(w / 2, h * 0.45, w * 0.1, w / 2, h * 0.5, w * 0.7);
    bgGrad.addColorStop(0, "#221D18");
    bgGrad.addColorStop(1, "#14110E");
    mCtx.fillStyle = bgGrad;
    mCtx.fillRect(0, 0, w, h);

    const cx = w / 2;

    // Ground Contact Shadow di bawah dasar tas
    const shadowGrad = mCtx.createRadialGradient(cx, h * 0.885, 20, cx, h * 0.885, w * 0.34);
    shadowGrad.addColorStop(0, `rgba(0, 0, 0, ${0.85 * shadowInt})`);
    shadowGrad.addColorStop(0.35, `rgba(0, 0, 0, ${0.45 * shadowInt})`);
    shadowGrad.addColorStop(0.7, `rgba(0, 0, 0, ${0.15 * shadowInt})`);
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    mCtx.fillStyle = shadowGrad;
    mCtx.beginPath();
    mCtx.ellipse(cx, h * 0.885, w * 0.31, h * 0.05, 0, 0, Math.PI * 2);
    mCtx.fill();

    // 1. Tali Kulit Belakang (digambar sebelum badan tas)
    drawLeatherStraps(mCtx, w, h, cx, true);

    // 2. Siluet Badan Tote Bag
    function createTotePath(ctx) {
      ctx.beginPath();
      const topW = w * 0.31;
      const botW = w * 0.235;
      const topY = h * 0.38;
      const botY = h * 0.87;
      const r = 26;

      ctx.moveTo(cx - topW, topY);
      ctx.quadraticCurveTo(cx, topY + 10, cx + topW, topY);
      ctx.lineTo(cx + botW, botY - r);
      ctx.quadraticCurveTo(cx + botW, botY, cx + botW - r, botY);
      ctx.lineTo(cx - botW + r, botY);
      ctx.quadraticCurveTo(cx - botW, botY, cx - botW, botY - r);
      ctx.closePath();
    }

    // Isi Badan Tas dengan Motif Batik
    mCtx.save();
    createTotePath(mCtx);
    mCtx.clip();

    mCtx.fillStyle = pattern;
    mCtx.fill();

    // Tekstur Anyaman Kanvas Kriya Tebal (Authentic Heavy Canvas Weave)
    mCtx.globalCompositeOperation = "overlay";
    mCtx.strokeStyle = "rgba(0,0,0,0.18)";
    mCtx.lineWidth = 1;
    for (let y = h * 0.36; y < h * 0.89; y += 4) {
      mCtx.beginPath();
      mCtx.moveTo(cx - w * 0.35, y);
      mCtx.lineTo(cx + w * 0.35, y);
      mCtx.stroke();
    }

    // Shading Bentuk Melengkung (Barrel 3D Shading - MULTIPLY)
    mCtx.globalCompositeOperation = "multiply";
    const sMult = shadowInt || 1.0;
    const bodyShade = mCtx.createLinearGradient(cx - w * 0.31, 0, cx + w * 0.31, 0);
    bodyShade.addColorStop(0, `rgba(0,0,0,${0.6 * sMult})`);
    bodyShade.addColorStop(0.18, `rgba(0,0,0,${0.18 * sMult})`);
    bodyShade.addColorStop(0.5, "rgba(0,0,0,0)");
    bodyShade.addColorStop(0.82, `rgba(0,0,0,${0.25 * sMult})`);
    bodyShade.addColorStop(1, `rgba(0,0,0,${0.65 * sMult})`);
    mCtx.fillStyle = bodyShade;
    mCtx.fillRect(cx - w * 0.35, h * 0.36, w * 0.7, h * 0.55);

    // Bayangan Dasar Bawah
    const botShade = mCtx.createLinearGradient(0, h * 0.76, 0, h * 0.87);
    botShade.addColorStop(0, "rgba(0,0,0,0)");
    botShade.addColorStop(1, `rgba(0,0,0,${0.5 * sMult})`);
    mCtx.fillStyle = botShade;
    mCtx.fillRect(cx - w * 0.35, h * 0.76, w * 0.7, h * 0.12);

    // Highlight Pencahayaan (SCREEN)
    mCtx.globalCompositeOperation = "screen";
    const hMult = highlightInt || 1.0;
    const bodyHigh = mCtx.createLinearGradient(cx - w * 0.18, 0, cx + w * 0.05, 0);
    bodyHigh.addColorStop(0, `rgba(255,255,255,${0.25 * hMult})`);
    bodyHigh.addColorStop(1, "rgba(255,255,255,0)");
    mCtx.fillStyle = bodyHigh;
    mCtx.fillRect(cx - w * 0.22, h * 0.38, w * 0.32, h * 0.5);

    mCtx.restore(); // Selesai clip tas

    // 3. Garis Tepi Kulit Bibir Tas (Top Rim Leather Binding)
    mCtx.save();
    mCtx.beginPath();
    const topW = w * 0.31;
    const topY = h * 0.38;
    mCtx.moveTo(cx - topW - 2, topY - 3);
    mCtx.quadraticCurveTo(cx, topY + 7, cx + topW + 2, topY - 3);
    mCtx.lineTo(cx + topW + 2, topY + 7);
    mCtx.quadraticCurveTo(cx, topY + 17, cx - topW - 2, topY + 7);
    mCtx.closePath();
    const rimGrad = mCtx.createLinearGradient(0, topY, 0, topY + 10);
    rimGrad.addColorStop(0, "#8B4513");
    rimGrad.addColorStop(0.5, "#A0522D");
    rimGrad.addColorStop(1, "#5C2E0B");
    mCtx.fillStyle = rimGrad;
    mCtx.fill();
    mCtx.strokeStyle = "rgba(230, 211, 167, 0.75)";
    mCtx.lineWidth = 1.2;
    mCtx.setLineDash([4, 3]);
    mCtx.stroke();
    mCtx.restore();

    // 4. Tali Kulit Depan & Rivet Logam (Front Leather Straps)
    drawLeatherStraps(mCtx, w, h, cx, false);

    // 5. Badge Kulit Tengah "WARISARA KARYA LOKAL" (Sesuai Gambar 2)
    drawLeatherBadge(mCtx, w, h, cx);

    mCtx.restore();
  }

  // =========================================================================
  // 3. MOCKUP KEMEJA BATIK PRIA MODERN FIT
  // =========================================================================
  function drawShirtMockup(mCtx, w, h, pattern, fabric, shadowInt, highlightInt) {
    mCtx.save();

    const bgGrad = mCtx.createRadialGradient(w / 2, h * 0.45, w * 0.1, w / 2, h * 0.5, w * 0.7);
    bgGrad.addColorStop(0, "#221D18");
    bgGrad.addColorStop(1, "#14110E");
    mCtx.fillStyle = bgGrad;
    mCtx.fillRect(0, 0, w, h);

    const cx = w / 2;

    // Contact shadow
    const shadowGrad = mCtx.createRadialGradient(cx, h * 0.90, 20, cx, h * 0.90, w * 0.35);
    shadowGrad.addColorStop(0, `rgba(0,0,0,${0.7 * shadowInt})`);
    shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
    mCtx.fillStyle = shadowGrad;
    mCtx.beginPath();
    mCtx.ellipse(cx, h * 0.90, w * 0.32, h * 0.045, 0, 0, Math.PI * 2);
    mCtx.fill();

    function createShirtPath(ctx) {
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.12, h * 0.15);
      ctx.lineTo(cx - w * 0.28, h * 0.21);
      ctx.lineTo(cx - w * 0.38, h * 0.46);
      ctx.lineTo(cx - w * 0.26, h * 0.52);
      ctx.lineTo(cx - w * 0.22, h * 0.42);
      ctx.lineTo(cx - w * 0.23, h * 0.86);
      ctx.quadraticCurveTo(cx, h * 0.91, cx + w * 0.23, h * 0.86);
      ctx.lineTo(cx + w * 0.22, h * 0.42);
      ctx.lineTo(cx + w * 0.26, h * 0.52);
      ctx.lineTo(cx + w * 0.38, h * 0.46);
      ctx.lineTo(cx + w * 0.28, h * 0.21);
      ctx.lineTo(cx + w * 0.12, h * 0.15);
      ctx.quadraticCurveTo(cx, h * 0.20, cx - w * 0.12, h * 0.15);
      ctx.closePath();
    }

    mCtx.save();
    createShirtPath(mCtx);
    mCtx.clip();

    mCtx.fillStyle = pattern;
    mCtx.fill();

    // Multi-pass shadows (MULTIPLY)
    mCtx.globalCompositeOperation = "multiply";
    const sMult = shadowInt || 1.0;
    const shirtShade = mCtx.createLinearGradient(cx - w * 0.25, 0, cx + w * 0.25, 0);
    shirtShade.addColorStop(0, `rgba(0,0,0,${0.5 * sMult})`);
    shirtShade.addColorStop(0.2, "rgba(0,0,0,0.1)");
    shirtShade.addColorStop(0.5, "rgba(0,0,0,0)");
    shirtShade.addColorStop(0.8, "rgba(0,0,0,0.15)");
    shirtShade.addColorStop(1, `rgba(0,0,0,${0.55 * sMult})`);
    mCtx.fillStyle = shirtShade;
    mCtx.fillRect(0, 0, w, h);

    // Highlights (SCREEN)
    mCtx.globalCompositeOperation = "screen";
    const hMult = highlightInt || 1.0;
    const shirtHigh = mCtx.createRadialGradient(cx - w * 0.05, h * 0.35, 10, cx - w * 0.05, h * 0.35, w * 0.2);
    shirtHigh.addColorStop(0, `rgba(255,255,255,${0.28 * hMult})`);
    shirtHigh.addColorStop(1, "rgba(255,255,255,0)");
    mCtx.fillStyle = shirtHigh;
    mCtx.fillRect(0, 0, w, h);

    mCtx.restore();

    // Detail Kemeja: Placket Depan & Kancing Kayu
    mCtx.save();
    // Placket tengah
    mCtx.fillStyle = "rgba(0, 0, 0, 0.25)";
    mCtx.fillRect(cx - 14, h * 0.18, 28, h * 0.70);
    mCtx.strokeStyle = "rgba(201, 165, 103, 0.6)";
    mCtx.lineWidth = 1.2;
    mCtx.strokeRect(cx - 14, h * 0.18, 28, h * 0.70);

    // 5 Kancing Mutiara / Kayu dengan 4 lubang jahitan
    for (let b = 1; b <= 5; b++) {
      const by = h * 0.24 + b * (h * 0.115);
      mCtx.fillStyle = "#E6D3A7";
      mCtx.beginPath();
      mCtx.arc(cx, by, 6.5, 0, Math.PI * 2);
      mCtx.fill();
      mCtx.strokeStyle = "#8A6427";
      mCtx.lineWidth = 1.5;
      mCtx.stroke();

      // Lubang jahitan kancing
      mCtx.fillStyle = "#3D1E07";
      mCtx.fillRect(cx - 2.5, by - 2.5, 1.5, 1.5);
      mCtx.fillRect(cx + 1, by - 2.5, 1.5, 1.5);
      mCtx.fillRect(cx - 2.5, by + 1, 1.5, 1.5);
      mCtx.fillRect(cx + 1, by + 1, 1.5, 1.5);
    }

    // Kerah Kemeja (Collar points)
    mCtx.beginPath();
    mCtx.moveTo(cx - w * 0.12, h * 0.15);
    mCtx.lineTo(cx - w * 0.04, h * 0.23);
    mCtx.lineTo(cx, h * 0.18);
    mCtx.lineTo(cx + w * 0.04, h * 0.23);
    mCtx.lineTo(cx + w * 0.12, h * 0.15);
    mCtx.strokeStyle = "rgba(26, 22, 18, 0.7)";
    mCtx.lineWidth = 3;
    mCtx.stroke();

    // Saku Dada Kiri
    mCtx.strokeStyle = "rgba(201, 165, 103, 0.65)";
    mCtx.lineWidth = 1.5;
    mCtx.setLineDash([3, 2]);
    drawRoundRect(mCtx, cx - w * 0.18, h * 0.32, w * 0.08, h * 0.10, 4);
    mCtx.stroke();
    mCtx.setLineDash([]);

    mCtx.restore();
  }

  // =========================================================================
  // 4. MOCKUP SELENDANG SUTRA (SILK SCARF WITH GOLD FRINGES)
  // =========================================================================
  function drawScarfMockup(mCtx, w, h, pattern, fabric, shadowInt, highlightInt) {
    mCtx.save();

    const bgGrad = mCtx.createRadialGradient(w / 2, h * 0.45, w * 0.1, w / 2, h * 0.5, w * 0.7);
    bgGrad.addColorStop(0, "#221D18");
    bgGrad.addColorStop(1, "#14110E");
    mCtx.fillStyle = bgGrad;
    mCtx.fillRect(0, 0, w, h);

    function createScarfPath(ctx) {
      ctx.beginPath();
      ctx.moveTo(w * 0.22, h * 0.12);
      ctx.bezierCurveTo(w * 0.45, h * 0.08, w * 0.62, h * 0.20, w * 0.78, h * 0.14);
      ctx.bezierCurveTo(w * 0.88, h * 0.45, w * 0.75, h * 0.75, w * 0.76, h * 0.88);
      ctx.lineTo(w * 0.42, h * 0.88);
      ctx.bezierCurveTo(w * 0.40, h * 0.68, w * 0.18, h * 0.50, w * 0.22, h * 0.12);
      ctx.closePath();
    }

    mCtx.save();
    createScarfPath(mCtx);
    mCtx.clip();

    mCtx.fillStyle = pattern;
    mCtx.fill();

    // Kilau sutra elegan
    mCtx.globalCompositeOperation = "screen";
    const hMult = highlightInt || 1.0;
    const sheen = mCtx.createLinearGradient(0, 0, w, h);
    sheen.addColorStop(0, `rgba(255,255,255,${0.35 * hMult})`);
    sheen.addColorStop(0.35, "rgba(255,255,255,0)");
    sheen.addColorStop(0.65, `rgba(255,255,255,${0.4 * hMult})`);
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    mCtx.fillStyle = sheen;
    mCtx.fill();

    // Lekukan bayangan (MULTIPLY)
    mCtx.globalCompositeOperation = "multiply";
    const sMult = shadowInt || 1.0;
    const scarfShadow = mCtx.createLinearGradient(w * 0.2, 0, w * 0.8, 0);
    scarfShadow.addColorStop(0, `rgba(0,0,0,${0.4 * sMult})`);
    scarfShadow.addColorStop(0.5, "rgba(0,0,0,0)");
    scarfShadow.addColorStop(1, `rgba(0,0,0,${0.5 * sMult})`);
    mCtx.fillStyle = scarfShadow;
    mCtx.fillRect(0, 0, w, h);

    mCtx.restore();

    // Rumbai / Rumbai Emas Selendang di Ujung Bawah
    mCtx.strokeStyle = "#C9A567";
    mCtx.lineWidth = 2.5;
    for (let t = w * 0.43; t <= w * 0.75; t += 7) {
      mCtx.beginPath();
      mCtx.moveTo(t, h * 0.88);
      mCtx.lineTo(t + (Math.sin(t) * 3), h * 0.94);
      mCtx.stroke();
    }

    mCtx.restore();
  }

  // =========================================================================
  // 5. MOCKUP BANTAL INTERIOR DEKORASI (CUSHION WITH PIPING)
  // =========================================================================
  function drawCushionMockup(mCtx, w, h, pattern, fabric, shadowInt, highlightInt) {
    mCtx.save();

    const bgGrad = mCtx.createRadialGradient(w / 2, h * 0.45, w * 0.1, w / 2, h * 0.5, w * 0.7);
    bgGrad.addColorStop(0, "#221D18");
    bgGrad.addColorStop(1, "#14110E");
    mCtx.fillStyle = bgGrad;
    mCtx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const r = w * 0.38;

    // Contact shadow
    const shadowGrad = mCtx.createRadialGradient(cx, cy + r * 0.92, 20, cx, cy + r * 0.92, r * 1.1);
    shadowGrad.addColorStop(0, `rgba(0,0,0,${0.75 * shadowInt})`);
    shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
    mCtx.fillStyle = shadowGrad;
    mCtx.beginPath();
    mCtx.ellipse(cx, cy + r * 0.92, r * 0.95, r * 0.15, 0, 0, Math.PI * 2);
    mCtx.fill();

    function createCushionPath(ctx) {
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.9, cy - r * 0.9);
      ctx.quadraticCurveTo(cx, cy - r * 1.05, cx + r * 0.9, cy - r * 0.9);
      ctx.quadraticCurveTo(cx + r * 1.05, cy, cx + r * 0.9, cy + r * 0.9);
      ctx.quadraticCurveTo(cx, cy + r * 1.05, cx - r * 0.9, cy + r * 0.9);
      ctx.quadraticCurveTo(cx - r * 1.05, cy, cx - r * 0.9, cy - r * 0.9);
      ctx.closePath();
    }

    mCtx.save();
    createCushionPath(mCtx);
    mCtx.clip();

    mCtx.fillStyle = pattern;
    mCtx.fill();

    // Shading cembung bantal (Radial Gradient - MULTIPLY)
    mCtx.globalCompositeOperation = "multiply";
    const sMult = shadowInt || 1.0;
    const pillowShade = mCtx.createRadialGradient(cx, cy, r * 0.15, cx, cy, r * 1.05);
    pillowShade.addColorStop(0, "rgba(0,0,0,0)");
    pillowShade.addColorStop(0.7, `rgba(0,0,0,${0.25 * sMult})`);
    pillowShade.addColorStop(1, `rgba(0,0,0,${0.7 * sMult})`);
    mCtx.fillStyle = pillowShade;
    mCtx.fill();

    // Highlight cembung tengah (SCREEN)
    mCtx.globalCompositeOperation = "screen";
    const hMult = highlightInt || 1.0;
    const pillowHigh = mCtx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 5, cx - r * 0.2, cy - r * 0.2, r * 0.6);
    pillowHigh.addColorStop(0, `rgba(255,255,255,${0.35 * hMult})`);
    pillowHigh.addColorStop(1, "rgba(255,255,255,0)");
    mCtx.fillStyle = pillowHigh;
    mCtx.fill();

    mCtx.restore();

    // Piped cording border (Tali bisban pinggir bantal)
    mCtx.strokeStyle = "rgba(201, 165, 103, 0.75)";
    mCtx.lineWidth = 4;
    createCushionPath(mCtx);
    mCtx.stroke();

    // Kancing tuft tengah
    mCtx.fillStyle = "#A47E3F";
    mCtx.beginPath();
    mCtx.arc(cx, cy, 7, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.strokeStyle = "#2A1E14";
    mCtx.lineWidth = 2;
    mCtx.stroke();

    mCtx.restore();
  }

  // =========================================================================
  // 6. LEMBAR SPEK DESAIN FASHION & KRIYA / TECH PACK (SESUAI GAMBAR 1)
  // =========================================================================
  function exportFashionTechPack() {
    const tWidth = 1600;
    const tHeight = 1100;
    const tCanvas = document.createElement("canvas");
    tCanvas.width = tWidth;
    tCanvas.height = tHeight;
    const tCtx = tCanvas.getContext("2d");

    // Latar Belakang Kartu Studio Bersih & Mewah (Warm Charcoal Board)
    tCtx.fillStyle = "#181512";
    tCtx.fillRect(0, 0, tWidth, tHeight);

    // Frame Border Kuningan Halus
    tCtx.strokeStyle = "rgba(201, 165, 103, 0.4)";
    tCtx.lineWidth = 2;
    tCtx.strokeRect(30, 30, tWidth - 60, tHeight - 60);

    // HEADER TECH PACK
    tCtx.fillStyle = "#C9A567";
    tCtx.font = "bold 13px 'Manrope', sans-serif";
    tCtx.fillText("WARISARA CREATIVE LAB STUDIO • TECHNICAL SPECIFICATION SHEET", 60, 75);

    tCtx.fillStyle = "#FAF6EE";
    tCtx.font = "bold 28px 'Fraunces', serif";
    const info = MOTIF_INFO[StudioState.motif] || MOTIF_INFO.kawung;
    const prodName = {
      dress: "Gaun Wastra Nusantara (Midi Boho Dress)",
      totebag: "Tas Tote Bag Kriya Kulit (Canvas & Leather)",
      shirt: "Kemeja Batik Pria (Modern Fit Shirt)",
      scarf: "Selendang Sutra Alam (Silk Scarf)",
      cushion: "Bantal Dekorasi Interior (Plush Cushion)"
    }[StudioState.mockupProduct || "dress"];

    tCtx.fillText(`${info.title.replace("Makna Filosofi ", "")} — ${prodName}`, 60, 115);

    const hashString = `WRS-TECH-${StudioState.motif.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    tCtx.fillStyle = "rgba(251, 248, 242, 0.5)";
    tCtx.font = "12px 'Courier New', monospace";
    tCtx.textAlign = "right";
    tCtx.fillText(`Spec ID: #${hashString}`, tWidth - 60, 75);
    tCtx.fillText(`Tanggal Terbit: ${new Date().toLocaleDateString("id-ID")}`, tWidth - 60, 95);
    tCtx.textAlign = "left";

    // Garis Pemisah Header
    tCtx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    tCtx.lineWidth = 1;
    tCtx.beginPath();
    tCtx.moveTo(60, 140);
    tCtx.lineTo(tWidth - 60, 140);
    tCtx.stroke();

    // SISI KIRI: 2D PATTERN SWATCH + PALETTE TABLE (Sesuai Gambar 1)
    // 1. Swatch Pola Datar 2D (360x360 px)
    tCtx.save();
    tCtx.strokeStyle = "rgba(201, 165, 103, 0.5)";
    tCtx.lineWidth = 2;
    tCtx.strokeRect(60, 170, 360, 360);
    tCtx.drawImage(canvas, 60, 170, 360, 360);
    tCtx.restore();

    tCtx.fillStyle = "#FAF6EE";
    tCtx.font = "bold 13px 'Manrope', sans-serif";
    tCtx.fillText("SAMPEL POLA SEAMLESS TILE (2D)", 60, 560);
    tCtx.font = "11px 'Manrope', sans-serif";
    tCtx.fillStyle = "rgba(251, 248, 242, 0.6)";
    tCtx.fillText(`Grid Densitas: ${StudioState.density}x${StudioState.density} • Sudut: ${StudioState.rotation}° • Fraktal: ${StudioState.complexity}`, 60, 580);

    // 2. Color Palette Table (Ekstraksi Warna Sesuai Gambar 1: Sunglow, Indigo, dsb)
    const colorSwatches = [
      { role: "Garis Canting", hex: StudioState.primaryColor, name: getColorCulturalName(StudioState.primaryColor) },
      { role: "Isian Ornamen", hex: StudioState.secondaryColor, name: getColorCulturalName(StudioState.secondaryColor) },
      { role: "Inti Roset", hex: StudioState.highlightColor, name: getColorCulturalName(StudioState.highlightColor) },
      { role: "Dasar Kain", hex: StudioState.bgColor, name: getColorCulturalName(StudioState.bgColor) }
    ];

    let swatchY = 620;
    tCtx.fillStyle = "#C9A567";
    tCtx.font = "bold 12px 'Manrope', sans-serif";
    tCtx.fillText("PALET WARNA PRODUKSI (COLOR FORMULATION)", 60, swatchY);

    swatchY += 20;
    colorSwatches.forEach((c) => {
      // Kotak warna
      tCtx.fillStyle = c.hex;
      tCtx.fillRect(60, swatchY, 26, 26);
      tCtx.strokeStyle = "rgba(255,255,255,0.2)";
      tCtx.lineWidth = 1;
      tCtx.strokeRect(60, swatchY, 26, 26);

      // Label & Hex
      tCtx.fillStyle = "#FAF6EE";
      tCtx.font = "bold 12px 'Manrope', sans-serif";
      tCtx.fillText(c.name, 98, swatchY + 13);
      tCtx.fillStyle = "rgba(251, 248, 242, 0.55)";
      tCtx.font = "10px 'Courier New', monospace";
      tCtx.fillText(`${c.hex.toUpperCase()} • ${c.role}`, 98, swatchY + 24);

      swatchY += 34;
    });

    // 3. Spesifikasi Bahan Tekstil (Sesuai Gambar 1: Fabric Spec)
    const fabNames = {
      cotton: { name: "Katun Mori Primissima Halus", comp: "100% Katun Organik Tropis", weave: "Plain Weave Ring-spun" },
      silk: { name: "Sutra Alam ATBM Mahakarya", comp: "100% Pure Mulberry Silk", weave: "Lustrous Satin Weave" },
      linen: { name: "Linen Rami Wastra Nusantara", comp: "70% Linen, 30% Katun Alami", weave: "Slub Organic Weave" },
      canvas: { name: "Kanvas Kriya Tebal Premium", comp: "100% Heavy Duty Cotton Canvas", weave: "Dobby Heavy Weave" }
    }[StudioState.mockupFabric || "cotton"];

    let fabY = swatchY + 20;
    tCtx.fillStyle = "#C9A567";
    tCtx.font = "bold 12px 'Manrope', sans-serif";
    tCtx.fillText("SPESIFIKASI MATERIAL KAIN (FABRIC SPEC)", 60, fabY);

    fabY += 20;
    tCtx.fillStyle = "#FAF6EE";
    tCtx.font = "bold 13px 'Manrope', sans-serif";
    tCtx.fillText(fabNames.name, 60, fabY);
    tCtx.fillStyle = "rgba(251, 248, 242, 0.65)";
    tCtx.font = "11px 'Manrope', sans-serif";
    tCtx.fillText(`Komposisi: ${fabNames.comp}`, 60, fabY + 18);
    tCtx.fillText(`Anyaman Tekstil: ${fabNames.weave}`, 60, fabY + 34);

    // SISI KANAN: LARGE 3D PHOTOREALISTIC MOCKUP (Sesuai Gambar 1 & 2)
    const mockupCanvas = document.getElementById("mockup-preview-canvas");
    if (mockupCanvas) {
      tCtx.save();
      // Frame Mockup
      tCtx.strokeStyle = "rgba(201, 165, 103, 0.5)";
      tCtx.lineWidth = 2;
      tCtx.strokeRect(460, 170, 780, 780);
      tCtx.drawImage(mockupCanvas, 460, 170, 780, 780);
      tCtx.restore();
    }

    // KOLOM KANAN JAUH: FILOSOFI & DOKUMEN LEGAL
    const colRightX = 1270;
    tCtx.fillStyle = "#C9A567";
    tCtx.font = "bold 12px 'Manrope', sans-serif";
    tCtx.fillText("FILOSOFI & MAKNA BUDAYA", colRightX, 190);

    tCtx.fillStyle = "#FAF6EE";
    tCtx.font = "12px 'Manrope', sans-serif";
    wrapText(tCtx, info.desc, colRightX, 215, 270, 18);

    tCtx.fillStyle = "#C9A567";
    tCtx.font = "bold 12px 'Manrope', sans-serif";
    tCtx.fillText("WILAYAH ASAL PUSAKA", colRightX, 360);
    tCtx.fillStyle = "#FAF6EE";
    tCtx.font = "12px 'Manrope', sans-serif";
    tCtx.fillText(info.origin, colRightX, 385);

    tCtx.fillStyle = "#C9A567";
    tCtx.font = "bold 12px 'Manrope', sans-serif";
    tCtx.fillText("SIMBOLISME AGUNG", colRightX, 430);
    tCtx.fillStyle = "#FAF6EE";
    tCtx.font = "12px 'Manrope', sans-serif";
    wrapText(tCtx, info.symbolism, colRightX, 455, 270, 18);

    // Stempel Verifikasi Warisara
    tCtx.strokeStyle = "#C9A567";
    tCtx.lineWidth = 2;
    drawRoundRect(tCtx, colRightX, 810, 260, 130, 10);
    tCtx.stroke();

    tCtx.fillStyle = "#C9A567";
    tCtx.font = "bold 11px 'Fraunces', serif";
    tCtx.textAlign = "center";
    tCtx.fillText("WARISARA DIGITAL HERITAGE LAB", colRightX + 130, 845);
    tCtx.fillStyle = "#FAF6EE";
    tCtx.font = "10px 'Manrope', sans-serif";
    tCtx.fillText("Official Certified Digital Mockup", colRightX + 130, 870);
    tCtx.font = "9px 'Courier New', monospace";
    tCtx.fillText(`SEAL: #${hashString.slice(-8)}`, colRightX + 130, 895);
    tCtx.fillText("Ready for Artisan Production", colRightX + 130, 915);
    tCtx.textAlign = "left";

    // FOOTER LEGAL
    tCtx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    tCtx.lineWidth = 1;
    tCtx.beginPath();
    tCtx.moveTo(60, 1020);
    tCtx.lineTo(tWidth - 60, 1020);
    tCtx.stroke();

    tCtx.fillStyle = "rgba(251, 248, 242, 0.5)";
    tCtx.font = "11px 'Manrope', sans-serif";
    tCtx.fillText("© 2026 WARISARA — Dikembangkan untuk TECHTOPIA Vol. 2 (INTEGER#8). Hak Cipta Desain Digital Dilindungi.", 60, 1050);

    // Unduh Otomatis File PNG
    const link = document.createElement("a");
    link.download = `WARISARA-TECHPACK-${StudioState.motif.toUpperCase()}-${(StudioState.mockupProduct || "DRESS").toUpperCase()}.png`;
    link.href = tCanvas.toDataURL("image/png");
    link.click();
  }

  function openCertificateModal() {
    const backdrop = document.getElementById("cert-modal-backdrop");
    const previewImg = document.getElementById("cert-preview-img");
    const previewMotif = document.getElementById("cert-preview-motif");
    const previewHash = document.getElementById("cert-preview-hash");

    const inputName = document.getElementById("cert-input-name");
    const inputTitle = document.getElementById("cert-input-title");
    const inputOrigin = document.getElementById("cert-input-origin");
    const inputAffiliation = document.getElementById("cert-input-affiliation");
    const inputRole = document.getElementById("cert-input-role");
    const inputMessage = document.getElementById("cert-input-message");

    if (!backdrop) return;

    if (previewImg && canvas) {
      previewImg.src = canvas.toDataURL("image/png", 0.7);
    }
    const info = MOTIF_INFO[StudioState.motif] || MOTIF_INFO.kawung;
    if (previewMotif) {
      previewMotif.textContent = `Motif: ${info.title.replace("Makna Filosofi ", "")}`;
    }
    const hashString = `WRS-${StudioState.motif.toUpperCase()}-${StudioState.seed.toString(16).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    if (previewHash) {
      previewHash.textContent = `Kode Otentikasi: #${hashString}`;
    }

    if (inputName) inputName.value = StudioState.authorName || "";
    if (inputTitle) inputTitle.value = StudioState.artworkTitle || `Batik ${info.title.replace("Makna Filosofi Batik ", "")} Kencana`;
    if (inputOrigin) inputOrigin.value = StudioState.authorOrigin || "";
    if (inputAffiliation) inputAffiliation.value = StudioState.affiliation || "";
    if (inputRole) inputRole.value = StudioState.role || "Perancang Digital Wastra";
    if (inputMessage) inputMessage.value = StudioState.message || "";

    backdrop.classList.remove("opacity-0", "pointer-events-none");
    backdrop.classList.add("active");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (inputName) {
      setTimeout(() => inputName.focus(), 150);
    }
  }

  function closeCertificateModal() {
    const backdrop = document.getElementById("cert-modal-backdrop");
    if (!backdrop) return;
    backdrop.classList.remove("active");
    backdrop.classList.add("opacity-0", "pointer-events-none");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function handleCertificateSubmit() {
    const inputName = document.getElementById("cert-input-name");
    const inputTitle = document.getElementById("cert-input-title");
    const inputOrigin = document.getElementById("cert-input-origin");
    const inputAffiliation = document.getElementById("cert-input-affiliation");
    const inputRole = document.getElementById("cert-input-role");
    const inputMessage = document.getElementById("cert-input-message");

    const nameVal = inputName ? inputName.value.trim() : "";
    const titleVal = inputTitle ? inputTitle.value.trim() : "";
    const originVal = inputOrigin ? inputOrigin.value.trim() : "";

    if (!nameVal) {
      alert("Silakan masukkan Nama Lengkap Perancang terlebih dahulu.");
      if (inputName) inputName.focus();
      return;
    }

    if (!titleVal) {
      alert("Silakan masukkan Judul Karya Desain.");
      if (inputTitle) inputTitle.focus();
      return;
    }

    StudioState.authorName = nameVal;
    StudioState.artworkTitle = titleVal;
    StudioState.authorOrigin = originVal || "Nusantara";
    StudioState.affiliation = inputAffiliation ? inputAffiliation.value.trim() : "";
    StudioState.role = inputRole ? inputRole.value : "Perancang Digital Wastra";
    StudioState.message = inputMessage ? inputMessage.value.trim() : "";

    generateCertificate();
    closeCertificateModal();
  }

  function generateCertificate() {
    const certCanvas = document.createElement("canvas");
    certCanvas.width = 1400;
    certCanvas.height = 950;
    const cCtx = certCanvas.getContext("2d");

    cCtx.fillStyle = "#FAF6EE";
    cCtx.fillRect(0, 0, 1400, 950);

    const waterGrad = cCtx.createRadialGradient(700, 475, 50, 700, 475, 600);
    waterGrad.addColorStop(0, "rgba(201, 165, 103, 0.08)");
    waterGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    cCtx.fillStyle = waterGrad;
    cCtx.fillRect(0, 0, 1400, 950);

    cCtx.strokeStyle = "#8A6427";
    cCtx.lineWidth = 16;
    cCtx.strokeRect(36, 36, 1328, 878);

    cCtx.strokeStyle = "#C9A567";
    cCtx.lineWidth = 3;
    cCtx.strokeRect(54, 54, 1292, 842);

    cCtx.strokeStyle = "#D8BD87";
    cCtx.lineWidth = 1;
    cCtx.strokeRect(62, 62, 1276, 826);

    drawCertCorner(cCtx, 62, 62);
    drawCertCorner(cCtx, 1338, 62, Math.PI / 2);
    drawCertCorner(cCtx, 1338, 888, Math.PI);
    drawCertCorner(cCtx, 62, 888, -Math.PI / 2);

    cCtx.beginPath();
    cCtx.arc(700, 105, 26, 0, Math.PI * 2);
    cCtx.fillStyle = "#A47E3F";
    cCtx.fill();
    cCtx.strokeStyle = "#FAF6EE";
    cCtx.lineWidth = 3;
    cCtx.stroke();

    cCtx.fillStyle = "#FAF6EE";
    cCtx.font = "bold 20px 'Fraunces', Georgia, serif";
    cCtx.textAlign = "center";
    cCtx.fillText("W", 700, 112);

    cCtx.fillStyle = "#1A1612";
    cCtx.font = "bold 26px 'Fraunces', Georgia, serif";
    cCtx.textAlign = "center";
    cCtx.fillText("WARISARA DIGITAL HERITAGE CERTIFICATE", 700, 160);

    cCtx.fillStyle = "#8A6427";
    cCtx.font = "bold 13px 'Manrope', sans-serif";
    cCtx.fillText("SERTIFIKAT HAK CIPTA & KEASLIAN DESAIN WASTRA NUSANTARA", 700, 185);

    cCtx.beginPath();
    cCtx.moveTo(480, 205);
    cCtx.lineTo(920, 205);
    cCtx.strokeStyle = "#C9A567";
    cCtx.lineWidth = 1.5;
    cCtx.stroke();

    cCtx.fillStyle = "#5A4F43";
    cCtx.font = "italic 16px 'Fraunces', Georgia, serif";
    cCtx.fillText("Diberikan sebagai pengakuan otentik atas karya kreasi desain wastra kepada:", 700, 240);

    cCtx.fillStyle = "#1A1612";
    cCtx.font = "bold 36px 'Fraunces', Georgia, serif";
    cCtx.fillText(StudioState.authorName.toUpperCase(), 700, 285);

    const affilText = [
      StudioState.role,
      StudioState.authorOrigin ? `Asal: ${StudioState.authorOrigin}` : "",
      StudioState.affiliation ? `(${StudioState.affiliation})` : ""
    ].filter(Boolean).join(" • ");

    cCtx.fillStyle = "#8A6427";
    cCtx.font = "600 14px 'Manrope', sans-serif";
    cCtx.fillText(affilText, 700, 315);

    cCtx.save();
    cCtx.beginPath();
    drawRoundRect(cCtx, 110, 360, 420, 420, 18);
    cCtx.clip();
    cCtx.drawImage(canvas, 110, 360, 420, 420);
    cCtx.restore();

    cCtx.strokeStyle = "#C9A567";
    cCtx.lineWidth = 5;
    cCtx.strokeRect(110, 360, 420, 420);

    cCtx.fillStyle = "rgba(26, 22, 18, 0.9)";
    cCtx.fillRect(110, 745, 420, 35);
    cCtx.fillStyle = "#E6D3A7";
    cCtx.font = "bold 12px 'Manrope', sans-serif";
    cCtx.textAlign = "center";
    cCtx.fillText(`Resolusi Desain Asli: 2400 × 2400 px • Vektor Generatif`, 320, 767);

    const info = MOTIF_INFO[StudioState.motif] || MOTIF_INFO.kawung;
    cCtx.textAlign = "left";

    cCtx.fillStyle = "#8A6427";
    cCtx.font = "bold 12px 'Manrope', sans-serif";
    cCtx.fillText("JUDUL KARYA CIPTA", 580, 385);

    cCtx.fillStyle = "#1A1612";
    cCtx.font = "bold 24px 'Fraunces', serif";
    cCtx.fillText(StudioState.artworkTitle, 580, 415);

    cCtx.fillStyle = "#8A6427";
    cCtx.font = "bold 12px 'Manrope', sans-serif";
    cCtx.fillText("DASAR MOTIF & WILAYAH TRADISI", 580, 460);

    cCtx.fillStyle = "#2A221A";
    cCtx.font = "bold 16px 'Manrope', sans-serif";
    cCtx.fillText(`${info.title.replace("Makna Filosofi ", "")} — ${info.origin}`, 580, 485);

    cCtx.fillStyle = "#8A6427";
    cCtx.font = "bold 12px 'Manrope', sans-serif";
    cCtx.fillText("MAKNA FILOSOFI & SIMBOLISME AGUNG", 580, 530);

    cCtx.fillStyle = "#4A4035";
    cCtx.font = "14px 'Manrope', sans-serif";
    wrapText(cCtx, info.symbolism, 580, 555, 680, 22);

    if (StudioState.message) {
      cCtx.fillStyle = "#8A6427";
      cCtx.font = "bold 12px 'Manrope', sans-serif";
      cCtx.fillText("DEDIKASI / PESAN PERANCANG", 580, 625);

      cCtx.fillStyle = "#1A1612";
      cCtx.font = "italic 14px 'Fraunces', serif";
      wrapText(cCtx, `"${StudioState.message}"`, 580, 650, 680, 22);
    }

    const hashBoxY = StudioState.message ? 710 : 660;
    cCtx.fillStyle = "rgba(201, 165, 103, 0.12)";
    cCtx.strokeStyle = "#C9A567";
    cCtx.lineWidth = 1.5;
    drawRoundRect(cCtx, 580, hashBoxY, 700, 70, 12);
    cCtx.fill();
    cCtx.stroke();

    const hashString = `WRS-${StudioState.motif.toUpperCase()}-${StudioState.seed.toString(16).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    cCtx.fillStyle = "#8A6427";
    cCtx.font = "bold 11px 'Manrope', sans-serif";
    cCtx.fillText("KODE HASH GENERATIF & OTENTIKASI SISTEM:", 600, hashBoxY + 28);

    cCtx.fillStyle = "#1A1612";
    cCtx.font = "bold 14px 'Courier New', monospace";
    cCtx.fillText(`#${hashString}`, 600, hashBoxY + 52);

    const today = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    cCtx.textAlign = "center";
    cCtx.font = "13px 'Manrope', sans-serif";
    cCtx.fillStyle = "#6B6258";
    cCtx.fillText(`Diterbitkan secara sah pada ${today} melalui Studio Kreatif WARISARA`, 700, 865);

    const link = document.createElement("a");
    const cleanFileName = StudioState.authorName.replace(/[^a-zA-Z0-9]/g, "_");
    link.download = `WARISARA-Sertifikat-${StudioState.motif.toUpperCase()}-${cleanFileName}.png`;
    link.href = certCanvas.toDataURL("image/png");
    link.click();
  }

  function drawCertCorner(c, x, y, rotation = 0) {
    c.save();
    c.translate(x, y);
    c.rotate(rotation);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(24, 0);
    c.lineTo(0, 24);
    c.closePath();
    c.fillStyle = "#C9A567";
    c.fill();
    c.restore();
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function exportSvg() {
    const w = 600;
    const h = 600;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n`;
    svg += `  <rect width="100%" height="100%" fill="${StudioState.bgColor}"/>\n`;
    svg += `  \n`;
    svg += `  \n`;
    svg += `  <g stroke="${StudioState.primaryColor}" stroke-width="${StudioState.strokeWidth}" fill="none">\n`;

    const cellSize = w / StudioState.density;
    for (let x = 0; x < w; x += cellSize) {
      for (let y = 0; y < h; y += cellSize) {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        const r = cellSize * 0.4;
        svg += `    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${StudioState.secondaryColor}" fill-opacity="0.2"/>\n`;
        svg += `    <path d="M ${cx - r} ${cy} Q ${cx} ${cy - r} ${cx + r} ${cy} Q ${cx} ${cy + r} ${cx - r} ${cy}" fill="none"/>\n`;
      }
    }
    svg += `  </g>\n`;
    svg += `</svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `WARISARA-${StudioState.motif}-pattern.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function saveToGallery() {
    try {
      const saved = JSON.parse(localStorage.getItem("warisara_creative_gallery") || "[]");
      const newItem = {
        id: "design_" + Date.now(),
        title: prompt("Beri nama karya batik Anda:", `Batik ${StudioState.motif.toUpperCase()} Kreasiku`) || "Batik Tanpa Judul",
        date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        thumbnail: canvas.toDataURL("image/png", 0.6),
        state: JSON.parse(JSON.stringify(StudioState))
      };
      saved.unshift(newItem);
      localStorage.setItem("warisara_creative_gallery", JSON.stringify(saved.slice(0, 15)));
      renderSavedGallery();
      alert("✨ Karya berhasil disimpan ke Galeri Kreasiku!");
    } catch (e) {
      console.error(e);
      alert("Kapasitas penyimpanan penuh. Harap hapus beberapa karya lama.");
    }
  }

  function renderSavedGallery() {
    const galleryGrid = document.getElementById("saved-gallery-grid");
    const countBadge = document.getElementById("saved-gallery-count");
    if (!galleryGrid) return;

    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem("warisara_creative_gallery") || "[]");
    } catch (e) {
      saved = [];
    }
    if (countBadge) countBadge.textContent = `${saved.length} Karya`;

    if (saved.length === 0) {
      galleryGrid.innerHTML = `
        <div class="col-span-full py-8 text-center text-surface/40 text-xs border border-dashed border-white/10 rounded-2xl">
          <span class="material-symbols-outlined text-2xl block mb-2 opacity-50">palette</span>
          Belum ada desain tersimpan. Klik "Simpan Desain" untuk mengabadikan karya Anda.
        </div>
      `;
      return;
    }

    galleryGrid.innerHTML = saved.map((item, idx) => `
      <div class="gallery-saved-card p-3 flex flex-col justify-between group">
        <div class="relative aspect-square rounded-xl overflow-hidden mb-2 bg-[#120F0D]">
          <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
        <div class="mb-2">
          <h5 class="text-xs font-semibold text-surface truncate">${item.title}</h5>
          <span class="text-[10px] text-surface/50 font-mono">${item.date} • ${item.state.motif}</span>
        </div>
        <div class="flex items-center gap-1.5 pt-2 border-t border-white/10">
          <button data-load-idx="${idx}" class="btn-load-saved flex-1 py-1.5 px-2 rounded-lg bg-brass-400/20 hover:bg-brass-400/30 text-brass-300 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1">
            <span class="material-symbols-outlined text-xs">open_in_new</span>
            <span>Muat</span>
          </button>
          <button data-delete-idx="${idx}" class="btn-delete-saved p-1.5 rounded-lg hover:bg-red-500/20 text-surface/50 hover:text-red-300 transition-colors" title="Hapus">
            <span class="material-symbols-outlined text-xs">delete</span>
          </button>
        </div>
      </div>
    `).join("");

    galleryGrid.querySelectorAll(".btn-load-saved").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.loadIdx, 10);
        const item = saved[idx];
        if (item && item.state) {
          Object.assign(StudioState, item.state);
          syncUiToState();
          saveHistoryState();
          render();
          scrollToStudioCanvas();
        }
      });
    });

    galleryGrid.querySelectorAll(".btn-delete-saved").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.deleteIdx, 10);
        saved.splice(idx, 1);
        localStorage.setItem("warisara_creative_gallery", JSON.stringify(saved));
        renderSavedGallery();
      });
    });
  }

  function bindDomEvents() {
    // 1. Studio 4-Tab Inspector Switcher (Motif, Warna, Canting, Mockup 3D)
    document.querySelectorAll(".studio-nav-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetTab = tab.dataset.studioTab;
        StudioState.studioInspectorTab = targetTab;

        document.querySelectorAll(".studio-nav-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const tabMotif = document.getElementById("tab-content-motif");
        const tabColor = document.getElementById("tab-content-color");
        const tabCanting = document.getElementById("tab-content-canting");
        const tabMockup = document.getElementById("tab-content-mockup");

        if (tabMotif) tabMotif.classList.toggle("hidden", targetTab !== "motif");
        if (tabColor) tabColor.classList.toggle("hidden", targetTab !== "color");
        if (tabCanting) tabCanting.classList.toggle("hidden", targetTab !== "canting");
        if (tabMockup) tabMockup.classList.toggle("hidden", targetTab !== "mockup");

        if (targetTab === "canting") {
          StudioState.currentMode = "canting";
          canvas.style.cursor = "crosshair";
        } else {
          StudioState.currentMode = "generative";
          canvas.style.cursor = "default";
        }

        if (targetTab === "mockup") {
          switchViewMode("3d");
        } else {
          switchViewMode("2d");
        }

        render();
      });
    });

    document.querySelectorAll(".mode-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const prevMode = StudioState.currentMode;
        const newMode = btn.dataset.mode;
        if (prevMode === newMode) return;

        document.querySelectorAll(".mode-tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        StudioState.currentMode = newMode;

        const genControls = document.getElementById("panel-generative-controls");
        const cantingControls = document.getElementById("panel-canting-controls");
        const mockupTabs = document.getElementById("mockup-tabs-container");
        const btnRandomize = document.getElementById("btn-randomize-pattern");
        const btnReEdit = document.getElementById("btn-re-edit-motif");

        if (genControls) genControls.classList.toggle("hidden", StudioState.currentMode !== "generative");
        if (cantingControls) cantingControls.classList.toggle("hidden", StudioState.currentMode !== "canting");
        if (mockupTabs) mockupTabs.classList.toggle("hidden", StudioState.currentMode === "canting" && !StudioState.cantingIsPrinted);
        if (btnRandomize) btnRandomize.classList.toggle("hidden", StudioState.currentMode === "canting");
        if (btnReEdit) btnReEdit.classList.toggle("hidden", StudioState.currentMode !== "canting");

        if (StudioState.currentMode === "canting") {
          StudioState.cantingIsPrinted = false;
          StudioState.activeView = "flat";
          if (mockupTabs) mockupTabs.classList.add("hidden");
          freehandCtx.clearRect(0, 0, freehandCanvas.width, freehandCanvas.height);
          
          const flatView = document.getElementById("view-flat-canvas");
          const mockupView = document.getElementById("view-mockup-wrapper");
          if (flatView) flatView.classList.remove("hidden");
          if (mockupView) mockupView.classList.add("hidden");

          historyStack.length = 0;
          redoStack.length = 0;
          saveHistoryState();
        }

        if (StudioState.currentMode === "generative") {
          StudioState.activeView = "flat";
          document.querySelectorAll(".mockup-tab-btn").forEach((b) => {
            const isFlat = b.dataset.view === "flat";
            b.classList.toggle("active", isFlat);
            b.classList.toggle("bg-brass-400/20", isFlat);
            b.classList.toggle("text-brass-300", isFlat);
          });
          const flatView = document.getElementById("view-flat-canvas");
          const mockupView = document.getElementById("view-mockup-wrapper");
          if (flatView) flatView.classList.remove("hidden");
          if (mockupView) mockupView.classList.add("hidden");

          historyStack.length = 0;
          redoStack.length = 0;
          saveHistoryState();
        }

        updatePrintButtonState();
        canvas.style.cursor = StudioState.currentMode === "generative" ? "default" : "crosshair";
        render();
      });
    });

    document.querySelectorAll(".motif-card-select").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".motif-card-select").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        delete StudioState.id;
        StudioState.motif = btn.dataset.motif;
        saveHistoryState();
        render();
      });
    });

    document.querySelectorAll(".layout-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".layout-btn").forEach((b) => b.classList.remove("active", "bg-brass-400/20", "text-brass-300"));
        btn.classList.add("active", "bg-brass-400/20", "text-brass-300");
        StudioState.layout = btn.dataset.layout;
        saveHistoryState();
        render();
      });
    });

    document.querySelectorAll(".isen-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".isen-btn").forEach((b) => b.classList.remove("active", "bg-brass-400/20", "text-brass-300"));
        btn.classList.add("active", "bg-brass-400/20", "text-brass-300");
        StudioState.isen = btn.dataset.isen;
        saveHistoryState();
        render();
      });
    });

    document.querySelectorAll(".preset-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const presetId = chip.dataset.presetId;
        const found = PRESETS.find((p) => p.id === presetId);
        if (found) {
          if (StudioState.currentMode !== "generative") {
            const genTabBtn = document.querySelector('.mode-tab-btn[data-mode="generative"]');
            if (genTabBtn) {
              genTabBtn.click();
            } else {
              StudioState.currentMode = "generative";
            }
          }

          Object.assign(StudioState, found);
          syncUiToState();
          saveHistoryState();
          render();
          scrollToStudioCanvas();
        }
      });
    });

    document.querySelectorAll(".palette-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pIdx = parseInt(btn.dataset.paletteIdx, 10);
        const pal = PALETTES[pIdx];
        if (pal) {
          StudioState.primaryColor = pal.primary;
          StudioState.secondaryColor = pal.secondary;
          StudioState.highlightColor = pal.highlight;
          StudioState.bgColor = pal.bg;
          syncUiToState();
          saveHistoryState();
          render();
        }
      });
    });

    bindColorInput("picker-primary", (val) => { StudioState.primaryColor = val; });
    bindColorInput("picker-secondary", (val) => { StudioState.secondaryColor = val; });
    bindColorInput("picker-highlight", (val) => { StudioState.highlightColor = val; });
    bindColorInput("picker-bg", (val) => { StudioState.bgColor = val; });

    bindSlider("slider-density", "val-density", (val) => { StudioState.density = parseInt(val, 10); return `${val}x${val}`; });
    bindSlider("slider-thickness", "val-thickness", (val) => { StudioState.strokeWidth = parseFloat(val); return `${val}px`; });
    bindSlider("slider-curviness", "val-curviness", (val) => { StudioState.curviness = parseFloat(val); return `${val}x`; });
    bindSlider("slider-rotation", "val-rotation", (val) => { StudioState.rotation = parseInt(val, 10); return `${val}°`; });
    bindSlider("slider-complexity", "val-complexity", (val) => { StudioState.complexity = parseInt(val, 10); return `Lvl ${val}`; });

    const toggleCrackle = document.getElementById("toggle-crackle");
    if (toggleCrackle) {
      toggleCrackle.addEventListener("change", (e) => {
        StudioState.showCrackle = e.target.checked;
        saveHistoryState();
        render();
      });
    }

    const toggleWeave = document.getElementById("toggle-weave");
    if (toggleWeave) {
      toggleWeave.addEventListener("change", (e) => {
        StudioState.showWeave = e.target.checked;
        saveHistoryState();
        render();
      });
    }

    const toggleFlip = document.getElementById("toggle-flip");
    if (toggleFlip) {
      toggleFlip.addEventListener("change", (e) => {
        StudioState.alternateFlip = e.target.checked;
        saveHistoryState();
        render();
      });
    }

    function updateCanvasCursor() {
      if (!canvas) return;
      if (StudioState.cantingTool === "eraser") {
        canvas.classList.remove("cursor-canting");
        canvas.classList.add("cursor-eraser");
      } else {
        canvas.classList.remove("cursor-eraser");
        canvas.classList.add("cursor-canting");
      }
    }

    document.querySelectorAll(".canting-tool-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".canting-tool-btn").forEach((b) => b.classList.remove("active", "bg-brass-400/20", "text-brass-300"));
        btn.classList.add("active", "bg-brass-400/20", "text-brass-300");
        StudioState.cantingTool = btn.dataset.tool;
        updateCanvasCursor();
      });
    });
    updateCanvasCursor();

    document.querySelectorAll("[data-canting-color]").forEach((btn) => {
      btn.addEventListener("click", () => {
        StudioState.cantingColor = btn.dataset.cantingColor;
        const colorPicker = document.getElementById("picker-canting-color");
        if (colorPicker) colorPicker.value = btn.dataset.cantingColor;
      });
    });

    document.querySelectorAll(".canting-layout-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".canting-layout-btn").forEach((b) => b.classList.remove("active", "bg-brass-400/20", "text-brass-300"));
        btn.classList.add("active", "bg-brass-400/20", "text-brass-300");
        StudioState.cantingLayout = btn.dataset.cantingLayout;
        if (StudioState.cantingIsPrinted) render();
      });
    });

    bindSlider("slider-canting-size", "val-canting-size", (val) => { StudioState.cantingSize = parseFloat(val); return `${val}px`; });
    bindSlider("slider-canting-density", "val-canting-density", (val) => { StudioState.cantingDensity = parseInt(val, 10); if (StudioState.cantingIsPrinted) render(); return `${val}x${val}`; });
    bindColorInput("picker-canting-color", (val) => { StudioState.cantingColor = val; });

    const btnClearCanvas = document.getElementById("btn-clear-freehand");
    if (btnClearCanvas) btnClearCanvas.addEventListener("click", clearFreehandOverlay);

    const btnPrintBatik = document.getElementById("btn-print-custom-batik");
    if (btnPrintBatik) {
      btnPrintBatik.addEventListener("click", () => {
        if (!hasFreehandDrawing()) {
          alert("Kanvas masih kosong. Silakan goreskan canting pada kanvas putih terlebih dahulu untuk membuat 1 unit motif kreasi Anda.");
          return;
        }

        StudioState.cantingIsPrinted = true;
        const mockupTabs = document.getElementById("mockup-tabs-container");
        if (mockupTabs) mockupTabs.classList.remove("hidden");

        StudioState.activeView = "flat";
        document.querySelectorAll(".mockup-tab-btn").forEach((b) => {
          const isFlat = b.dataset.view === "flat";
          b.classList.toggle("active", isFlat);
          b.classList.toggle("bg-brass-400/20", isFlat);
          b.classList.toggle("text-brass-300", isFlat);
        });

        render();

        const canvasWrapper = document.getElementById("view-flat-canvas");
        if (canvasWrapper) {
          canvasWrapper.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }

    const btnReEdit = document.getElementById("btn-re-edit-motif");
    if (btnReEdit) {
      btnReEdit.addEventListener("click", () => {
        StudioState.cantingIsPrinted = false;
        const mockupTabs = document.getElementById("mockup-tabs-container");
        if (mockupTabs) mockupTabs.classList.add("hidden");

        StudioState.activeView = "flat";
        document.querySelectorAll(".mockup-tab-btn").forEach((b) => {
          b.classList.toggle("active", b.dataset.view === "flat");
          b.classList.toggle("bg-brass-400/20", b.dataset.view === "flat");
          b.classList.toggle("text-brass-300", b.dataset.view === "flat");
        });
        const flatView = document.getElementById("view-flat-canvas");
        const mockupView = document.getElementById("view-mockup-wrapper");
        if (flatView) flatView.classList.remove("hidden");
        if (mockupView) mockupView.classList.add("hidden");

        updatePrintButtonState();
        render();
      });
    }

    document.querySelectorAll("[data-mockup-trigger]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.mockupTrigger;
        StudioState.activeView = view;

        document.querySelectorAll(".mockup-tab-btn").forEach((b) => {
          const isActive = b.dataset.view === view;
          b.classList.toggle("active", isActive);
          b.classList.toggle("bg-brass-400/20", isActive);
          b.classList.toggle("text-brass-300", isActive);
        });

        const flatView = document.getElementById("view-flat-canvas");
        const mockupView = document.getElementById("view-mockup-wrapper");
        if (flatView && mockupView) {
          if (view === "flat") {
            flatView.classList.remove("hidden");
            mockupView.classList.add("hidden");
          } else {
            flatView.classList.add("hidden");
            mockupView.classList.remove("hidden");
            updateMockupView();
          }
        }
      });
    });

    function switchViewMode(mode) {
      StudioState.viewMode = mode;
      StudioState.activeView = mode === "3d" ? "mockup" : "flat";

      const btn2d = document.getElementById("toggle-view-2d");
      const btn3d = document.getElementById("toggle-view-3d");
      const flatView = document.getElementById("view-flat-canvas");
      const mockupView = document.getElementById("view-mockup-wrapper");
      const labelDownload = document.getElementById("label-download-hd");

      if (btn2d && btn3d) {
        btn2d.classList.toggle("active", mode === "2d");
        btn3d.classList.toggle("active", mode === "3d");
      }

      if (flatView && mockupView) {
        if (mode === "2d") {
          flatView.classList.remove("hidden");
          mockupView.classList.add("hidden");
          if (labelDownload) labelDownload.textContent = "Unduh Pola HD";
        } else {
          flatView.classList.add("hidden");
          mockupView.classList.remove("hidden");
          if (labelDownload) labelDownload.textContent = "Unduh Mockup HD";
          updateMockupView();
        }
      }
    }

    const btnToggle2d = document.getElementById("toggle-view-2d");
    if (btnToggle2d) {
      btnToggle2d.addEventListener("click", () => switchViewMode("2d"));
    }
    const btnToggle3d = document.getElementById("toggle-view-3d");
    if (btnToggle3d) {
      btnToggle3d.addEventListener("click", () => switchViewMode("3d"));
    }

    function setMockupProduct(product) {
      StudioState.mockupProduct = product;
      document.querySelectorAll("[data-mockup-product]").forEach((b) => {
        b.classList.toggle("active", b.dataset.mockupProduct === product);
      });
      if (StudioState.viewMode !== "3d") {
        switchViewMode("3d");
      } else {
        updateMockupView();
      }
    }

    document.querySelectorAll("[data-mockup-product]").forEach((btn) => {
      btn.addEventListener("click", () => setMockupProduct(btn.dataset.mockupProduct));
    });

    document.querySelectorAll("[data-fabric]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-fabric]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        StudioState.mockupFabric = btn.dataset.fabric;
        if (StudioState.viewMode === "3d") {
          updateMockupView();
        }
      });
    });

    bindSlider("slider-mockup-scale", "val-mockup-scale", (val) => {
      StudioState.mockupScale = parseFloat(val);
      if (StudioState.viewMode === "3d") updateMockupView();
      return `${parseFloat(val).toFixed(1)}x`;
    });

    bindSlider("slider-mockup-rotation", "val-mockup-rotation", (val) => {
      StudioState.mockupRotation = parseInt(val, 10);
      if (StudioState.viewMode === "3d") updateMockupView();
      return `${val}°`;
    });

    bindSlider("slider-shadow-intensity", "val-shadow-intensity", (val) => {
      StudioState.shadowIntensity = parseFloat(val);
      if (StudioState.viewMode === "3d") updateMockupView();
      return `${Math.round(parseFloat(val) * 100)}%`;
    });

    bindSlider("slider-highlight-intensity", "val-highlight-intensity", (val) => {
      StudioState.highlightIntensity = parseFloat(val);
      if (StudioState.viewMode === "3d") updateMockupView();
      return `${Math.round(parseFloat(val) * 100)}%`;
    });

    const btnQuickSwap = document.getElementById("btn-quick-swap-palette");
    if (btnQuickSwap) {
      btnQuickSwap.addEventListener("click", () => {
        const temp = StudioState.primaryColor;
        StudioState.primaryColor = StudioState.secondaryColor;
        StudioState.secondaryColor = temp;
        syncUiToState();
        saveHistoryState();
        render();
      });
    }

    const btnRandomize = document.getElementById("btn-randomize-pattern");
    if (btnRandomize) {
      btnRandomize.addEventListener("click", randomizeIntelligently);
    }

    const btnUndo = document.getElementById("btn-undo");
    const btnRedo = document.getElementById("btn-redo");
    if (btnUndo) btnUndo.addEventListener("click", undo);
    if (btnRedo) btnRedo.addEventListener("click", redo);

    const btnDownloadHd = document.getElementById("btn-download-hd");
    if (btnDownloadHd) {
      btnDownloadHd.addEventListener("click", () => {
        const link = document.createElement("a");
        if (StudioState.viewMode === "3d") {
          const mockupCanvas = document.getElementById("mockup-preview-canvas");
          link.download = `WARISARA-MOCKUP-${StudioState.mockupProduct.toUpperCase()}-${StudioState.motif.toUpperCase()}.png`;
          link.href = (mockupCanvas || canvas).toDataURL("image/png");
        } else {
          link.download = `WARISARA-POLA-${StudioState.motif.toUpperCase()}-HD.png`;
          link.href = canvas.toDataURL("image/png");
        }
        link.click();
      });
    }

    const btnDownloadTechpack = document.getElementById("btn-download-techpack");
    if (btnDownloadTechpack) {
      btnDownloadTechpack.addEventListener("click", exportFashionTechPack);
    }

    const btnDownloadSvg = document.getElementById("btn-download-svg");
    if (btnDownloadSvg) btnDownloadSvg.addEventListener("click", exportSvg);

    const btnDownloadCert = document.getElementById("btn-download-cert");
    if (btnDownloadCert) {
      btnDownloadCert.addEventListener("click", openCertificateModal);
    }

    const certModalClose = document.getElementById("cert-modal-close-btn");
    const certModalCancel = document.getElementById("cert-modal-cancel-btn");
    const certModalSubmit = document.getElementById("cert-modal-submit-btn");
    const certModalBackdrop = document.getElementById("cert-modal-backdrop");

    if (certModalClose) certModalClose.addEventListener("click", closeCertificateModal);
    if (certModalCancel) certModalCancel.addEventListener("click", closeCertificateModal);
    if (certModalSubmit) certModalSubmit.addEventListener("click", handleCertificateSubmit);

    if (certModalBackdrop) {
      certModalBackdrop.addEventListener("click", (e) => {
        if (e.target === certModalBackdrop) {
          closeCertificateModal();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && certModalBackdrop && certModalBackdrop.classList.contains("active")) {
        closeCertificateModal();
      }
    });

    const btnSaveGallery = document.getElementById("btn-save-gallery");
    if (btnSaveGallery) btnSaveGallery.addEventListener("click", saveToGallery);

    canvas.addEventListener("mousedown", handleCanvasMouseDown);
    window.addEventListener("mousemove", handleCanvasMouseMove);
    window.addEventListener("mouseup", handleCanvasMouseUp);

    canvas.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      handleCanvasMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: false });

    canvas.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      handleCanvasMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener("touchend", handleCanvasMouseUp);
  }

  function bindColorInput(id, onChange) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", (e) => {
      onChange(e.target.value);
      render();
    });
    el.addEventListener("change", () => saveHistoryState());
  }

  function bindSlider(id, labelId, onChange) {
    const slider = document.getElementById(id);
    const label = document.getElementById(labelId);
    if (!slider) return;
    slider.addEventListener("input", (e) => {
      const formatted = onChange(e.target.value);
      if (label && formatted) label.textContent = formatted;
      render();
    });
    slider.addEventListener("change", () => saveHistoryState());
  }

  function randomizeIntelligently() {
    const motifs = ["kawung", "parang", "megamendung", "truntum", "sekarjagad", "ceplok", "songket", "ikat_toraja", "pesisir_flora", "garuda_lereng"];
    const layouts = ["grid", "brick", "diagonal", "radial", "organic"];
    const isens = ["none", "cecek", "sisik", "gringsing", "sawut", "ukel"];

    StudioState.motif = motifs[Math.floor(Math.random() * motifs.length)];
    StudioState.layout = layouts[Math.floor(Math.random() * layouts.length)];
    StudioState.isen = isens[Math.floor(Math.random() * isens.length)];
    StudioState.density = Math.floor(Math.random() * 5) + 3;
    StudioState.strokeWidth = parseFloat((Math.random() * 3 + 1.5).toFixed(1));
    StudioState.curviness = parseFloat((Math.random() * 0.9 + 0.7).toFixed(2));
    StudioState.complexity = Math.floor(Math.random() * 4) + 2;
    StudioState.rotation = Math.floor(Math.random() * 4) * 45;

    const randPal = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    StudioState.primaryColor = randPal.primary;
    StudioState.secondaryColor = randPal.secondary;
    StudioState.highlightColor = randPal.highlight;
    StudioState.bgColor = randPal.bg;

    StudioState.seed = Math.floor(Math.random() * 1000000);
    delete StudioState.id;

    syncUiToState();
    saveHistoryState();
    render();
  }

  function syncUiToState() {
    document.querySelectorAll(".preset-chip").forEach((btn) => {
      const isActive = btn.dataset.presetId === StudioState.id;
      btn.classList.toggle("active", isActive);
    });

    document.querySelectorAll(".motif-card-select").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.motif === StudioState.motif);
    });

    document.querySelectorAll(".layout-btn").forEach((btn) => {
      const isActive = btn.dataset.layout === StudioState.layout;
      btn.classList.toggle("active", isActive);
      btn.classList.toggle("bg-brass-400/20", isActive);
      btn.classList.toggle("text-brass-300", isActive);
    });

    document.querySelectorAll(".isen-btn").forEach((btn) => {
      const isActive = btn.dataset.isen === StudioState.isen;
      btn.classList.toggle("active", isActive);
      btn.classList.toggle("bg-brass-400/20", isActive);
      btn.classList.toggle("text-brass-300", isActive);
    });

    setSliderVal("slider-density", "val-density", StudioState.density, `${StudioState.density}x${StudioState.density}`);
    setSliderVal("slider-thickness", "val-thickness", StudioState.strokeWidth, `${StudioState.strokeWidth}px`);
    setSliderVal("slider-curviness", "val-curviness", StudioState.curviness, `${StudioState.curviness}x`);
    setSliderVal("slider-rotation", "val-rotation", StudioState.rotation, `${StudioState.rotation}°`);
    setSliderVal("slider-complexity", "val-complexity", StudioState.complexity, `Lvl ${StudioState.complexity}`);

    setSliderVal("slider-mockup-scale", "val-mockup-scale", StudioState.mockupScale || 1.0, `${(StudioState.mockupScale || 1.0).toFixed(1)}x`);
    setSliderVal("slider-mockup-rotation", "val-mockup-rotation", StudioState.mockupRotation || 0, `${StudioState.mockupRotation || 0}°`);
    setSliderVal("slider-shadow-intensity", "val-shadow-intensity", StudioState.shadowIntensity || 1.0, `${Math.round((StudioState.shadowIntensity || 1.0) * 100)}%`);
    setSliderVal("slider-highlight-intensity", "val-highlight-intensity", StudioState.highlightIntensity || 1.0, `${Math.round((StudioState.highlightIntensity || 1.0) * 100)}%`);

    document.querySelectorAll("[data-mockup-product]").forEach((b) => {
      b.classList.toggle("active", b.dataset.mockupProduct === (StudioState.mockupProduct || "dress"));
    });
    document.querySelectorAll("[data-fabric]").forEach((b) => {
      b.classList.toggle("active", b.dataset.fabric === (StudioState.mockupFabric || "cotton"));
    });

    setColorPickerVal("picker-primary", StudioState.primaryColor);
    setColorPickerVal("picker-secondary", StudioState.secondaryColor);
    setColorPickerVal("picker-highlight", StudioState.highlightColor);
    setColorPickerVal("picker-bg", StudioState.bgColor);
  }

  function setSliderVal(id, labelId, val, labelText) {
    const el = document.getElementById(id);
    const lbl = document.getElementById(labelId);
    if (el) el.value = val;
    if (lbl) lbl.textContent = labelText;
  }

  function setColorPickerVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function updateInfoDisplay() {
    const titleEl = document.getElementById("motif-info-title");
    const descEl = document.getElementById("motif-info-desc");
    const originEl = document.getElementById("motif-info-origin");
    const labelEl = document.getElementById("canvas-pattern-label");
    const hashEl = document.getElementById("pattern-seed-hash");

    if (StudioState.currentMode === "canting") {
      if (titleEl) titleEl.textContent = "Filosofi & Nilai Karya Canting Tulis Kreasimu";
      if (descEl) {
        descEl.textContent = StudioState.cantingIsPrinted
          ? "Mahakarya kain batik yang dicetak secara repetisi dari 1 unit motif goresan canting malam orisinil karya Anda. Mencerminkan kebebasan berekspresi dan pelestarian budaya kontemporer."
          : "Kanvas putih bersih 1 unit motif. Goreskan imajinasi dan ornamen khas Anda dari nol menggunakan canting malam digital sebelum dicetak menjadi kain utuh.";
      }
      if (originEl) originEl.textContent = "Karya Orisinil Desainer • Simbolisme: Kreativitas & Pelestarian Budaya";
      if (labelEl) {
        labelEl.textContent = StudioState.cantingIsPrinted
          ? `Karya Mandiri • Susunan: ${StudioState.cantingLayout.toUpperCase()} • Cetak: ${StudioState.cantingDensity}x${StudioState.cantingDensity}`
          : `Mode: CANTING TULIS • Kanvas 1 Unit Motif (Menggambar dari 0)`;
      }
      if (hashEl) {
        hashEl.textContent = `Hash: #CUST-${StudioState.seed.toString(16).toUpperCase()}`;
      }
      return;
    }

    const info = MOTIF_INFO[StudioState.motif] || MOTIF_INFO.kawung;
    if (titleEl) titleEl.textContent = info.title;
    if (descEl) descEl.textContent = info.desc;
    if (originEl) originEl.textContent = `${info.origin} • Simbolisme: ${info.symbolism}`;
    if (labelEl) labelEl.textContent = `Motif: ${StudioState.motif.toUpperCase()} • Layout: ${StudioState.layout.toUpperCase()} • Isen: ${StudioState.isen}`;
    if (hashEl) {
      hashEl.textContent = `Hash: #${StudioState.seed.toString(16).toUpperCase()}-${StudioState.motif.substring(0, 3).toUpperCase()}`;
    }
  }

  function adjustColorBrightness(hex, percent) {
    let num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00ff) + percent;
    let b = (num & 0x0000ff) + percent;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function scrollToStudioCanvas() {
    const target = document.getElementById("mockup-tabs-container")
      || document.getElementById("studio-preview-column")
      || document.getElementById("view-flat-canvas")
      || document.getElementById("creative-canvas");
    if (!target) return;

    const nav = document.getElementById("main-navbar");
    const navHeight = nav ? (nav.offsetHeight + 24) : 85;
    const targetRect = target.getBoundingClientRect();
    const offsetPosition = window.pageYOffset + targetRect.top - navHeight;

    window.scrollTo({
      top: Math.max(0, Math.round(offsetPosition)),
      behavior: "smooth"
    });

    const canvasPanel = document.querySelector(".studio-glass-panel-accent") || document.getElementById("view-flat-canvas");
    if (canvasPanel) {
      canvasPanel.classList.remove("preset-apply-glow");
      void canvasPanel.offsetWidth;
      canvasPanel.classList.add("preset-apply-glow");
    }
  }

  window.WARISARA_STUDIO = {
    init: init,
    render: render,
    state: StudioState,
    randomize: randomizeIntelligently,
    scrollToStudioCanvas: scrollToStudioCanvas,
    openCertificateModal: openCertificateModal,
    closeCertificateModal: closeCertificateModal
  };
  window.initCreativeLabPage = init;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
