(function () {
  'use strict';

  class WarisaraStoryBookApp {
    constructor() {
      this.stories = window.STORIES_DATA || [];
      this.activeStory = null;
      this.currentPageIdx = 0; 
      this.filterTheme = 'all';
      this.searchQuery = '';
      this.fontSize = 15; 
      this.savedBookmarks = JSON.parse(localStorage.getItem('warisara_story_bookmarks') || '[]');
    }

    init() {
      this.cacheDom();
      this.bindEvents();
      this.renderBookshelf();
      this.renderBookmarksCount();
    }

    cacheDom() {
      this.bookshelfGrid = document.getElementById('stories-bookshelf-grid');
      this.searchField = document.getElementById('story-search-input');
      this.themeFilterBtns = document.querySelectorAll('.story-filter-btn');
      this.bookModal = document.getElementById('interactive-book-modal');
      this.openingStage = document.getElementById('book-opening-stage');
      this.bookCasing = document.querySelector('.open-physical-book-casing');
      this.sideDock = document.querySelector('.book-side-dock');
      this.bookContainer = document.getElementById('heritage-tome-container');
      this.btnModalClose = document.getElementById('btn-close-book-modal');
      this.btnPrevPage = document.getElementById('btn-tome-prev');
      this.btnNextPage = document.getElementById('btn-tome-next');
      this.pageIndicator = document.getElementById('tome-page-indicator');
      this.btnNarrate = document.getElementById('btn-tome-narrate');
      this.btnAmbience = document.getElementById('btn-tome-ambience');
      this.btnBookmark = document.getElementById('btn-tome-bookmark');
      this.btnFontPlus = document.getElementById('btn-font-plus');
      this.btnFontMinus = document.getElementById('btn-font-minus');
      this.btnFullscreen = document.getElementById('btn-toggle-fullscreen');
    }

    bindEvents() {
      
      if (this.searchField) {
        this.searchField.addEventListener('input', (e) => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          this.renderBookshelf();
        });
      }

      if (this.themeFilterBtns) {
        this.themeFilterBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            this.themeFilterBtns.forEach((b) => b.classList.remove('active', 'bg-brass-400', 'text-ink'));
            btn.classList.add('active', 'bg-brass-400', 'text-ink');
            this.filterTheme = btn.dataset.theme || 'all';
            this.renderBookshelf();
            if (window.WARISARA_STORY_AUDIO) window.WARISARA_STORY_AUDIO.playChime();
          });
        });
      }

      if (this.btnModalClose) {
        this.btnModalClose.addEventListener('click', () => this.closeBookModal());
      }

      if (this.btnPrevPage) {
        this.btnPrevPage.addEventListener('click', () => this.turnPage(-1));
      }
      if (this.btnNextPage) {
        this.btnNextPage.addEventListener('click', () => this.turnPage(1));
      }

      if (this.btnNarrate) {
        this.btnNarrate.addEventListener('click', () => this.toggleNarrator());
      }
      if (this.btnAmbience) {
        this.btnAmbience.addEventListener('click', () => this.toggleAmbienceSound());
      }
      if (this.btnBookmark) {
        this.btnBookmark.addEventListener('click', () => this.toggleBookmarkCurrent());
      }

      if (this.btnFontPlus) {
        this.btnFontPlus.addEventListener('click', () => {
          this.fontSize = Math.min(22, this.fontSize + 1.5);
          this.updateStoryFontSize();
        });
      }
      if (this.btnFontMinus) {
        this.btnFontMinus.addEventListener('click', () => {
          this.fontSize = Math.max(13, this.fontSize - 1.5);
          this.updateStoryFontSize();
        });
      }

      if (this.btnFullscreen) {
        this.btnFullscreen.addEventListener('click', () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        });
      }

      if (this.bookModal) {
        this.bookModal.addEventListener('click', (e) => {
          if (e.target === this.bookModal) {
            this.closeBookModal();
          }
        });

        this.bookModal.addEventListener(
          'wheel',
          (e) => {
            if (this.bookModal.classList.contains('active')) {
              e.preventDefault();
            }
          },
          { passive: false }
        );

        this.bookModal.addEventListener(
          'touchmove',
          (e) => {
            if (this.bookModal.classList.contains('active') && window.innerWidth > 860) {
              e.preventDefault();
            }
          },
          { passive: false }
        );
      }

      document.addEventListener('keydown', (e) => {
        if (!this.bookModal || !this.bookModal.classList.contains('active')) return;
        if (e.key === 'ArrowRight' || e.key === ' ') {
          this.turnPage(1);
          e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
          this.turnPage(-1);
          e.preventDefault();
        } else if (e.key === 'Escape') {
          this.closeBookModal();
        }
      });
    }

    renderBookshelf() {
      if (!this.bookshelfGrid) return;

      const filtered = this.stories.filter((s) => {
        const matchesTheme = this.filterTheme === 'all' || s.theme === this.filterTheme;
        const matchesSearch =
          !this.searchQuery ||
          s.title.toLowerCase().includes(this.searchQuery) ||
          s.origin.toLowerCase().includes(this.searchQuery) ||
          s.category.toLowerCase().includes(this.searchQuery) ||
          s.summary.toLowerCase().includes(this.searchQuery);
        return matchesTheme && matchesSearch;
      });

      if (filtered.length === 0) {
        this.bookshelfGrid.innerHTML = `
          <div class="col-span-full py-16 text-center text-surface/50 border border-dashed border-white/10 rounded-3xl">
            <span class="material-symbols-outlined text-4xl block mb-2 opacity-50">auto_stories</span>
            <p class="text-sm">Tidak ada kisah pusaka yang cocok dengan pencarian Anda.</p>
          </div>
        `;
        return;
      }

      this.bookshelfGrid.innerHTML = filtered
        .map((s, index) => {
          const isSaved = this.savedBookmarks.includes(s.id);
          return `
          <div class="book-3d-wrapper group" data-story-id="${s.id}" data-aos="fade-up" data-aos-delay="${index * 60}">
            <div class="book-3d-card flex flex-col justify-between overflow-hidden relative border border-white/15"
                 style="background: linear-gradient(135deg, ${s.coverColor || '#1E1A16'} 0%, #0E0C0A 100%);">

              <div class="book-spine-strip"></div>

              <div class="book-card-thickness"></div>

              <div class="p-3.5 pl-7 relative z-10 flex items-start justify-between">
                <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/30">
                  ${s.category}
                </span>
                <span class="text-[10px] text-surface/60 font-mono flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-brass-400">menu_book</span>
                  <span>${s.pages.length + 2} Hlm</span>
                </span>
              </div>

              <div class="mx-4 my-1 aspect-[4/3] rounded-xl overflow-hidden antique-frame relative z-10 shadow-lg group-hover:scale-[1.015] transition-transform">
                <div class="antique-frame-inner w-full h-full">
                  <img src="${s.coverImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              </div>

              <div class="p-3.5 pl-7 relative z-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                <h3 class="font-display text-base sm:text-[17px] font-normal text-surface group-hover:text-brass-300 transition-colors leading-snug line-clamp-2 min-h-[2.85rem] mb-1">
                  ${s.title}
                </h3>
                <p class="text-[11px] text-surface/60 font-light truncate mb-2.5 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[12px] text-brass-400/70">location_on</span>
                  <span>${s.origin}</span>
                </p>
                <div class="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-brass-400 font-semibold">
                  <span class="flex items-center gap-1 group-hover:text-brass-300">
                    <span>Buka Lembaran</span>
                    <span class="material-symbols-outlined text-xs group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </span>
                  ${isSaved ? '<span class="material-symbols-outlined text-sm text-brass-300" title="Disimpan">bookmark</span>' : ''}
                </div>
              </div>

              <div class="book-ribbon"></div>
            </div>

            <div class="book-shelf-shadow"></div>
          </div>
        `;
        })
        .join('');

      this.bookshelfGrid.querySelectorAll('[data-story-id]').forEach((card) => {
        card.addEventListener('click', () => {
          const id = card.dataset.storyId;
          this.openBook(id, card);
        });
      });
    }

    openBook(storyId, cardElement = null) {
      const story = this.stories.find((s) => s.id === storyId);
      if (!story) return;

      if (window.WARISARA_STORY_AUDIO) {
        window.WARISARA_STORY_AUDIO.stopSpeaking();
        window.WARISARA_STORY_AUDIO.stopAmbience();
      }

      this.activeCardElement = cardElement || document.querySelector(`[data-story-id="${storyId}"]`);
      this.savedScrollY = window.pageYOffset || document.documentElement.scrollTop;

      if (this.btnNarrate) {
        this.btnNarrate.classList.remove('bg-brass-400', 'text-ink');
        this.btnNarrate.classList.add('bg-white/10', 'text-surface');
        this.btnNarrate.innerHTML = `
          <span class="material-symbols-outlined text-base">volume_up</span>
          <span class="dock-btn-label">Narator Suara</span>
        `;
      }
      if (this.btnAmbience) {
        this.btnAmbience.classList.remove('bg-brass-400', 'text-ink');
        this.btnAmbience.classList.add('bg-white/10', 'text-surface');
        this.btnAmbience.innerHTML = `
          <span class="material-symbols-outlined text-base">music_note</span>
          <span class="dock-btn-label">Gamelan Sunyi</span>
        `;
      }

      this.activeStory = story;
      this.currentPageIdx = 0;

      this.renderBookSpread();
      this.updateBookmarkButtonState();

      this.playOpeningAnimation(story);
    }

    getFrontCoverHTML(story) {
      return `
        <div class="flex flex-col justify-between h-full p-4 sm:p-5 relative z-10"
             style="background: linear-gradient(135deg, ${story.coverColor || '#1E1A16'} 0%, #0E0C0A 100%);">
          <div class="book-spine-strip"></div>
          <div class="opening-edge-thickness-right"></div>

          <div class="pl-5 relative z-10 flex items-start justify-between">
            <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/30">
              ${story.category}
            </span>
            <span class="text-[10px] text-surface/60 font-mono flex items-center gap-1">
              <span class="material-symbols-outlined text-xs text-brass-400">menu_book</span>
              <span>${story.pages.length + 2} Hlm</span>
            </span>
          </div>

          <div class="mx-3 sm:mx-5 my-1 aspect-[4/3] rounded-xl overflow-hidden antique-frame relative z-10 shadow-lg">
            <div class="antique-frame-inner w-full h-full">
              <img src="${story.coverImage}" alt="${story.title}" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="pl-5 relative z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-2">
            <h3 class="font-display text-base sm:text-lg font-normal text-surface leading-snug line-clamp-2 min-h-[2.85rem] mb-1">
              ${story.title}
            </h3>
            <p class="text-[11px] text-surface/60 font-light truncate mb-2.5 flex items-center gap-1">
              <span class="material-symbols-outlined text-[12px] text-brass-400/70">location_on</span>
              <span>${story.origin}</span>
            </p>
            <div class="pt-2 border-t border-white/10 text-[11px] text-brass-400/90 font-serif italic">
              Seri Pusaka Tutur Nusantara
            </div>
          </div>

          <div class="book-ribbon"></div>
        </div>
      `;
    }

    renderOpeningStageMarkup(story, pageIdx = 0, isOpen = false) {
      const leftPageHtml = this.getPageLeftHTML(pageIdx);
      const rightPageHtml = this.getPageRightHTML(pageIdx);
      const frontCoverHtml = this.getFrontCoverHTML(story);

      return `
        <div class="opening-flight-wrapper">
          <div class="opening-stage-casing ${isOpen ? 'is-open' : 'is-closed'}">
            <div class="opening-ground-shadow"></div>

            <div class="opening-book-spread">
              <div class="opening-right-board">
                <div class="opening-right-sheet">
                  ${rightPageHtml}
                  <div class="opening-right-cast-shadow"></div>
                </div>
                <div class="opening-paper-block-thickness"></div>
              </div>

              <div class="opening-left-board">
                <div class="opening-board-face-inside">
                  <div class="opening-left-sheet">
                    ${leftPageHtml}
                  </div>
                  <div class="opening-inside-fold-shadow"></div>
                </div>

                <div class="opening-board-face-outside">
                  ${frontCoverHtml}
                </div>

                <div class="opening-cover-edge-left"></div>
                <div class="opening-cover-edge-top"></div>
                <div class="opening-cover-edge-bottom"></div>
              </div>

              <div class="opening-spine-bar"></div>
              <div class="book-spine-headband-top"></div>
              <div class="book-spine-headband-bottom"></div>
              <div class="book-satin-ribbon"></div>
            </div>
          </div>
        </div>
      `;
    }

    playOpeningAnimation(story) {
      if (!this.openingStage || !this.bookModal) {
        if (this.bookModal) {
          this.bookModal.classList.add('active');
          document.body.classList.add('book-modal-open');
        }
        return;
      }

      if (this.bookCasing) this.bookCasing.classList.add('is-hidden');
      if (this.sideDock) this.sideDock.classList.add('is-hidden');
      if (this.btnModalClose) this.btnModalClose.classList.add('is-hidden');

      this.openingStage.innerHTML = this.renderOpeningStageMarkup(story, 0, false);
      this.openingStage.classList.add('active');
      this.bookModal.classList.remove('modal-closing-backdrop');
      this.bookModal.classList.add('active');
      document.body.classList.add('book-modal-open');

      const flightWrapper = this.openingStage.querySelector('.opening-flight-wrapper');
      const casingEl = this.openingStage.querySelector('.opening-stage-casing');

      if (this.activeCardElement && flightWrapper && casingEl) {
        const cardBox = this.activeCardElement.querySelector('.book-3d-card') || this.activeCardElement;
        const startRect = cardBox.getBoundingClientRect();
        const stageRect = this.openingStage.getBoundingClientRect();

        const stageCenterX = stageRect.left + stageRect.width / 2;
        const stageCenterY = stageRect.top + stageRect.height / 2;

        const cardCenterX = startRect.left + startRect.width / 2;
        const cardCenterY = startRect.top + startRect.height / 2;

        const closedBookSpreadWidth = Math.min(1050, stageRect.width || 1050);
        const closedBookWidth = closedBookSpreadWidth * 0.5;

        const deltaX = cardCenterX - stageCenterX;
        const deltaY = cardCenterY - stageCenterY;
        const scale = Math.max(0.2, Math.min(1, startRect.width / closedBookWidth));

        this.activeCardElement.classList.add('book-launching');

        flightWrapper.style.transition = 'none';
        flightWrapper.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0px) scale(${scale}) rotateY(-8deg) rotateX(1.5deg)`;
        casingEl.classList.add('is-closed');
        casingEl.classList.remove('is-open');

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            flightWrapper.style.transition = 'transform 1.0s cubic-bezier(0.12, 0.95, 0.22, 1)';
            flightWrapper.style.transform = 'translate3d(0px, 0px, 0px) scale(1) rotateY(0deg) rotateX(0deg)';

            setTimeout(() => {
              if (window.WARISARA_STORY_AUDIO) {
                window.WARISARA_STORY_AUDIO.playBookOpen();
              }
              if (casingEl) {
                casingEl.classList.remove('is-closed');
                casingEl.classList.add('is-open');
              }
            }, 480);

            setTimeout(() => {
              if (this.bookCasing) {
                this.bookCasing.classList.remove('is-hidden');
                this.bookCasing.classList.add('book-settle');
                setTimeout(() => this.bookCasing.classList.remove('book-settle'), 850);
              }
              if (this.openingStage) {
                this.openingStage.classList.remove('active');
                this.openingStage.innerHTML = '';
              }
              if (this.sideDock) this.sideDock.classList.remove('is-hidden');
              if (this.btnModalClose) this.btnModalClose.classList.remove('is-hidden');
            }, 1800);
          });
        });
      } else {
        setTimeout(() => {
          if (window.WARISARA_STORY_AUDIO) {
            window.WARISARA_STORY_AUDIO.playBookOpen();
          }
          if (casingEl) {
            casingEl.classList.remove('is-closed');
            casingEl.classList.add('is-open');
          }
        }, 120);

        setTimeout(() => {
          if (this.bookCasing) {
            this.bookCasing.classList.remove('is-hidden');
            this.bookCasing.classList.add('book-settle');
            setTimeout(() => this.bookCasing.classList.remove('book-settle'), 850);
          }
          if (this.openingStage) {
            this.openingStage.classList.remove('active');
            this.openingStage.innerHTML = '';
          }
          if (this.sideDock) this.sideDock.classList.remove('is-hidden');
          if (this.btnModalClose) this.btnModalClose.classList.remove('is-hidden');
        }, 1500);
      }
    }

    closeBookModal() {
      if (this._isClosing) return;
      this._isClosing = true;

      if (window.WARISARA_STORY_AUDIO) {
        window.WARISARA_STORY_AUDIO.stopSpeaking();
        window.WARISARA_STORY_AUDIO.stopAmbience();
      }

      if (this.btnNarrate) {
        this.btnNarrate.classList.remove('bg-brass-400', 'text-ink');
        this.btnNarrate.classList.add('bg-white/10', 'text-surface');
        this.btnNarrate.innerHTML = `
          <span class="material-symbols-outlined text-base">volume_up</span>
          <span class="dock-btn-label">Narator Suara</span>
        `;
      }
      if (this.btnAmbience) {
        this.btnAmbience.classList.remove('bg-brass-400', 'text-ink');
        this.btnAmbience.classList.add('bg-white/10', 'text-surface');
        this.btnAmbience.innerHTML = `
          <span class="material-symbols-outlined text-base">music_note</span>
          <span class="dock-btn-label">Gamelan Sunyi</span>
        `;
      }

      if (this.sideDock) this.sideDock.classList.add('is-hidden');
      if (this.btnModalClose) this.btnModalClose.classList.add('is-hidden');

      if (this.openingStage && this.activeStory) {
        const pageToClose = this.currentPageIdx;
        // 1. Render stage ALREADY in open state (isOpen = true) so it matches current open tome 1:1
        this.openingStage.innerHTML = this.renderOpeningStageMarkup(this.activeStory, pageToClose, true);
        const flightWrapper = this.openingStage.querySelector('.opening-flight-wrapper');
        const casingEl = this.openingStage.querySelector('.opening-stage-casing');

        if (flightWrapper) {
          flightWrapper.style.transition = 'none';
          flightWrapper.style.transform = 'translate3d(0px, 0px, 0px) scale(1) rotateY(0deg) rotateX(0deg)';
        }

        // 2. Seamless swap: show openingStage and immediately hide bookCasing with zero ghost fade
        this.openingStage.classList.add('active');
        if (this.bookCasing) this.bookCasing.classList.add('is-hidden-immediate');

        // 3. Smooth natural breathing pause before majestic cover fold
        setTimeout(() => {
          if (window.WARISARA_STORY_AUDIO) {
            window.WARISARA_STORY_AUDIO.playBookClose();
          }
          if (casingEl) {
            casingEl.classList.remove('is-open');
            casingEl.classList.add('is-closed');
          }
        }, 100);

        // 4. Solid cover settle/impact when the cover fully reaches closed state
        setTimeout(() => {
          if (casingEl) {
            casingEl.classList.add('is-impact');
          }
        }, 1220);

        // 5. Smooth flight back to the shelf slot (only once the book is solidly closed)
        setTimeout(() => {
          if (this.activeCardElement && flightWrapper) {
            const cardBox = this.activeCardElement.querySelector('.book-3d-card') || this.activeCardElement;
            const returnRect = cardBox.getBoundingClientRect();
            const stageRect = this.openingStage.getBoundingClientRect();

            const stageCenterX = stageRect.left + stageRect.width / 2;
            const stageCenterY = stageRect.top + stageRect.height / 2;

            const cardCenterX = returnRect.left + returnRect.width / 2;
            const cardCenterY = returnRect.top + returnRect.height / 2;

            const closedBookSpreadWidth = Math.min(1080, stageRect.width || 1080);
            const closedBookWidth = closedBookSpreadWidth * 0.5;

            const returnDx = cardCenterX - stageCenterX;
            const returnDy = cardCenterY - stageCenterY;
            const returnScale = Math.max(0.2, Math.min(1, returnRect.width / closedBookWidth));

            flightWrapper.style.transition = 'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1)';
            flightWrapper.style.transform = `translate3d(${returnDx}px, ${returnDy}px, 0px) scale(${returnScale}) rotateY(-8deg) rotateX(1.5deg)`;
            this.bookModal.classList.add('modal-closing-backdrop');
          }
        }, 1350);

        // 6. Touchdown on shelf: SEAMLESS HANDOFF (ZERO DISAPPEAR / REAPPEAR GAP)
        setTimeout(() => {
          // Immediately reveal the real card on shelf at opacity 1 underneath the landing book
          if (this.activeCardElement) {
            this.activeCardElement.classList.add('book-landed');
            this.activeCardElement.classList.remove('book-launching');
            try {
              this.activeCardElement.focus({ preventScroll: true });
            } catch (e) {}
          }

          // Clean up stage and modal on the next animation frame for a 100% gapless handoff
          requestAnimationFrame(() => {
            if (this.bookModal) {
              this.bookModal.classList.remove('active', 'modal-closing-backdrop');
              document.documentElement.classList.remove('book-modal-open');
              document.body.classList.remove('book-modal-open');
              document.body.style.overflow = '';
              document.documentElement.style.overflow = '';
            }

            if (typeof this.savedScrollY === 'number') {
              window.scrollTo({ top: this.savedScrollY, behavior: 'instant' });
            }

            if (this.openingStage) {
              this.openingStage.classList.remove('active');
              this.openingStage.innerHTML = '';
            }
            if (this.bookCasing) {
              this.bookCasing.classList.remove('is-hidden', 'is-hidden-immediate');
            }

            // Remove temporary landed override so normal hover animations work
            if (this.activeCardElement) {
              this.activeCardElement.classList.remove('book-landed');
            }

            this.activeStory = null;
            this.activeCardElement = null;
            this._isFlipping = false;
            this._isClosing = false;
          });
        }, 2350);
      } else {
        if (this.bookModal) {
          this.bookModal.classList.remove('active', 'modal-closing-backdrop');
          document.documentElement.classList.remove('book-modal-open');
          document.body.classList.remove('book-modal-open');
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }
        if (typeof this.savedScrollY === 'number') {
          window.scrollTo({ top: this.savedScrollY, behavior: 'instant' });
        }
        this.activeStory = null;
        this.activeCardElement = null;
        this._isFlipping = false;
        this._isClosing = false;
      }
    }

    getPageLeftHTML(pageIdx) {
      if (!this.activeStory) return '';
      const story = this.activeStory;

      if (pageIdx === 0) {
        return `
          <div class="tome-page-left flex flex-col justify-between">
            <div>
              <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8F6A18]/15 text-[#8F6A18] border border-[#8F6A18]/30 mb-3 font-semibold">
                WADAH KISAH ADILUHUNG
              </span>
              <h4 class="font-display text-2xl font-bold text-[#2A1F17] mb-2 tracking-tight">${story.category}</h4>
              <p class="text-xs text-[#6B5A4B] font-mono mb-4">Wilayah: ${story.origin}</p>
              <div class="p-4 rounded-xl bg-[#2A1F17]/5 border border-[#2A1F17]/15 text-xs text-[#3A2D22] leading-relaxed italic shadow-inner">
                "${story.summary}"
              </div>
            </div>

            <div class="pt-4 border-t border-[#8F6A18]/25 flex items-center justify-between text-xs text-[#6B5A4B]">
              <span class="font-medium">WARISARA Heritage Book Engine</span>
              <span class="text-[#8F6A18] font-bold">Nusantara Edition</span>
            </div>
          </div>
        `;
      }

      if (pageIdx > story.pages.length) {
        return `
          <div class="tome-page-left flex flex-col justify-between">
            <div>
              <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest-600/20 text-forest-700 border border-forest-600/30 mb-3 font-semibold">
                INTISARI KEARIFAN
              </span>
              <h3 class="font-display text-2xl font-bold text-[#2A1F17] mb-4">Petuah Luhur Nenek Moyang</h3>
              
              <div class="p-5 rounded-2xl bg-[#8F6A18]/10 border border-[#8F6A18]/30 mb-5 shadow-sm">
                <span class="text-[10px] uppercase font-bold text-[#8F6A18] block mb-1">Mutiara Nilai Hidup:</span>
                <p class="font-display italic text-base sm:text-lg text-[#2A1F17] font-medium leading-relaxed">
                  "${story.moral}"
                </p>
              </div>

              <div class="p-4 rounded-xl bg-[#2A1F17]/5 border border-[#2A1F17]/15 text-xs text-[#3A2D22] leading-relaxed">
                <strong class="text-[#8F6A18] block mb-1">Dengarkan Tutur Suara:</strong>
                <p class="italic text-[#5C4A3A]">"${story.audioQuote}"</p>
              </div>
            </div>

            <div class="pt-4 border-t border-[#8F6A18]/25 flex items-center justify-between text-xs text-[#6B5A4B]">
              <span>Halaman Penutup</span>
              <span class="text-[#8F6A18] font-mono font-bold">#WARISARA-STORY</span>
            </div>

            <div class="page-corner-curl-btn-prev" id="btn-corner-turn-prev" title="Klik untuk kembali ke halaman sebelumnya"></div>
          </div>
        `;
      }

      const pageData = story.pages[pageIdx - 1];
      if (!pageData) return '';

      return `
        <div class="tome-page-left flex flex-col justify-between">
          <div>
            <div class="page-running-header">
              <span>${story.title}</span>
              <span>${story.category}</span>
            </div>

            <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden antique-frame my-2 shadow-xl">
              <div class="antique-frame-inner w-full h-full">
                <img src="${pageData.image || story.coverImage}" alt="${pageData.sectionTitle}" class="w-full h-full object-cover" />
              </div>
            </div>

            <p class="text-xs text-[#5C4A3A] italic leading-relaxed text-center px-2 mt-2 font-light">
              ${pageData.imageCaption || ''}
            </p>
          </div>

          <div class="page-classic-folio">
            — ${pageData.pageNumber * 2 - 1} —
          </div>

          <div class="page-corner-curl-btn-prev" id="btn-corner-turn-prev" title="Klik untuk kembali ke halaman sebelumnya"></div>
        </div>
      `;
    }

    getPageRightHTML(pageIdx) {
      if (!this.activeStory) return '';
      const story = this.activeStory;

      if (pageIdx === 0) {
        return `
          <div class="tome-page-right flex flex-col justify-between">
            <div class="text-center pt-2">
              <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-[#8F6A18]/15 text-[#8F6A18] border border-[#8F6A18]/30 mb-2 font-semibold">
                SERI TUTUR LISAN NUSANTARA
              </span>
              <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2A1F17] mb-1.5 leading-tight tracking-tight">
                ${story.title}
              </h2>
              <p class="text-xs text-[#6B5A4B] font-light italic mb-3">${story.subtitle || ''}</p>
            </div>

            <div class="w-full max-w-[380px] mx-auto aspect-[4/3] rounded-2xl overflow-hidden antique-frame my-1 shadow-xl">
              <div class="antique-frame-inner w-full h-full">
                <img src="${story.coverImage}" alt="${story.title}" class="w-full h-full object-cover" />
              </div>
            </div>

            <div class="pt-3 border-t border-[#8F6A18]/25 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#C59828] animate-pulse"></span>
                <span class="text-xs text-[#5C4530] font-medium">Siap Dituturkan</span>
              </div>
              <button id="btn-open-from-cover" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B38728] via-[#D4AF37] to-[#B38728] hover:brightness-110 text-[#1A1208] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
                <span>Buka Lembaran</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        `;
      }

      if (pageIdx > story.pages.length) {
        return `
          <div class="tome-page-right flex flex-col justify-between">
            <div class="text-center pt-6">
              <div class="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-[#8F6A18]/40 flex items-center justify-center bg-[#8F6A18]/10 shadow-md">
                <span class="font-display text-2xl font-bold text-[#8F6A18]">W</span>
              </div>
              <h3 class="font-display text-2xl font-bold text-[#2A1F17] mb-2">Estafet Telah Sampai di Tangan Anda</h3>
              <p class="text-xs text-[#5C4530] max-w-sm mx-auto leading-relaxed">
                Kisah ${story.title} kini menjadi bagian dari ingatan batin Anda. Bagikan dan lestarikan warisan peradaban bangsa.
              </p>
            </div>

            <div class="space-y-2.5 max-w-xs mx-auto w-full">
              <a href="pass-it-on.html" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#B38728] via-[#D4AF37] to-[#B38728] hover:brightness-110 text-[#1A1208] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all">
                <span class="material-symbols-outlined text-sm">favorite</span>
                <span>Tuliskan Pesan di Pass It On</span>
              </a>
              <button id="btn-restart-book" class="w-full py-2.5 px-4 rounded-xl bg-[#2A1F17]/10 hover:bg-[#2A1F17]/15 text-[#2A1F17] text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                <span class="material-symbols-outlined text-sm">restart_alt</span>
                <span>Baca Ulang dari Awal</span>
              </button>
            </div>

            <div class="text-center pt-3 border-t border-[#8F6A18]/25 text-[11px] text-[#6B5A4B]">
              © 2026 WARISARA — Menjaga Tutur Lisan Nusantara
            </div>
          </div>
        `;
      }

      const pageData = story.pages[pageIdx - 1];
      if (!pageData) return '';

      const rawText = pageData.content;
      const firstLetterMatch = rawText.match(/^([A-Za-z])/);
      const firstLetter = firstLetterMatch ? firstLetterMatch[1] : '';
      const textRemaining = firstLetter ? rawText.substring(1) : rawText;

      return `
        <div class="tome-page-right flex flex-col justify-between">
          <div>
            <div class="page-running-header">
              <span>Babak ${pageData.pageNumber} dari ${story.pages.length}</span>
              <span>Pusaka Lisan</span>
            </div>

            <div id="story-narrative-text-box" style="font-size: ${this.fontSize}px; line-height: 1.75;">
              <h3 class="font-display text-xl sm:text-2xl font-bold text-[#2A1F17] mb-3 pb-2 border-b border-[#D6C4AD] tracking-tight">
                ${pageData.sectionTitle}
              </h3>

              <div class="text-[#2C241E] font-normal text-justify leading-relaxed">
                <span class="drop-cap">${firstLetter}</span>${textRemaining}
              </div>
            </div>
          </div>

          <div>
            <div class="pt-3 pb-2 flex items-center justify-between text-xs text-[#6B5A4B]">
              <button id="btn-read-page-aloud" class="px-3 py-1.5 rounded-lg bg-[#2C2117]/10 hover:bg-[#2C2117]/20 text-[#2C2117] font-semibold text-xs flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm">record_voice_over</span>
                <span>Dengarkan Halaman Ini</span>
              </button>
              <span class="text-[11px] text-[#6B5A4B] font-mono">WARISARA © 2026</span>
            </div>

            <div class="page-classic-folio">
              — ${pageData.pageNumber * 2} —
            </div>
          </div>

          <div class="page-corner-curl-btn" id="btn-corner-turn" title="Klik untuk membalik halaman"></div>
        </div>
      `;
    }

    renderBookSpread() {
      if (!this.activeStory || !this.bookContainer) return;

      const story = this.activeStory;
      const totalPages = story.pages.length + 1;

      if (this.btnPrevPage) this.btnPrevPage.disabled = this.currentPageIdx === 0;
      if (this.btnNextPage) this.btnNextPage.disabled = this.currentPageIdx === totalPages;

      if (this.pageIndicator) {
        if (this.currentPageIdx === 0) {
          this.pageIndicator.textContent = `Sampul Depan • ${story.category}`;
        } else if (this.currentPageIdx > story.pages.length) {
          this.pageIndicator.textContent = `Sampul Belakang • Epilog Pusaka`;
        } else {
          this.pageIndicator.textContent = `Halaman ${this.currentPageIdx} dari ${story.pages.length}`;
        }
      }

      this.bookContainer.innerHTML = `
        <div class="heritage-tome-spine"></div>
        <div class="tome-spread">
          ${this.getPageLeftHTML(this.currentPageIdx)}
          ${this.getPageRightHTML(this.currentPageIdx)}
        </div>
      `;

      this.bindSpreadEventListeners();
    }

    bindSpreadEventListeners() {
      
      const btnOpen = document.getElementById('btn-open-from-cover');
      if (btnOpen) {
        btnOpen.addEventListener('click', () => this.turnPage(1));
      }

      const btnCorner = document.getElementById('btn-corner-turn');
      if (btnCorner) {
        btnCorner.addEventListener('click', () => this.turnPage(1));
      }

      const btnCornerPrev = document.getElementById('btn-corner-turn-prev');
      if (btnCornerPrev) {
        btnCornerPrev.addEventListener('click', () => this.turnPage(-1));
      }

      const btnRestart = document.getElementById('btn-restart-book');
      if (btnRestart) {
        btnRestart.addEventListener('click', () => {
          this.currentPageIdx = 0;
          this.renderBookSpread();
        });
      }

      const btnReadPage = document.getElementById('btn-read-page-aloud');
      if (btnReadPage && this.activeStory && this.currentPageIdx >= 1 && this.currentPageIdx <= this.activeStory.pages.length) {
        const pageData = this.activeStory.pages[this.currentPageIdx - 1];
        btnReadPage.addEventListener('click', () => {
          if (window.WARISARA_STORY_AUDIO) {
            window.WARISARA_STORY_AUDIO.speakStory(pageData.content, () => {
              btnReadPage.innerHTML = `<span class="material-symbols-outlined text-sm animate-spin">graphic_eq</span><span>Membaca...</span>`;
            }, () => {
              btnReadPage.innerHTML = `<span class="material-symbols-outlined text-sm">record_voice_over</span><span>Dengarkan Halaman Ini</span>`;
            });
          }
        });
      }
    }

    turnPage(delta) {
      if (!this.activeStory) return;
      if (this._isFlipping) return;

      const totalPages = this.activeStory.pages.length + 1;
      const currentIdx = this.currentPageIdx;
      const nextIdx = currentIdx + delta;

      if (nextIdx < 0 || nextIdx > totalPages) return;

      if (window.WARISARA_STORY_AUDIO) {
        window.WARISARA_STORY_AUDIO.playPageFlip();
        window.WARISARA_STORY_AUDIO.stopSpeaking();
      }

      if (window.innerWidth <= 860) {
        this.currentPageIdx = nextIdx;
        this.renderBookSpread();
        return;
      }

      this._isFlipping = true;
      if (this.btnPrevPage) this.btnPrevPage.style.pointerEvents = 'none';
      if (this.btnNextPage) this.btnNextPage.style.pointerEvents = 'none';

      const isForward = delta > 0;
      const tomeEl = this.bookContainer;

      if (isForward) {

        tomeEl.innerHTML = `
          <div class="heritage-tome-spine"></div>
          <div class="tome-spread">
            ${this.getPageLeftHTML(currentIdx)}
            ${this.getPageRightHTML(nextIdx)}
          </div>
          
          <div class="real-page-turn-leaf turn-forward">
            <div class="leaf-3d-flipper">
              
              <div class="leaf-face leaf-face-front">
                <div class="leaf-face-inner leaf-face-inner-right">
                  ${this.getPageRightHTML(currentIdx)}
                  <div class="leaf-lighting-overlay"></div>
                  <div class="leaf-sheen"></div>
                </div>
              </div>
              
              <div class="leaf-face leaf-face-back">
                <div class="leaf-face-inner leaf-face-inner-left">
                  ${this.getPageLeftHTML(nextIdx)}
                  <div class="leaf-lighting-overlay"></div>
                  <div class="leaf-sheen"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="turn-cast-shadow shadow-left"></div>
          
          <div class="turn-underneath-shadow on-right"></div>
        `;
      } else {

        tomeEl.innerHTML = `
          <div class="heritage-tome-spine"></div>
          <div class="tome-spread">
            ${this.getPageLeftHTML(nextIdx)}
            ${this.getPageRightHTML(currentIdx)}
          </div>
          
          <div class="real-page-turn-leaf turn-backward">
            <div class="leaf-3d-flipper">
              
              <div class="leaf-face leaf-face-front">
                <div class="leaf-face-inner leaf-face-inner-left">
                  ${this.getPageLeftHTML(currentIdx)}
                  <div class="leaf-lighting-overlay"></div>
                  <div class="leaf-sheen"></div>
                </div>
              </div>
              
              <div class="leaf-face leaf-face-back">
                <div class="leaf-face-inner leaf-face-inner-right">
                  ${this.getPageRightHTML(nextIdx)}
                  <div class="leaf-lighting-overlay"></div>
                  <div class="leaf-sheen"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="turn-cast-shadow shadow-right"></div>
          
          <div class="turn-underneath-shadow on-left"></div>
        `;
      }

      setTimeout(() => {
        this.currentPageIdx = nextIdx;
        this.renderBookSpread();

        const casingEl = document.querySelector('.open-physical-book-casing');
        if (casingEl) {
          casingEl.classList.add('book-settle');
          setTimeout(() => casingEl.classList.remove('book-settle'), 850);
        }

        this._isFlipping = false;
        if (this.btnPrevPage) this.btnPrevPage.style.pointerEvents = '';
        if (this.btnNextPage) this.btnNextPage.style.pointerEvents = '';
      }, 1400);
    }

    updateStoryFontSize() {
      const textBox = document.getElementById('story-narrative-text-box');
      if (textBox) {
        textBox.style.fontSize = `${this.fontSize}px`;
      }
    }

    toggleNarrator() {
      if (!this.activeStory) return;
      if (!window.WARISARA_STORY_AUDIO) return;

      if (window.WARISARA_STORY_AUDIO.isSpeaking) {
        window.WARISARA_STORY_AUDIO.stopSpeaking();
        if (this.btnNarrate) {
          this.btnNarrate.classList.remove('bg-brass-400', 'text-ink');
          this.btnNarrate.classList.add('bg-white/10', 'text-surface');
        }
      } else {
        let textToRead = '';
        if (this.currentPageIdx === 0) {
          textToRead = `${this.activeStory.title}. ${this.activeStory.summary}`;
        } else if (this.currentPageIdx > this.activeStory.pages.length) {
          textToRead = `Petuah luhur: ${this.activeStory.moral}. ${this.activeStory.audioQuote}`;
        } else {
          const p = this.activeStory.pages[this.currentPageIdx - 1];
          textToRead = `${p.sectionTitle}. ${p.content}`;
        }

        window.WARISARA_STORY_AUDIO.speakStory(
          textToRead,
          () => {
            if (this.btnNarrate) {
              this.btnNarrate.classList.add('bg-brass-400', 'text-ink');
              this.btnNarrate.classList.remove('bg-white/10', 'text-surface');
            }
          },
          () => {
            if (this.btnNarrate) {
              this.btnNarrate.classList.remove('bg-brass-400', 'text-ink');
              this.btnNarrate.classList.add('bg-white/10', 'text-surface');
            }
          }
        );
      }
    }

    toggleAmbienceSound() {
      if (!window.WARISARA_STORY_AUDIO) return;
      const isPlaying = window.WARISARA_STORY_AUDIO.toggleAmbience();
      if (this.btnAmbience) {
        if (isPlaying) {
          this.btnAmbience.classList.add('bg-brass-400', 'text-ink');
          this.btnAmbience.classList.remove('bg-white/10', 'text-surface');
          this.btnAmbience.innerHTML = `
            <span class="material-symbols-outlined text-base animate-pulse">music_note</span>
            <span class="dock-btn-label font-bold">Gamelan Sunyi</span>
          `;
        } else {
          this.btnAmbience.classList.remove('bg-brass-400', 'text-ink');
          this.btnAmbience.classList.add('bg-white/10', 'text-surface');
          this.btnAmbience.innerHTML = `
            <span class="material-symbols-outlined text-base">music_note</span>
            <span class="dock-btn-label">Gamelan Sunyi</span>
          `;
        }
      }
    }

    toggleBookmarkCurrent() {
      if (!this.activeStory) return;
      const id = this.activeStory.id;
      const idx = this.savedBookmarks.indexOf(id);

      if (idx > -1) {
        this.savedBookmarks.splice(idx, 1);
        alert(`Kisah "${this.activeStory.title}" dihapus dari penanda baca.`);
      } else {
        this.savedBookmarks.push(id);
        if (window.WARISARA_STORY_AUDIO) window.WARISARA_STORY_AUDIO.playChime();
        alert(`✨ Kisah "${this.activeStory.title}" berhasil disimpan ke Penanda Baca!`);
      }

      localStorage.setItem('warisara_story_bookmarks', JSON.stringify(this.savedBookmarks));
      this.updateBookmarkButtonState();
      this.renderBookmarksCount();
      this.renderBookshelf();
    }

    updateBookmarkButtonState() {
      if (!this.btnBookmark || !this.activeStory) return;
      const isSaved = this.savedBookmarks.includes(this.activeStory.id);
      if (isSaved) {
        this.btnBookmark.classList.add('text-brass-300');
        this.btnBookmark.innerHTML = `<span class="material-symbols-outlined text-sm text-brass-300">bookmark</span><span class="text-xs ml-1 font-semibold">Tersimpan</span>`;
      } else {
        this.btnBookmark.classList.remove('text-brass-300');
        this.btnBookmark.innerHTML = `<span class="material-symbols-outlined text-sm">bookmark_border</span><span class="text-xs ml-1 font-semibold">Simpan</span>`;
      }
    }

    renderBookmarksCount() {
      const badge = document.getElementById('badge-saved-stories-count');
      if (badge) {
        badge.textContent = `${this.savedBookmarks.length} Disimpan`;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.WARISARA_STORY_APP = new WarisaraStoryBookApp();
    window.WARISARA_STORY_APP.init();
  });
})();
