/**
 * WARISARA — Data Kuis & Edukasi Budaya Nusantara
 * Modul kuis interaktif untuk menguji pemahaman filosofi, karya, dan tradisi lokal.
 */

window.QUIZ_DATA = [
  {
    id: "quiz-01",
    category: "Filosofi Motif",
    title: "Filosofi Batik Parang Rusak",
    level: "Tingkat Dasar",
    province: "DI Yogyakarta",
    question: "Apa makna filosofis ombak berkesinambungan pada motif Batik Parang Rusak?",
    context: "Motif Parang diciptakan oleh Sultan Agung dari Kesultanan Mataram saat bertapa di pesisir Pantai Selatan, terinspirasi oleh gulungan ombak samudra yang tak kenal lelah memecah karang.",
    options: [
      {
        text: "Keteguhan hati, konsistensi moral, & semangat pantang menyerah mengarungi samudra kehidupan",
        correct: true,
        explanation: "Benar! Garis diagonal berombak melambangkan kesinambungan perjuangan manusia melawan hawa nafsu dan keteguhan hati yang tak goyah."
      },
      {
        text: "Peringatan bahaya badai laut selatan yang membawa bencana bagi nelayan",
        correct: false,
        explanation: "Kurang tepat. Motif Parang bukan peringatan bencana fisik, melainkan metafora spiritual tentang keteguhan mental dan kearifan kepemimpinan."
      },
      {
        text: "Simbol kemewahan hasil panen perikanan pesisir Jawa Selatan",
        correct: false,
        explanation: "Kurang tepat. Parang tergolong batik larangan keraton dengan nilai kesatriaan dan etika kekuasaan spiritual."
      }
    ]
  },
  {
    id: "quiz-02",
    category: "Simbol Kriya Tradisi",
    title: "Simbol Kuda pada Tenun Ikat Sumba",
    level: "Tingkat Menengah",
    province: "Nusa Tenggara Timur",
    question: "Mengapa motif kuda (Njara) menjadi salah satu figur sentral paling sakral pada kain tenun adat Sumba?",
    context: "Dalam struktur adat Marapu di Sumba, kuda (Sandalwood pony) memiliki kedudukan istimewa dalam upacara Pasola, ritus belis (mahar), dan pemakaman bangsawan.",
    options: [
      {
        text: "Simbol kepemimpinan, kehormatan, keberanian, dan status martabat ksatria Marapu",
        correct: true,
        explanation: "Tepat sekali! Kuda dalam tenun Sumba melambangkan kekuasaan, keberanian, dan perantara spiritual antara dunia manusia dengan para leluhur."
      },
      {
        text: "Sebagai penanda pergantian musim berburu rusa di padang savana",
        correct: false,
        explanation: "Kurang tepat. Kuda bukan sekadar penanda musim, melainkan simbol kosmologis kedudukan dan kehormatan keluarga bangsawan (Maramba)."
      },
      {
        text: "Sebagai penolak bala terhadap hama tanaman jagung",
        correct: false,
        explanation: "Kurang tepat. Simbol penolak bala pertanian biasanya direpresentasikan oleh motif buaya atau kura-kura, bukan kuda."
      }
    ]
  },
  {
    id: "quiz-03",
    category: "Metalurgi & Spiritual",
    title: "Pamor Keris & Makna Kosmologis",
    level: "Tingkat Lanjut",
    province: "Jawa Tengah",
    question: "Dalam seni tempa tosan aji Nusantara, apa yang dimaksud dengan 'Pamor' pada bilah keris?",
    context: "Keris Indonesia diakui UNESCO sebagai Masterpiece of the Oral and Intangible Heritage of Humanity sejak 2005 karena keunggulan metalurgi, estetika, dan filosofi spiritualnya.",
    options: [
      {
        text: "Pola lapisan kontras antara besi dan batu meteorit (nikel) hasil lipatan ratusan kali",
        correct: true,
        explanation: "Sempurna! Pamor terbentuk dari persatuan unsur bumi (besi) dan unsur langit (nikel meteorit) yang ditempa berulang kali, menyimbolkan manunggaling kawula gusti."
      },
      {
        text: "Cairan racun arsenik alami yang dioleskan pada bilah keris saat perang",
        correct: false,
        explanation: "Kurang tepat. Warangan (arsenik) digunakan untuk merawat dan memunculkan kontras pamor, namun pamor itu sendiri adalah struktur lapisan logamnya."
      },
      {
        text: "Ukiran kaligrafi mantra sansekerta pada gagang kayu cendana",
        correct: false,
        explanation: "Kurang tepat. Ukiran pada gagang keris disebut deder atau hilt, bukan pamor."
      }
    ]
  },
  {
    id: "quiz-04",
    category: "Arsitektur Vernakular",
    title: "Rumah Gadang & Filosofi Alam",
    level: "Tingkat Dasar",
    province: "Sumatera Barat",
    question: "Prinsip hidup Minangkabau apa yang menjadi landasan arsitektur atap melengkung gonjong Rumah Gadang?",
    context: "Arsitektur Rumah Gadang dibangun tanpa paku besi dan mampu meredam guncangan gempa vulkanik Sumatera berkat sambungan pasak kayu elastis.",
    options: [
      {
        text: "'Alam Takambang Jadi Guru' — belajar dari harmoni tanduk kerbau dan pucuk rebung",
        correct: true,
        explanation: "Benar! Alam Takambang Jadi Guru adalah falsafah dasar Minangkabau: menyelaraskan rancang bangun dengan bentuk flora-fauna dan hukum semesta."
      },
      {
        text: "'Bhinneka Tunggal Ika' — simbol persatuan 100 suku pedalaman",
        correct: false,
        explanation: "Kurang tepat. Bhinneka Tunggal Ika adalah semboyan nasional, sedangkan falsafah Minangkabau berpusat pada Alam Takambang Jadi Guru."
      },
      {
        text: "'Silih Asih Silih Asuh' — lambang welas asih antar tetangga desa",
        correct: false,
        explanation: "Kurang tepat. Silih Asih Silih Asuh adalah falsafah luhur masyarakat Sunda, bukan Minangkabau."
      }
    ]
  },
  {
    id: "quiz-05",
    category: "Seni Pertunjukan & Wayang",
    title: "Gunungan / Kayon Wayang Kulit",
    level: "Tingkat Menengah",
    province: "DI Yogyakarta & Jawa",
    question: "Dalam pementasan Wayang Kulit Purwa, figur Gunungan dibalik dari warna hijau/merah ke warna merah menyala untuk menandai:",
    context: "Gunungan atau Kayon adalah pembuka panggung kosmologis jagat pewayangan yang memuat pohon hayat, dua raksasa penjaga, burung garuda, dan api kawah Candradimuka.",
    options: [
      {
        text: "Peralihan babak perang dahsyat (Goro-goro/Pemberontakan) dan pergolakan hawa nafsu duniawi",
        correct: true,
        explanation: "Tepat! Sisi merah melambangkan api amarah, huru-hara semesta, dan pergulatan nafsu manusia pada babak klimaks perang Bharatayuddha."
      },
      {
        text: "Selesainya pementasan dan tanda dalang beristirahat minum teh",
        correct: false,
        explanation: "Kurang tepat. Tanda pentas usai adalah gunungan ditancapkan tegak di tengah simpingan (tancep kayon), bukan dibalik ke sisi merah."
      },
      {
        text: "Munculnya tokoh jenaka Semar dan punakawan",
        correct: false,
        explanation: "Kurang tepat. Munculnya Punakawan ditandai dengan gending khusus dan tarian gunungan melandai, bukan membalik sisi api merah."
      }
    ]
  },
  {
    id: "quiz-06",
    category: "Pewarnaan Alami",
    title: "Misteri Indigofera Nusantara",
    level: "Tingkat Dasar",
    province: "Jawa & NTT",
    question: "Tanaman lokal apakah yang menghasilkan warna biru tua magis pada kain batik klasik dan tenun ikat tradisional?",
    context: "Jauh sebelum pewarna sintetis ditemukan, perajin Nusantara memfermentasi daun perdu selama berhari-hari untuk mendapatkan pasta zat warna biru alami.",
    options: [
      {
        text: "Daun Tom (Indigofera tinctoria) difermentasi bersama gula kelapa & kapur sirih",
        correct: true,
        explanation: "Benar sekali! Daun Tom atau Indigofera difermentasi dalam larutan alkali alami untuk melarutkan indikan menjadi pigmen biru indigo yang legendaris."
      },
      {
        text: "Kulit akar mengkudu tua dicampur air kelapa",
        correct: false,
        explanation: "Kurang tepat. Akar mengkudu (Morinda citrifolia) menghasilkan warna merah kecokelatan khas (merah mengkudu/soga), bukan biru."
      },
      {
        text: "Bunga telang kering yang diseduh air panas",
        correct: false,
        explanation: "Kurang tepat. Bunga telang digunakan untuk pewarna makanan/minuman, namun kurang tahan cuci untuk tekstil tradisi dibanding daun tom."
      }
    ]
  }
];
