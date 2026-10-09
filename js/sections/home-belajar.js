/**
 * WARISARA — Mini Belajar & Kuis Budaya Demo (30% Cuplikan Fitur)
 * Menampilkan demo interaktif 3 soal terpilih dari Pusat Belajar untuk index.html
 */

(function () {
  "use strict";

  const DEMO_QUESTIONS = [
    {
      id: "demo-q1",
      category: "Wastra & Tekstil",
      province: "DI Yogyakarta",
      level: "Tingkat Dasar",
      question: "Apa makna filosofis ombak berkesinambungan pada motif Batik Parang Rusak?",
      context: "Motif Parang diciptakan oleh Sultan Agung dari Kesultanan Mataram saat bermeditasi di Pantai Parangtritis.",
      options: [
        {
          text: "Keteguhan hati, konsistensi moral, dan semangat pantang menyerah mengarungi samudra kehidupan",
          correct: true,
          explanation: "Garis diagonal berombak Parang melambangkan kesinambungan perjuangan manusia melawan hawa nafsu serta keteguhan batin seorang kesatria."
        },
        {
          text: "Peringatan badai laut selatan bagi para nelayan tradisional pantai selatan",
          correct: false,
          explanation: "Batik Parang bukan peringatan meteorologi fisik, melainkan metafora keteguhan jiwa spiritual dan etika kepemimpinan keraton."
        },
        {
          text: "Simbol kemewahan dan hasil panen perikanan pesisir laut Jawa",
          correct: false,
          explanation: "Parang tergolong batik larangan (gehong) keraton Mataram yang melambangkan kemuliaan budi pekerti, bukan hasil tangkapan laut."
        },
        {
          text: "Petunjuk navigasi arah mata angin para pelaut kuno Mataram",
          correct: false,
          explanation: "Batik Parang diciptakan sebagai cermin olah batin kesatria, bukan kompas atau peta navigasi bahari."
        }
      ]
    },
    {
      id: "demo-q2",
      category: "Wastra & Tenun",
      province: "Nusa Tenggara Timur",
      level: "Tingkat Menengah",
      question: "Bahan alami apa yang secara tradisional digunakan oleh penenun Sumba untuk menghasilkan warna merah pekat sakral pada Tenun Ikat?",
      context: "Pewarnaan tradisional Sumba memerlukan ritual khusus dan waktu fermentasi getah berbulan-bulan.",
      options: [
        {
          text: "Akar Pohon Mengkudu (Kombu) yang ditumbuk bersama daun loba",
          correct: true,
          explanation: "Akar Mengkudu (Kombu) dipadukan dengan daun loba sebagai fiksasi mordan alami, menghasilkan semburat merah marun magis khas tenun ikat Sumba."
        },
        {
          text: "Kunyit gunung yang difermentasikan dengan air kelapa",
          correct: false,
          explanation: "Kunyit menghasilkan warna kuning cerah, bukan warna merah pekat sakral pada kain tenun kombu."
        },
        {
          text: "Kulit kayu mahoni yang direbus dengan kapur sirih",
          correct: false,
          explanation: "Mahoni lazim menghasilkan spektrum cokelat kemerahan modern, sedangkan tradisi purba Sumba berakar pada akar mengkudu (kombu)."
        },
        {
          text: "Bunga telang ungu yang direndam dalam air asam jawa",
          correct: false,
          explanation: "Bunga telang menghasilkan gradasi biru, bukan warna merah darah sakral."
        }
      ]
    },
    {
      id: "demo-q3",
      category: "Kriya Kayu & Maritim",
      province: "Sulawesi Selatan",
      level: "Tingkat Mahir",
      question: "Mengapa para Panrita Lopi tidak pernah menggunakan paku besi dalam merakit lambung perahu Pinisi?",
      context: "Tradisi pembuatan kapal Pinisi di Bulukumba telah ditetapkan sebagai Warisan Budaya Takbenda Dunia UNESCO pada 2017.",
      options: [
        {
          text: "Menggunakan pasak kayu ulin yang mengembang kedap air saat terkena air laut, membuat kapal elastis menari di ombak",
          correct: true,
          explanation: "Pasak ulin (*tappi*) menyatu harmonis dengan kayu lambung; saat basah, pasak mengembang dan mengunci rapat tanpa karat besi yang merusak kayu."
        },
        {
          text: "Paku besi dianggap tabu karena dilarang dalam hukum maritim kuno",
          correct: false,
          explanation: "Bukan karena larangan mistis belaka, melainkan prinsip keteknikan luhur: besi mudah berkarat di laut asin dan memecah serat kayu jati/ulin."
        },
        {
          text: "Agar bobot kapal tetap ringan saat meluncur di perairan dangkal",
          correct: false,
          explanation: "Bobot pasak ulin sangat padat dan berat, rahasianya terletak pada elastisitas sambungan susun sirih, bukan sekadar pengurangan berat."
        },
        {
          text: "Karena bahan perekat getah damar sudah cukup kuat tanpa pengikat fisik",
          correct: false,
          explanation: "Getah kulit kayu baruk digunakan sebagai pendempul (*kelom*), namun pasak ulin tetap menjadi tulang pengikat utama."
        }
      ]
    }
  ];

  const MiniQuiz = {
    currentIndex: 0,
    score: 0,
    streak: 0,
    answered: false,
    audioCtx: null,

    init: function () {
      this.cacheDom();
      if (!this.container) return;
      this.bindEvents();
      this.renderQuestion();
    },

    cacheDom: function () {
      this.container = document.getElementById("mini-quiz-card");
      this.indicator = document.getElementById("mini-quiz-indicator");
      this.scoreDisplay = document.getElementById("mini-quiz-score");
      this.streakDisplay = document.getElementById("mini-quiz-streak");
      this.progressBar = document.getElementById("mini-quiz-progress");
      this.mascotSpeech = document.getElementById("mini-quiz-mascot-speech");
      this.mascotImg = document.getElementById("mini-quiz-mascot-img");
      this.categoryBadge = document.getElementById("mini-quiz-category");
      this.provinceBadge = document.getElementById("mini-quiz-province");
      this.questionText = document.getElementById("mini-quiz-question-text");
      this.contextText = document.getElementById("mini-quiz-context-text");
      this.optionsContainer = document.getElementById("mini-quiz-options");
      this.feedbackBox = document.getElementById("mini-quiz-feedback");
      this.feedbackText = document.getElementById("mini-quiz-feedback-text");
      this.nextBtn = document.getElementById("mini-quiz-next-btn");
      this.restartBtn = document.getElementById("mini-quiz-restart-btn");
      this.resultStage = document.getElementById("mini-quiz-result-stage");
      this.activeStage = document.getElementById("mini-quiz-active-stage");
      this.finalScore = document.getElementById("mini-quiz-final-score");
    },

    bindEvents: function () {
      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", () => this.handleNext());
      }
      if (this.restartBtn) {
        this.restartBtn.addEventListener("click", () => this.restart());
      }
    },

    playChime: function (isCorrect) {
      try {
        if (!this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this.audioCtx = new AudioContext();
        }
        if (!this.audioCtx) return;
        if (this.audioCtx.state === "suspended") this.audioCtx.resume();

        const now = this.audioCtx.currentTime;
        if (isCorrect) {
          // Melodi gamelan slendro ceria
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0, now + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.36);
          });
        } else {
          // Nada lembut penjelasan
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(261.63, now);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.3);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.31);
        }
      } catch (e) {
        // silent fallback
      }
    },

    renderQuestion: function () {
      const q = DEMO_QUESTIONS[this.currentIndex];
      if (!q) return;

      this.answered = false;
      if (this.activeStage) this.activeStage.classList.remove("hidden");
      if (this.resultStage) this.resultStage.classList.add("hidden");
      if (this.feedbackBox) this.feedbackBox.classList.add("hidden");
      if (this.nextBtn) this.nextBtn.classList.add("hidden");

      // Updates
      if (this.indicator) this.indicator.textContent = `Tantangan 0${this.currentIndex + 1} dari 0${DEMO_QUESTIONS.length}`;
      if (this.progressBar) {
        const percent = ((this.currentIndex + 1) / DEMO_QUESTIONS.length) * 100;
        this.progressBar.style.width = `${percent}%`;
      }
      if (this.scoreDisplay) this.scoreDisplay.textContent = `${this.score} / 300 Pts`;
      if (this.streakDisplay) {
        this.streakDisplay.textContent = `Streak: ${this.streak}x 🔥`;
      }
      if (this.categoryBadge) this.categoryBadge.textContent = q.category;
      if (this.provinceBadge) this.provinceBadge.textContent = q.province;
      if (this.questionText) this.questionText.textContent = q.question;
      if (this.contextText) this.contextText.textContent = q.context;

      if (this.mascotSpeech) {
        this.mascotSpeech.textContent = `"Ayo pilih jawaban yang paling tepat untuk soal ke-${this.currentIndex + 1}! Wari yakin kamu bisa!"`;
      }
      if (this.mascotImg) {
        this.mascotImg.src = "assets/mascot/wari-idle-clean.png";
      }

      // Render options
      if (this.optionsContainer) {
        this.optionsContainer.innerHTML = "";
        const labels = ["A", "B", "C", "D"];

        q.options.forEach((opt, idx) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "mini-quiz-opt p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-brass-400/40 text-left transition-all duration-200 flex items-start gap-3.5 group cursor-pointer text-xs sm:text-sm text-surface/90";
          btn.dataset.idx = idx;

          btn.innerHTML = `
            <span class="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-bold text-xs text-brass-300 group-hover:bg-brass-500/20 group-hover:border-brass-400/60 flex-shrink-0 transition-colors">
              ${labels[idx]}
            </span>
            <span class="flex-1 leading-snug">${opt.text}</span>
            <span class="mini-opt-status-icon material-symbols-outlined text-base opacity-0 transition-opacity flex-shrink-0">check_circle</span>
          `;

          btn.addEventListener("click", () => this.handleAnswer(idx, q));
          this.optionsContainer.appendChild(btn);
        });
      }
    },

    handleAnswer: function (chosenIdx, q) {
      if (this.answered) return;
      this.answered = true;

      const chosenOpt = q.options[chosenIdx];
      const isCorrect = chosenOpt.correct;
      const allBtns = this.optionsContainer.querySelectorAll(".mini-quiz-opt");

      if (isCorrect) {
        this.score += 100;
        this.streak += 1;
        this.playChime(true);

        if (this.mascotSpeech) {
          this.mascotSpeech.textContent = `"Luar biasa tepat! Kamu paham betul filosofi ${q.province}! (+100 Pts)"`;
        }
        if (this.mascotImg) {
          this.mascotImg.src = "assets/mascot/wari-happy-clean.png";
        }
      } else {
        this.streak = 0;
        this.playChime(false);

        if (this.mascotSpeech) {
          this.mascotSpeech.textContent = `"Hampir tepat! Simak petuah dan penjelasan budayanya di bawah ini ya!"`;
        }
        if (this.mascotImg) {
          this.mascotImg.src = "assets/mascot/wari-idle-clean.png";
        }
      }

      if (this.scoreDisplay) this.scoreDisplay.textContent = `${this.score} / 300 Pts`;
      if (this.streakDisplay) this.streakDisplay.textContent = `Streak: ${this.streak}x 🔥`;

      allBtns.forEach((btn, idx) => {
        btn.disabled = true;
        btn.classList.remove("hover:bg-white/[0.09]", "cursor-pointer");
        const opt = q.options[idx];
        const icon = btn.querySelector(".mini-opt-status-icon");

        if (opt.correct) {
          btn.classList.add("bg-emerald-950/40", "border-emerald-500/70", "text-emerald-200");
          if (icon) {
            icon.textContent = "check_circle";
            icon.classList.add("text-emerald-400", "opacity-100");
          }
        } else if (idx === chosenIdx && !isCorrect) {
          btn.classList.add("bg-red-950/30", "border-red-500/60", "text-red-300");
          if (icon) {
            icon.textContent = "cancel";
            icon.classList.add("text-red-400", "opacity-100");
          }
        } else {
          btn.classList.add("opacity-40");
        }
      });

      // Show explanation
      if (this.feedbackBox && this.feedbackText) {
        this.feedbackText.textContent = chosenOpt.explanation || (isCorrect ? "Jawaban Anda sangat tepat dan akurat." : "Simak jawaban benar yang ditandai hijau di atas.");
        this.feedbackBox.classList.remove("hidden");
      }

      if (this.nextBtn) {
        this.nextBtn.classList.remove("hidden");
        if (this.currentIndex === DEMO_QUESTIONS.length - 1) {
          this.nextBtn.querySelector("span:first-child").textContent = "Lihat Rangkuman Hasil";
        } else {
          this.nextBtn.querySelector("span:first-child").textContent = "Tantangan Berikutnya";
        }
      }
    },

    handleNext: function () {
      if (this.currentIndex < DEMO_QUESTIONS.length - 1) {
        this.currentIndex++;
        this.renderQuestion();
      } else {
        this.showFinalResult();
      }
    },

    showFinalResult: function () {
      if (this.activeStage) this.activeStage.classList.add("hidden");
      if (this.resultStage) this.resultStage.classList.remove("hidden");
      if (this.finalScore) this.finalScore.textContent = `${this.score} / 300 Pts`;

      if (this.mascotSpeech) {
        this.mascotSpeech.textContent = `"Hebat! Kamu telah menuntaskan 30% cuplikan mini kuis ini dengan skor ${this.score} Pts. Siap menguji 10 soal lengkap di Halaman Belajar?"`;
      }
      if (this.mascotImg) {
        this.mascotImg.src = "assets/mascot/wari-happy-clean.png";
      }
    },

    restart: function () {
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.renderQuestion();
    }
  };

  window.WARISARA_MINI_QUIZ = MiniQuiz;

  document.addEventListener("DOMContentLoaded", function () {
    MiniQuiz.init();
  });
})();
