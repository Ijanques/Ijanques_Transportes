// Pequenas utilidades
document.getElementById('year').textContent = new Date().getFullYear();

// CARROSSEL SIMPLES (sem libs)
(function () {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (!track || items.length === 0) return;

  let index = 0;
  const total = items.length;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000; // 5s

  function update() {
    const translateX = -index * 100;
    track.style.transform = `translateX(${translateX}%)`;
  }

  function prev() {
    index = (index - 1 + total) % total;
    update();
    resetAutoplay();
  }

  function next() {
    index = (index + 1) % total;
    update();
    resetAutoplay();
  }

  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => { next(); }, AUTOPLAY_DELAY);
  }
  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Swipe para mobile (simples)
  let startX = 0;
  let isDown = false;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDown = true;
  });
  track.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    // não mover visualmente, apenas detectar swipe
  });
  track.addEventListener('touchend', (e) => {
    isDown = false;
    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : 0;
    const diff = endX - startX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) next(); else prev();
    }
  });

  // iniciar
  update();
  startAutoplay();
})();
