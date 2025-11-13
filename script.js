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

      if (!isVisible) {
        hiddenItems.forEach((item) => {
          item.style.display = "flex"; // atau 'grid' sesuai layout kamu
        });
        this.innerHTML = 'Tutup <i class="fa-solid fa-arrow-up-long"></i>';
        this.setAttribute("data-visible", "true");
      } else {
        hiddenItems.forEach((item) => {
          item.style.display = "none";
        });
        this.innerHTML =
          'Lihat Selengkapnya <i class="fa-solid fa-arrow-down-long"></i>';
        this.setAttribute("data-visible", "false");
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
// 10. Testimonial Slider (auto infinite tanpa flash)  // masih error
// =====================================================
// Testimonial Slider Responsive
const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialContainer = document.querySelector(".testimonial-slider");
const testimonialGap = 16;
let testimonialCurrentIndex = 0;
let testimonialSlidesPerView = 3;

// Ambil semua slide asli
let testimonialSlides = Array.from(testimonialTrack.children);

// Duplicate untuk infinite loop
testimonialSlides.forEach(slide => {
  const clone = slide.cloneNode(true);
  testimonialTrack.appendChild(clone);
});

testimonialSlides = Array.from(testimonialTrack.children); // update array

// Update slidesPerView sesuai layar
function updateSlidesPerView() {
  const width = window.innerWidth;
  if (width <= 768) testimonialSlidesPerView = 1;
  else if (width <= 1024) testimonialSlidesPerView = 2;
  else testimonialSlidesPerView = 3;

  // Reset posisi slider saat resize
  testimonialCurrentIndex = 0;
  testimonialTrack.style.transition = "none";
  testimonialTrack.style.transform = "translateX(0)";
}

updateSlidesPerView();
window.addEventListener("resize", updateSlidesPerView);

// Hitung lebar per card
function getCardWidth() {
  return testimonialContainer.clientWidth / testimonialSlidesPerView - ((testimonialGap * (testimonialSlidesPerView - 1)) / testimonialSlidesPerView);
}

// Geser slide
function moveSlide() {
  const cardWidth = getCardWidth();
  testimonialCurrentIndex++;
  testimonialTrack.style.transition = "transform 0.8s ease-in-out";
  testimonialTrack.style.transform = `translateX(-${(cardWidth + testimonialGap) * testimonialCurrentIndex}px)`;

  if (testimonialCurrentIndex >= testimonialSlides.length / 2) {
    setTimeout(() => {
      testimonialTrack.style.transition = "none";
      testimonialTrack.style.transform = "translateX(0)";
      testimonialCurrentIndex = 0;
    }, 900);
  }
}

// Auto play
let sliderInterval = setInterval(moveSlide, 4000);

// Pause saat hover / touch
testimonialContainer.addEventListener("mouseenter", () => clearInterval(sliderInterval));
testimonialContainer.addEventListener("mouseleave", () => sliderInterval = setInterval(moveSlide, 4000));
testimonialContainer.addEventListener("touchstart", () => clearInterval(sliderInterval));
testimonialContainer.addEventListener("touchend", () => sliderInterval = setInterval(moveSlide, 4000));


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

  // jalan otomatis tiap 3 detik
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
