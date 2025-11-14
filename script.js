const preloader = document.getElementById("preloader-wrapper");

// 2. Buat promise untuk window load (menunggu semua konten)
const loadPromise = new Promise((resolve) => {
  window.addEventListener("load", () => {
    resolve("load");
  });
});

// 3. Buat promise untuk timer 1,2 detik (1200ms)
const timerPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("timer");
  }, 1200); // <-- Diubah ke 1200 milidetik = 1,2 detik
});

// 4. Jalankan Promise.all
// Ini akan menunggu KEDUA promise selesai
Promise.all([loadPromise, timerPromise]).then((values) => {
  // Setelah 1,2 detik berlalu DAN halaman selesai load
  if (preloader) {
    preloader.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // 1. Mobile Nav Toggle
  // ===================================
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      siteNav.classList.toggle("open");

      // Expand/collapse menu list on mobile
      siteNav
        .querySelector("ul")
        ?.classList.toggle("show", siteNav.classList.contains("open"));
    });
  }

  // ===================================
  // 2. Smooth Scroll for Internal Links
  // ===================================
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target instanceof HTMLAnchorElement &&
      target.getAttribute("href")?.startsWith("#")
    ) {
      const id = target.getAttribute("href");
      const el = id ? document.querySelector(id) : null;
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        // Close mobile menu after navigate (using optional chaining for safety)
        siteNav?.classList.remove("open");
        siteNav?.querySelector("ul")?.classList.remove("show");
        navToggle?.setAttribute("aria-expanded", "false");
      }
    }
  });

  // ===================================
  // 3. Footer Year
  // ===================================
  const footerYear = document.getElementById("year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  // ===================================
  // 4. Booking Form Submit
  // ===================================
  const form = document.getElementById("booking");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nama = String(data.get("nama") || "").trim();
    const telp = String(data.get("telp") || "").trim();
    const paket = String(data.get("paket") || "");
    const lembaga = String(data.get("lembaga") || "").trim();
    const tanggal = String(data.get("tanggal") || "");

    const telpCek = telp.replace(/\D/g, "");
    if (!nama || !telp || !paket || !tanggal) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    if (telp.length > 0 && telp !== telpCek) {
      alert(
        "Nomor Telepon hanya boleh diisi dengan angka (0-9). Mohon hapus huruf atau simbol."
      );
      return;
    }

    if (telpCek.length < 9) {
      alert("Mohon masukkan Nomor Telepon yang valid (minimal 9 digit).");
      return;
    }

    // Simulasi submit
    if (paket === "sekolah" || paket === "travel") {
      alert(
        `Terima kasih, ${nama}!\nPesanan Anda untuk paket "${paket.toUpperCase()}" dengan lembaga/travel "${lembaga}" pada ${tanggal} telah kami terima.\nKami akan menghubungi Anda di Whatsapp.`
      );
    } else {
      alert(
        `Terima kasih, ${nama}!\nPesanan Anda untuk paket "${paket.toUpperCase()}" pada ${tanggal} telah kami terima.\nKami akan menghubungi Anda di Whatsapp.`
      );
    }

    form.reset();
    toggleAdditionalInputs();
  });

  // ===================================
  // 4.1. Toggle Input Tambahan Berdasarkan Pilihan Paket
  // ===================================
  const paketSelect = document.getElementById("paketSelect");
  const additionalInputDiv = document.querySelector(".additional-input");

  function toggleAdditionalInputs() {
    const selectedValue = paketSelect?.value;

    if (selectedValue === "sekolah" || selectedValue === "travel") {
      additionalInputDiv?.classList.remove("hidden");
      additionalInputDiv?.querySelectorAll("input").forEach((input) => {
        input.setAttribute("required", "required");
      });
    } else {
      additionalInputDiv?.classList.add("hidden");
      additionalInputDiv?.querySelectorAll("input").forEach((input) => {
        input.removeAttribute("required");
        input.value = "";
      });
    }
  }

  if (paketSelect) {
    toggleAdditionalInputs();
    paketSelect.addEventListener("change", toggleAdditionalInputs);
  }

  // ===================================
  // 5. Card Animation (Intersection Observer)
  // ===================================
  const cards = document.querySelectorAll(".card");

  if (cards.length > 0) {
    const options = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add("is-visible");
          observer.unobserve(card);
        }
      });
    }, options);

    cards.forEach((card, index) => {
      // Atur delay untuk efek staggering
      card.style.transitionDelay = `${index * 0.2}s`;
      // (e.g. .card { opacity: 0; transform: translateX(100px); ...})
      observer.observe(card);
    });
  }

  // ===================================
  //  6. Animasi Bagian Tentang (Slide Kiri & Kanan)
  // ===================================
  const aboutCopy = document.querySelector(".about-copy.slide-from-left");
  const aboutMedia = document.querySelector(".about-media.slide-from-right");
  const aboutElements = [aboutCopy, aboutMedia].filter((el) => el !== null); // Filter elemen yang ditemukan

  if (aboutElements.length > 0) {
    const aboutObserverOptions = {
      root: null,
      threshold: 0.2,
      rootMargin: "0px",
    };

    const aboutObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          element.classList.add("is-visible");

          observer.unobserve(element);
        }
      });
    }, aboutObserverOptions);

    aboutElements.forEach((element, index) => {
      if (index === 1) {
        element.style.transitionDelay = "0.3s";
      }
      aboutObserver.observe(element);
    });
  }

  // ===================================
  // 7. Tombol "Lihat Selengkapnya" (Page Fasilitas)
  // ===================================
const showMoreBtn = document.getElementById("show-more-btn");
const hiddenItems = document.querySelectorAll(".wahana-card.hidden-item");

if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function () {
        const isVisible = this.getAttribute("data-visible") === "true";
        const self = this;

        if (!isVisible) {
            
            self.innerHTML = 'Tutup <i class="fa-solid fa-arrow-up-long"></i>';
            self.setAttribute("data-visible", "true");

            hiddenItems.forEach((item, index) => {
                // 1. Ambil duration dari atribut data-aos-duration (default 1000ms)
                const duration = parseInt(item.getAttribute('data-aos-duration')) || 1000;
                
                // 2. Tentukan delay manual untuk efek berurutan
                const delay = index * 100; // Jeda 100ms antar kartu
                
                // 3. Atur display ke 'flex' dan initial state (opacity: 0, translateY: 20px)
                item.style.display = "flex"; 
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                // 4. Setelah jeda sangat kecil, picu transisi
                setTimeout(() => {
                    // Terapkan transisi dengan duration dan delay yang sudah dihitung
                    item.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
                    
                    // Pindah ke final state (animasi fade-up)
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    
                    // 5. Setelah animasi selesai, hapus transisi inline agar tidak mengganggu hover
                    setTimeout(() => {
                        item.style.transition = ''; 
                    }, duration + delay + 50); // Tambah 50ms untuk margin
                }, 10); // Jeda minimal 10ms
            });
            
            // 6. Scroll ke elemen pertama yang baru muncul
            const firstNewItem = hiddenItems[0];
            if (firstNewItem) {
                firstNewItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

        } else {
            // Logika untuk menyembunyikan
            hiddenItems.forEach((item) => {
                item.style.transition = '';
                item.style.opacity = '';
                item.style.transform = '';
                item.style.display = "none";
            });
            self.innerHTML =
                'Lihat Selengkapnya <i class="fa-solid fa-arrow-down-long"></i>';
            self.setAttribute("data-visible", "false");
        }
    });
}

  // ===================================
  // 8. Hero Slider Initialization
  // ===================================
  // Inisialisasi HeroSlider
  new HeroSlider();

  // ===================================
  // 9. Zoomed Image Lightbox (galeri)
  // ===================================
  const zoomButtons = document.querySelectorAll(".zoom-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  // 1. Fungsi untuk membuka Lightbox
  zoomButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const imgSrc = this.getAttribute("data-img-src");
      lightboxImg.src = imgSrc;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // 2. Fungsi untuk menutup Lightbox (klik tombol X)
  lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  });

  // 3. Fungsi untuk menutup Lightbox (klik di luar gambar)
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // 4. Fungsi untuk menutup Lightbox (tekan tombol ESC)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

// =====================================================
// 10. Testimonial Slider (auto infinite tanpa flash)  
// =====================================================
// Testimonial Slider Responsive
const testiTrack = document.querySelector(".testimonial-track");
const testiCards = Array.from(testiTrack.children);
const testiCount = testiCards.length;

// Gandakan semua card untuk loop halus
// *** Penting: Lakukan kloning SEBELUM menghitung lebar ***
testiCards.forEach(card => {
    const clone = card.cloneNode(true);
    testiTrack.appendChild(clone);
});

let testiIndex = 0;
const gap = 20; // sama dengan CSS

// --- MODIFIKASI: Hitung lebar kartu setelah DOM dimuat dan kloning selesai ---
// Ambil lebar *actual* dari elemen pertama (termasuk kloning)
let testiCardWidth = testiTrack.children[0].getBoundingClientRect().width + gap; 

// Tambahkan event listener untuk menghitung ulang saat ukuran layar berubah
function updateCardWidth() {
    // Memastikan lebar dihitung ulang jika terjadi perubahan ukuran layar (misalnya pada media query)
    const firstCard = testiTrack.children[0];
    if (firstCard) {
        testiCardWidth = firstCard.getBoundingClientRect().width + gap;
        // Opsional: Atur ulang posisi track ke 0 saat resize untuk menghindari posisi aneh
        // testiTrack.style.transition = "none";
        // testiTrack.style.transform = "translateX(0)";
        // testiIndex = 0;
    }
}

// Jalankan saat load dan resize
window.addEventListener('resize', updateCardWidth);
window.addEventListener('load', updateCardWidth); 

// --- Jaga fungsi autoSlideTesti tetap sama ---
function autoSlideTesti() {
    // Memastikan lebar sudah dihitung
    if (testiCardWidth === gap) {
        updateCardWidth(); // Hitung ulang jika lebar kartu belum terdeteksi (misalnya jika image belum load)
    }

    testiIndex++;
    testiTrack.style.transition = "transform 0.7s ease-in-out";
    testiTrack.style.transform = `translateX(${-testiCardWidth * testiIndex}px)`;

    // Reset jika sudah mencapai loop clone set
    if (testiIndex >= testiCount) {
        setTimeout(() => {
            testiTrack.style.transition = "none";
            testiTrack.style.transform = "translateX(0)";
            testiIndex = 0;
        }, 750); // Harus lebih besar dari waktu transisi CSS (0.7s)
    }
}

// Jalankan otomatis
setInterval(autoSlideTesti, 3500);

// Kalau window resize → update width
window.addEventListener("resize", () => {
    testiCardWidth = testiTrack.children[0].getBoundingClientRect().width + 16;
});


  // ===================================
  // 11. slide (galeri)
  // ===================================
  const track = document.querySelector(".slider-track");
  const slides = Array.from(track.children);
  const slideCount = slides.length;

  // duplikat semua gambar biar bisa loop tanpa jeda
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  let currentIndex = 0;
  const slidesPerView = 4; // jumlah gambar yang kelihatan sekaligus
  const slideWidth = track.children[0].getBoundingClientRect().width + 16; // + margin

  function moveSlide() {
    currentIndex++;
    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    // kalau sudah sampai akhir batch pertama, reset halus
    if (currentIndex >= slideCount) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        currentIndex = 0;
      }, 900); // setelah animasi selesai
    }
  }

  setInterval(moveSlide, 5000);
});

// ===================================
// 12. Hero Slider Class Definition
// ===================================
class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds

    this.init();
  }

  // Semua method (init, showSlide, nextSlide, dll.)
  init() {
    if (this.slides.length === 0) return;

    this.prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.prevSlide();
    });
    this.nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.nextSlide();
    });

    this.startAutoPlay();

    const slider = document.querySelector(".hero-slider");
    slider?.addEventListener("mouseenter", () => this.stopAutoPlay());
    slider?.addEventListener("mouseleave", () => this.startAutoPlay());

    this.addTouchSupport();
    this.showSlide(this.currentSlide); // Tampilkan slide pertama
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    if (this.slides[index]) {
      this.slides[index].classList.add("active");
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  addTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const slider = document.querySelector(".hero-slider");
    if (!slider) return;

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }
}
