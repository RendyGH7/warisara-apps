/**
 * WARISARA — Sistem Autentikasi Terintegrasi & Database Pengguna Nusantara
 * Mendukung Registrasi Manual, Login Manual, Google Sign-In Asli,
 * Validasi Ketat, Bebas Duplikasi Akun Demo, dan Isolasi Data Berbasis Email.
 */

(function () {
  const ACTIVE_USER_KEY = "warisara_active_user";
  const USERS_DB_KEY = "warisara_users_db";
  const LEGACY_CUSTOM_KEY = "warisara_custom_google_accounts";

  // 2 Akun Demo Bawaan Resmi (TIDAK PERNAH DIDUPLIKASI)
  const DEFAULT_PRESET_USERS = [
    {
      id: "google-rendy",
      name: "Rendy Pratama",
      email: "rendy.kolektor@gmail.com",
      password: "password123",
      role: "Kolektor & Pegiat Kriya",
      city: "Jakarta Selatan",
      provider: "google",
      avatarColor: "from-amber-600 to-yellow-500",
      avatarLetter: "R"
    },
    {
      id: "google-dewi",
      name: "Mama Dewi Koni",
      email: "dewi.tenun@gmail.com",
      password: "password123",
      role: "Artisan & Penenun Sumba",
      city: "Sumba Timur, NTT",
      provider: "google",
      avatarColor: "from-emerald-700 to-teal-500",
      avatarLetter: "D"
    }
  ];

  let currentUser = null;
  let activeModalMode = "login"; // "login" | "register"

  // --- BERSIHKAN DATA KOTOR & DEDUPLIKASI KETAT ---
  function getCleanUsersDB() {
    let list = [];
    try {
      const raw = localStorage.getItem(USERS_DB_KEY);
      if (raw) {
        list = JSON.parse(raw);
      }
    } catch (e) {
      list = [];
    }

    // Bersihkan akun Joko jika masih tersimpan di cache localStorage
    list = list.filter(
      (u) => u && u.email !== "joko.tembaga@gmail.com" && u.id !== "google-joko"
    );

    // Gabungkan dengan data warisara_custom_google_accounts lama jika ada
    try {
      const legacyRaw = localStorage.getItem(LEGACY_CUSTOM_KEY);
      if (legacyRaw) {
        const legacyList = JSON.parse(legacyRaw);
        if (Array.isArray(legacyList)) {
          list = [...list, ...legacyList.filter(
            (u) => u && u.email !== "joko.tembaga@gmail.com" && u.id !== "google-joko"
          )];
        }
      }
    } catch (e) {}

    // Selalu pastikan 2 preset akun default tersedia
    const combined = [...list, ...DEFAULT_PRESET_USERS];

    // Deduplikasi mutlak berdasarkan email.toLowerCase().trim()
    const unique = [];
    const seen = new Set();
    for (let i = 0; i < combined.length; i++) {
      const item = combined[i];
      if (!item || !item.email) continue;
      const em = item.email.toLowerCase().trim();
      if (!seen.has(em)) {
        seen.add(em);
        unique.push({
          ...item,
          email: em,
          provider: item.provider || (em.endsWith("@gmail.com") ? "google" : "manual"),
          avatarLetter: item.avatarLetter || (item.name ? item.name.charAt(0).toUpperCase() : "U"),
          avatarColor: item.avatarColor || "from-amber-600 to-yellow-500"
        });
      }
    }

    // Bersihkan legacy key dan simpan DB yang sudah bersih
    try {
      localStorage.removeItem(LEGACY_CUSTOM_KEY);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(unique));
    } catch (e) {}

    return unique;
  }

  function saveUsersDB(list) {
    try {
      const unique = [];
      const seen = new Set();
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (!item || !item.email) continue;
        const em = item.email.toLowerCase().trim();
        if (!seen.has(em)) {
          seen.add(em);
          unique.push({
            ...item,
            email: em
          });
        }
      }
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(unique));
    } catch (e) {}
  }

  function findUserByEmail(email) {
    if (!email) return null;
    const clean = email.toLowerCase().trim();
    const db = getCleanUsersDB();
    return db.find((u) => u.email.toLowerCase().trim() === clean) || null;
  }

  function getAllAccounts() {
    return getCleanUsersDB();
  }

  // --- KELOLA ACTIVE USER ---
  function loadActiveUser() {
    try {
      const stored = localStorage.getItem(ACTIVE_USER_KEY);
      if (stored) {
        currentUser = JSON.parse(stored);
        if (currentUser && (currentUser.email === "joko.tembaga@gmail.com" || currentUser.id === "google-joko")) {
          currentUser = null;
          localStorage.removeItem(ACTIVE_USER_KEY);
        }
      } else {
        currentUser = null;
      }
    } catch (e) {
      currentUser = null;
    }
  }

  function saveActiveUser(user) {
    currentUser = user;
    try {
      if (user) {
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(ACTIVE_USER_KEY);
      }
    } catch (e) {}
    dispatchAuthChange();
  }

  function dispatchAuthChange() {
    window.dispatchEvent(new CustomEvent("warisara_auth_changed", { detail: currentUser }));
  }

  function isLoggedIn() {
    return currentUser !== null && typeof currentUser === "object" && !!currentUser.email;
  }

  // --- REGISTRASI MANUAL DENGAN VALIDASI KETAT ---
  function registerManual({ name, email, password, confirmPassword }) {
    const trimmedName = (name || "").trim();
    const cleanEmail = (email || "").toLowerCase().trim();
    const pass = (password || "").trim();
    const confirmPass = (confirmPassword || "").trim();

    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, message: "Nama lengkap wajib diisi minimal 2 karakter." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return { success: false, message: "Format alamat email tidak valid (contoh: nama@email.com)." };
    }

    if (!pass || pass.length < 6) {
      return { success: false, message: "Kata sandi wajib diisi minimal 6 karakter." };
    }

    if (confirmPass && pass !== confirmPass) {
      return { success: false, message: "Konfirmasi kata sandi tidak cocok dengan kata sandi." };
    }

    // CEK APAKAH EMAIL SUDAH TERDAFTAR (MUTLAK DITOLAK JIKA DUPLIKAT)
    const existing = findUserByEmail(cleanEmail);
    if (existing) {
      return {
        success: false,
        code: "EMAIL_EXISTS",
        message: `Email "${cleanEmail}" sudah terdaftar sebelumnya! Anda tidak dapat mendaftar ulang. Silakan pilih tab "Masuk Akun" untuk login.`
      };
    }

    const colors = [
      "from-amber-600 to-yellow-500",
      "from-blue-600 to-indigo-600",
      "from-emerald-700 to-teal-500",
      "from-purple-700 to-pink-600",
      "from-rose-700 to-amber-600"
    ];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const newUser = {
      id: "manual-" + Date.now(),
      name: trimmedName,
      email: cleanEmail,
      password: pass,
      role: "Penjelajah Nusantara",
      city: "Indonesia",
      provider: "manual",
      avatarColor: chosenColor,
      avatarLetter: trimmedName.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString()
    };

    const db = getCleanUsersDB();
    db.unshift(newUser);
    saveUsersDB(db);
    saveActiveUser(newUser);

    return {
      success: true,
      user: newUser,
      message: `Pendaftaran berhasil! Selamat datang di WARISARA, ${trimmedName}.`
    };
  }

  // --- LOGIN MANUAL DENGAN VALIDASI KETAT ---
  function loginManual({ email, password }) {
    const cleanEmail = (email || "").toLowerCase().trim();
    const pass = (password || "").trim();

    if (!cleanEmail) {
      return { success: false, message: "Silakan masukkan alamat email Anda." };
    }

    if (!pass) {
      return { success: false, message: "Silakan masukkan kata sandi Anda." };
    }

    const user = findUserByEmail(cleanEmail);
    if (!user) {
      return {
        success: false,
        code: "USER_NOT_FOUND",
        message: `Email "${cleanEmail}" belum terdaftar dalam sistem. Silakan pilih tab "Daftar Baru" terlebih dahulu.`
      };
    }

    // Periksa kecocokan kata sandi
    if (user.password && user.password !== pass) {
      return {
        success: false,
        code: "WRONG_PASSWORD",
        message: "Kata sandi yang Anda masukkan salah. Silakan periksa kembali."
      };
    }

    saveActiveUser(user);
    return {
      success: true,
      user: user,
      message: `Selamat datang kembali, ${user.name}!`
    };
  }

  // --- LOGIN CEPAT / GANTI AKUN TANPA MENGGANDAKAN PRESET ---
  function loginAs(emailOrAccount) {
    if (!emailOrAccount) return null;

    let targetEmail = "";
    if (typeof emailOrAccount === "string") {
      targetEmail = emailOrAccount.toLowerCase().trim();
    } else if (emailOrAccount.email) {
      targetEmail = emailOrAccount.email.toLowerCase().trim();
    }

    const existing = findUserByEmail(targetEmail);
    if (existing) {
      saveActiveUser(existing);
      return existing;
    }

    // Jika akun baru dari Google
    const rawName = targetEmail.split("@")[0].replace(/[\._]/g, " ");
    const formattedName = rawName.replace(/\b\w/g, (c) => c.toUpperCase());
    const newAccount = {
      id: "google-" + Date.now(),
      name: formattedName,
      email: targetEmail,
      role: "Pengguna Terverifikasi Google",
      city: "Indonesia",
      provider: "google",
      avatarColor: "from-blue-600 to-indigo-600",
      avatarLetter: formattedName.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString()
    };

    const db = getCleanUsersDB();
    db.unshift(newAccount);
    saveUsersDB(db);
    saveActiveUser(newAccount);
    return newAccount;
  }

  // --- REGISTRASI DENGAN GOOGLE ASLI / POPUP ---
  function registerWithGoogle(userData) {
    const rawEmail = (userData.email || "").toLowerCase().trim();
    if (!rawEmail || !rawEmail.includes("@")) {
      return { success: false, message: "Alamat email Google tidak valid." };
    }

    const existing = findUserByEmail(rawEmail);
    if (existing) {
      // Jika sudah ada akun dengan email ini, langsung masuk saja
      saveActiveUser(existing);
      return {
        success: true,
        user: existing,
        isExisting: true,
        message: `Email Google ${rawEmail} sudah terhubung. Anda berhasil masuk!`
      };
    }

    const rawName = userData.name || rawEmail.split("@")[0].replace(/[\._]/g, " ");
    const formattedName = rawName.replace(/\b\w/g, (c) => c.toUpperCase());
    const newAcc = {
      id: "google-" + Date.now(),
      name: formattedName,
      email: rawEmail,
      role: "Pengguna Terverifikasi Google",
      city: userData.city || "Indonesia",
      provider: "google",
      avatarColor: userData.avatarColor || "from-amber-600 to-yellow-500",
      avatarLetter: formattedName.charAt(0).toUpperCase(),
      avatarUrl: userData.picture || userData.avatarUrl || null,
      createdAt: new Date().toISOString()
    };

    const db = getCleanUsersDB();
    db.unshift(newAcc);
    saveUsersDB(db);
    saveActiveUser(newAcc);

    return {
      success: true,
      user: newAcc,
      isExisting: false,
      message: `Selamat datang ${newAcc.name}! Akun Google Anda berhasil terdaftar.`
    };
  }

  function logout() {
    saveActiveUser(null);
    showAuthToast("Anda telah keluar dari akun.");
  }

  // --- ISOLASI DATA PENGGUNA BERBASIS EMAIL ---
  function getUserStorageKey(baseKey) {
    if (currentUser && currentUser.email) {
      return baseKey + "_" + currentUser.email.toLowerCase().trim();
    }
    return baseKey;
  }

  function getUserData(baseKey, defaultVal) {
    try {
      const key = getUserStorageKey(baseKey);
      const val = localStorage.getItem(key);
      if (val !== null) return JSON.parse(val);
      // Fallback data umum jika belum login
      const baseVal = localStorage.getItem(baseKey);
      return baseVal !== null ? JSON.parse(baseVal) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  function setUserData(baseKey, val) {
    try {
      const key = getUserStorageKey(baseKey);
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  // --- MODAL GOOGLE AUTH GLOBAL ---
  function openGoogleAuthPopup(mode = "login") {
    if (typeof window.openGooglePickerModal === "function") {
      window.openGooglePickerModal(mode);
      return;
    }
    if (typeof openGoogleAuthModal === "function") {
      openGoogleAuthModal(mode);
      return;
    }
    const accounts = getAllAccounts();
    loginAs(accounts[0]);
  }

  function openGoogleAuthModal(mode = "login", callback, triggerEl) {
    activeModalMode = mode;
    let modal = document.getElementById("google-auth-modal");
    if (!modal) {
      createAuthModalDOM();
      modal = document.getElementById("google-auth-modal");
    }

    if (modal) {
      switchModalTab(mode);
      renderAccountLists(callback);

      const card = modal.querySelector(".auth-modal-dialog, .relative") || modal.firstElementChild;
      if (window.WARISARA_POPUP && window.WARISARA_POPUP.open) {
        window.WARISARA_POPUP.open(modal, card, triggerEl);
      } else {
        modal.classList.remove("hidden");
        modal.style.display = "flex";
      }
      document.body.style.overflow = "hidden";
    }
  }

  function closeAuthModal() {
    const modal = document.getElementById("google-auth-modal");
    if (modal) {
      const card = modal.querySelector(".auth-modal-dialog, .relative") || modal.firstElementChild;
      const finish = () => {
        document.body.style.overflow = "";
      };
      if (window.WARISARA_POPUP && window.WARISARA_POPUP.close) {
        window.WARISARA_POPUP.close(modal, card, finish);
      } else {
        modal.classList.add("hidden");
        modal.style.display = "none";
        finish();
      }
    }
  }

  function switchModalTab(mode) {
    activeModalMode = mode;
    const loginTabBtn = document.getElementById("auth-tab-btn-login");
    const regTabBtn = document.getElementById("auth-tab-btn-register");
    const loginPanel = document.getElementById("auth-panel-login");
    const regPanel = document.getElementById("auth-panel-register");

    if (!loginTabBtn || !regTabBtn || !loginPanel || !regPanel) return;

    if (mode === "register") {
      loginTabBtn.className =
        "flex-1 py-2 rounded-xl text-surface/70 hover:text-surface transition-all flex items-center justify-center gap-1.5 text-xs font-semibold";
      regTabBtn.className =
        "flex-1 py-2 rounded-xl bg-brass-400 text-ink shadow font-bold transition-all flex items-center justify-center gap-1.5 text-xs";
      loginPanel.classList.add("hidden");
      regPanel.classList.remove("hidden");
    } else {
      loginTabBtn.className =
        "flex-1 py-2 rounded-xl bg-brass-400 text-ink shadow font-bold transition-all flex items-center justify-center gap-1.5 text-xs";
      regTabBtn.className =
        "flex-1 py-2 rounded-xl text-surface/70 hover:text-surface transition-all flex items-center justify-center gap-1.5 text-xs font-semibold";
      loginPanel.classList.remove("hidden");
      regPanel.classList.add("hidden");
    }
  }

  function renderAccountLists(callback) {
    const all = getAllAccounts();
    const loginListEl = document.getElementById("auth-preset-accounts-list");
    if (loginListEl) {
      loginListEl.innerHTML = all
        .map(
          (acc) => `
        <button type="button" data-auth-email="${acc.email}"
                class="auth-account-row w-full p-2.5 rounded-2xl bg-white/[0.03] hover:bg-brass-400/15 border border-white/10 hover:border-brass-400/40 transition-all flex items-center justify-between text-left group">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr ${acc.avatarColor || "from-amber-600 to-yellow-500"} text-white font-bold text-xs flex items-center justify-center shadow-md flex-shrink-0">
              ${acc.avatarLetter || acc.name.charAt(0).toUpperCase()}
            </div>
            <div class="overflow-hidden">
              <div class="text-xs font-semibold text-surface group-hover:text-brass-300 transition-colors flex items-center gap-1.5">
                <span class="truncate">${acc.name}</span>
                ${currentUser && currentUser.email === acc.email ? '<span class="px-1.5 py-0.2 rounded text-[8px] bg-brass-400/20 text-brass-300 font-bold uppercase">Aktif</span>' : ""}
              </div>
              <div class="text-[11px] text-surface/60 font-mono truncate">${acc.email}</div>
            </div>
          </div>
          <span class="material-symbols-outlined text-surface/40 group-hover:text-brass-300 transition-all text-sm group-hover:translate-x-1">arrow_forward</span>
        </button>
      `
        )
        .join("");

      loginListEl.querySelectorAll("[data-auth-email]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const email = btn.dataset.authEmail;
          loginAs(email);
          closeAuthModal();
          showAuthToast(`Berhasil masuk sebagai ${email}`);
          if (typeof callback === "function") callback(currentUser);
        });
      });
    }
  }

  function createAuthModalDOM() {
    const div = document.createElement("div");
    div.id = "google-auth-modal";
    div.className = "modal-overlay hidden fixed inset-0 z-[99999] bg-black/20 backdrop-blur-md items-center justify-center p-4";
    div.style.display = "none";
    div.innerHTML = `
      <div class="auth-modal-dialog w-full max-w-md bg-[#181512] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div class="p-5 border-b border-white/10 flex items-start justify-between bg-gradient-to-b from-white/5 to-transparent">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg viewBox="0 0 24 24" class="w-6 h-6">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.21v3.13C3.25 21.36 7.32 24 12 24z"/>
                <path fill="#FBBC05" d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.21C.44 8.14 0 9.87 0 12s.44 3.86 1.21 5.4l4.11-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.32 0 3.25 2.64 1.21 6.6l4.11 3.13c.94-2.83 3.58-4.98 6.68-4.98z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-display text-base sm:text-lg font-bold text-surface">Autentikasi WARISARA</h3>
              <p class="text-xs text-surface/60">Akses Eksklusif Pasar Produk Lokal & Budaya</p>
            </div>
          </div>
          <button id="auth-modal-close" class="warisara-modal-close-btn group w-9 h-9 rounded-full bg-[#181512] hover:bg-red-600 hover:border-red-500 text-surface/90 hover:text-white border border-brass-400/40 shadow-2xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.7)] cursor-pointer flex-shrink-0" aria-label="Tutup" title="Tutup">
            <span class="material-symbols-outlined text-lg transition-transform duration-300 ease-out group-hover:rotate-180">close</span>
          </button>
        </div>

        <div class="px-5 pt-4 pb-2 bg-[#181512]">
          <div class="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <button id="auth-tab-btn-login" type="button" class="flex-1 py-2 rounded-xl bg-brass-400 text-ink shadow font-bold transition-all flex items-center justify-center gap-1.5">
              <span>Masuk Akun</span>
            </button>
            <button id="auth-tab-btn-register" type="button" class="flex-1 py-2 rounded-xl text-surface/70 hover:text-surface transition-all flex items-center justify-center gap-1.5 font-semibold">
              <span>Daftar Baru</span>
            </button>
          </div>
        </div>

        <div class="p-5 pt-2 space-y-3.5 max-h-[75vh] overflow-y-auto">
          <div id="auth-panel-login" class="space-y-3">
            <div id="auth-preset-accounts-list" class="space-y-2"></div>
          </div>
          <div id="auth-panel-register" class="hidden space-y-3 text-center py-4">
            <p class="text-xs text-surface/70">Silakan buka halaman registrasi penuh untuk membuat akun manual atau menghubungkan akun Google Anda.</p>
            <a href="${window.location.pathname.includes('/pages/') ? 'login.html?tab=register' : 'pages/login.html?tab=register'}" class="inline-block py-2.5 px-5 rounded-full bg-brass-400 text-ink font-bold text-xs">
              Buka Formulir Pendaftaran Penuh
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(div);
    div.querySelector("#auth-modal-close").addEventListener("click", closeAuthModal);
    div.addEventListener("click", (e) => {
      if (e.target === div) closeAuthModal();
    });

    const tabLogin = div.querySelector("#auth-tab-btn-login");
    const tabReg = div.querySelector("#auth-tab-btn-register");
    if (tabLogin) tabLogin.addEventListener("click", () => switchModalTab("login"));
    if (tabReg) tabReg.addEventListener("click", () => switchModalTab("register"));
  }

  function showAuthToast(msg) {
    if (typeof document === "undefined") return;
    let toast = document.getElementById("auth-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "auth-toast";
      toast.className =
        "fixed bottom-6 right-6 z-[120] px-4 py-3 rounded-2xl bg-[#1c1814] border border-brass-400/40 text-surface text-xs shadow-2xl flex items-center gap-2.5 transition-all duration-300 translate-y-20 opacity-0 pointer-events-none";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span class="material-symbols-outlined text-brass-300 text-sm">check_circle</span>
      <span class="font-medium">${msg}</span>
    `;
    toast.classList.remove("translate-y-20", "opacity-0", "pointer-events-none");
    setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0", "pointer-events-none");
    }, 3500);
  }

  // Bersihkan data awal & muat user aktif
  getCleanUsersDB();
  loadActiveUser();

  // Expose API Global
  window.WARISARA_AUTH = {
    getUser: function () {
      return currentUser;
    },
    isLoggedIn: isLoggedIn,
    getPresets: function () {
      return DEFAULT_PRESET_USERS;
    },
    getAllAccounts: getAllAccounts,
    findUserByEmail: findUserByEmail,
    registerManual: registerManual,
    loginManual: loginManual,
    loginAs: loginAs,
    registerWithGoogle: registerWithGoogle,
    logout: logout,
    openAuthModal: openGoogleAuthModal,
    openGoogleAuthPopup: openGoogleAuthPopup,
    showToast: showAuthToast,
    getUserData: getUserData,
    setUserData: setUserData,
    getUserStorageKey: getUserStorageKey,
    requireAuth: function (callback) {
      if (isLoggedIn()) {
        if (typeof callback === "function") callback(currentUser);
      } else {
        openGoogleAuthModal("login", callback);
      }
    }
  };
})();
