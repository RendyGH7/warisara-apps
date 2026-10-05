(function () {
  function initApp() {
    
    try {
      if (window.WARISARA_PAGE_CONNECTOR) window.WARISARA_PAGE_CONNECTOR.init();
    } catch (e) {
      console.error("Page Connector initialization error:", e);
    }

    try {
      if (window.WARISARA_NAVBAR) window.WARISARA_NAVBAR.init();
    } catch (e) {
      console.error("Navbar initialization error:", e);
    }

    try {
      if (window.WARISARA_PROVINCE_PANEL) window.WARISARA_PROVINCE_PANEL.init();
      if (window.WARISARA_HERO_MAP) window.WARISARA_HERO_MAP.init();
    } catch (e) {
      console.error("Hero Map/Drawer initialization error:", e);
    }

    try {
      if (window.WARISARA_CREATIVE_LAB) window.WARISARA_CREATIVE_LAB.init();
    } catch (e) {
      console.error("Creative Lab initialization error:", e);
    }

    try {
      if (window.WARISARA_SCROLL) window.WARISARA_SCROLL.initObservers();
      if (window.WARISARA_TRANSITION) window.WARISARA_TRANSITION.init();
    } catch (e) {
      console.error("Scroll observer initialization error:", e);
    }
  }

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initApp();

    setTimeout(() => {
      if (!document.body.classList.contains("hero-animated")) {
        if (!document.getElementById("warisara-preloader")) {
          document.body.classList.add("hero-animated");
          document.body.classList.add("page-fade-in");
          window.dispatchEvent(new CustomEvent("warisara:hero-animated"));
        }
      }
    }, 120);
  });

  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
  });
})();
