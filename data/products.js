/**
 * WARISARA — Katalog Produk Lokal & Kriya Nusantara
 * Mendukung ratusan produk lokal otentik dari 38 Provinsi di Indonesia
 * Terintegrasi dengan sistem C2C Marketplace & Chat Facebook-Style
 */

(function () {
  // Kurasi Produk Utama Unggulan Nusantara
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
      image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "mutiara-lombok-south-sea",
      name: "Liontin Perak Mutiara Air Laut Sekotong",
      category: "Aksesoris & Perhiasan Etnik",
      origin: "Sekotong, Lombok Barat, NTB",
      province: "Nusa Tenggara Barat",
      island: "Bali & Nusa Tenggara",
      maker: "Artisan Perhiasan Bahari Lombok",
      sellerEmail: "bahari.lombok@gmail.com",
      price: 950000,
      priceEstimate: "Rp 950.000",
      material: "Mutiara Air Laut Asli Grade AA & Perak Bakar 925",
      process: "Budidaya ramah ekosistem karang dan pengerjaan kawat perak filigri",
      philosophy: "Kilau mutiara adalah cerminan ketabahan menyelami samudera kehidupan.",
      impact: "Pemberdayaan nelayan mutiara pesisir selatan Lombok.",
      badge: "Otentik Bahari",
      rating: "4.9 (41 ulasan)",
      stock: 8,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "tenun-gringsing-bali",
      name: "Kain Tenun Ikat Ganda Gringsing Wayang",
      category: "Wastra Adat",
      origin: "Tenganan Pegringsingan, Karangasem, Bali",
      province: "Bali",
      island: "Bali & Nusa Tenggara",
      maker: "Kadek Suartini (Desa Adat Tenganan)",
      sellerEmail: "kadek.gringsing@gmail.com",
      price: 3600000,
      priceEstimate: "Rp 3.600.000",
      material: "Benang Kapas Pintal Tangan & Pewarna Herbal Babakan Kayu",
      process: "Teknik tenun ikat ganda langka (hanya ada di 3 tempat di dunia) selama 2 tahun",
      philosophy: "Gring bermakna sakit, Sing bermakna tidak. Penolak bala dan pembawa ketentraman hidup.",
      impact: "Menjaga salah satu tradisi tekstil paling purba dan langka di planet bumi.",
      badge: "World Heritage Rarity",
      rating: "5.0 (15 ulasan)",
      stock: 1,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "garam-kusamba-organik",
      name: "Garam Kristal Piramida Pesisir Kusamba",
      category: "Kuliner Tradisi & Hasil Bumi",
      origin: "Kusamba, Klungkung, Bali",
      province: "Bali",
      island: "Bali & Nusa Tenggara",
      maker: "Pak Wayan Mustika (Petani Garam Tradisi)",
      sellerEmail: "wayan.garam@gmail.com",
      price: 65000,
      priceEstimate: "Rp 65.000",
      material: "Air Laut Murni Selat Lombok & Batang Pohon Kelapa",
      process: "Penguapan alami dengan hamparan pasir pantai hitam vulkanik",
      philosophy: "Kristalisasi kejujuran dan keringat asin penjaga tradisi pesisir dewata.",
      impact: "Mencegah kepunahan tambak garam tradisional terakhir di Bali Timur.",
      badge: "Artisanal Sea Salt",
      rating: "4.9 (67 ulasan)",
      stock: 40,
      image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Generator Skala Besar: Melengkapi katalog hingga 150+ Produk Lokal Nusantara
  const provincesList = [
    { p: "Aceh", i: "Sumatera", c: "Banda Aceh" },
    { p: "Sumatera Utara", i: "Sumatera", c: "Medan & Toba" },
    { p: "Sumatera Barat", i: "Sumatera", c: "Bukittinggi" },
    { p: "Riau", i: "Sumatera", c: "Pekanbaru" },
    { p: "Kepulauan Riau", i: "Sumatera", c: "Tanjungpinang" },
    { p: "Jambi", i: "Sumatera", c: "Muaro Jambi" },
    { p: "Sumatera Selatan", i: "Sumatera", c: "Palembang" },
    { p: "Kepulauan Bangka Belitung", i: "Sumatera", c: "Belitung" },
    { p: "Bengkulu", i: "Sumatera", c: "Bengkulu" },
    { p: "Lampung", i: "Sumatera", c: "Bandar Lampung" },
    { p: "DKI Jakarta", i: "Jawa", c: "Betawi Heritage" },
    { p: "Jawa Barat", i: "Jawa", c: "Cirebon & Tasikmalaya" },
    { p: "Banten", i: "Jawa", c: "Baduy & Serang" },
    { p: "Jawa Tengah", i: "Jawa", c: "Solo & Pekalongan" },
    { p: "D.I. Yogyakarta", i: "Jawa", c: "Kasongan & Kotagede" },
    { p: "Jawa Timur", i: "Jawa", c: "Madura & Banyuwangi" },
    { p: "Bali", i: "Bali & Nusa Tenggara", c: "Ubud & Gianyar" },
    { p: "Nusa Tenggara Barat", i: "Bali & Nusa Tenggara", c: "Lombok & Sumbawa" },
    { p: "Nusa Tenggara Timur", i: "Bali & Nusa Tenggara", c: "Flores & Sumba" },
    { p: "Kalimantan Barat", i: "Kalimantan", c: "Pontianak & Sambas" },
    { p: "Kalimantan Tengah", i: "Kalimantan", c: "Palangka Raya" },
    { p: "Kalimantan Selatan", i: "Kalimantan", c: "Banjarmasin & Martapura" },
    { p: "Kalimantan Timur", i: "Kalimantan", c: "Samarinda & Kutai" },
    { p: "Kalimantan Utara", i: "Kalimantan", c: "Tarakan & Malinau" },
    { p: "Sulawesi Utara", i: "Sulawesi", c: "Manado & Minahasa" },
    { p: "Gorontalo", i: "Sulawesi", c: "Gorontalo" },
    { p: "Sulawesi Tengah", i: "Sulawesi", c: "Palu & Donggala" },
    { p: "Sulawesi Barat", i: "Sulawesi", c: "Mandar" },
    { p: "Sulawesi Selatan", i: "Sulawesi", c: "Toraja & Bulukumba" },
    { p: "Sulawesi Tenggara", i: "Sulawesi", c: "Kendari & Buton" },
    { p: "Maluku", i: "Maluku & Papua", c: "Ambon & Banda" },
    { p: "Maluku Utara", i: "Maluku & Papua", c: "Ternate & Tidore" },
    { p: "Papua", i: "Maluku & Papua", c: "Jayapura & Sentani" },
    { p: "Papua Barat", i: "Maluku & Papua", c: "Manokwari" },
    { p: "Papua Selatan", i: "Maluku & Papua", c: "Merauke" },
    { p: "Papua Tengah", i: "Maluku & Papua", c: "Nabire" },
    { p: "Papua Pegunungan", i: "Maluku & Papua", c: "Lembah Baliem" },
    { p: "Papua Barat Daya", i: "Maluku & Papua", c: "Raja Ampat" }
  ];

  const templates = [
    {
      prefix: "Kain Tenun Ikat Adat",
      cat: "Wastra Adat",
      priceBase: 650000,
      badge: "Penenun Tradisi",
      mat: "Kapas Pintal Asli & Kulit Kayu Herbal",
      proc: "Tenun Gedogan Manual 3-4 Pekan",
      phil: "Garis corak menyambung ikatan kekeluargaan antar generasi.",
      img: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80"
    },
    {
      prefix: "Kendi Keramik Terracotta Alami",
      cat: "Keramik & Gerabah",
      priceBase: 240000,
      badge: "Kerajinan Tanah Liat",
      mat: "Tanah Liat Vulkanik & Sekam Padi",
      proc: "Putaran Manual & Bakar Jerami Terbuka",
      phil: "Wadah sejuk menyejukkan dahaga, lambang kerendahan hati.",
      img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
    },
    {
      prefix: "Tas Anyaman Serat Purun / Rotan",
      cat: "Anyaman Alami",
      priceBase: 195000,
      badge: "Serat Alami Berkelanjutan",
      mat: "Serat Tanaman Rawa & Rotan Hutan",
      proc: "Anyam Teliti Tangan Tanpa Mesin",
      phil: "Kuat menahan beban hidup berkat kelenturan watak.",
      img: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    },
    {
      prefix: "Piring & Sendok Kayu Jati Ukir",
      cat: "Kriya Kayu & Aksesoris",
      priceBase: 180000,
      badge: "Kayu Lestari",
      mat: "Kayu Jati / Sonokeling Bersertifikat",
      proc: "Bubut Tangan & Poles Lilin Lebah Beeswax",
      phil: "Menghormati makanan sebagai anugerah alam yang luhur.",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    },
    {
      prefix: "Bros Perhiasan Perak Filigri Khas",
      cat: "Aksesoris & Perhiasan Etnik",
      priceBase: 420000,
      badge: "Perak Murni Artisan",
      mat: "Perak Bakar 925 & Kawat Lembut",
      proc: "Pilin Jarum Halus Perajin Logam",
      phil: "Sulur bunga melambangkan kesucian dan kemurnian rasa.",
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    },
    {
      prefix: "Biji Kopi Sangrai Petik Merah",
      cat: "Kuliner Tradisi & Hasil Bumi",
      priceBase: 110000,
      badge: "Hasil Tani Mandiri",
      mat: "100% Kopi Petik Merah Pegunungan",
      proc: "Dry Natural Fermentation & Roasting Artisan",
      phil: "Aroma tanah Nusantara mengikat kehangatan silaturahmi.",
      img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const generatedProducts = [];
  let genCounter = 1;

  provincesList.forEach((prov) => {
    // Generate 3-4 realistic unique regional products per province
    const numItems = 4;
    for (let i = 0; i < numItems; i++) {
      const tmpl = templates[(genCounter + i) % templates.length];
      const prodId = `prod-${prov.p.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i + 1}`;
      
      // Calculate realistic price variation
      const priceVal = tmpl.priceBase + (i * 45000) + ((genCounter % 5) * 20000);
      const formattedPrice = "Rp " + priceVal.toLocaleString("id-ID");
      const makerName = `Koperasi Kriya ${prov.c}`;
      const sellerMail = `artisan.${prov.p.toLowerCase().replace(/[^a-z0-9]+/g, "")}.${i + 1}@gmail.com`;

      generatedProducts.push({
        id: prodId,
        name: `${tmpl.prefix} ${prov.c} (${prov.p})`,
        category: tmpl.cat,
        origin: `${prov.c}, ${prov.p}`,
        province: prov.p,
        island: prov.i,
        maker: makerName,
        sellerEmail: sellerMail,
        price: priceVal,
        priceEstimate: formattedPrice,
        material: tmpl.mat,
        process: tmpl.proc,
        philosophy: tmpl.phil,
        impact: `Memberdayakan para pengrajin dan keluarga desa di sentra ${prov.p}.`,
        badge: tmpl.badge,
        rating: (4.7 + (genCounter % 4) * 0.1).toFixed(1) + ` (${15 + (genCounter % 35)} ulasan)`,
        stock: 5 + (genCounter % 15),
        image: tmpl.img
      });
      genCounter++;
    }
  });

  // Gabungkan featured products dengan ratusan generated products
  let masterCatalog = [...featuredProducts, ...generatedProducts];

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
    // Taruh produk yang baru dijual user di posisi paling atas!
    return [...userItems, ...masterCatalog];
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
    getUserProducts: function (userEmail) {
      const all = getAllProducts();
      return all.filter((p) => p.sellerEmail && p.sellerEmail.toLowerCase() === (userEmail || "").toLowerCase());
    }
  };
})();
