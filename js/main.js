/**
 * WARISARA — Main Application Orchestrator
 * Coordinates Initial Load Sequence, Component Lifecycles, and Observers.
 */

(function () {
  function initApp() {
    // 1. Initialize Navigation
    if (window.WARISARA_NAVBAR) window.WARISARA_NAVBAR.init();

    // 2. Initialize Province Drawer & Hero Map
    if (window.WARISARA_PROVINCE_PANEL) window.WARISARA_PROVINCE_PANEL.init();
    if (window.WARISARA_HERO_MAP) window.WARISARA_HERO_MAP.init();

    // 3. Initialize Content Sections
    if (window.WARISARA_FEATURED_HERITAGE) window.WARISARA_FEATURED_HERITAGE.init();
    if (window.WARISARA_MAKERS) window.WARISARA_MAKERS.init();
    if (window.WARISARA_ECONOMY) window.WARISARA_ECONOMY.init();
    if (window.WARISARA_MODERN) window.WARISARA_MODERN.init();
    if (window.WARISARA_CREATIVE_LAB) window.WARISARA_CREATIVE_LAB.init();
    if (window.WARISARA_LEARNING) window.WARISARA_LEARNING.init();
    if (window.WARISARA_STORIES) window.WARISARA_STORIES.init();
    if (window.WARISARA_PASS_IT_ON) window.WARISARA_PASS_IT_ON.init();

    // 4. Initialize Utilities & Observers
    if (window.WARISARA_SCROLL) window.WARISARA_SCROLL.initObservers();

    // 5. Trigger Cinematic Initial Hero Load Sequence
    executeInitialHeroSequence();
  }

  function executeInitialHeroSequence() {
    const heroContent = document.getElementById("hero-intro-block");
    const mapWrapper = document.getElementById("hero-map-wrapper");
    const mapPrompt = document.getElementById("hero-map-prompt");

    setTimeout(() => {
      if (heroContent) {
        heroContent.classList.remove("opacity-0", "translate-y-6");
        heroContent.classList.add("opacity-100", "translate-y-0");
      }
    }, 150);

    setTimeout(() => {
      if (mapWrapper) {
        mapWrapper.classList.remove("opacity-0", "scale-95");
        mapWrapper.classList.add("opacity-100", "scale-100");
      }
    }, 450);

    setTimeout(() => {
      if (mapPrompt) {
        mapPrompt.classList.remove("opacity-0");
        mapPrompt.classList.add("opacity-100");
      }
    }, 850);
  }

  document.addEventListener("DOMContentLoaded", initApp);
})();
