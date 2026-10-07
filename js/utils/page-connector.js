window.WARISARA_PAGE_CONNECTOR = {
  isLoaded: false,

  init: async function () {
    const modules = document.querySelectorAll(".page-module[data-src]");
    if (!modules.length) return;

    try {
      const loadPromises = Array.from(modules).map((module) => this.loadModule(module));
      await Promise.all(loadPromises);
      this.isLoaded = true;

      if (window.WARISARA_SCROLL && typeof window.WARISARA_SCROLL.initObservers === "function") {
        window.WARISARA_SCROLL.initObservers();
      }

      if (window.WARISARA_NAVBAR && typeof window.WARISARA_NAVBAR.refresh === "function") {
        window.WARISARA_NAVBAR.refresh();
      }

      const isIndex = document.body.dataset.page === "index" || !document.body.dataset.page;
      if (isIndex) {
        if (window.location.hash) {
          try {
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
          } catch (e) {}
        }
        window.scrollTo(0, 0);
        if (window.WARISARA_NAVBAR && typeof window.WARISARA_NAVBAR.setActiveLink === "function") {
          window.WARISARA_NAVBAR.setActiveLink("hero", false);
        }
      }
    } catch (error) {
      console.error("WARISARA Page Connector error:", error);
    }
  },

  loadModule: async function (moduleEl) {
    const src = moduleEl.getAttribute("data-src");
    const pageId = moduleEl.getAttribute("data-page");
    if (!src) return;

    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error(`HTTP ${response.status} loading ${src}`);
      const htmlText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      const contentEl = doc.getElementById("page-content") || doc.querySelector("main") || doc.body;

      if (!contentEl) throw new Error(`Could not find main content in ${src}`);

      this.normalizeUrls(contentEl);

      const modals = contentEl.querySelectorAll(".modal-overlay, [id$='-modal-overlay']");
      modals.forEach((modal) => {
        const modalId = modal.id;
        if (modalId) {
          const existing = document.getElementById(modalId);

          if (existing) {
            modal.remove();
            return;
          }
        }
        
        document.body.appendChild(modal.cloneNode(true));
        modal.remove(); 
      });

      moduleEl.innerHTML = contentEl.innerHTML;

      this.executeModuleScripts(doc, pageId);
    } catch (err) {
      console.warn(`Failed to connect module ${src}:`, err);
      moduleEl.innerHTML = `
        <div class="py-16 text-center text-surface/60 text-xs">
          <p class="mb-2">Modul <span class="font-bold text-brass-300">${pageId}</span> dapat dieksplorasi langsung.</p>
          <a href="${src}" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brass-400 text-brass-300 hover:bg-brass-400/20 text-xs transition-colors">
            <span>Buka Halaman ${pageId}</span>
            <span class="material-symbols-outlined text-xs">arrow_forward</span>
          </a>
        </div>
      `;
    }
  },

  normalizeUrls: function (container) {
    
    const mediaElements = container.querySelectorAll("img, source, audio, video");
    mediaElements.forEach((el) => {
      const src = el.getAttribute("src");
      if (src && src.startsWith("../")) {
        el.setAttribute("src", src.replace(/^\.\.\//, ""));
      }
    });

    const anchorElements = container.querySelectorAll("a[href]");
    const pageAnchorMap = {
      "../index.html": "#hero",
      "jelajahi.html": "#module-jelajahi",
      "warisan.html": "#module-warisan",
      "makers.html": "#module-makers",
      "ekonomi-kreatif.html": "#module-ekonomi-kreatif",
      "heritage-modern.html": "#module-heritage-modern",
      "creative-lab.html": "#module-creative-lab",
      "belajar.html": "#module-belajar",
      "cerita.html": "#module-cerita",
      "pass-it-on.html": "#module-pass-it-on"
    };

    anchorElements.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      if (pageAnchorMap[href]) {
        a.setAttribute("href", pageAnchorMap[href]);
        a.classList.add("dynamic-page-anchor");
      } else if (href.startsWith("../")) {
        a.setAttribute("href", href.replace(/^\.\.\//, ""));
      }
    });
  },

  executeModuleScripts: function (doc, pageId) {
    
    const pageFunctionMap = {
      jelajahi: "initJelajahiPage",
      warisan: "initWarisanPage",
      makers: "initMakersPage",
      "ekonomi-kreatif": "initEkonomiKreatifPage",
      "heritage-modern": "initHeritageModernPage",
      "creative-lab": "initCreativeLabPage",
      belajar: "initBelajarPage",
      cerita: "initCeritaPage",
      "pass-it-on": "initPassItOnPage"
    };

    const funcName = pageFunctionMap[pageId];
    if (funcName && typeof window[funcName] === "function") {
      try {
        window[funcName]();
        return;
      } catch (e) {
        console.warn(`Error running ${funcName}:`, e);
      }
    }

    const inlineScripts = doc.querySelectorAll("script:not([src])");
    inlineScripts.forEach((script) => {
      try {
        const newScript = document.createElement("script");
        newScript.setAttribute("data-module-script", pageId);
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      } catch (err) {
        console.warn(`Error injecting script for ${pageId}:`, err);
      }
    });
  }
};
