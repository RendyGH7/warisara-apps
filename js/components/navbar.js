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
      if (bodyPage === "detail-produk") return "ekonomi-kreatif";
      if (bodyPage) return bodyPage;
      const path = window.location.pathname;
      const file = path.split("/").pop() || "index.html";
      const clean = file.replace(".html", "").toLowerCase();
      if (clean === "detail-produk") return "ekonomi-kreatif";
      if (!clean || clean === "index") return "index";
      return clean;
    }

    function isLinkMatch(href, dataPage, targetId) {
      if (!href && !dataPage) return false;
      const cleanTarget = (targetId || "").replace(/^module-/, "");
      const cleanHref = href.replace(/^#module-/, "").replace(/^#/, "");
      if (cleanTarget === "detail-produk" && (dataPage === "ekonomi-kreatif" || cleanHref === "ekonomi-kreatif")) return true;
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

    let mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
    if (!mobileNavBackdrop && mobileNavDrawer) {
      mobileNavBackdrop = document.createElement("div");
      mobileNavBackdrop.id = "mobile-nav-backdrop";
      mobileNavBackdrop.setAttribute("aria-hidden", "true");
      document.body.appendChild(mobileNavBackdrop);
    }

    const openMobileNav = () => {
      if (!mobileNavDrawer) return;
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.add("is-spinning");
        setTimeout(() => mobileMenuBtn.classList.remove("is-spinning"), 650);
      }
      mobileNavDrawer.classList.remove("-translate-y-full", "opacity-0", "pointer-events-none");
      mobileNavDrawer.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");
      document.body.classList.add("mobile-nav-open");
    };

    const closeMobileNav = () => {
      if (!mobileNavDrawer) return;
      mobileNavDrawer.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
      mobileNavDrawer.classList.add("-translate-y-full", "opacity-0", "pointer-events-none");
      document.body.classList.remove("mobile-nav-open");
    };

    if (mobileMenuBtn && mobileNavDrawer) {
      mobileMenuBtn.addEventListener("click", openMobileNav);
    }

    if (mobileNavClose) {
      mobileNavClose.addEventListener("click", closeMobileNav);
    }

    if (mobileNavBackdrop) {
      mobileNavBackdrop.addEventListener("click", closeMobileNav);
    }

    document.addEventListener("click", (e) => {
      if (
        document.body.classList.contains("mobile-nav-open") &&
        mobileNavDrawer &&
        !mobileNavDrawer.contains(e.target) &&
        mobileMenuBtn &&
        !mobileMenuBtn.contains(e.target)
      ) {
        closeMobileNav();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("mobile-nav-open")) {
        closeMobileNav();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280 && document.body.classList.contains("mobile-nav-open")) {
        closeMobileNav();
      }
    });

    const core10Sections = [
      { id: "hero", target: "hero" },
      { id: "module-jelajahi", target: "jelajahi" },
      { id: "module-makers", target: "jelajahi" },
      { id: "module-ekonomi-kreatif", target: "ekonomi-kreatif" },
      { id: "module-creative-lab", target: "creative-lab" },
      { id: "module-belajar", target: "belajar" },
      { id: "module-cerita", target: "cerita" }
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
        if (currentActiveTarget !== "cerita") {
          setActiveLink("cerita", true);
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

    function initNavbarAuth() {
      const actionsContainer = document.querySelector("#main-navbar .flex.items-center.gap-2") ||
                               document.querySelector("#main-navbar .flex-shrink-0:last-child");
      if (!actionsContainer) return;

      let authContainer = document.getElementById("navbar-auth-section");
      if (!authContainer) {
        authContainer = document.createElement("div");
        authContainer.id = "navbar-auth-section";
        authContainer.className = "nav-auth-wrapper hidden xl:inline-flex";
        const mobileBtn = actionsContainer.querySelector("#mobile-menu-btn");
        if (mobileBtn) {
          actionsContainer.insertBefore(authContainer, mobileBtn);
        } else {
          actionsContainer.appendChild(authContainer);
        }
      }

      function renderAuth() {
        if (!authContainer) return;
        const user = window.WARISARA_AUTH ? window.WARISARA_AUTH.getUser() : null;

        if (!user) {
          const isPagesDir = window.location.pathname.includes("/pages/");
          const authPageUrl = isPagesDir ? "login.html" : "pages/login.html";

          authContainer.innerHTML = `
            <div class="flex items-center gap-1.5">
              <a id="nav-btn-login" href="${authPageUrl}" class="btn-nav-auth-login" title="Masuk atau Daftar dengan Google">
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 flex-shrink-0">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.21v3.13C3.25 21.36 7.32 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.21C.44 8.14 0 9.87 0 12s.44 3.86 1.21 5.4l4.11-3.13z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.32 0 3.25 2.64 1.21 6.6l4.11 3.13c.94-2.83 3.58-4.98 6.68-4.98z"/>
                </svg>
                <span>Masuk / Daftar</span>
              </a>
            </div>
          `;
        } else {
          const shortName = user.name ? (user.name.split(" ")[0] + (user.name.split(" ")[1] ? " " + user.name.split(" ")[1].charAt(0) + "." : "")) : "Akun";
          const avatarLetter = user.avatarLetter || (user.name ? user.name.charAt(0).toUpperCase() : "U");
          const avatarColor = user.avatarColor || "from-amber-600 to-yellow-500";

          authContainer.innerHTML = `
            <div class="nav-profile-dropdown" id="nav-profile-dropdown">
              <button id="nav-profile-trigger" type="button" class="nav-profile-btn relative" aria-haspopup="true" aria-expanded="false" title="Menu Akun: ${user.name}">
                <div class="nav-profile-avatar bg-gradient-to-tr ${avatarColor}">
                  ${avatarLetter}
                  <span id="nav-profile-chat-badge" class="nav-profile-unread-badge hidden">2</span>
                </div>
                <span class="nav-profile-name hidden sm:inline">${shortName}</span>
                <span class="material-symbols-outlined nav-profile-chevron">expand_more</span>
              </button>

              <div class="nav-profile-menu" id="nav-profile-menu">
                <!-- Info Profil -->
                <div class="p-3 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
                  <div class="w-9 h-9 rounded-full bg-gradient-to-tr ${avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-md flex-shrink-0">
                    ${avatarLetter}
                  </div>
                  <div class="overflow-hidden flex-1">
                    <div class="text-xs font-bold text-surface truncate">${user.name}</div>
                    <div class="text-[11px] text-brass-300/80 font-mono truncate">${user.email}</div>
                  </div>
                </div>

                <!-- Opsi Aksi Sesuai Permintaan User -->
                <div class="p-1.5 space-y-0.5">
                  <!-- Fitur Chat di Pop-up Profile -->
                  <button type="button" id="nav-action-chat" class="nav-profile-item group relative">
                    <span class="material-symbols-outlined text-base text-brass-400 group-hover:scale-110 transition-transform">chat</span>
                    <div class="flex-1 text-left flex items-center justify-between">
                      <div>
                        <span class="block text-xs font-semibold text-surface group-hover:text-brass-300">Pesan & Diskusi</span>
                        <span class="block text-[10px] text-surface/50">Chat langsung penjual & pembeli</span>
                      </div>
                      <span id="nav-dropdown-chat-badge" class="nav-dropdown-chat-badge hidden">2</span>
                    </div>
                  </button>

                  <button type="button" id="nav-action-sell" class="nav-profile-item group">
                    <span class="material-symbols-outlined text-base text-brass-400 group-hover:scale-110 transition-transform">add_circle</span>
                    <div class="flex-1 text-left">
                      <span class="block text-xs font-semibold text-surface group-hover:text-brass-300">Jual Produk Lokal</span>
                      <span class="block text-[10px] text-surface/50">Pasang karya ke etalase pasar</span>
                    </div>
                  </button>

                  <button type="button" id="nav-action-switch" class="nav-profile-item group">
                    <span class="material-symbols-outlined text-base text-amber-400 group-hover:scale-110 transition-transform">swap_horiz</span>
                    <div class="flex-1 text-left">
                      <span class="block text-xs font-semibold text-surface group-hover:text-amber-300">Ganti Akun Google</span>
                      <span class="block text-[10px] text-surface/50">Beralih akun Google yang tersedia</span>
                    </div>
                  </button>

                  <div class="my-1 border-t border-white/10"></div>

                  <button type="button" id="nav-action-logout" class="nav-profile-item item-danger group">
                    <span class="material-symbols-outlined text-base group-hover:rotate-12 transition-transform">logout</span>
                    <span class="text-xs font-semibold">Keluar dari Akun</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          const dropdownEl = authContainer.querySelector("#nav-profile-dropdown");
          const triggerBtn = authContainer.querySelector("#nav-profile-trigger");
          if (dropdownEl && triggerBtn) {
            triggerBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              const isOpen = dropdownEl.classList.contains("is-open");
              dropdownEl.classList.toggle("is-open", !isOpen);
              triggerBtn.setAttribute("aria-expanded", String(!isOpen));
            });

            const chatBtn = authContainer.querySelector("#nav-action-chat");
            if (chatBtn) {
              chatBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdownEl.classList.remove("is-open");
                triggerBtn.setAttribute("aria-expanded", "false");

                if (window.WARISARA_CHAT && typeof window.WARISARA_CHAT.openDrawer === "function") {
                  window.WARISARA_CHAT.openDrawer();
                }
              });
            }

            const sellBtn = authContainer.querySelector("#nav-action-sell");
            if (sellBtn) {
              sellBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdownEl.classList.remove("is-open");
                triggerBtn.setAttribute("aria-expanded", "false");

                if (typeof window.openSellProductModal === "function") {
                  window.openSellProductModal();
                } else {
                  const modal = document.getElementById("sell-product-modal");
                  if (modal) {
                    modal.classList.remove("hidden");
                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                  } else {
                    const isPagesDir = window.location.pathname.includes("/pages/");
                    window.location.href = (isPagesDir ? "ekonomi-kreatif.html" : "pages/ekonomi-kreatif.html") + "?action=sell";
                  }
                }
              });
            }

            const switchBtn = authContainer.querySelector("#nav-action-switch");
            if (switchBtn) {
              switchBtn.addEventListener("click", () => {
                dropdownEl.classList.remove("is-open");
                if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.openAuthModal === "function") {
                  window.WARISARA_AUTH.openAuthModal();
                }
              });
            }

            const logoutBtn = authContainer.querySelector("#nav-action-logout");
            if (logoutBtn) {
              logoutBtn.addEventListener("click", () => {
                dropdownEl.classList.remove("is-open");
                if (window.WARISARA_AUTH) {
                  window.WARISARA_AUTH.logout();
                }
              });
            }

            if (window.WARISARA_CHAT && typeof window.WARISARA_CHAT.updateNavbarBadge === "function") {
              window.WARISARA_CHAT.updateNavbarBadge();
            }
          }
        }

        renderMobileDrawerAuth(user);
      }

      function renderMobileDrawerAuth(user) {
        const mobileDrawer = document.getElementById("mobile-nav-drawer");
        if (!mobileDrawer) return;

        let mobileAuthBox = document.getElementById("mobile-drawer-auth-box");
        if (!mobileAuthBox) {
          mobileAuthBox = document.createElement("div");
          mobileAuthBox.id = "mobile-drawer-auth-box";
          mobileAuthBox.className = "pt-3 mt-1 border-t border-white/10";
          mobileDrawer.appendChild(mobileAuthBox);
        }

        if (!user) {
          const isPagesDir = window.location.pathname.includes("/pages/");
          const authPageUrl = isPagesDir ? "login.html" : "pages/login.html";
          mobileAuthBox.innerHTML = `
            <div class="grid grid-cols-2 gap-2">
              <a href="${authPageUrl}" id="mobile-btn-login" class="py-2.5 px-3 rounded-xl bg-white/10 text-surface hover:bg-white/15 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm">login</span>
                <span>Masuk</span>
              </a>
              <a href="${authPageUrl}?tab=register" id="mobile-btn-register" class="py-2.5 px-3 rounded-xl bg-brass-400 text-ink font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors">
                <span class="material-symbols-outlined text-sm">person_add</span>
                <span>Daftar Akun</span>
              </a>
            </div>
          `;
        } else {
          const avatarColor = user.avatarColor || "from-amber-600 to-yellow-500";
          const avatarLetter = user.avatarLetter || user.name.charAt(0).toUpperCase();

          mobileAuthBox.innerHTML = `
            <div class="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-gradient-to-tr ${avatarColor} text-white font-bold text-xs flex items-center justify-center shadow">
                  ${avatarLetter}
                </div>
                <div class="overflow-hidden flex-1">
                  <div class="text-xs font-bold text-surface truncate">${user.name}</div>
                  <div class="text-[10px] text-brass-300 font-mono truncate">${user.email}</div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-1.5 pt-1 text-xs">
                <button type="button" id="mobile-action-sell" class="py-1.5 px-2 rounded-lg bg-brass-400/20 text-brass-300 font-semibold text-[11px] flex items-center justify-center gap-1">
                  <span class="material-symbols-outlined text-sm">add_circle</span>
                  <span>+ Jual</span>
                </button>
                <button type="button" id="mobile-action-switch" class="py-1.5 px-2 rounded-lg bg-white/5 text-surface/80 font-semibold text-[11px] flex items-center justify-center gap-1">
                  <span class="material-symbols-outlined text-sm">swap_horiz</span>
                  <span>Ganti</span>
                </button>
              </div>
              <button type="button" id="mobile-action-logout" class="w-full py-1.5 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-[11px] font-semibold flex items-center justify-center gap-1">
                <span class="material-symbols-outlined text-sm">logout</span>
                <span>Keluar</span>
              </button>
            </div>
          `;

          const mobSell = mobileAuthBox.querySelector("#mobile-action-sell");
          const mobSwitch = mobileAuthBox.querySelector("#mobile-action-switch");
          const mobLogout = mobileAuthBox.querySelector("#mobile-action-logout");

          if (mobSell) mobSell.addEventListener("click", () => {
            const closeBtn = document.getElementById("mobile-nav-close");
            if (closeBtn) closeBtn.click();
            if (typeof window.openSellProductModal === "function") window.openSellProductModal();
            else window.location.href = (window.location.pathname.includes("/pages/") ? "ekonomi-kreatif.html" : "pages/ekonomi-kreatif.html") + "?action=sell";
          });

          if (mobSwitch) mobSwitch.addEventListener("click", () => {
            const closeBtn = document.getElementById("mobile-nav-close");
            if (closeBtn) closeBtn.click();
            if (window.WARISARA_AUTH) window.WARISARA_AUTH.openAuthModal();
          });

          if (mobLogout) mobLogout.addEventListener("click", () => {
            const closeBtn = document.getElementById("mobile-nav-close");
            if (closeBtn) closeBtn.click();
            if (window.WARISARA_AUTH) window.WARISARA_AUTH.logout();
          });
        }
      }

      document.addEventListener("click", (e) => {
        const dropdownEl = document.getElementById("nav-profile-dropdown");
        if (dropdownEl && dropdownEl.classList.contains("is-open")) {
          if (!dropdownEl.contains(e.target)) {
            dropdownEl.classList.remove("is-open");
            const btn = document.getElementById("nav-profile-trigger");
            if (btn) btn.setAttribute("aria-expanded", "false");
          }
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const dropdownEl = document.getElementById("nav-profile-dropdown");
          if (dropdownEl && dropdownEl.classList.contains("is-open")) {
            dropdownEl.classList.remove("is-open");
            const btn = document.getElementById("nav-profile-trigger");
            if (btn) btn.setAttribute("aria-expanded", "false");
          }
        }
      });

      window.addEventListener("warisara_auth_changed", renderAuth);

      renderAuth();
    }

    initNavbarAuth();

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
