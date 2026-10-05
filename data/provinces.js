const PROVINCES_DATA = {
  "aceh": {
    id: "aceh",
    name: "Aceh",
    island: "Sumatra",
    capital: "Banda Aceh",
    shortStatement: "Serambi penenun tradisi dan kearifan luhur.",
    shortDescription: "Wilayah di ujung barat Nusantara yang kaya tradisi spiritual, seni Saman, dan ketelitian kerajinan rencong serta sulam kasab.",
    heritage: [
      { name: "Tari Saman", category: "Seni Pertunjukan", desc: "Warisan Takbenda UNESCO dengan ritme sinkronisasi tepukan dada dan tangan para penari." },
      { name: "Rencong", category: "Kriya Senjata Tradisional", desc: "Karya tempa logam pusaka berukir dengan filosofi keteguhan dan kehormatan." },
      { name: "Sulam Kasab", category: "Kriya Tekstil", desc: "Kerajinan benang emas dan perak pada kain beludru untuk upacara adat agung." }
    ],
    maker: {
      name: "Tgk. Hasballah",
      role: "Empu Pandai Besi Rencong",
      quote: "Besi bukan sekadar ditempa menjadi tajam, melainkan diselaraskan dengan doa dan kesabaran para leluhur."
    },
    craftHighlight: "Rencong Meucugek berhulu tanduk kerbau ukir motif pucuk rebung.",
    svgCenter: { x: 55.9, y: 87.9 }
  },
  "sumatera-utara": {
    id: "sumatera-utara",
    name: "Sumatera Utara",
    island: "Sumatra",
    capital: "Medan",
    shortStatement: "Rajutan benang ulos pengikat jiwa dan persaudaraan.",
    shortDescription: "Kawasan Danau Toba dan pesisir Selat Malaka yang melahirkan tenun ulos sarat makna filosofis dan arsitektur Rumah Bolon.",
    heritage: [
      { name: "Tenun Ulos Ragidup", category: "Kriya Tekstil", desc: "Simbol kehidupan tertinggi yang ditenun dengan benang alami bermotif rumit." },
      { name: "Gordang Sambilan", category: "Musik Tradisional", desc: "Sembilan genderang bertingkat yang mengiringi upacara adat sakral Mandailing." },
      { name: "Gorga Batak", category: "Seni Ukir Arsitektur", desc: "Ukiran kayu tiga warna sakral (merah, putih, hitam) pada fasad Rumah Bolon." }
    ],
    maker: {
      name: "Nai Martua Simanjuntak",
      role: "Penenun Ulos Gedogan",
      quote: "Setiap tarikan sisir kayu ulos membawa harapan kesehatan dan berkat bagi pemakainya."
    },
    craftHighlight: "Ulos Pinuncaan dengan pewarna getah kayu alam Tarum dan Ubar.",
    svgCenter: { x: 98.8, y: 126.4 }
  },
  "sumatera-barat": {
    id: "sumatera-barat",
    name: "Sumatera Barat",
    island: "Sumatra",
    capital: "Padang",
    shortStatement: "Filosofi alam terkembang jadi guru dalam ukiran dan songket.",
    shortDescription: "Pusat kebudayaan Minangkabau dengan kehalusan Songket Pandai Sikek serta filosofi ukir Rumah Gadang yang menghormati alam.",
    heritage: [
      { name: "Songket Pandai Sikek", category: "Kriya Tekstil", desc: "Kain tenun benang emas dengan motif Saik Kalamai dan Kaluak Paku yang sangat detail." },
      { name: "Tari Piring", category: "Seni Pertunjukan", desc: "Tarian syukur panen dengan atraksi ketangkasan gerak piring porselen di atas pecahan kaca." },
      { name: "Rumah Gadang", category: "Arsitektur Vernakular", desc: "Struktur pasak kayu tahan gempa dengan atap gonjong bertanduk kerbau." }
    ],
    maker: {
      name: "Uni Rosma",
      role: "Maestro Songket Silungkang",
      quote: "Motif Kaluak Paku mengajarkan kita agar anak dipangku, kemenakan dibimbing."
    },
    craftHighlight: "Songket Balapak dengan kerapatan pakan benang emas 100%.",
    svgCenter: { x: 127.0, y: 183.1 }
  },
  "riau": {
    id: "riau",
    name: "Riau",
    island: "Sumatra",
    capital: "Pekanbaru",
    shortStatement: "Gemilang sastra gurindam dan kemilau Tenun Siak.",
    shortDescription: "Bumi Melayu yang menjadi hulu bahasa persatuan, dihiasi keindahan Tenun Siak bermotif pucuk rebung dan lantunan Zapin.",
    heritage: [
      { name: "Tenun Songket Siak", category: "Kriya Tekstil", desc: "Kain kebesaran istana Kerajaan Siak Sri Indrapura bermotif Awan Larat." },
      { name: "Tari Zapin", category: "Seni Tari Melayu", desc: "Tarian santun berakar ritme gambus yang mengedepankan kesopanan budi pekerti." },
      { name: "Gurindam Dua Belas", category: "Warisan Sastra", desc: "Karya adiluhung Raja Ali Haji berisi pedoman moral, agama, dan etika bernegara." }
    ],
    maker: {
      name: "Tengku Salmah",
      role: "Penenun Istana Siak",
      quote: "Menyulam tenun Melayu berarti menata adab dan kesabaran di setiap hembusan nafas."
    },
    craftHighlight: "Kain Songket motif Tabir Bertabur Bintang.",
    svgCenter: { x: 158.3, y: 165.4 }
  },
  "kepulauan-riau": {
    id: "kepulauan-riau",
    name: "Kepulauan Riau",
    island: "Sumatra",
    capital: "Tanjungpinang",
    shortStatement: "Gerbang bahari peradaban pantun dan kebesaran maritim.",
    shortDescription: "Gugusan pulau di Selat Malaka dengan benteng sejarah Pulau Penyengat dan seni Mak Yong yang melegenda.",
    heritage: [
      { name: "Teater Mak Yong", category: "Seni Teater Tradisional", desc: "Teater tutur purba perpaduan tarian, nyanyian rebab, dan komedi istana." },
      { name: "Tudung Manto", category: "Busana Tradisional", desc: "Penutup kepala khas bangsawan Melayu Lingga bertabur kelingan benang perak." },
      { name: "Gendang Siantan", category: "Musik Tradisional", desc: "Pukulan perkusi maritim Kepulauan Anambas yang mengiringi pelaut." }
    ],
    maker: {
      name: "Daud Abdullah",
      role: "Pelestari Sastra Pantun",
      quote: "Bila bahtera patah kemudi, pantun dan adab jadi pedoman kami di samudera."
    },
    craftHighlight: "Tudung Manto sutra hitam bertekat benang suasa antik.",
    svgCenter: { x: 208.5, y: 140.2 }
  },
  "jambi": {
    id: "jambi",
    name: "Jambi",
    island: "Sumatra",
    capital: "Jambi",
    shortStatement: "Jejak kejayaan Muaro Jambi dan keanggunan Batik Batanghari.",
    shortDescription: "Kawasan sungai terpanjang di Sumatra dengan warisan arca candi bata merah kuno serta Batik Jambi berpewarna alami.",
    heritage: [
      { name: "Batik Jambi", category: "Kriya Tekstil", desc: "Batik berkarakter motif renggang seperti Durian Pecah dan Kapal Sanggat." },
      { name: "Kompleks Percandian Muaro Jambi", category: "Situs Arkeologi", desc: "Pusat pendidikan Buddha terbesar di Asia Tenggara abad ke-7 hingga 12 Masehi." },
      { name: "Tari Sekapur Sirih", category: "Seni Tari Penyambutan", desc: "Tarian penghormatan tamu agung dengan persembahan sirih pinang beraroma wangi." }
    ],
    maker: {
      name: "Zubaidah",
      role: "Pengrajin Batik Alami",
      quote: "Warna cokelat kayu sepang dan buah jering memberi jiwa yang abadi pada kain kami."
    },
    craftHighlight: "Batik motif Durian Pecah dengan pewarna kayu bulian.",
    svgCenter: { x: 174.6, y: 209.0 }
  },
  "sumatera-selatan": {
    id: "sumatera-selatan",
    name: "Sumatera Selatan",
    island: "Sumatra",
    capital: "Palembang",
    shortStatement: "Kilau keemasan Sriwijaya dalam balutan Songket Lepus.",
    shortDescription: "Pusat kekaisaran maritim Sriwijaya yang mewariskan seni tenun benang emas bergelar Ratu Segala Kain.",
    heritage: [
      { name: "Songket Palembang Lepus", category: "Kriya Tekstil", desc: "Tenunan mewah berlapis penuh benang emas tanpa sela ruang kosong kain dasar." },
      { name: "Tari Gending Sriwijaya", category: "Seni Tari Klasik", desc: "Representasi kemegahan dan keramahan para raja bahari Nusantara." },
      { name: "Rumah Limas", category: "Arsitektur Tradisional", desc: "Rumah panggung bertingkat (kekijing) yang mencerminkan hierarki kearifan sosial." }
    ],
    maker: {
      name: "Hj. Zainal Songket",
      role: "Maestro Songket Sriwijaya",
      quote: "Satu helai Songket Lepus adalah tiga bulan ketelitian tangan dan kemuliaan tradisi."
    },
    craftHighlight: "Songket Lepus Bintang Berlian berlapis emas jantung murni.",
    svgCenter: { x: 204.1, y: 240.8 }
  },
  "bengkulu": {
    id: "bengkulu",
    name: "Bengkulu",
    island: "Sumatra",
    capital: "Bengkulu",
    shortStatement: "Pesona kain besurek bertuliskan kaligrafi dan flora endemik.",
    shortDescription: "Negeri pesisir barat yang memiliki perpaduan budaya aksara Kaganga, ornamen bunga Rafflesia, dan prosesi Tabot.",
    heritage: [
      { name: "Kain Besurek", category: "Kriya Tekstil", desc: "Kain batik khas dengan ornamen huruf kaligrafi Arab gundul dipadu motif Rafflesia." },
      { name: "Upacara Adat Tabot", category: "Tradisi Budaya", desc: "Prosesi akbar pengusungan menara kayu megah berhias kertas warna-warni." },
      { name: "Bunga Rafflesia Arnoldii", category: "Pusaka Alam", desc: "Bunga raksasa langka dunia yang menjadi ikon kebanggaan flora Nusantara." }
    ],
    maker: {
      name: "Syarifudin",
      role: "Perajin Tabot Tradisional",
      quote: "Membuat menara Tabot adalah wujud gotong royong dan rasa syukur warga pesisir."
    },
    craftHighlight: "Kain Besurek motif Kaligrafi Bunga Melati pewarna alami kulit mahoni.",
    svgCenter: { x: 171.7, y: 249.2 }
  },
  "lampung": {
    id: "lampung",
    name: "Lampung",
    island: "Sumatra",
    capital: "Bandar Lampung",
    shortStatement: "Misteri bahari pada Kain Kapal Tapis Lampung.",
    shortDescription: "Ujung selatan Pulau Sumatra dengan mahkota emas Siger dan kain sulam tapis benang emas yang melambangkan perjalanan hidup.",
    heritage: [
      { name: "Kain Tapis Lampung", category: "Kriya Sulam", desc: "Tenun kapas berhiaskan sulaman benang emas bermotif perahu dan pohon hayat." },
      { name: "Mahkota Siger", category: "Kriya Logam Tradisional", desc: "Mahkota pengantin wanita sembilan lekuk melambangkan sembilan sungai besar Lampung." },
      { name: "Tari Cangget", category: "Seni Pertunjukan Adat", desc: "Tarian musyawarah pemuda-pemudi dalam upacara pengesahan gelar adat Begawi." }
    ],
    maker: {
      name: "Ibu Nurhasanah",
      role: "Pengrajin Tapis Pesisir",
      quote: "Motif kapal pada Tapis adalah simbol perjalanan manusia mengarungi ombak kehidupan."
    },
    craftHighlight: "Tapis Inuh motif Gajah dan Kapal bernuansa emas tembaga.",
    svgCenter: { x: 219.6, y: 275.2 }
  },
  "bangka-belitung": {
    id: "bangka-belitung",
    name: "Kepulauan Bangka Belitung",
    island: "Sumatra",
    capital: "Pangkalpinang",
    shortStatement: "Kearifan maritim tenun cual dan harmoni timah Nusantara.",
    shortDescription: "Negeri kepulauan penghasil lada dan timah dengan kehalusan Tenun Cual warisan bangsawan mentok.",
    heritage: [
      { name: "Tenun Cual Muntok", category: "Kriya Tekstil", desc: "Kain tenun ikat pakan sutra dengan motif kembang gajah dan naga bertabur emas." },
      { name: "Kopiah Resam", category: "Anyaman Tradisional", desc: "Songkok halus dari serat pucuk tanaman paku resam yang fleksibel dan awet." },
      { name: "Tari Campak", category: "Seni Tari Pergaulan", desc: "Tarian kegembiraan pemuda pemudi dengan tabuhan akordeon dan piul gesek." }
    ],
    maker: {
      name: "Cik Maryati",
      role: "Penenun Cual Kuno",
      quote: "Benang cual itu halus, jika ditenun tanpa hati yang tenang ia akan mudah putus."
    },
    craftHighlight: "Kain Cual motif Kembang Kenanga dengan serat sutra murni.",
    svgCenter: { x: 246.0, y: 222.0 }
  },
  "banten": {
    id: "banten",
    name: "Banten",
    island: "Java",
    capital: "Serang",
    shortStatement: "Keteguhan Baduy menjaga alam dan ketajaman Golok Ciomas.",
    shortDescription: "Kawasan ujung barat Jawa tempat masyarakat adat Baduy memelihara keselarasan alam, kain tenun Aros, dan seni bela diri Debus.",
    heritage: [
      { name: "Tenun Baduy (Kain Aros)", category: "Kriya Tekstil Tradisional", desc: "Kain tenun bergaris hitam-biru tua dari kapas liar yang dipintal tangan secara sakral." },
      { name: "Golok Ciomas", category: "Kriya Logam Pusaka", desc: "Senjata tempa legendaris Banten berbahan besi tua dengan prosesi doa khusus." },
      { name: "Seni Debus Banten", category: "Seni Atraksi Spiritual", desc: "Pertunjukan kekebalan fisik yang memperlihatkan kekuatan konsentrasi dan spiritualitas." }
    ],
    maker: {
      name: "Aki Jaro Baduy",
      role: "Penenun Kain Tenun Baduy Luar",
      quote: "Gunung teu meunang dilebur, lebak teu meunang dirusak — alam adalah rumah abadi kita."
    },
    craftHighlight: "Kain Tenun Telep Baduy berbahan pewarna alami daun nila hutan.",
    svgCenter: { x: 242.6, y: 310.5 }
  },
  "dki-jakarta": {
    id: "dki-jakarta",
    name: "DKI Jakarta",
    island: "Java",
    capital: "Jakarta",
    shortStatement: "Muara kosmopolitan Sunda Kelapa dan riang canda Ondel-Ondel.",
    shortDescription: "Pusat persilangan budaya Betawi yang ramah, diwarnai alunan musik Gambang Kromong dan kemegahan Ondel-Ondel raksasa.",
    heritage: [
      { name: "Ondel-Ondel Betawi", category: "Seni Boneka Raksasa", desc: "Sepasang boneka raksasa berwajah ramah penolak bala dan lambang pelindung warga." },
      { name: "Gambang Kromong", category: "Musik Tradisional Akulturasi", desc: "Orkes harmonis perpaduan instrumen gamelan Jawa-Sunda dengan gesekan Kongahyan Tionghoa." },
      { name: "Batik Betawi Terogong", category: "Kriya Tekstil", desc: "Batik berona cerah mencolok dengan motif Monas, Ondel-Ondel, dan Burung Hong." }
    ],
    maker: {
      name: "Bang Udin Ondel",
      role: "Pengrajin Rangka Bambu Ondel",
      quote: "Ondel-ondel bukan sekadar tontonan jalanan, tapi simbol persaudaraan kampung yang guyub."
    },
    craftHighlight: "Rangka anyaman bambu petung dengan topeng kayu randu ukir ekspresif.",
    svgCenter: { x: 259.9, y: 303.5 }
  },
  "jawa-barat": {
    id: "jawa-barat",
    name: "Jawa Barat",
    island: "Java",
    capital: "Bandung",
    shortStatement: "Alunan bambu angklung dan kelembutan tanah Parahyangan.",
    shortDescription: "Tanah Pasundan yang subur, tempat getaran bambu angklung mendunia dan Batik Megamendung Cirebon memukau mata.",
    heritage: [
      { name: "Angklung Sunda", category: "Alat Musik UNESCO", desc: "Instrumen bambu bernada pentatonis/diatonis yang menghasilkan nada merdu saat digoyangkan bersama." },
      { name: "Batik Megamendung Cirebon", category: "Kriya Tekstil", desc: "Motif awan berlapis gradasi tujuh warna berfilosofi menahan amarah dan ketenangan jiwa." },
      { name: "Wayang Golek Cepot", category: "Seni Teater Boneka Kayu", desc: "Boneka kayu berkarakter jenaka dan bijak yang sarat pesan moral filosofis Sunda." }
    ],
    maker: {
      name: "Mang Asep Angklung",
      role: "Pengrajin Bambu Hitam",
      quote: "Bambu hitam harus dikeringkan berbulan-bulan di bawah angin sebelum suaranya sempurna."
    },
    craftHighlight: "Angklung Padaeng bambu wulung nada standar orkestra.",
    svgCenter: { x: 276.5, y: 316.7 }
  },
  "jawa-tengah": {
    id: "jawa-tengah",
    name: "Jawa Tengah",
    island: "Java",
    capital: "Semarang",
    shortStatement: "Puncak adiluhung candi Borobudur dan guratan canting batik.",
    shortDescription: "Pusat kebudayaan Jawa yang melahirkan monumen batu terbesar Borobudur, seni gamelan tembaga, dan batik tulis halus Surakarta-Pekalongan.",
    heritage: [
      { name: "Batik Tulis Keraton", category: "Kriya Tekstil Masterpiece", desc: "Batik halus motif Parang Rusak dan Sidomukti dengan teknik canting malam dan soga alam." },
      { name: "Candi Borobudur", category: "Situs Warisan Dunia", desc: "Kuil Buddha terbesar dunia dengan relief mandala batu andesit bertingkat sembilan." },
      { name: "Keris Jawa", category: "Pusaka Metalurgi", desc: "Senjata tikam berpamor lipatan besi dan meteorit yang memiliki kekuatan spiritual budaya." }
    ],
    maker: {
      name: "Mbah Cipto Canting",
      role: "Empu Pembatik Tulis Klasik",
      quote: "Menorehkan lilin canting adalah melatih nafas dan membersihkan hati dari ketergesaan."
    },
    craftHighlight: "Batik Tulis Canting 0.3mm motif Parang Barong Soga Genap.",
    svgCenter: { x: 331.1, y: 326.5 }
  },
  "di-yogyakarta": {
    id: "di-yogyakarta",
    name: "DI Yogyakarta",
    island: "Java",
    capital: "Yogyakarta",
    shortStatement: "Kraton penjaga denyut sastra, wayang kulit, dan keheningan perak.",
    shortDescription: "Kota budaya abadi dengan Kraton Ngayogyakarta Hadiningrat, seni pahat wayang kulit kerbau, dan tatah perak Kotagede.",
    heritage: [
      { name: "Wayang Kulit Purwa", category: "Seni Pertunjukan Masterpiece", desc: "Pementasan bayang-bayang kulit kerbau bertatah halus dengan iringan dalang dan tembang gamelan." },
      { name: "Kerajinan Perak Kotagede", category: "Kriya Logam Mulia", desc: "Seni ukir filigri perak murni yang berkembang sejak era Kesultanan Mataram Islam." },
      { name: "Gamelan Jawa Kraton", category: "Ansambel Musik Agung", desc: "Instrumen perunggu laras Pelog dan Slendro pelantun harmoni ketenangan semesta." }
    ],
    maker: {
      name: "Ki Sugeng Dalang",
      role: "Penatah Wayang Kulit",
      quote: "Di balik selembar kulit kerbau yang ditatah ribuan lubang kecil, ada petuah hidup sejati."
    },
    craftHighlight: "Wayang Kulit Gunungan Kayon dengan sunggingan cat prada emas asli.",
    svgCenter: { x: 335.5, y: 339.0 }
  },
  "jawa-timur": {
    id: "jawa-timur",
    name: "Jawa Timur",
    island: "Java",
    capital: "Surabaya",
    shortStatement: "Ketangguhan Reog Ponorogo dan mistisisme kawah Bromo.",
    shortDescription: "Kawasan berkarakter dinamis tempat bertemunya tradisi Majapahit, topeng Reog dadak merak raksasa, dan Batik Gentongan Madura.",
    heritage: [
      { name: "Reog Ponorogo", category: "Seni Tari Spektakuler", desc: "Topeng kepala singa bermahkotakan ratusan bulu merak seberat 50 kg yang diangkat dengan gigitan gigi." },
      { name: "Batik Gentongan Madura", category: "Kriya Tekstil Pesisir", desc: "Batik berkarakter warna pekat berani yang direndam dalam gentong tanah liat selama berbulan-bulan." },
      { name: "Tari Gandrung Banyuwangi", category: "Seni Tari Tradisional", desc: "Tarian pesona persembahan Dewi Sri yang diiringi lantunan biola dan kluncing tembaga." }
    ],
    maker: {
      name: "Mbah Kasno Dadak Merak",
      role: "Pembuat Rangka Reog",
      quote: "Keseimbangan leher penari ada pada ketepatan anyaman rotan dan susunan bulu merak."
    },
    craftHighlight: "Topeng Dadak Merak merak hijau asli dengan rangka rotan alami.",
    svgCenter: { x: 382.0, y: 338.9 }
  },
  "kalimantan-barat": {
    id: "kalimantan-barat",
    name: "Kalimantan Barat",
    island: "Kalimantan",
    capital: "Pontianak",
    shortStatement: "Tenun Ikat Dayak Iban dan kemegahan Rumah Radakng.",
    shortDescription: "Bumi Khatulistiwa yang membentang di sepanjang Sungai Kapuas dengan Tenun Sidan Dayak dan ukiran perisai kayu ulin.",
    heritage: [
      { name: "Tenun Ikat Dayak Iban", category: "Kriya Tekstil", desc: "Tenunan bermotif mistis hewan hutan hujan dan manusia yang dibuat dengan teknik ikat pakan tradisional." },
      { name: "Rumah Panjang Radakng", category: "Arsitektur Adat Dayak", desc: "Rumah panggung kayu ulin sepanjang ratusan meter tempat puluhan keluarga hidup harmonis." },
      { name: "Perisai Mandau Talawang", category: "Kriya Senjata & Ukir", desc: "Perisai kayu liat berhias motif ukiran spiral dan rambut ritual penolak bahaya." }
    ],
    maker: {
      name: "Ibu Enselina",
      role: "Penenun Dayak Iban Kapuas Hulu",
      quote: "Menenun motif Iban adalah bermimpi tentang hutan rimba dan pesan para tetua adat."
    },
    craftHighlight: "Tenun Ikat Dayak Iban motif Kumang berpewarna akar kayu malam.",
    svgCenter: { x: 347.3, y: 176.5 }
  },
  "kalimantan-utara": {
    id: "kalimantan-utara",
    name: "Kalimantan Utara",
    island: "Kalimantan",
    capital: "Tanjung Selor",
    shortStatement: "Keteguhan tapal batas dalam anyaman rotan Saung dan motif Kayan.",
    shortDescription: "Provinsi termuda di Kalimantan dengan keanekaragaman suku Dayak Kayan, Kenyah, dan Lundayeh penghasil anyaman halus topi saung.",
    heritage: [
      { name: "Topi Saung / Seraung", category: "Kriya Anyam Daun & Rotan", desc: "Tudung kepala anyaman daun kelapa sawit/pandan hutan berhiaskan sulaman motif Dayak yang anggun." },
      { name: "Batik Lundayeh", category: "Kriya Tekstil", desc: "Motif batik berbasis ragam hias ukiran tempayan dan alam perbatasan Borneo." },
      { name: "Tari Kancet Papatai", category: "Seni Pertunjukan Tradisional", desc: "Tari perang teatrikal yang menggambarkan keberanian pemuda suku Dayak Kenyah." }
    ],
    maker: {
      name: "Bapak Bilung Kayan",
      role: "Pengrajin Seraung Ukir",
      quote: "Seraung melindungi kepala dari sengatan matahari perbatasan sambil membawa marwah keluarga."
    },
    craftHighlight: "Seraung anyam lapis tiga dengan motif ukir manik kerang.",
    svgCenter: { x: 461.5, y: 106.1 }
  },
  "kalimantan-tengah": {
    id: "kalimantan-tengah",
    name: "Kalimantan Tengah",
    island: "Kalimantan",
    capital: "Palangkaraya",
    shortStatement: "Anyaman rotan halus Purun dan keanggunan Tari Mandau.",
    shortDescription: "Jantung rimba Kalimantan tempat kearifan masyarakat Dayak Ngaju mengolah rotan hutan menjadi anyaman tasik bernilai tinggi.",
    heritage: [
      { name: "Anyaman Rotan Dayak Ngaju", category: "Kriya Anyam Hutan", desc: "Anyaman tikar dan tas rotan bertekstur sangat rapat dengan pewarna alami getah jernang." },
      { name: "Tari Mandau", category: "Seni Tari Perang", desc: "Atraksi tarian ketangkasan memainkan mandau dan talawang diiringi tabuhan kangkanung." },
      { name: "Rumah Betang Dayak", category: "Arsitektur Adat", desc: "Pusat tatanan sosial masyarakat Dayak yang menjunjung tinggi falsafah Huma Betang." }
    ],
    maker: {
      name: "Bapak Yansen Ngaju",
      role: "Penganyam Rotan Halus",
      quote: "Rotan hutan kami belah setipis benang agar ia lentur dan tak melukai tangan yang menyentuh."
    },
    craftHighlight: "Tikar Rotan Amak Dareh motif kelok naga berpewarna jernang merah.",
    svgCenter: { x: 395.5, y: 205.0 }
  },
  "kalimantan-selatan": {
    id: "kalimantan-selatan",
    name: "Kalimantan Selatan",
    island: "Kalimantan",
    capital: "Banjarbaru",
    shortStatement: "Keindahan kain Sasirangan dan geliat Pasar Terapung Lok Baintan.",
    shortDescription: "Tanah Banjar di tepian sungai Barito dengan tradisi kain celup jelujur Sasirangan serta seni intan Martapura.",
    heritage: [
      { name: "Kain Sasirangan", category: "Kriya Tekstil Tradisional", desc: "Kain celup rintang jelujur dengan motif tradisional Bayam Raja dan Kambang Kacang." },
      { name: "Pasar Terapung Lok Baintan", category: "Budaya Maritim Sungai", desc: "Pusat transaksi jual beli tradisional di atas jukung perahu kayu sejak abad ke-16." },
      { name: "Seni Musik Panting", category: "Musik Tradisional Banjar", desc: "Alat musik petik mirip gambus kecil bersenar ganda dengan irama ceria khas Banjar." }
    ],
    maker: {
      name: "Hj. Ratna Sasirangan",
      role: "Perajin Sasirangan Jelujur",
      quote: "Setiap simpul jelujur adalah doa tolak bala dan harapan keselamatan bagi pemakainya."
    },
    craftHighlight: "Sasirangan Sutra motif Naga Balimbur dengan pewarna kunyit dan ulin.",
    svgCenter: { x: 444.1, y: 228.8 }
  },
  "kalimantan-timur": {
    id: "kalimantan-timur",
    name: "Kalimantan Timur",
    island: "Kalimantan",
    capital: "Samarinda",
    shortStatement: "Mutiara serat Doyo Dayak Benuaq dan kriya manik-manik Borneo.",
    shortDescription: "Bumi Etam yang melestarikan serat daun liar Doyo menjadi kain tenun purba dan kepiawaian meronce manik-manik Ulap Doyo.",
    heritage: [
      { name: "Tenun Ulap Doyo", category: "Kriya Tekstil Serat Alami", desc: "Kain tenun dari serat daun tanaman liar Doyo yang kuat dan tahan lama warisan Dayak Benuaq." },
      { name: "Kerajinan Manik Dayak Kenyah", category: "Kriya Manik-Manik", desc: "Roncean manik-manik kaca dan kerang pada topi saung dan rompi bermotif Aso kalong." },
      { name: "Alat Musik Sampe", category: "Alat Musik Tradisional", desc: "Gitar kayu tradisional Dayak bersuara syahdu yang dipetik menghadap hutan rimba." }
    ],
    maker: {
      name: "Nenek Merang Benuaq",
      role: "Penenun Serat Doyo",
      quote: "Daun doyo kami ambil dari rawa, diserut dengan bambu, lalu ditenun dengan sabar."
    },
    craftHighlight: "Kain Ulap Doyo motif Naga Berenang berpewarna getah kayu ubar.",
    svgCenter: { x: 464.8, y: 171.4 }
  },
  "bali": {
    id: "bali",
    name: "Bali",
    island: "Lesser Sunda",
    capital: "Denpasar",
    shortStatement: "Persembahan seni Tri Hita Karana dalam ukiran, tari, dan tenun gringsing.",
    shortDescription: "Pulau dewata tempat seni, upacara keagamaan, dan kehidupan sehari-hari menyatu abadi dalam keagungan Tenun Gringsing dan Tari Kecak.",
    heritage: [
      { name: "Tenun Gringsing Tenganan", category: "Kriya Tekstil Langka Dunia", desc: "Satu-satunya kain tenun ikat ganda di Indonesia dengan teknik pewarnaan alami membutuhkan waktu bertahun-tahun." },
      { name: "Tari Kecak Uluwatu", category: "Seni Paduan Suara & Tari", desc: "Tarian dramatis Ramayana yang diiringi paduan vokal ritmis puluhan pria bertelanjang dada." },
      { name: "Seni Ukir Kayu Gianyar", category: "Seni Pahat Tradisional", desc: "Keahlian memahat kayu cendana dan jati bertemakan figur mitologi Hindu yang ekspresif." }
    ],
    maker: {
      name: "I Wayan Sudira",
      role: "Maestro Pahat Kayu Mas Ubud",
      quote: "Setiap guratan pahat adalah persembahan suci untuk memuliakan keindahan Hyang Widhi."
    },
    craftHighlight: "Kain Tenun Ikat Ganda Gringsing Wayang Kebo berpewarna akar mengkudu.",
    svgCenter: { x: 432.5, y: 351.0 }
  },
  "nusa-tenggara-barat": {
    id: "nusa-tenggara-barat",
    name: "Nusa Tenggara Barat",
    island: "Lesser Sunda",
    capital: "Mataram",
    shortStatement: "Ketelatenan Tenun Songket Sasak Sukarara dan gerabah Banyumulek.",
    shortDescription: "Bumi Lombok dan Sumbawa yang terkenal dengan tradisi tenun ikat pakan Sukarara serta kerajinan tanah liat gerabah alami.",
    heritage: [
      { name: "Tenun Songket Sasak", category: "Kriya Tekstil", desc: "Tenun tangan motif Subahnale yang sarat rasa syukur dan pantang ditenun sembarangan." },
      { name: "Gerabah Lombok Banyumulek", category: "Kriya Keramik Tradisional", desc: "Kerajinan tanah liat bertekstur khas dengan teknik pembakaran jerami terbuka." },
      { name: "Tradisi Peresean", category: "Seni Bela Diri Tradisional", desc: "Pertarungan persahabatan dua kesatria bersenjatakan tongkat rotan dan tamis kulit sapi." }
    ],
    maker: {
      name: "Inaq Nuraini",
      role: "Penenun Songket Sasak Sukarara",
      quote: "Sebelum seorang gadis Sasak menikah, ia harus menuntaskan selembar kain Subahnale dengan jemarinya."
    },
    craftHighlight: "Songket Sasak motif Subahnale bertabur benang emas kapas.",
    svgCenter: { x: 495.0, y: 353.5 }
  },
  "nusa-tenggara-timur": {
    id: "nusa-tenggara-timur",
    name: "Nusa Tenggara Timur",
    island: "Lesser Sunda",
    capital: "Kupang",
    shortStatement: "Simfoni dawai Sasando dan ragam tenun ikat purba kepulauan.",
    shortDescription: "Gugusan pulau eksotis dari Sumba hingga Rote tempat petikan Sasando daun lontar berpadu dengan Tenun Ikat Sumba bermotif kuda penjelajah.",
    heritage: [
      { name: "Tenun Ikat Sumba", category: "Kriya Tekstil Masterpiece", desc: "Kain sakral bergambar kuda, buaya, dan pohon tengkorak berpewarna akar kombu dan nila." },
      { name: "Alat Musik Sasando Rote", category: "Alat Musik Petik Unik", desc: "Instrumen petik berdawai banyak yang dilingkupi resonator anyaman daun lontar berdesir merdu." },
      { name: "Kampung Adat Wae Rebo", category: "Arsitektur Vernakular", desc: "Desa pusaka dengan tujuh rumah kerucut Mbaru Niang di ketinggian kabut pegunungan Flores." }
    ],
    maker: {
      name: "Mama Rambu Koni",
      role: "Penenun Ikat Pewarna Alam Sumba",
      quote: "Warna biru dari daun wora dan merah dari akar mengkudu menjaga napas leluhur kami tetap hidup."
    },
    craftHighlight: "Tenun Ikat Sumba Hinggi motif Kuda Kesatria berpewarna kombu asli.",
    svgCenter: { x: 565.5, y: 351.8 }
  },
  "sulawesi-utara": {
    id: "sulawesi-utara",
    name: "Sulawesi Utara",
    island: "Sulawesi",
    capital: "Manado",
    shortStatement: "Denting orkestra Kolintang kayu cempaka dan Tenun Bentenan.",
    shortDescription: "Semenanjung Minahasa yang kaya musikalitas instrumen kolintang bambu/kayu serta kain sakral Bentenan bermotif purba.",
    heritage: [
      { name: "Musik Kolintang Minahasa", category: "Ansambel Musik Kayu", desc: "Alat musik bilah kayu cempaka bernada merdu yang dimainkan secara orkestra bersama." },
      { name: "Kain Tenun Bentenan", category: "Kriya Tekstil Purba", desc: "Kain tenun kuno Minahasa yang ditenun rapat dari serat pohon pisang dan katun lokal." },
      { name: "Tari Kabasaran", category: "Seni Tari Prajurit", desc: "Tarian perang adat Minahasa berpakaian merah gagah dengan pedang santi dan topi berhias bulu burung." }
    ],
    maker: {
      name: "Oma Vonny Bentenan",
      role: "Penenun Kain Bentenan",
      quote: "Bertenun Bentenan adalah menyusun kembali serpihan sejarah Minahasa yang sempat tertidur."
    },
    craftHighlight: "Kain Bentenan motif Pinatikan berpewarna kulit kayu pangi.",
    svgCenter: { x: 628.0, y: 118.0 }
  },
  "gorontalo": {
    id: "gorontalo",
    name: "Gorontalo",
    island: "Sulawesi",
    capital: "Gorontalo",
    shortStatement: "Ketelitian sulaman tangan Karawo dan tradisi Serambi Madinah.",
    shortDescription: "Bumi Serambi Madinah di teluk Tomini yang terkenal dengan sulaman tangan Karawo yang mencabut dan merajut kembali serat kain.",
    heritage: [
      { name: "Sulam Karawo", category: "Kriya Sulam Masterpiece", desc: "Seni menyulam dengan memotong dan mencabut benang dasar kain satu per satu sebelum disulam ulang." },
      { name: "Tradisi Tumbilotohe", category: "Festival Budaya Cahaya", desc: "Malam pasang jutaan lampu minyak damar di sepanjang jalan menjelang akhir Ramadan." },
      { name: "Tari Dana-Dana", category: "Seni Tari Tradisional", desc: "Tarian pergaulan bernuansa Islami dengan gerak lincah dinamis mengikuti petikan gambus." }
    ],
    maker: {
      name: "Ibu Yanti Karawo",
      role: "Maestro Pengiris & Penyulam Karawo",
      quote: "Mencabut benang kain selebar satu milimeter butuh ketajaman mata dan keheningan jiwa."
    },
    craftHighlight: "Sulam Karawo Ikat motif Bunga Teratai pada kain sutra organza.",
    svgCenter: { x: 582.6, y: 159.7 }
  },
  "sulawesi-tengah": {
    id: "sulawesi-tengah",
    name: "Sulawesi Tengah",
    island: "Sulawesi",
    capital: "Palu",
    shortStatement: "Misteri megalitikum Lembah Bada dan kelembutan Kain Kulit Kayu.",
    shortDescription: "Jantung Sulawesi dengan situs arca megalitik purba serta teknologi pembuatan pakaian dari kulit kayu pohon beringin (kain Fuya).",
    heritage: [
      { name: "Kain Kulit Kayu Fuya", category: "Kriya Tradisional Tertua", desc: "Kain yang dibuat dengan memukul kulit pohon beringin menggunakan batu ike hingga halus dan elastis." },
      { name: "Patung Megalit Lembah Bada", category: "Situs Arkeologi Dunia", desc: "Monumen batu megalitik misterius berwajah manusia ekspresif dari ribuan tahun silam." },
      { name: "Tari Dero Poso", category: "Seni Tari Persaudaraan", desc: "Tarian melingkar massal di bawah sinar bulan purnama sebagai lambang persatuan warga." }
    ],
    maker: {
      name: "Mama Tineke Bada",
      role: "Pembuat Kain Kulit Kayu",
      quote: "Batu ike kami pukulkan dengan irama, menjadikan kulit kayu selembut kain tenun modern."
    },
    craftHighlight: "Kain Fuya bermotif lukis getah pinus alami.",
    svgCenter: { x: 561.1, y: 188.4 }
  },
  "sulawesi-barat": {
    id: "sulawesi-barat",
    name: "Sulawesi Barat",
    island: "Sulawesi",
    capital: "Mamuju",
    shortStatement: "Ketangguhan pelaut Perahu Sandeq dan Tenun Sa'be Mandar.",
    shortDescription: "Pesisir Mandar yang melahirkan Perahu Cadik Sandeq tercepat di dunia serta tenun sutra Sa'be Mandar bercorak catur Sure'.",
    heritage: [
      { name: "Perahu Sandeq Mandar", category: "Karya Bahari Tradisional", desc: "Perahu layar cadik kayu ramping yang mampu meluncur membelah ombak dengan kecepatan luar biasa." },
      { name: "Tenun Sa'be Mandar", category: "Kriya Tekstil Sutra", desc: "Tenun sutra bermotif kotak-kotak geometris Sure' Salaka yang anggun." },
      { name: "Tari Sayyang Pattu'du", category: "Atraksi Budaya Kuda Menari", desc: "Aksi kuda terlatih yang menari berjingkrak mengikuti tabuhan rebana dalam khataman Quran." }
    ],
    maker: {
      name: "Punggawa Arsyad",
      role: "Pembuat Perahu Sandeq",
      quote: "Sandeq terbang di atas air karena tubuhnya langsing dan kayunya dipilih dari pohon pilihan gunung."
    },
    craftHighlight: "Tenun Sa'be Mandar motif Sure' Penghulu sutra alam.",
    svgCenter: { x: 521.0, y: 224.3 }
  },
  "sulawesi-selatan": {
    id: "sulawesi-selatan",
    name: "Sulawesi Selatan",
    island: "Sulawesi",
    capital: "Makassar",
    shortStatement: "Keagungan bahari Kapal Pinisi dan kemegahan ukiran Toraja.",
    shortDescription: "Bumi Bugis-Makassar dan Toraja yang melahirkan mahakarya maritim Kapal Pinisi serta ukiran kayu Pa'ssura Tongkonan.",
    heritage: [
      { name: "Perahu Pinisi Bulukumba", category: "Karya Maritim UNESCO", desc: "Kapal layar kayu tanpa paku besi yang dibangun dengan intuisi dan ritual leluhur maritim Bugis." },
      { name: "Tongkonan & Ukiran Toraja", category: "Arsitektur & Seni Pahat", desc: "Rumah adat beratap perahu dengan dinding kayu bertatahkan ratusan motif geometris suci." },
      { name: "Kain Sutra Sengkang", category: "Kriya Tekstil Sutra Alam", desc: "Tenun sutra alam Wajo berona cerah keemasan motif kotak-kotak Lagoosi." }
    ],
    maker: {
      name: "Panrita Lopi Muhammad",
      role: "Ahli Pembuat Kapal Pinisi",
      quote: "Kayu bitti dan ulin kami satukan dengan pasak kayu dan doa agar pinisi tahan badai samudera."
    },
    craftHighlight: "Miniatur Kapal Pinisi kayu ulin asli dengan 7 layar bertingkat.",
    svgCenter: { x: 538.4, y: 250.8 }
  },
  "sulawesi-tenggara": {
    id: "sulawesi-tenggara",
    name: "Sulawesi Tenggara",
    island: "Sulawesi",
    capital: "Kendari",
    shortStatement: "Kemilau Tenun Buton dan benteng keraton batu terluas dunia.",
    shortDescription: "Kawasan kepulauan Buton dan Muna yang memelihara keindahan Tenun Buton bermotif naga serta Benteng Keraton Wolio.",
    heritage: [
      { name: "Tenun Ikat Buton", category: "Kriya Tekstil Istana", desc: "Kain tenun bermotif motif nanas dan daun tembakau berhias benang warna-warni semarak." },
      { name: "Benteng Keraton Buton", category: "Situs Sejarah Dunia", desc: "Benteng pertahanan batu kapur terluas di dunia yang mengelilingi istana kesultanan." },
      { name: "Kriya Filigri Perak Kendari", category: "Kriya Logam Halus", desc: "Kerajinan kawat perak pintal motif laba-laba dan anggrek yang sangat lembut." }
    ],
    maker: {
      name: "Wa Ode Sitti",
      role: "Penenun Istana Buton",
      quote: "Setiap corak tenun Buton menunjukkan martabat dan kearifan seorang perempuan di keluarganya."
    },
    craftHighlight: "Tenun Buton motif Kasopa dengan benang sutra pakan rapat.",
    svgCenter: { x: 577.2, y: 255.7 }
  },
  "maluku-utara": {
    id: "maluku-utara",
    name: "Maluku Utara",
    island: "Maluku",
    capital: "Sofifi",
    shortStatement: "Kejayaan empat kesultanan Moloku Kie Raha dan Tenun Pualam Ternate.",
    shortDescription: "Negeri empat kesultanan legendaris (Ternate, Tidore, Bacan, Jailolo) yang kaya rempah cengkih dan seni tari Soya-Soya.",
    heritage: [
      { name: "Batik Tubo & Tenun Tidore", category: "Kriya Tekstil Kesultanan", desc: "Tenunan dan batik bermotif cengkih, pala, dan daun Salawaku khas Kesultanan Tidore." },
      { name: "Tari Soya-Soya", category: "Seni Tari Kemenangan", desc: "Tarian patriotik penyambutan pahlawan dengan daun kelapa kuning penolak mara bahaya." },
      { name: "Benteng Tolukko & Kastela", category: "Situs Arkeologi Maritim", desc: "Benteng batu karang saksi sejarah perdagangan rempah dunia sejak abad ke-16." }
    ],
    maker: {
      name: "Ibu Maryam Tidore",
      role: "Penenun Kain Pualam Kesultanan",
      quote: "Biji pala dan bunga cengkih bukan hanya rempah dapur, ia adalah mahkota kehormatan tanah kami."
    },
    craftHighlight: "Kain Tenun Tidore motif Bunga Cengkih bertabur benang suasa.",
    svgCenter: { x: 705.0, y: 155.0 }
  },
  "maluku": {
    id: "maluku",
    name: "Maluku",
    island: "Maluku",
    capital: "Ambon",
    shortStatement: "Negeri Kepulauan Rempah, harmoni Tifa, dan semarak Tari Cakalele.",
    shortDescription: "Kepulauan rempah pala dan cengkih yang menjadi rebutan dunia, berpadu dengan alunan musik Tahuri kulit kerang dan ketukan ritmis Tifa.",
    heritage: [
      { name: "Musik Terompet Kerang (Tahuri)", category: "Alat Musik Bahari", desc: "Instrumen tiup dari kulit kerang laut raksasa bernada beragam yang ditiup untuk panggilan adat." },
      { name: "Tari Cakalele", category: "Seni Tari Perang", desc: "Tarian perang penuh energi dengan parang dan salawaku yang mencerminkan keberanian masyarakat Maluku." },
      { name: "Kerajinan Sisik Mutiara & Kulit Bia", category: "Kriya Maritim", desc: "Hiasan dan ornamen kapal dari kulit kerang mutiara laut Banda yang berkilau alami." }
    ],
    maker: {
      name: "Om Dominggus",
      role: "Pembuat Alat Musik Tahuri & Tifa",
      quote: "Kerang laut menyimpan suara ombak samudera Banda, kami hanya membantunya bernyanyi."
    },
    craftHighlight: "Tifa Maluku kayu linggua ukir dengan kulit rusa alami.",
    svgCenter: { x: 730.0, y: 248.0 }
  },
  "papua-barat-daya": {
    id: "papua-barat-daya",
    name: "Papua Barat Daya",
    island: "Papua",
    capital: "Sorong",
    shortStatement: "Gerbang mutiara bahari Raja Ampat dan seni ukir suku Moi.",
    shortDescription: "Provinsi termuda ke-38 Indonesia yang menjadi pintu gerbang wisata bahari dunia, diperkaya seni anyaman pandan laut suku Moi.",
    heritage: [
      { name: "Kain Tenun Belak Suku Moi", category: "Kriya Tekstil Tradisional", desc: "Kain tenun kuno bermotif garis geometris pemersatu marga di semenanjung Sorong." },
      { name: "Anyaman Daun Tikar Suku Maybrat", category: "Kriya Anyaman Alami", desc: "Tikar bermotif anyam timbul yang dipakai dalam upacara adat pelunasan harta mas kawin." },
      { name: "Tradisi Sasi Laut", category: "Kearifan Konservasi Pesisir", desc: "Larangan adat memanen biota laut pada periode tertentu demi menjaga populasi ikan tetap berlimpah." }
    ],
    maker: {
      name: "Mama Yohana Sorong",
      role: "Penganyam Daun Pandan Pesisir",
      quote: "Sasi laut mengajarkan kita untuk tidak serakah pada samudera yang telah memberi kita makan."
    },
    craftHighlight: "Tikar anyam daun pandan laut motif Belak dengan pewarna getah bakau.",
    svgCenter: { x: 780.0, y: 192.0 }
  },
  "papua-barat": {
    id: "papua-barat",
    name: "Papua Barat",
    island: "Papua",
    capital: "Manokwari",
    shortStatement: "Mahkota keanekaragaman hayati Raja Ampat dan kain Rumput Arfak.",
    shortDescription: "Kawasan kepala burung Papua tempat keajaiban karang laut Raja Ampat dan kearifan masyarakat pegunungan Arfak merajut serat rumput.",
    heritage: [
      { name: "Kain Tenun Rumput Ransiki", category: "Kriya Anyam Pegunungan", desc: "Kain tradisional berbahan serat rumput rawa pegunungan Arfak yang ditenun secara khusus." },
      { name: "Situs Kepulauan Raja Ampat", category: "Geopark & Kawasan Konservasi", desc: "Gugusan pulau karang karst dengan biodiversitas laut terkaya di planet bumi." },
      { name: "Tari Tumbuk Tanah (Yospan)", category: "Seni Tari Kebersamaan", desc: "Tarian hentakan kaki berirama dinamis ungkapan sukacita persaudaraan suku Arfak." }
    ],
    maker: {
      name: "Mama Ruth Arfak",
      role: "Penganyam Serat Rumput",
      quote: "Kami memetik rumput hanya saat musim kering tiba, agar alam tetap subur untuk anak cucu."
    },
    craftHighlight: "Anyaman serat rumput Arfak dengan manik biji-bijian rimba.",
    svgCenter: { x: 805.0, y: 218.0 }
  },
  "papua-tengah": {
    id: "papua-tengah",
    name: "Papua Tengah",
    island: "Papua",
    capital: "Nabire",
    shortStatement: "Keagungan puncak salju Carstensz dan Noken anggrek suku Mee.",
    shortDescription: "Kawasan pegunungan salju abadi Nusantara tempat masyarakat suku Mee dan Dani membuat noken serat batang anggrek hutan kuning keemasan.",
    heritage: [
      { name: "Noken Anggrek Kuning Mee", category: "Kriya Anyam Langka", desc: "Noken anyaman serat kulit batang anggrek hutan yang berkilau warna kuning emas alami tanpa pewarna buatan." },
      { name: "Koteka Suku Dani & Mee", category: "Busana Tradisional Tradisi", desc: "Penutup tubuh tradisional dari labu air kering yang dibakar dan diukir motif suku." },
      { name: "Tradisi Bakar Batu (Barapen)", category: "Ritual Perdamaian & Syukur", desc: "Prosesi memasak bersama menggunakan batu membara sebagai perekat silaturahmi antar marga." }
    ],
    maker: {
      name: "Mama Martha Nabire",
      role: "Penganyam Noken Anggrek",
      quote: "Anggrek kuning di pohon tinggi hanya kami ambil secukupnya agar bunganya tetap mekar di rimba."
    },
    craftHighlight: "Noken Anggrek serat kuning emas dipadu manik taring kayu.",
    svgCenter: { x: 878.0, y: 240.0 }
  },
  "papua-pegunungan": {
    id: "papua-pegunungan",
    name: "Papua Pegunungan",
    island: "Papua",
    capital: "Wamena",
    shortStatement: "Pesona Lembah Baliem, rumah Honai, dan tradisi mumi leluhur.",
    shortDescription: "Lembah subur diapit puncak pegunungan Jayawijaya tempat kearifan arsitektur rumah bundar Honai dan pertunjukan perang adat Baliem.",
    heritage: [
      { name: "Arsitektur Rumah Honai", category: "Arsitektur Tradisional", desc: "Rumah bundar beratap jerami tanpa jendela yang dirancang menahan hawa dingin pegunungan tinggi." },
      { name: "Mumi Jiwika Wamena", category: "Warisan Arkeologi Adat", desc: "Pelestarian jasad para kepala suku terhormat dengan teknik pengasapan tradisional beratus-ratus tahun." },
      { name: "Festival Budaya Lembah Baliem", category: "Festival Kolosal", desc: "Simulasi perang antarsuku untuk melestarikan ketangkasan melempar tombak dan memanah." }
    ],
    maker: {
      name: "Bapak Obeth Wamena",
      role: "Pembuat Rangka Kayu Honai",
      quote: "Atap jerami honai mengumpulkan kehangatan api, menyatukan keluarga kami saat malam berkabut tebal."
    },
    craftHighlight: "Miniatur Rumah Honai kayu rotan dengan atap rumput ilalang asli.",
    svgCenter: { x: 938.0, y: 255.0 }
  },
  "papua": {
    id: "papua",
    name: "Papua",
    island: "Papua",
    capital: "Jayapura",
    shortStatement: "Tas Noken anyaman serat kayu dan lukisan kulit kayu Asei.",
    shortDescription: "Tanah matahari terbit dengan danau Sentani yang menghasilkan tas rajut Noken warisan dunia UNESCO dan seni lukis kulit kayu kombouw.",
    heritage: [
      { name: "Tas Noken Papua", category: "Warisan Budaya Dunia UNESCO", desc: "Tas anyaman serat kulit kayu mahkota pohon yang disangkutkan di dahi sebagai simbol kehidupan dan rahim ibu." },
      { name: "Lukisan Kulit Kayu Khombouw", category: "Seni Rupa Tradisional Asei", desc: "Lukisan motif ikan, danau, dan burung cenderawasih di atas lembaran kulit kayu pohon kombouw." },
      { name: "Tifa & Ukiran Asmat Sentani", category: "Seni Pahat Kayu", desc: "Alat musik perkusi berukir totem leluhur pengiring tarian suku di tepi danau." }
    ],
    maker: {
      name: "Mama Agustina Noken",
      role: "Pengrajin Noken Serat Pohon Mahkota",
      quote: "Noken adalah tempat kami menyimpan hasil kebun, menjaga anak, dan merawat persaudaraan."
    },
    craftHighlight: "Noken serat pohon genemo berpewarna buah hutan alami.",
    svgCenter: { x: 935.0, y: 185.0 }
  },
  "papua-selatan": {
    id: "papua-selatan",
    name: "Papua Selatan",
    island: "Papua",
    capital: "Merauke",
    shortStatement: "Puncak mahakarya seni ukir Asmat dan sabana rawa Merauke.",
    shortDescription: "Kawasan rawa pasang surut tempat maestro Asmat memahat patung bisj tiang leluhur yang diakui museum-museum seni rupa dunia.",
    heritage: [
      { name: "Seni Ukir Kayu Asmat", category: "Masterpiece Seni Pahat Dunia", desc: "Ukiran patung tiang Bisj dari satu batang pohon bakau utuh untuk menghormati roh leluhur." },
      { name: "Perisai Perang Jamas Asmat", category: "Kriya Ukir & Ritual", desc: "Perisai kayu bakau dengan motif ukir kepala burung kasuari penolak marabahaya." },
      { name: "Tari Gatzi Marind", category: "Seni Tari Sakral", desc: "Tarian syukur suku Marind-Anim dengan giring-giring biji buah dan rias bulu cenderawasih." }
    ],
    maker: {
      name: "Pius Ukir Asmat",
      role: "Maestro Pahat Asmat",
      quote: "Setiap mata kayu adalah mata leluhur yang mengarahkan pisau pahat kami agar hidup."
    },
    craftHighlight: "Tiang Bisj Asmat kayu besi bakau berpewarna kapur karang dan arang.",
    svgCenter: { x: 936.0, y: 318.0 }
  }
};

if (typeof window !== "undefined") {
  window.PROVINCES_DATA = PROVINCES_DATA;
}
