# AMTC - Al Mahmudah Manasik Training Centre Website

## Overview

AMTC (Al Mahmudah Manasik Training Centre) adalah destinasi wisata religi dan pusat edukasi ibadah Haji & Umrah yang berlokasi di Lembang. Website ini berfungsi sebagai platform informasi dan pemesanan yang menampilkan fasilitas manasik skala nyata (seperti Replika Ka'bah, Sa'i, Jamarat), berbagai paket pelatihan, galeri kegiatan, dan integrasi pemesanan langsung

## Features
- **Responsive Design**: Tampilan yang optimal untuk perangkat desktop, tablet, dan mobile.
- **Interactive Booking System**: Modal formulir pemesanan yang terintegrasi langsung ke WhatsApp.
- **Immersive Animations**: Menggunakan AOS (Animate On Scroll) untuk efek fade-in  elemen saat digulir.
- **Smart Preloader**: Animasi pemuat halaman untuk memastikan seluruh aset dimuat dengan sempurna.
- **Hero & Gallery Sliders**: Slider responsif untuk banner utama dan galeri foto dengan fitur infinite loop.
- **Lightbox Gallery**: Fitur perbesar gambar (zoom) pada halaman galeri untuk detail visual yang lebih baik.
- **Dynamic Navigation**: Menu navigasi responsif dengan efek glassmorphism dan burger menu untuk mobile.

## Technology Stack
- **HTML5**: Struktur markah semantik dan SEO friendly.
- **CSS3**: Styling modern menggunakan Flexbox, Grid, dan Custom Properties (Variables).
- **JavaScript (Vanilla)**: Logika interaktif untuk slider, modal dan validasi form tanpa framework berat.
- **AOS (Animate On Scroll)**: Library untuk animasi saat scrolling.
- **Font Awesome**: Pustaka ikon untuk elemen visual antarmuka.

- **Google Fonts**: Menggunakan font The Seasons, Montserrat, dan Poppins.

## Project Structure
amtc_website/
├── AMTC - ASSETS/             # Aset ikon, logo, dan font
├── AMTC - ASSET BG/           # Aset background dan ornamen
├── Fasilitas/                 # Gambar-gambar fasilitas (Ka'bah, Sa'i, dll)
├── Banners/                   # Gambar banner per halaman
├── index.html                 # Halaman Utama (Beranda)
├── Paket.html                 # Halaman Pilihan Paket
├── fasilitas.html             # Halaman Detail Wahana & Fasilitas
├── galeri.html                # Halaman Galeri Foto & Testimoni
├── promo.html                 # Halaman Promo
├── style.css                  # Stylesheet utama (Variables, Layout, Responsive)
├── script.js                  # Logika JavaScript (DOM, Slider, Modal, WA Link)
└── README.md                  # Dokumentasi Proyek

## Sections
1. **Hero Section**: Slider banner utama dengan Value Proposition dan CTA (Call to Action).
2. **About Us**: Penjelasan visi AMTC sebagai pusat pelatihan manasik yang nyata dan terarah.
3. **Value Propositions**: Alasan memilih AMTC (Real Experience, Bimbingan Ahli, Fasilitas Lengkap).
4. **Fasilitas & Wahana**: Showcase fasilitas unggulan seperti Replika Ka'bah, Masjid Darul Aulia, dan Al Cinema.
5. **Paket Pilihan**: Kategori paket (Sekolah, Keluarga, Travel/KBIHU, Mandiri).
6. **Gallery & Testimonials**: Dokumentasi kegiatan dan ulasan pengunjung.
7. **Booking Modal**: Formulir pop-up untuk reservasi jadwal manasik.
8. **Footer**: Navigasi cepat, informasi kontak, dan tautan sosial media.

## Development Guidelines
- Semantic HTML: Gunakan tag HTML yang sesuai (<header>, <main>, <section>, <footer>) untuk aksesibilitas.
- CSS Variables: Gunakan variabel warna (--brand, --accent, --bg) yang telah didefinisikan di style.css untuk konsistensi.
- Mobile First: Pastikan tampilan rapi di perangkat mobile sebelum menyesuaikan ke layar desktop.
- Asset Management: Simpan gambar dan aset baru ke dalam folder yang sesuai agar kode tetap terorganisir.

## Browser Support
- Google Chrome (Latest)
- Mozilla Firefox (Latest)
- Safari (Latest)
- Microsoft Edge (Latest)
- Opera (Latest)

## Performance Optimizations
- Image Loading: Menggunakan teknik lazy loading (via Intersection Observer) untuk gambar fasilitas.
- Preloader Logic: Menggunakan Promise.all untuk memastikan halaman siap ditampilkan.
- Minified Assets: Disarankan untuk meminifikasi CSS dan JS pada tahap production.

## License
© 2025 AMTC (Al Mahmudah Manasik Training Centre) - Teras Lembang.

## Contact
- **Email**: info@amtclembang.co.id
- **WhatsApp**: +62 878-2203-7779
- **Instagram**: @ayomanasik.amtclembang
- **Alamat**: Jl. Raya Tangkuban Parahu, Cibogo, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 403911

