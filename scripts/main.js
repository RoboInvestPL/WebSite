document.addEventListener('DOMContentLoaded', function () {
	
  /* =========================
     LOGIKA: HERO SLIDER
  ========================= */
  
  const slides        = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsContainer = document.getElementById('heroDots');
  const heroTitle     = document.getElementById('heroTitle');
  const heroDesc      = document.getElementById('heroDesc');

  if (slides.length) {
    let index = 0;
    let intervalId = null;

    const dots = dotsContainer
      ? slides.map((_, i) => {
          const dot = document.createElement('div');
          dot.classList.add('hero-dot');
          dot.dataset.index = String(i);
          if (i === 0) dot.classList.add('active');
          dotsContainer.appendChild(dot);
          return dot;
        })
      : [];

    function applySlideContent(slideEl) {
      const newTitle = slideEl?.dataset?.title || '';
      const newDesc  = slideEl?.dataset?.desc  || '';

      if (heroTitle) heroTitle.style.opacity = 0;
      if (heroDesc)  heroDesc.style.opacity  = 0;

      setTimeout(() => {
        if (heroTitle) heroTitle.innerHTML = newTitle;
        if (heroDesc)  heroDesc.innerHTML  = newDesc;
        if (heroTitle) heroTitle.style.opacity = 1;
        if (heroDesc)  heroDesc.style.opacity  = 1;
      }, 200);
    }

    function showSlide(newIndex) {
      const safeIndex = ((newIndex % slides.length) + slides.length) % slides.length;

      slides[index].classList.remove('active');
      dots[safeIndex] && dots[index]?.classList.remove('active');

      index = safeIndex;

      slides[index].classList.add('active');
      dots[index] && dots[index].classList.add('active');

      applySlideContent(slides[index]);
    }

    function startAuto() {
      if (intervalId) return;
      intervalId = setInterval(() => showSlide(index + 1), 5000);
    }

    function stopAuto() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    if (dots.length) {
      dots.forEach(dot => {
        dot.addEventListener('click', e => {
          const targetIndex = parseInt(e.currentTarget.dataset.index, 10) || 0;
          stopAuto();
          showSlide(targetIndex);
          startAuto();
        });
      });
    }

    applySlideContent(slides[0]);

    if (slides.length > 1) startAuto();
  }

  /* =========================
     LOGIKA: ROK W STOPCE
  ========================= */
  
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearText = startYear === currentYear ? String(currentYear) : `${startYear}–${currentYear}`;
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = yearText;

  /* =========================
     LOGIKA: HAMBURGER
  ========================= */
  
  const toggle = document.getElementById('menuToggle');
  const panel  = document.getElementById('navLinks');

  if (toggle && panel) {
    const closeMenu = () => {
      toggle.classList.remove('active');
      panel.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      toggle.classList.add('active');
      panel.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    };

    const toggleMenu = (e) => {
      e?.stopPropagation?.();
      if (panel.classList.contains('active')) { closeMenu(); } else { openMenu(); }
    };

    toggle.addEventListener('click', (e) => { e.preventDefault(); toggleMenu(e); });

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu(e);
      }
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });

    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
});
