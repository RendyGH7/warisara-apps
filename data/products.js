/**
 * WARISARA — Katalog Produk Lokal & Kriya Nusantara
 * Produk lokal otentik terkurasi Nusantara dengan ilustrasi kriya asli
 * Terintegrasi dengan sistem C2C Marketplace & Chat Facebook-Style
 */

(function () {
  // Helper resolver path gambar agar fleksibel baik di root index.html maupun di /pages/
  function resolveProductImg(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    const isInsidePages = window.location.pathname.includes('/pages/') || 
      (window.location.pathname.endsWith('.html') && !window.location.pathname.endsWith('index.html'));
    const cleanUrl = url.replace(/^(\.\.\/|\.\/)+/, '');
    if (isInsidePages) {
      return '../' + cleanUrl;
    } else {
      return cleanUrl;
    }
  }

  // 14 Produk Kriya Otentik Nusantara (Setiap produk memiliki ilustrasi AI unik di assets/products/)
  const featuredProducts = [
    {
      id: "syal-tenun-sumba",
      name: "Syal Tenun Sabana Pewarna Alami",
      category: "Wastra Adat",
      origin: "Sumba Timur, NTT",
      province: "Nusa Tenggara Timur",
      island: "Bali & Nusa Tenggara",
      maker: "Mama Rambu Koni (Komunitas Tenun Marapu)",
      sellerEmail: "dewi.tenun@gmail.com",
      price: 850000,
      priceEstimate: "Rp 850.000",
      material: "100% Benang Katun Pintal & Akar Mengkudu",
      process: "40 hari tenun gedogan tangan dengan 4 kali proses celup alami",
      philosophy: "Motif kuda penjelajah lambang kepemimpinan dan keteguhan hati mengarungi hidup.",
      impact: "100% hasil penjualan kembali ke kelompok ibu penenun pedalaman Sumba.",
      badge: "Eco & Slow Fashion",
      rating: "4.9 (38 ulasan)",
      stock: 6,
      image: "assets/products/syal-tenun-sumba.jpg"
    },
    {
      id: "vas-banyumulek",
      name: "Vas Terracotta Kendi Maling Banyumulek",
      category: "Keramik & Gerabah",
      origin: "Lombok Barat, NTB",
      province: "Nusa Tenggara Barat",
      island: "Bali & Nusa Tenggara",
      maker: "Inaq Nuraini (Sentra Gerabah Sasak)",
      sellerEmail: "nuraini.gerabah@gmail.com",
      price: 320000,
      priceEstimate: "Rp 320.000",
      material: "Tanah Liat Lembah Gunung Rinjani & Sekam Padi",
      process: "Teknik putar tangan tanpa mesin, pembakaran jerami terbuka tradisional",
      philosophy: "Diisi air dari bawah tanpa tumpah, mengajarkan bahwa kejujuran batin lebih utama daripada penampilan luar.",
      impact: "Menghidupkan sentra kerajinan tanah liat yang telah berusia ratusan tahun di Lombok.",
      badge: "Kriya Tanah Liat",
      rating: "4.8 (24 ulasan)",
      stock: 12,
      image: "assets/products/vas-banyumulek.jpg"
    },
    {
      id: "tudung-manto",
      name: "Selendang Sutra Tekat Emas Melayu",
      category: "Wastra Adat",
      origin: "Daik Lingga, Kepulauan Riau",
      province: "Kepulauan Riau",
      island: "Sumatera",
      maker: "Tengku Salmah (Lembaga Adat Melayu Lingga)",
      sellerEmail: "salmah.tekat@gmail.com",
      price: 1250000,
      priceEstimate: "Rp 1.250.000",
      material: "Sutra Organza Pilihan & Benang Kawat Perak Berlapis Suasa",
      process: "Sulam tekat teliti jarum tangan memakan waktu 3 pekan penuh",
      philosophy: "Motif Awan Larat melambangkan kehalusan budi bahasa dan kesopanan budi pekerti masyarakat bahari.",
      impact: "Menyelamatkan seni sulam tekat kuno yang hampir punah di kepulauan terluar.",
      badge: "Warisan Langka",
      rating: "5.0 (19 ulasan)",
      stock: 4,
      image: "assets/products/tudung-manto.jpg"
    },
    {
      id: "noken-wamena",
      name: "Tas Noken Tradisi Serat Kayu Anggrek",
      category: "Anyaman Alami",
      origin: "Wamena, Lembah Baliem, Papua Pegunungan",
      province: "Papua Pegunungan",
      island: "Maluku & Papua",
      maker: "Mama Maria Elopere (Koperasi Noken Lembah)",
      sellerEmail: "maria.noken@gmail.com",
      price: 275000,
      priceEstimate: "Rp 275.000",
      material: "Serat Kulit Kayu Melinjo & Serat Batang Anggrek Hutan",
      process: "Dianyam menggunakan tangan dan kepala (teknik noken asli pegunungan)",
      philosophy: "Simbol rahim ibu, kesuburan tanah, perdamaian, dan ikatan kekerabatan masyarakat adat Papua.",
      impact: "Diakui UNESCO sebagai Warisan Budaya Takbenda yang Membutuhkan Perlindungan Mendesak.",
      badge: "UNESCO Safeguarded",
      rating: "4.9 (53 ulasan)",
      stock: 15,
      image: "assets/products/noken-wamena.jpg"
    },
    {
      id: "lampu-tumang",
      name: "Lampu Meja Ukir Tembaga Pahat Tangan",
      category: "Kriya Logam",
      origin: "Tumang, Boyolali, Jawa Tengah",
      province: "Jawa Tengah",
      island: "Jawa",
      maker: "Mas Joko Prasetyo (Pandai Tembaga Cepogo)",
      sellerEmail: "joko.tembaga@gmail.com",
      price: 680000,
      priceEstimate: "Rp 680.000",
      material: "Plat Tembaga Murni 1.2mm & Rangka Kayu Jati Belanda",
      process: "Diketuk manual dengan palu ukir (teknik tempa pukul) ribuan kali",
      philosophy: "Pendar cahaya hangat menembus motif daun rambat mencerminkan ketenangan rumah tradisional Jawa.",
      impact: "Memberdayakan lebih dari 30 pemuda desa sebagai artisan tembaga masa kini.",
      badge: "Kriya Kontemporer",
      rating: "4.9 (46 ulasan)",
      stock: 8,
      image: "assets/products/lampu-tumang.jpg"
    },
    {
      id: "jam-kayu-jepara",
      name: "Arloji Kayu Sonokeling Motif Ukir Truntum",
      category: "Kriya Kayu & Aksesoris",
      origin: "Jepara, Jawa Tengah",
      province: "Jawa Tengah",
      island: "Jawa",
      maker: "Studio Kayu Lestari Ukir",
      sellerEmail: "lestari.jepara@gmail.com",
      price: 750000,
      priceEstimate: "Rp 750.000",
      material: "Kayu Sonokeling Daur Ulang & Mesin Quartz Jepang",
      process: "Pahat ukir mikro detail bintang truntum dan pelapisan lilin lebah alami",
      philosophy: "Truntum bermakna cinta yang tumbuh kembali dan bersemi seiring berjalannya waktu.",
      impact: "Memanfaatkan limbah kayu mebel industri menjadi produk bernilai tambah tinggi.",
      badge: "Sustainable Upcycling",
      rating: "4.8 (31 ulasan)",
      stock: 10,
      image: "assets/products/jam-kayu-jepara.jpg"
    },
    {
      id: "batik-tulis-jogja-parang",
      name: "Kain Panjang Batik Tulis Parang Rusak Barong",
      category: "Wastra Adat",
      origin: "Giriloyo, Imogiri, D.I. Yogyakarta",
      province: "D.I. Yogyakarta",
      island: "Jawa",
      maker: "Mbah Cipto & Paguyuban Giriloyo",
      sellerEmail: "cipto.batik@gmail.com",
      price: 1850000,
      priceEstimate: "Rp 1.850.000",
      material: "Katun Primissima Halus & Pewarna Alami Kulit Mahoni Soga",
      process: "Canting malam dingin 28 hari dengan proses babaran 5 kali celup",
      philosophy: "Gelombang laut selatan pantang menyerah, lambang kepemimpinan arif dan teguh budi.",
      impact: "Mendukung kelangsungan 80 ibu pembatik di lereng perbukitan Imogiri.",
      badge: "Masterpiece Adat",
      rating: "5.0 (42 ulasan)",
      stock: 3,
      image: "assets/products/batik-tulis-jogja-parang.jpg"
    },
    {
      id: "songket-pandai-sikek",
      name: "Selendang Songket Balapak Benang Emas",
      category: "Wastra Adat",
      origin: "Pandai Sikek, Tanah Datar, Sumatera Barat",
      province: "Sumatera Barat",
      island: "Sumatera",
      maker: "Mak Upik Mayang",
      sellerEmail: "mak.upik@gmail.com",
      price: 2400000,
      priceEstimate: "Rp 2.400.000",
      material: "Sutra Alam Pintal & Benang Emas Cabutan Murni",
      process: "Penenunan panta kayu manual selama 60 hari penuh ketelitian",
      philosophy: "Motif saik kalam dan pucuk rebung menyimbolkan musyawarah mufakat nan santun.",
      impact: "Melestarikan tradisi kriya pusaka Minangkabau yang berumur ratusan tahun.",
      badge: "Kriya Pusaka",
      rating: "5.0 (27 ulasan)",
      stock: 2,
      image: "assets/products/songket-pandai-sikek.jpg"
    },
    {
      id: "topeng-kayu-bobung",
      name: "Topeng Panji Bobung Kayu Pule Pahat Halus",
      category: "Kriya Kayu & Aksesoris",
      origin: "Bobung, Patuk, Gunungkidul, D.I. Yogyakarta",
      province: "D.I. Yogyakarta",
      island: "Jawa",
      maker: "Pak Sukirman (Desa Wisata Bobung)",
      sellerEmail: "sukirman.bobung@gmail.com",
      price: 450000,
      priceEstimate: "Rp 450.000",
      material: "Kayu Pule Kering & Cat Alami Berbasis Air",
      process: "Pahat ukir kontur wajah halus dengan ampelas daun jati",
      philosophy: "Karakter Panji Asmorobangun lambang kelembutan budi pekerti dan ketenangan batin.",
      impact: "Mengangkat ekonomi seluruh warga desa pengrajin topeng di bukit kapur karst.",
      badge: "Warisan Seni Rupa",
      rating: "4.8 (18 ulasan)",
      stock: 7,
      image: "assets/products/topeng-kayu-bobung.jpg"
    },
    {
      id: "keris-kamardikan-madura",
      name: "Keris Dapur Sengkelat Pamor Wos Wutah",
      category: "Kriya Logam",
      origin: "Aeng Tong-tong, Sumenep, Jawa Timur",
      province: "Jawa Timur",
      island: "Jawa",
      maker: "Empu Subandi Suwito",
      sellerEmail: "subandi.keris@gmail.com",
      price: 3200000,
      priceEstimate: "Rp 3.200.000",
      material: "Baja Tempa Lipat 128 Lapis & Kayu Warangka Timoho",
      process: "Tempa panas tradisional dengan doa keselamatan dan penyelarasan filosofi",
      philosophy: "Pamor Beras Wutah adalah doa bagi kemakmuran, rezeki melimpah, dan ketenteraman hidup.",
      impact: "Desa Aeng Tong-tong dinobatkan UNESCO sebagai sentra empu keris terbanyak di dunia.",
      badge: "UNESCO Masterpiece",
      rating: "5.0 (33 ulasan)",
      stock: 2,
      image: "assets/products/keris-kamardikan-madura.jpg"
    },
    {
      id: "anyaman-rotan-katingan",
      name: "Keranjang Anjat Dayak Rotan Hutan Asli",
      category: "Anyaman Alami",
      origin: "Katingan, Kalimantan Tengah",
      province: "Kalimantan Tengah",
      island: "Kalimantan",
      maker: "Nyai Bawi Katingan",
      sellerEmail: "nyai.dayak@gmail.com",
      price: 390000,
      priceEstimate: "Rp 390.000",
      material: "Rotan Segah Hutan Lestari & Pewarna Getah Jernang",
      process: "Anyaman rapat tahan air dengan motif belanga Dayak Ngaju",
      philosophy: "Motif Batang Garing (Pohon Kehidupan) melambangkan keharmonisan manusia dengan alam liar.",
      impact: "Menopang penjagaan hutan adat agar terhindar dari perambahan liar.",
      badge: "Forest Friendly",
      rating: "4.9 (29 ulasan)",
      stock: 9,
      image: "assets/products/anyaman-rotan-katingan.jpg"
    },
    {
      id: "kopi-gayo-honey-organik",
      name: "Biji Kopi Arabika Gayo Takengon Micro-Lot",
      category: "Kuliner Tradisi & Hasil Bumi",
      origin: "Takengon, Aceh Tengah",
      province: "Aceh",
      island: "Sumatera",
      maker: "Koperasi Amanah Gayo",
      sellerEmail: "gayo.kopi@gmail.com",
      price: 135000,
      priceEstimate: "Rp 135.000",
      material: "100% Kopi Arabika Specialty Single Origin 1.500 mdpl",
      process: "Honey process fermentasi 18 hari dan penjemuran matahari pegunungan",
      philosophy: "Pemberian alam pegunungan Leuser yang diwariskan dari tetua ke generasi muda.",
      impact: "Kemitraan langsung dengan 120 petani kopi dataran tinggi Gayo.",
      badge: "Fair Trade Specialty",
      rating: "4.9 (88 ulasan)",
      stock: 50,
      image: "assets/products/kopi-gayo-honey-organik.jpg"
    },
    {
      id: "kain-ulos-ragidup",
      name: "Kain Tenun Ulos Ragidup Batak Toba",
      category: "Wastra Adat",
      origin: "Toba Samosir, Sumatera Utara",
      province: "Sumatera Utara",
      island: "Sumatera",
      maker: "Nai Rumondang (Sentra Ulos Tarutung)",
      sellerEmail: "ulos.tarutung@gmail.com",
      price: 1100000,
      priceEstimate: "Rp 1.100.000",
      material: "100% Benang Katun Pintal Halus & Pewarna Alami Daun Salaon",
      process: "Tenun gedogan tradisional Toba selama 25 hari penuh penghayatan",
      philosophy: "Ragidup melambangkan nafas kehidupan, doa kesejahteraan, dan kehormatan adat.",
      impact: "Mendukung paguyuban ibu-ibu penenun ulos pusaka di tepian Danau Toba.",
      badge: "Wastra Pusaka Batak",
      rating: "4.9 (35 ulasan)",
      stock: 5,
      image: "assets/products/kain-ulos-ragidup.jpg"
    },
    {
      id: "batik-mega-mendung-cirebon",
      name: "Kain Batik Sutra Mega Mendung Biru",
      category: "Wastra Adat",
      origin: "Trusmi, Cirebon, Jawa Barat",
      province: "Jawa Barat",
      island: "Jawa",
      maker: "Sanggar Batik Trusmi Luhur",
      sellerEmail: "trusmi.batik@gmail.com",
      price: 1650000,
      priceEstimate: "Rp 1.650.000",
      material: "Sutra Super Halus & Pewarna Alami Indigofera Gradasi 7 Lapis",
      process: "Canting halus bergradasi tujuh tingkatan warna mendung khas Keraton Kasepuhan",
      philosophy: "Mega Mendung bermakna kesabaran menahan amarah laksana awan sejuk pembawa hujan penyubur bumi.",
      impact: "Melestarikan seni batik pesisiran tertua di pesisir utara pulau Jawa.",
      badge: "Masterpiece Pesisir",
      rating: "5.0 (47 ulasan)",
      stock: 4,
      image: "assets/products/batik-mega-mendung-cirebon.jpg"
    }
  ];

  // Helper untuk membaca custom produk yang ditambahkan oleh user via form "+ Jual Produk"
  function getUserProductsFromStorage() {
    try {
      const stored = localStorage.getItem("warisara_user_products");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Gagal membaca produk pengguna:", e);
    }
    return [];
  }

  function getAllProducts() {
    const userItems = getUserProductsFromStorage();
    const all = [...userItems, ...featuredProducts];
    return all.map((p) => ({
      ...p,
      image: resolveProductImg(p.image)
    }));
  }

  function getProductById(id) {
    const all = getAllProducts();
    return all.find((p) => p.id === id) || all[0];
  }

  function addCustomProduct(prod) {
    try {
      const userItems = getUserProductsFromStorage();
      userItems.unshift(prod);
      localStorage.setItem("warisara_user_products", JSON.stringify(userItems));
      // Trigger event agar tampilan re-render
      window.dispatchEvent(new CustomEvent("warisara_products_updated", { detail: prod }));
      return true;
    } catch (e) {
      console.error("Gagal menyimpan produk baru:", e);
      return false;
    }
  }

  // Expose global API
  window.PRODUCTS_DATA = getAllProducts();
  window.WARISARA_PRODUCTS = {
    getAll: getAllProducts,
    getById: getProductById,
    addCustomProduct: addCustomProduct,
    resolveProductImg: resolveProductImg,
    getUserProducts: function (userEmail) {
      const all = getAllProducts();
      return all.filter((p) => p.sellerEmail && p.sellerEmail.toLowerCase() === (userEmail || "").toLowerCase());
    }
  };
})();
