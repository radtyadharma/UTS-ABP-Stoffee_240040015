# ☕ Stoffee — Artisan Coffee & Bakery Ordering App

> **Tugas Ujian Tengah Semester (UTS) — Mata Kuliah: Aplikasi Berbasis Platform (ABP)**  
> **Framework:** React Native Expo (Expo Router) • **Format:** 100% Modular `.jsx`  
> **Gaya Kode:** Mengikuti standar repositori dosen (`https://github.com/sunariku/cms-expo`)  
> **Tema:** Katalog & Pemesanan Kopi Artisan & Viennoiserie Modern  
> **Prinsip Pengembangan:** Ringkas, Bersih, dan Terstruktur (*Ponytail / Senior Clean Code*)

---

## 📋 1. Ringkasan Proyek

**Stoffee** adalah aplikasi pemesanan kopi artisan dan *viennoiserie* yang dibangun menggunakan **Expo Router** dengan struktur berkas berbasis rute (*file-based routing*), persis seperti gaya penulisan pada repositori referensi dosen pembimbing (`sunariku/cms-expo`).

Aplikasi ini memenuhi seluruh kriteria dan spesifikasi teknis **UTS Aplikasi Berbasis Platform**:
- **Arsitektur Navigasi Hybrid (Bobot 25%):** Kombinasi **Bottom Tabs** (`Home`, `Menu`, `Orders`, `Profile`) dan **Native Stack** (`details.jsx`) menggunakan Expo Router dengan pengiriman parameter dinamis (`useLocalSearchParams`).
- **Eksekusi Expo & Stabilitas (Bobot 15%):** Lolos **20/20 pemeriksaan `npx expo-doctor`** tanpa error/warning.
- **UI/UX & Desain Palet Warna (Bobot 15%):** Menerapkan palet warna Coolors (`#2D232E`, `#474448`, `#534B52`, `#E0DDCF`, `#F1F0EA`, `#FFFFFF`) dengan kontras rasio WCAG AAA.
- **Kualitas Kode & Kesederhanaan (Bobot 10%):** Struktur folder ringkas tanpa *over-engineering* atau lapisan abstraksi berlebih, setiap komponen ditulis secara fungsional dalam format `.jsx` yang mudah dipahami mahasiswa.
- **Legalitas Aset & Dokumentasi (Bobot 15%):** 100% aset terbuka dan bebas royalti (*MIT License / Open Source*).
- **Presentasi & Live Demo (Bobot 20%):** Alur demo 2 menit yang lancar dan mudah dijelaskan kepada penguji.

---

## 🎨 2. Palet Warna (Coolors Palette)

| Kode Hex | Nama Warna | Peran Desain (Design Token) | Penerapan UI di Stoffee |
|:---:|:---|:---|:---|
| **`#2D232E`** | Deep Espresso Plum | Primary Ink / Display Dark | Header stack, teks judul, angka harga tebal, tombol aksi solid (*Add to Order*, *Place Order*), kartu stamp loyalitas, dan status tab aktif. |
| **`#474448`** | Slate Charcoal | Neutral Medium / Secondary Text | Catatan rasa (*Tasting notes*), deskripsi produk, subjudul menu, dan ikon tidak aktif. |
| **`#534B52`** | Muted Mocha | Tertiary Neutral / Accents | Label kategori *uppercase*, tagar kurasi, dan garis pembatas halus. |
| **`#E0DDCF`** | Warm Oat Milk Cream | Warm Surface Accent | Chip filter kategori, kartu highlight barista, dan indikator stamp loyalitas. |
| **`#F1F0EA`** | Alabaster Canvas | App Canvas Background | Latar belakang seluruh halaman aplikasi (hangat, lembut, dan nyaman di mata). |
| **`#FFFFFF`** | Pure White | Elevated Card Surface | Kontainer kartu menu, kartu kustomisasi minuman, modal keranjang, dan tab bar. |

---

## 📁 3. Struktur Direktori Proyek (Standar `sunariku/cms-expo`)

Struktur folder mengadopsi pola *file-based routing* Expo Router yang ringkas dan rapi:

```
stoffee/
├── assets/                         # Aset gambar, ikon, dan splash screen
├── src/
│   └── app/                        # Direktori utama Expo Router
│       ├── _layout.jsx             # Root Stack Navigator (menampung tabs & details)
│       ├── details.jsx             # Stack Detail Screen (Kustomisasi minuman & params)
│       └── (tabs)/                 # Bottom Tab Navigator Group
│           ├── _layout.jsx         # Konfigurasi 4 Tab Bar (Home, Menu, Orders, Profile)
│           ├── index.jsx           # Tab 1: Home Dashboard & Barista Special
│           ├── menu.jsx            # Tab 2: Menu & Katalog Kopi (Pencarian & Filter)
│           ├── orders.jsx          # Tab 3: Keranjang Pesanan, Kalkulasi Biaya & Checkout
│           └── profile.jsx         # Tab 4: Profil Pelanggan & Kartu Stamp Loyalitas
├── app.json                        # Konfigurasi Expo Router & skema deep linking
├── package.json                    # Dependensi dan script build
└── README.md                       # Dokumentasi repositori
```

---

## 🧭 4. Rincian 5 Layar & Mekanisme `useLocalSearchParams`

### Alur Navigasi Antar-Halaman:
1. **Layar 1 (`src/app/(tabs)/index.jsx`):** Sapaan pengguna, lokasi outlet *Dago Bar*, kolom pencarian, filter kategori horizontal, kartu menu *Barista Special (Oat Sea Salt Cortado)*, dan daftar 3 menu terpopuler.
2. **Layar 2 (`src/app/(tabs)/menu.jsx`):** Katalog lengkap seluruh menu minuman dan pastry, dilengkapi pencarian *real-time* dan tombol *Kustomisasi →*.
3. **Layar 3 (`src/app/details.jsx` — Stack Detail):**  
   Menerima data produk dari Home/Menu menggunakan hook `useLocalSearchParams`:
   ```javascript
   // Pengiriman parameter dari index.jsx atau menu.jsx:
   router.push({
     pathname: "/details",
     params: {
       id: "c-01",
       title: "Oat Sea Salt Cortado",
       price: "42000",
       notes: "Double ristretto, oat milk, sea salt caramel",
       origin: "Single Origin Gayo Washed · Catatan rasa dark chocolate dan caramel.",
       temp: "Iced",
     },
   });

   // Penerimaan parameter di details.jsx:
   import { useLocalSearchParams, useRouter } from "expo-router";

   const Details = () => {
     const params = useLocalSearchParams();
     const { title, price, origin, temp } = params;
     // Digunakan untuk kalkulasi harga live kustomisasi susu nabati & extra shot
     ...
   };
   ```
4. **Layar 4 (`src/app/(tabs)/orders.jsx`):** Rincian item yang dipesan, sakelar metode santap (*Dine-in (Meja 04)* vs *Takeaway*), pengatur kuantitas `[-] 1 [+]`, kalkulasi tagihan (Subtotal, Pajak PB1 10%, Diskon Voucher), dan tombol *Place Order*.
5. **Layar 5 (`src/app/(tabs)/profile.jsx`):** Profil pengguna *Raditya*, kartu stamp loyalitas digital *Stoffee Club* (5 dari 8 stamp terisi), riwayat transaksi, dan info gerai.

---

## 🚀 5. Cara Menjalankan Aplikasi

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/radtyadharma/stoffee.git
   cd stoffee
   ```
2. **Instal Dependensi:**
   ```bash
   npm install
   ```
3. **Jalankan Aplikasi:**
   ```bash
   npx expo start
   ```
4. **Pindai QR Code** menggunakan aplikasi **Expo Go** pada ponsel pintar Anda.

---

## 🎤 6. Panduan Skenario Demo 2 Menit di Depan Dosen

1. **Menit 0:00 - 0:30 (Tab Home):** Buka aplikasi, tunjukkan sapaan dan kartu Barista Special. Jelaskan bahwa aplikasi menggunakan **Expo Router** berbasis folder `src/app/`.
2. **Menit 0:30 - 1:15 (Demo Stack Detail & `useLocalSearchParams`):** Klik salah satu kopi untuk masuk ke `src/app/details.jsx`. Tunjukkan data kopi diterima via `useLocalSearchParams()`. Ubah suhu ke *Hot*, ganti susu ke *Almond (+6k)*, dan centang *Extra Shot*. Tunjukkan harga di tombol bawah terkalkulasi secara langsung.
3. **Menit 1:15 - 1:45 (Tab Pesanan):** Buka tab Pesanan, tunjukkan kalkulasi otomatis pajak dan diskon voucher, lalu klik tombol *Place Order*.
4. **Menit 1:45 - 2:00 (Tab Profil):** Tunjukkan kartu stamp loyalitas digital (5/8 stamp) sebagai fitur retensi pengguna.
