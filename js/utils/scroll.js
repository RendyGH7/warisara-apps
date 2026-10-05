window.WARISARA_SCROLL = {
  observer: null,

  initObservers: function () {
    if (!('IntersectionObserver' in window)) {
      
      document.querySelectorAll('.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-left, .scroll-reveal-right')
        .forEach(el => el.classList.add('revealed'));
      return;
    }

    this.autoTagSections();

    const isMobile = window.innerWidth < 768;
    const observerOptions = {
      root: null,
      rootMargin: isMobile ? '0px 0px -40px 0px' : '0px 0px -70px 0px',
      threshold: isMobile ? 0.05 : 0.08
    };

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('revealed');

          if (target.dataset.module && window[`WARISARA_${target.dataset.module.toUpperCase()}`]) {
            try {
              if (typeof window[`WARISARA_${target.dataset.module.toUpperCase()}`].onVisible === 'function') {
                window[`WARISARA_${target.dataset.module.toUpperCase()}`].onVisible();
              }
            } catch (e) {}
          }

          obs.unobserve(target);
        }
      });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-left, .scroll-reveal-right'
    );

    elementsToObserve.forEach((el) => {
      this.observer.observe(el);
    });

    window.addEventListener('warisara:hero-animated', () => {
      setTimeout(() => {
        this.refresh();
      }, 100);
    });
  },

  autoTagSections: function () {
    
    const sections = document.querySelectorAll('main#app-dynamic-modules > section');
    sections.forEach((sec) => {
      
      const header = sec.querySelector('.section-container > div:first-child');
      if (header && !header.classList.contains('scroll-reveal')) {
        header.classList.add('scroll-reveal');
        const h2 = header.querySelector('h2');
        if (h2) h2.classList.add('section-header-glow');
      }

      const grids = sec.querySelectorAll('.section-container .grid');
      grids.forEach((grid) => {
        if (!grid.classList.contains('scroll-stagger') && !grid.classList.contains('no-auto-stagger')) {
          grid.classList.add('scroll-reveal', 'scroll-stagger');
        }
      });

      const banners = sec.querySelectorAll('.section-container > div:not(:first-child):not(.grid)');
      banners.forEach((banner) => {
        if (!banner.classList.contains('scroll-reveal') && !banner.classList.contains('scroll-reveal-scale')) {
          banner.classList.add('scroll-reveal-scale');
        }
      });
    });
  },

  refresh: function () {
    if (!this.observer) return;
    const elements = document.querySelectorAll(
      '.scroll-reveal:not(.revealed), .scroll-reveal-scale:not(.revealed), .scroll-reveal-left:not(.revealed), .scroll-reveal-right:not(.revealed)'
    );
    elements.forEach(el => this.observer.observe(el));
  }
};
