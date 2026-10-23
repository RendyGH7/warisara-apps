(function () {
  'use strict';

  function initLanternCursor() {

    if (document.getElementById('warisara-lantern-cursor')) return;

    const cursor = document.createElement('div');
    cursor.id = 'warisara-lantern-cursor';
    cursor.className = 'warisara-lantern-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    cursor.innerHTML = `
      <div class="warisara-lantern-halo"></div>
      <div class="warisara-lantern-glow"></div>
    `;

    (document.body || document.documentElement).appendChild(cursor);

    let isVisible = false;
    let isHovering = false;

    function isMobileOrTouch() {
      return window.innerWidth <= 1024 || (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches);
    }

    function moveCursor(x, y) {
      if (isMobileOrTouch()) {
        if (isVisible) {
          isVisible = false;
          cursor.classList.remove('is-active', 'is-hovering');
        }
        return;
      }

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (!isVisible) {
        isVisible = true;
        cursor.classList.add('is-active');
      }
    }

    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType === 'touch') return;
        moveCursor(e.clientX, e.clientY);
      },
      { passive: true }
    );

    window.addEventListener(
      'mousemove',
      (e) => {
        moveCursor(e.clientX, e.clientY);
      },
      { passive: true }
    );

    window.addEventListener(
      'touchstart',
      () => {
        isVisible = false;
        isHovering = false;
        cursor.classList.remove('is-active', 'is-hovering');
      },
      { passive: true }
    );

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursor.classList.remove('is-active');
    });

    document.addEventListener('mouseenter', (e) => {
      if (isMobileOrTouch()) return;
      moveCursor(e.clientX, e.clientY);
    });

    const interactiveSelector =
      'a, button, input, select, textarea, [role="button"], .btn-nav-explore, .btn-nav-icon, .card-hover, .interactive, [data-interactive], .province-card, .glass-card, .btn-glass-gold, .btn-nav-explore';

    document.addEventListener(
      'mouseover',
      (e) => {
        if (isMobileOrTouch()) return;
        const target = e.target;
        if (target && target.closest && target.closest(interactiveSelector)) {
          if (!isHovering) {
            isHovering = true;
            cursor.classList.add('is-hovering');
          }
        }
      },
      { passive: true }
    );

    document.addEventListener(
      'mouseout',
      (e) => {
        if (isMobileOrTouch()) return;
        const target = e.target;
        if (target && target.closest && target.closest(interactiveSelector)) {
          if (isHovering) {
            isHovering = false;
            cursor.classList.remove('is-hovering');
          }
        }
      },
      { passive: true }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanternCursor);
  } else {
    initLanternCursor();
  }
  window.addEventListener('load', initLanternCursor);
})();
