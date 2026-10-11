/**
 * WARISARA — Sistem Autentikasi Google & Profil Pengguna Marketplace
 * Mendukung simulasi multi-akun (Email A vs Email B) untuk pengujian chat C2C
 */

(function () {
  const STORAGE_KEY = "warisara_active_user";

  // Akun bawaan demo untuk memudahkan pengujian transaksi C2C (Email A <-> Email B)
  const PRESET_ACCOUNTS = [
    {
      id: "user-rendy",
      name: "Rendy Pratama",
      email: "rendy.kolektor@gmail.com",
      role: "Pembeli & Kolektor Seni",
      city: "Jakarta Selatan",
      avatarColor: "from-amber-600 to-yellow-500",
      avatarLetter: "R"
    },
    {
      id: "user-dewi",
      name: "Mama Dewi Koni",
      email: "dewi.tenun@gmail.com",
      role: "Penjual / Artisan Tenun Sumba",
      city: "Sumba Timur, NTT",
      avatarColor: "from-emerald-700 to-teal-500",
      avatarLetter: "D"
    },
    {
      id: "user-joko",
      name: "Mas Joko Prasetyo",
      email: "joko.tembaga@gmail.com",
      role: "Penjual / Pandai Tembaga Tumang",
      city: "Boyolali, Jawa Tengah",
      avatarColor: "from-rose-700 to-amber-600",
      avatarLetter: "J"
    }
  ];

  let currentUser = null;

  function loadUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        currentUser = JSON.parse(stored);
      } else {
        // Default login ke Akun A (Rendy Pratama) agar siap pakai langsung
        currentUser = PRESET_ACCOUNTS[0];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      }
    } catch (e) {
      currentUser = PRESET_ACCOUNTS[0];
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
    updateNavbarAuthUI();
  }

  function loginAs(emailOrAccount) {
    if (typeof emailOrAccount === "string") {
      const found = PRESET_ACCOUNTS.find((a) => a.email.toLowerCase() === emailOrAccount.toLowerCase());
      if (found) {
        saveUser(found);
        return found;
      }
      // Akun kustom
      const customAcc = {
        id: "custom-" + Date.now(),
        name: emailOrAccount.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: emailOrAccount,
        role: "Pengguna Terverifikasi Google",
        city: "Indonesia",
        avatarColor: "from-blue-600 to-indigo-600",
        avatarLetter: emailOrAccount.charAt(0).toUpperCase()
      };
      saveUser(customAcc);
      return customAcc;
    } else if (emailOrAccount && emailOrAccount.email) {
      saveUser(emailOrAccount);
      return emailOrAccount;
    }
  }

  function logout() {
    saveUser(null);
  }

  // Buka Modal Login Google
  function openGoogleAuthModal(callback) {
    let modal = document.getElementById("google-auth-modal");
    if (!modal) {
      createAuthModalDOM();
      modal = document.getElementById("google-auth-modal");
    }

    // Sembunyikan navbar saat fitur login diklik
    document.body.classList.add("auth-modal-open");
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.style.display = "none";
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (mobileDrawer) mobileDrawer.style.display = "none";

    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";

      // Render preset account list
      const listEl = document.getElementById("auth-preset-accounts-list");
      if (listEl) {
        listEl.innerHTML = PRESET_ACCOUNTS.map(
          (acc) => `
          <button type="button" data-auth-email="${acc.email}"
                  class="auth-account-row w-full p-3.5 rounded-2xl bg-white/[0.03] hover:bg-brass-400/15 border border-white/10 hover:border-brass-400/40 transition-all flex items-center justify-between text-left group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr ${acc.avatarColor} text-white font-bold text-sm flex items-center justify-center shadow-md">
                ${acc.avatarLetter}
              </div>
              <div>
                <div class="text-xs font-semibold text-surface group-hover:text-brass-300 transition-colors flex items-center gap-1.5">
                  <span>${acc.name}</span>
                  ${currentUser && currentUser.email === acc.email ? '<span class="px-1.5 py-0.5 rounded text-[9px] bg-brass-400/20 text-brass-300 font-bold uppercase">Aktif</span>' : ""}
                </div>
                <div class="text-[11px] text-surface/60">${acc.email}</div>
                <div class="text-[10px] text-surface/40 mt-0.5">${acc.role} • ${acc.city}</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-surface/40 group-hover:text-brass-300 transition-all text-sm group-hover:translate-x-1">arrow_forward</span>
          </button>
        `
        ).join("");

        listEl.querySelectorAll("[data-auth-email]").forEach((btn) => {
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
  }

  function closeAuthModal() {
    const modal = document.getElementById("google-auth-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    }

    // Tampilkan kembali navbar saat modal ditutup
    document.body.classList.remove("auth-modal-open");
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.style.display = "";
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (mobileDrawer) mobileDrawer.style.display = "";
  }

  function createAuthModalDOM() {
    const div = document.createElement("div");
    div.id = "google-auth-modal";
    div.className = "hidden fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md items-center justify-center p-4";
    div.innerHTML = `
      <div class="w-full max-w-md bg-[#181512] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-modal-enter">
        <div class="p-6 border-b border-border-dark flex items-start justify-between bg-gradient-to-b from-white/5 to-transparent">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" class="w-6 h-6">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.21v3.13C3.25 21.36 7.32 24 12 24z"/>
                <path fill="#FBBC05" d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.21C.44 8.14 0 9.87 0 12s.44 3.86 1.21 5.4l4.11-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.32 0 3.25 2.64 1.21 6.6l4.11 3.13c.94-2.83 3.58-4.98 6.68-4.98z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-display text-lg font-bold text-surface">Masuk dengan Google</h3>
              <p class="text-xs text-surface/60">Pilih akun untuk bertransaksi & berkirim pesan</p>
            </div>
          </div>
          <button id="auth-modal-close" class="p-1.5 rounded-full hover:bg-white/10 text-surface/70 hover:text-surface transition-colors">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-surface/50 block mb-2">Akun Simulasi (Coba Chat Antar Email)</span>
            <div id="auth-preset-accounts-list" class="space-y-2"></div>
          </div>

          <div class="relative py-2 flex items-center justify-center">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
            <span class="relative px-3 bg-[#181512] text-[10px] uppercase text-surface/40 font-bold">atau masuk email lain</span>
          </div>

          <form id="auth-custom-form" class="space-y-3">
            <div>
              <label class="text-[11px] text-surface/70 block mb-1 font-medium">Nama Lengkap</label>
              <input id="auth-custom-name" type="text" placeholder="Contoh: Rian Anggoro" required
                     class="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-surface placeholder:text-surface/30 focus:outline-none focus:border-brass-400" />
            </div>
            <div>
              <label class="text-[11px] text-surface/70 block mb-1 font-medium">Alamat Email Google (@gmail.com)</label>
              <input id="auth-custom-email" type="email" placeholder="nama.anda@gmail.com" required
                     class="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-surface placeholder:text-surface/30 focus:outline-none focus:border-brass-400" />
            </div>
            <button type="submit"
                    class="w-full py-2.5 rounded-xl bg-brass-400 text-ink text-xs font-bold uppercase tracking-wider hover:bg-brass-300 transition-all shadow-md">
              Gunakan Akun Ini
            </button>
          </form>
        </div>

        <div class="p-4 border-t border-border-dark bg-[#120F0D] text-[11px] text-surface/50 text-center">
          🔒 WARISARA menjaga privasi pengguna. Transaksi disepakati langsung antar pihak.
        </div>
      </div>
    `;

    document.body.appendChild(div);

    div.querySelector("#auth-modal-close").addEventListener("click", closeAuthModal);
    div.addEventListener("click", (e) => {
      if (e.target === div) closeAuthModal();
    });

    const form = div.querySelector("#auth-custom-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("auth-custom-name").value.trim();
        const email = document.getElementById("auth-custom-email").value.trim();
        if (name && email) {
          const acc = {
            id: "custom-" + Date.now(),
            name: name,
            email: email,
            role: "Pengguna Terverifikasi Google",
            city: "Indonesia",
            avatarColor: "from-blue-600 to-indigo-600",
            avatarLetter: name.charAt(0).toUpperCase()
          };
          saveUser(acc);
          closeAuthModal();
          showAuthToast(`Berhasil masuk sebagai ${email}`);
        }
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

  // Update navbar user profile button — Desain Simpel & Minimalis (Sesuai Permintaan)
  function updateNavbarAuthUI() {
    const authBtns = document.querySelectorAll(".nav-auth-trigger");
    authBtns.forEach((btn) => {
      btn.className = "nav-auth-trigger btn-nav-icon relative focus:outline-none";
      if (!currentUser) {
        btn.innerHTML = `<span class="material-symbols-outlined text-base">person</span>`;
        btn.title = "Masuk dengan Akun Google";
      } else {
        const letter = (currentUser.avatarLetter || currentUser.name.charAt(0) || "U").toUpperCase();
        btn.innerHTML = `<span class="font-display font-bold text-xs uppercase text-surface">${letter}</span>`;
        btn.title = `Akun: ${currentUser.name} (${currentUser.email}) — Klik untuk opsi akun`;
      }
    });
  }

  // Beralih Cepat ke akun alternatif (Email A <-> Email B)
  function switchAccountQuick() {
    if (!currentUser || currentUser.email === PRESET_ACCOUNTS[0].email) {
      loginAs(PRESET_ACCOUNTS[1].email);
      showAuthToast(`Beralih ke akun Penjual: ${PRESET_ACCOUNTS[1].name} (${PRESET_ACCOUNTS[1].email})`);
    } else {
      loginAs(PRESET_ACCOUNTS[0].email);
      showAuthToast(`Beralih ke akun Pembeli: ${PRESET_ACCOUNTS[0].name} (${PRESET_ACCOUNTS[0].email})`);
    }
  }

  // Inisialisasi awal
  loadUser();

  // Expose API
  window.WARISARA_AUTH = {
    getUser: function () {
      return currentUser;
    },
    getPresets: function () {
      return PRESET_ACCOUNTS;
    },
    loginAs: loginAs,
    logout: logout,
    openAuthModal: openGoogleAuthModal,
    switchAccountQuick: switchAccountQuick,
    showToast: showAuthToast,
    updateUI: updateNavbarAuthUI
  };

  document.addEventListener("DOMContentLoaded", () => {
    updateNavbarAuthUI();
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".nav-auth-trigger");
      if (trigger) {
        e.preventDefault();
        openGoogleAuthModal();
      }
    });
  });
})();
