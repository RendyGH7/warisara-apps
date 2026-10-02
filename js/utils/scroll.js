/**
 * WARISARA — Scroll & Intersection Observer Utilities
 */

window.WARISARA_SCROLL = {
  initObservers: function () {
    if (!('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }
};
