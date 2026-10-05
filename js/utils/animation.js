window.WARISARA_ANIM = {
  fadeIn: function (element, duration = 300) {
    if (!element) return;
    element.style.opacity = 0;
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms var(--ease-premium)`;
    requestAnimationFrame(() => {
      element.style.opacity = 1;
    });
  },

  fadeOut: function (element, duration = 300) {
    if (!element) return;
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms var(--ease-premium)`;
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.display = 'none';
    }, duration);
  }
};
