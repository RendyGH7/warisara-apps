/**
 * WARISARA — Sistem Chat Marketplace C2C (ala Facebook Marketplace)
 * Menghubungkan Pembeli (Email A) dan Penjual (Email B) secara langsung
 * untuk transaksi personal, tanya jawab produk, dan kesepakatan mandiri.
 */

(function () {
  const THREADS_STORAGE_KEY = "warisara_chat_threads";
  let activeThreadId = null;
  let chatDrawerEl = null;

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
      },
      {
        id: "thread_rendy_joko",
        participant1: "rendy.kolektor@gmail.com",
        participant2: "joko.tembaga@gmail.com",
        participantNames: {
          "rendy.kolektor@gmail.com": "Rendy Pratama",
          "joko.tembaga@gmail.com": "Mas Joko Prasetyo (Pandai Tembaga)"
        },
        product: {
          id: "lampu-tumang",
          name: "Lampu Meja Ukir Tembaga Pahat Tangan",
          price: "Rp 680.000",
          origin: "Boyolali, Jawa Tengah",
          image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80"
        },
        messages: [
          {
            id: "msg_j1",
            sender: "rendy.kolektor@gmail.com",
            text: "Mas Joko, untuk lampu tembaga ini apakah sudah termasuk fitting lampu kabel retro-nya?",
            time: "Kemarin",
            timestamp: Date.now() - 86400000
          },
          {
            id: "msg_j2",
            sender: "joko.tembaga@gmail.com",
            text: "Sudah lengkap siap colok Mas Rendy! Menggunakan kabel rajut tembaga dan saklar dimmer kuningan.",
            time: "Kemarin",
            timestamp: Date.now() - 82000000
          }
        ],
        lastUpdate: Date.now() - 82000000
      }
    ];
  }

  function getStoredThreads() {
    try {
      const stored = localStorage.getItem(THREADS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
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
    return {
      email: "rendy.kolektor@gmail.com",
      name: "Rendy Pratama"
    };
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

  // Inisialisasi DOM Drawer Messenger
  function initChatDrawerDOM() {
    if (document.getElementById("warisara-chat-drawer")) return;

    const drawer = document.createElement("div");
    drawer.id = "warisara-chat-drawer";
    drawer.className =
      "closed fixed inset-y-0 right-0 z-[95] w-full max-w-md sm:max-w-lg chat-glass-panel flex flex-col shadow-2xl overflow-hidden font-body";

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
          <span class="text-[10px] text-surface/50 font-mono">P2P Messenger</span>
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

          <!-- Notice Alur Transaksi ala Facebook Marketplace -->
          <div class="mx-4 my-2 p-2.5 rounded-xl bg-forest-900/30 border border-forest-500/30 text-[11px] text-forest-200 flex items-start gap-2">
            <span class="material-symbols-outlined text-sm flex-shrink-0 mt-0.5 text-forest-300">handshake</span>
            <span><strong>Kesepakatan Mandiri:</strong> Diskusikan pengiriman, foto detail, dan pembayaran (transfer/COD) langsung dengan penjual di ruang obrolan ini.</span>
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
    renderActiveView();
  }

  function closeChatDrawer() {
    if (!chatDrawerEl) return;
    chatDrawerEl.classList.remove("open");
    chatDrawerEl.classList.add("closed");
  }

  function renderActiveView() {
    initChatDrawerDOM();
    const currentUser = getCurrentUser();
    const emailDisplay = document.getElementById("chat-header-email-display");
    if (emailDisplay && currentUser) {
      emailDisplay.textContent = `${currentUser.name} (${currentUser.email})`;
    }

    if (activeThreadId) {
      showConversationView(activeThreadId);
    } else {
      showThreadsListView();
    }
    updateNavbarChatBadge();
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
    if (titleEl) titleEl.textContent = "Daftar Percakapan & Transaksi";

    const threads = getUserThreads();
    const currentUser = getCurrentUser();
    const myEmail = (currentUser ? currentUser.email : "").toLowerCase();

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

      return `
        <div data-thread-id="${th.id}"
             class="chat-thread-row p-3.5 rounded-2xl bg-white/[0.03] hover:bg-brass-400/10 border border-white/10 hover:border-brass-400/30 cursor-pointer transition-all flex items-center gap-3 group">
          <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-700 to-yellow-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
            ${partnerName.charAt(0).toUpperCase()}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-0.5">
              <span class="text-xs font-bold text-surface group-hover:text-brass-300 transition-colors truncate">${partnerName}</span>
              <span class="text-[10px] text-surface/50 font-mono">${lastMsg.time || ""}</span>
            </div>
            <div class="text-[11px] text-brass-300/80 truncate mb-1">
              🛍️ ${prod.name || "Diskusi Produk Lokal"}
            </div>
            <p class="text-xs text-surface/60 truncate font-light">
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
      alert("Ini adalah produk yang Anda daftarkan sendiri. Silakan beralih ke akun pembeli untuk mengetes chat dengan penjual ini.");
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

  function updateNavbarChatBadge() {
    const badges = document.querySelectorAll(".nav-chat-badge");
    const count = 2; // Notifikasi aktif
    badges.forEach((b) => {
      b.textContent = count;
      b.classList.remove("hidden");
      b.classList.add("chat-badge-pulse");
    });
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
    showConversation: showConversationView,
    updateNavbarBadge: updateNavbarChatBadge
  };

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
