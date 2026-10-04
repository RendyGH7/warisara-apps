/**
 * WARISARA — Interactive 3D Storybook Controller
 * Handles 3D page turns, bookshelf rendering, audio soundscape, and voice narrator.
 */

(function () {
  'use strict';

  class WarisaraStoryBookApp {
    constructor() {
      this.stories = window.STORIES_DATA || [];
      this.activeStory = null;
      this.currentPageIdx = 0; // 0: Cover, 1..N: Pages, N+1: Back Cover
      this.filterTheme = 'all';
      this.searchQuery = '';
      this.fontSize = 15; // default px
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
      // Search
      if (this.searchField) {
        this.searchField.addEventListener('input', (e) => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          this.renderBookshelf();
        });
      }

      // Filter Themes
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

      // Modal Close
      if (this.btnModalClose) {
        this.btnModalClose.addEventListener('click', () => this.closeBookModal());
      }

      // Page Turns
      if (this.btnPrevPage) {
        this.btnPrevPage.addEventListener('click', () => this.turnPage(-1));
      }
      if (this.btnNextPage) {
        this.btnNextPage.addEventListener('click', () => this.turnPage(1));
      }

      // Audio & Narrator
      if (this.btnNarrate) {
        this.btnNarrate.addEventListener('click', () => this.toggleNarrator());
      }
      if (this.btnAmbience) {
        this.btnAmbience.addEventListener('click', () => this.toggleAmbienceSound());
      }
      if (this.btnBookmark) {
        this.btnBookmark.addEventListener('click', () => this.toggleBookmarkCurrent());
      }

      // Typography Sizing
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

      // Fullscreen
      if (this.btnFullscreen) {
        this.btnFullscreen.addEventListener('click', () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        });
      }

      // Keyboard Shortcuts (Arrow Left/Right, Escape)
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
              
              <!-- Spine Binding Relief -->
              <div class="book-spine-strip"></div>

              <!-- 3D Paper Stack Thickness Edge on Right -->
              <div class="book-card-thickness"></div>

              <!-- Top Cover Ornament & Tag -->
              <div class="p-4 pl-7 relative z-10 flex items-start justify-between">
                <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/30">
                  ${s.category}
                </span>
                <span class="text-[10px] text-surface/60 font-mono flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-brass-400">menu_book</span>
                  <span>${s.pages.length + 2} Hlm</span>
                </span>
              </div>

              <!-- Cover Visual Artwork Window -->
              <div class="mx-5 my-2 aspect-[4/3] rounded-xl overflow-hidden antique-frame relative z-10 shadow-lg group-hover:scale-[1.02] transition-transform">
                <div class="antique-frame-inner w-full h-full">
                  <img src="${s.coverImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              </div>

              <!-- Cover Typography -->
              <div class="p-4 pl-7 relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 class="font-display text-lg sm:text-xl font-normal text-surface group-hover:text-brass-300 transition-colors leading-snug line-clamp-2 mb-1">
                  ${s.title}
                </h3>
                <p class="text-[11px] text-surface/60 font-light truncate mb-2">${s.origin}</p>
                <div class="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-brass-400 font-semibold">
                  <span class="flex items-center gap-1">
                    <span>Buka Lembaran</span>
                    <span class="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                  ${isSaved ? '<span class="material-symbols-outlined text-sm text-brass-300">bookmark</span>' : ''}
                </div>
              </div>

              <!-- Hanging Bookmark Ribbon -->
              <div class="book-ribbon"></div>
            </div>
          </div>
        `;
        })
        .join('');

      this.bookshelfGrid.querySelectorAll('[data-story-id]').forEach((card) => {
        card.addEventListener('click', () => {
          const id = card.dataset.storyId;
          this.openBook(id);
        });
      });
    }

    openBook(storyId) {
      const story = this.stories.find((s) => s.id === storyId);
      if (!story) return;

      this.activeStory = story;
      this.currentPageIdx = 0; // Start at Cover

      if (window.WARISARA_STORY_AUDIO) {
        window.WARISARA_STORY_AUDIO.playBookOpen();
      }

      this.renderBookSpread();
      if (this.bookModal) {
        this.bookModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      this.updateBookmarkButtonState();
    }

    closeBookModal() {
      if (window.WARISARA_STORY_AUDIO) {
        window.WARISARA_STORY_AUDIO.playBookClose();
        window.WARISARA_STORY_AUDIO.stopSpeaking();
      }
      if (this.bookModal) {
        this.bookModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      this.activeStory = null;
    }

    turnPage(delta) {
      if (!this.activeStory) return;
      const totalPages = this.activeStory.pages.length + 1; // 0: Cover, 1..N: Pages, totalPages: Back Cover
      const nextIdx = this.currentPageIdx + delta;

      if (nextIdx < 0 || nextIdx > totalPages) return;

      if (window.WARISARA_STORY_AUDIO) {
        window.WARISARA_STORY_AUDIO.playPageFlip();
        window.WARISARA_STORY_AUDIO.stopSpeaking();
      }

      // Add flip animation
      if (this.bookContainer) {
        const animClass = delta > 0 ? 'page-flip-anim-forward' : 'page-flip-anim-backward';
        this.bookContainer.classList.add(animClass);
        setTimeout(() => {
          this.currentPageIdx = nextIdx;
          this.renderBookSpread();
          this.bookContainer.classList.remove(animClass);
        }, 320);
      } else {
        this.currentPageIdx = nextIdx;
        this.renderBookSpread();
      }
    }

    renderBookSpread() {
      if (!this.activeStory || !this.bookContainer) return;

      const story = this.activeStory;
      const totalPages = story.pages.length + 1;

      // Update Navigation Buttons & Page Indicator
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

      // 1. FRONT COVER SPREAD
      if (this.currentPageIdx === 0) {
        this.bookContainer.innerHTML = `
          <div class="tome-spread">
            <!-- Left Inside Flap -->
            <div class="tome-page-left flex flex-col justify-between">
              <div>
                <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/30 mb-3">
                  WADAH KISAH ADILUHUNG
                </span>
                <h4 class="font-display text-2xl font-light text-surface mb-2">${story.category}</h4>
                <p class="text-xs text-surface/60 font-mono mb-4">Wilayah: ${story.origin}</p>
                <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-surface/80 leading-relaxed italic">
                  "${story.summary}"
                </div>
              </div>

              <div class="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-surface/60">
                <span>WARISARA Heritage Book Engine</span>
                <span class="text-brass-300">Nusantara Edition</span>
              </div>
            </div>

            <!-- Right Cover Presentation -->
            <div class="tome-page-right flex flex-col justify-between"
                 style="background: linear-gradient(145deg, #181410 0%, ${story.coverColor || '#231D18'} 60%, #0E0C0A 100%); color: #FBF8F2;">
              
              <div class="text-center pt-2">
                <span class="text-[10px] font-bold uppercase tracking-[0.25em] text-brass-400 block mb-2">SERI TUTUR LISAN NUSANTARA</span>
                <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-surface mb-2 leading-tight">
                  ${story.title}
                </h2>
                <p class="text-xs text-brass-200/80 font-light italic mb-4">${story.subtitle || ''}</p>
              </div>

              <!-- Central Artwork Box -->
              <div class="w-full max-w-[380px] mx-auto aspect-[4/3] rounded-2xl overflow-hidden antique-frame my-2 shadow-2xl">
                <div class="antique-frame-inner w-full h-full">
                  <img src="${story.coverImage}" alt="${story.title}" class="w-full h-full object-cover" />
                </div>
              </div>

              <!-- Open Tome Prompt -->
              <div class="pt-4 border-t border-white/15 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-brass-400 animate-pulse"></span>
                  <span class="text-xs text-surface/70">Siap Dituturkan</span>
                </div>
                <button id="btn-open-from-cover" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brass-600 via-brass-500 to-brass-600 text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
                  <span>Buka Lembaran</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        `;

        const btnOpen = document.getElementById('btn-open-from-cover');
        if (btnOpen) btnOpen.addEventListener('click', () => this.turnPage(1));
        return;
      }

      // 2. BACK COVER SPREAD
      if (this.currentPageIdx > story.pages.length) {
        this.bookContainer.innerHTML = `
          <div class="tome-spread">
            <!-- Left Moral & Reflection -->
            <div class="tome-page-left flex flex-col justify-between">
              <div>
                <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest-500/20 text-forest-300 border border-forest-500/30 mb-3">
                  INTISARI KEARIFAN
                </span>
                <h3 class="font-display text-2xl font-light text-surface mb-4">Petuah Luhur Nenek Moyang</h3>
                
                <div class="p-5 rounded-2xl bg-brass-400/10 border border-brass-400/30 mb-5">
                  <span class="text-[10px] uppercase font-bold text-brass-400 block mb-1">Mutiara Nilai Hidup:</span>
                  <p class="font-display italic text-base sm:text-lg text-surface font-light leading-relaxed">
                    "${story.moral}"
                  </p>
                </div>

                <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-surface/80 leading-relaxed">
                  <strong class="text-brass-300 block mb-1">Dengarkan Tutur Suara:</strong>
                  <p class="italic text-surface/70">"${story.audioQuote}"</p>
                </div>
              </div>

              <div class="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-surface/60">
                <span>Halaman Penutup</span>
                <span class="text-brass-300 font-mono">#WARISARA-STORY</span>
              </div>
            </div>

            <!-- Right Back Cover Seal -->
            <div class="tome-page-right flex flex-col justify-between"
                 style="background: linear-gradient(145deg, #181410 0%, ${story.coverColor || '#231D18'} 60%, #0E0C0A 100%); color: #FBF8F2;">
              
              <div class="text-center pt-8">
                <div class="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-brass-400/50 flex items-center justify-center bg-brass-400/10 shadow-lg">
                  <span class="font-display text-2xl font-bold text-brass-300">W</span>
                </div>
                <h3 class="font-display text-2xl font-light text-surface mb-2">Estafet Telah Sampai di Tangan Anda</h3>
                <p class="text-xs text-surface/70 max-w-sm mx-auto leading-relaxed">
                  Kisah ${story.title} kini menjadi bagian dari ingatan batin Anda. Bagikan dan lestarikan warisan peradaban bangsa.
                </p>
              </div>

              <div class="space-y-3 max-w-xs mx-auto w-full">
                <a href="pass-it-on.html" class="w-full py-3 px-4 rounded-xl bg-brass-500 hover:bg-brass-400 text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all">
                  <span class="material-symbols-outlined text-sm">favorite</span>
                  <span>Tuliskan Pesan di Pass It On</span>
                </a>
                <button id="btn-restart-book" class="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-surface text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                  <span class="material-symbols-outlined text-sm">restart_alt</span>
                  <span>Baca Ulang dari Awal</span>
                </button>
              </div>

              <div class="text-center pt-4 border-t border-white/15 text-[11px] text-surface/50">
                © 2026 WARISARA — Menjaga Tutur Lisan Nusantara
              </div>
            </div>
          </div>
        `;

        const btnRestart = document.getElementById('btn-restart-book');
        if (btnRestart) btnRestart.addEventListener('click', () => {
          this.currentPageIdx = 0;
          this.renderBookSpread();
        });
        return;
      }

      // 3. STORY CHAPTER SPREAD (PAGE 1..N)
      const pageData = story.pages[this.currentPageIdx - 1];
      if (!pageData) return;

      // Extract first letter for Drop Cap
      const rawText = pageData.content;
      const firstLetterMatch = rawText.match(/^([A-Za-z])/);
      const firstLetter = firstLetterMatch ? firstLetterMatch[1] : '';
      const textRemaining = firstLetter ? rawText.substring(1) : rawText;

      this.bookContainer.innerHTML = `
        <div class="tome-spread">
          <!-- Left Page: Illustration & Subtitle -->
          <div class="tome-page-left flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-bold uppercase tracking-wider text-brass-400">${story.title}</span>
                <span class="text-[10px] text-surface/50 font-mono">Babak ${pageData.pageNumber} / ${story.pages.length}</span>
              </div>

              <!-- Illustration -->
              <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden antique-frame mb-3 shadow-xl">
                <div class="antique-frame-inner w-full h-full">
                  <img src="${pageData.image || story.coverImage}" alt="${pageData.sectionTitle}" class="w-full h-full object-cover" />
                </div>
              </div>

              <p class="text-[11px] text-surface/60 italic leading-relaxed text-center px-2">
                ${pageData.imageCaption || ''}
              </p>
            </div>

            <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-surface/50">
              <span>WARISARA Pusaka Digital</span>
              <span>Hlm. ${pageData.pageNumber * 2 - 1}</span>
            </div>
          </div>

          <!-- Right Page: Parchment Narrative Text -->
          <div class="tome-page-right flex flex-col justify-between">
            <div id="story-narrative-text-box" style="font-size: ${this.fontSize}px; line-height: 1.75;">
              <h3 class="font-display text-xl sm:text-2xl font-semibold text-[#2C2117] mb-4 pb-2 border-b border-[#D9CDB8]">
                ${pageData.sectionTitle}
              </h3>

              <div class="text-[#2C241E] font-light text-justify leading-relaxed">
                <span class="drop-cap">${firstLetter}</span>${textRemaining}
              </div>
            </div>

            <!-- Page Bottom Folio & Actions -->
            <div class="pt-4 border-t border-[#D9CDB8] flex items-center justify-between text-xs text-[#6B5A4B]">
              <div class="flex items-center gap-2">
                <button id="btn-read-page-aloud" class="px-3 py-1.5 rounded-lg bg-[#2C2117]/10 hover:bg-[#2C2117]/20 text-[#2C2117] font-semibold text-xs flex items-center gap-1.5 transition-colors">
                  <span class="material-symbols-outlined text-sm">record_voice_over</span>
                  <span>Dengarkan Halaman Ini</span>
                </button>
              </div>
              <span class="font-mono">Hlm. ${pageData.pageNumber * 2}</span>
            </div>

            <!-- Interactive Corner Page Curl Button -->
            <div class="page-corner-curl-btn" id="btn-corner-turn" title="Klik untuk membalik halaman"></div>
          </div>
        </div>
      `;

      const btnCorner = document.getElementById('btn-corner-turn');
      if (btnCorner) {
        btnCorner.addEventListener('click', () => this.turnPage(1));
      }

      const btnReadPage = document.getElementById('btn-read-page-aloud');
      if (btnReadPage) {
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
            <span class="audio-bar"></span><span class="audio-bar"></span><span class="audio-bar"></span>
            <span class="text-xs font-semibold ml-1">Musik Aktif</span>
          `;
        } else {
          this.btnAmbience.classList.remove('bg-brass-400', 'text-ink');
          this.btnAmbience.classList.add('bg-white/10', 'text-surface');
          this.btnAmbience.innerHTML = `
            <span class="material-symbols-outlined text-sm">music_note</span>
            <span class="text-xs font-semibold ml-1">Gamelan Sunyi</span>
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
