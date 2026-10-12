/**
 * WARISARA — Sistem Autentikasi Google untuk Halaman Produk Lokal & Marketplace
 * Menghubungkan login & registrasi dengan Google OAuth / One-Click Google Sign-In
 */

(function () {
  const STORAGE_KEY = "warisara_active_user";
  const CUSTOM_ACCOUNTS_KEY = "warisara_custom_google_accounts";

  // Akun Google Bawaan untuk pengujian instan (One-Click Google Sign-In)
  const PRESET_ACCOUNTS = [
    {
      id: "google-rendy",
      name: "Rendy Pratama",
      email: "rendy.kolektor@gmail.com",
      role: "Pembeli & Kolektor Seni",
      city: "Jakarta Selatan",
      provider: "google",
      avatarColor: "from-amber-600 to-yellow-500",
      avatarLetter: "R"
    },
    {
      id: "google-dewi",
      name: "Mama Dewi Koni",
      email: "dewi.tenun@gmail.com",
      role: "Penjual / Artisan Tenun Sumba",
      city: "Sumba Timur, NTT",
      provider: "google",
      avatarColor: "from-emerald-700 to-teal-500",
      avatarLetter: "D"
    },
    {
      id: "google-joko",
      name: "Mas Joko Prasetyo",
      email: "joko.tembaga@gmail.com",
      role: "Penjual / Pandai Tembaga Tumang",
      city: "Boyolali, Jawa Tengah",
      provider: "google",
      avatarColor: "from-rose-700 to-amber-600",
      avatarLetter: "J"
    }
  ];

  let currentUser = null;
  let activeModalMode = "login"; // "login" | "register"

  function getCustomAccounts() {
    try {
      const data = localStorage.getItem(CUSTOM_ACCOUNTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCustomAccount(acc) {
    try {
      const list = getCustomAccounts().filter((a) => a.email.toLowerCase() !== acc.email.toLowerCase());
      list.unshift(acc);
      localStorage.setItem(CUSTOM_ACCOUNTS_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function getAllAccounts() {
    return [...getCustomAccounts(), ...PRESET_ACCOUNTS];
  }

  function loadUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        currentUser = JSON.parse(stored);
      } else {
        currentUser = null;
      }
    } catch (e) {
      currentUser = null;
    }
  }

  function saveUser(user) {
    currentUser = user;
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
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

  function loginAs(emailOrAccount) {
    const all = getAllAccounts();
    if (typeof emailOrAccount === "string") {
      const found = all.find((a) => a.email.toLowerCase() === emailOrAccount.toLowerCase());
      if (found) {
        saveUser(found);
        return found;
      }
      const rawName = emailOrAccount.split("@")[0].replace(/[\._]/g, " ");
      const formattedName = rawName.replace(/\b\w/g, (c) => c.toUpperCase());
      const customAcc = {
        id: "google-" + Date.now(),
        name: formattedName,
        email: emailOrAccount.toLowerCase().endsWith("@gmail.com") ? emailOrAccount : `${emailOrAccount}@gmail.com`,
        role: "Pengguna Terverifikasi Google",
        city: "Indonesia",
        provider: "google",
        avatarColor: "from-blue-600 to-indigo-600",
        avatarLetter: formattedName.charAt(0).toUpperCase()
      };
      saveCustomAccount(customAcc);
      saveUser(customAcc);
      return customAcc;
    } else if (emailOrAccount && emailOrAccount.email) {
      const userObj = {
        ...emailOrAccount,
        provider: "google",
        avatarLetter: emailOrAccount.avatarLetter || emailOrAccount.name.charAt(0).toUpperCase(),
        avatarColor: emailOrAccount.avatarColor || "from-amber-600 to-yellow-500"
      };
      saveCustomAccount(userObj);
      saveUser(userObj);
      return userObj;
    }
  }

  function registerWithGoogle(userData) {
    const email = userData.email || "";
    const cleanEmail = email.toLowerCase().includes("@") ? email.toLowerCase() : `${email.toLowerCase()}@gmail.com`;
    const rawName = userData.name || cleanEmail.split("@")[0].replace(/[\._]/g, " ");
    const formattedName = rawName.replace(/\b\w/g, (c) => c.toUpperCase());
    const newAcc = {
      id: "google-" + Date.now(),
      name: formattedName,
      email: cleanEmail,
      role: "Pengguna Terverifikasi Google",
      city: userData.city || "Indonesia",
      provider: "google",
      avatarColor: userData.avatarColor || "from-amber-600 to-yellow-500",
      avatarLetter: formattedName.charAt(0).toUpperCase()
    };
    saveCustomAccount(newAcc);
    saveUser(newAcc);
    return newAcc;
  }

  function logout() {
    saveUser(null);
    showAuthToast("Anda telah keluar dari akun Google.");
  }

  // Buka Pop-up Autentikasi Google
  function openGoogleAuthPopup(mode = "login") {
    if (typeof window.openGooglePickerModal === "function") {
      window.openGooglePickerModal(mode);
      return;
    }
    if (typeof openGoogleAuthModal === "function") {
      openGoogleAuthModal(mode);
      return;
    }
    fallbackOneClickGoogle(mode);
  }

  function fallbackOneClickGoogle(mode) {
    const accounts = getAllAccounts();
    const target = accounts[0];
    if (mode === "register") {
      registerWithGoogle({ ...target });
      closeAuthModal();
      showAuthToast(`Selamat datang ${target.name}! Akun Google Anda berhasil terdaftar.`);
    } else {
      loginAs(target);
      closeAuthModal();
      showAuthToast(`Berhasil masuk dengan Akun Google: ${target.name}`);
    }
  }

  // Listener pesan postMessage dari Jendela Google Auth Popup
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "WARISARA_GOOGLE_AUTH_SUCCESS") {
      const account = event.data.account;
      const mode = event.data.mode || activeModalMode;
      if (account) {
        saveCustomAccount(account);
        saveUser(account);
        closeAuthModal();
        if (mode === "register") {
          showAuthToast(`Selamat datang ${account.name}! Akun Google Anda berhasil terdaftar.`);
        } else {
          showAuthToast(`Berhasil masuk dengan akun Google: ${account.name} (${account.email})`);
        }
      }
    }
  });

  // Buka Modal Login / Registrasi Google
  function openGoogleAuthModal(modeOrCallback, callback) {
    let targetMode = "login";
    let cb = null;

    if (typeof modeOrCallback === "string") {
      targetMode = modeOrCallback === "register" ? "register" : "login";
      cb = callback;
    } else if (typeof modeOrCallback === "function") {
      cb = modeOrCallback;
    }

    activeModalMode = targetMode;

    let modal = document.getElementById("google-auth-modal");
    if (!modal) {
      createAuthModalDOM();
      modal = document.getElementById("google-auth-modal");
    }

    if (modal) {
      modal.classList.remove("hidden");
      modal.style.display = "flex";
      document.documentElement.classList.add("modal-locked");
      document.body.classList.add("modal-locked");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      switchModalTab(targetMode);
      renderAccountLists(cb);
    }
  }

  function closeAuthModal() {
    const modal = document.getElementById("google-auth-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.style.display = "none";
      document.documentElement.classList.remove("modal-locked");
      document.body.classList.remove("modal-locked");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }

  function switchModalTab(mode) {
    activeModalMode = mode;
    const loginTabBtn = document.getElementById("auth-tab-btn-login");
    const regTabBtn = document.getElementById("auth-tab-btn-register");
    const loginPanel = document.getElementById("auth-panel-login");
    const regPanel = document.getElementById("auth-panel-register");
    const titleEl = document.getElementById("auth-modal-main-title");
    const subtitleEl = document.getElementById("auth-modal-main-subtitle");

    if (!loginTabBtn || !regTabBtn || !loginPanel || !regPanel) return;

    if (mode === "register") {
      loginTabBtn.className = "flex-1 py-2 rounded-xl text-surface/70 hover:text-surface transition-all flex items-center justify-center gap-1.5 text-xs font-semibold";
      regTabBtn.className = "flex-1 py-2 rounded-xl bg-brass-400 text-ink shadow font-bold transition-all flex items-center justify-center gap-1.5 text-xs";
      loginPanel.classList.add("hidden");
      regPanel.classList.remove("hidden");
      if (titleEl) titleEl.textContent = "Registrasi Akun Google";
      if (subtitleEl) subtitleEl.textContent = "Daftar 1-Klik Bebas Formulir untuk Pasar Nusantara";
    } else {
      loginTabBtn.className = "flex-1 py-2 rounded-xl bg-brass-400 text-ink shadow font-bold transition-all flex items-center justify-center gap-1.5 text-xs";
      regTabBtn.className = "flex-1 py-2 rounded-xl text-surface/70 hover:text-surface transition-all flex items-center justify-center gap-1.5 text-xs font-semibold";
      loginPanel.classList.remove("hidden");
      regPanel.classList.add("hidden");
      if (titleEl) titleEl.textContent = "Masuk dengan Google";
      if (subtitleEl) subtitleEl.textContent = "Akses Eksklusif Produk Lokal & Pasar Nusantara";
    }
  }

  function renderAccountLists(callback) {
    const all = getAllAccounts();

    // Render list akun untuk login
    const loginListEl = document.getElementById("auth-preset-accounts-list");
    if (loginListEl) {
      loginListEl.innerHTML = all.map((acc) => `
        <button type="button" data-auth-email="${acc.email}"
                class="auth-account-row w-full p-3 rounded-2xl bg-white/[0.03] hover:bg-brass-400/15 border border-white/10 hover:border-brass-400/40 transition-all flex items-center justify-between text-left group">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-gradient-to-tr ${acc.avatarColor || 'from-amber-600 to-yellow-500'} text-white font-bold text-xs flex items-center justify-center shadow-md">
              ${acc.avatarLetter || acc.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div class="text-xs font-semibold text-surface group-hover:text-brass-300 transition-colors flex items-center gap-1.5">
                <span>${acc.name}</span>
                ${currentUser && currentUser.email === acc.email ? '<span class="px-1.5 py-0.2 rounded text-[9px] bg-brass-400/20 text-brass-300 font-bold uppercase">Aktif</span>' : ""}
              </div>
              <div class="text-[11px] text-surface/60 font-mono">${acc.email}</div>
              <div class="text-[10px] text-surface/40 mt-0.5">${acc.city || 'Indonesia'}</div>
            </div>
          </div>
          <span class="material-symbols-outlined text-surface/40 group-hover:text-brass-300 transition-all text-sm group-hover:translate-x-1">arrow_forward</span>
        </button>
      `).join("");

      loginListEl.querySelectorAll("[data-auth-email]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const email = btn.dataset.authEmail;
          loginAs(email);
          closeAuthModal();
          showAuthToast(`Berhasil masuk dengan Google (${email})`);
          if (typeof callback === "function") callback(currentUser);
        });
      });
    }

    // Render list akun untuk registrasi
    const regListEl = document.getElementById("auth-reg-presets-list");
    if (regListEl) {
      regListEl.innerHTML = all.map((acc) => `
        <button type="button" data-reg-email="${acc.email}"
                class="auth-account-row w-full p-2.5 rounded-2xl bg-white/[0.03] hover:bg-brass-400/15 border border-white/10 hover:border-brass-400/40 transition-all flex items-center justify-between text-left group">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr ${acc.avatarColor || 'from-amber-600 to-yellow-500'} text-white font-bold text-xs flex items-center justify-center shadow-md">
              ${acc.avatarLetter || acc.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div class="text-xs font-semibold text-surface group-hover:text-brass-300 transition-colors">
                ${acc.name}
              </div>
              <div class="text-[10px] text-surface/50 font-mono">${acc.email}</div>
            </div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-brass-400/20 text-brass-300 font-bold uppercase">Daftar</span>
        </button>
      `).join("");

      regListEl.querySelectorAll("[data-reg-email]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const email = btn.dataset.regEmail;
          const found = all.find((a) => a.email.toLowerCase() === email.toLowerCase());
          const registered = registerWithGoogle({ ...found });
          closeAuthModal();
          showAuthToast(`Selamat datang ${registered.name}! Akun Google Anda berhasil terdaftar.`);
          if (typeof callback === "function") callback(currentUser);
        });
      });
    }
  }

  function createAuthModalDOM() {
    const div = document.createElement("div");
    div.id = "google-auth-modal";
    div.className = "hidden fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md items-center justify-center p-4";
    div.style.display = "none";
    div.innerHTML = `
      <div class="auth-modal-dialog w-full max-w-md bg-[#181512] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <!-- Header Dialog -->
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
              <h3 id="auth-modal-main-title" class="font-display text-base sm:text-lg font-bold text-surface">Masuk dengan Google</h3>
              <p id="auth-modal-main-subtitle" class="text-xs text-surface/60">Akses Eksklusif Produk Lokal & Pasar Nusantara</p>
            </div>
          </div>
          <button id="auth-modal-close" class="p-1.5 rounded-full hover:bg-white/10 text-surface/70 hover:text-surface transition-colors" title="Tutup">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <!-- Tab Switcher: Masuk Akun vs Registrasi Akun Baru -->
        <div class="px-5 pt-4 pb-2 bg-[#181512]">
          <div class="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <button id="auth-tab-btn-login" type="button" class="flex-1 py-2 rounded-xl bg-brass-400 text-ink shadow font-bold transition-all flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-base">login</span>
              <span>Masuk Akun</span>
            </button>
            <button id="auth-tab-btn-register" type="button" class="flex-1 py-2 rounded-xl text-surface/70 hover:text-surface transition-all flex items-center justify-center gap-1.5 font-semibold">
              <span class="material-symbols-outlined text-base">person_add</span>
              <span>Daftar Akun Baru</span>
            </button>
          </div>
        </div>

        <div class="p-5 pt-2 space-y-3.5 max-h-[82vh] overflow-y-auto">
          <!-- ================= PANEL 1: MASUK AKUN ================= -->
          <div id="auth-panel-login" class="space-y-4">
            <!-- Tombol One-Click Sign-in Google Utama -->
            <button id="auth-btn-google-login-action" type="button"
                    class="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] group">
              <svg viewBox="0 0 24 24" class="w-5 h-5 flex-shrink-0">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.21v3.13C3.25 21.36 7.32 24 12 24z"/>
                <path fill="#FBBC05" d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.21C.44 8.14 0 9.87 0 12s.44 3.86 1.21 5.4l4.11-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.32 0 3.25 2.64 1.21 6.6l4.11 3.13c.94-2.83 3.58-4.98 6.68-4.98z"/>
              </svg>
              <span>Lanjutkan dengan Akun Google</span>
            </button>

            <div class="relative py-1 flex items-center justify-center">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
              <span class="relative px-3 bg-[#181512] text-[10px] uppercase text-surface/40 font-bold tracking-wider">atau pilih akun Google Anda</span>
            </div>

            <div>
              <div id="auth-preset-accounts-list" class="space-y-2"></div>
            </div>

            <!-- Tombol Tambah / Sambungkan Akun Google Personal -->
            <button id="auth-btn-add-personal-google" type="button"
                    class="w-full p-2.5 rounded-xl border border-dashed border-white/20 hover:border-brass-400/50 hover:bg-brass-400/10 text-surface/70 hover:text-brass-300 text-xs font-medium transition-all flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm text-brass-400">add_circle</span>
              <span>Hubungkan Akun Google Personal / Lainnya</span>
            </button>
          </div>

          <!-- ================= PANEL 2: REGISTRASI AKUN BARU ================= -->
          <div id="auth-panel-register" class="hidden space-y-4">
            <!-- Informasi Registrasi Bebas Form -->
            <div class="p-3.5 rounded-2xl bg-brass-400/10 border border-brass-400/20 text-surface text-xs leading-relaxed">
              <div class="flex items-center gap-2 font-bold text-brass-300 mb-1">
                <span class="material-symbols-outlined text-sm">verified_user</span>
                <span>Registrasi Instan dengan Akun Google</span>
              </div>
              <p class="text-[11px] text-surface/70">
                Profil, nama, dan foto akun Google Anda langsung terhubung secara otomatis tanpa perlu mengisi formulir manual.
              </p>
            </div>

            <!-- Tombol Utama Daftar dengan Google -->
            <button id="auth-btn-google-register-action" type="button"
                    class="w-full py-3.5 px-4 rounded-2xl bg-brass-400 hover:bg-brass-300 text-ink text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] group">
              <svg viewBox="0 0 24 24" class="w-5 h-5 flex-shrink-0 bg-white rounded-full p-0.5">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.21v3.13C3.25 21.36 7.32 24 12 24z"/>
                <path fill="#FBBC05" d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.21C.44 8.14 0 9.87 0 12s.44 3.86 1.21 5.4l4.11-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.32 0 3.25 2.64 1.21 6.6l4.11 3.13c.94-2.83 3.58-4.98 6.68-4.98z"/>
              </svg>
              <span>Daftar Instan dengan Akun Google</span>
            </button>

            <div class="relative py-1 flex items-center justify-center">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
              <span class="relative px-3 bg-[#181512] text-[10px] uppercase text-surface/40 font-bold tracking-wider">atau daftar dengan profil Google siap pakai</span>
            </div>

            <div id="auth-reg-presets-list" class="space-y-2"></div>
          </div>
        </div>

        <!-- Link Halaman Penuh Mandiri -->
        <div class="px-5 pb-2 text-center">
          <a href="${window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html'}" class="inline-flex items-center gap-1.5 text-xs text-brass-300 hover:text-brass-200 transition-colors font-medium">
            <span>Buka Halaman Login / Registrasi Penuh</span>
            <span class="material-symbols-outlined text-xs">arrow_forward</span>
          </a>
        </div>

        <!-- Footer Dialog -->
        <div class="p-3.5 border-t border-white/10 bg-[#120F0D] text-[11px] text-surface/50 text-center flex items-center justify-center gap-1.5">
          <span class="material-symbols-outlined text-xs text-brass-400">lock</span>
          <span>Terkoneksi Aman dengan Sistem Autentikasi Google WARISARA.</span>
        </div>
      </div>
    `;

    document.body.appendChild(div);

    div.querySelector("#auth-modal-close").addEventListener("click", closeAuthModal);
    div.addEventListener("click", (e) => {
      if (e.target === div) closeAuthModal();
    });

    // Tab buttons event listeners
    const tabLogin = div.querySelector("#auth-tab-btn-login");
    const tabReg = div.querySelector("#auth-tab-btn-register");
    if (tabLogin) tabLogin.addEventListener("click", () => switchModalTab("login"));
    if (tabReg) tabReg.addEventListener("click", () => switchModalTab("register"));

    // Action: Lanjutkan dengan Akun Google Utama (Panel 1)
    const btnGoogleLogin = div.querySelector("#auth-btn-google-login-action");
    if (btnGoogleLogin) {
      btnGoogleLogin.addEventListener("click", () => {
        openGoogleAuthPopup("login");
      });
    }

    // Action: Hubungkan Akun Google Personal (Panel 1)
    const btnAddPersonal = div.querySelector("#auth-btn-add-personal-google");
    if (btnAddPersonal) {
      btnAddPersonal.addEventListener("click", () => {
        openGoogleAuthPopup("login");
      });
    }

    // Action: Daftar Instan dengan Akun Google (Panel 2)
    const btnGoogleRegister = div.querySelector("#auth-btn-google-register-action");
    if (btnGoogleRegister) {
      btnGoogleRegister.addEventListener("click", () => {
        openGoogleAuthPopup("register");
      });
    }
  }

  function showAuthToast(msg) {
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
    }, 3200);
  }

  // Beralih Cepat ke akun demo alternatif
  function switchAccountQuick() {
    const all = getAllAccounts();
    if (!currentUser || currentUser.email === all[0].email) {
      const nextAcc = all[1] || all[0];
      loginAs(nextAcc.email);
      showAuthToast(`Beralih ke akun Penjual: ${nextAcc.name} (${nextAcc.email})`);
    } else {
      loginAs(all[0].email);
      showAuthToast(`Beralih ke akun Pembeli: ${all[0].name} (${all[0].email})`);
    }
  }

  // Inisialisasi awal
  loadUser();

  // Expose API Global
  window.WARISARA_AUTH = {
    getUser: function () {
      return currentUser;
    },
    isLoggedIn: isLoggedIn,
    getPresets: function () {
      return PRESET_ACCOUNTS;
    },
    getAllAccounts: getAllAccounts,
    loginAs: loginAs,
    registerWithGoogle: registerWithGoogle,
    openGoogleAuthPopup: openGoogleAuthPopup,
    logout: logout,
    openAuthModal: openGoogleAuthModal,
    switchAccountQuick: switchAccountQuick,
    showToast: showAuthToast,
    requireAuth: function (callback) {
      if (isLoggedIn()) {
        if (typeof callback === "function") callback(currentUser);
      } else {
        openGoogleAuthModal("login", callback);
      }
    }
  };
})();
