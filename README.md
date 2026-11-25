# ☕ Stoffee — Artisan Coffee & Bakery Ordering App

<div align="center">

![Expo](https://img.shields.io/badge/Expo-SDK%2058-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.88-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo Router](https://img.shields.io/badge/Expo%20Router-File%20Based-2D232E?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Tugas Ujian Tengah Semester (UTS) — Aplikasi Berbasis Platform**

Aplikasi pemesanan kopi artisan & bakery dengan alur kustomisasi minuman yang lengkap,
dibangun menggunakan **React Native (Expo)** dan **Expo Router**.

</div>

---

## 📱 Tentang Aplikasi

**Stoffee** adalah prototipe aplikasi mobile *cross-platform* untuk pemesanan kopi artisan dan
*viennoiserie* (pastry Prancis). Pengguna dapat menjelajahi katalog menu, mencari & memfilter
menu berdasarkan kategori, serta melakukan kustomisasi minuman (temperatur, jenis susu,
tingkat kemanisan, hingga *extra shot*) dengan perhitungan harga *live* di halaman detail,
termasuk kartu *loyalty stamp* digital.

**Target pengguna:** pelanggan kafe urban di Bandung yang menginginkan pemesanan cepat tanpa
antre di kasir.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🔍 **Pencarian & Filter** | Pencarian menu *real-time* dan filter kategori (Signature, Espresso, Cold Brew, Pastry) tersedia penuh di tab **Menu** |
| 🏷️ **Promosi di Home** | Banner promo harian di halaman Home membuka halaman promo sebagai *modal* |
| ☕ **Kustomisasi Minuman** | Pilih temperatur, jenis susu (Oat/Fresh/Almond), tingkat kemanisan, dan *extra shot* dengan perhitungan harga *live* (harga satuan × jumlah) |
| 🛒 **Tombol Tambah Pesanan** | Tombol aksi di halaman detail menampilkan total harga dinamis dan mengembalikan pengguna ke halaman Menu setelah ditekan |
| ☕ **Kartu Loyalitas Digital** | Kartu *stamp* 8 kotak dengan progress pengumpulan poin |
| 📲 **Deep Linking** | Skema URL `stoffee://` untuk navigasi eksternal |

> **Catatan alur:** sesuai cakupan pembelajaran UTS, alur pemesanan berhenti di halaman
> Detail Menu (Menu → Detail Menu → kembali ke Menu). Implementasi keranjang, rincian
> tagihan, dan checkout merupakan pengembangan lanjutan di luar lingkup materi.

---

## 🖼️ Tampilan Aplikasi

<div align="center">

| Home | Detail & Kustomisasi | Katalog Menu |
|:---:|:---:|:---:|
| ![Home](assets/screenshots/coffee_01_home.png) | ![Detail](assets/screenshots/coffee_02_product_detail.png) | ![Menu](assets/screenshots/coffee_03_menu_catalog.png) |
| **Promo Spesial (Modal)** | **Pesanan** | **Profil & Loyalitas** |
| ![Promo](assets/screenshots/coffee_promo_modal.png) | ![Orders](assets/screenshots/coffee_04_orders_cart.png) | ![Profile](assets/screenshots/coffee_05_profile_rewards.png) |

</div>

---

## 🧭 Alur Navigasi (Stack + Bottom Tab)

Aplikasi menggunakan **dua jenis navigasi sekaligus** sesuai spesifikasi UTS:

```
Root Stack (src/app/_layout.jsx)
│
├── (tabs)  →  Bottom Tab Navigator (src/app/(tabs)/_layout.jsx)
│   ├── index.jsx    → 🏠 Home       (dashboard & barista special)
│   ├── menu.jsx     → ☕ Menu       (katalog, pencarian, filter)
│   ├── orders.jsx   → 🛒 Pesanan    (placeholder tab pesanan)
│   └── profile.jsx  → 👤 Profil     (loyalty stamp & info gerai)
│
├── details.jsx → 📄 Detail Menu (stack push, menerima params dinamis)
└── promo.jsx   → 🏷️ Promo Spesial (modal — navigasi jenis ketiga)
```

**Alur pengiriman parameter dinamis** dari Menu ke halaman Detail:

```jsx
// Mengirim data menu ke halaman detail:
router.push({ pathname: "/details", params: item });

// Menerima data di details.jsx:
const { title, category, price, origin, temp, type } = useLocalSearchParams();
```

**Alur pemesanan (sesuai lingkup materi):**

```
Menu → Detail Menu (kustomisasi + total live) → tombol "Tambah Pesanan" → kembali ke Menu
```

**Navigasi modal:** tombol banner promo di Home membuka `promo.jsx` dengan `presentation:
"modal"` — halaman muncul sebagai modal dari bawah, ditutup dengan `router.back()`.

---

## 🎨 Palet Warna

| Swatch | Hex | Peran |
|:---:|:---|:---|
| 🟤 | `#2D232E` | Primary — teks judul, tombol aksi, header |
| ⚫ | `#474448` | Secondary — deskripsi & teks pendukung |
| 🩶 | `#534B52` | Tertiary — label kategori & aksen |
| 🟡 | `#E0DDCF` | Accent — chip filter & stamp loyalitas |
| ⬜ | `#F1F0EA` | Background — latar belakang aplikasi |
| ⬜ | `#FFFFFF` | Surface — kartu & kontainer |

---

## 📁 Struktur Proyek

```
UTS-ABP-Stoffee_240040015/
├── assets/                     # Ikon, splash screen, dan screenshot
│   └── screenshots/            # Bukti visual seluruh halaman
├── src/
│   └── app/                    # Expo Router (file-based routing)
│       ├── _layout.jsx         # Root Stack
│       ├── details.jsx         # Detail Menu + kustomisasi minuman
│       └── (tabs)/
│           ├── _layout.jsx     # Bottom Tab Navigator
│           ├── index.jsx       # Home — sapaan, banner promo, barista special, menu terpopuler
│           ├── menu.jsx        # Menu & Katalog
│           ├── orders.jsx      # Tab Pesanan (placeholder)
│           └── profile.jsx     # Profil & Loyalitas
├── app.json                    # Konfigurasi Expo
└── package.json
```

---

## 🚀 Cara Menjalankan

```bash
# 1. Clone repositori
git clone https://github.com/radtyadharma/UTS-ABP-Stoffee_240040015.git
cd UTS-ABP-Stoffee_240040015

# 2. Instal dependensi
npm install

# 3. Jalankan development server
npx expo start
```

Lalu pindai **QR Code** yang muncul di terminal menggunakan aplikasi **Expo Go** di ponsel,
atau jalankan di emulator dengan `npx expo start --android` / `--ios`.

> Aplikasi juga telah lolos **20/20 pemeriksaan `npx expo-doctor`** tanpa error maupun warning.

---

## 📚 Sumber & Lisensi Aset

| Aset | Sumber | Lisensi |
|---|---|---|
| Ikon antarmuka | [Lucide Icons — lucide.dev](https://lucide.dev/) via `lucide-react-native` | ISC |
| Ikon profil pengguna | [SVG Repo — "User" vector #530585](https://www.svgrepo.com/svg/530585/user) | CC0 / SVG Repo License (attribution appreciated) |
| Palet warna | [Coolors](https://coolors.co/) | Bebas digunakan |
| Gambar & screenshot | Dokumentasi sendiri | — |
| Framework | [Expo](https://expo.dev) & [React Native](https://reactnative.dev) | MIT |

Seluruh aset yang digunakan bersifat **open-source / royalty-free** dan aman untuk keperluan
edukasi.

---

## 👤 Kontributor

| Nama | NIM | Peran |
|---|---|---|
| Putu Raditya Dharma Putra | 240040015 | Full-stack development, UI/UX design, dokumentasi |

---

<div align="center">

**Stoffee** © 2026 — Dibuat untuk UTS Aplikasi Berbasis Platform

</div>
