window.WARISARA_AUDIO = {
  currentAudio: null,
  isPlaying: false,

  init: function () {
    const playBtns = document.querySelectorAll(".audio-play-trigger");
    playBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const audioSrc = btn.dataset.audioSrc;
        this.togglePlay(audioSrc, btn);
      });
    });
  },

  togglePlay: function (src, btnEl) {
    if (!src) return;
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
      this.isPlaying = false;
      if (btnEl) btnEl.textContent = "Putar Suara";
    } else {
      if (!this.currentAudio || this.currentAudio.src !== src) {
        this.currentAudio = new Audio(src);
      }
      this.currentAudio.play();
      this.isPlaying = true;
      if (btnEl) btnEl.textContent = "Jeda";
    }
  }
};
