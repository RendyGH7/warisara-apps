/**
 * WARISARA — Wari AI Chatbot & Companion System
 * Pemandu Cerdas Budaya Nusantara & Navigasi Web Terintegrasi
 * Mendukung Gemini API (Live Generative AI) + Comprehensive Offline Cultural Knowledge Base
 */

(function () {
  'use strict';

  // Path resolver otomatis agar aset selalu tepat di root maupun di /pages/
  const isInPages = window.location.pathname.includes('/pages/');
  const BASE = isInPages ? '../' : './';

  const IMGS = {
    idle: BASE + 'assets/mascot/wari-idle-clean.png',
    happy: BASE + 'assets/mascot/wari-happy-clean.png',
    thinking: BASE + 'assets/mascot/wari-thinking.png',
  };

  // Preload gambar maskot
  Object.values(IMGS).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Konteks Halaman & Sapaan Pintar
  function getCurrentPageContext() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('ekonomi-kreatif')) {
      return {
        id: 'ekonomi-kreatif',
        name: 'Etalase Produk Lokal & Kriya',
        tooltip: 'Mau cari kriya langka atau tanya cara chat pengrajin? Wari siap bantu! 🛍️',
        welcome: 'Halo! Sedang mencari produk lokal Nusantara yang unik? Tanyakan padaku tentang filosofi kriya, harga, atau cara bertransaksi langsung dengan pengrajin lokal ya! 🛍️✨'
      };
    }
    if (path.includes('detail-produk')) {
      return {
        id: 'detail-produk',
        name: 'Detail Karya Kriya',
        tooltip: 'Karya ini sarat filosofi lho! Mau tahu kisah rahasia di baliknya? ✨',
        welcome: 'Wah, kamu sedang melihat karya adiluhung! Ingin tahu asal usul material, makna motif, atau latar belakang pengrajin yang membuatnya? Tanyakan saja! 🏺'
      };
    }
    if (path.includes('jelajahi')) {
      return {
        id: 'jelajahi',
        name: 'Jelajah 38 Provinsi',
        tooltip: 'Ada 38 provinsi di Nusantara! Provinsi mana yang ingin kamu telusuri? 🗺️',
        welcome: 'Selamat datang di peta 38 Provinsi! Mau tahu rumah adat, tarian tradisional, atau kearifan lokal di salah satu daerah Indonesia? Sebutkan saja namanya! 🗺️'
      };
    }
    if (path.includes('cerita')) {
      return {
        id: 'cerita',
        name: 'Cerita Rakyat Nusantara',
        tooltip: 'Ssst... ada legenda leluhur penuh hikmah. Mau kubacakan? 📖',
        welcome: 'Kisah rakyat Nusantara menyimpan nasihat bijak para leluhur. Mau rekomendasi cerita seperti Malin Kundang, Roro Jonggrang, atau legenda Danau Toba? 📜'
      };
    }
    if (path.includes('belajar')) {
      return {
        id: 'belajar',
        name: 'Pusat Belajar & Kuis',
        tooltip: 'Ayo uji wawasan budayamu! Siap dapat skor tertinggi? 🎯',
        welcome: 'Selamat belajar Sobat Warisara! Butuh kisi-kisi tentang warisan budaya dunia UNESCO atau fakta unik provinsi untuk kuis? Tanyakan padaku! 💡'
      };
    }
    if (path.includes('heritage-modern')) {
      return {
        id: 'heritage-modern',
        name: 'Heritage × Modern',
        tooltip: 'Lihat bagaimana tradisi bertemu era futuristik! 🎨',
        welcome: 'Di sini tradisi Nusantara bertransformasi secara modern dan relevan! Ingin tahu bagaimana batik dan motif kuno diadopsi di dunia fashion dan desain masa kini? 🌟'
      };
    }
    if (path.includes('creative-lab')) {
      return {
        id: 'creative-lab',
        name: 'Creative Lab Canvas',
        tooltip: 'Waktunya berkreasi dengan ornamen Nusantara! 🖌️',
        welcome: 'Ruang kreasi budaya terbuka lebar! Ingin tips memadukan motif Megamendung dengan Kawung, atau ide karya kriya baru? Yuk berdiskusi! 🎨'
      };
    }
    if (path.includes('makers')) {
      return {
        id: 'makers',
        name: 'Profil Pelestari & Maestro',
        tooltip: 'Kenali para pahlawan penjaga budaya kita! 🌿',
        welcome: 'Para maestro dan penenun di pelosok desa adalah penjaga denyut warisan kita. Mau tahu kisah perjuangan mereka melestarikan seni pusaka? 🙏'
      };
    }
    return {
      id: 'home',
      name: 'Beranda WARISARA',
      tooltip: 'Halo! Aku Si Wari, pemandu budaya cerdasmu. Klik aku untuk ngobrol! 👋✨',
      welcome: 'Halo Sobat Warisara! 👋 Aku **Si Wari**, asisten pemandu pintar resmi WARISARA. Aku tahu segalanya tentang isi web ini, 38 provinsi, dan seluruh budaya Nusantara dari Sabang sampai Merauke. Ada yang ingin kamu tanyakan hari ini? 🇮🇩✨'
    };
  }

  // Ensiklopedia Budaya & Panduan Web Komprehensif (Offline Knowledge Engine)
  const CULTURAL_KNOWLEDGE = [
    {
      keywords: ['fitur', 'web', 'warisara', 'tentang', 'menu', 'halaman', 'apa saja'],
      answer: `**Fitur Unggulan di WARISARA (Warisan Rasa Kita):**
1. 🗺️ **[Peta Jelajah 38 Provinsi](jelajahi.html)**: Ensiklopedia lengkap budaya, senjata, rumah adat, tarian, dan kuliner dari seluruh penjuru Indonesia.
2. 🛍️ **[Etalase Produk Lokal](ekonomi-kreatif.html)**: Koleksi 14 karya kriya otentik langsung dari pengrajin daerah (Wastra, Keramik, Logam, Anyaman, Kuliner).
3. 💬 **C2C Marketplace & Chat Facebook-Style**: Transaksi personal langsung dengan pengrajin lokal tanpa perantara dan tanpa potongan biaya.
4. 📖 **[Cerita Rakyat Nusantara](cerita.html)**: Kisah lisan berilustrasi dan narasi suara yang sarat nilai budi pekerti.
5. 🎯 **[Pusat Belajar](belajar.html)**: Modul interaktif dan kuis budaya untuk menguji pengetahuan warisan adiluhung bangsa.
6. 🎨 **[Heritage × Modern](heritage-modern.html)** & **[Creative Lab](creative-lab.html)**: Ruang inovasi kolaboratif seni tradisi dan kanvas kreasi.`
    },
    {
      keywords: ['cara beli', 'beli produk', 'transaksi', 'chat penjual', 'order', 'pesan'],
      answer: `**Cara Berbelanja & Bertransaksi di WARISARA:**
1. Masuk ke halaman **[Etalase Produk Lokal](ekonomi-kreatif.html)** atau klik salah satu kartu kriya.
2. Pastikan Anda telah masuk dengan Akun Google (Login instan).
3. Klik tombol **"Chat Penjual & Beli Langsung"** pada produk pilihan Anda.
4. Jendela obrolan bergaya Facebook Messenger akan terbuka langsung ke penjual/pengrajin asli.
5. Anda dapat menanyakan ketersediaan stok, memesan motif custom, dan menyepakati metode pembayaran (transfer bank / COD) secara transparan! 🤝`
    },
    {
      keywords: ['jual', 'pasang iklan', 'pengrajin', 'daftar produk'],
      answer: `**Cara Mendaftarkan Karya Kriya Anda di WARISARA:**
1. Kunjungi halaman **[Etalase Produk Lokal](ekonomi-kreatif.html)**.
2. Di bagian atas etalase, klik tombol emas **"+ Jual Produk"**.
3. Lengkapi formulir: Nama produk, Kategori kriya, Wilayah asal, Material alami, Filosofi, Harga, dan tautan/upload foto karya.
4. Klik **"Terbitkan Produk ke Etalase"** — produk Anda akan langsung muncul di katalog paling atas bagi seluruh pengunjung! 🌟`
    },
    {
      keywords: ['batik parang', 'parang rusak', 'batik jogja'],
      answer: `**Kain Panjang Batik Tulis Parang Rusak Barong (Yogyakarta):**
- **Asal**: Giriloyo, Imogiri, D.I. Yogyakarta
- **Filosofi**: Motif Parang menyerupai deburan ombak karang laut selatan yang tak pernah surut. Melambangkan semangat pantang menyerah, keteguhan hati, dan kepemimpinan yang arif.
- **Proses**: Dibuat dengan canting malam dingin selama 28 hari dengan pewarna alami kulit mahoni & soga Jawa.
- **Harga**: Rp 1.850.000 (Dibuat oleh Mbah Cipto & Paguyuban Giriloyo).
- 👉 **[Lihat Detail Batik Parang](detail-produk.html?id=batik-tulis-jogja-parang)**`
    },
    {
      keywords: ['mega mendung', 'batik cirebon', 'megamendung'],
      answer: `**Kain Batik Sutra Mega Mendung Biru (Cirebon):**
- **Asal**: Trusmi, Cirebon, Jawa Barat
- **Filosofi**: Bentuk awan bergradasi 7 lapis melambangkan langit pembawa berkah hujan serta ajaran luhur untuk selalu menahan amarah dan bersikap tenang menyejukkan.
- **Material**: 100% Sutra Super Halus & Pewarna Alami Indigofera gradasi tujuh tingkatan.
- **Harga**: Rp 1.650.000.
- 👉 **[Lihat Detail Batik Mega Mendung](detail-produk.html?id=batik-mega-mendung-cirebon)**`
    },
    {
      keywords: ['noken', 'papua', 'tas noken', 'wamena'],
      answer: `**Tas Noken Tradisi Serat Kayu Anggrek (Papua Pegunungan):**
- **Asal**: Wamena, Lembah Baliem, Papua Pegunungan
- **Keistimewaan**: Diakui oleh **UNESCO** sebagai Warisan Budaya Takbenda yang Membutuhkan Perlindungan Mendesak.
- **Filosofi**: Noken dianyam menggunakan tangan dan diletakkan di kepala, menyimbolkan rahim ibu, kesuburan tanah, perdamaian, serta persaudaraan suku pegunungan.
- **Material**: Serat kulit pohon melinjo dipadu serat anggrek hutan pegunungan.
- **Harga**: Rp 275.000.
- 👉 **[Lihat Detail Noken Wamena](detail-produk.html?id=noken-wamena)**`
    },
    {
      keywords: ['keris', 'madura', 'aeng tong-tong', 'sumenep', 'pusaka'],
      answer: `**Keris Dapur Sengkelat Pamor Wos Wutah (Madura):**
- **Asal**: Aeng Tong-tong, Sumenep, Jawa Timur
- **Pamor**: Beras Wutah (Wos Wutah) yang bermakna doa keselamatan, rezeki berlimpah, dan ketenteraman hidup keluarga.
- **Dapur**: Sengkelat dengan 13 lekukan (luk 13) yang anggun berbahan baja tempa 128 lapis.
- **Keistimewaan**: Desa Aeng Tong-tong dinobatkan UNESCO sebagai desa dengan empu keris aktif terbanyak di dunia!
- **Harga**: Rp 3.200.000.
- 👉 **[Lihat Detail Keris Madura](detail-produk.html?id=keris-kamardikan-madura)**`
    },
    {
      keywords: ['ulos', 'batak', 'ragidup', 'toba'],
      answer: `**Kain Tenun Ulos Ragidup Batak Toba (Sumatera Utara):**
- **Asal**: Toba Samosir, Sumatera Utara
- **Arti Nama**: *Ragi Hidup* berarti "pola kehidupan". Merupakan derajat ulos paling tinggi dan sakral dalam adat Batak.
- **Makna**: Diberikan oleh orang tua kepada pengantin atau anak sebagai doa kesehatan panjang umur, kesejahteraan, dan kehormatan marga.
- **Material**: Benang katun pintal dengan pewarna alami daun Salaon tradisional.
- **Harga**: Rp 1.100.000.
- 👉 **[Lihat Detail Ulos Ragidup](detail-produk.html?id=kain-ulos-ragidup)**`
    },
    {
      keywords: ['sumba', 'tenun sumba', 'sabana'],
      answer: `**Syal Tenun Sabana Pewarna Alami Sumba Timur (NTT):**
- **Asal**: Sumba Timur, Nusa Tenggara Timur
- **Motif**: Motif Kuda penjelajah melambangkan keteguhan hati, martabat luhur, dan jiwa perintis mengarungi sabana hidup.
- **Pewarna**: Ekstrak akar mengkudu dan lumpur alami dengan proses celup berulang selama 40 hari.
- **Harga**: Rp 850.000.
- 👉 **[Lihat Detail Tenun Sumba](detail-produk.html?id=syal-tenun-sumba)**`
    },
    {
      keywords: ['kopi gayo', 'kopi aceh', 'takengon'],
      answer: `**Biji Kopi Arabika Gayo Takengon Micro-Lot (Aceh):**
- **Asal**: Takengon, Dataran Tinggi Gayo, Aceh (1.500 mdpl)
- **Karakter Rasa**: Sweet peach, floral jasmine, brown sugar dengan keasaman segar seimbang.
- **Proses**: Honey Process fermentasi lambat 18 hari dan penjemuran di bawah sinar matahari pegunungan.
- **Harga**: Rp 135.000 (200 gr).
- 👉 **[Lihat Detail Kopi Gayo](detail-produk.html?id=kopi-gayo-honey-organik)**`
    },
    {
      keywords: ['38 provinsi', 'provinsi di indonesia', 'daftar provinsi', 'ada berapa provinsi'],
      answer: `**Indonesia saat ini memiliki 38 Provinsi resmi!**
Di WARISARA, seluruh 38 provinsi didokumentasikan lengkap dengan 4 provinsi otonomi baru (DOB) di Papua:
- **Sumatera (10)**: Aceh, Sumut, Sumbar, Riau, Kepri, Jambi, Sumsel, Babel, Bengkulu, Lampung.
- **Jawa (6)**: DKI Jakarta, Banten, Jabar, Jateng, D.I. Yogyakarta, Jatim.
- **Bali & Nusa Tenggara (3)**: Bali, NTB, NTT.
- **Kalimantan (5)**: Kalbar, Kalteng, Kalsel, Kaltim, Kaltara.
- **Sulawesi (6)**: Sulut, Gorontalo, Sulteng, Sulbar, Sulsel, Sultra.
- **Maluku & Papua (8)**: Maluku, Maluku Utara, Papua, Papua Barat, Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya.
- 👉 **[Jelajahi Peta 38 Provinsi Sekarang](jelajahi.html)**`
    },
    {
      keywords: ['rambu solo', 'toraja', 'upacara toraja'],
      answer: `**Upacara Adat Rambu Solo (Tana Toraja, Sulawesi Selatan):**
- Rambu Solo adalah upacara pemakaman adat suku Toraja yang sarat penghormatan tertinggi kepada leluhur.
- Masyarakat Toraja meyakini bahwa orang yang meninggal belum benar-benar wafat melainkan sedang 'sakit' (Tomakula) sampai ritual Rambu Solo diselenggarakan dengan pemotongan kerbau belang (Tedong Bonga).
- Tujuannya adalah mengantarkan arwah menuju *Puya* (alam peristirahatan kekal leluhur).
- Rumah adat khasnya adalah **Tongkonan** beratap melengkung laksana haluan perahu purba!`
    },
    {
      keywords: ['unesco', 'warisan dunia', 'warisan takbenda', 'warisan indonesia'],
      answer: `**Kekayaan Budaya Indonesia yang Diakui UNESCO:**
1. **Wayang Kulit** (2008 - Masterpiece of Oral and Intangible Heritage)
2. **Keris Indonesia** (2008)
3. **Batik Nusantara** (2009 - Diperingati setiap 2 Oktober)
4. **Angklung Tradisional** (2010)
5. **Tari Saman Gayo** (2011)
6. **Tas Noken Papua** (2012)
7. **Tiga Genre Tari Tradisi Bali** (2015)
8. **Pencak Silat** (2019)
9. **Gamelan Jawa, Bali, Sunda** (2021)
10. **Budaya Sehat Jamu** (2023)
Seluruh warisan adiluhung ini kita rangkum pembelajarannya di menu **[Pusat Belajar](belajar.html)**!`
    },
    {
      keywords: ['pantun', 'pantun budaya', 'berpantun'],
      answer: `*Pohon kelapa tumbuh di muara,*
*Angin bertiup membelai mega,*
*Mari bersama jaga WARISARA,*
*Warisan luhur pusaka bangsa!* 🌺🇮🇩

Ada lagi yang ingin kamu ketahui seputar budaya Indonesia, Sobat?`
    },
    {
      keywords: ['terima kasih', 'makasih', 'makasi', 'thanks', 'thank you'],
      answer: `Sama-sama Sobat Warisara! Senang sekali bisa berbagi keindahan dan kearifan budaya Nusantara bersamamu. Jangan ragu memanggilku lagi kapan pun ya! Salam budaya! 🌺✨`
    },
    {
      keywords: ['siapa kamu', 'tentang wari', 'kamu siapa', 'maskot'],
      answer: `Aku **Si Wari**, maskot sekaligus pemandu cerdas resmi **WARISARA (Warisan Rasa Kita)**! Aku dirancang untuk menemani penjelajahanmu memahami kekayaan budaya 38 provinsi, mengapresiasi kriya adiluhung lokal, dan memandu setiap sudut web ini dengan hangat dan cerdas. 🦊✨`
    }
  ];

  // Fungsi fallback pencarian cerdas berbasis intent & bobot kata kunci
  function searchLocalKnowledge(query) {
    const q = query.toLowerCase().trim();

    // 1. Cek kecocokan langsung
    for (const item of CULTURAL_KNOWLEDGE) {
      for (const kw of item.keywords) {
        if (q.includes(kw)) {
          return item.answer;
        }
      }
    }

    // 2. Cek produk kriya spesifik dari window.WARISARA_PRODUCTS
    if (window.WARISARA_PRODUCTS && typeof window.WARISARA_PRODUCTS.getAll === 'function') {
      const allProds = window.WARISARA_PRODUCTS.getAll();
      for (const p of allProds) {
        if (
          q.includes(p.name.toLowerCase()) ||
          q.includes(p.id.toLowerCase()) ||
          (p.province && q.includes(p.province.toLowerCase())) ||
          (p.category && q.includes(p.category.toLowerCase()))
        ) {
          return `**${p.name}**
- **Asal**: ${p.origin} (${p.island || 'Nusantara'})
- **Kategori**: ${p.category} | **Pengrajin**: ${p.maker}
- **Harga**: ${p.priceEstimate || ('Rp ' + (p.price || 0).toLocaleString('id-ID'))}
- **Material**: ${p.material || 'Bahan Alami Pilihan'}
- **Filosofi**: *"${p.philosophy || ''}"*
- 👉 **[Buka Halaman Detail Produk](detail-produk.html?id=${p.id})**`;
        }
      }
    }

    // 3. Fallback umum bernuansa budaya yang berwawasan luas
    return `Pertanyaan yang sangat menarik tentang *"Budaya Nusantara"*! ✨

Indonesia memiliki lebih dari **1.340 suku bangsa**, **718 bahasa daerah**, dan ribuan seni kriya tradisi yang diwariskan turun-temurun. 

Beberapa hal menarik yang bisa kamu eksplorasi:
- 🗺️ Ingin tahu budaya daerah tertentu? Tanyakan misalnya *"Apa budaya khas Maluku?"* atau *"Jelaskan tentang Tari Saman"*.
- 🛍️ Ingin tahu tentang produk kriya lokal? Tanyakan *"Filosofi batik Mega Mendung"* atau *"Rekomendasi kain tenun"*.
- 🌐 Ingin panduan web? Tanyakan *"Bagaimana cara membeli produk di sini?"*.

Silakan ajukan pertanyaan lebih spesifik, Wari siap menjabarkannya dengan senang hati! 😊`;
  }

  // Mengambil kunci API dari file konfigurasi lokal window.WARISARA_CONFIG (js/config.js)
  function getGeminiApiKey() {
    return (window.WARISARA_CONFIG && window.WARISARA_CONFIG.GEMINI_API_KEY) ? window.WARISARA_CONFIG.GEMINI_API_KEY.trim() : '';
  }

  // Engine Panggilan ke Google Gemini API (dengan multi-model fallback & format respons cerdas)
  async function callGeminiAPI(apiKey, promptHistory, userQuery) {
    const context = getCurrentPageContext();
    const systemPrompt = `Anda adalah Si Wari, maskot dan pemandu cerdas resmi web WARISARA (Warisan Rasa Kita).
Peran dan Pengetahuan Anda:
1. Pemandu ramah berwawasan ensiklopedis sangat luas tentang seluruh budaya Indonesia (38 Provinsi, suku bangsa, pakaian adat, tarian tradisional, rumah adat, senjata pusaka, kuliner daerah, upacara sakral adat seperti Rambu Solo, Kasada, Ngaben, dan filosofi kriya wastra Nusantara).
2. Pemandu isi web WARISARA:
   - Peta Jelajah 38 Provinsi: jelajahi.html
   - Etalase Kriya & Produk Lokal: ekonomi-kreatif.html
   - Detail Produk & Cerita Filosofi: detail-produk.html
   - Cerita Rakyat Interaktif: cerita.html
   - Pusat Belajar & Kuis Budaya: belajar.html
   - Komunitas Warisara: komunitas.html
3. Pengguna saat ini sedang membuka halaman: "${context.name}".
4. Gaya bicara: Hangat, santun, cerdas, berbudaya, menggunakan bahasa Indonesia yang baik, ramah dengan sentuhan emoji khas budaya, menyapa pengunjung dengan sebutan "Sobat Warisara".
5. Gunakan format markdown yang rapi (bold, bullet points). Jika merekomendasikan halaman web, sertakan tautan markdown seperti [Etalase Produk](ekonomi-kreatif.html) atau [Peta 38 Provinsi](jelajahi.html).`;

    // Bentuk payload contents
    const contents = [];

    // Sisipkan instruksi sistem pada pesan awal
    contents.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'Siap! Saya Si Wari, pemandu budaya Nusantara yang cerdas, ramah, dan siap mendampingi Sobat Warisara dengan wawasan budaya terlengkap.' }]
    });

    // Sisipkan riwayat obrolan terakhir (max 6 pesan)
    const recentHistory = promptHistory.slice(-6);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    }

    // Tambahkan pertanyaan pengguna saat ini
    contents.push({
      role: 'user',
      parts: [{ text: userQuery }]
    });

    // Daftar endpoint model yang kompatibel
    const endpointsToTry = [
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
    ];

    let lastError = null;

    for (const endpoint of endpointsToTry) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: contents })
        });

        if (response.ok) {
          const data = await response.json();
          const parts = data.candidates?.[0]?.content?.parts || [];
          const botReply = parts.map(p => p.text).filter(Boolean).join('\n\n');
          if (botReply && botReply.trim().length > 0) {
            return botReply;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = new Error(errData.error?.message || `HTTP ${response.status}`);
        }
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('Gagal menghubungi Gemini API pada semua model.');
  }

  // Konverter teks sederhana ke HTML (mendukung link internal, bold, list)
  function renderMarkdownToHTML(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Format Bold: **teks**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Format Italic: *teks*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Format Link: [Teks Link](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, function (match, linkText, url) {
      let resolvedUrl = url;
      if (!url.startsWith('http') && !url.startsWith('#')) {
        resolvedUrl = isInPages ? url : (url.startsWith('pages/') ? url : 'pages/' + url);
      }
      return `<a href="${resolvedUrl}" class="wari-inline-link">${linkText} <span class="material-symbols-outlined text-[13px]">arrow_outward</span></a>`;
    });

    // Format Bullet points
    const lines = html.split('\n');
    let inList = false;
    let result = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) {
          result.push('<ul>');
          inList = true;
        }
        result.push(`<li>${trimmed.substring(2)}</li>`);
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (!inList) {
          result.push('<ol>');
          inList = true;
        }
        result.push(`<li>${trimmed.replace(/^\d+\.\s/, '')}</li>`);
      } else {
        if (inList) {
          result.push('</ul>');
          inList = false;
        }
        if (trimmed.length > 0) {
          result.push(`<p>${line}</p>`);
        }
      }
    }
    if (inList) result.push('</ul>');

    return result.join('');
  }

  // --- KOMPONEN UTAMA WARI AI CHATBOT ---
  let widgetEl = null;
  let chatWindowEl = null;
  let messagesContainer = null;
  let chatInput = null;
  let headerAvatar = null;
  let triggerAvatar = null;
  let isOpen = false;
  let chatHistory = [];
  let isThinking = false;

  function setMascotMood(mood) {
    const src = IMGS[mood] || IMGS.idle;
    if (triggerAvatar) triggerAvatar.src = src;
    if (headerAvatar) headerAvatar.src = src;
  }

  function renderMessageDOM(sender, text, timeStr) {
    if (!messagesContainer) return;
    const displayTime = timeStr || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const row = document.createElement('div');
    row.className = `wari-msg-row ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

    if (sender === 'bot') {
      row.innerHTML = `
        <img src="${IMGS.happy}" class="wari-msg-avatar" alt="Wari" />
        <div class="wari-msg-bubble">
          ${renderMarkdownToHTML(text)}
          <span class="wari-msg-time">${displayTime}</span>
        </div>
      `;
    } else {
      row.innerHTML = `
        <div class="wari-msg-bubble">
          ${renderMarkdownToHTML(text)}
          <span class="wari-msg-time">${displayTime}</span>
        </div>
      `;
    }

    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendMessage(sender, text, saveHistory = true) {
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    if (saveHistory) {
      chatHistory.push({ sender, text, time });

      // Simpan ke sessionStorage agar riwayat bertahan selama sesi penjelajahan
      try {
        sessionStorage.setItem('wari_chat_history', JSON.stringify(chatHistory.slice(-20)));
      } catch (e) {}
    }

    renderMessageDOM(sender, text, time);
  }

  function showTypingIndicator() {
    isThinking = true;
    setMascotMood('thinking');
    const row = document.createElement('div');
    row.id = 'wari-typing-row';
    row.className = 'wari-msg-row bot-msg';
    row.innerHTML = `
      <img src="${IMGS.thinking}" class="wari-msg-avatar" alt="Wari Berpikir" />
      <div class="wari-typing-indicator">
        <span class="wari-typing-dot"></span>
        <span class="wari-typing-dot"></span>
        <span class="wari-typing-dot"></span>
        <span class="wari-thinking-text">Wari sedang merangkai wawasan...</span>
      </div>
    `;
    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // ── ANIMASI: Particle burst on message send ──
  function spawnParticles(originEl) {
    if (!originEl) return;
    const rect = originEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#C9A567', '#F4D98B', '#E8CA8C', '#FBF8F2', '#B88B42', '#DCBE88'];
    const count = 10;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'wari-particle';
      const angle = (360 / count) * i * (Math.PI / 180);
      const dist = 38 + Math.random() * 28;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      p.style.setProperty('--particle-end', `translate(${tx}px, ${ty}px)`);
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.width = (4 + Math.random() * 4) + 'px';
      p.style.height = p.style.width;
      p.style.marginLeft = (-parseFloat(p.style.width) / 2) + 'px';
      p.style.marginTop = (-parseFloat(p.style.height) / 2) + 'px';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 750);
    }
  }

  // ── ANIMASI: Ripple on send button ──
  function spawnSendRipple(btn) {
    if (!btn) return;
    const r = document.createElement('span');
    r.className = 'wari-send-ripple';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 550);
  }

  // ── ANIMASI: Emoji reaction pop on bot reply ──
  const REACTION_EMOJIS = ['✨', '🌺', '🏺', '🌿', '💛', '🎉', '🇮🇩', '🎨'];
  function spawnEmojiReaction(container) {
    if (!container) return;
    const lastBubble = container.querySelector('.wari-msg-row.bot-msg:last-of-type .wari-msg-bubble');
    if (!lastBubble) return;
    const emoji = document.createElement('span');
    emoji.className = 'wari-emoji-reaction';
    emoji.textContent = REACTION_EMOJIS[Math.floor(Math.random() * REACTION_EMOJIS.length)];
    emoji.style.left = (Math.random() * 60 + 10) + '%';
    emoji.style.bottom = '0';
    lastBubble.style.position = 'relative';
    lastBubble.appendChild(emoji);
    setTimeout(() => emoji.remove(), 950);
  }

  // ── ANIMASI: Scroll-to-bottom pill ──
  function setupScrollPill(messagesEl) {
    let pillEl = null;
    messagesEl.addEventListener('scroll', () => {
      const distFromBottom = messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight;
      if (distFromBottom > 120) {
        if (!pillEl) {
          pillEl = document.createElement('button');
          pillEl.className = 'wari-scroll-btn';
          pillEl.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px">arrow_downward</span> Pesan terbaru';
          pillEl.style.position = 'sticky';
          pillEl.style.bottom = '10px';
          pillEl.style.alignSelf = 'center';
          messagesEl.after(pillEl);
          pillEl.addEventListener('click', () => {
            messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
          });
        }
      } else {
        if (pillEl) { pillEl.remove(); pillEl = null; }
      }
    });
  }

  // ── ANIMASI: Halo burst saat chatbot dibuka ──
  function spawnOpenHalo() {
    const trigBtn = document.getElementById('wari-ai-trigger');
    if (!trigBtn) return;
    const rect = trigBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // 3 cincin emas yang menyebar
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('div');
      ring.className = 'wari-open-ring';
      const size = 80 + i * 36;
      ring.style.cssText = `
        position: fixed;
        left: ${cx}px;
        top: ${cy}px;
        width: ${size}px;
        height: ${size}px;
        margin-left: ${-size / 2}px;
        margin-top: ${-size / 2}px;
        border-radius: 50%;
        border: 2px solid rgba(201,165,103,${0.7 - i * 0.2});
        pointer-events: none;
        z-index: 99998;
        animation: wariRingExpand 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s forwards;
      `;
      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), 800 + i * 80);
    }

    // Percikan partikel emas yang lebih banyak & berwarna-warni
    const colors = ['#C9A567','#F4D98B','#FBF8F2','#E8CA8C','#B88B42'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const angle = (360 / 18) * i * (Math.PI / 180);
      const dist = 55 + Math.random() * 45;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const sz = 4 + Math.random() * 5;
      p.style.cssText = `
        position: fixed;
        left: ${cx - sz / 2}px;
        top: ${cy - sz / 2}px;
        width: ${sz}px;
        height: ${sz}px;
        border-radius: 50%;
        background: ${colors[i % colors.length]};
        pointer-events: none;
        z-index: 99998;
        animation: wariParticleBurst 0.75s ease-out ${Math.random() * 0.1}s forwards;
        --particle-end: translate(${tx}px, ${ty}px);
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  function hideTypingIndicator() {
    isThinking = false;
    const el = document.getElementById('wari-typing-row');
    if (el) el.remove();
  }


  async function handleUserSubmit(queryText) {
    const q = queryText || chatInput.value.trim();
    if (!q || isThinking) return;

    chatInput.value = '';
    chatInput.style.height = '42px';
    chatInput.style.overflowY = 'hidden';

    // 1. Tampilkan pesan pengguna
    appendMessage('user', q);

    // 2. Indikator berpikir
    showTypingIndicator();

    const apiKey = getGeminiApiKey();

    try {
      if (apiKey && apiKey.length > 10) {
        // Panggil Live Gemini API
        const answer = await callGeminiAPI(apiKey, chatHistory, q);
        hideTypingIndicator();
        setMascotMood('happy');
        appendMessage('bot', answer);
        // Emoji reaction pop on bot reply
        setTimeout(() => spawnEmojiReaction(messagesContainer), 120);
      } else {
        hideTypingIndicator();
        setMascotMood('happy');
        const answer = searchLocalKnowledge(q);
        appendMessage('bot', answer);
        setTimeout(() => spawnEmojiReaction(messagesContainer), 120);
      }
    } catch (err) {
      console.warn('Gemini API Error, falling back to local cultural knowledge:', err);
      hideTypingIndicator();
      setMascotMood('happy');
      const fallbackAnswer = searchLocalKnowledge(q);
      appendMessage('bot', fallbackAnswer);
      setTimeout(() => spawnEmojiReaction(messagesContainer), 120);
    }

    setTimeout(() => {
      if (!isThinking) setMascotMood('idle');
    }, 4000);
  }

  function toggleChatWindow(forceState) {
    const wasOpen = isOpen;
    isOpen = typeof forceState === 'boolean' ? forceState : !isOpen;

    if (isOpen && !wasOpen) {
      // ── OPEN: spring in dari pojok bawah kanan ──
      chatWindowEl.classList.remove('hidden', 'wari-closing');
      chatWindowEl.classList.add('wari-opening');
      const tooltipEl = document.getElementById('wari-ai-tooltip');
      if (tooltipEl) tooltipEl.classList.add('hidden-tooltip');
      setMascotMood('happy');
      // Halo burst di sekitar trigger
      spawnOpenHalo();
      setTimeout(() => {
        chatWindowEl.classList.remove('wari-opening');
        chatWindowEl.classList.add('wari-window-active');
        if (chatInput) chatInput.focus();
      }, 520);
    } else if (!isOpen && wasOpen) {
      // ── CLOSE: collapse shrink ke arah trigger ──
      chatWindowEl.classList.remove('wari-opening', 'wari-window-active');
      chatWindowEl.classList.add('wari-closing');
      setMascotMood('idle');
      // Mascot wave saat close
      const trigBtn = document.getElementById('wari-ai-trigger');
      if (trigBtn) {
        trigBtn.classList.add('wari-wave');
        setTimeout(() => trigBtn.classList.remove('wari-wave'), 900);
      }
      setTimeout(() => {
        chatWindowEl.classList.add('hidden');
        chatWindowEl.classList.remove('wari-closing');
      }, 380);
    }
  }

  function buildMascotChatbotUI() {
    // Hindari duplikasi jika sudah terpasang
    if (document.getElementById('wari-ai-widget')) return;

    const pageCtx = getCurrentPageContext();

    // 1. Render Floating Widget (Pojok Bawah Kanan)
    widgetEl = document.createElement('div');
    widgetEl.id = 'wari-ai-widget';
    widgetEl.className = 'wari-ai-widget';
    widgetEl.innerHTML = `
      <!-- Tooltip Sapaan -->
      <div id="wari-ai-tooltip" class="wari-ai-tooltip" title="Klik untuk mengobrol dengan Wari">
        <div class="wari-tooltip-top-bar">
          <span class="wari-tooltip-badge">Wari AI Pemandu</span>
          <button id="wari-tooltip-dismiss" class="wari-tooltip-dismiss" aria-label="Tutup pesan" title="Tutup komentar Wari">
            <span class="material-symbols-outlined" style="font-size: 13px;">close</span>
          </button>
        </div>
        <p id="wari-tooltip-text">${pageCtx.tooltip}</p>
      </div>

      <!-- Tombol Trigger Maskot -->
      <button id="wari-ai-trigger" class="wari-ai-trigger" aria-label="Buka Chatbot Wari AI" title="Ngobrol dengan Si Wari">
        <div class="wari-trigger-halo"></div>
        <div class="wari-trigger-mascot-wrap">
          <img id="wari-trigger-mascot" src="${IMGS.idle}" alt="Wari Maskot AI" class="wari-trigger-mascot" />
        </div>
        <div class="wari-trigger-badge">
          <span class="wari-pulse-dot"></span>
          <span class="wari-badge-label">Tanya Wari</span>
        </div>
      </button>
    `;
    document.body.appendChild(widgetEl);

    // 2. Render Jendela Obrolan Mewah (Chat Window)
    chatWindowEl = document.createElement('div');
    chatWindowEl.id = 'wari-chat-window';
    chatWindowEl.className = 'wari-chat-window hidden';
    chatWindowEl.innerHTML = `
      <!-- Header -->
      <div class="wari-chat-header">
        <div class="wari-header-left">
          <div class="wari-header-avatar-wrap">
            <img id="wari-header-avatar" src="${IMGS.happy}" alt="Wari AI" class="wari-header-avatar" />
            <span class="wari-status-dot" title="Aktif Online"></span>
          </div>
          <div class="wari-header-info">
            <div class="wari-header-title-row">
              <h3 class="wari-header-name">Si Wari</h3>
            </div>
            <p class="wari-header-sub">Pemandu Budaya & Kriya Nusantara</p>
          </div>
        </div>
        <div class="wari-header-actions">
          <button id="wari-btn-clear" class="wari-header-btn" title="Bersihkan Obrolan">
            <span class="material-symbols-outlined text-base">delete_sweep</span>
          </button>
          <button id="wari-btn-close" class="wari-header-btn wari-btn-close" title="Tutup Chatbot">
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </div>

      <!-- Page Context Bar -->
      <div class="wari-page-context-bar">
        <span class="material-symbols-outlined text-xs text-brass-400">explore</span>
        <span>Halaman: <strong>${pageCtx.name}</strong></span>
      </div>

      <!-- Area Pesan -->
      <div id="wari-chat-messages" class="wari-chat-messages">
        <!-- Pesan sambutan awal -->
        <div class="wari-msg-row bot-msg">
          <img src="${IMGS.happy}" class="wari-msg-avatar" alt="Wari" />
          <div class="wari-msg-bubble">
            ${renderMarkdownToHTML(pageCtx.welcome)}
            <span class="wari-msg-time">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      <!-- Chips Pertanyaan Cepat -->
      <div id="wari-prompt-chips" class="wari-prompt-chips">
        <button type="button" class="wari-chip" data-prompt="Jelaskan fitur utama apa saja yang ada di web WARISARA">🌐 Jelajahi WARISARA</button>
        <button type="button" class="wari-chip" data-prompt="Apa makna filosofi di balik motif Batik Parang Barong?">📜 Filosofi Batik Parang</button>
        <button type="button" class="wari-chip" data-prompt="Rekomendasikan karya kriya terbaik yang ada di etalase produk lokal">🛍️ Rekomendasi Kriya</button>
        <button type="button" class="wari-chip" data-prompt="Ceritakan tentang upacara pemakaman adat Rambu Solo di Tana Toraja">🏛️ Tradisi Rambu Solo</button>
        <button type="button" class="wari-chip" data-prompt="Ada berapa provinsi di Indonesia dan apa saja pembagian pulaunya?">🗺️ 38 Provinsi</button>
        <button type="button" class="wari-chip" data-prompt="Bagaimana cara membeli dan bertransaksi langsung dengan pengrajin lokal?">💬 Cara Beli & Chat</button>
        <button type="button" class="wari-chip" data-prompt="Beri aku satu pantun bertema budaya Indonesia">🌺 Pantun Nusantara</button>
      </div>

      <!-- Baris Input Form -->
      <form id="wari-chat-form" class="wari-chat-input-bar">
        <textarea id="wari-chat-input" placeholder="Tanya Si Wari seputar budaya..." rows="1" maxlength="1000"></textarea>
        <div class="wari-input-actions">
          <button type="button" id="wari-btn-voice" class="wari-input-btn" title="Bicara (Input Suara)">
            <span class="material-symbols-outlined text-base">mic</span>
          </button>
          <button type="submit" id="wari-btn-send" class="wari-send-btn" title="Kirim Pertanyaan">
            <span class="material-symbols-outlined text-base">arrow_upward</span>
          </button>
        </div>
      </form>
    `;
    document.body.appendChild(chatWindowEl);

    // Ambil referensi elemen
    messagesContainer = document.getElementById('wari-chat-messages');
    chatInput = document.getElementById('wari-chat-input');
    headerAvatar = document.getElementById('wari-header-avatar');
    triggerAvatar = document.getElementById('wari-trigger-mascot');

    // Restore riwayat chat sesi sebelumnya jika ada
    try {
      const stored = sessionStorage.getItem('wari_chat_history');
      if (stored) {
        const hist = JSON.parse(stored);
        if (Array.isArray(hist) && hist.length > 0) {
          // Bersihkan jika ada pesan sistem 'Riwayat obrolan telah dibersihkan' yang sebelumnya tidak sengaja tersimpan
          chatHistory = hist.filter((m) => m && m.text && !m.text.includes('Riwayat obrolan telah dibersihkan'));
          if (chatHistory.length > 0) {
            // Render ulang riwayat yang tersimpan tanpa menduplikasi data ke array
            messagesContainer.innerHTML = '';
            chatHistory.forEach((m) => renderMessageDOM(m.sender, m.text, m.time));
            // Perbarui storage dengan riwayat bersih
            sessionStorage.setItem('wari_chat_history', JSON.stringify(chatHistory.slice(-20)));
          } else {
            sessionStorage.removeItem('wari_chat_history');
          }
        }
      }
    } catch (e) {}

    // Event Listeners
    const triggerBtn = document.getElementById('wari-ai-trigger');
    const tooltipEl = document.getElementById('wari-ai-tooltip');
    const closeBtn = document.getElementById('wari-btn-close');
    const clearBtn = document.getElementById('wari-btn-clear');
    const chatForm = document.getElementById('wari-chat-form');
    const voiceBtn = document.getElementById('wari-btn-voice');

    // ── Buka/Tutup Chat + animasi excited mascot ──
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        if (!isOpen) {
          // OPEN: mascot excited jump
          triggerBtn.classList.add('wari-excited');
          setTimeout(() => triggerBtn.classList.remove('wari-excited'), 700);
        }
        toggleChatWindow();
      });
    }
    const dismissTooltipBtn = document.getElementById('wari-tooltip-dismiss');
    if (dismissTooltipBtn) {
      dismissTooltipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (tooltipEl) tooltipEl.classList.add('hidden-tooltip', 'modal-suppressed');
      });
    }
    if (tooltipEl) tooltipEl.addEventListener('click', (e) => {
      if (e.target && e.target.closest('#wari-tooltip-dismiss')) return;
      triggerBtn && triggerBtn.classList.add('wari-excited');
      setTimeout(() => triggerBtn && triggerBtn.classList.remove('wari-excited'), 700);
      toggleChatWindow(true);
    });
    if (closeBtn) closeBtn.addEventListener('click', () => toggleChatWindow(false));

    // Clear Riwayat
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        chatHistory = [];
        sessionStorage.removeItem('wari_chat_history');
        messagesContainer.innerHTML = '';
        // Tampilkan konfirmasi di UI tanpa menyimpannya ke sessionStorage
        renderMessageDOM('bot', `Riwayat obrolan telah dibersihkan! Ada hal lain yang ingin Sobat tanyakan tentang budaya Nusantara? 🌿✨`);
      });
    }

    // Setup scroll-to-bottom pill
    setupScrollPill(messagesContainer);

    // ── Submit Chat Form + ripple & particle ──
    const sendBtn = document.getElementById('wari-btn-send');
    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        spawnSendRipple(sendBtn);
        spawnParticles(sendBtn);
        handleUserSubmit();
      });
    }

    // Auto-resize textarea & submit on Enter
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          spawnSendRipple(sendBtn);
          spawnParticles(sendBtn);
          handleUserSubmit();
        }
      });

      chatInput.addEventListener('input', () => {
        chatInput.style.height = '42px';
        const scrollH = chatInput.scrollHeight;
        if (scrollH > 44) {
          chatInput.style.height = Math.min(scrollH, 96) + 'px';
          chatInput.style.overflowY = scrollH > 96 ? 'auto' : 'hidden';
        } else {
          chatInput.style.height = '42px';
          chatInput.style.overflowY = 'hidden';
        }
      });
    }

    // Prompt Chips Click + particle
    document.querySelectorAll('.wari-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const prompt = chip.dataset.prompt;
        if (prompt) {
          spawnParticles(chip);
          handleUserSubmit(prompt);
        }
      });
    });

    // Voice Input (Web Speech Recognition)
    if (voiceBtn) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.interimResults = false;

        recognition.onstart = () => {
          voiceBtn.classList.add('recording');
        };

        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          if (transcript) {
            chatInput.value = transcript;
            handleUserSubmit(transcript);
          }
        };

        recognition.onerror = () => {
          voiceBtn.classList.remove('recording');
        };

        recognition.onend = () => {
          voiceBtn.classList.remove('recording');
        };

        voiceBtn.addEventListener('click', () => {
          try {
            recognition.start();
          } catch (err) {
            recognition.stop();
          }
        });
      } else {
        voiceBtn.title = 'Input suara belum didukung di browser ini';
        voiceBtn.style.opacity = '0.4';
      }
    }
  }

  // --- Modal Detection & Automatic Tooltip Suppression ---
  function isAnyModalOpen() {
    if (
      document.body.classList.contains('modal-open') ||
      document.body.classList.contains('province-modal-open') ||
      document.body.classList.contains('lightbox-open') ||
      document.body.classList.contains('passport-modal-open') ||
      document.body.classList.contains('is-modal-active') ||
      document.documentElement.classList.contains('modal-open') ||
      document.documentElement.classList.contains('province-modal-open')
    ) {
      return true;
    }

    const modalSelectors = [
      '#province-modal-overlay',
      '#passport-book-modal',
      '#gallery-lightbox-modal',
      '#compass-randomizer-modal',
      '#auth-modal',
      '#product-detail-modal',
      '#add-product-modal',
      '#marketplace-chat-modal',
      '.modal-overlay',
      '[role="dialog"]:not(#wari-chat-window)'
    ];

    for (let i = 0; i < modalSelectors.length; i++) {
      const els = document.querySelectorAll(modalSelectors[i]);
      for (let j = 0; j < els.length; j++) {
        const el = els[j];
        if (el.id === 'wari-chat-window' || el.closest('#wari-chat-window')) continue;
        const style = window.getComputedStyle(el);
        const isVisible = (
          (el.classList.contains('active') || (!el.classList.contains('hidden') && el.style.display !== 'none')) &&
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          style.opacity !== '0'
        );
        if (isVisible) return true;
      }
    }
    return false;
  }

  function hideMascotTooltip() {
    const tooltipEl = document.getElementById('wari-ai-tooltip');
    if (tooltipEl) {
      tooltipEl.classList.add('hidden-tooltip', 'modal-suppressed');
    }
  }

  function showMascotTooltip() {
    if (isAnyModalOpen()) return;
    const tooltipEl = document.getElementById('wari-ai-tooltip');
    if (tooltipEl && !isOpen) {
      tooltipEl.classList.remove('hidden-tooltip', 'modal-suppressed');
    }
  }

  function initModalWatcher() {
    function checkAndSync() {
      if (isAnyModalOpen()) {
        hideMascotTooltip();
      } else {
        showMascotTooltip();
      }
    }

    try {
      const observer = new MutationObserver(checkAndSync);
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'style', 'hidden'],
        subtree: true,
        childList: false
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    } catch (e) {}

    window.addEventListener('modal:open', hideMascotTooltip);
    window.addEventListener('modal:close', showMascotTooltip);

    // Initial check
    setTimeout(checkAndSync, 200);
  }

  // Global API Wari
  window.WariMascot = {
    openChat: function (optionalQuestion) {
      toggleChatWindow(true);
      if (optionalQuestion) handleUserSubmit(optionalQuestion);
    },
    closeChat: function () {
      toggleChatWindow(false);
    },
    ask: function (question) {
      toggleChatWindow(true);
      handleUserSubmit(question);
    },
    hideTooltip: hideMascotTooltip,
    showTooltip: showMascotTooltip,
    setMood: setMascotMood
  };

  // Inisialisasi otomatis setelah DOM siap
  function initWari() {
    buildMascotChatbotUI();
    initModalWatcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWari);
  } else {
    initWari();
  }
})();
