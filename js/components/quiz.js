window.WARISARA_QUIZ = {
  scoreKey: "warisara_quiz_progress",

  init: function () {
    const saved = localStorage.getItem(this.scoreKey);
    if (saved) {
      this.updateProgressBadge(JSON.parse(saved));
    }
  },

  submitAnswer: function (lessonId, selectedOption, correctOption) {
    const isCorrect = selectedOption === correctOption;
    const progress = JSON.parse(localStorage.getItem(this.scoreKey) || "{}");
    progress[lessonId] = isCorrect;
    localStorage.setItem(this.scoreKey, JSON.stringify(progress));
    this.updateProgressBadge(progress);
    return isCorrect;
  },

  updateProgressBadge: function (progress) {
    const badgeEl = document.getElementById("quiz-progress-counter");
    if (badgeEl) {
      const completed = Object.values(progress).filter(Boolean).length;
      badgeEl.textContent = `${completed} Modul Tuntas`;
    }
  }
};
