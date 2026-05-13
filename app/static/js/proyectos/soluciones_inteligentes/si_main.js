import { initMenu } from "./menu.js";
import { initNavbar, resetNavbarScroll } from "./nav_bar.js";
import { initNavigation } from "./navigation.js";
import { Slider } from "./slider.js";

document.addEventListener("DOMContentLoaded", () => {
  const navigation = initNavigation();

  const navbar = document.getElementById("navbar");

  function hideNavbar() {
    navbar.classList.add("hidden-scroll");
  }

  function showNavbar() {
    navbar.classList.remove("hidden-scroll");
  }

  initMenu();
  initNavbar(navigation);

  document.querySelectorAll(".nav_bar__opciones a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");

      const navbar = document.getElementById("navbar");
      navbar.classList.remove("hidden-scroll");

      resetNavbarScroll();
    });
  });

  window.addEventListener("wheel", () => {
    navigation.unlockNavbar();
  });

  window.addEventListener("touchstart", () => {
    navigation.unlockNavbar();
  });

  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((sliderItem) => {
    const slidesE1 = sliderItem.querySelector(".slides");
    const dotsE1 = sliderItem.querySelector(".dots");
    const prev = sliderItem.querySelector(".arrow.left");
    const next = sliderItem.querySelector(".arrow.right");

    const slider = new Slider({
      slidesE1,
      dotsE1,
      duration: 3000,
    });

    // Flechas
    prev.addEventListener("click", () => slider.prev());
    next.addEventListener("click", () => slider.next());

    // Hover pause
    sliderItem.addEventListener("mouseenter", () => slider.stop());
    sliderItem.addEventListener("mouseleave", () => slider.start());

    // Swipe
    let startX = 0;
    let startY = 0;

    let isSwiping = false;
    let isScrolling = false;

    slidesE1.addEventListener(
      "touchstart",
      (e) => {

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        isSwiping = false;
        isScrolling = false;
      },
      { passive: true }
    );

    slidesE1.addEventListener(
      "touchmove",
      (e) => {

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const diffX = currentX - startX;
        const diffY = currentY - startY;

        const absX = Math.abs(diffX);
        const absY = Math.abs(diffY);

        const threshold = 12;

        // aún no decidimos dirección
        if (!isSwiping && !isScrolling) {

          if (absX < threshold && absY < threshold) {
            return;
          }

          // vertical
          if (absY > absX) {
            isScrolling = true;
            return;
          }

          // horizontal
          isSwiping = true;
        }

        // SOLO horizontal
        if (isSwiping) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    slidesE1.addEventListener(
      "touchend",
      (e) => {

        if (!isSwiping) return;

        const diff = startX - e.changedTouches[0].clientX;

        if (diff > 50) {
          slider.next();
        }

        if (diff < -50) {
          slider.prev();
        }
      },
      { passive: true }
    );
  });
  //Modal
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");

  //Estado del Modal
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let modalStartX = 0;
  let modalStartY = 0;
  let lastTouchDistance = 0;
  let initialPinchDistance = 0;
  let initialScale = 1;

  //Calcular estado inicial
  function getInitialScale(img) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Imagen vertical
    if (imgHeight > imgWidth) {
      return (vh * 0.9) / imgHeight;
    }

    // Imagen horizontal
    return (vw * 0.9) / imgWidth;
  }

  //Abrir modal
  document.querySelectorAll(".slide img").forEach((img) => {
    img.addEventListener("click", () => {
      hideNavbar();
      modal.classList.add("active");

      // limpiar estado SIEMPRE
      resetTransform();

      modalImg.src = img.src;

      modalImg.onload = () => {
        modalImg.style.width = `${modalImg.naturalWidth}px`;
        modalImg.style.height = `${modalImg.naturalHeight}px`;

        scale = getInitialScale(modalImg);
        offsetX = 0;
        offsetY = 0;
        applyTransform();
      };

      // fallback por si ya estaba en caché
      if (modalImg.complete) {
        modalImg.style.width = `${modalImg.naturalWidth}px`;
        modalImg.style.height = `${modalImg.naturalHeight}px`;

        scale = getInitialScale(modalImg);
        offsetX = 0;
        offsetY = 0;
        applyTransform();
      }
    });
  });

  //Cerrar el modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      showNavbar();
      resetTransform();
    }
  });

  //Cerrar el modal con la tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
      showNavbar();
      resetTransform();
    }
  });

  //Reset modal
  function resetTransform() {
    scale = 1;
    offsetX = 0;
    offsetY = 0;
    applyTransform();
  }

  //Aplicar transform
  function applyTransform() {
    modalImg.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }

  //Zoom con rueda
  modalImg.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      const zoomSpeed = 0.001;
      scale += e.deltaY * -zoomSpeed;

      const initialScale = getInitialScale(modalImg);
      scale = Math.min(Math.max(initialScale, scale), 5);

      if (scale < initialScale) {
        offsetX = 0;
        offsetY = 0;
      }

      applyTransform();
    },
    { passive: false },
  );

  // =========================
  // DRAG PC
  // =========================

  modalImg.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;

    isDragging = true;

    modalStartX = e.clientX - offsetX;
    modalStartY = e.clientY - offsetY;

    modalImg.setPointerCapture(e.pointerId);

    e.preventDefault();
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    offsetX = e.clientX - modalStartX;
    offsetY = e.clientY - modalStartY;

    applyTransform();
  });

  window.addEventListener("pointerup", () => {
    isDragging = false;
  });

  // =========================
  // TOUCH PINCH + DRAG
  // =========================


  function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;

    return Math.sqrt(dx * dx + dy * dy);
  }

  modalImg.addEventListener(
    "touchstart",
    (e) => {

      // DRAG
      if (e.touches.length === 1) {
        isDragging = true;

        modalStartX = e.touches[0].clientX - offsetX;
        modalStartY = e.touches[0].clientY - offsetY;
      }

      // PINCH INIT
      if (e.touches.length === 2) {
        isDragging = false;

        initialPinchDistance = getTouchDistance(e.touches);

        initialScale = scale;
      }
    },
    { passive: false }
  );

  modalImg.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();

      // =====================
      // DRAG
      // =====================

      if (e.touches.length === 1 && isDragging) {

        offsetX = e.touches[0].clientX - modalStartX;
        offsetY = e.touches[0].clientY - modalStartY;

        applyTransform();
      }

      // =====================
      // PINCH
      // =====================

      if (e.touches.length === 2) {

        const currentDistance = getTouchDistance(e.touches);

        const zoomFactor = currentDistance / initialPinchDistance;

        scale = initialScale * zoomFactor;

        const minScale = getInitialScale(modalImg);

        scale = Math.min(Math.max(minScale, scale), 5);

        applyTransform();
      }
    },
    { passive: false }
  );

  modalImg.addEventListener("touchend", (e) => {

    if (e.touches.length === 0) {
      isDragging = false;
    }

    // si ya no hay 2 dedos
    if (e.touches.length < 2) {
      initialPinchDistance = 0;
    }
  });

  //Doble click -> Zoom rápido
  modalImg.addEventListener("dblclick", (e) => {
    const rect = modalImg.getBoundingClientRect();

    //posición del clic dentro de la imagen
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const prevScale = scale;
    const initialScale = getInitialScale(modalImg);

    //Alternar zoom
    scale = scale === initialScale ? initialScale * 2.5 : initialScale;

    const scaleFactor = scale / prevScale;

    //Ajustar offsets para hacer zoom hacia el punto clickeado
    offsetX = offsetX - (clickX - rect.width / 2) * (scaleFactor - 1);
    offsetY = offsetY - (clickY - rect.height / 2) * (scaleFactor - 1);

    //Si volvemos al inicial -> centrar
    if (scale === initialScale) {
      offsetX = 0;
      offsetY = 0;
    }
    applyTransform();
  });

  modalImg.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  //Modal del video

  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  // Abrir modal
  document.querySelectorAll(".si__video-thumb").forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      hideNavbar();
      e.stopPropagation();

      const videoId = thumb.dataset.videoId;

      videoModal.classList.add("active");
      modalVideo.src =
        `https://www.youtube-nocookie.com/embed/${videoId}` +
        `?autoplay=1` +
        `&playsinline=1` +
        `&rel=0` +
        `&modestbranding=1` +
        `&fs=1`;
    });
  });

  // Cerrar modal (click fuera)
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove("active");
      showNavbar();
      //esto detiene el video
      modalVideo.src = "";
    }
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      videoModal.classList.remove("active");
      showNavbar();
      modalVideo.src = "";
    }
  });
});
