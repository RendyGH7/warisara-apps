/**
 * WARISARA — Ambient Lantern Cursor Engine
 * Creates a distinct, warm golden candlelight/lantern glow that smoothly follows
 * the user's cursor with ZERO input delay and hardware-accelerated rendering.
 */

(function () {
  'use strict';

  function initLanternCursor() {
    // Prevent duplicate injection
    if (document.getElementById('warisara-lantern-cursor')) return;

    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.id = 'warisara-lantern-cursor';
    cursor.className = 'warisara-lantern-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    // Pure ambient lantern glow radiating directly from cursor
    cursor.innerHTML = `
      <div class="warisara-lantern-halo"></div>
      <div class="warisara-lantern-glow"></div>
    `;

    // Always mount directly to documentElement to avoid any body transform clipping
    (document.body || document.documentElement).appendChild(cursor);

    let isVisible = false;
    let isHovering = false;

    function moveCursor(x, y) {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (!isVisible) {
        isVisible = true;
        cursor.classList.add('is-active');
      }
    }

    // Direct, 0-delay pointer tracking
    window.addEventListener(
      'pointermove',
      (e) => {
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

    // Hide when pointer leaves viewport
    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursor.classList.remove('is-active');
    });

    document.addEventListener('mouseenter', (e) => {
      moveCursor(e.clientX, e.clientY);
    });

    // Interactive element detection (Cards, Buttons, Links, Inputs)
    const interactiveSelector =
      'a, button, input, select, textarea, [role="button"], .btn-nav-explore, .btn-nav-icon, .card-hover, .interactive, [data-interactive], .province-card, .glass-card, .btn-glass-gold, .btn-nav-explore';

    document.addEventListener(
      'mouseover',
      (e) => {
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

  // Self-execute on load or immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanternCursor);
  } else {
    initLanternCursor();
  }
  window.addEventListener('load', initLanternCursor);
})();


