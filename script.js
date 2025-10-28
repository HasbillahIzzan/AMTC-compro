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
  // 7. Hero Slider Initialization
  // ===================================
  // Inisialisasi HeroSlider
  new HeroSlider();
});

// ===================================
// 8. Hero Slider Class Definition
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
