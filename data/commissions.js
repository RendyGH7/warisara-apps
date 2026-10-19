/**
 * WARISARA — Data & Manajemen Bursa Pesanan Kustom (Commission) Kriya Nusantara
 * Sistem P2P terbuka bagi seluruh anggota komunitas:
 * - 01. Pilih jenis karya (Batik, Tenun, Aksesori, Dekorasi/Ukiran, Kerajinan Lain)
 * - 02. Buat brief pesanan (Anggaran, warna, ukuran, daerah, tenggat waktu)
 * - 03. Sepakati pesanan (Harga final, waktu pengerjaan, pengiriman, pembayaran via chat langsung)
 */

(function () {
  "use strict";

  const STORAGE_KEY = "warisara_commissions";

  // Data demo awal bursa commission yang kaya, otentik, dan realistis
  const INITIAL_COMMISSIONS = [
    {
      id: "comm_tenun_sumba",
      creatorName: "Rendy Pratama",
      creatorEmail: "rendy.kolektor@gmail.com",
      creatorCity: "Jakarta Selatan",
      craftType: "Tenun",
      title: "Kain Tenun Ikat Pewarna Alami Sumba Motif Kuda Savana",
      budgetMin: 1500000,
      budgetMax: 2500000,
      budgetDisplay: "Rp 1.500.000 - Rp 2.500.000",
      color: "Indigo Alami (Nila) & Terakota Mengkudu",
      size: "Panjang 240 cm × Lebar 110 cm",
      region: "Nusa Tenggara Timur",
      provinceId: "nusa-tenggara-timur",
      deadline: "25 Hari Kerja",
      description: "Mencari pengrajin yang menguasai teknik tenun gedogan asli Sumba dengan benang katun pintal tangan. Motif kuda melambangkan keteguhan jiwa, untuk keperluan mahar adat keluarga. Tanpa pewarna kimia.",
      status: "open", // "open" | "negotiating" | "agreed"
      offersCount: 2,
      createdAt: Date.now() - 3600000 * 18,
      dealInfo: null
    },
    {
      id: "comm_batik_sekarjagad",
      creatorName: "Siti Rahmawati",
      creatorEmail: "siti.rahmawati@gmail.com",
      creatorCity: "Surabaya, Jawa Timur",
      craftType: "Batik",
      title: "Kain Panjang Batik Tulis Canting Halus Motif Sekar Jagad Pesisiran",
      budgetMin: 800000,
      budgetMax: 1600000,
      budgetDisplay: "Rp 800.000 - Rp 1.600.000",
      color: "Soga Cokelat Klasik & Biru Babaran Alami",
      size: "2.6 meter × 1.15 meter (Mori Primissima)",
      region: "DI Yogyakarta",
      provinceId: "di-yogyakarta",
      deadline: "20 Hari Kerja",
      description: "Request motif Sekar Jagad dengan goresan cecek dan klowong canting nol yang rapat dan rapi. Dikerjakan bolak-balik (tembus belakang) dengan malam tawon murni untuk busana wisuda tradisi.",
      status: "open",
      offersCount: 3,
      createdAt: Date.now() - 3600000 * 36,
      dealInfo: null
    },
    {
      id: "comm_ukir_jati_jepara",
      creatorName: "Budi Santoso",
      creatorEmail: "budi.santoso@gmail.com",
      creatorCity: "Bandung, Jawa Barat",
      craftType: "Dekorasi",
      title: "Panel Dinding Relief Ukir Kayu Jati Solid Motif Lung-Lungan Klasik",
      budgetMin: 3200000,
      budgetMax: 5000000,
      budgetDisplay: "Rp 3.200.000 - Rp 5.000.000",
      color: "Natural Teakwood Semi-Matte (Finishing Beeswax)",
      size: "Panjang 120 cm × Tinggi 60 cm × Tebal 4 cm",
      region: "Jawa Tengah",
      provinceId: "jawa-tengah",
      deadline: "30 Hari Kerja",
      description: "Pahat ukir kayu jati tua solid tanpa sambungan lem. Relief 3 dimensi motif sulur tumbuhan dan burung merak dengan finishing wax alami tanpa vernis kimia sintetis.",
      status: "open",
      offersCount: 1,
      createdAt: Date.now() - 3600000 * 50,
      dealInfo: null
    },
    {
      id: "comm_aksesori_toraja",
      creatorName: "Andi Saputra",
      creatorEmail: "andi.saputra@gmail.com",
      creatorCity: "Makassar, Sulawesi Selatan",
      craftType: "Aksesori",
      title: "Set Gelang & Kalung Tembaga Tempa Etnik Toraja Ukir Pa'tedong",
      budgetMin: 450000,
      budgetMax: 900000,
      budgetDisplay: "Rp 450.000 - Rp 900.000",
      color: "Tembaga Antik Oksidasi Patina Kehijauan",
      size: "Diameter Gelang 6.5 cm, Kalung 55 cm (Adjustable)",
      region: "Sulawesi Selatan",
      provinceId: "sulawesi-selatan",
      deadline: "14 Hari Kerja",
      description: "Kriya tempa logam tembaga murni dengan ukiran khas kepala kerbau (Pa'tedong). Diinginkan aksen oksidasi patina alami di sela ukiran agar terlihat otentik dan antik.",
      status: "open",
      offersCount: 4,
      createdAt: Date.now() - 3600000 * 12,
      dealInfo: null,
      agreedUsers: []
    },
    {
      id: "comm_topeng_bali",
      creatorName: "Mama Dewi Koni",
      creatorEmail: "dewi.tenun@gmail.com",
      creatorCity: "Sumba Timur, NTT",
      craftType: "Kerajinan Lain",
      title: "Topeng Sakral Pahat Kayu Pule Karakter Panji Alus Tari Klasik",
      budgetMin: 1200000,
      budgetMax: 2000000,
      budgetDisplay: "Rp 1.200.000 - Rp 2.000.000",
      color: "Putih Tulang Alami dengan Sepuhan Prada Emas Murni",
      size: "Ukuran Wajah Dewasa (21 cm × 16 cm)",
      region: "Bali",
      provinceId: "bali",
      deadline: "21 Hari Kerja",
      description: "Dikerjakan dari kayu pule kering tua yang tidak melengkung. Pigmen warna dasar dari bahan alam dengan ornamen prada emas halus pada ukiran mahkota gelung.",
      status: "open",
      offersCount: 2,
      createdAt: Date.now() - 3600000 * 75,
      dealInfo: null,
      agreedUsers: []
    }
  ];

  function getStoredCommissions() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalisasi status hanya ada 2: "open" (Masih Terbuka) atau "agreed" (Sudah Deal)
          parsed.forEach((c) => {
            if (c.status !== "agreed") {
              c.status = "open";
            }
            if (!Array.isArray(c.agreedUsers)) {
              c.agreedUsers = [];
            }
          });
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Gagal memuat bursa commission dari localStorage:", e);
    }
    // Simpan data default pertama kali
    saveCommissions(INITIAL_COMMISSIONS);
    return INITIAL_COMMISSIONS;
  }

  function saveCommissions(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("warisara_commissions_updated", { detail: list }));
    } catch (e) {
      console.error("Gagal menyimpan commission:", e);
    }
  }

  function getAllCommissions() {
    return getStoredCommissions();
  }

  function getCommissionById(id) {
    const list = getAllCommissions();
    return list.find((c) => c.id === id) || null;
  }

  function addCommission(briefData) {
    const list = getAllCommissions();
    const newCommission = {
      id: "comm_" + Date.now(),
      creatorName: briefData.creatorName || "Pengguna Warisara",
      creatorEmail: briefData.creatorEmail || "user@warisara.id",
      creatorCity: briefData.creatorCity || "Nusantara",
      craftType: briefData.craftType || "Kerajinan Lain",
      title: briefData.title || "Pesanan Kriya Kustom",
      budgetMin: Number(briefData.budgetMin) || 0,
      budgetMax: Number(briefData.budgetMax) || 0,
      budgetDisplay: briefData.budgetDisplay || `Rp ${(Number(briefData.budgetMin) || 0).toLocaleString("id-ID")}`,
      color: briefData.color || "Sesuai Diskusi Pengrajin",
      size: briefData.size || "Standar Kriya",
      region: briefData.region || "Seluruh Indonesia",
      provinceId: briefData.provinceId || "",
      deadline: briefData.deadline || "Fleksibel",
      description: briefData.description || "",
      status: "open",
      offersCount: 0,
      createdAt: Date.now(),
      dealInfo: null,
      agreedUsers: []
    };

    list.unshift(newCommission);
    saveCommissions(list);
    return newCommission;
  }

  function updateCommissionStatus(id, newStatus, dealInfo = null) {
    const list = getAllCommissions();
    const target = list.find((c) => c.id === id);
    if (target) {
      target.status = newStatus === "agreed" ? "agreed" : "open";
      if (dealInfo) {
        target.dealInfo = dealInfo;
      }
      saveCommissions(list);
      return target;
    }
    return null;
  }

  // Sistem Konsensus Dua Pihak (Dual Confirmation Deal)
  function confirmCommissionDeal(id, userEmail, dealData = {}) {
    const list = getAllCommissions();
    const target = list.find((c) => c.id === id);
    if (!target) return { success: false, reason: "Commission not found" };

    target.agreedUsers = Array.isArray(target.agreedUsers) ? target.agreedUsers : [];
    const normalizedEmail = (userEmail || "").toLowerCase().trim();

    if (normalizedEmail && !target.agreedUsers.includes(normalizedEmail)) {
      target.agreedUsers.push(normalizedEmail);
    }

    if (dealData && Object.keys(dealData).length > 0) {
      target.dealInfo = {
        ...(target.dealInfo || {}),
        ...dealData
      };
    }

    // Sistem hanya mengidentifikasi commision SUDAH DEAL jika kedua belah pihak sudah klik Deal
    const isBothAgreed = target.agreedUsers.length >= 2;

    if (isBothAgreed) {
      target.status = "agreed";
      target.dealInfo = {
        ...(target.dealInfo || {}),
        finalAgreedAt: Date.now(),
        finalAgreedBy: [...target.agreedUsers]
      };
    } else {
      target.status = "open"; // Tetap masih terbuka sampai kedua belah pihak menyetujui
    }

    saveCommissions(list);
    return {
      success: true,
      target: target,
      isFinalDeal: isBothAgreed,
      agreedUsers: target.agreedUsers,
      agreedCount: target.agreedUsers.length
    };
  }

  function cancelCommissionDeal(id, userEmail) {
    const list = getAllCommissions();
    const target = list.find((c) => c.id === id);
    if (!target) return false;

    target.agreedUsers = Array.isArray(target.agreedUsers) ? target.agreedUsers : [];
    const normalizedEmail = (userEmail || "").toLowerCase().trim();
    target.agreedUsers = target.agreedUsers.filter((e) => e !== normalizedEmail);
    target.status = "open";
    saveCommissions(list);
    return true;
  }

  function incrementOfferCount(id) {
    const list = getAllCommissions();
    const target = list.find((c) => c.id === id);
    if (target) {
      target.offersCount = (target.offersCount || 0) + 1;
      saveCommissions(list);
      return target;
    }
    return null;
  }

  function deleteCommission(id, userEmail) {
    let list = getAllCommissions();
    const target = list.find((c) => c.id === id);
    if (!target) return false;
    if (userEmail && target.creatorEmail.toLowerCase() !== userEmail.toLowerCase()) {
      return false;
    }
    list = list.filter((c) => c.id !== id);
    saveCommissions(list);
    return true;
  }

  // Global API
  window.WARISARA_COMMISSIONS = {
    getAll: getAllCommissions,
    getById: getCommissionById,
    addCommission: addCommission,
    updateStatus: updateCommissionStatus,
    confirmDeal: confirmCommissionDeal,
    cancelDeal: cancelCommissionDeal,
    incrementOffer: incrementOfferCount,
    deleteCommission: deleteCommission,
    getCraftTypes: function () {
      return ["Semua Jenis", "Batik", "Tenun", "Aksesori", "Dekorasi", "Kerajinan Lain"];
    }
  };
})();
