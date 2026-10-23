window.WARISARA_UTILS = {
  escapeHtml: function (str) {
    if (!str) return "";
    return str.replace(/[&<>"']/g, function (m) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[m];
    });
  },

  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

/**
 * WARISARA UNIVERSAL POPUP ANIMATION ENGINE
 * Animasi fade in & fade out dinamis yang memicu pembesaran (zoom/expand) modal
 * langsung dari titik/elemen yang diklik pengguna, serta mengecil kembali ke titik asal saat ditutup.
 */
window.WARISARA_POPUP = {
  lastTrigger: { x: window.innerWidth / 2, y: window.innerHeight / 2, element: null, time: 0 },

  open: function (overlay, container, triggerSource) {
    if (typeof overlay === 'string') overlay = document.querySelector(overlay);
    if (!overlay) return;

    if (typeof container === 'string') container = overlay.querySelector(container);
    if (!container) {
      container = overlay.querySelector('.modal-container, #province-detail-modal, #maker-detail-modal, .passport-book-modal, .compass-modal-card, #auth-modal-card, #interactive-book-modal > div, .relative') || overlay.firstElementChild;
    }

    var clickX = window.innerWidth / 2;
    var clickY = window.innerHeight / 2;

    if (triggerSource && typeof triggerSource.clientX === 'number') {
      clickX = triggerSource.clientX;
      clickY = triggerSource.clientY;
    } else if (triggerSource instanceof Element) {
      var tr = triggerSource.getBoundingClientRect();
      clickX = tr.left + tr.width / 2;
      clickY = tr.top + tr.height / 2;
    } else if (this.lastTrigger && (Date.now() - this.lastTrigger.time < 2500)) {
      if (this.lastTrigger.element && this.lastTrigger.element.isConnected) {
        var tr2 = this.lastTrigger.element.getBoundingClientRect();
        clickX = tr2.left + tr2.width / 2;
        clickY = tr2.top + tr2.height / 2;
      } else {
        clickX = this.lastTrigger.x;
        clickY = this.lastTrigger.y;
      }
    }

    overlay._isClosing = false;
    overlay.classList.remove('hidden', 'modal-closing', 'closing', 'modal-closing-backdrop');
    overlay.style.display = 'flex';
    overlay.style.visibility = 'visible';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';

    if (container) {
      container.classList.remove('modal-closing');
      var containerRect = container.getBoundingClientRect();
      var originX = 50;
      var originY = 50;
      if (containerRect.width > 0 && containerRect.height > 0) {
        originX = ((clickX - containerRect.left) / containerRect.width) * 100;
        originY = ((clickY - containerRect.top) / containerRect.height) * 100;
        originX = Math.max(-10, Math.min(110, originX));
        originY = Math.max(-10, Math.min(110, originY));
      }
      container.style.transformOrigin = originX + '% ' + originY + '%';
      container.dataset.originX = originX + '%';
      container.dataset.originY = originY + '%';
      container.style.transform = 'scale(0.16)';
      container.style.opacity = '0';
      container.style.filter = 'blur(10px)';
      container.style.transition = 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 340ms cubic-bezier(0.16, 1, 0.3, 1), filter 320ms cubic-bezier(0.16, 1, 0.3, 1)';
    }

    overlay.style.transition = 'opacity 360ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 360ms ease, background-color 360ms ease';

    void overlay.offsetWidth;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('active');
        overlay.style.opacity = '';
        overlay.style.pointerEvents = '';
        if (container) {
          container.style.transform = 'scale(1)';
          container.style.opacity = '1';
          container.style.filter = 'blur(0px)';
        }
      });
    });
  },

  close: function (overlay, container, callback) {
    if (typeof overlay === 'string') overlay = document.querySelector(overlay);
    if (!overlay) return;
    if (overlay._isClosing) return;
    overlay._isClosing = true;
    setTimeout(function () {
      overlay._isClosing = false;
    }, 450);

    if (typeof container === 'string') container = overlay.querySelector(container);
    if (!container) {
      container = overlay.querySelector('.modal-container, #province-detail-modal, #maker-detail-modal, .passport-book-modal, .compass-modal-card, #auth-modal-card, #interactive-book-modal > div, .relative') || overlay.firstElementChild;
    }

    overlay.classList.remove('active');
    overlay.classList.add('modal-closing');
    overlay.style.pointerEvents = 'none';

    if (container) {
      if (container.dataset.originX && container.dataset.originY) {
        container.style.transformOrigin = container.dataset.originX + ' ' + container.dataset.originY;
      }
      container.style.transition = 'transform 320ms cubic-bezier(0.4, 0, 0.8, 1), opacity 260ms cubic-bezier(0.4, 0, 0.8, 1), filter 260ms ease';
      container.style.transform = 'scale(0.18)';
      container.style.opacity = '0';
      container.style.filter = 'blur(8px)';
    }

    overlay.style.transition = 'opacity 280ms cubic-bezier(0.4, 0, 0.8, 1), backdrop-filter 280ms ease, background-color 280ms ease';
    overlay.style.opacity = '0';

    setTimeout(function () {
      overlay.classList.remove('modal-closing', 'active');
      overlay.classList.add('hidden');
      overlay.style.display = 'none';
      overlay.style.visibility = '';
      overlay.style.opacity = '';
      overlay.style.pointerEvents = '';
      overlay._isClosing = false;

      if (container) {
        container.style.transform = '';
        container.style.opacity = '';
        container.style.filter = '';
        container.style.transformOrigin = '';
        container.style.transition = '';
      }

      if (typeof callback === 'function') {
        try {
          callback();
        } catch (cbErr) {
          console.error('Error in popup close callback:', cbErr);
        }
      }
    }, 320);
  }
};

document.addEventListener('pointerdown', function (e) {
  if (e.target.closest('.modal-overlay.active, [aria-label*="Tutup"], [title*="Tutup"], .province-modal-close-trigger, #modal-maker-close, #modal-maker-dismiss')) {
    return;
  }
  var clickable = e.target.closest('button, a, .province-card-ultimate, .maker-card, .glass-card, [role="button"]') || e.target;
  window.WARISARA_POPUP.lastTrigger = {
    x: e.clientX,
    y: e.clientY,
    element: clickable,
    time: Date.now()
  };
}, true);
