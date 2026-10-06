(function () {
  'use strict';

  class WarisaraLearningHub {
    constructor() {
      this.fullBank = [];
      this.activeFilter = 'all';
      this.timerMode = false;
      this.autoAdvance = false;

      this.currentQuestions = [];
      this.currentIndex = 0;
      this.userAnswers = {};
      this.score = 0;
      this.streak = 0;
      this.bestStreakInSession = 0;
      this.totalPoints = 0;
      this.sessionStartTime = null;

      this.timerSeconds = 25;
      this.timerInterval = null;
      this.audioCtx = null;

      this.storageKey = 'warisara_quiz_learning_stats';
      this.stats = this.loadStats();
    }

    init() {
      if (window.QUIZ_DATA && Array.isArray(window.QUIZ_DATA)) {
        this.fullBank = window.QUIZ_DATA;
      }

      this.cacheDom();
      this.bindEvents();
      this.renderCategoryChips();
      this.renderStatsBanner();
      this.startNewQuizSession();
    }

    cacheDom() {
      this.totalBankBadge = document.getElementById('stat-total-questions-bank');
      this.totalCompletedBadge = document.getElementById('stat-total-completed');
      this.avgAccuracyBadge = document.getElementById('stat-avg-accuracy');
      this.highestStreakBadge = document.getElementById('stat-highest-streak');

      this.categoryChipsContainer = document.getElementById('quiz-category-chips');
      this.btnTimerToggle = document.getElementById('btn-toggle-quiz-timer');
      this.btnShuffleNew10 = document.getElementById('btn-shuffle-new-10');

      this.arenaSection = document.getElementById('quiz-interactive-arena');
      this.stepIndicator = document.getElementById('quiz-step-indicator');
      this.progressFill = document.getElementById('quiz-progress-fill');
      this.streakPill = document.getElementById('quiz-streak-pill');
      this.streakCounter = document.getElementById('quiz-streak-counter');
      this.timerBadge = document.getElementById('quiz-timer-badge');
      this.timerValue = document.getElementById('quiz-timer-value');
      this.dotsContainer = document.getElementById('quiz-dots-nav');

      this.cardContainer = document.getElementById('quiz-active-card-container');
      this.btnPrev = document.getElementById('btn-quiz-prev');
      this.btnNext = document.getElementById('btn-quiz-next');

      this.resultsModal = document.getElementById('quiz-results-modal');
      this.resultTitle = document.getElementById('result-badge-title');
      this.resultScoreText = document.getElementById('result-score-text');
      this.resultPercentText = document.getElementById('result-percent-text');
      this.resultProgressCircle = document.getElementById('result-circle-progress');
      this.resultDetailsGrid = document.getElementById('result-details-grid');
      this.resultCategoryBreakdown = document.getElementById('result-category-breakdown');
      this.btnPlayAgain = document.getElementById('btn-result-play-again');
      this.btnReviewAnswers = document.getElementById('btn-result-review');
      this.btnShareResult = document.getElementById('btn-result-share');
      this.btnCloseResult = document.getElementById('btn-result-close');
    }

    bindEvents() {
      if (this.btnShuffleNew10) {
        this.btnShuffleNew10.addEventListener('click', () => {
          this.playTone(523, 0.1);
          this.startNewQuizSession();
        });
      }

      if (this.btnTimerToggle) {
        this.btnTimerToggle.addEventListener('click', () => {
          this.timerMode = !this.timerMode;
          this.updateTimerButtonState();
          this.startNewQuizSession();
        });
      }

      if (this.btnPrev) {
        this.btnPrev.addEventListener('click', () => this.navigateQuestion(-1));
      }

      if (this.btnNext) {
        this.btnNext.addEventListener('click', () => this.navigateQuestion(1));
      }

      if (this.btnPlayAgain) {
        this.btnPlayAgain.addEventListener('click', () => {
          this.closeResultsModal();
          this.startNewQuizSession();
        });
      }

      if (this.btnReviewAnswers) {
        this.btnReviewAnswers.addEventListener('click', () => {
          this.closeResultsModal();
          this.currentIndex = 0;
          this.renderQuestionCard('left');
          if (this.arenaSection) {
            this.arenaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }

      if (this.btnCloseResult) {
        this.btnCloseResult.addEventListener('click', () => this.closeResultsModal());
      }

      if (this.btnShareResult) {
        this.btnShareResult.addEventListener('click', () => this.shareAchievement());
      }

      document.addEventListener('keydown', (e) => {
        if (this.resultsModal && this.resultsModal.classList.contains('active')) return;
        if (e.key === 'ArrowRight') {
          this.navigateQuestion(1);
        } else if (e.key === 'ArrowLeft') {
          this.navigateQuestion(-1);
        }
      });
    }

    renderCategoryChips() {
      if (!this.categoryChipsContainer) return;

      const categories = [
        { id: 'all', label: 'Semua Kategori (Acak)' },
        { id: 'Wastra & Tekstil', label: 'Wastra & Tekstil' },
        { id: 'Arsitektur Vernakular', label: 'Arsitektur Adat' },
        { id: 'Tosan Aji & Pusaka', label: 'Tosan Aji & Senjata' },
        { id: 'Seni Pertunjukan', label: 'Tarian & Teater' },
        { id: 'Alat Musik Tradisional', label: 'Musik & Seni Bunyi' },
        { id: 'Mitos & Tutur Lisan', label: 'Mitos & Cerita Rakyat' },
        { id: 'Tradisi & Ritus Adat', label: 'Upacara & Falsafah' },
        { id: 'Kriya & Ukiran', label: 'Kriya & Ornamen' },
        { id: 'Jalur Rempah & Kuliner', label: 'Jalur Rempah & Rasa' }
      ];

      this.categoryChipsContainer.innerHTML = categories
        .map(
          (c) => `
          <button class="quiz-filter-chip ${c.id === this.activeFilter ? 'active' : ''}" data-cat="${c.id}">
            ${c.label}
          </button>
        `
        )
        .join('');

      this.categoryChipsContainer.querySelectorAll('.quiz-filter-chip').forEach((btn) => {
        btn.addEventListener('click', () => {
          this.categoryChipsContainer.querySelectorAll('.quiz-filter-chip').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeFilter = btn.dataset.cat;
          this.playTone(440, 0.08);
          this.startNewQuizSession();
        });
      });
    }

    renderStatsBanner() {
      if (this.totalBankBadge) {
        this.totalBankBadge.textContent = `${this.fullBank.length} Soal`;
      }
      if (this.totalCompletedBadge) {
        this.totalCompletedBadge.textContent = `${this.stats.totalSessions} Sesi`;
      }
      if (this.avgAccuracyBadge) {
        const totalAnswered = this.stats.totalAnswered || 0;
        const totalCorrect = this.stats.totalCorrect || 0;
        const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
        this.avgAccuracyBadge.textContent = `${pct}%`;
      }
      if (this.highestStreakBadge) {
        this.highestStreakBadge.textContent = `${this.stats.bestStreak || 0}x`;
      }
    }

    updateTimerButtonState() {
      if (!this.btnTimerToggle) return;
      if (this.timerMode) {
        this.btnTimerToggle.classList.add('bg-brass-400', 'text-ink');
        this.btnTimerToggle.classList.remove('bg-white/5', 'text-surface/80');
        this.btnTimerToggle.innerHTML = `
          <span class="material-symbols-outlined text-sm">timer</span>
          <span>Timer: 25s Aktif</span>
        `;
      } else {
        this.btnTimerToggle.classList.remove('bg-brass-400', 'text-ink');
        this.btnTimerToggle.classList.add('bg-white/5', 'text-surface/80');
        this.btnTimerToggle.innerHTML = `
          <span class="material-symbols-outlined text-sm">timer_off</span>
          <span>Mode Santai (Tanpa Timer)</span>
        `;
      }
    }

    startNewQuizSession() {
      this.clearTimer();

      let eligible = this.fullBank;
      if (this.activeFilter !== 'all') {
        eligible = this.fullBank.filter((q) => q.category === this.activeFilter);
        if (eligible.length === 0) eligible = this.fullBank;
      }

      const shuffled = this.shuffleArray([...eligible]);
      const selected = shuffled.slice(0, Math.min(10, shuffled.length));

      this.currentQuestions = selected.map((q) => {
        const clonedOptions = this.shuffleArray([...q.options]);
        return {
          ...q,
          sessionOptions: clonedOptions
        };
      });

      this.currentIndex = 0;
      this.userAnswers = {};
      this.score = 0;
      this.streak = 0;
      this.bestStreakInSession = 0;
      this.totalPoints = 0;
      this.sessionStartTime = Date.now();

      this.updateStreakDisplay();
      this.renderDotsNav();
      this.renderQuestionCard('right');

      if (this.timerMode) {
        if (this.timerBadge) this.timerBadge.classList.remove('hidden');
        this.startQuestionTimer();
      } else {
        if (this.timerBadge) this.timerBadge.classList.add('hidden');
      }
    }

    renderDotsNav() {
      if (!this.dotsContainer) return;
      this.dotsContainer.innerHTML = this.currentQuestions
        .map((_, i) => {
          let stateClass = '';
          if (i === this.currentIndex) stateClass = 'active';
          const answered = this.userAnswers[i];
          if (answered) {
            stateClass += answered.isCorrect ? ' correct' : ' incorrect';
          }
          return `
          <button class="quiz-dot-btn ${stateClass}" data-idx="${i}" title="Soal ${i + 1}">
            ${i + 1}
          </button>
        `;
        })
        .join('');

      this.dotsContainer.querySelectorAll('.quiz-dot-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetIdx = parseInt(btn.dataset.idx, 10);
          if (targetIdx !== this.currentIndex) {
            const dir = targetIdx > this.currentIndex ? 'right' : 'left';
            this.currentIndex = targetIdx;
            this.renderQuestionCard(dir);
            if (this.timerMode) this.startQuestionTimer();
          }
        });
      });
    }

    renderQuestionCard(slideDirection = 'right') {
      if (!this.cardContainer) return;
      const q = this.currentQuestions[this.currentIndex];
      if (!q) return;

      const total = this.currentQuestions.length;
      if (this.stepIndicator) {
        this.stepIndicator.textContent = `Soal ${String(this.currentIndex + 1).padStart(2, '0')} dari ${String(total).padStart(2, '0')}`;
      }

      if (this.progressFill) {
        const pct = ((this.currentIndex + 1) / total) * 100;
        this.progressFill.style.width = `${pct}%`;
      }

      const answeredData = this.userAnswers[this.currentIndex];
      const isAnswered = Boolean(answeredData);

      const animClass = slideDirection === 'left' ? 'anim-in-left' : 'anim-in-right';

      let optionsHtml = q.sessionOptions
        .map((opt, optIdx) => {
          const letter = String.fromCharCode(65 + optIdx);
          let extraClass = '';

          if (isAnswered) {
            if (opt.correct) {
              extraClass = 'is-correct';
            } else if (answeredData.selectedIdx === optIdx && !opt.correct) {
              extraClass = 'is-wrong';
            }
          }

          return `
          <button class="quiz-option-choice ${extraClass}" data-opt-idx="${optIdx}" ${isAnswered ? 'disabled' : ''}>
            <span class="quiz-letter-badge">${letter}</span>
            <span class="flex-1 text-xs sm:text-sm font-medium leading-relaxed">${opt.text}</span>
            ${
              isAnswered && opt.correct
                ? '<span class="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>'
                : ''
            }
            ${
              isAnswered && answeredData.selectedIdx === optIdx && !opt.correct
                ? '<span class="material-symbols-outlined text-rose-400 text-lg">cancel</span>'
                : ''
            }
          </button>
        `;
        })
        .join('');

      let feedbackHtml = '';
      if (isAnswered) {
        const chosenOpt = q.sessionOptions[answeredData.selectedIdx];
        const isRight = answeredData.isCorrect;
        const correctOpt = q.sessionOptions.find((o) => o.correct) || chosenOpt;

        feedbackHtml = `
          <div class="quiz-feedback-box mt-6 border ${
            isRight
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
          }">
            <div class="flex items-center gap-2 mb-2 font-display text-sm font-bold ${
              isRight ? 'text-emerald-300' : 'text-rose-300'
            }">
              <span class="material-symbols-outlined text-base">${isRight ? 'task_alt' : 'info'}</span>
              <span>${isRight ? 'Jawaban Benar! Kebijaksanaan Luhur' : 'Penjelasan Kultural yang Tepat'}</span>
            </div>
            <p class="text-xs sm:text-sm leading-relaxed mb-1 opacity-90">${correctOpt.explanation}</p>
          </div>
        `;
      }

      this.cardContainer.innerHTML = `
        <div class="quiz-card-box ${animClass}">
          <div class="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-5 border-b border-white/10 text-xs">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/30">
                ${q.category}
              </span>
              <span class="text-surface/60 font-mono flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-brass-400">location_on</span>
                <span>${q.province}</span>
              </span>
            </div>

            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-surface/75 border border-white/10">
                ${q.level}
              </span>
              <span class="text-[10px] text-brass-400/90 font-mono font-bold">
                ID: ${q.id}
              </span>
            </div>
          </div>

          <h3 class="font-display text-xl sm:text-2xl text-surface font-light leading-snug mb-4">
            ${q.question}
          </h3>

          <div class="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/8 text-xs text-surface/75 font-light leading-relaxed mb-6">
            <strong class="text-brass-300/90 block mb-1 uppercase tracking-wider text-[10px]">Konteks Pusaka Tradisi:</strong>
            ${q.context}
          </div>

          <div class="space-y-3" id="quiz-options-group">
            ${optionsHtml}
          </div>

          ${feedbackHtml}
        </div>
      `;

      this.cardContainer.querySelectorAll('.quiz-option-choice').forEach((btn) => {
        btn.addEventListener('click', () => {
          const optIdx = parseInt(btn.dataset.optIdx, 10);
          this.handleOptionSelection(optIdx);
        });
      });

      this.updateNavigationButtons();
      this.renderDotsNav();
    }

    handleOptionSelection(optIdx) {
      if (this.userAnswers[this.currentIndex] !== undefined) return;
      this.clearTimer();

      const q = this.currentQuestions[this.currentIndex];
      const chosenOpt = q.sessionOptions[optIdx];
      const isCorrect = Boolean(chosenOpt && chosenOpt.correct);

      if (isCorrect) {
        this.score++;
        this.streak++;
        if (this.streak > this.bestStreakInSession) {
          this.bestStreakInSession = this.streak;
        }
        const streakBonus = (this.streak - 1) * 25;
        this.totalPoints += 100 + streakBonus;
        this.playSuccessChime();
      } else {
        this.streak = 0;
        this.playWrongChime();
      }

      this.userAnswers[this.currentIndex] = {
        selectedIdx: optIdx,
        isCorrect: isCorrect
      };

      this.updateStreakDisplay();
      this.renderQuestionCard('none');

      const allAnswered = Object.keys(this.userAnswers).length === this.currentQuestions.length;
      if (allAnswered) {
        setTimeout(() => this.showQuizResults(), 1200);
      } else if (this.autoAdvance) {
        setTimeout(() => this.navigateQuestion(1), 1400);
      }
    }

    updateStreakDisplay() {
      if (this.streakCounter) {
        this.streakCounter.textContent = `${this.streak}x`;
      }
      if (this.streakPill) {
        if (this.streak >= 2) {
          this.streakPill.classList.remove('hidden');
        } else {
          this.streakPill.classList.add('hidden');
        }
      }
    }

    updateNavigationButtons() {
      if (this.btnPrev) {
        this.btnPrev.disabled = this.currentIndex === 0;
        this.btnPrev.style.opacity = this.currentIndex === 0 ? '0.4' : '1';
      }

      if (this.btnNext) {
        const isLast = this.currentIndex === this.currentQuestions.length - 1;
        const allAnswered = Object.keys(this.userAnswers).length === this.currentQuestions.length;

        if (isLast && allAnswered) {
          this.btnNext.innerHTML = `
            <span>Lihat Hasil Evaluasi</span>
            <span class="material-symbols-outlined text-sm">emoji_events</span>
          `;
          this.btnNext.classList.add('bg-brass-400', 'text-ink');
          this.btnNext.classList.remove('bg-white/10', 'text-surface');
        } else {
          this.btnNext.innerHTML = `
            <span>Selanjutnya</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          `;
          this.btnNext.classList.remove('bg-brass-400', 'text-ink');
          this.btnNext.classList.add('bg-white/10', 'text-surface');
        }
      }
    }

    navigateQuestion(delta) {
      const nextIdx = this.currentIndex + delta;
      const total = this.currentQuestions.length;

      if (nextIdx < 0) return;

      if (nextIdx >= total) {
        const answeredCount = Object.keys(this.userAnswers).length;
        if (answeredCount === total) {
          this.showQuizResults();
          return;
        }
      }

      const clamped = Math.max(0, Math.min(total - 1, nextIdx));
      if (clamped !== this.currentIndex) {
        const dir = delta > 0 ? 'right' : 'left';
        this.currentIndex = clamped;
        this.renderQuestionCard(dir);

        if (this.timerMode && !this.userAnswers[this.currentIndex]) {
          this.startQuestionTimer();
        } else {
          this.clearTimer();
        }
      }
    }

    startQuestionTimer() {
      this.clearTimer();
      this.timerSeconds = 25;
      if (this.timerValue) this.timerValue.textContent = `${this.timerSeconds}s`;

      this.timerInterval = setInterval(() => {
        this.timerSeconds--;
        if (this.timerValue) this.timerValue.textContent = `${this.timerSeconds}s`;

        if (this.timerSeconds <= 0) {
          this.clearTimer();
          this.playTone(280, 0.3);
          this.handleTimeout();
        }
      }, 1000);
    }

    clearTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }

    handleTimeout() {
      if (this.userAnswers[this.currentIndex] !== undefined) return;

      this.streak = 0;
      this.updateStreakDisplay();

      this.userAnswers[this.currentIndex] = {
        selectedIdx: -1,
        isCorrect: false,
        timedOut: true
      };

      this.renderQuestionCard('none');

      const allAnswered = Object.keys(this.userAnswers).length === this.currentQuestions.length;
      if (allAnswered) {
        setTimeout(() => this.showQuizResults(), 1200);
      }
    }

    showQuizResults() {
      this.clearTimer();
      this.saveSessionStats();

      const total = this.currentQuestions.length;
      const pct = Math.round((this.score / total) * 100);

      let title = '';
      let desc = '';

      if (pct === 100) {
        title = 'Mahaguru Pusaka Nusantara';
        desc = 'Luar biasa sempurna! Penguasaan Anda atas falsafah, tosan aji, wastra, dan adat tradisi Nusantara berada pada tingkat tertinggi.';
      } else if (pct >= 80) {
        title = 'Ksatria Penjaga Tradisi';
        desc = 'Hebat sekali! Anda memiliki pemahaman yang sangat mendalam tentang peradaban dan kekayaan luhur bangsa Indonesia.';
      } else if (pct >= 60) {
        title = 'Penjelajah Jejak Leluhur';
        desc = 'Bagus! Fondasi wawasan budaya Anda sudah kokoh. Terus gali lembaran cerita dan ragam kriya pusaka lainnya.';
      } else if (pct >= 40) {
        title = 'Pelajar Adat Pemula';
        desc = 'Perjalanan mengenal akar budaya baru saja dimulai. Coba lagi 10 soal acak berikutnya untuk memperdalam pemahaman!';
      } else {
        title = 'Pencari Benih Kearifan';
        desc = 'Jangan patah semangat! Setiap lembaran warisan Nusantara menyimpan mutiara ilmu yang siap dipelajari kembali.';
      }

      if (this.resultTitle) this.resultTitle.textContent = title;
      if (this.resultScoreText) this.resultScoreText.textContent = `${this.score} / ${total} Benar`;
      if (this.resultPercentText) this.resultPercentText.textContent = `${pct}%`;

      if (this.resultProgressCircle) {
        const circumference = 2 * Math.PI * 60;
        const offset = circumference - (pct / 100) * circumference;
        this.resultProgressCircle.style.strokeDashoffset = offset;
      }

      if (this.resultDetailsGrid) {
        const durationSec = Math.round((Date.now() - (this.sessionStartTime || Date.now())) / 1000);
        const mins = Math.floor(durationSec / 60);
        const secs = durationSec % 60;
        const timeStr = `${mins > 0 ? `${mins}m ` : ''}${secs}s`;

        this.resultDetailsGrid.innerHTML = `
          <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 text-center">
            <span class="text-[10px] text-surface/60 uppercase font-mono block mb-1">Total Poin</span>
            <span class="font-display text-lg text-brass-300 font-bold">${this.totalPoints}</span>
          </div>
          <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 text-center">
            <span class="text-[10px] text-surface/60 uppercase font-mono block mb-1">Streak Terbaik</span>
            <span class="font-display text-lg text-amber-300 font-bold">${this.bestStreakInSession}x</span>
          </div>
          <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 text-center">
            <span class="text-[10px] text-surface/60 uppercase font-mono block mb-1">Durasi Kuis</span>
            <span class="font-display text-lg text-forest-300 font-bold">${timeStr}</span>
          </div>
          <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 text-center">
            <span class="text-[10px] text-surface/60 uppercase font-mono block mb-1">Total Latihan</span>
            <span class="font-display text-lg text-terracotta-300 font-bold">${this.stats.totalSessions} Sesi</span>
          </div>
        `;
      }

      this.renderCategoryBreakdown();

      if (this.resultsModal) {
        this.resultsModal.classList.remove('hidden');
        this.resultsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      if (pct >= 80) {
        this.playCelebrationFanfare();
      } else {
        this.playTone(523, 0.2);
      }
    }

    renderCategoryBreakdown() {
      if (!this.resultCategoryBreakdown) return;

      const catStats = {};
      this.currentQuestions.forEach((q, i) => {
        const cat = q.category;
        if (!catStats[cat]) {
          catStats[cat] = { total: 0, correct: 0 };
        }
        catStats[cat].total++;
        if (this.userAnswers[i] && this.userAnswers[i].isCorrect) {
          catStats[cat].correct++;
        }
      });

      this.resultCategoryBreakdown.innerHTML = Object.entries(catStats)
        .map(([cat, s]) => {
          const pct = Math.round((s.correct / s.total) * 100);
          return `
          <div class="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
            <span class="text-surface/80 truncate mr-2">${cat}</span>
            <span class="font-mono text-brass-300 font-semibold flex-shrink-0">${s.correct}/${s.total} (${pct}%)</span>
          </div>
        `;
        })
        .join('');
    }

    closeResultsModal() {
      if (this.resultsModal) {
        this.resultsModal.classList.remove('active');
        this.resultsModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }

    shareAchievement() {
      const total = this.currentQuestions.length;
      const pct = Math.round((this.score / total) * 100);
      const text = `✨ Saya meraih skor ${this.score}/${total} (${pct}%) di Pusat Belajar & Kuis Budaya WARISARA! Mari uji pemahaman adat dan pusaka Nusantara Anda: https://warisara.id/pages/belajar.html`;

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            alert('🎉 Teks pencapaian berhasil disalin ke clipboard! Bagikan ke teman atau media sosial.');
          })
          .catch(() => {
            prompt('Salin teks pencapaian berikut:', text);
          });
      } else {
        prompt('Salin teks pencapaian berikut:', text);
      }
    }

    saveSessionStats() {
      const total = this.currentQuestions.length;
      this.stats.totalSessions = (this.stats.totalSessions || 0) + 1;
      this.stats.totalAnswered = (this.stats.totalAnswered || 0) + total;
      this.stats.totalCorrect = (this.stats.totalCorrect || 0) + this.score;

      if (this.bestStreakInSession > (this.stats.bestStreak || 0)) {
        this.stats.bestStreak = this.bestStreakInSession;
      }

      if (this.score > (this.stats.highestScore || 0)) {
        this.stats.highestScore = this.score;
      }

      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.stats));
      } catch (e) {}

      this.renderStatsBanner();
    }

    loadStats() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return {
        totalSessions: 0,
        totalAnswered: 0,
        totalCorrect: 0,
        bestStreak: 0,
        highestScore: 0
      };
    }

    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }

    getAudioContext() {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      return this.audioCtx;
    }

    playTone(freq, duration = 0.15, type = 'sine') {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    }

    playSuccessChime() {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            this.playTone(freq, 0.22, 'triangle');
          }, idx * 75);
        });
      } catch (e) {}
    }

    playWrongChime() {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        const notes = [311.13, 277.18];
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            this.playTone(freq, 0.25, 'sawtooth');
          }, idx * 110);
        });
      } catch (e) {}
    }

    playCelebrationFanfare() {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            this.playTone(freq, 0.35, 'triangle');
          }, idx * 90);
        });
      } catch (e) {}
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.WARISARA_LEARNING_HUB = new WarisaraLearningHub();
    window.WARISARA_LEARNING_HUB.init();
  });
})();
