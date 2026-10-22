# ARSIP MEMORI DAN DOKUMENTASI LENGKAP HALAMAN PELESTARI (MAKERS) WARISARA
*Dokumentasi permanen seluruh struktur, komponen, state, filtering, logika audio, dan data 38 Maestro Kebudayaan Nusantara.*

---

## 1. Ringkasan & Esensi Halaman Pelestari
Halaman Pelestari (`pages/makers.html`, sebelumnya modul `makers`) merupakan direktori resmi dan ensiklopedia interaktif bagi para maestro adat, empu tosan aji, penenun ulos & songket, pemahat asmat, hingga perajin noken dari 38 provinsi di Indonesia (rasio 1:1 antara provinsi dan sosok penjaga tradisi).

Halaman ini mengintegrasikan:
1. **Statistik Pengabdian**: 38 Maestro Terdata, 7 Gugus Kepulauan, 1,400+ Tahun Dedikasi, 100% Living Heritage (UNESCO & WBTb).
2. **Filter & Search Deck**: Pencarian teks instan, dropdown pemilih 38 provinsi dengan grouping per gugus kepulauan (`optgroup`), navigasi tab pill kepulauan (Semua, Sumatera, Jawa, Kalimantan, Sulawesi, Papua, Bali & NT, Maluku), serta tombol reset cepat.
3. **Grid Kartu Maestro**: Kartu kaca (glass-card) dengan foto potret realistis (`assets/images/Pelestari/{provinceId}.jpg`) & fallback SVG (`maker-illustrations.js`), badge status UNESCO/WBTb, chip kepulauan, inisial avatar, kutipan wejangan bijak, karakteristik mahakarya, bahan alami tradisi, tombol putar audio petuah lisan (Web Speech API), dan tombol buka kisah lengkap.
4. **Modal Ensiklopedia Maestro**: Popup detail lengkap berisi banner ilustrasi/foto besar, quote wejangan dengan audio player bar & visualizer soundwave, kisah dedikasi & riwayat hidup, spesifikasi mahakarya ikonik dan bahan alami filosofis, serta tombol CTA menuju kebudayaan provinsi (`jelajahi.html`) dan toko produk kriya terkait (`ekonomi-kreatif.html`).
5. **Deep Linking URL**: Mendukung parameter URL `?provinsi=...` atau `?maker=...` yang otomatis mengaktifkan filter, men-scroll ke kartu maestro terkait, dan memberi efek animasi highlight pulse (`maker-card-highlighted`).

---

## 2. Struktur Data Pelestari (38 Provinsi Nusantara)
Data bersumber dari `data/makers.js` (`window.MAKERS_DATA`). Setiap entri memiliki skema lengkap:
- `id`: ID unik maker, contoh: `"maker-aceh"`, `"maker-bali"`
- `provinceId`: ID provinsi (kebab-case), contoh: `"aceh"`, `"bali"`, `"di-yogyakarta"`
- `provinceName`: Nama provinsi lengkap, contoh: `"Aceh"`, `"Bali"`, `"D.I. Yogyakarta"`
- `island`: Gugus kepulauan (`"Sumatera"`, `"Jawa"`, `"Bali & Nusa Tenggara"`, `"Kalimantan"`, `"Sulawesi"`, `"Maluku"`, `"Papua"`)
- `name`: Nama lengkap maestro beserta gelar/kehormatan adat (contoh: `"Tgk. Nyak Cut"`, `"Ida Bagus Made Tilem"`, `"Empu Djeno Harumbrojo"`)
- `role`: Gelar kehormatan kriya / peran pelestarian (contoh: `"Empu Rencong Pusaka"`, `"Maestro Pahat Patung Kayu Cendana"`)
- `craft`: Jenis seni kriya / keterampilan utama (contoh: `"Besi Tempa & Logam Tosan Aji"`, `"Seni Ukir & Pahat Prasi"`)
- `location`: Lokasi sanggar / desa adat (contoh: `"Baet, Aceh Besar"`, `"Mas, Ubud, Gianyar"`)
- `experience`: Masa pengabdian hidup (contoh: `"48 Tahun Berkarya"`, `"60 Tahun Menjaga Tradisi"`)
- `quote`: Kutipan wejangan filosofis lisan maestro
- `quoteAudio`: Teks narasi untuk dibacakan oleh Web Speech Synthesis API
- `story`: Narasi lengkap riwayat hidup, garis keturunan silsilah keilmuan, dan dedikasi menjaga tradisi
- `signature`: Karakteristik mahakarya ikonik karya maestro
- `materials`: Bahan-bahan alami, formula herbal, atau logam pusaka pilihan
- `unescoOrStatus`: Status pengakuan warisan (`"Warisan Budaya Takbenda (WBTb)"` atau `"UNESCO Living Heritage"`)

### Daftar Lengkap 38 Maestro Per Provinsi:
1. **Aceh**: Tgk. Nyak Cut — Empu Rencong Pusaka (Baet, Aceh Besar)
2. **Sumatera Utara**: Ompu Sorta Silalahi — Penenun Ulos Ragi Hotang Luhur (Silalahi Nabolak, Dairi)
3. **Sumatera Barat**: Datuk Maruhun Basa — Pengrajin Songket Pandai Sikek & Sulam Silangke (Pandai Sikek, Tanah Datar)
4. **Riau**: Encik Wan Rahimah — Penenun Songket Siak Tenun Diraja (Siak Sri Indrapura)
5. **Kepulauan Riau**: Raja Malik Abdullah — Empu Gendang Nobat & Teater Mak Yong (Pulau Penyengat, Tanjungpinang)
6. **Jambi**: Cik Siti Aminah — Pembatik Tradisi Pewarna Alami Jernang (Seberang Kota Jambi)
7. **Bengkulu**: Pakcik Hasan Basri — Pengrajin Kain Besurek & Relief Kulit Kayu (Pasar Berembang, Bengkulu)
8. **Sumatera Selatan**: Nyimas Mariam — Penenun Songket Lepus Berlapis Benang Emas (Kawasan 30 Ilir, Palembang)
9. **Kepulauan Bangka Belitung**: Abang Zainal Abidin — Penempa Pewter Timah Bangka & Anyaman Resam (Belinyu, Bangka)
10. **Lampung**: Raden Imba Kusuma — Penenun Kain Tapis Pucuk Rebung Benang Emas (Menggala, Tulang Bawang)
11. **DKI Jakarta**: Bang Haji Syafei — Maestro Topeng Betawi & Pengrajin Ondel-Ondel (Kramat Jati, Jakarta Timur)
12. **Banten**: Ki Arga — Penenun Kain Tenun Baduy Luar & Dalam (Kanekes, Leuwidamar, Lebak)
13. **Jawa Barat**: Mang Ujo Rusmana — Pembuat Angklung Bambu Hitam & Calung Laras Salendro (Padasuka, Bandung)
14. **Jawa Tengah**: Mpu Totok Karjono — Penempa Keris Jalak Sangu Tumpeng (Banyusri, Surakarta)
15. **D.I. Yogyakarta**: Ki Sugito Siswocarito — Dalang & Pengrajin Wayang Kulit Kulit Kerbau (Bantul, D.I. Yogyakarta)
16. **Jawa Timur**: Ki Slamet Sabar — Maestro Topeng Malangan & Kayu Kamboja (Jabung, Malang)
17. **Bali**: Ida Bagus Nyoman Parta — Maestro Ukir Kayu Pura & Barong Ket (Mas, Ubud, Gianyar)
18. **Nusa Tenggara Barat**: Ina Fatimah — Penenun Songket Sukarara Benang Sutra Alam (Sukarara, Lombok Tengah)
19. **Nusa Tenggara Timur**: Mama Maria Kelen — Penenun Ikat Flores Tenun Alam Mengkudu (Watublapi, Sikka)
20. **Kalimantan Barat**: Nek Simbah Itan — Perajin Anyaman Dayak Kanayatn Rotan & Sungkai (Saham, Landak)
21. **Kalimantan Tengah**: Amang Yulius — Pemahat Getah Nyatu Perahu Tiwah (Palangka Raya)
22. **Kalimantan Selatan**: Kai Arsyad — Pengrajin Sasirangan Pewarna Alami Ulin (Kampung Sasirangan, Banjarmasin)
23. **Kalimantan Timur**: Ibu Dayang Rusnah — Penenun Ulap Doyo Serat Daun Alami (Tanjung Isuy, Kutai Barat)
24. **Kalimantan Utara**: Amai Belawan — Pembuat Topeng Hudoq & Kriya Manik Dayak Lundayeh (Krayan, Nunukan)
25. **Sulawesi Utara**: Tante Martha Wowor — Penenun Kain Bentenan Motif Pinatikan (Ratahan, Minahasa Tenggara)
26. **Gorontalo**: Ibu Hasna Monoarfa — Maestro Sulaman Karawo Benang Cabut (Telaga, Gorontalo)
27. **Sulawesi Tengah**: Papa Yanti — Penempa Kulit Kayu Ikat Nunu (Kulawi, Sigi)
28. **Sulawesi Barat**: Pa'guru Baharuddin — Penenun Sutra Mandar Saqbe Balata (Pambusuang, Polewali Mandar)
29. **Sulawesi Selatan**: Panrita H. Muhammad Jafar — Maestro Pembuat Kapal Pinisi Tanpa Paku (Tanah Beru, Bulukumba)
30. **Sulawesi Tenggara**: Wa Ode Halimah — Penenun Kain Tenun Buton Motif Kasopa (Baubau, Pulau Buton)
31. **Maluku**: Opa Karel Souisa — Pembuat Alat Musik Tifa & Ukiran Kayu Linggua (Hative Besar, Ambon)
32. **Maluku Utara**: Abba Thalib — Penempa Besi Putih Togutil & Salawaku (Tobelo, Halmahera Utara)
33. **Papua Barat Daya**: Mama Yohana Kambu — Penganyam Noken Serat Anggrek Hutan (Aimas, Sorong)
34. **Papua Barat**: Bapa Derek Manupapami — Pengukir Perahu Tradisional Arfak (Manokwari)
35. **Papua**: Bapa Titus Krey — Maestro Ukir Asmat Kayu Besi Bakau (Agats, Asmat)
36. **Papua Tengah**: Mama Martha Degei — Penganyam Noken Lembah Baliem Serat Daun Pandan Hutan (Nabire)
37. **Papua Pegunungan**: Bapa Yance Matuan — Penjaga Batu Karst & Pembuat Noken Koteka Adat (Wamena, Jayawijaya)
38. **Papua Selatan**: Bapa Fransiskus Mahuze — Pembuat Perisai Marind-Anim & Genderang Tifa Kulit Kadal (Merauke)

---

## 3. Logika & Kode Inti Pelestari
### A. Web Speech Audio
```javascript
function speakWisdom(text, makerId) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.rate = 0.95;
  utterance.pitch = 0.95;
  // trigger animation & status updates
  window.speechSynthesis.speak(utterance);
}
```

### B. Filter & Quick Grouping
```javascript
const islandOrder = [
  "Sumatera", "Jawa", "Bali & Nusa Tenggara",
  "Kalimantan", "Sulawesi", "Maluku", "Papua"
];
```

### C. Aset Media
- Potret Maestro: `assets/images/Pelestari/${provinceId}.jpg`
- Fallback Ilustrasi SVG: `window.getMakerIllustrationSvg(maker.id)`
- Tautan Silang Provinsi: `jelajahi.html?provinsi=${provinceId}`
- Tautan Belanja UMKM: `ekonomi-kreatif.html`

---
*Catatan: Dokumen ini disimpan sebagai referensi tetap. Semua fitur pelestari diintegrasikan ke halaman Jelajahi 38 Provinsi (`pages/jelajahi.html`).*
