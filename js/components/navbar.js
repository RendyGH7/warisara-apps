/**
 * WARISARA — Floating Glassmorphism Navbar Component
 * Features:
 * 1. Animated Sliding Pill Indicator (Glides between links with spring/cubic-bezier physics)
 * 2. Ultra-Smooth Cinematic Scroll Engine (Custom cubic-bezier easeInOut curve)
 * 3. Throttled RAF Scroll-Spy with Mobile Drawer Synchronization
 */

window.WARISARA_NAVBAR = {
  init: function () {
    const navbar = document.getElementById("main-navbar");
    const navContainer = document.getElementById("desktop-nav-menu") || document.querySelector("#main-navbar nav");
    let pill = document.getElementById("nav-active-pill");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
    const mobileNavClose = document.getElementById("mobile-nav-close");
    const desktopNavLinks = document.querySelectorAll("#main-navbar .nav-link");
    const mobileNavLinks = document.querySelectorAll("#mobile-nav-drawer .mobile-nav-link");
    const exploreBtns = document.querySelectorAll(".btn-nav-explore");
    const brandLogo = document.querySelector("#main-navbar a[href='#hero']");

    if (!navContainer) return;

    // Ensure sliding pill exists in desktop nav container
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

    // =========================================================================
    // 1. SLIDING PILL ENGINE
    // =========================================================================
    function movePillTo(link, smooth = true) {
      if (!link || !pill || !navContainer) return;

      const linkRect = link.getBoundingClientRect();
      const navRect = navContainer.getBoundingClientRect();

      // If navbar is hidden (e.g. mobile display), don't calculate
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
    }

    function setActiveLink(targetId, smooth = true) {
      currentActiveTarget = targetId;
      let activeDesktopLink = null;

      desktopNavLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${targetId}`) {
          link.classList.add("active");
          activeDesktopLink = link;
        } else {
          link.classList.remove("active");
        }
      });

      mobileNavLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${targetId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      if (activeDesktopLink) {
        movePillTo(activeDesktopLink, smooth);
      }
    }

    // =========================================================================
    // 2. ULTRA-SMOOTH SYNCHRONIZED SCROLL & PILL ENGINE
    // =========================================================================
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScrollAndPillSync(targetElement, targetId, customDuration) {
      if (!targetElement) return;

      if (scrollAnimFrame) {
        cancelAnimationFrame(scrollAnimFrame);
        scrollAnimFrame = null;
      }

      // 1. Identify start and target navigation items
      const startLink =
        document.querySelector("#desktop-nav-menu .nav-link.active") ||
        document.querySelector("#desktop-nav-menu .nav-link");

      let targetLink = null;
      desktopNavLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${targetId}`) {
          targetLink = link;
        }
      });

      // Synchronize mobile links immediately
      mobileNavLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${targetId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // 2. Calculate scroll boundaries with navbar clearance
      const navOffset = navbar ? navbar.offsetHeight + 24 : 80;
      const startY = window.pageYOffset || document.documentElement.scrollTop;
      const elemRect = targetElement.getBoundingClientRect();
      const rawTargetY = elemRect.top + startY - navOffset;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = Math.max(0, Math.min(rawTargetY, maxScrollY));
      const distance = targetY - startY;

      // 3. Calculate desktop pill geometry
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

        // Take over pill motion via RAF for 100% mathematical synchronization
        pill.style.transition = "none";
      }

      // Check if already at destination
      if (Math.abs(distance) < 4 && (!isDesktopPillActive || Math.abs(targetLeft - startLeft) < 4)) {
        window.scrollTo(0, targetY);
        setActiveLink(targetId, true);
        return;
      }

      // Perfectly scaled duration: 720ms for adjacent sections, up to 920ms for long jumps
      const duration = customDuration || Math.min(920, Math.max(720, 680 + Math.abs(distance) * 0.1));
      const startTime = performance.now();
      isProgrammaticScrolling = true;
      currentActiveTarget = targetId;

      // Disable CSS smooth scroll to prevent jitter
      const prevScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      function finishScroll() {
        document.documentElement.style.scrollBehavior = prevScrollBehavior || "";
        isProgrammaticScrolling = false;

        // Restore CSS transition for subsequent manual interactions
        if (isDesktopPillActive && targetLink) {
          pill.style.transition =
            "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), width 0.45s cubic-bezier(0.22, 1, 0.36, 1), height 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease";
          pill.style.transform = `translate3d(${targetLeft}px, ${targetTop}px, 0)`;
          pill.style.width = `${targetWidth}px`;
          pill.style.height = `${targetHeight}px`;
        }

        // Finalize active classes
        desktopNavLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${targetId}`) {
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

        // A. Simultaneous Scroll Motion
        window.scrollTo(0, startY + distance * ease);

        // B. Simultaneous Pill Motion (Exactly synchronized on the same frame)
        if (isDesktopPillActive) {
          const curLeft = startLeft + (targetLeft - startLeft) * ease;
          const curTop = startTop + (targetTop - startTop) * ease;
          const curWidth = startWidth + (targetWidth - startWidth) * ease;
          const curHeight = startHeight + (targetHeight - startHeight) * ease;

          pill.style.transform = `translate3d(${curLeft}px, ${curTop}px, 0)`;
          pill.style.width = `${curWidth}px`;
          pill.style.height = `${curHeight}px`;
          pill.style.opacity = "1";

          // Cross-fade link active label as the pill glides halfway
          if (progress >= 0.45) {
            desktopNavLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${targetId}`) {
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

    // Cancel programmatic scroll if user manually touches or scrolls wheel
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

    // =========================================================================
    // 3. CLICK HANDLERS (Synchronized Navigation)
    // =========================================================================
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

    // Mobile nav link clicks
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

    // Explore action buttons
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

    // Brand Logo click (Smooth scroll to top and reset to Peta Jelajah)
    if (brandLogo) {
      brandLogo.addEventListener("click", (e) => {
        e.preventDefault();
        const heroElem = document.getElementById("hero");
        if (heroElem) {
          smoothScrollAndPillSync(heroElem, "hero");
        }
      });
    }

    // =========================================================================
    // 4. NAVBAR SCROLLED STATE HANDLER
    // =========================================================================
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

    // =========================================================================
    // 5. MOBILE DRAWER CONTROLS
    // =========================================================================
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

    // =========================================================================
    // 6. SCROLL-SPY WITH RAF THROTTLING
    // =========================================================================
    const sectionTargetMap = {
      "hero": "hero",
      "why-heritage": "why-heritage",
      "featured-heritage": "featured-heritage",
      "meet-makers": "meet-makers",
      "economy": "meet-makers",
      "creative-lab": "creative-lab",
      "learning": "learning"
    };

    const sectionElements = Object.keys(sectionTargetMap)
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    let isScrollSpyScheduled = false;

    const updateScrollSpy = () => {
      if (isProgrammaticScrolling) return;

      const scrollPos = window.scrollY + 220;
      let activeTarget = "hero";

      for (let i = 0; i < sectionElements.length; i++) {
        const sec = sectionElements[i];
        const top = sec.offsetTop;
        const height = sec.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          activeTarget = sectionTargetMap[sec.id] || sec.id;
          break;
        } else if (scrollPos >= top) {
          activeTarget = sectionTargetMap[sec.id] || sec.id;
        }
      }

      // Check if at page bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        activeTarget = "learning";
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

    // Handle Resize (Keep pill perfectly aligned without transition lag)
    window.addEventListener("resize", () => {
      const activeLink = document.querySelector("#desktop-nav-menu .nav-link.active");
      if (activeLink) {
        movePillTo(activeLink, false);
      }
    }, { passive: true });

    // Initialize pill position immediately on load
    setActiveLink("hero", false);

    // After custom Google Web Fonts finish loading, recalculate pill width accurately
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const activeLink = document.querySelector("#desktop-nav-menu .nav-link.active");
        if (activeLink) {
          movePillTo(activeLink, false);
        }
      });
    }
  }
};
