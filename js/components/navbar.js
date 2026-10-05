window.WARISARA_NAVBAR = {
  isInitialized: false,

  init: function () {
    const navbar = document.getElementById("main-navbar");
    const navContainer = document.getElementById("desktop-nav-menu") || document.querySelector("#main-navbar nav");
    let pill = document.getElementById("nav-active-pill");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
    const mobileNavClose = document.getElementById("mobile-nav-close");
    const desktopNavLinks = document.querySelectorAll("#main-navbar .nav-link");
    const mobileNavLinks = document.querySelectorAll("#mobile-nav-drawer .mobile-nav-link");
    const exploreBtns = document.querySelectorAll(".btn-nav-explore, .btn-nav-icon");
    const brandLogo = document.querySelector("#main-navbar a[href='#hero']");

    if (!navContainer) return;

    if (this.isInitialized) {
      if (typeof this.refresh === "function") this.refresh();
      return;
    }
    this.isInitialized = true;

    if (!pill) {
      pill = document.createElement("span");
      pill.id = "nav-active-pill";
      pill.className = "nav-active-pill";
      pill.setAttribute("aria-hidden", "true");
      navContainer.prepend(pill);
    }

    let isProgrammaticScrolling = false;
    let scrollAnimFrame = null;
    let currentActiveTarget = "hero";

    function movePillTo(link, smooth = true) {
      if (!link || !pill || !navContainer) return;

      const linkRect = link.getBoundingClientRect();
      const navRect = navContainer.getBoundingClientRect();

      if (navRect.width === 0 || linkRect.width === 0) return;

      const left = linkRect.left - navRect.left;
      const top = linkRect.top - navRect.top;
      const width = linkRect.width;
      const height = linkRect.height;

      if (!smooth) {
        
        pill.style.transition = "none";
      } else {
        pill.style.transition =
          "transform 0.52s cubic-bezier(0.22, 1, 0.36, 1), width 0.52s cubic-bezier(0.22, 1, 0.36, 1), height 0.52s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease";
      }

      pill.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      pill.style.width = `${width}px`;
      pill.style.height = `${height}px`;
      pill.style.opacity = "1";
      
      pill.style.visibility = "visible";
    }

    function determineCurrentPage() {
      const bodyPage = document.body.dataset.page;
      if (bodyPage) return bodyPage;
      const path = window.location.pathname;
      const file = path.split("/").pop() || "index.html";
      const clean = file.replace(".html", "").toLowerCase();
      if (!clean || clean === "index") return "index";
      return clean;
    }

    function isLinkMatch(href, dataPage, targetId) {
      if (!href && !dataPage) return false;
      const cleanTarget = (targetId || "").replace(/^module-/, "");
      const cleanHref = href.replace(/^#module-/, "").replace(/^#/, "");
      if (dataPage && (dataPage === targetId || dataPage === cleanTarget)) return true;
      if (targetId === "index" || targetId === "hero") {
        return (
          href === "#hero" ||
          href === "index.html" ||
          href === "../index.html" ||
          href === "/" ||
          href.endsWith("/index.html") ||
          dataPage === "hero" ||
          dataPage === "index"
        );
      }
      return (
        href === `#${targetId}` ||
        href === `#module-${cleanTarget}` ||
        cleanHref === cleanTarget ||
        dataPage === cleanTarget ||
        href === `${cleanTarget}.html` ||
        href === `pages/${cleanTarget}.html` ||
        href.endsWith(`/${cleanTarget}.html`)
      );
    }

    function setActiveLink(targetId, smooth = true) {
      currentActiveTarget = targetId;
      let activeDesktopLink = null;

      desktopNavLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const dataPage = link.getAttribute("data-page");
        if (isLinkMatch(href, dataPage, targetId)) {
          link.classList.add("active");
          activeDesktopLink = link;
        } else {
          link.classList.remove("active");
        }
      });

      mobileNavLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const dataPage = link.getAttribute("data-page");
        if (isLinkMatch(href, dataPage, targetId)) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      if (activeDesktopLink) {
        movePillTo(activeDesktopLink, smooth);
      }
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScrollAndPillSync(targetElement, targetId, customDuration) {
      if (!targetElement) return;

      if (scrollAnimFrame) {
        cancelAnimationFrame(scrollAnimFrame);
        scrollAnimFrame = null;
      }

      const startLink =
        document.querySelector("#desktop-nav-menu .nav-link.active") ||
        document.querySelector("#desktop-nav-menu .nav-link");

      let targetLink = null;
      desktopNavLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const dataPage = link.getAttribute("data-page");
        if (isLinkMatch(href, dataPage, targetId)) {
          targetLink = link;
        }
      });

      mobileNavLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const dataPage = link.getAttribute("data-page");
        if (isLinkMatch(href, dataPage, targetId)) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      const navOffset = navbar ? navbar.offsetHeight + 24 : 80;
      const startY = window.pageYOffset || document.documentElement.scrollTop;
      const elemRect = targetElement.getBoundingClientRect();
      const rawTargetY = elemRect.top + startY - navOffset;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = Math.max(0, Math.min(rawTargetY, maxScrollY));
      const distance = targetY - startY;

      const isDesktopPillActive = Boolean(
        pill &&
        navContainer &&
        navContainer.offsetWidth > 0 &&
        startLink &&
        targetLink
      );

      let startLeft = 0, startTop = 0, startWidth = 0, startHeight = 0;
      let targetLeft = 0, targetTop = 0, targetWidth = 0, targetHeight = 0;

      if (isDesktopPillActive) {
        const navRect = navContainer.getBoundingClientRect();
        const sRect = startLink.getBoundingClientRect();
        const tRect = targetLink.getBoundingClientRect();

        startLeft = sRect.left - navRect.left;
        startTop = sRect.top - navRect.top;
        startWidth = sRect.width;
        startHeight = sRect.height;

        targetLeft = tRect.left - navRect.left;
        targetTop = tRect.top - navRect.top;
        targetWidth = tRect.width;
        targetHeight = tRect.height;

        pill.style.transition = "none";
      }

      if (Math.abs(distance) < 4 && (!isDesktopPillActive || Math.abs(targetLeft - startLeft) < 4)) {
        window.scrollTo(0, targetY);
        setActiveLink(targetId, true);
        return;
      }

      const duration = customDuration || Math.min(920, Math.max(720, 680 + Math.abs(distance) * 0.1));
      const startTime = performance.now();
      isProgrammaticScrolling = true;
      currentActiveTarget = targetId;

      const prevScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      function finishScroll() {
        document.documentElement.style.scrollBehavior = prevScrollBehavior || "";
        isProgrammaticScrolling = false;

        if (isDesktopPillActive && targetLink) {
          pill.style.transition =
            "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), width 0.45s cubic-bezier(0.22, 1, 0.36, 1), height 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease";
          pill.style.transform = `translate3d(${targetLeft}px, ${targetTop}px, 0)`;
          pill.style.width = `${targetWidth}px`;
          pill.style.height = `${targetHeight}px`;
        }

        desktopNavLinks.forEach((link) => {
          const href = link.getAttribute("href") || "";
          const dataPage = link.getAttribute("data-page");
          if (href === `#${targetId}` || dataPage === targetId || (targetId === "hero" && href === "#hero")) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        updateScrollSpy();
      }

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * ease);

        if (isDesktopPillActive) {
          const curLeft = startLeft + (targetLeft - startLeft) * ease;
          const curTop = startTop + (targetTop - startTop) * ease;
          const curWidth = startWidth + (targetWidth - startWidth) * ease;
          const curHeight = startHeight + (targetHeight - startHeight) * ease;

          pill.style.transform = `translate3d(${curLeft}px, ${curTop}px, 0)`;
          pill.style.width = `${curWidth}px`;
          pill.style.height = `${curHeight}px`;
          pill.style.opacity = "1";

          if (progress >= 0.45) {
            desktopNavLinks.forEach((link) => {
              const href = link.getAttribute("href") || "";
              const dataPage = link.getAttribute("data-page");
              if (href === `#${targetId}` || dataPage === targetId || (targetId === "hero" && href === "#hero")) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        }

        if (progress < 1) {
          scrollAnimFrame = requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          scrollAnimFrame = null;
          setTimeout(finishScroll, 25);
        }
      }

      scrollAnimFrame = requestAnimationFrame(step);
    }

    const interruptScroll = () => {
      if (isProgrammaticScrolling) {
        if (scrollAnimFrame) {
          cancelAnimationFrame(scrollAnimFrame);
          scrollAnimFrame = null;
        }
        document.documentElement.style.scrollBehavior = "";
        isProgrammaticScrolling = false;
        if (pill) {
          pill.style.transition =
            "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), width 0.45s cubic-bezier(0.22, 1, 0.36, 1), height 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease";
        }
        updateScrollSpy();
      }
    };
    window.addEventListener("wheel", interruptScroll, { passive: true });
    window.addEventListener("touchmove", interruptScroll, { passive: true });

    desktopNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            smoothScrollAndPillSync(targetElement, targetId);
          }
        }
      });
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          closeMobileNav();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            setTimeout(() => {
              smoothScrollAndPillSync(targetElement, targetId);
            }, 100);
          }
        }
      });
    });

    exploreBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const href = btn.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          closeMobileNav();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            smoothScrollAndPillSync(targetElement, targetId);
          }
        }
      });
    });

    if (brandLogo) {
      brandLogo.addEventListener("click", (e) => {
        e.preventDefault();
        const heroElem = document.getElementById("hero");
        if (heroElem) {
          smoothScrollAndPillSync(heroElem, "hero");
        }
      });
    }

    if (navbar) {
      const handleNavbarBackground = () => {
        if (window.scrollY > 25) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      };

      window.addEventListener("scroll", handleNavbarBackground, { passive: true });
      handleNavbarBackground();
    }

    if (mobileMenuBtn && mobileNavDrawer) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("-translate-y-full", "opacity-0", "pointer-events-none");
        mobileNavDrawer.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");
      });
    }

    const closeMobileNav = () => {
      if (mobileNavDrawer) {
        mobileNavDrawer.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
        mobileNavDrawer.classList.add("-translate-y-full", "opacity-0", "pointer-events-none");
      }
    };

    if (mobileNavClose) {
      mobileNavClose.addEventListener("click", closeMobileNav);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNavDrawer && mobileNavDrawer.classList.contains("translate-y-0")) {
        closeMobileNav();
      }
    });

    const core10Sections = [
      { id: "hero", target: "hero" },
      { id: "module-jelajahi", target: "jelajahi" },
      { id: "module-warisan", target: "warisan" },
      { id: "module-makers", target: "makers" },
      { id: "module-ekonomi-kreatif", target: "ekonomi-kreatif" },
      { id: "module-heritage-modern", target: "heritage-modern" },
      { id: "module-creative-lab", target: "creative-lab" },
      { id: "module-belajar", target: "belajar" },
      { id: "module-cerita", target: "cerita" },
      { id: "module-pass-it-on", target: "pass-it-on" }
    ];

    this.refresh = function () {
      updateScrollSpy();
      const activeLink = document.querySelector("#desktop-nav-menu .nav-link.active");
      if (activeLink) movePillTo(activeLink, false);
    };

    let isScrollSpyScheduled = false;

    const updateScrollSpy = () => {
      if (isProgrammaticScrolling) return;

      const currentPage = determineCurrentPage();
      if (currentPage !== "index" && currentPage !== "hero") return;

      if (window.scrollY <= 140) {
        if (currentActiveTarget !== "hero" && currentActiveTarget !== "index") {
          setActiveLink("hero", true);
        }
        return;
      }

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollBottom = window.innerHeight + window.scrollY;
      if (scrollHeight - scrollBottom <= 120) {
        if (currentActiveTarget !== "pass-it-on") {
          setActiveLink("pass-it-on", true);
        }
        return;
      }

      const triggerY = window.innerHeight * 0.35;
      let activeTarget = "hero";

      for (let i = 0; i < core10Sections.length; i++) {
        const item = core10Sections[i];
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            activeTarget = item.target;
            break;
          } else if (rect.top <= triggerY) {
            activeTarget = item.target;
          }
        }
      }

      if (activeTarget !== currentActiveTarget) {
        setActiveLink(activeTarget, true);
      }
    };

    const onScrollThrottled = () => {
      if (!isScrollSpyScheduled) {
        isScrollSpyScheduled = true;
        requestAnimationFrame(() => {
          updateScrollSpy();
          isScrollSpyScheduled = false;
        });
      }
    };

    window.addEventListener("scroll", onScrollThrottled, { passive: true });

    window.addEventListener("resize", () => {
      const activeLink = document.querySelector("#desktop-nav-menu .nav-link.active") ||
                         document.querySelector("#desktop-nav-menu .nav-link");
      if (activeLink) {
        movePillTo(activeLink, false);
      }
    }, { passive: true });

    const initialPage = determineCurrentPage();
    setActiveLink(initialPage, false);

    const syncInitialPill = () => {
      const curPage = determineCurrentPage();
      setActiveLink(curPage, false);
      const activeLink = document.querySelector("#desktop-nav-menu .nav-link.active") ||
                         document.querySelector("#desktop-nav-menu .nav-link");
      if (activeLink) {
        movePillTo(activeLink, false);
      }
    };

    requestAnimationFrame(syncInitialPill);
    setTimeout(syncInitialPill, 40);
    setTimeout(syncInitialPill, 120);
    setTimeout(syncInitialPill, 300);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncInitialPill);
    }
    window.addEventListener("load", syncInitialPill);
    window.addEventListener("warisara:hero-animated", syncInitialPill);
    window.addEventListener("pageshow", syncInitialPill);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.WARISARA_NAVBAR && !window.WARISARA_NAVBAR.isInitialized) {
      window.WARISARA_NAVBAR.init();
    }
  });
} else {
  if (window.WARISARA_NAVBAR && !window.WARISARA_NAVBAR.isInitialized) {
    window.WARISARA_NAVBAR.init();
  }
}
