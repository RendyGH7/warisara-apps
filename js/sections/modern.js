window.WARISARA_MODERN = {
  init: function () {
    const slider = document.getElementById("modern-comparison-slider");
    const overlay = document.getElementById("modern-comparison-overlay");

    if (slider && overlay) {
      slider.addEventListener("input", (e) => {
        const val = e.target.value;
        overlay.style.width = `${val}%`;
      });
    }
  }
};
