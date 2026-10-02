/**
 * WARISARA — Belajar dari Akar (Micro-learning) Section Controller
 */

window.WARISARA_LEARNING = {
  init: function () {
    const quizOptions = document.querySelectorAll(".quiz-option-btn");
    quizOptions.forEach((btn) => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".quiz-card");
        const correct = btn.dataset.correct === "true";

        if (parent) {
          const feedbackEl = parent.querySelector(".quiz-feedback");
          if (feedbackEl) {
            feedbackEl.classList.remove("hidden");
            if (correct) {
              feedbackEl.className = "quiz-feedback text-xs text-forest-400 font-semibold mt-3 p-3 bg-forest-900/40 border border-forest-500/40 rounded-xl";
              feedbackEl.textContent = "Jawaban Tepat! (+100 Pemahaman Budaya)";
            } else {
              feedbackEl.className = "quiz-feedback text-xs text-terracotta-400 font-semibold mt-3 p-3 bg-terracotta-900/40 border border-terracotta-500/40 rounded-xl";
              feedbackEl.textContent = "Kurang tepat. Coba perhatikan kembali narasi di atas.";
            }
          }
        }
      });
    });
  }
};
