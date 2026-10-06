(function () {
  'use strict';

  class WarisaraLearningHub {
    constructor() {
      this.fullBank = [];
      this.activeFilter = 'all';
      this.timerMode = false;
      this.autoAdvance = false;
      this.soundEnabled = true;
      this.bgmEnabled = true;
      this.isGameActive = false;

      this.currentQuestions = [];
      this.currentIndex = 0;
      this.userAnswers = {};
      this.score = 0;
      this.streak = 0;
      this.bestStreakInSession = 0;
      this.livePoints = 0;
      this.sessionStartTime = null;

      this.remainingSeconds = 15 * 60;
      this.timerInterval = null;

      this.audioCtx = null;
      this.bgmInterval = null;
      this.bgmStep = 0;

      this.storageKey = 'warisara_quiz_learning_stats';
      this.stats = this.loadStats();

      this.confettiAnimationId = null;
    }

    init() {
      if (window.QUIZ_DATA && Array.isArray(window.QUIZ_DATA)) {
        this.fullBank = window.QUIZ_DATA;
      }

      this.cacheDom();
      this.bindEvents();
      this.renderCategoryChips();
      this.renderStatsBanner();
      this.prepareNewQuestions();
    }

    cacheDom() {
      this.totalBankBadge = document.getElementById('stat-total-questions-bank');
      this.totalCompletedBadge = document.getElementById('stat-total-completed');
      this.avgAccuracyBadge = document.getElementById('stat-avg-accuracy');
      this.highestStreakBadge = document.getElementById('stat-highest-streak');

      this.categoryChipsContainer = document.getElementById('quiz-category-chips');
      this.heroStartWrapper = document.getElementById('hero-start-btn-wrapper');
      this.btnStartGame = document.getElementById('btn-quiz-start-game');
      this.btnShuffleNew10 = document.getElementById('btn-shuffle-new-10');
      this.btnAutoToggle = document.getElementById('btn-toggle-auto-advance');
      this.labelAutoToggle = document.getElementById('label-auto-toggle');
      this.btnBgmToggle = document.getElementById('btn-toggle-bgm');
      this.iconBgmToggle = document.getElementById('icon-bgm-toggle');
      this.labelBgmToggle = document.getElementById('label-bgm-toggle');
      this.btnSoundToggle = document.getElementById('btn-toggle-sound');
      this.iconSoundToggle = document.getElementById('icon-sound-toggle');

      this.gameplayView = document.getElementById('quiz-gameplay-view');

      this.countdownOverlay = document.getElementById('quiz-countdown-overlay');
      this.countdownDigit = document.getElementById('quiz-countdown-digit');
      this.confettiCanvas = document.getElementById('confetti-canvas');

      this.arenaSection = document.getElementById('quiz-interactive-arena');
      this.stepIndicator = document.getElementById('quiz-step-indicator');
      this.liveScoreBadge = document.getElementById('quiz-live-score');
      this.progressFill = document.getElementById('quiz-progress-fill');
      this.progressText = document.getElementById('quiz-progress-text');
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
      this.resultPointsHeadline = document.getElementById('result-points-headline');
      this.resultPointsBar = document.getElementById('result-points-bar');
      this.resultMotivationalText = document.getElementById('result-motivational-text');
      this.btnPlayAgain = document.getElementById('btn-result-play-again');
      this.btnReviewAnswers = document.getElementById('btn-result-review');
      this.btnShareResult = document.getElementById('btn-result-share');
      this.btnCloseResult = document.getElementById('btn-result-close');

      this.toastEl = document.getElementById('toast-quiz-message');
      this.toastTextEl = document.getElementById('toast-quiz-text');
    }

    bindEvents() {
      if (this.btnStartGame) {
        this.btnStartGame.addEventListener('click', () => {
          this.startQuizizzFlow();
        });
      }

      if (this.btnShuffleNew10) {
        this.btnShuffleNew10.addEventListener('click', () => {
          this.startQuizizzFlow();
        });
      }

      if (this.btnAutoToggle) {
        this.btnAutoToggle.addEventListener('click', () => {
          this.autoAdvance = !this.autoAdvance;
          this.updateAutoButtonState();
        });
      }

      if (this.btnBgmToggle) {
        this.btnBgmToggle.addEventListener('click', () => {
          this.bgmEnabled = !this.bgmEnabled;
          this.updateBgmButtonState();
          if (this.bgmEnabled && this.isGameActive) {
            this.startBGM();
          } else {
            this.stopBGM();
          }
        });
      }

      if (this.btnSoundToggle) {
        this.btnSoundToggle.addEventListener('click', () => {
          this.soundEnabled = !this.soundEnabled;
          this.updateSoundButtonState();
          if (this.soundEnabled) {
            this.playTone(660, 0.15);
          }
        });
      }

      if (this.btnPrev) {
        this.btnPrev.addEventListener('click', () => this.navigateQuestion(-1));
      }

      if (this.btnNext) {
        this.btnNext.addEventListener('click', () => this.handleNextClick());
      }

      if (this.btnPlayAgain) {
        this.btnPlayAgain.addEventListener('click', () => {
          this.closeResultsModal();
          this.startQuizizzFlow();
        });
      }

      if (this.btnReviewAnswers) {
        this.btnReviewAnswers.addEventListener('click', () => {
          this.dismissResultsModalOnly();
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

      if (this.resultsModal) {
        this.resultsModal.addEventListener('click', (e) => {
          if (e.target === this.resultsModal) {
            this.closeResultsModal();
          }
        });
      }

      if (this.btnShareResult) {
        this.btnShareResult.addEventListener('click', () => this.shareAchievement());
      }

      document.addEventListener('keydown', (e) => {
        if (!this.isGameActive) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (this.resultsModal && this.resultsModal.classList.contains('active')) {
          if (e.key === 'Escape') this.closeResultsModal();
          return;
        }

        const key = e.key.toLowerCase();

        if (key === 'a' || key === '1') {
          this.handleOptionSelection(0);
        } else if (key === 'b' || key === '2') {
          this.handleOptionSelection(1);
        } else if (key === 'c' || key === '3') {
          this.handleOptionSelection(2);
        } else if (key === 'd' || key === '4') {
          this.handleOptionSelection(3);
        } else if (key === 'arrowright' || key === 'enter' || key === ' ') {
          if (e.key === ' ' || e.key === 'Enter') e.preventDefault();
          this.handleNextClick();
        } else if (key === 'arrowleft') {
          this.navigateQuestion(-1);
        } else if (key === 'r') {
          this.startQuizizzFlow();
        }
      });
    }

    startQuizizzFlow() {
      this.clearTimer();
      this.stopBGM();
      this.prepareNewQuestions();

      if (this.countdownOverlay && this.countdownDigit) {
        this.countdownOverlay.classList.add('active');
        let count = 3;
        this.countdownDigit.textContent = `${count}`;
        this.playTone(440, 0.12, 'triangle');

        const cdInterval = setInterval(() => {
          count--;
          if (count > 0) {
            this.countdownDigit.textContent = `${count}`;
            this.playTone(440, 0.12, 'triangle');
          } else if (count === 0) {
            this.countdownDigit.textContent = 'MULAI!';
            this.playTone(660, 0.25, 'triangle');
          } else {
            clearInterval(cdInterval);
            this.countdownOverlay.classList.remove('active');
            this.launchQuizSession();
          }
        }, 850);
      } else {
        this.launchQuizSession();
      }
    }

    launchQuizSession() {
      this.isGameActive = true;
      this.currentIndex = 0;
      this.userAnswers = {};
      this.score = 0;
      this.streak = 0;
      this.bestStreakInSession = 0;
      this.livePoints = 0;
      this.sessionStartTime = Date.now();

      if (this.heroStartWrapper) {
        this.heroStartWrapper.classList.add('hidden');
      }

      if (this.arenaSection) {
        this.arenaSection.classList.remove('hidden');
        this.arenaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      this.updateStreakDisplay();
      this.updateLivePointsDisplay();
      this.renderQuestionCard('right');

      this.remainingSeconds = 15 * 60;
      this.startSessionTimer();

      if (this.bgmEnabled) {
        this.startBGM();
      }
    }

    updateAutoButtonState() {
      if (!this.btnAutoToggle) return;
      if (this.autoAdvance) {
        this.btnAutoToggle.classList.add('active');
        if (this.labelAutoToggle) this.labelAutoToggle.textContent = 'Auto-Lanjut: Aktif';
      } else {
        this.btnAutoToggle.classList.remove('active');
        if (this.labelAutoToggle) this.labelAutoToggle.textContent = 'Auto-Lanjut: Mati';
      }
    }

    updateBgmButtonState() {
      if (!this.btnBgmToggle) return;
      if (this.bgmEnabled) {
        this.btnBgmToggle.classList.add('active');
        if (this.iconBgmToggle) {
          this.iconBgmToggle.textContent = 'music_note';
          this.iconBgmToggle.className = 'material-symbols-outlined text-base text-amber-300';
        }
        if (this.labelBgmToggle) this.labelBgmToggle.textContent = 'Musik: Aktif';
      } else {
        this.btnBgmToggle.classList.remove('active');
        if (this.iconBgmToggle) {
          this.iconBgmToggle.textContent = 'music_off';
          this.iconBgmToggle.className = 'material-symbols-outlined text-base text-surface/40';
        }
        if (this.labelBgmToggle) this.labelBgmToggle.textContent = 'Musik: Mati';
      }
    }

    updateSoundButtonState() {
      if (!this.btnSoundToggle) return;
      if (this.soundEnabled) {
        this.btnSoundToggle.classList.add('active');
        if (this.iconSoundToggle) {
          this.iconSoundToggle.textContent = 'volume_up';
          this.iconSoundToggle.className = 'material-symbols-outlined text-base text-brass-300';
        }
      } else {
        this.btnSoundToggle.classList.remove('active');
        if (this.iconSoundToggle) {
          this.iconSoundToggle.textContent = 'volume_off';
          this.iconSoundToggle.className = 'material-symbols-outlined text-base text-surface/40';
        }
      }
    }

    renderCategoryChips() {
      if (!this.categoryChipsContainer) return;

      const categories = [
        { id: 'all', label: 'Semua Kategori (Acak)' },
        { id: 'Wastra & Tekstil', label: 'Wastra & Tekstil' },
        { id: 'Arsitektur Vernakular', label: 'Arsitektur Adat' },
        { id: 'Tosan Aji & Pusaka', label: 'Tosan Aji & Senjata' },
        { id: 'Seni Pertunjukan', label: 'Tarian & Teater' },
        { id: 'Alat Musik Tradisional', label: 'Musik & Bunyi' },
        { id: 'Mitos & Tutur Lisan', label: 'Mitos & Legenda' },
        { id: 'Tradisi & Ritus Adat', label: 'Upacara & Adat' },
        { id: 'Kriya & Ukiran', label: 'Kriya & Ornamen' },
        { id: 'Jalur Rempah & Kuliner', label: 'Jalur Rempah' }
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
          this.activeFilter = btn.dataset.cat;
          this.categoryChipsContainer.querySelectorAll('.quiz-filter-chip').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.prepareNewQuestions();
          if (this.isGameActive) {
            this.currentIndex = 0;
            this.renderQuestionCard('none');
          }
        });
      });
    }

    renderStatsBanner() {
      if (this.totalBankBadge) {
        this.totalBankBadge.textContent = this.fullBank.length > 0 ? `${this.fullBank.length}` : '130';
      }
      if (this.totalCompletedBadge) {
        this.totalCompletedBadge.textContent = `${this.stats.totalSessions || 0}`;
      }
      if (this.avgAccuracyBadge) {
        const totalA = this.stats.totalAnswered || 0;
        const totalC = this.stats.totalCorrect || 0;
        const pct = totalA > 0 ? Math.round((totalC / totalA) * 100) : 0;
        this.avgAccuracyBadge.textContent = `${pct}%`;
      }
      if (this.highestStreakBadge) {
        this.highestStreakBadge.textContent = `${this.stats.bestStreak || 0}x`;
      }
    }

    prepareNewQuestions() {
      let eligible = this.fullBank;
      if (this.activeFilter && this.activeFilter !== 'all') {
        eligible = this.fullBank.filter((q) => q.category === this.activeFilter);
        if (eligible.length < 5) eligible = this.fullBank;
      }

      const shuffledPool = this.shuffleArray([...eligible]);
      this.currentQuestions = shuffledPool.slice(0, 10).map((q) => {
        const clonedOptions = q.options.map((opt) => ({ ...opt }));
        return {
          ...q,
          sessionOptions: this.shuffleArray(clonedOptions)
        };
      });
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
            if (this.timerMode && !this.userAnswers[this.currentIndex]) {
              this.startQuestionTimer();
            } else {
              this.clearTimer();
            }
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

      const pct = Math.round(((this.currentIndex + 1) / total) * 100);
      if (this.progressFill) {
        this.progressFill.style.width = `${pct}%`;
      }
      if (this.progressText) {
        this.progressText.textContent = `${pct}% Selesai`;
      }

      const answeredData = this.userAnswers[this.currentIndex];
      const isAnswered = Boolean(answeredData);
      const isLast = this.currentIndex === total - 1;

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
          <button class="quiz-option-choice ${extraClass}" data-opt-theme="${optIdx % 4}" data-opt-idx="${optIdx}" ${isAnswered ? 'disabled' : ''}>
            <span class="quiz-letter-badge">${letter}</span>
            <span class="flex-1 text-xs sm:text-sm font-semibold leading-relaxed">${opt.text}</span>
            <span class="quiz-shortcut-badge">[${letter}]</span>
            ${
              isAnswered && opt.correct
                ? '<span class="material-symbols-outlined text-emerald-400 text-xl flex-shrink-0">check_circle</span>'
                : ''
            }
            ${
              isAnswered && answeredData.selectedIdx === optIdx && !opt.correct
                ? '<span class="material-symbols-outlined text-rose-400 text-xl flex-shrink-0">cancel</span>'
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
              ? 'bg-emerald-950/45 border-emerald-500/50 text-emerald-100'
              : 'bg-rose-950/45 border-rose-500/50 text-rose-100'
          }">
            <div class="flex items-center gap-2 mb-2 font-display text-sm font-bold ${
              isRight ? 'text-emerald-300' : 'text-rose-300'
            }">
              <span class="material-symbols-outlined text-xl">${isRight ? 'task_alt' : 'info'}</span>
              <span>${isRight ? 'Luar Biasa! Jawaban Tepat (+100 Pts)' : 'Ulasan Kultural & Fakta Sejarah'}</span>
            </div>
            <p class="text-xs sm:text-sm leading-relaxed mb-4 text-surface/90 font-light">${correctOpt.explanation}</p>

            <div class="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span class="text-[11px] text-surface/50 font-mono hidden sm:inline">Pintasan: Tekan Enter ↵</span>
              <button id="btn-inline-next" class="quiz-btn-inline-next">
                <span>${isLast ? 'Lihat Pencapaian Kuis' : 'Lanjut ke Soal Berikutnya'}</span>
                <span class="material-symbols-outlined text-base">${isLast ? 'emoji_events' : 'arrow_forward'}</span>
              </button>
            </div>
          </div>
        `;
      }

      this.cardContainer.innerHTML = `
        <div class="quiz-card-box ${animClass}">
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10 text-xs">
            <div class="flex items-center gap-2">
              <span class="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/35">
                ${q.category}
              </span>
              <span class="text-surface/65 font-mono flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-brass-400">location_on</span>
                <span>${q.province}</span>
              </span>
            </div>

            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-surface/75 border border-white/10">
                Tingkat: ${q.level}
              </span>
              <span class="text-[10px] text-brass-400/80 font-mono">
                ID: ${q.id}
              </span>
            </div>
          </div>

          <h3 class="font-display text-2xl sm:text-3xl text-surface font-light leading-snug mb-5">
            ${q.question}
          </h3>

          <div class="quiz-context-panel text-sm text-surface/85 font-light leading-relaxed mb-7">
            <strong class="text-brass-300 block mb-1.5 uppercase tracking-wider text-[11px] font-bold">Konteks Pusaka Tradisi:</strong>
            ${q.context}
          </div>

          <div class="quiz-options-grid" id="quiz-options-group">
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

      const inlineNextBtn = document.getElementById('btn-inline-next');
      if (inlineNextBtn) {
        inlineNextBtn.addEventListener('click', () => this.handleNextClick());
      }

      this.updateNavigationButtons();
      this.renderDotsNav();
    }

    handleOptionSelection(optIdx) {
      if (this.userAnswers[this.currentIndex] !== undefined) return;

      const q = this.currentQuestions[this.currentIndex];
      const chosenOpt = q.sessionOptions[optIdx];
      if (!chosenOpt) return;

      const isCorrect = Boolean(chosenOpt && chosenOpt.correct);

      if (isCorrect) {
        this.score++;
        this.streak++;
        if (this.streak > this.bestStreakInSession) {
          this.bestStreakInSession = this.streak;
        }

        const basePoints = 100;
        this.livePoints = this.score * basePoints;

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
      this.updateLivePointsDisplay();
      this.renderQuestionCard('none');

      const total = this.currentQuestions.length;
      const allAnswered = Object.keys(this.userAnswers).length === total;

      if (allAnswered) {
        if (this.autoAdvance) {
          setTimeout(() => this.showQuizResults(), 1200);
        }
      } else if (this.autoAdvance) {
        setTimeout(() => this.navigateQuestion(1), 1500);
      }
    }

    handleNextClick() {
      const isAnswered = Boolean(this.userAnswers[this.currentIndex]);
      const isLast = this.currentIndex === this.currentQuestions.length - 1;

      if (isLast && isAnswered) {
        this.showQuizResults();
      } else {
        this.navigateQuestion(1);
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

    updateLivePointsDisplay() {
      if (this.liveScoreBadge) {
        this.liveScoreBadge.textContent = `${this.livePoints} / 1.000 Pts`;
      }
    }

    updateNavigationButtons() {
      if (this.btnPrev) {
        this.btnPrev.disabled = this.currentIndex === 0;
        this.btnPrev.style.opacity = this.currentIndex === 0 ? '0.35' : '1';
      }

      if (this.btnNext) {
        const isLast = this.currentIndex === this.currentQuestions.length - 1;
        const allAnswered = Object.keys(this.userAnswers).length === this.currentQuestions.length;

        if (isLast && allAnswered) {
          this.btnNext.innerHTML = `
            <span>Lihat Pencapaian Kuis</span>
            <span class="material-symbols-outlined text-sm">emoji_events</span>
          `;
          this.btnNext.className = 'px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B38728] via-[#D4AF37] to-[#B38728] text-[#120F0C] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all';
        } else {
          this.btnNext.innerHTML = `
            <span>Selanjutnya</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          `;
          this.btnNext.className = 'px-6 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:border-brass-400/50 text-surface text-xs font-semibold flex items-center gap-2 transition-all';
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
      }
    }

    startSessionTimer() {
      this.clearTimer();
      this.updateTimerDisplay();

      this.timerInterval = setInterval(() => {
        this.remainingSeconds--;
        this.updateTimerDisplay();

        if (this.remainingSeconds <= 120 && this.timerBadge) {
          this.timerBadge.className = 'px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 font-mono text-xs font-bold flex items-center gap-2 animate-pulse';
        }

        if (this.remainingSeconds <= 0) {
          this.clearTimer();
          this.playTone(280, 0.4);
          this.handleSessionTimeout();
        }
      }, 1000);
    }

    updateTimerDisplay() {
      const mins = Math.floor(Math.max(0, this.remainingSeconds) / 60);
      const secs = Math.max(0, this.remainingSeconds) % 60;
      const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      if (this.timerValue) this.timerValue.textContent = timeStr;
    }

    clearTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }

    handleSessionTimeout() {
      this.clearTimer();
      this.currentQuestions.forEach((_, idx) => {
        if (this.userAnswers[idx] === undefined) {
          this.userAnswers[idx] = {
            selectedIdx: -1,
            isCorrect: false,
            timedOut: true
          };
        }
      });
      this.showQuizResults();
    }

    showQuizResults() {
      this.clearTimer();
      this.stopBGM();
      this.saveSessionStats();

      const total = this.currentQuestions.length;
      const pct = Math.round((this.score / total) * 100);

      let title = '';
      if (pct === 100) {
        title = 'Mahaguru Pusaka Nusantara';
      } else if (pct >= 80) {
        title = 'Ksatria Penjaga Tradisi';
      } else if (pct >= 60) {
        title = 'Penjelajah Jejak Leluhur';
      } else if (pct >= 40) {
        title = 'Pelajar Adat Pemula';
      } else {
        title = 'Pencari Benih Kearifan';
      }

      if (this.resultTitle) this.resultTitle.textContent = title;
      if (this.resultScoreText) this.resultScoreText.textContent = `${this.score} / ${total} Benar`;
      if (this.resultPercentText) this.resultPercentText.textContent = `${pct}%`;

      if (this.resultProgressCircle) {
        const circumference = 2 * Math.PI * 65;
        const offset = circumference - (pct / 100) * circumference;
        this.resultProgressCircle.style.strokeDashoffset = offset;
      }

      if (this.resultPointsHeadline) {
        this.resultPointsHeadline.textContent = `Skor Akhir: ${this.livePoints} / 1.000 Pts`;
      }
      if (this.resultPointsBar) {
        this.resultPointsBar.style.width = `${pct}%`;
      }
      if (this.resultMotivationalText) {
        if (pct === 100) {
          this.resultMotivationalText.textContent = 'Sempurna! Anda berhasil mengumpulkan skor maksimal 1.000 Poin! Wawasan tradisi dan pusaka Nusantara Anda luar biasa sempurna.';
        } else if (pct >= 80) {
          this.resultMotivationalText.textContent = `Hebat sekali! Anda meraih ${this.livePoints} Poin dari Maksimal 1.000 Poin. Hanya butuh ${1000 - this.livePoints} poin lagi untuk kesempurnaan mutlak!`;
        } else if (pct >= 60) {
          this.resultMotivationalText.textContent = `Bagus! Anda meraih ${this.livePoints} Poin dari Maksimal 1.000 Poin. Ayo coba lagi dengan 10 soal acak untuk merebut gelar tertinggi!`;
        } else if (pct >= 40) {
          this.resultMotivationalText.textContent = `Potensi bagus! Anda meraih ${this.livePoints} Poin dari Maksimal 1.000 Poin. Pelajari konteks tradisi lebih dalam untuk mencapai 1.000 poin!`;
        } else {
          this.resultMotivationalText.textContent = `Langkah awal yang baik! Anda meraih ${this.livePoints} Poin dari Maksimal 1.000 Poin. Ulangi sesi kuis untuk mengejar target 1.000 poin maksimal!`;
        }
      }

      if (this.resultDetailsGrid) {
        const durationSec = Math.round((Date.now() - (this.sessionStartTime || Date.now())) / 1000);
        const mins = Math.floor(durationSec / 60);
        const secs = durationSec % 60;
        const timeStr = `${mins > 0 ? `${mins}m ` : ''}${secs}s`;

        this.resultDetailsGrid.innerHTML = `
          <div class="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-center space-y-1">
            <div class="flex items-center justify-center gap-1 text-brass-400 text-xs">
              <span class="material-symbols-outlined text-sm">stars</span>
              <span class="text-[10px] uppercase font-mono tracking-wider">Skor Kuis</span>
            </div>
            <div class="font-display text-lg sm:text-xl text-brass-300 font-bold">${this.livePoints} <span class="text-xs font-normal text-surface/50">/ 1.000</span></div>
          </div>
          <div class="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-center space-y-1">
            <div class="flex items-center justify-center gap-1 text-amber-400 text-xs">
              <span class="material-symbols-outlined text-sm">task_alt</span>
              <span class="text-[10px] uppercase font-mono tracking-wider">Akurasi</span>
            </div>
            <div class="font-display text-lg sm:text-xl text-amber-300 font-bold">${pct}%</div>
            <span class="text-[10px] text-surface/50 font-mono block">${this.score} / ${total} Benar</span>
          </div>
          <div class="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-center space-y-1">
            <div class="flex items-center justify-center gap-1 text-emerald-400 text-xs">
              <span class="material-symbols-outlined text-sm">local_fire_department</span>
              <span class="text-[10px] uppercase font-mono tracking-wider">Streak</span>
            </div>
            <div class="font-display text-lg sm:text-xl text-emerald-300 font-bold">${this.bestStreakInSession}x</div>
            <span class="text-[10px] text-surface/50 font-mono block">Beruntun</span>
          </div>
          <div class="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-center space-y-1">
            <div class="flex items-center justify-center gap-1 text-terracotta-300 text-xs">
              <span class="material-symbols-outlined text-sm">schedule</span>
              <span class="text-[10px] uppercase font-mono tracking-wider">Durasi</span>
            </div>
            <div class="font-display text-lg sm:text-xl text-terracotta-300 font-bold">${timeStr}</div>
            <span class="text-[10px] text-surface/50 font-mono block">Dari 15 Menit</span>
          </div>
        `;
      }

      this.renderCategoryBreakdown();

      if (this.resultsModal) {
        this.resultsModal.classList.remove('hidden');
        this.resultsModal.classList.add('active');
        this.resultsModal.scrollTop = 0;
        const innerContainer = this.resultsModal.querySelector('.modal-container');
        if (innerContainer) innerContainer.scrollTop = 0;
        document.body.style.overflow = 'hidden';
      }

      if (pct >= 80) {
        this.playCelebrationFanfare();
        this.launchConfetti();
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
          let barGradient = 'from-emerald-500 to-teal-400';
          let badgeClass = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
          if (pct === 0) {
            barGradient = 'from-white/15 to-white/5';
            badgeClass = 'bg-white/5 border-white/10 text-surface/50';
          } else if (pct < 100) {
            barGradient = 'from-amber-500 to-brass-400';
            badgeClass = 'bg-amber-500/15 border-amber-500/30 text-amber-300';
          }

          return `
          <div class="flex items-center justify-between gap-3 text-xs py-2 px-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <span class="text-surface/85 truncate font-medium flex-1">${cat}</span>
            <div class="w-20 sm:w-28 h-1.5 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
              <div class="h-full rounded-full bg-gradient-to-r ${barGradient}" style="width: ${pct}%"></div>
            </div>
            <span class="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md border flex-shrink-0 ${badgeClass}">
              ${s.correct}/${s.total} (${pct}%)
            </span>
          </div>
        `;
        })
        .join('');
    }

    dismissResultsModalOnly() {
      if (this.resultsModal) {
        this.resultsModal.classList.remove('active');
        this.resultsModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
      this.stopConfetti();
    }

    closeResultsModal() {
      this.dismissResultsModalOnly();
      this.stopBGM();
      this.clearTimer();
      this.isGameActive = false;

      if (this.arenaSection) {
        this.arenaSection.classList.add('hidden');
      }

      if (this.heroStartWrapper) {
        this.heroStartWrapper.classList.remove('hidden');
      }

      this.currentIndex = 0;
      this.userAnswers = {};
      this.score = 0;
      this.streak = 0;
      this.bestStreakInSession = 0;
      this.livePoints = 0;
      this.prepareNewQuestions();
      this.renderStatsBanner();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showToast(message) {
      if (!this.toastEl) return;
      if (this.toastTextEl) this.toastTextEl.textContent = message;
      this.toastEl.classList.add('show');
      setTimeout(() => {
        this.toastEl.classList.remove('show');
      }, 2600);
    }

    shareAchievement() {
      const total = this.currentQuestions.length;
      const pct = Math.round((this.score / total) * 100);
      const text = `Saya meraih skor ${this.livePoints} dari Maksimal 1.000 Poin (${this.score}/${total} Benar) di Pusat Belajar & Kuis Budaya WARISARA! Uji wawasan tradisi Nusantara Anda di: https://warisara.id/pages/belajar.html`;

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            this.showToast('Pencapaian disalin ke papan klip');
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

      if (this.livePoints > (this.stats.highestScore || 0)) {
        this.stats.highestScore = this.livePoints;
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

    startBGM() {
      this.stopBGM();
      if (!this.bgmEnabled) return;

      const melody = [
        { f: 261.63, b: 130.81 },
        { f: 329.63, b: null },
        { f: 392.00, b: null },
        { f: 440.00, b: null },
        { f: 392.00, b: null },
        { f: 329.63, b: null },
        { f: 293.66, b: 146.83 },
        { f: 369.99, b: null },
        { f: 440.00, b: null },
        { f: 493.88, b: null },
        { f: 440.00, b: null },
        { f: 369.99, b: null },
        { f: 329.63, b: 164.81 },
        { f: 392.00, b: null },
        { f: 493.88, b: null },
        { f: 523.25, b: null },
        { f: 493.88, b: null },
        { f: 392.00, b: null },
        { f: 392.00, b: 196.00 },
        { f: 440.00, b: null },
        { f: 587.33, b: null },
        { f: 523.25, b: null },
        { f: 440.00, b: null },
        { f: 392.00, b: null }
      ];

      this.bgmStep = 0;
      this.bgmInterval = setInterval(() => {
        if (!this.bgmEnabled || !this.isGameActive) {
          this.stopBGM();
          return;
        }

        const note = melody[this.bgmStep % melody.length];
        this.playBgmNote(note.f, note.b);
        this.bgmStep++;
      }, 240);
    }

    playBgmNote(freq, bassFreq) {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, ctx.currentTime);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.028, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.22);

        if (bassFreq) {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();

          bassOsc.type = 'sine';
          bassOsc.frequency.setValueAtTime(bassFreq, ctx.currentTime);

          bassGain.gain.setValueAtTime(0.04, ctx.currentTime);
          bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

          bassOsc.connect(bassGain);
          bassGain.connect(ctx.destination);

          bassOsc.start();
          bassOsc.stop(ctx.currentTime + 0.45);
        }
      } catch (e) {}
    }

    stopBGM() {
      if (this.bgmInterval) {
        clearInterval(this.bgmInterval);
        this.bgmInterval = null;
      }
    }

    playTone(freq, duration = 0.15, type = 'sine') {
      if (!this.soundEnabled) return;
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
      if (!this.soundEnabled) return;
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
      if (!this.soundEnabled) return;
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
      if (!this.soundEnabled) return;
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

    launchConfetti() {
      const canvas = this.confettiCanvas;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = ['#C9A567', '#FFD56B', '#4CAF50', '#64B5F6', '#BA68C8', '#EF5350'];
      const particles = [];
      const particleCount = 100;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: canvas.width * 0.5,
          y: canvas.height * 0.35,
          vx: (Math.random() - 0.5) * 14,
          vy: Math.random() * -12 - 4,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 10,
          opacity: 1
        });
      }

      const startTime = Date.now();
      const render = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed > 4500) {
          this.stopConfetti();
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35;
          p.rotation += p.rotSpeed;
          if (elapsed > 3000) {
            p.opacity = Math.max(0, 1 - (elapsed - 3000) / 1500);
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
          ctx.restore();
        });

        this.confettiAnimationId = requestAnimationFrame(render);
      };

      this.confettiAnimationId = requestAnimationFrame(render);
    }

    stopConfetti() {
      if (this.confettiAnimationId) {
        cancelAnimationFrame(this.confettiAnimationId);
        this.confettiAnimationId = null;
      }
      if (this.confettiCanvas) {
        const ctx = this.confettiCanvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.WARISARA_LEARNING_HUB = new WarisaraLearningHub();
    window.WARISARA_LEARNING_HUB.init();
  });
})();
