/**
 * WARISARA — Sistem Chat Marketplace C2C (ala Facebook Marketplace)
 * Menghubungkan Pembeli (Email A) dan Penjual (Email B) secara langsung
 * untuk transaksi personal, tanya jawab produk, dan kesepakatan mandiri.
 */

(function () {
  const THREADS_STORAGE_KEY = "warisara_chat_threads";
  let activeThreadId = null;
  let chatDrawerEl = null;
  let chatBackdropEl = null;

  // Percakapan demo awal antara Email A (Rendy) dan Email B (Dewi)
  function getInitialThreads() {
    return [
      {
        id: "thread_rendy_dewi",
        participant1: "rendy.kolektor@gmail.com",
        participant2: "dewi.tenun@gmail.com",
        participantNames: {
          "rendy.kolektor@gmail.com": "Rendy Pratama",
          "dewi.tenun@gmail.com": "Mama Dewi Koni (Tenun Sumba)"
        },
        product: {
          id: "syal-tenun-sumba",
          name: "Syal Tenun Sabana Pewarna Alami",
          price: "Rp 850.000",
          origin: "Sumba Timur, NTT",
          image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80"
        },
        messages: [
          {
            id: "msg_1",
            sender: "rendy.kolektor@gmail.com",
            text: "Halo Mama Dewi, salam budaya! Saya sangat tertarik dengan Syal Tenun Sabana Pewarna Alami ini. Apakah barangnya masih ready stock?",
            time: "10:15",
            timestamp: Date.now() - 3600000 * 3
          },
          {
            id: "msg_2",
            sender: "dewi.tenun@gmail.com",
            text: "Nggih salam budaya Mas Rendy! Masih ready 2 lembar kak, baru selesai proses celup akar mengkudu dan jemur sabana kemarin. Ada motif kuda penjelajah dan motif rusa.",
            time: "10:24",
            timestamp: Date.now() - 3600000 * 2.8
          },
          {
            id: "msg_3",
            sender: "rendy.kolektor@gmail.com",
            text: "Wah istimewa sekali! Saya berminat ambil yang motif kuda. Sistem transaksinya transfer langsung atau bagaimana kak?",
            time: "10:30",
            timestamp: Date.now() - 3600000 * 2
          },
          {
            id: "msg_4",
            sender: "dewi.tenun@gmail.com",
            text: "Bisa transfer langsung kak, nanti saya kirim via JNE Express lengkap dengan sertifikat kriya dan kemasan anyaman lontar. Mau saya fotokan detail serat kainnya sekarang?",
            time: "10:35",
            timestamp: Date.now() - 3600000 * 1.5
          }
        ],
        lastUpdate: Date.now() - 3600000 * 1.5
      }
    ];
  }

  function getStoredThreads() {
    try {
      const stored = localStorage.getItem(THREADS_STORAGE_KEY);
      if (stored) {
        let threads = JSON.parse(stored);
        if (Array.isArray(threads)) {
          threads = threads.filter(
            (t) =>
              t.participant1 !== "joko.tembaga@gmail.com" &&
              t.participant2 !== "joko.tembaga@gmail.com" &&
              t.id !== "thread_rendy_joko"
          );
          return threads;
        }
      }
    } catch (e) {}
    const initial = getInitialThreads();
    saveThreads(initial);
    return initial;
  }

  function saveThreads(threads) {
    try {
      localStorage.setItem(THREADS_STORAGE_KEY, JSON.stringify(threads));
    } catch (e) {}
    updateNavbarChatBadge();
  }

  function getCurrentUser() {
    if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.getUser === "function") {
      return window.WARISARA_AUTH.getUser();
    }
    return null;
  }

  // Audio effect halus untuk chat
  function playChatChime(isIncoming = false) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const now = ctx.currentTime;
      if (isIncoming) {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      } else {
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.1); // C5
      }
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // Dapatkan thread percakapan pengguna saat ini
  function getUserThreads() {
    const user = getCurrentUser();
    if (!user || !user.email) return [];
    const threads = getStoredThreads();
    const myEmail = user.email.toLowerCase();
    return threads.filter(
      (t) =>
        (t.participant1 && t.participant1.toLowerCase() === myEmail) ||
        (t.participant2 && t.participant2.toLowerCase() === myEmail)
    ).sort((a, b) => (b.lastUpdate || 0) - (a.lastUpdate || 0));
  }

  // Inisialisasi DOM Drawer Messenger & Backdrop
  function initChatDrawerDOM() {
    if (document.getElementById("warisara-chat-drawer")) return;

    // Backdrop overlay: menempatkan seluruh konten HTML halaman di latar belakang
    if (!document.getElementById("warisara-chat-backdrop")) {
      const backdrop = document.createElement("div");
      backdrop.id = "warisara-chat-backdrop";
      backdrop.className =
        "fixed inset-0 bg-black/65 backdrop-blur-sm z-[99990] transition-opacity duration-300 opacity-0 pointer-events-none";
      document.body.appendChild(backdrop);
      chatBackdropEl = backdrop;
      backdrop.addEventListener("click", closeChatDrawer);
    } else {
      chatBackdropEl = document.getElementById("warisara-chat-backdrop");
    }

    const drawer = document.createElement("div");
    drawer.id = "warisara-chat-drawer";
    drawer.className =
      "closed fixed inset-y-0 right-0 z-[100000] w-full max-w-md sm:max-w-lg chat-glass-panel flex flex-col shadow-2xl overflow-hidden font-body";

    drawer.innerHTML = `
      <!-- Header Messenger -->
      <div class="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/30">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-2xl bg-brass-400/20 border border-brass-400/40 text-brass-300 flex items-center justify-center">
            <span class="material-symbols-outlined text-lg">chat</span>
          </div>
          <div>
            <h3 class="font-display text-base font-semibold text-surface flex items-center gap-2">
              <span>Pesan & Marketplace</span>
              <span class="seller-verified-badge">C2C Aman</span>
            </h3>
            <p id="chat-header-user-status" class="text-[11px] text-surface/60">
              Masuk sebagai <strong class="text-brass-300" id="chat-header-email-display">...</strong>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <button id="chat-btn-switch-account" title="Beralih Akun (Uji Chat Pembeli ↔ Penjual)"
                  class="p-2 rounded-xl bg-white/5 hover:bg-brass-400/20 text-brass-300 hover:text-brass-200 border border-white/10 text-xs flex items-center gap-1 transition-all">
            <span class="material-symbols-outlined text-sm">swap_horiz</span>
            <span class="hidden sm:inline text-[11px] font-bold">Ganti Akun</span>
          </button>
          <button id="chat-drawer-close-btn" class="p-2 rounded-xl hover:bg-white/10 text-surface/70 hover:text-surface transition-colors" aria-label="Tutup Chat">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      <!-- Main Body: Tabs or Active View -->
      <div class="flex-1 flex flex-col overflow-hidden relative">
        <!-- Thread Navigation Bar -->
        <div id="chat-thread-bar" class="px-4 py-2.5 bg-black/20 border-b border-white/10 flex items-center justify-between text-xs">
          <button id="chat-btn-back-to-list" class="hidden items-center gap-1 text-brass-300 hover:text-brass-200 font-semibold transition-colors">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Semua Percakapan</span>
          </button>
          <span id="chat-active-partner-title" class="text-surface/80 font-medium truncate max-w-[240px]">Daftar Kontak Penjual</span>
          <span class="text-[10px] text-surface/50 font-mono">Obrolan Kriya</span>
        </div>

        <!-- View 1: Threads List -->
        <div id="chat-threads-list-view" class="flex-1 overflow-y-auto chat-scrollbar p-3 space-y-2">
          <!-- Rendered dynamically -->
        </div>

        <!-- View 2: Active Conversation Room -->
        <div id="chat-conversation-view" class="hidden flex-1 flex-col overflow-hidden">
          <!-- Product Reference Header (Jika ada produk yang ditanyakan) -->
          <div id="chat-product-context-header" class="hidden px-4 py-2.5 bg-white/[0.03] border-b border-brass-400/25 items-center justify-between">
            <div class="flex items-center gap-2.5 overflow-hidden">
              <img id="chat-context-prod-img" src="" alt="Thumbnail" class="w-9 h-9 rounded-lg object-cover border border-white/10 flex-shrink-0" />
              <div class="overflow-hidden">
                <div id="chat-context-prod-name" class="text-xs font-semibold text-surface truncate">Nama Produk</div>
                <div class="text-[11px] text-brass-300 font-mono" id="chat-context-prod-price">Rp 0</div>
              </div>
            </div>
            <a id="chat-context-prod-link" href="#" class="text-[11px] px-2.5 py-1 rounded-full bg-brass-400/20 text-brass-300 hover:bg-brass-400/30 font-semibold whitespace-nowrap transition-all">
              Buka Detail
            </a>
          </div>

          <!-- Commission Reference Header & Deal Agreement Component -->
          <div id="chat-commission-context-header" class="hidden px-4 py-3 bg-gradient-to-r from-brass-900/30 via-black/40 to-forest-900/20 border-b border-brass-400/30 flex-col gap-2">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-1.5 mb-1">
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-brass-400/20 text-brass-300 border border-brass-400/30">Pesanan Kustom</span>
                  <span id="chat-comm-craft-badge" class="px-2 py-0.5 rounded-full text-[9px] font-medium bg-white/10 text-surface/80">Kriya</span>
                  <span id="chat-comm-status-badge" class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Tahap Diskusi</span>
                </div>
                <h4 id="chat-comm-title" class="text-xs font-bold text-surface leading-tight truncate">Judul Brief Pesanan</h4>
              </div>
              <button type="button" id="chat-btn-toggle-deal-form" class="text-[10px] px-3 py-1.5 rounded-full bg-brass-400 text-ink font-bold hover:bg-brass-300 transition-all whitespace-nowrap shadow flex items-center gap-1 flex-shrink-0">
                <span class="material-symbols-outlined text-xs">handshake</span>
                <span id="chat-deal-btn-label">Sepakati Pesanan</span>
              </button>
            </div>

            <!-- Mini Specs Bar -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] text-surface/70 pt-1 border-t border-white/5">
              <div class="truncate"><span class="text-surface/40">Anggaran:</span> <strong id="chat-comm-budget" class="text-brass-300 font-mono">-</strong></div>
              <div class="truncate"><span class="text-surface/40">Tenggat:</span> <strong id="chat-comm-deadline" class="text-surface/90">-</strong></div>
              <div class="truncate"><span class="text-surface/40">Warna:</span> <span id="chat-comm-color" class="text-surface/80">-</span></div>
              <div class="truncate"><span class="text-surface/40">Daerah:</span> <span id="chat-comm-region" class="text-surface/80">-</span></div>
            </div>

            <!-- Deal Agreement Panel (Expandable) -->
            <div id="chat-deal-form-panel" class="hidden mt-2 p-3 rounded-xl bg-black/85 border border-brass-400/50 space-y-2.5 shadow-xl">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <div class="flex items-center gap-1.5 text-[11px] font-bold text-brass-300">
                  <span class="material-symbols-outlined text-sm text-brass-400">verified</span>
                  <span>Langkah 03: Sepakati Pesanan Langsung (Deal)</span>
                </div>
                <button type="button" id="chat-btn-close-deal-panel" class="text-surface/40 hover:text-surface text-xs">✕</button>
              </div>
              <p class="text-[10px] text-surface/70 leading-relaxed">
                Konfirmasi harga final, estimasi waktu pengerjaan, dan skema pembayaran bersama rekan kriya. Setelah disepakati, status pesanan akan tercatat resmi sebagai <strong>Deal</strong>.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                <div>
                  <label class="block text-surface/70 font-semibold mb-0.5">Harga Final Disepakati (Rp) *</label>
                  <input type="number" id="chat-deal-input-price" placeholder="Contoh: 1850000" class="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-surface text-xs focus:outline-none focus:border-brass-400" />
                </div>
                <div>
                  <label class="block text-surface/70 font-semibold mb-0.5">Estimasi Durasi Pengerjaan *</label>
                  <input type="text" id="chat-deal-input-duration" placeholder="Contoh: 18 Hari Kerja" class="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-surface text-xs focus:outline-none focus:border-brass-400" />
                </div>
              </div>
              <div>
                <label class="block text-surface/70 font-semibold mb-0.5 text-[10px]">Ketentuan Pengiriman & Pembayaran</label>
                <input type="text" id="chat-deal-input-terms" placeholder="Contoh: DP 50% via transfer BCA, pelunasan sebelum kirim JNE Express" class="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-surface text-xs focus:outline-none focus:border-brass-400" />
              </div>
              <div class="flex items-center justify-end gap-2 pt-1">
                <button type="button" id="chat-deal-btn-cancel" class="px-3 py-1 rounded-full text-[10px] text-surface/60 hover:text-surface transition-colors">Batal</button>
                <button type="button" id="chat-deal-btn-submit" class="px-4 py-1.5 rounded-full bg-forest-500 hover:bg-forest-400 text-surface text-[11px] font-bold flex items-center gap-1 shadow-md transition-all">
                  <span class="material-symbols-outlined text-xs">handshake</span>
                  <span>Konfirmasi Kesepakatan (Deal)</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Notice Alur Transaksi Mandiri & Kesepakatan P2P -->
          <div class="mx-4 my-2 p-2.5 rounded-xl bg-forest-900/30 border border-forest-500/30 text-[11px] text-forest-200 flex items-start gap-2">
            <span class="material-symbols-outlined text-sm flex-shrink-0 mt-0.5 text-forest-300">handshake</span>
            <span><strong>Komunikasi Kriya Langsung:</strong> Diskusikan spesifikasi karya, negosiasi harga, pengiriman, dan pembayaran langsung antar anggota komunitas di ruang obrolan ini.</span>
          </div>

          <!-- Messages Container -->
          <div id="chat-messages-container" class="flex-1 overflow-y-auto chat-scrollbar p-4 space-y-3">
            <!-- Messages rendered dynamically -->
          </div>

          <!-- Typing Indicator -->
          <div id="chat-typing-indicator" class="hidden px-4 py-1 text-xs text-brass-300/80 items-center gap-2">
            <div class="flex gap-1 items-center">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            <span id="chat-typing-name" class="text-[11px]">Penjual sedang mengetik balasan...</span>
          </div>

          <!-- Quick Suggestion Chips -->
          <div class="px-4 py-2 border-t border-white/5 bg-black/15 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button type="button" class="chat-quick-chip text-[11px] px-3 py-1 rounded-full whitespace-nowrap" data-quick-msg="Halo, apakah produk ini masih tersedia?">
              Masih ready?
            </button>
            <button type="button" class="chat-quick-chip text-[11px] px-3 py-1 rounded-full whitespace-nowrap" data-quick-msg="Bisa nego harga untuk pembelian hari ini?">
              Bisa nego?
            </button>
            <button type="button" class="chat-quick-chip text-[11px] px-3 py-1 rounded-full whitespace-nowrap" data-quick-msg="Bisa kirimkan foto asli dan video detail barangnya kak?">
              Foto kondisi asli
            </button>
            <button type="button" class="chat-quick-chip text-[11px] px-3 py-1 rounded-full whitespace-nowrap" data-quick-msg="Lokasi COD atau pengiriman dari mana ya kak?">
              Lokasi & COD
            </button>
          </div>

          <!-- Input Message Area -->
          <form id="chat-send-form" class="p-3 sm:p-4 bg-black/40 border-t border-white/10 flex items-center gap-2">
            <input id="chat-message-input" type="text" placeholder="Tulis pesan untuk penjual..." autocomplete="off"
                   class="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-full bg-white/5 border border-white/15 text-surface placeholder:text-surface/40 focus:outline-none focus:border-brass-400 transition-colors" />
            <button type="submit" id="chat-send-btn"
                    class="w-10 h-10 rounded-full bg-brass-400 hover:bg-brass-300 text-ink flex items-center justify-center transition-all flex-shrink-0 shadow-lg"
                    aria-label="Kirim Pesan">
              <span class="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);
    chatDrawerEl = drawer;

    // Event Listeners
    drawer.querySelector("#chat-drawer-close-btn").addEventListener("click", closeChatDrawer);
    drawer.querySelector("#chat-btn-back-to-list").addEventListener("click", showThreadsListView);
    drawer.querySelector("#chat-btn-switch-account").addEventListener("click", () => {
      if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.switchAccountQuick === "function") {
        window.WARISARA_AUTH.switchAccountQuick();
        renderActiveView();
      }
    });

    const sendForm = drawer.querySelector("#chat-send-form");
    sendForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("chat-message-input");
      const text = input.value.trim();
      if (text) {
        sendMessage(text);
        input.value = "";
      }
    });

    drawer.querySelectorAll("[data-quick-msg]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = document.getElementById("chat-message-input");
        input.value = btn.dataset.quickMsg;
        input.focus();
      });
    });
  }

  function openChatDrawer() {
    initChatDrawerDOM();
    if (!chatDrawerEl) return;
    chatDrawerEl.classList.remove("closed");
    chatDrawerEl.classList.add("open");

    // Tampilkan backdrop overlay (HTML halaman berada di belakang)
    if (chatBackdropEl) {
      chatBackdropEl.classList.remove("opacity-0", "pointer-events-none");
      chatBackdropEl.classList.add("opacity-100", "pointer-events-auto");
    }

    // Sembunyikan navbar dan kunci interaksi Wari di belakang drawer
    document.body.classList.add("chat-drawer-open");
    document.documentElement.classList.add("chat-drawer-open");

    // Tempatkan Wari di belakang chat dan matikan klik / sembunyikan tooltip
    const wariWidget = document.getElementById("wari-ai-widget");
    if (wariWidget) {
      wariWidget.classList.add("chat-suppressed");
      wariWidget.style.setProperty("z-index", "50", "important");
      wariWidget.style.setProperty("pointer-events", "none", "important");
    }
    const wariTooltip = document.getElementById("wari-ai-tooltip");
    if (wariTooltip) {
      wariTooltip.classList.add("hidden-tooltip", "modal-suppressed", "chat-suppressed");
      wariTooltip.style.setProperty("display", "none", "important");
    }
    const wariChatWindow = document.getElementById("wari-chat-window");
    if (wariChatWindow) {
      wariChatWindow.classList.add("hidden");
      wariChatWindow.style.setProperty("display", "none", "important");
    }

    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.style.display = "none";
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (mobileDrawer) mobileDrawer.style.display = "none";

    renderActiveView();
  }

  function closeChatDrawer() {
    if (!chatDrawerEl) return;
    chatDrawerEl.classList.remove("open");
    chatDrawerEl.classList.add("closed");

    // Sembunyikan backdrop overlay
    if (chatBackdropEl) {
      chatBackdropEl.classList.add("opacity-0", "pointer-events-none");
      chatBackdropEl.classList.remove("opacity-100", "pointer-events-auto");
    }

    // Kembalikan status chat drawer open
    document.body.classList.remove("chat-drawer-open");
    document.documentElement.classList.remove("chat-drawer-open");

    // Pulihkan Wari widget
    const wariWidget = document.getElementById("wari-ai-widget");
    if (wariWidget) {
      wariWidget.classList.remove("chat-suppressed");
      wariWidget.style.removeProperty("z-index");
      wariWidget.style.removeProperty("pointer-events");
    }
    const wariTooltip = document.getElementById("wari-ai-tooltip");
    if (wariTooltip) {
      wariTooltip.classList.remove("modal-suppressed", "chat-suppressed");
      wariTooltip.style.removeProperty("display");
    }
    const wariChatWindow = document.getElementById("wari-chat-window");
    if (wariChatWindow) {
      wariChatWindow.style.removeProperty("display");
    }

    // Tampilkan kembali navbar
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.style.display = "";
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (mobileDrawer) mobileDrawer.style.display = "";
  }

  function renderActiveView() {
    initChatDrawerDOM();
    const currentUser = getCurrentUser();
    const emailDisplay = document.getElementById("chat-header-email-display");
    if (emailDisplay) {
      if (currentUser) {
        emailDisplay.textContent = `${currentUser.name} (${currentUser.email})`;
      } else {
        emailDisplay.textContent = "Belum Masuk Akun Google";
      }
    }

    if (!currentUser) {
      const listView = document.getElementById("chat-threads-list-view");
      const convView = document.getElementById("chat-conversation-view");
      if (convView) {
        convView.classList.add("hidden");
        convView.classList.remove("flex");
      }
      if (listView) {
        listView.classList.remove("hidden");
        listView.innerHTML = `
          <div class="text-center py-16 px-4">
            <div class="w-14 h-14 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-surface/40 mb-3">
              <span class="material-symbols-outlined text-2xl">lock</span>
            </div>
            <h4 class="font-display text-sm font-semibold text-surface mb-1">Akses Chat Memerlukan Akun Google</h4>
            <p class="text-xs text-surface/60 max-w-xs mx-auto mb-4">
              Silakan masuk dengan akun Google terlebih dahulu untuk mengirim pesan ke penjual produk lokal.
            </p>
            <button type="button" onclick="if(window.WARISARA_AUTH) window.WARISARA_AUTH.openAuthModal();"
                    class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brass-400 text-ink text-xs font-bold uppercase tracking-wider hover:bg-brass-300 transition-all shadow-md">
              <span>Masuk dengan Google</span>
            </button>
          </div>
        `;
      }
      return;
    }

    if (activeThreadId) {
      showConversationView(activeThreadId);
    } else {
      showThreadsListView();
    }
    updateNavbarChatBadge();
  }

  function isThreadUnread(th, myEmail) {
    if (!th || !th.messages || th.messages.length === 0) return false;
    if (th.readBy && th.readBy[myEmail.toLowerCase()]) return false;
    const lastMsg = th.messages[th.messages.length - 1];
    return lastMsg && lastMsg.sender && lastMsg.sender.toLowerCase() !== myEmail.toLowerCase();
  }

  function getUnreadCount() {
    const user = getCurrentUser();
    if (!user || !user.email) return 0;
    const threads = getUserThreads();
    const myEmail = user.email.toLowerCase();
    let count = 0;
    threads.forEach((th) => {
      if (isThreadUnread(th, myEmail)) count++;
    });
    return count;
  }

  function showThreadsListView() {
    activeThreadId = null;
    const listView = document.getElementById("chat-threads-list-view");
    const convView = document.getElementById("chat-conversation-view");
    const backBtn = document.getElementById("chat-btn-back-to-list");
    const titleEl = document.getElementById("chat-active-partner-title");

    if (listView) listView.classList.remove("hidden");
    if (convView) {
      convView.classList.add("hidden");
      convView.classList.remove("flex");
    }
    if (backBtn) backBtn.classList.add("hidden");

    const threads = getUserThreads();
    const currentUser = getCurrentUser();
    const myEmail = (currentUser ? currentUser.email : "").toLowerCase();
    const unreadCount = getUnreadCount();

    if (titleEl) {
      titleEl.innerHTML = `
        <div class="flex items-center gap-2">
          <span>Daftar Percakapan & Transaksi</span>
          ${unreadCount > 0 ? `<span class="px-2 py-0.5 rounded-full bg-brass-400 text-ink text-[10px] font-extrabold shadow-sm">${unreadCount} Baru</span>` : ""}
        </div>
      `;
    }

    if (!threads || threads.length === 0) {
      listView.innerHTML = `
        <div class="text-center py-16 px-4">
          <div class="w-14 h-14 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-surface/40 mb-3">
            <span class="material-symbols-outlined text-2xl">forum</span>
          </div>
          <h4 class="font-display text-sm font-semibold text-surface mb-1">Belum Ada Percakapan</h4>
          <p class="text-xs text-surface/60 max-w-xs mx-auto mb-4">
            Jelajahi halaman Produk Lokal, pilih karya yang Anda sukai, lalu klik tombol "Chat Penjual".
          </p>
          <a href="ekonomi-kreatif.html" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brass-400/20 text-brass-300 text-xs font-semibold hover:bg-brass-400/30 transition-all">
            <span>Buka Etalase Produk Lokal</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      `;
      return;
    }

    listView.innerHTML = threads.map((th) => {
      const partnerEmail = th.participant1.toLowerCase() === myEmail ? th.participant2 : th.participant1;
      const partnerName = (th.participantNames && th.participantNames[partnerEmail]) || partnerEmail.split("@")[0];
      const lastMsg = th.messages && th.messages.length > 0 ? th.messages[th.messages.length - 1] : { text: "Mulai percakapan...", time: "" };
      const prod = th.product || {};
      const isUnread = isThreadUnread(th, myEmail);

      return `
        <div data-thread-id="${th.id}"
             class="chat-thread-row p-3.5 rounded-2xl ${isUnread ? "bg-white/[0.06] border-brass-400/50 shadow-md ring-1 ring-brass-400/20" : "bg-white/[0.03] border-white/10"} hover:bg-brass-400/10 border hover:border-brass-400/40 cursor-pointer transition-all flex items-center gap-3 group relative">
          <div class="relative w-11 h-11 rounded-full bg-gradient-to-tr from-amber-700 to-yellow-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
            ${partnerName.charAt(0).toUpperCase()}
            ${isUnread ? `<span class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-brass-400 text-ink border-2 border-[#181512] flex items-center justify-center text-[8px] font-black shadow-md animate-pulse">!</span>` : ""}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-0.5">
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-xs ${isUnread ? "font-extrabold text-surface" : "font-bold text-surface/90"} group-hover:text-brass-300 transition-colors truncate">${partnerName}</span>
                ${isUnread ? `<span class="px-1.5 py-0.2 rounded-full bg-brass-400/20 border border-brass-400/40 text-brass-300 text-[9px] font-bold uppercase tracking-wider">Baru</span>` : ""}
              </div>
              <div class="flex items-center gap-1.5 flex-shrink-0">
                <span class="text-[10px] ${isUnread ? "text-brass-300 font-semibold" : "text-surface/50"} font-mono">${lastMsg.time || ""}</span>
                ${isUnread ? `<span class="w-2 h-2 rounded-full bg-brass-400 shadow-sm animate-pulse"></span>` : ""}
              </div>
            </div>
            <div class="text-[11px] text-brass-300/80 truncate mb-1">
              ${th.commission ? `🎨 ${th.commission.title || "Pesanan Kriya Kustom"}` : `🛍️ ${prod.name || "Diskusi Produk Lokal"}`}
            </div>
            <p class="text-xs ${isUnread ? "text-surface font-semibold" : "text-surface/60 font-light"} truncate">
              ${lastMsg.text}
            </p>
          </div>
        </div>
      `;
    }).join("");

    listView.querySelectorAll("[data-thread-id]").forEach((row) => {
      row.addEventListener("click", () => {
        const id = row.dataset.threadId;
        showConversationView(id);
      });
    });
  }

  function showConversationView(threadId) {
    activeThreadId = threadId;
    const listView = document.getElementById("chat-threads-list-view");
    const convView = document.getElementById("chat-conversation-view");
    const backBtn = document.getElementById("chat-btn-back-to-list");
    const titleEl = document.getElementById("chat-active-partner-title");

    if (listView) listView.classList.add("hidden");
    if (convView) {
      convView.classList.remove("hidden");
      convView.classList.add("flex");
    }
    if (backBtn) backBtn.classList.remove("hidden");

    const threads = getStoredThreads();
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) {
      showThreadsListView();
      return;
    }

    const currentUser = getCurrentUser();
    const myEmail = (currentUser ? currentUser.email : "").toLowerCase();
    const partnerEmail = thread.participant1.toLowerCase() === myEmail ? thread.participant2 : thread.participant1;
    const partnerName = (thread.participantNames && thread.participantNames[partnerEmail]) || partnerEmail.split("@")[0];

    // Tandai thread ini sebagai sudah dibaca untuk akun aktif
    if (myEmail) {
      if (!thread.readBy) thread.readBy = {};
      thread.readBy[myEmail] = true;
      saveThreads(threads);
      updateNavbarChatBadge();
    }

    if (titleEl) {
      titleEl.innerHTML = `<span class="text-brass-300 font-bold">${partnerName}</span> <span class="text-[10px] text-surface/40 font-mono">(${partnerEmail})</span>`;
    }

    // Set Product Header if exists
    const prodHeader = document.getElementById("chat-product-context-header");
    if (thread.product && thread.product.name) {
      prodHeader.classList.remove("hidden");
      prodHeader.classList.add("flex");
      document.getElementById("chat-context-prod-name").textContent = thread.product.name;
      document.getElementById("chat-context-prod-price").textContent = thread.product.price || "";
      if (thread.product.image) {
        document.getElementById("chat-context-prod-img").src = thread.product.image;
      }
      const prodLink = document.getElementById("chat-context-prod-link");
      prodLink.href = `detail-produk.html?id=${thread.product.id}`;
    } else {
      prodHeader.classList.add("hidden");
      prodHeader.classList.remove("flex");
    }

    // Set Commission Header & Deal Agreement Controls if exists
    const commHeader = document.getElementById("chat-commission-context-header");
    const dealPanel = document.getElementById("chat-deal-form-panel");
    if (thread.commission && thread.commission.title) {
      if (commHeader) {
        commHeader.classList.remove("hidden");
        commHeader.classList.add("flex");
        document.getElementById("chat-comm-title").textContent = thread.commission.title;
        document.getElementById("chat-comm-craft-badge").textContent = thread.commission.craftType || "Kriya";
        document.getElementById("chat-comm-budget").textContent = thread.commission.budget || "-";
        document.getElementById("chat-comm-deadline").textContent = thread.commission.deadline || "-";
        document.getElementById("chat-comm-color").textContent = thread.commission.color || "-";
        document.getElementById("chat-comm-region").textContent = thread.commission.region || "-";

        // Ambil data commission master terkini dari store
        const masterComm = window.WARISARA_COMMISSIONS ? window.WARISARA_COMMISSIONS.getById(thread.commission.id) : null;
        if (masterComm) {
          thread.commission.status = masterComm.status || thread.commission.status || "open";
          thread.commission.agreedUsers = masterComm.agreedUsers || thread.commission.agreedUsers || [];
          if (masterComm.dealInfo) {
            thread.commission.dealPrice = masterComm.dealInfo.price || thread.commission.dealPrice;
            thread.commission.dealDuration = masterComm.dealInfo.duration || thread.commission.dealDuration;
            thread.commission.dealTerms = masterComm.dealInfo.terms || thread.commission.dealTerms;
          }
        }

        thread.commission.agreedUsers = Array.isArray(thread.commission.agreedUsers) ? thread.commission.agreedUsers : [];

        const myEmail = (currentUser ? currentUser.email : "").toLowerCase();
        const p1Email = (thread.participant1 || "").toLowerCase();
        const p2Email = (thread.participant2 || "").toLowerCase();
        const otherEmail = (myEmail === p1Email) ? p2Email : p1Email;
        const myName = (thread.participantNames && thread.participantNames[myEmail]) || (currentUser ? currentUser.name : "Anda");
        const otherName = (thread.participantNames && thread.participantNames[otherEmail]) || "Rekan Diskusi";

        const hasMyAgreed = thread.commission.agreedUsers.map(e => e.toLowerCase()).includes(myEmail);
        const hasOtherAgreed = thread.commission.agreedUsers.map(e => e.toLowerCase()).includes(otherEmail);
        const isBothAgreed = thread.commission.status === "agreed" || (hasMyAgreed && hasOtherAgreed);

        const statusBadge = document.getElementById("chat-comm-status-badge");
        const dealBtn = document.getElementById("chat-btn-toggle-deal-form");
        const dealBtnLabel = document.getElementById("chat-deal-btn-label");

        // 1. Status Badge: HANYA ADA 2 STATUS ("Masih Terbuka" atau "Sudah Deal")
        if (statusBadge) {
          if (isBothAgreed) {
            statusBadge.textContent = "Sudah Deal";
            statusBadge.className = "px-2 py-0.5 rounded-full text-[9px] font-bold bg-brass-400/20 text-brass-300 border border-brass-400/40";
          } else {
            statusBadge.textContent = "Masih Terbuka";
            statusBadge.className = "px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
          }
        }

        // 2. Tombol Deal State
        if (dealBtn && dealBtnLabel) {
          if (isBothAgreed) {
            dealBtnLabel.textContent = "Sudah Deal (Resmi)";
            dealBtn.className = "text-[10px] px-3 py-1.5 rounded-full bg-brass-400/20 text-brass-300 border border-brass-400/40 font-bold whitespace-nowrap shadow flex items-center gap-1 flex-shrink-0 cursor-pointer";
          } else if (hasMyAgreed && !hasOtherAgreed) {
            dealBtnLabel.textContent = "Menunggu Lawan (1/2)";
            dealBtn.className = "text-[10px] px-3 py-1.5 rounded-full bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold whitespace-nowrap shadow flex items-center gap-1 flex-shrink-0 cursor-pointer";
          } else if (!hasMyAgreed && hasOtherAgreed) {
            dealBtnLabel.textContent = "Konfirmasi Deal (1/2)";
            dealBtn.className = "text-[10px] px-3 py-1.5 rounded-full bg-emerald-500 text-ink font-extrabold hover:bg-emerald-400 transition-all whitespace-nowrap shadow-lg flex items-center gap-1 flex-shrink-0 cursor-pointer animate-pulse";
          } else {
            dealBtnLabel.textContent = "Sepakati Pesanan (Deal)";
            dealBtn.className = "text-[10px] px-3 py-1.5 rounded-full bg-brass-400 text-ink font-bold hover:bg-brass-300 transition-all whitespace-nowrap shadow flex items-center gap-1 flex-shrink-0 cursor-pointer";
          }
        }

        // 3. Render Dinamis Isi Deal Panel
        function renderDealPanelContent() {
          if (!dealPanel) return;

          let statusHtml = "";
          if (isBothAgreed) {
            statusHtml = `
              <div class="p-3 rounded-xl bg-brass-400/10 border border-brass-400/30 text-xs text-brass-200 space-y-1">
                <div class="flex items-center gap-1.5 font-bold text-brass-300">
                  <span class="material-symbols-outlined text-sm">verified</span>
                  <span>Kesepakatan Resmi Telah Tercapai (Sudah Deal)</span>
                </div>
                <p class="text-[11px] text-surface/75">Kedua belah pihak (${myName} dan ${otherName}) telah sama-sama mengklik tombol Deal.</p>
                <div class="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                  <div><span class="text-surface/40">Harga Final:</span> <strong class="text-brass-300">${thread.commission.dealPrice || thread.commission.budget}</strong></div>
                  <div><span class="text-surface/40">Durasi:</span> <span class="text-surface/90">${thread.commission.dealDuration || thread.commission.deadline}</span></div>
                  <div class="col-span-2"><span class="text-surface/40">Ketentuan:</span> <span class="text-surface/80">${thread.commission.dealTerms || "Sesuai kesepakatan obrolan"}</span></div>
                </div>
              </div>
              <div class="flex justify-end pt-1">
                <button type="button" id="chat-deal-btn-cancel" class="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-surface text-xs font-semibold">Tutup</button>
              </div>
            `;
          } else if (hasMyAgreed && !hasOtherAgreed) {
            statusHtml = `
              <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
                <div class="flex items-center gap-1.5 font-bold text-amber-300">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  <span>Menunggu Konfirmasi dari ${otherName} (1/2 Pihak)</span>
                </div>
                <p class="text-[11px] text-surface/80 leading-relaxed">
                  Anda telah mengklik tombol Deal dan menyetujui rincian pesanan ini. Status pesanan <strong>Masih Terbuka</strong> sampai <strong>${otherName}</strong> juga menekan tombol Deal dari pihak mereka.
                </p>
                <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] space-y-0.5">
                  <div><span class="text-surface/40">Harga Final:</span> <strong class="text-brass-300">${thread.commission.dealPrice || "-"}</strong></div>
                  <div><span class="text-surface/40">Estimasi Durasi:</span> <span class="text-surface/90">${thread.commission.dealDuration || "-"}</strong></div>
                  <div><span class="text-surface/40">Ketentuan:</span> <span class="text-surface/80">${thread.commission.dealTerms || "-"}</strong></div>
                </div>
              </div>
              <div class="flex items-center justify-between pt-1">
                <button type="button" id="chat-deal-btn-revoke" class="text-[11px] text-red-300 hover:text-red-200 underline">Batalkan Persetujuan Saya</button>
                <button type="button" id="chat-deal-btn-cancel" class="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-surface text-xs">Tutup</button>
              </div>
            `;
          } else if (!hasMyAgreed && hasOtherAgreed) {
            statusHtml = `
              <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 space-y-2">
                <div class="flex items-center gap-1.5 font-bold text-emerald-300">
                  <span class="material-symbols-outlined text-sm">handshake</span>
                  <span>${otherName} Telah Mengklik Tombol Deal!</span>
                </div>
                <p class="text-[11px] text-surface/80 leading-relaxed">
                  ${otherName} telah menyetujui kesepakatan pesanan kriya ini dengan rincian berikut. Untuk meresmikan status pesanan menjadi <strong>Sudah Deal</strong>, silakan klik tombol setujui di bawah:
                </p>
                <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] space-y-0.5">
                  <div><span class="text-surface/40">Harga Final:</span> <strong class="text-brass-300">${thread.commission.dealPrice || thread.commission.budget}</strong></div>
                  <div><span class="text-surface/40">Estimasi Durasi:</span> <span class="text-surface/90">${thread.commission.dealDuration || thread.commission.deadline}</span></div>
                  <div><span class="text-surface/40">Ketentuan:</span> <span class="text-surface/80">${thread.commission.dealTerms || "Pembayaran langsung via transfer"}</span></div>
                </div>
              </div>
              <div class="flex items-center justify-end gap-2 pt-1">
                <button type="button" id="chat-deal-btn-cancel" class="px-3 py-1.5 rounded-full text-xs text-surface/60 hover:text-surface">Nanti Saja</button>
                <button type="button" id="chat-deal-btn-submit" class="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-ink text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all">
                  <span class="material-symbols-outlined text-xs font-bold">check_circle</span>
                  <span>Saya Setuju & Resmikan Deal</span>
                </button>
              </div>
            `;
          } else {
            statusHtml = `
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <div class="flex items-center gap-1.5 text-xs font-bold text-brass-300">
                  <span class="material-symbols-outlined text-sm text-brass-400">handshake</span>
                  <span>Formulir Kesepakatan Pesanan (Deal)</span>
                </div>
                <button type="button" id="chat-btn-close-deal-panel" class="text-surface/40 hover:text-surface text-xs">✕</button>
              </div>
              <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-surface/75 space-y-1">
                <div class="font-semibold text-brass-300">Aturan Konsensus Dua Pihak:</div>
                <p class="leading-relaxed">Sistem baru akan mengidentifikasi pesanan ini <strong>Sudah Deal</strong> jika <strong>Anda dan ${otherName}</strong> sama-sama telah mengklik tombol Deal. Jika baru salah satu, status tetap <strong>Masih Terbuka</strong>.</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                <div>
                  <label class="block text-surface/70 font-semibold mb-0.5">Harga Final Disepakati (Rp) *</label>
                  <input type="number" id="chat-deal-input-price" value="${thread.commission.dealPrice ? parseInt(thread.commission.dealPrice.replace(/\D/g, '')) || '' : ''}" placeholder="Contoh: 1850000" class="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-surface text-xs focus:outline-none focus:border-brass-400" />
                </div>
                <div>
                  <label class="block text-surface/70 font-semibold mb-0.5">Estimasi Durasi Pengerjaan *</label>
                  <input type="text" id="chat-deal-input-duration" value="${thread.commission.dealDuration || thread.commission.deadline || ''}" placeholder="Contoh: 18 Hari Kerja" class="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-surface text-xs focus:outline-none focus:border-brass-400" />
                </div>
              </div>
              <div>
                <label class="block text-surface/70 font-semibold mb-0.5 text-[10px]">Ketentuan Pengiriman & Pembayaran</label>
                <input type="text" id="chat-deal-input-terms" value="${thread.commission.dealTerms || ''}" placeholder="Contoh: DP 50% transfer BCA, pelunasan sebelum kirim ekspedisi" class="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-surface text-xs focus:outline-none focus:border-brass-400" />
              </div>
              <div class="flex items-center justify-end gap-2 pt-1">
                <button type="button" id="chat-deal-btn-cancel" class="px-3 py-1 rounded-full text-[10px] text-surface/60 hover:text-surface transition-colors">Batal</button>
                <button type="button" id="chat-deal-btn-submit" class="px-4 py-1.5 rounded-full bg-brass-400 hover:bg-brass-300 text-ink text-[11px] font-bold flex items-center gap-1 shadow-md transition-all">
                  <span class="material-symbols-outlined text-xs font-bold">check</span>
                  <span>Setujui Deal dari Pihak Saya</span>
                </button>
              </div>
            `;
          }

          dealPanel.innerHTML = statusHtml;

          // Event Listeners for Deal Panel
          const closeBtn = document.getElementById("chat-btn-close-deal-panel");
          const cancelBtn = document.getElementById("chat-deal-btn-cancel");
          const revokeBtn = document.getElementById("chat-deal-btn-revoke");
          const submitBtn = document.getElementById("chat-deal-btn-submit");

          if (closeBtn) closeBtn.onclick = () => dealPanel.classList.add("hidden");
          if (cancelBtn) cancelBtn.onclick = () => dealPanel.classList.add("hidden");

          if (revokeBtn) {
            revokeBtn.onclick = () => {
              if (window.WARISARA_COMMISSIONS) {
                window.WARISARA_COMMISSIONS.cancelDeal(thread.commission.id, myEmail);
              }
              thread.commission.agreedUsers = (thread.commission.agreedUsers || []).filter(e => e.toLowerCase() !== myEmail);
              thread.commission.status = "open";

              const now = new Date();
              const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
              thread.messages.push({
                id: "msg_deal_revoke_" + Date.now(),
                sender: "system",
                text: `Persetujuan Deal dibatalkan oleh ${myName}. Status pesanan tetap Masih Terbuka.`,
                time: timeStr,
                timestamp: Date.now(),
                isDealNotice: true
              });
              saveThreads(threads);
              showConversationView(thread.id);
            };
          }

          if (submitBtn) {
            submitBtn.onclick = () => {
              let formattedPrice = thread.commission.dealPrice;
              let duration = thread.commission.dealDuration;
              let terms = thread.commission.dealTerms;

              const priceInput = document.getElementById("chat-deal-input-price");
              const durationInput = document.getElementById("chat-deal-input-duration");
              const termsInput = document.getElementById("chat-deal-input-terms");

              if (priceInput && durationInput) {
                const rawPrice = priceInput.value.trim();
                duration = durationInput.value.trim();
                terms = (termsInput && termsInput.value.trim()) || "Pembayaran langsung via transfer";

                if (!rawPrice || !duration) {
                  alert("Mohon isi nominal harga final yang disepakati dan estimasi durasi pengerjaan.");
                  return;
                }
                formattedPrice = "Rp " + Number(rawPrice).toLocaleString("id-ID");
              }

              formattedPrice = formattedPrice || thread.commission.budget;
              duration = duration || thread.commission.deadline || "Sesuai diskusi";
              terms = terms || "Pembayaran langsung via transfer";

              thread.commission.dealPrice = formattedPrice;
              thread.commission.dealDuration = duration;
              thread.commission.dealTerms = terms;

              // Panggil confirmDeal di WARISARA_COMMISSIONS
              let res = { isFinalDeal: false };
              if (window.WARISARA_COMMISSIONS && typeof window.WARISARA_COMMISSIONS.confirmDeal === "function") {
                res = window.WARISARA_COMMISSIONS.confirmDeal(thread.commission.id, myEmail, {
                  price: formattedPrice,
                  duration: duration,
                  terms: terms
                });
              }

              thread.commission.agreedUsers = thread.commission.agreedUsers || [];
              if (!thread.commission.agreedUsers.map(e => e.toLowerCase()).includes(myEmail)) {
                thread.commission.agreedUsers.push(myEmail);
              }

              const now = new Date();
              const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

              if (res.isFinalDeal) {
                // KEDUA PIHAK SUDAH KLIK DEAL
                thread.commission.status = "agreed";
                const dealMsg = {
                  id: "msg_deal_final_" + Date.now(),
                  sender: "system",
                  text: `KESEPAKATAN RESMI TERCAPAI (SUDAH DEAL)!\n\nKedua belah pihak (${myName} dan ${otherName}) telah sama-sama mengonfirmasi persetujuan tombol Deal.\n\n• Karya: ${thread.commission.title}\n• Harga Final: ${formattedPrice}\n• Estimasi Pengerjaan: ${duration}\n• Ketentuan: ${terms}\n\nPesanan kriya ini resmi berstatus SUDAH DEAL.`,
                  time: timeStr,
                  timestamp: Date.now(),
                  isDealNotice: true
                };
                thread.messages.push(dealMsg);
                if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.showToast === "function") {
                  window.WARISARA_AUTH.showToast("Kedua pihak telah sepakat! Status pesanan resmi menjadi Sudah Deal.");
                }
              } else {
                // BARU SATU PIHAK YANG KLIK DEAL
                thread.commission.status = "open";
                const dealMsg = {
                  id: "msg_deal_half_" + Date.now(),
                  sender: "system",
                  text: `PERSETUJUAN DEAL DIAJUKAN (1/2 PIHAK)\n\n• Disetujui oleh: ${myName}\n• Harga yang Disepakati: ${formattedPrice}\n• Estimasi Pengerjaan: ${duration}\n• Ketentuan: ${terms}\n\nStatus pesanan MASIH TERBUKA. Sistem baru akan mengidentifikasi pesanan ini SUDAH DEAL setelah ${otherName} juga mengklik tombol Deal.`,
                  time: timeStr,
                  timestamp: Date.now(),
                  isDealNotice: true
                };
                thread.messages.push(dealMsg);
                if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.showToast === "function") {
                  window.WARISARA_AUTH.showToast(`Persetujuan dicatat. Menunggu persetujuan dari ${otherName}.`);
                }
              }

              thread.lastUpdate = Date.now();
              saveThreads(threads);
              showConversationView(thread.id);
            };
          }
        }

        renderDealPanelContent();

        if (dealBtn) {
          dealBtn.onclick = () => {
            if (dealPanel) {
              dealPanel.classList.toggle("hidden");
              renderDealPanelContent();
            }
          };
        }
      }
    } else {
      if (commHeader) {
        commHeader.classList.add("hidden");
        commHeader.classList.remove("flex");
      }
      if (dealPanel) dealPanel.classList.add("hidden");
    }

    renderMessages(thread);
  }

  function renderMessages(thread) {
    const container = document.getElementById("chat-messages-container");
    if (!container) return;

    const currentUser = getCurrentUser();
    const myEmail = (currentUser ? currentUser.email : "").toLowerCase();

    container.innerHTML = thread.messages.map((m) => {
      const isMe = m.sender && m.sender.toLowerCase() === myEmail;
      return `
        <div class="flex flex-col ${isMe ? "items-end" : "items-start"}">
          <div class="max-w-[85%] sm:max-w-[75%] p-3.5 text-xs sm:text-sm leading-relaxed ${isMe ? "chat-bubble-out" : "chat-bubble-in"}">
            ${m.text}
          </div>
          <div class="flex items-center gap-1.5 mt-1 px-1">
            <span class="text-[10px] text-surface/40">${m.time || ""}</span>
            ${isMe ? '<span class="material-symbols-outlined text-[12px] text-brass-300">done_all</span>' : ""}
          </div>
        </div>
      `;
    }).join("");

    container.scrollTop = container.scrollHeight;
  }

  function sendMessage(text) {
    if (!activeThreadId) return;
    const threads = getStoredThreads();
    const thread = threads.find((t) => t.id === activeThreadId);
    if (!thread) return;

    const currentUser = getCurrentUser();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newMsg = {
      id: "msg_" + Date.now(),
      sender: currentUser.email,
      text: text,
      time: timeStr,
      timestamp: Date.now()
    };

    thread.messages.push(newMsg);
    thread.lastUpdate = Date.now();
    saveThreads(threads);
    playChatChime(false);
    renderMessages(thread);

    // Auto-reply cerdas jika user chat ke penjual demo
    const partnerEmail = thread.participant1.toLowerCase() === currentUser.email.toLowerCase() ? thread.participant2 : thread.participant1;
    simulatePartnerReply(thread, partnerEmail, text);
  }

  function simulatePartnerReply(thread, partnerEmail, userMsg) {
    const typingIndicator = document.getElementById("chat-typing-indicator");
    const typingName = document.getElementById("chat-typing-name");
    const partnerName = (thread.participantNames && thread.participantNames[partnerEmail]) || partnerEmail.split("@")[0];

    if (typingIndicator) {
      typingName.textContent = `${partnerName} sedang mengetik balasan...`;
      typingIndicator.classList.remove("hidden");
      typingIndicator.classList.add("flex");
      const container = document.getElementById("chat-messages-container");
      if (container) container.scrollTop = container.scrollHeight;
    }

    setTimeout(() => {
      if (typingIndicator) {
        typingIndicator.classList.add("hidden");
        typingIndicator.classList.remove("flex");
      }

      // Generate dynamic response
      let replyText = `Halo kak ${getCurrentUser().name}! Terima kasih sudah bertanya mengenai karya kami. `;
      const lower = userMsg.toLowerCase();
      if (lower.includes("ready") || lower.includes("ada") || lower.includes("stok")) {
        replyText += `Karya ini masih tersedia ready stock kak, siap kami kemas dengan aman dan rapi. Boleh tahu mau dikirim ke kota mana?`;
      } else if (lower.includes("nego") || lower.includes("harga") || lower.includes("diskon")) {
        replyText += `Untuk harga kriya tangan fair-trade ini kami bisa berikan potongan khusus 5% jika ambil 2 item sekaligus kak. Bagaimana menurut kakak?`;
      } else if (lower.includes("cod") || lower.includes("kirim") || lower.includes("lokasi")) {
        replyText += `Kami siap kirim via ekspedisi terpercaya (JNE/TIKI/SiCepat) atau COD jika berada di area sentra pengrajin kami kak.`;
      } else if (lower.includes("foto") || lower.includes("video") || lower.includes("kondisi")) {
        replyText += `Tentu kak, serat alami dan detail canting/tenunnya 100% otentik buatan tangan. Barang yang dikirim dijamin sesuai pesanan!`;
      } else {
        replyText += `Bisa banget kak! Transaksi langsung disepakati di sini ya kak. Kami senang bisa berbagi cerita budaya lokal ini dengan kakak.`;
      }

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      const replyMsg = {
        id: "msg_reply_" + Date.now(),
        sender: partnerEmail,
        text: replyText,
        time: timeStr,
        timestamp: Date.now()
      };

      thread.messages.push(replyMsg);
      thread.lastUpdate = Date.now();
      const threads = getStoredThreads();
      const idx = threads.findIndex((t) => t.id === thread.id);
      if (idx !== -1) threads[idx] = thread;
      saveThreads(threads);
      playChatChime(true);

      if (activeThreadId === thread.id) {
        renderMessages(thread);
      }
    }, 1800);
  }

  // Buka room chat langsung untuk produk tertentu
  function openProductChat(product) {
    if (!product) return;

    const currentUser = getCurrentUser();
    if (!currentUser) {
      if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.openAuthModal === "function") {
        window.WARISARA_AUTH.openAuthModal(() => openProductChat(product));
      }
      return;
    }

    const sellerEmail = product.sellerEmail || "dewi.tenun@gmail.com";
    const sellerName = product.maker || "Penjual Produk Lokal";

    // Cek jika user mencoba chat produknya sendiri
    if (currentUser.email.toLowerCase() === sellerEmail.toLowerCase()) {
      alert("Ini adalah produk yang Anda daftarkan sendiri. Silakan beralih akun untuk menguji simulasi obrolan.");
      if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.switchAccountQuick === "function") {
        window.WARISARA_AUTH.switchAccountQuick();
      }
      return;
    }

    const threads = getStoredThreads();
    const myEmail = currentUser.email.toLowerCase();
    const otherEmail = sellerEmail.toLowerCase();

    // Cari thread yang sudah ada dengan penjual ini untuk produk ini
    let thread = threads.find(
      (t) =>
        ((t.participant1.toLowerCase() === myEmail && t.participant2.toLowerCase() === otherEmail) ||
          (t.participant1.toLowerCase() === otherEmail && t.participant2.toLowerCase() === myEmail)) &&
        t.product &&
        t.product.id === product.id
    );

    if (!thread) {
      // Buat thread baru
      const threadId = `thread_${Date.now()}`;
      thread = {
        id: threadId,
        participant1: currentUser.email,
        participant2: sellerEmail,
        participantNames: {
          [currentUser.email]: currentUser.name,
          [sellerEmail]: sellerName
        },
        product: {
          id: product.id,
          name: product.name,
          price: product.priceEstimate || "Rp " + (product.price || 0).toLocaleString("id-ID"),
          origin: product.origin,
          image: product.image
        },
        messages: [
          {
            id: "msg_init_" + Date.now(),
            sender: currentUser.email,
            text: `Halo ${sellerName}, salam hangat! Saya sangat tertarik dengan produk "${product.name}" (${product.priceEstimate}). Apakah stok masih tersedia?`,
            time: "Baru saja",
            timestamp: Date.now()
          }
        ],
        lastUpdate: Date.now()
      };
      threads.unshift(thread);
      saveThreads(threads);
    }

    activeThreadId = thread.id;
    openChatDrawer();
    showConversationView(thread.id);
  }

  // Buka room chat langsung untuk negosiasi Brief Commission
  function openCommissionChat(commission, customInitialMessage) {
    if (!commission) return;

    const currentUser = getCurrentUser();
    if (!currentUser) {
      if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.openAuthModal === "function") {
        window.WARISARA_AUTH.openAuthModal(() => openCommissionChat(commission, customInitialMessage));
      }
      return;
    }

    const creatorEmail = commission.creatorEmail || "pemesan@warisara.id";
    const creatorName = commission.creatorName || "Pemesan Kriya Kustom";

    // Cek jika pembuat brief menekan chat brief miliknya sendiri
    if (currentUser.email.toLowerCase() === creatorEmail.toLowerCase()) {
      if (window.WARISARA_AUTH && typeof window.WARISARA_AUTH.showToast === "function") {
        window.WARISARA_AUTH.showToast("Ini adalah brief yang Anda ajukan. Pengrajin lain akan menghubungi Anda melalui kotak masuk chat ini.");
      }
      openChatDrawer();
      showThreadsListView();
      return;
    }

    const threads = getStoredThreads();
    const myEmail = currentUser.email.toLowerCase();
    const otherEmail = creatorEmail.toLowerCase();

    // Cari thread yang sudah ada terkait commission ini
    let thread = threads.find(
      (t) =>
        ((t.participant1.toLowerCase() === myEmail && t.participant2.toLowerCase() === otherEmail) ||
          (t.participant1.toLowerCase() === otherEmail && t.participant2.toLowerCase() === myEmail)) &&
        t.commission &&
        t.commission.id === commission.id
    );

    if (!thread) {
      const threadId = `thread_comm_${Date.now()}`;
      const defaultText = customInitialMessage ||
        `Halo ${creatorName}, salam budaya! Saya melihat brief pesanan kustom Anda: "${commission.title}". Saya mampu mengerjakannya dengan bahan dan spesifikasi yang Anda harapkan (${commission.size || ""}, palet ${commission.color || ""}). Mari kita bicarakan kesepakatan pengerjaan dan estimasi biayanya!`;

      thread = {
        id: threadId,
        participant1: currentUser.email,
        participant2: creatorEmail,
        participantNames: {
          [currentUser.email]: currentUser.name,
          [creatorEmail]: creatorName
        },
        commission: {
          id: commission.id,
          title: commission.title,
          craftType: commission.craftType,
          budget: commission.budgetDisplay || `Rp ${(commission.budgetMin || 0).toLocaleString("id-ID")}`,
          region: commission.region,
          deadline: commission.deadline,
          color: commission.color,
          size: commission.size,
          description: commission.description,
          status: commission.status || "open"
        },
        messages: [
          {
            id: "msg_comm_init_" + Date.now(),
            sender: currentUser.email,
            text: defaultText,
            time: "Baru saja",
            timestamp: Date.now()
          }
        ],
        lastUpdate: Date.now()
      };
      threads.unshift(thread);
      saveThreads(threads);

      // Tingkatkan hitungan tawaran pada commission
      if (window.WARISARA_COMMISSIONS && typeof window.WARISARA_COMMISSIONS.incrementOffer === "function") {
        window.WARISARA_COMMISSIONS.incrementOffer(commission.id);
      }
    }

    activeThreadId = thread.id;
    openChatDrawer();
    showConversationView(thread.id);
  }

  function updateNavbarChatBadge() {
    const count = getUnreadCount();

    // 1. Tanda Notifikasi di Tombol Profile Avatar Navbar (#nav-profile-trigger)
    const profileBadges = document.querySelectorAll("#nav-profile-chat-badge, .nav-profile-unread-badge");
    profileBadges.forEach((b) => {
      if (count > 0) {
        b.textContent = count;
        b.classList.remove("hidden");
        b.style.display = "flex";
      } else {
        b.classList.add("hidden");
        b.style.display = "none";
      }
    });

    // 2. Tanda Notifikasi di Pop-up Profile Menu (#nav-profile-menu)
    const dropdownBadges = document.querySelectorAll("#nav-dropdown-chat-badge, .nav-dropdown-chat-badge");
    dropdownBadges.forEach((b) => {
      if (count > 0) {
        b.textContent = count;
        b.classList.remove("hidden");
        b.style.display = "inline-flex";
      } else {
        b.classList.add("hidden");
        b.style.display = "none";
      }
    });

    // 3. Tanda Notifikasi legacy
    const badges = document.querySelectorAll(".nav-chat-badge");
    badges.forEach((b) => {
      if (count > 0) {
        b.textContent = count;
        b.classList.remove("hidden");
        b.classList.add("chat-badge-pulse");
      } else {
        b.classList.add("hidden");
        b.classList.remove("chat-badge-pulse");
      }
    });
  }

  function openChatWithSeller(sellerEmail, productId, productName) {
    let product = null;
    if (window.WARISARA_PRODUCTS && typeof window.WARISARA_PRODUCTS.getById === "function") {
      product = window.WARISARA_PRODUCTS.getById(productId);
    }
    if (!product) {
      product = {
        id: productId,
        name: productName || "Produk Kriya",
        sellerEmail: sellerEmail || "dewi.tenun@gmail.com",
        priceEstimate: ""
      };
    }
    openProductChat(product);
  }

  // Expose API Global
  window.WARISARA_CHAT = {
    openDrawer: openChatDrawer,
    closeDrawer: closeChatDrawer,
    toggleDrawer: function () {
      if (chatDrawerEl && chatDrawerEl.classList.contains("open")) {
        closeChatDrawer();
      } else {
        openChatDrawer();
      }
    },
    openProductChat: openProductChat,
    openChatWithSeller: openChatWithSeller,
    openCommissionChat: openCommissionChat,
    showConversation: showConversationView,
    updateNavbarBadge: updateNavbarChatBadge
  };
  window.WARISARA_MARKETPLACE_CHAT = window.WARISARA_CHAT;

  document.addEventListener("DOMContentLoaded", () => {
    initChatDrawerDOM();
    updateNavbarChatBadge();

    // Listener tombol buka chat di navbar atau tombol umum
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".nav-chat-trigger, #nav-chat-toggle-btn");
      if (btn) {
        e.preventDefault();
        window.WARISARA_CHAT.toggleDrawer();
      }
    });
  });
})();
