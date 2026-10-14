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

  // Engine Panggilan ke Google Gemini API (Streaming/Fetch)
  async function callGeminiAPI(apiKey, promptHistory, userQuery) {
    const context = getCurrentPageContext();
    const systemPrompt = `Anda adalah Si Wari, maskot dan asisten pintar resmi web WARISARA (Warisan Rasa Kita).
Peran Anda:
1. Pemandu ramah, berwawasan ensiklopedis sangat luas tentang seluruh budaya Indonesia (38 Provinsi, suku, tarian adat, rumah adat, senjata, kuliner, upacara sakral, filosofi batik dan wastra Nusantara).
2. Pemandu isi web WARISARA (Peta Jelajah di jelajahi.html, Etalase 14 Produk Kriya di ekonomi-kreatif.html, Detail Produk di detail-produk.html, Cerita Rakyat di cerita.html, Pusat Belajar di belajar.html).
3. Pengguna saat ini sedang membuka halaman: "${context.name}".
4. Gaya bicara: Hangat, santun, cerdas, berbudaya, menggunakan bahasa Indonesia yang baik, ramah dengan sentuhan emoji, menyapa pengunjung dengan sebutan "Sobat Warisara".
5. Gunakan format markdown yang rapi (bold, bullet points). Jika relevan merekomendasikan halaman web, sertakan link markdown seperti [Etalase Produk](ekonomi-kreatif.html) atau [Peta 38 Provinsi](jelajahi.html).`;

    // Bentuk payload contents
    const contents = [];

    // Sisipkan instruksi sistem pada pesan awal
    contents.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'Siap! Saya Si Wari, pemandu budaya Nusantara yang cerdas, ramah, dan siap membantu Sobat Warisara dengan wawasan budaya terlengkap.' }]
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

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: contents })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!botReply) {
      throw new Error('Jawaban Gemini kosong.');
    }
    return botReply;
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

  function appendMessage(sender, text) {
    const msgObj = { sender, text, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) };
    chatHistory.push(msgObj);

    // Simpan ke sessionStorage agar riwayat bertahan selama sesi penjelajahan
    try {
      sessionStorage.setItem('wari_chat_history', JSON.stringify(chatHistory.slice(-20)));
    } catch (e) {}

    const row = document.createElement('div');
    row.className = `wari-msg-row ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

    if (sender === 'bot') {
      row.innerHTML = `
        <img src="${IMGS.happy}" class="wari-msg-avatar" alt="Wari" />
        <div class="wari-msg-bubble">
          ${renderMarkdownToHTML(text)}
          <span class="wari-msg-time">${msgObj.time}</span>
        </div>
      `;
    } else {
      row.innerHTML = `
        <div class="wari-msg-bubble">
          ${renderMarkdownToHTML(text)}
          <span class="wari-msg-time">${msgObj.time}</span>
        </div>
      `;
    }

    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
        <span style="font-size:11px;color:rgba(251,248,242,0.6);margin-left:4px;font-family:'Manrope',sans-serif;">Wari sedang merangkai wawasan...</span>
      </div>
    `;
    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
    chatInput.style.height = 'auto';

    // 1. Tampilkan pesan pengguna
    appendMessage('user', q);

    // 2. Indikator berpikir
    showTypingIndicator();

    const apiKey = localStorage.getItem('warisara_gemini_api_key');

    try {
      if (apiKey && apiKey.trim().length > 10) {
        // Panggil Live Gemini API
        const answer = await callGeminiAPI(apiKey.trim(), chatHistory, q);
        hideTypingIndicator();
        setMascotMood('happy');
        appendMessage('bot', answer);
      } else {
        // Simulasi respon cepat cerdas dengan Cultural Knowledge Base
        setTimeout(() => {
          hideTypingIndicator();
          setMascotMood('happy');
          const answer = searchLocalKnowledge(q);
          appendMessage('bot', answer);
        }, 650);
      }
    } catch (err) {
      console.warn('Gemini API Error, falling back to local cultural knowledge:', err);
      hideTypingIndicator();
      setMascotMood('happy');
      const fallbackAnswer = searchLocalKnowledge(q);
      appendMessage('bot', fallbackAnswer + `\n\n*(Catatan: Mode offline aktif karena koneksi Gemini API mengalami kendala. Anda dapat memeriksa API key di ikon pengaturan ⚙️).*`);
    }

    setTimeout(() => {
      if (!isThinking) setMascotMood('idle');
    }, 4000);
  }

  function toggleChatWindow(forceState) {
    isOpen = typeof forceState === 'boolean' ? forceState : !isOpen;
    if (isOpen) {
      chatWindowEl.classList.remove('hidden');
      const tooltipEl = document.getElementById('wari-ai-tooltip');
      if (tooltipEl) tooltipEl.classList.add('hidden-tooltip');
      setMascotMood('happy');
      setTimeout(() => {
        if (chatInput) chatInput.focus();
      }, 250);
    } else {
      chatWindowEl.classList.add('hidden');
      setMascotMood('idle');
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
        <span class="wari-tooltip-badge">Wari AI Pemandu</span>
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
              <span class="wari-header-ai-tag">Gemini AI</span>
            </div>
            <p class="wari-header-sub">Pemandu Budaya & Kriya Nusantara</p>
          </div>
        </div>
        <div class="wari-header-actions">
          <button id="wari-btn-settings" class="wari-header-btn" title="Pengaturan Google Gemini API Key">
            <span class="material-symbols-outlined text-base">key</span>
          </button>
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
        <textarea id="wari-chat-input" placeholder="Tanya apa saja seputar budaya Nusantara atau web..." rows="1" maxlength="1000"></textarea>
        <div class="wari-input-actions">
          <button type="button" id="wari-btn-voice" class="wari-input-btn" title="Bicara (Input Suara)">
            <span class="material-symbols-outlined text-base">mic</span>
          </button>
          <button type="submit" id="wari-btn-send" class="wari-send-btn" title="Kirim Pertanyaan">
            <span class="material-symbols-outlined text-base">arrow_upward</span>
          </button>
        </div>
      </form>

      <!-- Modal Pengaturan Gemini API Key -->
      <div id="wari-api-modal" class="wari-api-modal hidden">
        <div class="wari-api-box">
          <div class="flex items-center gap-2 mb-2 text-brass-400">
            <span class="material-symbols-outlined text-2xl">neurology</span>
            <h4 style="margin:0;">Pengaturan Gemini API Key</h4>
          </div>
          <p>
            WARISARA dilengkapi <strong>Otak Budaya Lokal</strong> yang aktif otomatis. Anda juga dapat menghubungkan <strong>Google Gemini API Key</strong> Anda sendiri untuk respon AI generasi terbaru yang sepenuhnya bebas dan fleksibel.
          </p>
          <input type="password" id="wari-api-key-input" class="wari-api-input" placeholder="Tempel Google Gemini API Key Anda di sini..." />
          <div class="wari-api-btn-row">
            <button type="button" id="wari-api-cancel-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-surface text-xs font-semibold cursor-pointer">
              Batal
            </button>
            <button type="button" id="wari-api-save-btn" class="px-5 py-2 rounded-xl bg-brass-400 hover:bg-brass-300 text-ink text-xs font-bold cursor-pointer">
              Simpan Kunci API
            </button>
          </div>
        </div>
      </div>
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
          chatHistory = hist;
          // Render ulang riwayat
          messagesContainer.innerHTML = '';
          hist.forEach((m) => appendMessage(m.sender, m.text));
        }
      }
    } catch (e) {}

    // Event Listeners
    const triggerBtn = document.getElementById('wari-ai-trigger');
    const tooltipEl = document.getElementById('wari-ai-tooltip');
    const closeBtn = document.getElementById('wari-btn-close');
    const clearBtn = document.getElementById('wari-btn-clear');
    const settingsBtn = document.getElementById('wari-btn-settings');
    const apiModal = document.getElementById('wari-api-modal');
    const apiKeyInput = document.getElementById('wari-api-key-input');
    const apiSaveBtn = document.getElementById('wari-api-save-btn');
    const apiCancelBtn = document.getElementById('wari-api-cancel-btn');
    const chatForm = document.getElementById('wari-chat-form');
    const voiceBtn = document.getElementById('wari-btn-voice');

    // Buka/Tutup Chat
    if (triggerBtn) triggerBtn.addEventListener('click', () => toggleChatWindow());
    if (tooltipEl) tooltipEl.addEventListener('click', () => toggleChatWindow(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleChatWindow(false));

    // Clear Riwayat
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        chatHistory = [];
        sessionStorage.removeItem('wari_chat_history');
        messagesContainer.innerHTML = '';
        appendMessage('bot', `Riwayat obrolan telah dibersihkan! Ada hal lain yang ingin Sobat tanyakan tentang budaya Nusantara? 🌿✨`);
      });
    }

    // Modal API Key
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        const existingKey = localStorage.getItem('warisara_gemini_api_key') || '';
        apiKeyInput.value = existingKey;
        apiModal.classList.remove('hidden');
      });
    }

    if (apiCancelBtn) {
      apiCancelBtn.addEventListener('click', () => {
        apiModal.classList.add('hidden');
      });
    }

    if (apiSaveBtn) {
      apiSaveBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
          localStorage.setItem('warisara_gemini_api_key', key);
          apiModal.classList.add('hidden');
          appendMessage('bot', `🎉 **Kunci Gemini API berhasil disimpan!** Wari sekarang terhubung langsung dengan model AI generasi terbaru Google Gemini untuk menjawab pertanyaanmu secara real-time.`);
        } else {
          localStorage.removeItem('warisara_gemini_api_key');
          apiModal.classList.add('hidden');
          appendMessage('bot', `Kunci API telah dihapus. Wari kembali menggunakan **Otak Budaya Lokal** bawaan yang super cepat! ✨`);
        }
      });
    }

    // Submit Chat Form
    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUserSubmit();
      });
    }

    // Auto-resize textarea & submit on Enter
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleUserSubmit();
        }
      });

      chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 90) + 'px';
      });
    }

    // Prompt Chips Click
    document.querySelectorAll('.wari-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const prompt = chip.dataset.prompt;
        if (prompt) handleUserSubmit(prompt);
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
    setMood: setMascotMood
  };

  // Inisialisasi otomatis setelah DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildMascotChatbotUI);
  } else {
    buildMascotChatbotUI();
  }
})();
