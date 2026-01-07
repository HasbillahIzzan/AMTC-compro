const preloader = document.getElementById("preloader-wrapper");

// 2. Buat promise untuk window load (menunggu semua konten)
const loadPromise = new Promise((resolve) => {
  window.addEventListener("load", () => {
    resolve("load");
  });
});

// 3. Buat promise untuk timer 0,6 detik (600ms)
const timerPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("timer");
  }, 600);
});

// 4. Jalankan Promise.all
// Ini akan menunggu KEDUA promise selesai
Promise.all([loadPromise, timerPromise]).then(() => {
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
      target.getAttribute("href")?.startsWith("#") &&
      target.id !== "open-booking-modal"
    ) {
      const id = target.getAttribute("href");
      const el = id ? document.querySelector(id) : null;
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        // Close mobile menu after navigate
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
  // 4.1 LOGIKA MODAL BOOKING
  // ===================================
  const openModalBtns = document.querySelectorAll(".open-booking-trigger");
  const closeModalBtn = document.getElementById("close-booking-modal");
  const modalOverlay = document.getElementById("booking-modal");

  if (openModalBtns.length > 0 && closeModalBtn && modalOverlay) {
    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modalOverlay.classList.add("modal-visible");
        document.body.style.overflow = "hidden";
      });
    });

    const closeModal = () => {
      modalOverlay.classList.remove("modal-visible");
      document.body.style.overflow = "";
    };

    closeModalBtn.addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // ===================================
  // 4.2 Booking Form (MODIFIED FOR MODAL)
  // ===================================
  const modalForm = document.getElementById("booking"); // ID form di modal
  modalForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(modalForm);
    const nama = String(data.get("nama") || "").trim();
    const telp = String(data.get("telp") || "").trim();
    const paket = String(data.get("paket") || "");
    const lembaga = String(data.get("lembaga") || "").trim();
    const tanggal = String(data.get("tanggal") || "");
    const kota = String(data.get("Kota") || "").trim();
    const keperluan = String(data.get("keperluan") || "").trim();

    // Validasi
    if (!nama || !telp || !paket || !tanggal || !kota || !keperluan) {
      alert("Mohon lengkapi semua data wajib.");
      return;
    }

    if ((paket === "sekolah" || paket === "travel") && !lembaga) {
      alert("Mohon isi Nama Lembaga/Travel.");
      return;
    }

    // Nomor WhatsApp Tujuan
    const nomorTujuan = "6287822037779";

    // Susun Pesan WhatsApp
    let pesan = `Halo AMTC Teras Lembang, saya ingin booking jadwal manasik.\n\n`;
    pesan += `*Nama Pemesan:* ${nama}\n`;
    pesan += `*No. Telepon/WA:* ${telp}\n`;
    pesan += `*Asal (Kecamatan - Kota):* ${kota}\n`;
    pesan += `*Paket Dipilih:* ${paket}\n`;

    if ((paket === "sekolah" || paket === "travel") && lembaga) {
      pesan += `*Nama Lembaga/Travel:* ${lembaga}\n`;
    }

    pesan += `*Keperluan yaang ingin disampaikan:* ${keperluan}\n`;
    pesan += `*Tanggal Kunjungan:* ${tanggal}\n\n`;
    pesan += `Mohon konfirmasi ketersediaan jadwal. Terima kasih.`;

    const pesanTerenkode = encodeURIComponent(pesan);
    const urlWA = `https://wa.me/${nomorTujuan}?text=${pesanTerenkode}`;
    window.open(urlWA, "_blank");

    // Reset + tutup modal
    modalForm.reset();

    if (typeof toggleModalAdditionalInputs === "function") {
      toggleModalAdditionalInputs();
    } else {
      document
        .querySelector(".modal-additional-input")
        ?.classList.add("hidden");
    }

    const modalOverlay = document.getElementById("booking-modal");
    modalOverlay?.classList.remove("modal-visible");
    document.body.style.overflow = "";
  });

  // ===================================
  // 4.3 Toggle Input Tambahan (MODIFIED FOR MODAL)
  // ===================================
  const modalPaketSelect = document.getElementById("modal-paketSelect");
  const modalAdditionalInputDiv = document.querySelector(
    ".modal-additional-input"
  );

  function toggleModalAdditionalInputs() {
    const selectedValue = modalPaketSelect?.value;

    if (selectedValue === "sekolah" || selectedValue === "travel") {
      modalAdditionalInputDiv?.classList.remove("hidden");
      modalAdditionalInputDiv?.querySelectorAll("input").forEach((input) => {
        input.setAttribute("required", "required");
      });
    } else {
      modalAdditionalInputDiv?.classList.add("hidden");
      modalAdditionalInputDiv?.querySelectorAll("input").forEach((input) => {
        input.removeAttribute("required");
        input.value = "";
      });
    }
  }

  if (modalPaketSelect) {
    toggleModalAdditionalInputs();
    modalPaketSelect.addEventListener("change", toggleModalAdditionalInputs);
  }

  // ===================================
  // 5 & 6. (DIHAPUS)
  // - Animasi cards "Kenapa memilih AMTC?" (IntersectionObserver)
  // - Animasi geser section "Tentang Kami" (IntersectionObserver)
  // ===================================

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
          const duration =
            parseInt(item.getAttribute("data-aos-duration")) || 1000;
          const delay = index * 100;

          item.style.display = "flex";
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";

          setTimeout(() => {
            item.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

            setTimeout(() => {
              item.style.transition = "";
            }, duration + delay + 50);
          }, 10);
        });

        const firstNewItem = hiddenItems[0];
        if (firstNewItem) {
          firstNewItem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        hiddenItems.forEach((item) => {
          item.style.transition = "";
          item.style.opacity = "";
          item.style.transform = "";
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
  new HeroSlider();

  // ===================================
  // 9. Zoomed Image Lightbox (galeri)
  // ===================================
  const zoomButtons = document.querySelectorAll(".zoom-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  zoomButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const imgSrc = this.getAttribute("data-img-src");
      if (lightboxImg) lightboxImg.src = imgSrc;
      lightbox?.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose?.addEventListener("click", function () {
    lightbox?.classList.remove("active");
    document.body.style.overflow = "";
  });

  lightbox?.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox?.classList.contains("active")) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // =====================================================
  // 10. Testimonial Slider (auto infinite tanpa flash)
  // =====================================================
  const testiTrack = document.querySelector(".testimonial-track");
  if (testiTrack) {
    const testiCards = Array.from(testiTrack.children);
    const testiCount = testiCards.length;

    // Clone untuk loop halus
    testiCards.forEach((card) => {
      const clone = card.cloneNode(true);
      testiTrack.appendChild(clone);
    });

    let testiIndex = 0;
    const gap = 20;
    let testiCardWidth =
      testiTrack.children[0].getBoundingClientRect().width + gap;

    function updateCardWidth() {
      const firstCard = testiTrack.children[0];
      if (firstCard) {
        testiCardWidth = firstCard.getBoundingClientRect().width + gap;
      }
    }

    window.addEventListener("resize", updateCardWidth);
    window.addEventListener("load", updateCardWidth);

    function autoSlideTesti() {
      if (testiCardWidth === gap) updateCardWidth();

      testiIndex++;
      testiTrack.style.transition = "transform 0.7s ease-in-out";
      testiTrack.style.transform = `translateX(${
        -testiCardWidth * testiIndex
      }px)`;

      if (testiIndex >= testiCount) {
        setTimeout(() => {
          testiTrack.style.transition = "none";
          testiTrack.style.transform = "translateX(0)";
          testiIndex = 0;
        }, 750);
      }
    }

    setInterval(autoSlideTesti, 3500);

    window.addEventListener("resize", () => {
      testiCardWidth =
        testiTrack.children[0].getBoundingClientRect().width + 16;
    });
  }

  // ===================================
  // 11. slide (galeri)
  // ===================================
  const track = document.querySelector(".slider-track");
  if (track) {
    const slides = Array.from(track.children);
    const slideCount = slides.length;

    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });

    let currentIndex = 0;
    const slideWidth = track.children[0].getBoundingClientRect().width + 16;

    function moveSlide() {
      currentIndex++;
      track.style.transition = "transform 0.8s ease-in-out";
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

      if (currentIndex >= slideCount) {
        setTimeout(() => {
          track.style.transition = "none";
          track.style.transform = "translateX(0)";
          currentIndex = 0;
        }, 900);
      }
    }

    setInterval(moveSlide, 5000);
  }
}); // Akhir DOMContentLoaded

// ===================================
// 13. Hero Slider Class Definition
// ===================================
class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;

    this.init();
  }

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
    this.showSlide(this.currentSlide);
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
