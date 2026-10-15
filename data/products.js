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
    },
    {
      id: "tenun-ikat-sikka",
      name: "Kain Tenun Ikat Sikka Flores Nila Alami",
      category: "Wastra Adat",
      origin: "Maumere, Sikka, Nusa Tenggara Timur",
      province: "Nusa Tenggara Timur",
      island: "Bali & Nusa Tenggara",
      maker: "Kelompok Tenun Lepo Lorun",
      sellerEmail: "lepolorun.sikka@gmail.com",
      price: 950000,
      priceEstimate: "Rp 950.000",
      material: "100% Katun Pintal Tangan & Fermentasi Daun Nila (Indigofera)",
      process: "Penenunan ikat gedogan membutuhkan 2 bulan proses pencelupan warna bertingkat",
      philosophy: "Motif Utan Mawarani melambangkan keanggunan perempuan dan restu para leluhur Sikka.",
      impact: "Menghidupkan sanggar pemberdayaan 45 ibu penenun di perbukitan Maumere.",
      badge: "Indikasi Geografis",
      rating: "4.9 (42 ulasan)",
      stock: 7,
      image: "assets/products/tenun-ikat-sikka.jpg"
    },
    {
      id: "kipas-cendana-bali",
      name: "Kipas Ukir Kayu Cendana Wangi Bali",
      category: "Ukir Kayu & Logam",
      origin: "Sukawati, Gianyar, Bali",
      province: "Bali",
      island: "Bali & Nusa Tenggara",
      maker: "I Made Suweta (Pande Kayu Sukawati)",
      sellerEmail: "suweta.cendana@gmail.com",
      price: 420000,
      priceEstimate: "Rp 420.000",
      material: "Kayu Cendana Asli Bertangkai Tanduk Kerbau Halus",
      process: "Kerawang ukir tangan tembus pandang beraroma wangi alami abadi",
      philosophy: "Keharuman cendana menyimbolkan ketenangan batin, keharmonisan pikiran, dan kesucian rasa.",
      impact: "Mempertahankan tradisi seni ukir kayu aromatik turun-temurun seniman Gianyar.",
      badge: "Aromatik Alami",
      rating: "4.8 (31 ulasan)",
      stock: 15,
      image: "assets/products/kipas-cendana-bali.jpg"
    },
    {
      id: "perak-celuk-bali",
      name: "Bros Perhiasan Perak Filigri Desa Celuk",
      category: "Ukir Kayu & Logam",
      origin: "Desa Celuk, Sukawati, Bali",
      province: "Bali",
      island: "Bali & Nusa Tenggara",
      maker: "Sanggar Perak Suarti Celuk",
      sellerEmail: "celuk.silver@gmail.com",
      price: 680000,
      priceEstimate: "Rp 680.000",
      material: "Perak Murni 925 (Sterling Silver) & Sentuhan Granulasi Khas",
      process: "Dianyam jalinan kawat perak halus sehelai rambut dengan ketelitian mikroskopis",
      philosophy: "Motif Bun Bun melambangkan pertumbuhan abadi dan jalinan silaturahmi yang tak pernah putus.",
      impact: "Mendukung kelangsungan perajin perak generasi ke-4 Desa Celuk Bali.",
      badge: "Masterpiece Filigri",
      rating: "5.0 (29 ulasan)",
      stock: 8,
      image: "assets/products/perak-celuk-bali.jpg"
    },
    {
      id: "tenun-troso-jepara",
      name: "Kain Tenun Troso Blanket Etnik Jepara",
      category: "Wastra Adat",
      origin: "Desa Troso, Pecangaan, Jepara, Jawa Tengah",
      province: "Jawa Tengah",
      island: "Jawa",
      maker: "Sentra Tenun Lestari Troso",
      sellerEmail: "lestari.troso@gmail.com",
      price: 385000,
      priceEstimate: "Rp 385.000",
      material: "Benang Katun Tebal Lembut & Pewarna Tahan Luntur",
      process: "Ditenun dengan ATBM (Alat Tenun Bukan Mesin) oleh pemuda pengrajin Troso",
      philosophy: "Pola geometris perpaduan budaya pesisir utara dan pedalaman yang dinamis dan berani.",
      impact: "Memberdayakan lebih dari 60 pemuda desa untuk tetap berkarya di kampung halaman.",
      badge: "Kriya Kontemporer",
      rating: "4.8 (64 ulasan)",
      stock: 22,
      image: "assets/products/tenun-troso-jepara.jpg"
    },
    {
      id: "kain-sasirangan-banjar",
      name: "Kain Sasirangan Satin Motif Gigi Haruan",
      category: "Wastra Adat",
      origin: "Banjarmasin, Kalimantan Selatan",
      province: "Kalimantan Selatan",
      island: "Kalimantan",
      maker: "Ibu Hj. Siti Rahmah (Rumah Sasirangan)",
      sellerEmail: "rahmah.sasirangan@gmail.com",
      price: 475000,
      priceEstimate: "Rp 475.000",
      material: "Kain Katun Satin Primisima & Pewarna Kayu Ulin Alami",
      process: "Teknik jelujur jahit ikat tangan tradisional khas suku Banjar",
      philosophy: "Gigi Haruan melambangkan ketajaman berpikir, ketabahan, dan ketangkasan hidup.",
      impact: "Melestarikan kain pamali sakral Banjar menjadi wastra modern ramah lingkungan.",
      badge: "Warisan Banjar",
      rating: "4.9 (33 ulasan)",
      stock: 11,
      image: "assets/products/kain-sasirangan-banjar.jpg"
    },
    {
      id: "tenun-sutra-sengkang",
      name: "Sarung Sutra Sengkang Bugis Motif Lagosi",
      category: "Wastra Adat",
      origin: "Sengkang, Wajo, Sulawesi Selatan",
      province: "Sulawesi Selatan",
      island: "Sulawesi",
      maker: "Koperasi Sutra Alam Danau Tempe",
      sellerEmail: "tempe.sutra@gmail.com",
      price: 790000,
      priceEstimate: "Rp 790.000",
      material: "100% Sutra Murbei Ulat Sutra Budidaya Wajo",
      process: "Pintal tangan benang sutra murni dan ditenun dengan alat Walida kuno",
      philosophy: "Motif Lagosi melambangkan keteguhan cinta, kesucian budi pekerti, dan kehormatan siri' na pacce.",
      impact: "Menyelamatkan peternakan ulat murbei dan penenun sutra Danau Tempe.",
      badge: "Sutra Murni Nusantara",
      rating: "4.9 (27 ulasan)",
      stock: 9,
      image: "assets/products/tenun-sutra-sengkang.jpg"
    },
    {
      id: "kotak-sirih-minahasa",
      name: "Kotak Sirih Kayu Cempaka Ukir Minahasa",
      category: "Ukir Kayu & Logam",
      origin: "Tomohon, Minahasa, Sulawesi Utara",
      province: "Sulawesi Utara",
      island: "Sulawesi",
      maker: "Tonaas Wooden Art Tomohon",
      sellerEmail: "tonaas.craft@gmail.com",
      price: 340000,
      priceEstimate: "Rp 340.000",
      material: "Kayu Cempaka Wasian Tua & Minyak Kelapa Alami",
      process: "Pahat cungkil motif relief tradisional Minahasa dengan finishing beeswax alami",
      philosophy: "Wadah persaudaraan Mapalus yang melambangkan keramahan dan gotong royong tanpa batas.",
      impact: "Memajukan ekonomi perajin kayu lestari kaki Gunung Lokon.",
      badge: "Kriya Kayu Minahasa",
      rating: "4.7 (18 ulasan)",
      stock: 14,
      image: "assets/products/kotak-sirih-minahasa.jpg"
    },
    {
      id: "tenun-ikat-tanimbar",
      name: "Kain Tenun Ikat Tanimbar Motif Kilap Etnik",
      category: "Wastra Adat",
      origin: "Saumlaki, Kepulauan Tanimbar, Maluku",
      province: "Maluku",
      island: "Maluku & Papua",
      maker: "Mama Theresia Batlayeri (Paguyuban Duan Lolat)",
      sellerEmail: "theresia.tanimbar@gmail.com",
      price: 820000,
      priceEstimate: "Rp 820.000",
      material: "Serat Katun Organik & Ekstrak Akar Mengkudu Laut",
      process: "Tenun lungsi padat selama 30 hari di pesisir kepulauan terluar",
      philosophy: "Garis tajam motif Tanimbar menggambarkan keberanian melintasi samudera dan sumpah kesetiaan adat.",
      impact: "Kemandirian finansial bagi komunitas mama penenun pulau terdepan Indonesia.",
      badge: "Pusaka Kepulauan",
      rating: "4.9 (22 ulasan)",
      stock: 6,
      image: "assets/products/tenun-ikat-tanimbar.jpg"
    },
    {
      id: "mutiara-laut-lombok",
      name: "Gelang Mutiara Air Laut Emas Selatan Lombok",
      category: "Ukir Kayu & Logam",
      origin: "Sekotong, Lombok Barat, NTB",
      province: "Nusa Tenggara Barat",
      island: "Bali & Nusa Tenggara",
      maker: "Kelompok Budidaya Mutiara Teluk Sekotong",
      sellerEmail: "sekotong.pearl@gmail.com",
      price: 1450000,
      priceEstimate: "Rp 1.450.000",
      material: "Mutiara South Sea Pearl Asli Kelas A & Rantai Perak Lapis Rodium",
      process: "Panen kerang Pinctada maxima laut dalam dengan luster kilau alami sempurna",
      philosophy: "Kilau mutiara melambangkan ketahanan dalam cobaan dan kemurnian jiwa nurani manusia.",
      impact: "Konservasi terumbu karang dan lapangan kerja pesisir nelayan budidaya ramah alam.",
      badge: "South Sea Pearl Grade A",
      rating: "5.0 (41 ulasan)",
      stock: 5,
      image: "assets/products/mutiara-laut-lombok.jpg"
    },
    {
      id: "topeng-cirebon-klana",
      name: "Topeng Kayu Cirebon Karakter Klana Gandrung",
      category: "Ukir Kayu & Logam",
      origin: "Slangit, Cirebon, Jawa Barat",
      province: "Jawa Barat",
      island: "Jawa",
      maker: "Ki Dalang Wangi (Sanggar Topeng Slangit)",
      sellerEmail: "slangit.topeng@gmail.com",
      price: 580000,
      priceEstimate: "Rp 580.000",
      material: "Kayu Jaran Pilihan & Cat Sungging Halus Tradisional",
      process: "Pahat manual mengikuti anatomi mistis tari topeng 5 wanda Cirebonan",
      philosophy: "Klana menggambarkan ambisi nafsu manusia yang harus dikendalikan dengan kebijaksanaan hati.",
      impact: "Mendukung maestro sepuh pelestari tari topeng keraton Cirebon.",
      badge: "Karya Seni Teater Adat",
      rating: "4.9 (16 ulasan)",
      stock: 7,
      image: "assets/products/topeng-cirebon-klana.jpg"
    },
    {
      id: "guci-kasongan-jogja",
      name: "Guci Gerabah Kasongan Rustic Terracotta",
      category: "Keramik & Gerabah",
      origin: "Kasongan, Bantul, D.I. Yogyakarta",
      province: "D.I. Yogyakarta",
      island: "Jawa",
      maker: "Pak Timotius (Studio Gerabah Kasongan)",
      sellerEmail: "timotius.gerabah@gmail.com",
      price: 290000,
      priceEstimate: "Rp 290.000",
      material: "Tanah Liat Bantul Pilihan & Tekstur Pasir Vulkanik Merapi",
      process: "Putaran roda lambat tangan dan pembakaran tungku kayu bersuhu tinggi",
      philosophy: "Bentuk kendi membumi melambangkan kesederhanaan hidup dan keakraban dengan alam semesta.",
      impact: "Memajukan sentra kriya gerabah tertua di Yogyakarta sejak zaman Pangeran Diponegoro.",
      badge: "Kriya Tanah Kasongan",
      rating: "4.8 (37 ulasan)",
      stock: 18,
      image: "assets/products/guci-kasongan-jogja.jpg"
    },
    {
      id: "kain-cual-babel",
      name: "Selendang Tenun Cual Sutra Bangka Belitung",
      category: "Wastra Adat",
      origin: "Muntok, Bangka Barat, Kepulauan Bangka Belitung",
      province: "Kepulauan Bangka Belitung",
      island: "Sumatera",
      maker: "Penenun Pusaka Cual Muntok",
      sellerEmail: "cual.muntok@gmail.com",
      price: 1350000,
      priceEstimate: "Rp 1.350.000",
      material: "Benang Sutra Asli & Benang Emas Tebal Pilihan",
      process: "Perpaduan tenun ikat dan songket sungkit yang rumit selama 45 hari",
      philosophy: "Motif Kembang Kenanga melambangkan keharuman budi dan kehormatan keluarga besar Melayu.",
      impact: "Menyelamatkan tradisi tenun cual yang hampir punah sejak abad ke-18.",
      badge: "Wastra Langka Melayu",
      rating: "5.0 (14 ulasan)",
      stock: 3,
      image: "assets/products/kain-cual-babel.jpg"
    },
    {
      id: "tenun-toraja-sadan",
      name: "Kain Tenun Sa'dan Toraja Motif Pa'tedong",
      category: "Wastra Adat",
      origin: "Sa'dan Malimbong, Toraja Utara, Sulawesi Selatan",
      province: "Sulawesi Selatan",
      island: "Sulawesi",
      maker: "Ne' Indo' Layuk (Kelompok Tenun Sa'dan)",
      sellerEmail: "sadan.toraja@gmail.com",
      price: 880000,
      priceEstimate: "Rp 880.000",
      material: "Benang Katun Pintal Tradisional & Daun Indigofera Liar",
      process: "Ditenun dengan gedogan bambu khas pegunungan Toraja",
      philosophy: "Motif Pa'tedong (kepala kerbau) melambangkan kemakmuran, martabat keluarga, dan kekuatan hidup.",
      impact: "Memberdayakan perkumpulan ibu penenun di lembah pegunungan Toraja Utara.",
      badge: "Pusaka Adat Toraja",
      rating: "4.9 (39 ulasan)",
      stock: 8,
      image: "assets/products/tenun-toraja-sadan.jpg"
    },
    {
      id: "tas-anyaman-purun",
      name: "Tas Anyaman Purun Gambut Amuntai",
      category: "Anyaman Alami",
      origin: "Amuntai, Hulu Sungai Utara, Kalimantan Selatan",
      province: "Kalimantan Selatan",
      island: "Kalimantan",
      maker: "Komunitas Anyam Purun Danau Panggang",
      sellerEmail: "purun.amuntai@gmail.com",
      price: 185000,
      priceEstimate: "Rp 185.000",
      material: "Rumput Purun Rawa Gambut Organik & Aksen Kulit Nabati",
      process: "Batang purun ditumbuk halus, dijemur matahari, dan dianyam rapat tangan",
      philosophy: "Pemanfaatan vegetasi lahan basah gambut menjaga ekosistem rawa dari kebakaran hutan.",
      impact: "Mencegah alih fungsi lahan gambut dengan pemberdayaan ekonomi hijau ibu rumah tangga.",
      badge: "Eco-Friendly Lahan Gambut",
      rating: "4.8 (56 ulasan)",
      stock: 25,
      image: "assets/products/tas-anyaman-purun.jpg"
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
